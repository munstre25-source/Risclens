import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';
import {
  getToolsForComparison,
  getToolComparisonBySlug,
  parseComparisonSlug,
  generateComparisonData,
  generateVerdict,
  getAllComparisonSlugs,
  getIndustryBySlug,
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

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  try {
    const comparisonSlugs = await getAllComparisonSlugs();
    const { data: industries } = await getSupabaseAdmin().from('pseo_industries').select('slug');
    
    if (!industries) return [];

    const params: { slug: string; industry: string }[] = [];
    
    // We'll only generate for top comparisons to save build time
    // For others, dynamicParams=true will handle it
    const topTools = ['vanta', 'drata', 'secureframe', 'sprinto'];
    
    for (const slug of comparisonSlugs) {
      const parts = parseComparisonSlug(slug);
      if (!parts) continue;
      
      const isTop = topTools.includes(parts.toolASlug) && topTools.includes(parts.toolBSlug);
      
      if (isTop) {
        for (const ind of industries) {
          params.push({ slug, industry: ind.slug });
        }
      }
    }

    return params;
  } catch (err) {
    console.error('[generateStaticParams] Failed to generate industry comparison params:', err);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string, industry: string } }): Promise<Metadata> {
  const { slug, industry: industrySlug } = params;
  const parsed = parseComparisonSlug(slug);
  if (!parsed) return { title: 'Comparison | RiscLens' };

  const [tools, industry] = await Promise.all([
    getToolsForComparison(parsed.toolASlug, parsed.toolBSlug),
    getIndustryBySlug(industrySlug)
  ]);

  const { toolA, toolB } = tools;
  if (!toolA || !toolB || !industry) return { title: 'Comparison | RiscLens' };

  const title = `${toolA.name} vs ${toolB.name} for ${industry.name}: Best Compliance Platform for ${industry.name}`;
  const description = `Comparing ${toolA.name} vs ${toolB.name} specifically for ${industry.name} companies. See industry-specific features, pricing, and which is better for your ${industry.name} startup.`;

  return {
    title,
    description,
    alternates: { canonical: `https://risclens.com/compare/${slug}/for/${industrySlug}` },
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function IndustryComparisonPage({ params }: { params: { slug: string, industry: string } }) {
  const { slug, industry: industrySlug } = params;
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
