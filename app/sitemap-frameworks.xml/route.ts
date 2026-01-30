import { NextResponse } from 'next/server';
import {
    baseUrl,
    BUILD_DATE,
    getUrlPriority,
    getFrameworkData
} from '@/lib/sitemap-utils';
import { BUILD_CONFIG } from '@/lib/build-config';

/**
 * Framework Matrix Sitemap
 * Generates: /[framework]/[decision]/[industry] combinations
 * ~2,700+ pages for SOC-2, ISO-27001, HIPAA, GDPR, PCI-DSS, AI frameworks
 */
export async function GET() {
    const data = await getFrameworkData();

    const entries: Array<{ url: string; lastmod: string; priority: number; changefreq: string }> = [];

    if (data?.frameworks && data?.decisions && data?.industries) {
        const matrixFrameworks = BUILD_CONFIG.PRIORITY_FRAMEWORKS;
        const limitedDecisions = data.decisions.slice(0, BUILD_CONFIG.DECISIONS_PER_FRAMEWORK);
        const limitedIndustries = data.industries.filter(i => BUILD_CONFIG.PRIORITY_INDUSTRIES.includes(i.slug));

        for (const f of data.frameworks) {
            if (!matrixFrameworks.includes(f.slug)) continue;
            for (const d of limitedDecisions) {
                for (const i of limitedIndustries) {
                    const path = `/${f.slug}/${d.slug}/${i.slug}`;
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
