import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RoleSOC2Page from '@/components/RoleSOC2Page';
import { getSupabaseAdmin } from '@/lib/supabase';
import { 
  getValidPseoSlugs, 
  getString, 
  getArray,
  generateFallbackTitle,
  generateFallbackDescription 
} from '@/lib/pseo-validation';
import { getRoleSlugCandidates } from '@/lib/pseo-slug-normalization';

interface Props {
  params: Promise<{ role: string }>;
}

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  // Only generate pages with valid content (has roleName)
  return getValidPseoSlugs('role', 'role');
}

async function getRolePage(role: string) {
  const supabase = getSupabaseAdmin();
  const roleCandidates = getRoleSlugCandidates(role, 'soc-2');

  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('category', 'role')
    .in('slug', roleCandidates);

  if (error || !data?.length) return null;

  const bySlug = new Map(data.map((page) => [page.slug, page]));
  const resolvedSlug = roleCandidates.find((candidate) => bySlug.has(candidate)) || data[0].slug;
  const page = bySlug.get(resolvedSlug) || data[0];

  return { page, resolvedSlug };
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
  const resolved = await getRolePage(role);
  const page = resolved?.page;

  // Validate page has required roleName
  const roleName = page?.content_json?.roleName;
  if (!page || !roleName) {
    return {
      title: 'Page Not Found | RiscLens',
      robots: { index: false },
    };
  }

  return {
    title: page.title || generateFallbackTitle(role, 'role'),
    description: page.meta_description || generateFallbackDescription(role, 'role'),
    alternates: {
      canonical: `https://risclens.com/soc-2/for/${resolved?.resolvedSlug || role}`,
    },
  };
}

export default async function DynamicRolePage({ params }: Props) {
  const { role } = await params;
  const resolved = await getRolePage(role);
  const page = resolved?.page;

  // Validate page has required roleName
  if (!page || !page.content_json?.roleName) {
    notFound();
  }

  const content = page.content_json;
  const roleName = getString(content, 'roleName', role.charAt(0).toUpperCase() + role.slice(1));

  // Only include roles that have valid roleName
  const allRolesData = await getAllRoles();
  const allRoles = allRolesData
    .filter(r => r.content_json?.roleName)
    .map(r => ({
      name: r.content_json.roleName,
      slug: r.slug
    }));

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
      roleName={roleName}
      roleSlug={resolved?.resolvedSlug || role}
      heroDescription={getString(content, 'heroDescription', `A comprehensive guide for ${roleName}s on navigating SOC 2 compliance requirements and best practices.`)}
      keyPriorities={getArray(content, 'keyPriorities', fallbackKeyPriorities)}
      faqs={getArray(content, 'faqs', fallbackFaqs)}
      relatedLinks={content.relatedLinks}
      allRoles={allRoles}
    />
  );
}
