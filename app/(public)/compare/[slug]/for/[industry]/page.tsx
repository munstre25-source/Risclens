import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs, InternalLinks } from '@/components/InternalLinks';
import Script from 'next/script';
import {
  getToolsForComparison,
  getToolComparisonBySlug,
  parseComparisonSlug,
  generateComparisonData,
  generateVerdict,
  getAllComparisonSlugs,
  getIndustryBySlug,
  getAllTools,
  getAlternativesFor,
} from '@/lib/compliance-tools';
import {
  getComparisonInternalLinks,
  getBreadcrumbs,
  generateComparisonSchema,
  generateFAQSchema,
  generateSchemaOrgBreadcrumbs,
} from '@/lib/pseo-internal-links';
import { getSupabaseAdmin } from '@/lib/supabase';
import ComparisonView from '@/components/compliance/ComparisonView';
import AlternativeCard from '@/components/AlternativeCard';
import { BUILD_CONFIG, limitStaticParams, isPriorityTool, isPriorityIndustry } from '@/lib/build-config';

export const dynamicParams = true;
export const revalidate = BUILD_CONFIG.REVALIDATE_SECONDS;

export async function generateStaticParams() {
  try {
    const comparisonSlugs = await getAllComparisonSlugs();
    const { data: industries } = await getSupabaseAdmin()
      .from('pseo_industries')
      .select('slug')
      .in('slug', BUILD_CONFIG.PRIORITY_INDUSTRIES);

    if (!industries) return [];

    const params: { slug: string; industry: string }[] = [];

    // Only generate for top tool comparisons to limit build time
    for (const slug of comparisonSlugs) {
      const parts = parseComparisonSlug(slug);
      if (!parts) continue;

      // Only pre-render if both tools are priority tools
      const isTop = isPriorityTool(parts.toolASlug) && isPriorityTool(parts.toolBSlug);

      if (isTop) {
        for (const ind of industries) {
          params.push({ slug, industry: ind.slug });
        }
      }
    }

    return limitStaticParams(params, BUILD_CONFIG.ROUTE_LIMITS.compareIndustry);
  } catch (err) {
    console.error('[generateStaticParams] Failed to generate industry comparison params:', err);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string, industry: string } }): Promise<Metadata> {
  const { slug, industry: industrySlug } = params;
  const industry = await getIndustryBySlug(industrySlug);
  const isPriorityInd = isPriorityIndustry(industrySlug);

  if (slug.endsWith('-alternatives')) {
    const tools = await getAllTools();
    const toolSlug = slug.replace('-alternatives', '');
    const tool = tools.find(t => t.slug === toolSlug);
    const toolName = tool?.name || toolSlug.replace(/-/g, ' ');
    const isPriority = isPriorityTool(toolSlug) && isPriorityInd;
    return {
      title: `${toolName} Alternatives for ${industry?.name || industrySlug}`,
      description: `Best ${toolName} alternatives for ${industry?.name || industrySlug} teams, including pricing and fit.`,
      alternates: { canonical: `https://risclens.com/compare/${slug}/for/${industrySlug}` },
      robots: {
        index: isPriority,
        follow: true,
      },
      openGraph: {
        title: `${toolName} Alternatives for ${industry?.name || industrySlug}`,
        description: `Compare top compliance platforms that can replace ${toolName} for ${industry?.name || industrySlug} companies.`,
        type: 'article',
      },
    };
  }

  const parsed = parseComparisonSlug(slug);
  if (!parsed) return { title: 'Comparison | RiscLens' };

  const [tools] = await Promise.all([
    getToolsForComparison(parsed.toolASlug, parsed.toolBSlug),
  ]);

  const { toolA, toolB } = tools;
  if (!toolA || !toolB || !industry) return { title: 'Comparison | RiscLens' };

  const title = `${toolA.name} vs ${toolB.name} for ${industry.name}: Best Compliance Platform for ${industry.name}`;
  const description = `Comparing ${toolA.name} vs ${toolB.name} specifically for ${industry.name} companies. See industry-specific features, pricing, and which is better for your ${industry.name} startup.`;
  const isPriority = isPriorityTool(toolA.slug) && isPriorityTool(toolB.slug) && isPriorityInd;

  return {
    title,
    description,
    alternates: { canonical: `https://risclens.com/compare/${slug}/for/${industrySlug}` },
    robots: {
      index: isPriority,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function IndustryComparisonPage({ params }: { params: { slug: string, industry: string } }) {
  const { slug, industry: industrySlug } = params;
  if (slug.endsWith('-alternatives')) {
    return <AlternativesIndustryPage slug={slug} industrySlug={industrySlug} />;
  }
  const parsed = parseComparisonSlug(slug);
  if (!parsed) notFound();

  const [tools, industry] = await Promise.all([
    getToolsForComparison(parsed.toolASlug, parsed.toolBSlug),
    getIndustryBySlug(industrySlug)
  ]);

  const { toolA, toolB } = tools;
  if (!toolA || !toolB || !industry) notFound();

  const specializedData = await getToolComparisonBySlug(slug);
  const generatedData = generateComparisonData(toolA, toolB, industry);

  const { comparisonRows, pricingComparison, faqs } = specializedData
    ? {
      comparisonRows: specializedData.comparison_rows || generatedData.comparisonRows,
      pricingComparison: specializedData.pricing_comparison || generatedData.pricingComparison,
      faqs: specializedData.faqs || generatedData.faqs
    }
    : generatedData;

  const verdict = specializedData?.verdict || generateVerdict(toolA, toolB);
  const title = `${toolA.name} vs ${toolB.name} for ${industry.name}`;
  const description = `Head-to-head comparison of ${toolA.name} and ${toolB.name} tailored for the ${industry.name} sector.`;

  const internalLinks = await getComparisonInternalLinks(toolA.slug, toolB.slug);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Compare', href: '/compare' },
    { label: `${toolA.name} vs ${toolB.name}`, href: `/compare/${slug}` },
    { label: `For ${industry.name}`, href: `/compare/${slug}/for/${industrySlug}` },
  ];

  const comparisonSchema = generateComparisonSchema(toolA, toolB, `https://risclens.com/compare/${slug}/for/${industrySlug}`);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateSchemaOrgBreadcrumbs(breadcrumbs);

  return (
    <>
      <Script id="comparison-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <ComparisonView
        toolA={toolA}
        toolB={toolB}
        comparisonRows={comparisonRows}
        pricingComparison={pricingComparison}
        faqs={faqs}
        verdict={verdict}
        title={title}
        description={description}
        internalLinks={internalLinks}
        breadcrumbs={breadcrumbs}
        industry={industry}
      />
      <Footer />
    </>
  );
}

function makeFallbackTool(slug: string, name?: string) {
  return {
    id: `fallback-${slug}`,
    slug,
    name: name || slug.replace(/-/g, ' '),
    tagline: '',
    description: '',
    logo_url: null,
    website_url: null,
    founded_year: null,
    headquarters: null,
    pricing_starting: null,
    pricing_range: null,
    pricing_model: null,
    auditor_included: false,
    hidden_costs: null,
    integrations_count: null,
    frameworks_supported: [],
    frameworks_count: null,
    automation_level: null,
    key_features: [],
    target_market: null,
    company_size_fit: [],
    industry_focus: [],
    primary_value: null,
    best_for: null,
    limitations: [],
    g2_rating: null,
    g2_reviews_count: null,
    capterra_rating: null,
    customers_count: null,
    notable_customers: [],
    pros: [],
    cons: [],
    verdict: null,
    is_active: true,
    display_order: 0,
    last_verified_at: '',
    created_at: '',
    updated_at: '',
  };
}

async function AlternativesIndustryPage({ slug, industrySlug }: { slug: string; industrySlug: string }) {
  const toolSlug = slug.replace('-alternatives', '');
  const [tools, industry] = await Promise.all([
    getAllTools(),
    getIndustryBySlug(industrySlug)
  ]);

  if (!industry) notFound();

  const tool = tools.find(t => t.slug === toolSlug) || makeFallbackTool(toolSlug);
  let alternatives = await getAlternativesFor(tool.slug);
  if (!alternatives.length) {
    alternatives = tools.filter(t => t.slug !== tool.slug);
  }
  const internalLinks = await getComparisonInternalLinks(tool.slug, tool.slug);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Compare', href: '/compare' },
    { label: `${tool.name} alternatives`, href: `/compare/${slug}` },
    { label: `For ${industry.name}`, href: `/compare/${slug}/for/${industrySlug}` },
  ];

  const breadcrumbSchema = generateSchemaOrgBreadcrumbs(breadcrumbs);

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                  Top {tool.name} Alternatives for {industry.name}
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Looking for alternatives to {tool.name}? Compare compliance platforms that serve {industry.name} teams.
                </p>
              </div>

              <div className="space-y-6">
                {alternatives.map((alt, i) => (
                  <AlternativeCard key={alt.slug} tool={alt} originalTool={tool} rank={i + 1} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <InternalLinks clusters={internalLinks} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
