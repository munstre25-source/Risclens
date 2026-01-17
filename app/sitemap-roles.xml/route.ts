import { NextResponse } from 'next/server';
import {
    baseUrl,
    BUILD_DATE,
    getUrlPriority,
    hasSupabaseAdmin
} from '@/lib/sitemap-utils';
import { getSupabaseAdmin } from '@/lib/supabase';

/**
 * Roles & Industry Matrix Sitemap
 * Includes:
 * - /soc-2/for/[role]
 * - /[framework]/for/[role]/[industry]
 * - /soc-2/industries/[industry]
 * - pSEO pages with role/industry categories
 */
export async function GET() {
    const entries: Array<{ url: string; lastmod: string; priority: number; changefreq: string }> = [];

    if (!hasSupabaseAdmin) {
        return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
            headers: { 'Content-Type': 'application/xml' },
        });
    }

    try {
        const supabase = getSupabaseAdmin();

        const [
            { data: frameworks },
            { data: roles },
            { data: industries },
            { data: rolePages },
            { data: industryPages }
        ] = await Promise.all([
            supabase.from('pseo_frameworks').select('slug'),
            supabase.from('pseo_roles').select('slug'),
            supabase.from('pseo_industries').select('slug'),
            supabase.from('pseo_pages').select('slug, updated_at').eq('category', 'role'),
            supabase.from('pseo_pages').select('slug, updated_at').eq('category', 'industry')
        ]);

        // Add role pages from DB: /soc-2/for/[role]
        if (rolePages) {
            for (const page of rolePages) {
                if (page.slug.includes('/')) continue;
                const path = `/soc-2/for/${page.slug}`;
                const { priority, changeFrequency } = getUrlPriority(path);
                entries.push({
                    url: `${baseUrl}${path}`,
                    lastmod: page.updated_at ? new Date(page.updated_at).toISOString().split('T')[0] : BUILD_DATE.toISOString().split('T')[0],
                    priority,
                    changefreq: changeFrequency || 'weekly',
                });
            }
        }

        // Add industry pages from DB: /soc-2/industries/[industry]
        if (industryPages) {
            for (const page of industryPages) {
                if (page.slug.includes('/')) continue;
                const path = `/soc-2/industries/${page.slug}`;
                const { priority, changeFrequency } = getUrlPriority(path);
                entries.push({
                    url: `${baseUrl}${path}`,
                    lastmod: page.updated_at ? new Date(page.updated_at).toISOString().split('T')[0] : BUILD_DATE.toISOString().split('T')[0],
                    priority,
                    changefreq: changeFrequency || 'weekly',
                });
            }
        }

        // Generate role/industry matrix: /[framework]/for/[role]/[industry]
        if (frameworks && roles && industries) {
            const roleFrameworks = ['soc-2', 'iso-27001', 'pci-dss', 'hipaa', 'gdpr'];

            for (const f of frameworks) {
                if (!roleFrameworks.includes(f.slug)) continue;
                for (const r of roles) {
                    for (const i of industries) {
                        const path = `/${f.slug}/for/${r.slug}/${i.slug}`;
                        const { priority, changeFrequency } = getUrlPriority(path);
                        entries.push({
                            url: `${baseUrl}${path}`,
                            lastmod: BUILD_DATE.toISOString().split('T')[0],
                            priority,
                            changefreq: changeFrequency || 'weekly',
                        });
                    }
                }
            }
        }
    } catch (err) {
        console.warn('Sitemap: Error generating roles sitemap', err);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
