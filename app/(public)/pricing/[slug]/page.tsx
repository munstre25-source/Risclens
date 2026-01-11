import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ToolPricingPage from '@/components/ToolPricingPage';
import { getSupabaseAdmin } from '@/lib/supabase';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPricingPage(slug: string) {
  const supabase = getSupabaseAdmin();
  
  // Clean slug and check variations
  const cleanSlug = slug.replace('-pricing', '');
  
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .or(`slug.eq.${slug},slug.eq.${cleanSlug}`)
    .eq('category', 'pricing')
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Handle common static route variations before checking DB
  const staticVendors = ['vanta', 'drata', 'secureframe', 'sprinto', 'thoropass'];
  const cleanSlug = slug.replace('-pricing', '');
  
  if (staticVendors.includes(cleanSlug) && slug !== cleanSlug) {
    // We'll let the page component handle the redirect
    return { title: 'Redirecting... | RiscLens' };
  }

  const page = await getPricingPage(slug);

  if (!page) {
    return {
      title: 'Pricing Page Not Found | RiscLens',
    };
  }

  return {
    title: page.title,
    description: page.meta_description,
    alternates: {
      canonical: `https://risclens.com/pricing/${slug}`,
    },
  };
}

export default async function DynamicPricingPage({ params }: Props) {
  const { slug } = await params;
  
  // Check for static route variations
  const staticVendors = ['vanta', 'drata', 'secureframe', 'sprinto', 'thoropass'];
  const cleanSlug = slug.replace('-pricing', '');
  
  if (staticVendors.includes(cleanSlug) && slug !== cleanSlug) {
    redirect(`/pricing/${cleanSlug}`);
  }

  const page = await getPricingPage(slug);

  if (!page) {
    notFound();
  }

  const content = page.content_json;

  return (
    <ToolPricingPage
      toolName={content.toolName || content.vendor || 'Tool'}
      toolSlug={slug}
      heroDescription={content.heroDescription || 'Market data and pricing intelligence for this compliance platform.'}
      pricingTiers={content.pricingTiers || []}
      hiddenCosts={content.hiddenCosts || []}
      negotiationTips={content.negotiationTips || []}
      comparisonLinks={content.comparisonLinks || []}
    />
  );
}
