import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityAuditorPage from '@/components/CityAuditorPage';
import { getPSEOPageBySlug } from '@/lib/pseo';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from('pseo_pages')
      .select('slug')
      .eq('category', 'directory');
    
    return data?.map(p => ({ location: p.slug })) || [];
  } catch (err) {
    console.error('[generateStaticParams] Failed to generate params for auditor-directory:', err);
    return [];
  }
}

interface PageProps {
  params: { location: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPSEOPageBySlug(params.location);
  if (!page) return {};

  return {
    title: page.title,
    description: page.meta_description,
    alternates: {
      canonical: `https://risclens.com/auditor-directory/${params.location}`,
    },
  };
}

export default async function DynamicCityAuditorPage({ params }: PageProps) {
  const page = await getPSEOPageBySlug(params.location);

  if (!page || page.category !== 'directory') {
    // If not in DB, Next.js will fall back to static folders if they exist,
    // or return 404 if they don't and this route is matched.
    notFound();
  }

  const { content_json: content } = page;

  // Ensure arrays are actually arrays (sometimes they come as strings from DB)
  const ensureArray = (val: any) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return [val];
    return [];
  };

  return (
    <CityAuditorPage
      cityName={content.cityName}
      citySlug={content.citySlug}
      heroDescription={content.heroDescription}
      localInsights={ensureArray(content.localInsights)}
      pricingNotes={ensureArray(content.pricingNotes)}
      industries={ensureArray(content.industries)}
      onsitePolicy={content.onsitePolicy}
      remoteVsOnsiteText={content.remoteVsOnsiteText}
      firmReputationText={content.firmReputationText}
      automationText={content.automationText}
      faqs={content.faqs || []}
      nearbyCities={ensureArray(content.nearbyCities).map((c: any) => 
        typeof c === 'string' ? { name: c, href: `/auditor-directory/${c.toLowerCase().replace(/\s+/g, '-')}` } : c
      )}
    />
  );
}
