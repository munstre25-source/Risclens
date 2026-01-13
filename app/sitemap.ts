import { MetadataRoute } from 'next';
import { ROUTES, getRouteBucket } from '@/src/seo/routes';
import { getSupabaseAdmin } from '@/lib/supabase';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://risclens.com';
const hasSupabaseAdmin = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

// Build date used as fallback for lastmod
const BUILD_DATE = new Date();

async function getFullDynamicRoutes() {
  if (!hasSupabaseAdmin) return [];
  
  try {
    const supabase = getSupabaseAdmin();
    
    // Fetch all necessary data in parallel
    const [
      { data: companies },
      { data: migrations },
      { data: pseoPages },
      { data: frameworks },
      { data: decisions },
      { data: industries },
      { data: roles },
      { data: locations }
    ] = await Promise.all([
      supabase.from('company_signals').select('slug').eq('indexable', true),
      supabase.from('framework_migrations').select('slug'),
      supabase.from('pseo_pages').select('slug, category, framework:pseo_frameworks(slug)'),
      supabase.from('pseo_frameworks').select('slug'),
      supabase.from('pseo_decision_types').select('slug'),
      supabase.from('pseo_industries').select('slug'),
      supabase.from('pseo_roles').select('slug'),
      supabase.from('pseo_locations').select('slug')
    ]);

    const dynamicRoutes: string[] = [];

    // 1. Company Directory
    companies?.forEach(c => dynamicRoutes.push(`/compliance/directory/${c.slug}`));

    // 2. Migrations
    migrations?.forEach(m => dynamicRoutes.push(`/compliance/migrate/${m.slug}`));

    // 3. Auditor Locations
    locations?.forEach(l => dynamicRoutes.push(`/auditor-directory/${l.slug}`));

    // 4. PSEO Pages (handled by categories)
    pseoPages?.forEach(p => {
      // Skip slugs that contain slashes to avoid invalid URL segments
      if (p.slug.includes('/')) return;

      const frameworkSlug = (p.framework as any)?.slug;
      switch (p.category) {
        case 'role': dynamicRoutes.push(`/soc-2/for/${p.slug}`); break;
        case 'pricing': dynamicRoutes.push(`/pricing/${p.slug}`); break;
        case 'alternatives': dynamicRoutes.push(`/compare/${p.slug}`); break;
        case 'directory': dynamicRoutes.push(`/auditor-directory/${p.slug}`); break;
        case 'stack': dynamicRoutes.push(`/soc-2/stack/${p.slug}`); break;
        case 'industry': dynamicRoutes.push(`/soc-2/industries/${p.slug}`); break;
        case 'compliance': 
          if (frameworkSlug === 'soc-2' || frameworkSlug === 'iso-27001' || frameworkSlug === 'pci-dss' || frameworkSlug === 'hipaa' || frameworkSlug === 'gdpr') {
            dynamicRoutes.push(`/compliance/${frameworkSlug}/${p.slug}`);
          } else {
            dynamicRoutes.push(`/ai-governance/${p.slug}`);
          }
          break;
        default:
          if (frameworkSlug === 'ai-governance' || ['role-based', 'comparison', 'cost', 'roi', 'use-case', 'readiness', 'roadmap', 'analysis', 'checklist', 'risk-assessment', 'classification', 'audit', 'software', 'best-practices', 'budgeting'].includes(p.category || '')) {
            dynamicRoutes.push(`/ai-governance/${p.slug}`);
          }
      }
    });

    // 5. 3-way Matrix: [framework]/[slug]/[industry]
    const matrixFrameworks = ['soc-2', 'iso-27001', 'hipaa', 'gdpr', 'pci-dss', 'ai-governance', 'iso-42001', 'eu-ai-act', 'nist-ai-rmf'];
    if (frameworks && decisions && industries) {
      for (const f of frameworks) {
        if (!matrixFrameworks.includes(f.slug)) continue;
        for (const d of decisions) {
          for (const i of industries) {
            dynamicRoutes.push(`/${f.slug}/${d.slug}/${i.slug}`);
            // Add framework-prefixed slug variant for better SEO mapping
            if (!d.slug.startsWith(f.slug)) {
              dynamicRoutes.push(`/${f.slug}/${f.slug}-${d.slug}/${i.slug}`);
            }
          }
        }
      }
    }

    // 6. 3-way Matrix: [framework]/for/[role]/[industry]
    if (frameworks && roles && industries) {
      for (const f of frameworks) {
        if (!['soc-2', 'iso-27001', 'pci-dss', 'hipaa', 'gdpr'].includes(f.slug)) continue;
        for (const r of roles) {
          for (const i of industries) {
            dynamicRoutes.push(`/${f.slug}/for/${r.slug}/${i.slug}`);
          }
        }
      }
    }

    // 7. Comparison Industry Matrix: /compare/[slug]/for/[industry]
    if (companies && industries) {
      const topTools = ['vanta', 'drata', 'secureframe', 'sprinto', 'thoropass'];
      for (const c of companies) {
        for (const i of industries) {
          dynamicRoutes.push(`/compare/${c.slug}-alternatives/for/${i.slug}`);
          if (topTools.includes(c.slug)) {
             topTools.forEach(t2 => {
               if (c.slug !== t2) {
                 dynamicRoutes.push(`/compare/${c.slug}-vs-${t2}/for/${i.slug}`);
               }
             });
          }
        }
      }
    }

    return dynamicRoutes;
  } catch (err) {
    console.warn('Sitemap: Error generating dynamic routes', err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes = await getFullDynamicRoutes();
  const allRoutes = Array.from(new Set([...ROUTES, ...dynamicRoutes]));

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
