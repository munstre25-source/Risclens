import { MetadataRoute } from 'next';
import { ROUTES, getRouteBucket } from '@/src/seo/routes';
import { getSupabaseAdmin } from '@/lib/supabase';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://risclens.com';
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

async function getPSEORoutes() {
  if (!hasSupabaseAdmin) return [];
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from('pseo_pages')
      .select('slug, category, framework:pseo_frameworks(slug)');

    return data?.map(p => {
      const frameworkSlug = (p.framework as any)?.slug;
      
      switch (p.category) {
        case 'role': return `/soc-2/for/${p.slug}`;
        case 'pricing': return `/pricing/${p.slug}`;
        case 'alternatives': return `/compare/${p.slug}`;
        case 'directory': return `/auditor-directory/${p.slug}`;
        case 'stack': return `/soc-2/stack/${p.slug}`;
        case 'industry': return `/soc-2/industries/${p.slug}`;
        case 'compliance': 
          if (frameworkSlug === 'soc-2' || frameworkSlug === 'iso-27001') {
            return `/compliance/${frameworkSlug}/${p.slug}`;
          }
          return `/ai-governance/${p.slug}`;
        default:
          if (frameworkSlug === 'ai-governance') return `/ai-governance/${p.slug}`;
          if (['role-based', 'comparison', 'cost', 'roi', 'use-case', 'readiness', 'roadmap', 'analysis', 'checklist', 'risk-assessment', 'classification', 'audit', 'software', 'best-practices', 'budgeting'].includes(p.category || '')) {
            return `/ai-governance/${p.slug}`;
          }
          return null;
      }
    }).filter(Boolean) as string[] || [];
  } catch (err) {
    console.warn('Sitemap: skipping PSEO routes (Supabase unavailable)', err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [dynamicRoutes, migrationRoutes, pseoRoutes] = await Promise.all([
    getDynamicRoutes(),
    getMigrationRoutes(),
    getPSEORoutes()
  ]);

  const allRoutes = Array.from(new Set([...ROUTES, ...dynamicRoutes, ...migrationRoutes, ...pseoRoutes]));

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
    } else if (path.includes('/for/') || path.includes('/pricing/') || path.includes('/compare/')) {
      priority = 0.8;
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

  return entries;
}
