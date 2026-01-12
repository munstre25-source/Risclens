import { MetadataRoute } from 'next';
import { ROUTES, getRouteBucket } from '@/src/seo/routes';
import { getSupabaseAdmin } from '@/lib/supabase';

const baseUrl = 'https://risclens.com';
const hasSupabaseAdmin = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

// Build date used as fallback for lastmod
const BUILD_DATE = new Date();

async function getDynamicRoutes() {
  if (!hasSupabaseAdmin) return [];
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from('company_signals')
      .select('slug')
      .eq('indexable', true);

    return data?.map(c => `/compliance/directory/${c.slug}`) || [];
  } catch (err) {
    console.warn('Sitemap: skipping dynamic compliance routes (Supabase unavailable)', err);
    return [];
  }
}

async function getMigrationRoutes() {
  if (!hasSupabaseAdmin) return [];
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from('framework_migrations')
      .select('slug');

    return data?.map(m => `/compliance/migrate/${m.slug}`) || [];
  } catch (err) {
    console.warn('Sitemap: skipping migration routes (Supabase unavailable)', err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes = await getDynamicRoutes();
  const migrationRoutes = await getMigrationRoutes();
  const allRoutes = Array.from(new Set([...ROUTES, ...dynamicRoutes, ...migrationRoutes]));

  const entries = allRoutes.map((path) => {
    const bucket = getRouteBucket(path);
    
    // Priority logic per bucket
    let priority = 0.7; // Default fallback
    let changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly';

    if (path.startsWith('/compliance/directory/')) {
      priority = 0.75;
      changeFrequency = 'weekly';
    } else if (path.startsWith('/compliance/migrate/')) {
      priority = 0.85;
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
