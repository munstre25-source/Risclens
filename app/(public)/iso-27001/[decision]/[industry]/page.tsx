import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MatrixPage from '@/components/compliance/MatrixPage';
import { getSupabaseAdmin } from '@/lib/supabase';

interface Props {
  params: Promise<{ 
    decision: string; 
    industry: string;
  }>;
}

async function getMatrixData(decisionSlug: string, industrySlug: string) {
  const supabase = getSupabaseAdmin();
  const frameworkSlug = 'iso-27001';
  
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
    const genericSlug = decisionSlug.replace(/^(soc-2|iso-27001|pci-dss|hipaa|gdpr)-/, '');
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
  const { decision, industry } = await params;
  const data = await getMatrixData(decision, industry);

  if (!data) return { title: 'Not Found' };

  const title = data.page?.title || `${data.framework.name} ${data.decision.name} for ${data.industry.name} Startups`;
  const description = data.page?.meta_description || `Calculate and optimize your ${data.framework.name} ${data.decision.name} as a ${data.industry.name} company.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://risclens.com/iso-27001/${decision}/${industry}`,
    },
  };
}

export default async function Iso27001DecisionIndustryPage({ params }: Props) {
  const { decision, industry } = await params;
  const data = await getMatrixData(decision, industry);

  if (!data) notFound();

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
