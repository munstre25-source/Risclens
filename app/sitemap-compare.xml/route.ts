import { NextResponse } from 'next/server';
import {
    baseUrl,
    BUILD_DATE,
    getUrlPriority,
    hasSupabaseAdmin
} from '@/lib/sitemap-utils';
import { getSupabaseAdmin } from '@/lib/supabase';
import { COMMERCIAL_ROUTES } from '@/src/seo/routes';
import { BUILD_CONFIG } from '@/lib/build-config';

/**
 * Compare & Alternatives Sitemap
 * Includes:
 * - /compare/[tool]-vs-[tool]
 * - /compare/[tool]-alternatives
 * - /compare/[tool]-alternatives/for/[industry]
 * - /pricing/[tool]
 */
export async function GET() {
    const entries: Array<{ url: string; lastmod: string; priority: number; changefreq: string }> = [];

    // Add static comparison routes from COMMERCIAL_ROUTES
    const compareRoutes = COMMERCIAL_ROUTES.filter(r =>
        r.startsWith('/compare/') || r.startsWith('/pricing/')
    );

    for (const path of compareRoutes) {
        const { priority, changeFrequency } = getUrlPriority(path);
        entries.push({
            url: `${baseUrl}${path}`,
            lastmod: BUILD_DATE.toISOString().split('T')[0],
            priority,
            changefreq: changeFrequency || 'weekly',
        });
    }

    // Add dynamic comparison routes from database
    if (hasSupabaseAdmin) {
        try {
            const supabase = getSupabaseAdmin();

            const [
                { data: tools },
                { data: industries }
            ] = await Promise.all([
                supabase.from('compliance_tools').select('slug').eq('is_active', true).order('display_order', { ascending: true }),
                supabase.from('pseo_industries').select('slug').in('slug', BUILD_CONFIG.PRIORITY_INDUSTRIES)
            ]);

            const topTools = BUILD_CONFIG.PRIORITY_TOOLS;

            if (tools && industries) {
                const prioritizedTools = tools.filter(t => topTools.includes(t.slug));
                for (const c of prioritizedTools) {
                    for (const i of industries) {
                        // /compare/[company]-alternatives/for/[industry]
                        const altPath = `/compare/${c.slug}-alternatives/for/${i.slug}`;
                        const altMeta = getUrlPriority(altPath);
                        entries.push({
                            url: `${baseUrl}${altPath}`,
                            lastmod: BUILD_DATE.toISOString().split('T')[0],
                            priority: altMeta.priority,
                            changefreq: altMeta.changeFrequency || 'weekly',
                        });

                        // Add cross-comparisons for top tools
                        for (const t2 of topTools) {
                            if (c.slug !== t2) {
                                const vsPath = `/compare/${c.slug}-vs-${t2}/for/${i.slug}`;
                                const vsMeta = getUrlPriority(vsPath);
                                entries.push({
                                    url: `${baseUrl}${vsPath}`,
                                    lastmod: BUILD_DATE.toISOString().split('T')[0],
                                    priority: vsMeta.priority,
                                    changefreq: vsMeta.changeFrequency || 'weekly',
                                });
                            }
                        }
                    }
                }
            }
        } catch (err) {
            console.warn('Sitemap: Error fetching compare data', err);
        }
    }

    // Dedupe by URL
    const seen = new Set<string>();
    const uniqueEntries = entries.filter(e => {
        if (seen.has(e.url)) return false;
        seen.add(e.url);
        return true;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueEntries.map(e => `  <url>
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
