import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';
import {
  getAllTools,
  getToolsForComparison,
  getToolComparisonBySlug,
  parseComparisonSlug,
  generateComparisonSlug,
  generateComparisonData,
  generateComparisonTitle,
  generateComparisonDescription,
  generateVerdict,
  getAlternativesFor,
  getAllComparisonSlugs,
  getAllAlternativesSlugs,
} from '@/lib/compliance-tools';
import {
  getComparisonInternalLinks,
  getAlternativesInternalLinks,
  getBreadcrumbs,
  generateComparisonSchema,
  generateFAQSchema,
  generateSchemaOrgBreadcrumbs,
} from '@/lib/pseo-internal-links';
import { getSupabaseAdmin } from '@/lib/supabase';
import { validatePseoContent, getString, getArray, getObject } from '@/lib/pseo-validation';
import ComparisonView from '@/components/compliance/ComparisonView';
import FrameworkComparisonView from '@/components/compliance/FrameworkComparisonView';
import { InternalLinks, Breadcrumbs } from '@/components/InternalLinks';
import AlternativeCard from '@/components/AlternativeCard';
import ToolAlternativePage from '@/components/ToolAlternativePage';
import { FAQSection } from '@/components/FAQSection';
import {
  generateComparisonTitleOptimized,
  generateComparisonDescriptionOptimized,
  generateAlternativesTitleOptimized,
  generateAlternativesDescriptionOptimized,
  generateAlternativesFAQs,
  CURRENT_YEAR,
} from '@/lib/seo-enhancements';
import { ExitIntentModal } from '@/components/LeadCaptureCTA';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

function toDisplayName(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdmin();
    const [comparisonSlugs, alternativesSlugs, pseoPages] = await Promise.all([
      getAllComparisonSlugs(),
      getAllAlternativesSlugs(),
      supabase.from('pseo_pages').select('slug').in('category', ['alternatives', 'framework_comparison'])
    ]);

    const pseoSlugs = pseoPages.data?.map(p => p.slug) || [];
    
    const allSlugs = Array.from(new Set([
      ...comparisonSlugs,
      ...alternativesSlugs,
      ...pseoSlugs
    ]));

    return allSlugs.map(slug => ({ slug }));
  } catch (err) {
    console.error('[generateStaticParams] Failed to generate params for compare:', err);
    return [];
  }
}

async function getPseoPage(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;

  // First check if it's a framework comparison in pSEO
  const pseoPage = await getPseoPage(slug);
  if (pseoPage) {
    return {
      title: pseoPage.title,
      description: pseoPage.meta_description,
      alternates: { canonical: `https://risclens.com/compare/${slug}` },
    };
  }

  if (slug.includes('-vs-')) {
    const parsed = parseComparisonSlug(slug);
    if (!parsed) return { title: 'Comparison | RiscLens' };

    const { toolA, toolB } = await getToolsForComparison(parsed.toolASlug, parsed.toolBSlug);
    const toolAName = toolA?.name || toDisplayName(parsed.toolASlug);
    const toolBName = toolB?.name || toDisplayName(parsed.toolBSlug);
    if (!toolA || !toolB) {
      return {
        title: `${toolAName} vs ${toolBName} Comparison | RiscLens`,
        description: `Side-by-side comparison of ${toolAName} and ${toolBName} for SOC 2 and broader compliance automation workflows.`,
        alternates: { canonical: `https://risclens.com/compare/${slug}` },
      };
    }

    // Use CTR-optimized title and description
    const title = generateComparisonTitleOptimized(toolA, toolB);
    const description = generateComparisonDescriptionOptimized(toolA, toolB);

    return {
      title,
      description,
      keywords: [
        `${toolA.name} vs ${toolB.name}`,
        `${toolA.name} vs ${toolB.name} ${CURRENT_YEAR}`,
        `${toolA.name} comparison`,
        `${toolB.name} comparison`,
        'compliance automation comparison',
      ],
      alternates: { canonical: `https://risclens.com/compare/${slug}` },
      openGraph: {
        title,
        description,
        type: 'article',
      },
    };
  }

  if (slug.endsWith('-alternatives')) {
    const toolSlug = slug.replace('-alternatives', '');
    const tools = await getAllTools();
    const tool = tools.find(t => t.slug === toolSlug);
    const alternatives = tool ? await getAlternativesFor(tool.slug) : [];
    const toolName = tool?.name || toDisplayName(toolSlug);

    // Use CTR-optimized title and description
    const title = generateAlternativesTitleOptimized(toolName, alternatives.length || 10);
    const description = generateAlternativesDescriptionOptimized(toolName, alternatives);

    return {
      title,
      description,
      keywords: [
        `${toolName} alternatives`,
        `${toolName} competitors`,
        `${toolName} alternatives ${CURRENT_YEAR}`,
        'compliance software alternatives',
        'SOC 2 automation tools',
      ],
      alternates: { canonical: `https://risclens.com/compare/${slug}` },
    };
  }

  return { title: 'Tool Comparison | RiscLens' };
}

export default async function DynamicComparisonPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Check if it's a pSEO page first (handles framework_comparison and alternatives)
  const page = await getPseoPage(slug);
  
  if (page && page.content_json) {
    const content = page.content_json;
    const validation = validatePseoContent(content, page.category);
    
    if (page.category === 'framework_comparison' && validation.isValid) {
      const frameworkA = getObject(content, 'frameworkA', { name: '', slug: '' });
      const frameworkB = getObject(content, 'frameworkB', { name: '', slug: '' });
      
      // Additional validation: ensure frameworks have names
      if (!frameworkA.name || !frameworkB.name) {
        // Fall through to other handlers or 404
      } else {
        return (
          <>
            <Header />
            <FrameworkComparisonView
              title={getString(content, 'title', `${frameworkA.name} vs ${frameworkB.name}`)}
              description={getString(content, 'description', '')}
              frameworkA={frameworkA}
              frameworkB={frameworkB}
              tableRows={getArray(content, 'tableRows', [])}
              decisions={getArray(content, 'decisions', [])}
              faqs={getArray(content, 'faqs', [])}
              lastUpdated={new Date(page.updated_at || page.created_at).toISOString().split('T')[0]}
            />
            <Footer />
          </>
        );
      }
    }

    if (page.category === 'alternatives') {
      const toolName = getString(content, 'toolName', '');
      // Only render if toolName is valid
      if (toolName) {
        return (
          <ToolAlternativePage
            toolName={toolName}
            toolSlug={slug.replace('-alternatives', '')}
            heroDescription={getString(content, 'heroDescription', `Compare the best ${toolName} alternatives.`)}
            alternatives={getArray(content, 'alternatives', [])}
            comparisonFactors={getArray(content, 'comparisonFactors', [])}
          />
        );
      }
    }
  }

  if (slug.includes('-vs-')) {
    return <ComparisonPageWrapper slug={slug} />;
  }

  if (slug.endsWith('-alternatives')) {
    return <AlternativesPage slug={slug} />;
  }

  notFound();
}

async function ComparisonPageWrapper({ slug }: { slug: string }) {
  const parsed = parseComparisonSlug(slug);
  if (!parsed) notFound();

  const allTools = await getAllTools();
  const { toolA, toolB } = await getToolsForComparison(parsed.toolASlug, parsed.toolBSlug);
  const resolvedToolA = toolA || makeFallbackTool(parsed.toolASlug, toDisplayName(parsed.toolASlug));
  const resolvedToolB = toolB || makeFallbackTool(parsed.toolBSlug, toDisplayName(parsed.toolBSlug));

  const canonicalSlug = generateComparisonSlug(parsed.toolASlug, parsed.toolBSlug);
  const specializedData = (await getToolComparisonBySlug(slug)) || (await getToolComparisonBySlug(canonicalSlug));
  const generatedData = generateComparisonData(resolvedToolA, resolvedToolB);
  
  const { comparisonRows, pricingComparison, faqs } = specializedData 
    ? { 
        comparisonRows: specializedData.comparison_rows || generatedData.comparisonRows, 
        pricingComparison: specializedData.pricing_comparison || generatedData.pricingComparison, 
        faqs: specializedData.faqs || generatedData.faqs 
      }
    : generatedData;

  const verdict = specializedData?.verdict || generateVerdict(resolvedToolA, resolvedToolB);
  const title = specializedData?.title || generateComparisonTitle(resolvedToolA, resolvedToolB);
  const description = specializedData?.meta_description || generateComparisonDescription(resolvedToolA, resolvedToolB);
  
  const internalLinks = await getComparisonInternalLinks(resolvedToolA.slug, resolvedToolB.slug);
  const breadcrumbs = getBreadcrumbs(`/compare/${slug}`);
  const alternativesAData = (await getAlternativesFor(resolvedToolA.slug)).slice(0, 3);
  const alternativesBData = (await getAlternativesFor(resolvedToolB.slug)).slice(0, 3);
  const alternativesA = alternativesAData.length
    ? alternativesAData
    : allTools.filter((toolRow) => toolRow.slug !== resolvedToolA.slug && toolRow.slug !== resolvedToolB.slug).slice(0, 3);
  const alternativesB = alternativesBData.length
    ? alternativesBData
    : allTools.filter((toolRow) => toolRow.slug !== resolvedToolB.slug && toolRow.slug !== resolvedToolA.slug).slice(0, 3);

  const comparisonSchema = generateComparisonSchema(resolvedToolA, resolvedToolB, `https://risclens.com/compare/${slug}`);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateSchemaOrgBreadcrumbs(breadcrumbs);

  return (
    <>
      <Script id="comparison-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
        <ComparisonView
          toolA={resolvedToolA}
          toolB={resolvedToolB}
          comparisonRows={comparisonRows}
          pricingComparison={pricingComparison}
          faqs={faqs}
          verdict={verdict}
          title={title}
          description={description}
          internalLinks={internalLinks}
          breadcrumbs={breadcrumbs}
          alternativesA={alternativesA}
          alternativesB={alternativesB}
        />
      <Footer />
    </>
  );
}

function makeFallbackTool(slug: string, name?: string) {
  const nowIso = new Date().toISOString();
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
    last_verified_at: nowIso,
    created_at: nowIso,
    updated_at: nowIso,
  };
}

async function AlternativesPage({ slug }: { slug: string }) {
  const toolSlug = slug.replace('-alternatives', '');
  const tools = await getAllTools();
  const tool = tools.find(t => t.slug === toolSlug) || makeFallbackTool(toolSlug);

  let alternatives = await getAlternativesFor(tool.slug);
  if (!alternatives.length) {
    alternatives = tools.filter(t => t.slug !== tool.slug);
  }
  const internalLinks = await getAlternativesInternalLinks(toolSlug);
  const breadcrumbs = getBreadcrumbs(`/compare/${slug}`);
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
                  Top {tool.name} Alternatives in 2026
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Looking for alternatives to {tool.name}? Compare {alternatives.length} compliance platforms by pricing, features, and best fit for your organization.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 my-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">About {tool.name}</h2>
                <p className="text-slate-600 mb-4">{tool.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 bg-slate-100 rounded-full">Starting at {tool.pricing_starting}</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-full">{tool.integrations_count}+ Integrations</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-full">{tool.frameworks_count}+ Frameworks</span>
                  {tool.g2_rating && <span className="px-3 py-1 bg-yellow-100 rounded-full">{tool.g2_rating}/5 G2 Rating</span>}
                </div>
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

        <FAQSection 
          faqs={generateAlternativesFAQs(tool.name, alternatives.length, alternatives.map(a => a.name))}
        />

        <Footer />
      
      {/* Exit Intent Modal for Comparison Pages */}
      <ExitIntentModal 
        variant="comparison"
        title="Still Deciding? Get the Full Comparison Matrix"
        description="Download our detailed PDF comparing all major compliance platforms with pricing, features, and recommendations."
      />
    </>
  );
}
