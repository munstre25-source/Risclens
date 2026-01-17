import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import MatrixPage from '@/components/compliance/MatrixPage';
import { getSupabaseAdmin } from '@/lib/supabase';
import { BUILD_CONFIG, limitStaticParams } from '@/lib/build-config';

interface Props {
  params: Promise<{
    framework: string;
    slug: string;
    industry: string;
  }>;
}

export const dynamicParams = true;
export const revalidate = BUILD_CONFIG.REVALIDATE_SECONDS;

export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdmin();

    // Only pre-render high-intent combinations to stay under 500 total pages
    const [frameworksRes, decisionsRes, industriesRes] = await Promise.all([
      supabase.from('pseo_frameworks').select('slug').in('slug', BUILD_CONFIG.PRIORITY_FRAMEWORKS),
      supabase.from('pseo_decision_types').select('slug').limit(BUILD_CONFIG.DECISIONS_PER_FRAMEWORK),
      supabase.from('pseo_industries').select('slug').in('slug', BUILD_CONFIG.PRIORITY_INDUSTRIES),
    ]);

    if (!frameworksRes.data || !decisionsRes.data || !industriesRes.data) return [];

    const params = [];
    for (const f of frameworksRes.data) {
      for (const d of decisionsRes.data) {
        for (const i of industriesRes.data) {
          params.push({
            framework: f.slug,
            slug: d.slug,
            industry: i.slug
          });
        }
      }
    }
    // Limit to configured max for this route type
    return limitStaticParams(params, BUILD_CONFIG.ROUTE_LIMITS.frameworkMatrix);
  } catch (err) {
    console.error('[generateStaticParams] Failed for [framework]/[slug]/[industry]:', err);
    return [];
  }
}

async function getMatrixData(frameworkSlug: string, decisionSlug: string, industrySlug: string) {
  const supabase = getSupabaseAdmin();

  // 1. Get dimension details with fallback for decision slug
  const [frameworkRes, industryRes] = await Promise.all([
    supabase.from('pseo_frameworks').select('*').eq('slug', frameworkSlug).single(),
    supabase.from('pseo_industries').select('*').eq('slug', industrySlug).single(),
  ]);

  if (frameworkRes.error || industryRes.error) return null;

  // Try to find decision, with fallback to generic slug
  let { data: decision } = await supabase
    .from('pseo_decision_types')
    .select('*')
    .eq('slug', decisionSlug)
    .single();

  if (!decision) {
    // Try multiple fallback patterns:
    // 1. Remove framework prefix (e.g., "soc-2-timeline" -> "timeline")
    // 2. Remove common word prefixes (e.g., "certification-timeline" -> "timeline")
    const fallbackPatterns = [
      decisionSlug.replace(/^(soc-2|iso-27001|pci-dss|hipaa|gdpr|ai-governance|iso-42001|eu-ai-act|nist-ai-rmf)-/, ''),
      decisionSlug.replace(/^(certification|compliance|audit|security|implementation|gap|risk)-/, ''),
      decisionSlug.replace(/.*-/, ''), // Last resort: just the last part
    ];

    for (const fallbackSlug of fallbackPatterns) {
      if (fallbackSlug === decisionSlug) continue; // Skip if no change
      const { data: fallbackDecision } = await supabase
        .from('pseo_decision_types')
        .select('*')
        .eq('slug', fallbackSlug)
        .single();
      if (fallbackDecision) {
        decision = fallbackDecision;
        break;
      }
    }
  }

  if (!decision) return null;

  // 2. Look for an existing page
  const { data: page } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('framework_id', frameworkRes.data.id)
    .eq('decision_type_id', decision.id)
    .eq('industry_id', industryRes.data.id)
    .single();

  return {
    framework: frameworkRes.data,
    decision: decision,
    industry: industryRes.data,
    page: page || null
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { framework, slug, industry } = await params;

  const normalizedSlug = slug.startsWith(`${framework}-`)
    ? slug.slice(framework.length + 1)
    : slug;

  const data = await getMatrixData(framework, normalizedSlug, industry);

  if (!data) return { title: 'Not Found' };

  const title = data.page?.title || `${data.framework.name} ${data.decision.name} for ${data.industry.name} Startups`;
  const description = data.page?.meta_description || `Calculate and optimize your ${data.framework.name} ${data.decision.name} as a ${data.industry.name} company.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://risclens.com/${framework}/${normalizedSlug}/${industry}`,
    },
  };
}

export default async function FrameworkDecisionIndustryPage({ params }: Props) {
  const { framework, slug, industry } = await params;

  // Redirect prefixed variants to canonical to avoid duplicate URLs
  if (slug.startsWith(`${framework}-`)) {
    const canonicalSlug = slug.slice(framework.length + 1);
    redirect(`/${framework}/${canonicalSlug}/${industry}`);
  }

  const decisionSlug = slug.startsWith(`${framework}-`)
    ? slug.slice(framework.length + 1)
    : slug;

  const data = await getMatrixData(framework, decisionSlug, industry);

  if (!data) notFound();

  // Construct dynamic content
  const content = data.page?.content_json || {
    heroDescription: `Managing ${data.framework.name} ${data.decision.name} for ${data.industry.name} requires a specialized approach. Our data-driven benchmarks help you understand what to expect and how to optimize your compliance roadmap.`,
    keyPriorities: [
      {
        title: `Optimizing ${data.decision.name}`,
        description: `For ${data.industry.name} startups, ${data.decision.name} is often impacted by ${data.industry.slug === 'fintech' ? 'complex data flows and legacy system integrations' : 'rapid scaling and high-volume AI processing'}.`
      },
      {
        title: "Industry Benchmarks",
        description: `Most ${data.industry.name} companies at the Seed to Series A stage spend between ${data.framework.slug === 'soc-2' ? '$20k-$50k' : '$15k-$35k'} on their initial audit when factoring in tool costs.`
      },
      {
        title: "Strategic Shortcuts",
        description: `Reduce your ${data.decision.name} by leveraging pre-mapped controls and automation platforms specifically designed for ${data.industry.name} workflows.`
      }
    ],
    faqs: [
      {
        question: `What is the average ${data.decision.name} for ${data.framework.name} in ${data.industry.name}?`,
        answer: `While it varies by team size, most ${data.industry.name} startups find that ${data.decision.name} is heavily influenced by their choice of auditor and the level of automation they implement.`
      },
      {
        question: `How can we minimize ${data.decision.name}?`,
        answer: `The most effective way for ${data.industry.name} companies to optimize ${data.decision.name} is through early gap analysis and selecting tools that integrate natively with their existing tech stack.`
      }
    ]
  };

  return (
    <MatrixPage
      framework={data.framework}
      decision={data.decision}
      industry={data.industry}
      content={content}
    />
  );
}
