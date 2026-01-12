import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MatrixPage from '@/components/compliance/MatrixPage';
import { getSupabaseAdmin } from '@/lib/supabase';

interface Props {
  params: Promise<{ 
    framework: string; 
    role: string; 
    industry: string;
  }>;
}

async function getMatrixData(frameworkSlug: string, roleSlug: string, industrySlug: string) {
  const supabase = getSupabaseAdmin();
  
  // 1. Get dimension details with fallback
  const [frameworkRes, industryRes] = await Promise.all([
    supabase.from('pseo_frameworks').select('*').eq('slug', frameworkSlug).single(),
    supabase.from('pseo_industries').select('*').eq('slug', industrySlug).single(),
  ]);

  if (frameworkRes.error || industryRes.error) return null;

  // Try to find role, with fallback to generic slug
  let { data: role } = await supabase
    .from('pseo_roles')
    .select('*')
    .eq('slug', roleSlug)
    .single();

  if (!role) {
    const genericSlug = roleSlug.replace(/^(soc-2|iso-27001|pci-dss|hipaa|gdpr)-/, '');
    const { data: genericRole } = await supabase
      .from('pseo_roles')
      .select('*')
      .eq('slug', genericSlug)
      .single();
    role = genericRole;
  }

  if (!role) return null;

  // 2. Look for an existing page that matches this specific matrix
  const { data: page } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('framework_id', frameworkRes.data.id)
    .eq('role_id', role.id)
    .eq('industry_id', industryRes.data.id)
    .single();

  return {
    framework: frameworkRes.data,
    role: role,
    industry: industryRes.data,
    page: page || null
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { framework, role, industry } = await params;
  const data = await getMatrixData(framework, role, industry);

  if (!data) return { title: 'Not Found' };

  const title = data.page?.title || `${data.framework.name} Compliance for ${data.industry.name} ${data.role.name}s`;
  const description = data.page?.meta_description || `A strategic guide for ${data.role.name}s at ${data.industry.name} companies navigating ${data.framework.name} compliance.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://risclens.com/${framework}/for/${role}/${industry}`,
    },
  };
}

export default async function FrameworkRoleIndustryPage({ params }: Props) {
  const { framework, role, industry } = await params;
  const data = await getMatrixData(framework, role, industry);

  if (!data) notFound();

  // Construct dynamic content if specific page record doesn't exist
  const content = data.page?.content_json || {
    heroDescription: `Navigating ${data.framework.name} as a ${data.role.name} in the ${data.industry.name} sector requires a balance between technical rigour and operational velocity. This guide breaks down the critical priorities for your specific role and industry context.`,
    keyPriorities: [
      { 
        title: `${data.industry.name}-Specific Controls`, 
        description: `Implement controls that address the unique risks of ${data.industry.name}, such as ${data.industry.slug === 'fintech' ? 'high-frequency transaction security' : 'data privacy for sensitive AI training sets'}.` 
      },
      { 
        title: `${data.role.name} Accountability`, 
        description: `As a ${data.role.name}, you are responsible for overseeing the ${data.role.slug === 'cto' ? 'technical architecture and evidence automation' : 'compliance roadmap and auditor communication'}.` 
      },
      { 
        title: "Evidence Automation", 
        description: `Leverage automation tools to minimize the manual burden on your ${data.industry.name} startup team while maintaining a continuous compliance posture.` 
      }
    ],
    faqs: [
      { 
        question: `How does ${data.framework.name} differ for ${data.industry.name} startups?`, 
        answer: `${data.industry.name} companies often face higher scrutiny due to the nature of their data. ${data.framework.name} provides the foundational trust layer needed to close enterprise deals.` 
      },
      { 
        question: `What is the role of a ${data.role.name} during the audit?`, 
        answer: `The ${data.role.name} typically manages the technical responses and ensures that the evidence provided matches the control descriptions in the ${data.framework.name} framework.` 
      }
    ]
  };

  return (
    <MatrixPage
      framework={data.framework}
      role={data.role}
      industry={data.industry}
      content={content}
    />
  );
}
