import { MetadataRoute } from 'next';
import { getSupabaseAdmin } from '@/lib/supabase';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://risclens.com';
const hasSupabaseAdmin = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

// Build date used as fallback for lastmod
const BUILD_DATE = new Date();

export type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Priority tiers for sitemap - helps Google understand page importance
 */
export function getUrlPriority(path: string): { priority: number; changeFrequency: SitemapEntry['changeFrequency'] } {
    // Tier 1: High-intent conversion pages (priority 1.0)
    const tier1Paths = [
        '/',
        '/soc-2-readiness-index',
        '/soc-2-readiness-calculator',
        '/soc-2-cost',
        '/soc-2-cost-calculator',
        '/soc-2-timeline',
        '/auditor-match',
        '/iso-42001-calculator',
        '/ai-governance-readiness-index',
        '/compliance-roi-calculator',
        '/pci-dss-readiness-calculator',
    ];

    if (tier1Paths.includes(path)) {
        return { priority: 1.0, changeFrequency: 'daily' };
    }

    // Tier 2: Main hubs and comparison pages (priority 0.9)
    if (
        path === '/soc-2' ||
        path === '/penetration-testing' ||
        path === '/vendor-risk-assessment' ||
        path === '/compare' ||
        path === '/tools' ||
        path === '/ai-governance' ||
        path === '/ai-compliance' ||
        path.match(/^\/compare\/[^/]+-vs-[^/]+$/) || // Direct comparisons
        path.match(/^\/compare\/[^/]+-alternatives$/) // Alternatives pages
    ) {
        return { priority: 0.9, changeFrequency: 'weekly' };
    }

    // Tier 3: Industry-specific high-intent pages (priority 0.85)
    if (
        path.includes('/soc-2/industries/') ||
        path.includes('/pricing/') ||
        path.includes('/compliance/migrate/') ||
        path.match(/^\/soc-2-cost\/(fintech|saas|healthcare|startups)$/)
    ) {
        return { priority: 0.85, changeFrequency: 'weekly' };
    }

    // Tier 4: Matrix pages - framework/decision/industry (priority 0.8)
    if (
        path.match(/^\/(soc-2|iso-27001|hipaa|gdpr|pci-dss)\/[^/]+\/[^/]+$/) ||
        path.includes('/for/') ||
        path.includes('/auditor-directory/')
    ) {
        return { priority: 0.8, changeFrequency: 'weekly' };
    }

    // Tier 5: Company directory and evidence pages (priority 0.75)
    if (
        path.includes('/compliance/directory/') ||
        path.includes('/soc-2-evidence/')
    ) {
        return { priority: 0.75, changeFrequency: 'weekly' };
    }

    // Tier 6: Learn content (priority 0.7)
    if (path.includes('/learn/') || path.includes('/glossary/')) {
        return { priority: 0.7, changeFrequency: 'monthly' };
    }

    // Tier 7: Legal pages (priority 0.3)
    if (path === '/privacy' || path === '/terms') {
        return { priority: 0.3, changeFrequency: 'monthly' };
    }

    // Default for all other pSEO pages
    return { priority: 0.7, changeFrequency: 'weekly' };
}

/**
 * Create a sitemap entry from a path
 */
export function createSitemapEntry(path: string, lastModified?: Date): SitemapEntry {
    const { priority, changeFrequency } = getUrlPriority(path);
    return {
        url: `${baseUrl}${path === '/' ? '' : path}`,
        lastModified: lastModified || BUILD_DATE,
        changeFrequency,
        priority,
    };
}

/**
 * Fetch framework data from Supabase
 */
export async function getFrameworkData() {
    if (!hasSupabaseAdmin) return null;

    try {
        const supabase = getSupabaseAdmin();

        const [
            { data: frameworks },
            { data: decisions },
            { data: industries },
            { data: roles },
        ] = await Promise.all([
            supabase.from('pseo_frameworks').select('slug'),
            supabase.from('pseo_decision_types').select('slug'),
            supabase.from('pseo_industries').select('slug'),
            supabase.from('pseo_roles').select('slug'),
        ]);

        return { frameworks, decisions, industries, roles };
    } catch (err) {
        console.warn('Sitemap: Error fetching framework data', err);
        return null;
    }
}

/**
 * Fetch company/directory data from Supabase
 */
export async function getDirectoryData() {
    if (!hasSupabaseAdmin) return null;

    try {
        const supabase = getSupabaseAdmin();

        const [
            { data: companies },
            { data: migrations },
            { data: locations },
        ] = await Promise.all([
            supabase.from('company_signals').select('slug, updated_at').eq('indexable', true),
            supabase.from('framework_migrations').select('slug'),
            supabase.from('pseo_locations').select('slug'),
        ]);

        return { companies, migrations, locations };
    } catch (err) {
        console.warn('Sitemap: Error fetching directory data', err);
        return null;
    }
}

/**
 * Fetch pSEO pages by category from Supabase
 */
export async function getPseoPagesByCategory(categories: string[]) {
    if (!hasSupabaseAdmin) return [];

    try {
        const supabase = getSupabaseAdmin();

        const { data: pages } = await supabase
            .from('pseo_pages')
            .select('slug, category, updated_at, framework:pseo_frameworks(slug)')
            .in('category', categories);

        return pages || [];
    } catch (err) {
        console.warn('Sitemap: Error fetching pSEO pages', err);
        return [];
    }
}

export { baseUrl, BUILD_DATE, hasSupabaseAdmin };
