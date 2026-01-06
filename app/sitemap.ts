import { MetadataRoute } from 'next';
import { ROUTES, getRouteBucket } from '@/src/seo/routes';
import { createClient } from '@supabase/supabase-js';

const baseUrl = 'https://risclens.com';

// Build date used as fallback for lastmod
const BUILD_DATE = new Date();

async function getDynamicRoutes() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data } = await supabase
    .from('company_signals')
    .select('slug')
    .eq('indexable', true);

  return data?.map(c => `/compliance/directory/${c.slug}`) || [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = Array.from(new Set([...ROUTES, ...dynamicRoutes]));

  const entries = allRoutes.map((path) => {
    const bucket = getRouteBucket(path);
    
    // Priority logic per bucket
    let priority = 0.7; // Default fallback
    let changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly';

    if (path.startsWith('/compliance/directory/')) {
      priority = 0.75;
      changeFrequency = 'weekly';
    } else {
      switch (bucket) {
        case 'flagship':
          priority = 1.0;
          changeFrequency = 'weekly';
          break;
        case 'calculator':
          priority = 0.95;
          changeFrequency = 'weekly';
          break;
        case 'hub':
          priority = 0.9;
          changeFrequency = 'weekly';
          break;
        case 'commercial':
          priority = 0.8;
          changeFrequency = 'weekly';
          break;
        case 'learn':
          priority = 0.7;
          changeFrequency = 'monthly';
          break;
        case 'legal':
          priority = 0.4;
          changeFrequency = 'monthly';
          break;
      }
    }

    return {
      url: `${baseUrl}${path === '/' ? '' : path}`,
      lastModified: BUILD_DATE,
      changeFrequency,
      priority,
    };
  });

  // Sanity check summary in dev
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Total indexable routes: ${allRoutes.length} (${dynamicRoutes.length} dynamic)`);
  }

  return entries;
}
