import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import {
    baseUrl,
    BUILD_DATE,
    getUrlPriority,
    hasSupabaseAdmin
} from '@/lib/sitemap-utils';
import { getSupabaseAdmin } from '@/lib/supabase';
import {
    COMMERCIAL_ROUTES,
    generateAlternativesRoutes,
    generateComparisonRoutes,
    generatePricingRoutes,
    getResolvableComplianceToolSlugs
} from '@/src/seo/routes';

/**
 * Compare & Alternatives Sitemap
 * Includes:
 * - /compare/[tool]-vs-[tool]
 * - /compare/[tool]-alternatives
 * - /compare/[tool]-alternatives/for/[industry]
 * - /pricing/[tool]
 */
export async function GET() {
    noStore();
    const entries: Array<{ url: string; lastmod: string; priority: number; changefreq: string }> = [];

    const staticCompareRoutes = COMMERCIAL_ROUTES.filter((route) =>
        route === '/compare' || route.startsWith('/compare/')
    );
    const toolSlugs = await getResolvableComplianceToolSlugs();
    const generatedToolRoutes = [
        ...generatePricingRoutes(toolSlugs),
        ...generateAlternativesRoutes(toolSlugs),
        ...generateComparisonRoutes(toolSlugs),
    ];
    const compareRoutes = Array.from(new Set([...staticCompareRoutes, ...generatedToolRoutes]));

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

            const [{ data: industries }, { data: companies }] = await Promise.all([
                supabase.from('pseo_industries').select('slug'),
                supabase.from('company_signals').select('slug').eq('indexable', true),
            ]);

            const topTools = ['vanta', 'drata', 'secureframe', 'sprinto', 'thoropass'];

            if (industries?.length && companies?.length) {
                for (const company of companies) {
                    for (const industry of industries) {
                        const altPath = `/compare/${company.slug}-alternatives/for/${industry.slug}`;
                        const altMeta = getUrlPriority(altPath);
                        entries.push({
                            url: `${baseUrl}${altPath}`,
                            lastmod: BUILD_DATE.toISOString().split('T')[0],
                            priority: altMeta.priority,
                            changefreq: altMeta.changeFrequency || 'weekly',
                        });

                        if (topTools.includes(company.slug)) {
                            for (const peer of topTools) {
                                if (company.slug === peer) continue;
                                const pairSlug = [company.slug, peer].sort().join('-vs-');
                                const vsPath = `/compare/${pairSlug}/for/${industry.slug}`;
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
