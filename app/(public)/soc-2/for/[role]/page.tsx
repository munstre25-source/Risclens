import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RoleSOC2Page from '@/components/RoleSOC2Page';
import { getSupabaseAdmin } from '@/lib/supabase';

interface Props {
  params: Promise<{ role: string }>;
}

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from('pseo_pages')
      .select('slug')
      .eq('category', 'role');
    
    return data?.map(p => ({ role: p.slug })) || [];
  } catch (err) {
    console.error('[generateStaticParams] Failed to generate params for soc-2/for/[role]:', err);
    return [];
  }
}

async function getRolePage(role: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('slug', role)
    .eq('category', 'role')
    .single();

  if (error || !data) return null;
  return data;
}

async function getAllRoles() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('slug, content_json')
    .eq('category', 'role')
    .order('slug');
  
  return data || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const page = await getRolePage(role);

  if (!page) {
    return {
      title: 'Page Not Found | RiscLens',
    };
  }

  return {
    title: page.title,
    description: page.meta_description,
    alternates: {
      canonical: `https://risclens.com/soc-2/for/${role}`,
    },
  };
}

export default async function DynamicRolePage({ params }: Props) {
  const { role } = await params;
  const page = await getRolePage(role);

  if (!page) {
    notFound();
  }

  const allRolesData = await getAllRoles();
  const allRoles = allRolesData.map(r => ({
    name: r.content_json.roleName,
    slug: r.slug
  }));

  const content = page.content_json;

  // Fallback content for thin pSEO pages
  const fallbackKeyPriorities = [
    { title: "Access Control Management", description: "Implement strict identity and access management (IAM) policies to ensure only authorized personnel have access to sensitive data." },
    { title: "Continuous Monitoring", description: "Set up automated tools to monitor your infrastructure and alert your team of any potential security incidents in real-time." },
    { title: "Data Encryption", description: "Ensure all data is encrypted at rest and in transit using industry-standard protocols to prevent unauthorized access." },
    { title: "Vendor Risk Assessment", description: "Evaluate the security posture of your third-party vendors to ensure they meet your compliance requirements." }
  ];

  const fallbackFaqs = [
    { question: "How long does it take to achieve SOC 2 compliance?", answer: "Typically, a SOC 2 Type 1 audit takes 2-4 weeks, while a Type 2 audit requires a 3-12 month observation period." },
    { question: "What is the difference between SOC 2 Type 1 and Type 2?", answer: "Type 1 evaluates the design of controls at a point in time, whereas Type 2 evaluates the operational effectiveness of those controls over a period of time." },
    { question: "Do we need an external auditor?", answer: "Yes, SOC 2 reports must be issued by an independent CPA firm that is specialized in information security audits." }
  ];

  return (
    <RoleSOC2Page
      roleName={content.roleName || role.charAt(0).toUpperCase() + role.slice(1)}
      roleSlug={role}
      heroDescription={content.heroDescription || `A comprehensive guide for ${content.roleName || role}s on navigating SOC 2 compliance requirements and best practices.`}
      keyPriorities={content.keyPriorities && content.keyPriorities.length > 0 ? content.keyPriorities : fallbackKeyPriorities}
      faqs={content.faqs && content.faqs.length > 0 ? content.faqs : fallbackFaqs}
      relatedLinks={content.relatedLinks}
      allRoles={allRoles}
    />
  );
}
