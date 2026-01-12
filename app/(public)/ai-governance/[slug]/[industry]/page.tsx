import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MatrixPage from '@/components/compliance/MatrixPage';
import { getSupabaseAdmin } from '@/lib/supabase';

interface Props {
  params: Promise<{ 
    slug: string; 
    industry: string;
  }>;
}

async function getMatrixData(decisionSlug: string, industrySlug: string) {
  const supabase = getSupabaseAdmin();
  const frameworkSlug = 'ai-governance';
  
  const [frameworkRes, industryRes] = await Promise.all([
    supabase.from('pseo_frameworks').select('*').eq('slug', frameworkSlug).single(),
    supabase.from('pseo_industries').select('*').eq('slug', industrySlug).single(),
  ]);

  if (frameworkRes.error || industryRes.error) return null;

  let { data: decision } = await supabase
    .from('pseo_decision_types')
    .select('*')
    .eq('slug', decisionSlug)
    .single();

    if (!decision) {
      const genericSlug = decisionSlug.replace(/^(soc-2|iso-27001|pci-dss|hipaa|gdpr|ai-governance|iso-42001|eu-ai-act|nist-ai-rmf)-/, '');
      const { data: genericDecision } = await supabase
        .from('pseo_decision_types')
        .select('*')
        .eq('slug', genericSlug)
        .single();
      decision = genericDecision;
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
    page: page || null
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
      canonical: `https://risclens.com/ai-governance/${slug}/${industry}`,
    },
  };
}

export default async function AiGovernanceDecisionIndustryPage({ params }: Props) {
  const { slug, industry } = await params;
  const data = await getMatrixData(slug, industry);

  if (!data) notFound();

  const content = data.page?.content_json || {
    heroDescription: `Managing ${data.framework.name} ${data.decision.name} for ${data.industry.name} requires a specialized approach. Our data-driven benchmarks help you understand what to expect and how to optimize your compliance roadmap for 2026.`,
    keyPriorities: [
      { 
        title: `Strategic ${data.decision.name} Alignment`, 
        description: `For ${data.industry.name} innovators, ${data.decision.name} must be balanced with velocity. ${data.industry.slug === 'healthcare' ? 'Privacy-preserving AI and clinical safety' : 'Data lineage and algorithmic transparency'} are paramount in this sector.` 
      },
      { 
        title: "Regulatory Benchmarking", 
        description: `Most ${data.industry.name} companies at the growth stage spend significantly on their initial AI governance setup. Factor in ${data.framework.slug === 'iso-42001' ? 'AIMS documentation and external audit fees' : 'technical file preparation and risk assessments'}.` 
      },
      { 
        title: "Operational Efficiency", 
        description: `Optimize your ${data.decision.name} by integrating governance controls into your existing CI/CD pipelines and MLOps workflows to ensure continuous compliance.` 
      }
    ],
    faqs: [
      { 
        question: `How does ${data.framework.name} affect ${data.industry.name} startups?`, 
        answer: `As a ${data.industry.name} company, ${data.framework.name} provides the structural framework needed to satisfy enterprise procurement requirements and upcoming regulatory mandates like the EU AI Act.` 
      },
      { 
        question: `What is the timeline for ${data.decision.name}?`, 
        answer: `The ${data.decision.name} process for ${data.industry.name} typically takes 3-6 months depending on the maturity of your existing data governance and model monitoring capabilities.` 
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
