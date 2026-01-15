/**
 * pSEO Page Validation Utilities
 * 
 * Centralized validation to prevent "undefined" content and broken pages.
 * Import and use these in all pSEO page templates.
 */

import { getSupabaseAdmin } from './supabase';

// ============================================================================
// Type Definitions
// ============================================================================

export interface PseoPage {
  id: string;
  slug: string;
  category: string;
  title: string | null;
  meta_description: string | null;
  content_json: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// Category-Specific Validation Rules
// ============================================================================

const VALIDATION_RULES: Record<string, {
  required: string[];
  recommended: string[];
}> = {
  pricing: {
    required: ['toolName'],
    recommended: ['pricingTiers', 'heroDescription'],
  },
  alternatives: {
    required: ['toolName'],
    recommended: ['alternatives', 'heroDescription'],
  },
  framework_comparison: {
    required: ['frameworkA', 'frameworkB'],
    recommended: ['tableRows', 'decisions', 'faqs'],
  },
  directory: {
    required: ['cityName'],
    recommended: ['heroDescription', 'industries', 'faqs'],
  },
  role: {
    required: ['roleName'],
    recommended: ['heroDescription', 'keyPriorities', 'faqs'],
  },
  compliance: {
    required: ['title'],
    recommended: ['description', 'sections'],
  },
  industry: {
    required: ['industryName'],
    recommended: ['heroDescription', 'sections'],
  },
  comparison: {
    required: ['title'],
    recommended: ['description', 'tableRows'],
  },
  use_case: {
    required: ['title'],
    recommended: ['description', 'sections'],
  },
  // Default for unknown categories
  default: {
    required: [],
    recommended: ['title', 'description'],
  },
};

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate a pSEO page's content_json against category rules
 */
export function validatePseoContent(
  content: Record<string, any> | null,
  category: string
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!content) {
    return { isValid: false, errors: ['Missing content_json'], warnings: [] };
  }

  const rules = VALIDATION_RULES[category] || VALIDATION_RULES.default;

  // Check required fields
  for (const field of rules.required) {
    const value = content[field];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Check recommended fields (warnings only)
  for (const field of rules.recommended) {
    const value = content[field];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      warnings.push(`Missing recommended field: ${field}`);
    }
  }

  // Check for "undefined" strings in content
  const contentStr = JSON.stringify(content);
  if (contentStr.includes('"undefined"')) {
    errors.push('Content contains "undefined" string values');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Check if a pSEO page should be rendered (has valid required content)
 */
export function isPseoPageValid(page: PseoPage | null): boolean {
  if (!page || !page.content_json) return false;
  const result = validatePseoContent(page.content_json, page.category);
  return result.isValid;
}

// ============================================================================
// Safe Content Accessors (with fallbacks)
// ============================================================================

/**
 * Safely get a string value from content with fallback
 */
export function getString(
  content: Record<string, any> | null,
  key: string,
  fallback: string = ''
): string {
  if (!content) return fallback;
  const value = content[key];
  if (typeof value === 'string' && value.trim() !== '') return value;
  return fallback;
}

/**
 * Safely get an array value from content
 */
export function getArray<T = any>(
  content: Record<string, any> | null,
  key: string,
  fallback: T[] = []
): T[] {
  if (!content) return fallback;
  const value = content[key];
  if (Array.isArray(value) && value.length > 0) return value;
  if (typeof value === 'string') return [value as unknown as T];
  return fallback;
}

/**
 * Safely get an object value from content
 */
export function getObject<T extends Record<string, any>>(
  content: Record<string, any> | null,
  key: string,
  fallback: T
): T {
  if (!content) return fallback;
  const value = content[key];
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as T;
  }
  return fallback;
}

// ============================================================================
// Database Query Helpers (with validation)
// ============================================================================

/**
 * Fetch valid pSEO pages for static generation (filters out broken pages)
 */
export async function getValidPseoSlugs(
  category: string,
  paramName: string = 'slug'
): Promise<Array<Record<string, string>>> {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from('pseo_pages')
      .select('slug, content_json, category')
      .eq('category', category);

    if (!data) return [];

    // Filter to only valid pages
    return data
      .filter(page => {
        if (!page.slug || !page.content_json) return false;
        const validation = validatePseoContent(page.content_json, category);
        return validation.isValid;
      })
      .map(page => ({ [paramName]: page.slug }));
  } catch (err) {
    console.error(`[getValidPseoSlugs] Error fetching ${category}:`, err);
    return [];
  }
}

/**
 * Fetch a single pSEO page with validation
 * Returns null if page is invalid (will trigger 404)
 */
export async function getValidPseoPage(
  slug: string,
  category?: string
): Promise<PseoPage | null> {
  try {
    const supabase = getSupabaseAdmin();
    let query = supabase
      .from('pseo_pages')
      .select('*')
      .eq('slug', slug);
    
    if (category) {
      query = query.eq('category', category);
    }

    const { data } = await query.single();

    if (!data) return null;

    // Validate the page
    const validation = validatePseoContent(data.content_json, data.category);
    if (!validation.isValid) {
      console.warn(`[getValidPseoPage] Invalid page ${slug}:`, validation.errors);
      return null;
    }

    return data as PseoPage;
  } catch (err) {
    return null;
  }
}

// ============================================================================
// Content Fallback Generators
// ============================================================================

/**
 * Generate fallback title from slug
 */
export function generateFallbackTitle(slug: string, category: string): string {
  const formatted = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  switch (category) {
    case 'directory':
      return `SOC 2 Auditors in ${formatted}`;
    case 'role':
      return `SOC 2 Guide for ${formatted}s`;
    case 'pricing':
      return `${formatted} Pricing Guide 2026`;
    case 'alternatives':
      return `${formatted} Alternatives & Competitors`;
    default:
      return formatted;
  }
}

/**
 * Generate fallback meta description
 */
export function generateFallbackDescription(
  slug: string,
  category: string
): string {
  const formatted = slug.split('-').join(' ');

  switch (category) {
    case 'directory':
      return `Find top SOC 2 auditors in ${formatted}. Compare firms by pricing, expertise, and reviews.`;
    case 'role':
      return `Comprehensive SOC 2 compliance guide for ${formatted}s. Learn key priorities, timelines, and best practices.`;
    case 'pricing':
      return `Complete ${formatted} pricing breakdown. See tiers, hidden costs, and negotiation tips.`;
    case 'alternatives':
      return `Compare the best ${formatted} alternatives. Detailed analysis of features, pricing, and fit.`;
    default:
      return `Learn about ${formatted} in this comprehensive guide from RiscLens.`;
  }
}

// ============================================================================
// Metadata Generation Helper
// ============================================================================

export interface MetadataOptions {
  titleSuffix?: string;
  noIndex?: boolean;
}

/**
 * Generate safe metadata for a pSEO page
 */
export function generatePseoMetadata(
  page: PseoPage | null,
  canonicalPath: string,
  options: MetadataOptions = {}
) {
  const { titleSuffix = ' | RiscLens', noIndex = false } = options;

  if (!page) {
    return {
      title: 'Page Not Found' + titleSuffix,
      robots: { index: false },
    };
  }

  const validation = validatePseoContent(page.content_json, page.category);
  if (!validation.isValid) {
    return {
      title: 'Page Not Found' + titleSuffix,
      robots: { index: false },
    };
  }

  const title = page.title || generateFallbackTitle(page.slug, page.category);
  const description = page.meta_description || generateFallbackDescription(page.slug, page.category);

  return {
    title: title + (title.includes('RiscLens') ? '' : titleSuffix),
    description,
    alternates: {
      canonical: `https://risclens.com${canonicalPath}`,
    },
    ...(noIndex && { robots: { index: false } }),
  };
}
