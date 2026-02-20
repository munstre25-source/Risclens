import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MatrixPage from '@/components/compliance/MatrixPage';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getDecisionSlugCandidates, normalizeIndustrySlug } from '@/lib/pseo-slug-normalization';

interface Props {
  params: Promise<{ 
    slug: string; 
    industry: string;
  }>;
}

async function getMatrixData(decisionSlug: string, industrySlug: string) {
  const supabase = getSupabaseAdmin();
  const frameworkSlug = 'pci-dss';
  const normalizedIndustrySlug = normalizeIndustrySlug(industrySlug);
  const decisionCandidates = getDecisionSlugCandidates(decisionSlug, frameworkSlug);
  
  const [frameworkRes, industryRes] = await Promise.all([
    supabase.from('pseo_frameworks').select('*').eq('slug', frameworkSlug).single(),
    supabase.from('pseo_industries').select('*').eq('slug', normalizedIndustrySlug).single(),
  ]);

  if (frameworkRes.error || industryRes.error) return null;

  let decision: any = null;
  for (const candidate of decisionCandidates) {
    const { data } = await supabase
      .from('pseo_decision_types')
      .select('*')
      .eq('slug', candidate)
      .single();
    if (data) {
      decision = data;
      break;
    }
  }

  if (!decision) return null;

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
    page: page || null,
    resolvedDecisionSlug: decision.slug,
    resolvedIndustrySlug: normalizedIndustrySlug,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, industry } = await params;
  const data = await getMatrixData(slug, industry);

  if (!data) return { title: 'Not Found' };

  const title = data.page?.title || `${data.framework.name} ${data.decision.name} for ${data.industry.name} Startups`;
  const description = data.page?.meta_description || `Calculate and optimize your ${data.framework.name} ${data.decision.name} as a ${data.industry.name} company.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://risclens.com/pci-dss/${data.resolvedDecisionSlug}/${data.resolvedIndustrySlug}`,
    },
  };
}

export default async function PciDssDecisionIndustryPage({ params }: Props) {
  const { slug, industry } = await params;
  const data = await getMatrixData(slug, industry);

  if (!data) notFound();

  const content = data.page?.content_json || {
    heroDescription: `Managing ${data.framework.name} ${data.decision.name} for ${data.industry.name} requires a specialized approach. Our data-driven benchmarks help you understand what to expect and how to optimize your compliance roadmap.`,
    keyPriorities: [
      { 
        title: `Optimizing ${data.decision.name}`, 
        description: `For ${data.industry.name} startups, ${data.decision.name} is often impacted by ${data.industry.slug === 'fintech' ? 'high-volume transaction processing and payment gateway integrations' : 'data segment isolation and encryption requirements'}.` 
      },
      { 
        title: "Industry Benchmarks", 
        description: `Most ${data.industry.name} companies at the Seed to Series A stage spend between $25k-$55k on their initial ${data.framework.name} compliance when factoring in QSA fees and technical controls.` 
      },
      { 
        title: "Strategic Shortcuts", 
        description: `Reduce your ${data.decision.name} by leveraging pre-mapped controls and automation platforms specifically designed for ${data.industry.name} payment flows.` 
      }
    ],
    faqs: [
      { 
        question: `What is the average ${data.decision.name} for ${data.framework.name} in ${data.industry.name}?`, 
        answer: `While it varies by transaction volume, most ${data.industry.name} startups find that ${data.decision.name} is heavily influenced by the scope of their Cardholder Data Environment (CDE).` 
      },
      { 
        question: `How can we minimize ${data.decision.name}?`, 
        answer: `The most effective way for ${data.industry.name} companies to optimize ${data.decision.name} is through network segmentation and using tokenization to reduce the number of systems in scope.` 
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
