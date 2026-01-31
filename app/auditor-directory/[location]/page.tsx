import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityAuditorPage from '@/components/CityAuditorPage';
import { getPSEOPageBySlug } from '@/lib/pseo';
import { 
  getValidPseoSlugs, 
  getString, 
  getArray,
  generateFallbackTitle,
  generateFallbackDescription 
} from '@/lib/pseo-validation';
import { generateLocationFAQs } from '@/lib/seo-enhancements';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  // Only generate pages with valid content (has cityName)
  return getValidPseoSlugs('directory', 'location');
}

interface PageProps {
  params: { location: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPSEOPageBySlug(params.location);
  
  // Generate fallback metadata if page is missing/incomplete
  const cityName = page?.content_json?.cityName;
  if (!page || !cityName) {
    return { 
      title: 'Page Not Found | RiscLens',
      robots: { index: false }
    };
  }

  return {
    title: page.title || generateFallbackTitle(params.location, 'directory'),
    description: page.meta_description || generateFallbackDescription(params.location, 'directory'),
    alternates: {
      canonical: `https://risclens.com/auditor-directory/${params.location}`,
    },
  };
}

export default async function DynamicCityAuditorPage({ params }: PageProps) {
  const page = await getPSEOPageBySlug(params.location);

  // Validate page exists and has required cityName field
  if (!page || page.category !== 'directory' || !page.content_json?.cityName) {
    notFound();
  }

  const content = page.content_json;
  const cityName = getString(content, 'cityName', params.location);
  const contentFaqs = getArray(content, 'faqs', []);
  const faqs = contentFaqs.length > 0 ? contentFaqs : generateLocationFAQs(cityName);

  return (
    <CityAuditorPage
      cityName={cityName}
      citySlug={getString(content, 'citySlug', params.location)}
      heroDescription={getString(content, 'heroDescription', `Find top SOC 2 auditors in ${cityName}. Compare pricing, reviews, and expertise.`)}
      localInsights={getArray(content, 'localInsights', [`${cityName} has a growing tech sector with increasing demand for SOC 2 compliance.`])}
      pricingNotes={getArray(content, 'pricingNotes', ['Prices vary by firm size and scope.'])}
      industries={getArray(content, 'industries', ['Technology', 'Healthcare', 'Financial Services'])}
      onsitePolicy={getString(content, 'onsitePolicy', 'Most auditors offer remote and hybrid options.')}
      remoteVsOnsiteText={getString(content, 'remoteVsOnsiteText', 'Remote audits are increasingly common and can reduce costs.')}
      firmReputationText={getString(content, 'firmReputationText', 'Check references and verify credentials before selecting an auditor.')}
      automationText={getString(content, 'automationText', 'Many firms now use compliance automation tools to streamline the audit process.')}
      faqs={faqs}
      nearbyCities={getArray(content, 'nearbyCities', []).map((c: any) => 
        typeof c === 'string' ? { name: c, href: `/auditor-directory/${c.toLowerCase().replace(/\s+/g, '-')}` } : c
      )}
    />
  );
}
