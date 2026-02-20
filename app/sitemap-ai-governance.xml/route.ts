import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import {
    baseUrl,
    BUILD_DATE,
    getUrlPriority,
    getPseoPagesByCategory
} from '@/lib/sitemap-utils';

/**
 * AI Governance Sitemap
 * Includes:
 * - /ai-governance/[slug]
 * - /ai-compliance/[category]/[slug]
 * - ISO-42001, EU AI Act, NIST AI RMF related pages
 */
export async function GET() {
    noStore();
    const entries: Array<{ url: string; lastmod: string; priority: number; changefreq: string }> = [];

    // Get AI governance pSEO pages from DB
    const aiCategories = [
        'role-based', 'comparison', 'cost', 'roi', 'use-case',
        'readiness', 'roadmap', 'analysis', 'checklist',
        'risk-assessment', 'classification', 'audit', 'software',
        'best-practices', 'budgeting'
    ];

    const aiPages = await getPseoPagesByCategory(aiCategories);

    for (const page of aiPages) {
        if (page.slug.includes('/')) continue; // Skip invalid slugs

        const frameworkSlug = (page.framework as any)?.slug;

        // Route to ai-governance if framework is ai-governance or category matches
        if (frameworkSlug === 'ai-governance' || aiCategories.includes(page.category || '')) {
            const path = `/ai-governance/${page.slug}`;
            const { priority, changeFrequency } = getUrlPriority(path);
            entries.push({
                url: `${baseUrl}${path}`,
                lastmod: page.updated_at ? new Date(page.updated_at).toISOString().split('T')[0] : BUILD_DATE.toISOString().split('T')[0],
                priority,
                changefreq: changeFrequency || 'weekly',
            });
        }
    }

    // Static AI compliance pages
    const staticAiPages = [
        '/ai-governance',
        '/ai-governance-readiness-index',
        '/ai-governance/risk-classifier',
        '/ai-governance/vendor-risk-questionnaire',
        '/ai-compliance',
        '/ai-compliance/eu-ai-act',
        '/ai-compliance/iso-42001',
        '/ai-compliance/nist-ai-rmf',
        '/ai-compliance/compare/soc-2-vs-iso-42001',
        '/ai-compliance/compare/iso-42001-vs-eu-ai-act',
        '/ai-compliance/stack/aws-bedrock',
        '/ai-compliance/stack/azure-openai',
        '/ai-compliance/stack/google-vertex-ai',
        '/ai-compliance/industries/fintech',
        '/ai-compliance/industries/hr-tech',
        '/ai-compliance/industries/healthcare',
        '/iso-42001-calculator',
    ];

    for (const path of staticAiPages) {
        const { priority, changeFrequency } = getUrlPriority(path);
        entries.push({
            url: `${baseUrl}${path}`,
            lastmod: BUILD_DATE.toISOString().split('T')[0],
            priority,
            changefreq: changeFrequency || 'weekly',
        });
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
