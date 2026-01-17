import { NextResponse } from 'next/server';
import {
    FLAGSHIP_ROUTES,
    CALCULATOR_ROUTES,
    HUB_ROUTES,
    LEGAL_ROUTES,
    LEARN_ROUTES
} from '@/src/seo/routes';
import { baseUrl, getUrlPriority, BUILD_DATE } from '@/lib/sitemap-utils';

/**
 * Core Sitemap - High priority pages
 * Includes: Homepage, calculators, hubs, learn, legal
 */
export async function GET() {
    const coreRoutes = [
        ...FLAGSHIP_ROUTES,
        ...CALCULATOR_ROUTES,
        ...HUB_ROUTES,
        ...LEARN_ROUTES,
        ...LEGAL_ROUTES,
    ];

    // Deduplicate
    const uniqueRoutes = Array.from(new Set(coreRoutes));

    const entries = uniqueRoutes
        .map(path => {
            const { priority, changeFrequency } = getUrlPriority(path);
            return {
                url: `${baseUrl}${path === '/' ? '' : path}`,
                lastmod: BUILD_DATE.toISOString().split('T')[0],
                priority,
                changefreq: changeFrequency || 'weekly',
            };
        })
        .sort((a, b) => (b.priority || 0) - (a.priority || 0));

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
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
