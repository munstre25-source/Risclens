import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityAuditorPage from '@/components/CityAuditorPage';
import { 
  getValidPseoSlugs, 
  getString, 
  getArray,
  generateFallbackTitle,
  generateFallbackDescription 
} from '@/lib/pseo-validation';
import { generateLocationFAQs } from '@/lib/seo-enhancements';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

const LOCATION_FALLBACKS: Record<string, { cityName: string; nearbyCities: Array<{ name: string; href: string }> }> = {
  bangalore: {
    cityName: 'Bangalore',
    nearbyCities: [
      { name: 'Singapore', href: '/auditor-directory/singapore' },
      { name: 'London', href: '/auditor-directory/london' },
      { name: 'San Francisco', href: '/auditor-directory/san-francisco' },
    ],
  },
  berlin: {
    cityName: 'Berlin',
    nearbyCities: [
      { name: 'London', href: '/auditor-directory/london' },
      { name: 'New York', href: '/auditor-directory/new-york' },
      { name: 'San Francisco', href: '/auditor-directory/san-francisco' },
    ],
  },
  london: {
    cityName: 'London',
    nearbyCities: [
      { name: 'Berlin', href: '/auditor-directory/berlin' },
      { name: 'New York', href: '/auditor-directory/new-york' },
      { name: 'Singapore', href: '/auditor-directory/singapore' },
    ],
  },
  singapore: {
    cityName: 'Singapore',
    nearbyCities: [
      { name: 'Bangalore', href: '/auditor-directory/bangalore' },
      { name: 'Sydney', href: '/auditor-directory/sydney' },
      { name: 'San Francisco', href: '/auditor-directory/san-francisco' },
    ],
  },
  sydney: {
    cityName: 'Sydney',
    nearbyCities: [
      { name: 'Singapore', href: '/auditor-directory/singapore' },
      { name: 'London', href: '/auditor-directory/london' },
      { name: 'San Francisco', href: '/auditor-directory/san-francisco' },
    ],
  },
};

async function getDirectoryPageBySlug(location: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('category', 'directory')
    .eq('slug', location)
    .maybeSingle();

  if (error) {
    console.error(`Failed to load directory page for ${location}:`, error);
    return null;
  }

  return data;
}

export async function generateStaticParams() {
  const dynamicParams = await getValidPseoSlugs('directory', 'location');
  const fallbackParams = Object.keys(LOCATION_FALLBACKS).map((location) => ({ location }));
  const merged = [...dynamicParams];

  for (const fallback of fallbackParams) {
    if (!merged.find((item) => item.location === fallback.location)) {
      merged.push(fallback);
    }
  }

  return merged;
}

interface PageProps {
  params: { location: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getDirectoryPageBySlug(params.location);
  
  const cityName = page?.content_json?.cityName;
  if (page && cityName) {
    return {
      title: page.title || generateFallbackTitle(params.location, 'directory'),
      description: page.meta_description || generateFallbackDescription(params.location, 'directory'),
      alternates: {
        canonical: `https://risclens.com/auditor-directory/${params.location}`,
      },
    };
  }

  const fallback = LOCATION_FALLBACKS[params.location];
  if (fallback) {
    return {
      title: `SOC 2 Auditors in ${fallback.cityName} | RiscLens`,
      description: `Find SOC 2 auditors in ${fallback.cityName}. Compare firms, scope fit, and engagement options for your compliance program.`,
      alternates: {
        canonical: `https://risclens.com/auditor-directory/${params.location}`,
      },
    };
  }

  return { 
    title: 'Page Not Found | RiscLens',
    robots: { index: false }
  };
}

export default async function DynamicCityAuditorPage({ params }: PageProps) {
  const page = await getDirectoryPageBySlug(params.location);

  if (page && page.content_json?.cityName) {
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

  const fallback = LOCATION_FALLBACKS[params.location];
  if (!fallback) {
    notFound();
  }

  const faqs = generateLocationFAQs(fallback.cityName);

  return (
    <CityAuditorPage
      cityName={fallback.cityName}
      citySlug={params.location}
      heroDescription={`Find top SOC 2 auditors in ${fallback.cityName}. Compare pricing, reviews, and expertise.`}
      localInsights={[
        `${fallback.cityName} has a growing market for compliance and assurance services.`,
        'Most firms support remote evidence collection and hybrid audit workflows.',
      ]}
      pricingNotes={['Pricing varies by scope, control maturity, and audit type.']}
      industries={['Technology', 'Financial Services', 'Healthcare']}
      onsitePolicy={'Most auditors offer remote and hybrid options.'}
      remoteVsOnsiteText={'Remote audits are common and can reduce travel overhead while maintaining evidence rigor.'}
      firmReputationText={'Prioritize firms with relevant industry experience, references, and clear engagement scopes.'}
      automationText={'Automation platforms can reduce manual evidence collection and improve audit readiness cadence.'}
      faqs={faqs}
      nearbyCities={fallback.nearbyCities}
    />
  );
}
