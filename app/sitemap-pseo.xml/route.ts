import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import {
    baseUrl,
    BUILD_DATE,
    getUrlPriority,
    hasSupabaseAdmin
} from '@/lib/sitemap-utils';
import { getSupabaseAdmin } from '@/lib/supabase';

/**
 * pSEO Pages Sitemap
 * Includes all pages from pseo_pages table by category:
 * - pricing → /pricing/[slug]
 * - alternatives → /compare/[slug]
 * - directory → /auditor-directory/[slug]
 * - stack → /soc-2/stack/[slug]
 * - compliance → /compliance/[framework]/[slug] or /ai-governance/[slug]
 */
export async function GET() {
    noStore();
    const entries: Array<{ url: string; lastmod: string; priority: number; changefreq: string }> = [];

    if (!hasSupabaseAdmin) {
        return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
            headers: { 'Content-Type': 'application/xml' },
        });
    }

    try {
        const supabase = getSupabaseAdmin();

        const { data: pseoPages } = await supabase
            .from('pseo_pages')
            .select('slug, category, updated_at, framework:pseo_frameworks(slug)');

        if (pseoPages) {
            for (const p of pseoPages) {
                // Skip slugs that contain slashes to avoid invalid URL segments
                if (p.slug.includes('/')) continue;

                const frameworkSlug = (p.framework as any)?.slug;
                let path: string | null = null;

                switch (p.category) {
                    case 'pricing':
                        path = `/pricing/${p.slug}`;
                        break;
                    case 'alternatives':
                        path = `/compare/${p.slug}`;
                        break;
                    case 'directory':
                        path = `/auditor-directory/${p.slug}`;
                        break;
                    case 'stack':
                        path = `/soc-2/stack/${p.slug}`;
                        break;
                    case 'compliance':
                        if (['soc-2', 'iso-27001', 'pci-dss', 'hipaa', 'gdpr'].includes(frameworkSlug)) {
                            path = `/compliance/${frameworkSlug}/${p.slug}`;
                        } else {
                            path = `/ai-governance/${p.slug}`;
                        }
                        break;
                    case 'role-based':
                    case 'comparison':
                    case 'cost':
                    case 'roi':
                    case 'use-case':
                    case 'readiness':
                    case 'roadmap':
                    case 'analysis':
                    case 'checklist':
                    case 'risk-assessment':
                    case 'classification':
                    case 'audit':
                    case 'software':
                    case 'best-practices':
                    case 'budgeting':
                        if (frameworkSlug === 'ai-governance') {
                            path = `/ai-governance/${p.slug}`;
                        }
                        break;
                    // role and industry categories are handled by sitemap-roles.xml
                    default:
                        break;
                }

                if (path) {
                    const { priority, changeFrequency } = getUrlPriority(path);
                    entries.push({
                        url: `${baseUrl}${path}`,
                        lastmod: p.updated_at ? new Date(p.updated_at).toISOString().split('T')[0] : BUILD_DATE.toISOString().split('T')[0],
                        priority,
                        changefreq: changeFrequency || 'weekly',
                    });
                }
            }
        }
    } catch (err) {
        console.warn('Sitemap: Error generating pSEO pages sitemap', err);
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
