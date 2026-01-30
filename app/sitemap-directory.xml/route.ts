import { NextResponse } from 'next/server';
import {
    baseUrl,
    getUrlPriority,
    getDirectoryData,
    hasSupabaseAdmin
} from '@/lib/sitemap-utils';
import { getValidPseoSlugs } from '@/lib/pseo-validation';

/**
 * Directory Sitemap
 * Includes:
 * - /compliance/directory/[company]
 * - /compliance/migrate/[migration]
 * - /auditor-directory/[location]
 */
export async function GET() {
    const entries: Array<{ url: string; lastmod: string; priority: number; changefreq: string }> = [];

    const data = await getDirectoryData();

    if (data?.companies) {
        for (const c of data.companies) {
            const path = `/compliance/directory/${c.slug}`;
            const { priority, changeFrequency } = getUrlPriority(path);
            entries.push({
                url: `${baseUrl}${path}`,
                lastmod: c.updated_at ? new Date(c.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                priority,
                changefreq: changeFrequency || 'weekly',
            });
        }
    }

    if (data?.migrations) {
        for (const m of data.migrations) {
            const path = `/compliance/migrate/${m.slug}`;
            const { priority, changeFrequency } = getUrlPriority(path);
            entries.push({
                url: `${baseUrl}${path}`,
                lastmod: new Date().toISOString().split('T')[0],
                priority,
                changefreq: changeFrequency || 'weekly',
            });
        }
    }

    const locationPages = hasSupabaseAdmin ? await getValidPseoSlugs('directory', 'slug') : [];
    for (const l of locationPages) {
        const path = `/auditor-directory/${l.slug}`;
        const { priority, changeFrequency } = getUrlPriority(path);
        entries.push({
            url: `${baseUrl}${path}`,
            lastmod: new Date().toISOString().split('T')[0],
            priority,
            changefreq: changeFrequency || 'weekly',
        });
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
