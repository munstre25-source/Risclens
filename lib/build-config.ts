/**
 * Build Configuration for pSEO Page Generation
 * 
 * This file controls how many pages are pre-rendered at build time vs ISR.
 * 
 * Target: ~500 static pages (high-intent only)
 * All other pages use ISR (Incremental Static Regeneration) with 24hr revalidation
 */

export const BUILD_CONFIG = {
    // Maximum total static pages to build
    MAX_STATIC_PAGES: 500,

    // Revalidation period for ISR (24 hours in seconds)
    REVALIDATE_SECONDS: 86400,

    // High-priority frameworks (always pre-render)
    PRIORITY_FRAMEWORKS: ['soc-2', 'iso-27001'],

    // High-priority industries (always pre-render)
    PRIORITY_INDUSTRIES: ['saas', 'fintech', 'healthcare', 'ai-ml'],

    // High-priority tools for comparisons
    PRIORITY_TOOLS: ['vanta', 'drata', 'secureframe', 'sprinto', 'thoropass'],

    // Limits per route type
    ROUTE_LIMITS: {
        // [framework]/[slug]/[industry] matrix
        frameworkMatrix: 200,

        // [framework]/for/[role]/[industry]
        roleMatrix: 80,

        // /compare/[slug]/for/[industry]
        compareIndustry: 100,

        // /compliance/directory/[slug]
        directory: 50,

        // Other dynamic routes
        other: 70,
    },

    // Number of decision types to pre-render per framework
    DECISIONS_PER_FRAMEWORK: 5,

    // Number of industries to pre-render per route
    INDUSTRIES_PER_ROUTE: 4,

    // Number of roles to pre-render
    ROLES_LIMIT: 4,
};

/**
 * Helper to limit static params
 */
export function limitStaticParams<T>(params: T[], limit: number): T[] {
    return params.slice(0, limit);
}

/**
 * Check if a framework should be pre-rendered
 */
export function isPriorityFramework(slug: string): boolean {
    return BUILD_CONFIG.PRIORITY_FRAMEWORKS.includes(slug);
}

/**
 * Check if an industry should be pre-rendered
 */
export function isPriorityIndustry(slug: string): boolean {
    return BUILD_CONFIG.PRIORITY_INDUSTRIES.includes(slug);
}

/**
 * Check if a tool should be pre-rendered
 */
export function isPriorityTool(slug: string): boolean {
    return BUILD_CONFIG.PRIORITY_TOOLS.includes(slug);
}
