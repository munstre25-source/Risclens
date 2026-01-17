import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://risclens.com';

/**
 * Sitemap Index - points to all child sitemaps
 * This is better for crawl budget and organization at scale (22K+ pages)
 */
export async function GET() {
    const sitemaps = [
        'sitemap-core.xml',           // High-priority core pages
        'sitemap-frameworks.xml',     // Framework matrix pages (soc-2, iso-27001, etc.)
        'sitemap-compare.xml',        // Comparison and alternatives pages
        'sitemap-directory.xml',      // Company directory and auditor pages
        'sitemap-roles.xml',          // Role and industry matrix pages
        'sitemap-pseo.xml',           // pSEO category pages (pricing, alternatives, stack, etc.)
        'sitemap-ai-governance.xml',  // AI governance pages
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${baseUrl}/${sitemap}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
