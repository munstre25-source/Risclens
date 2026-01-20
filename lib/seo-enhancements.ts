/**
 * SEO Enhancement Library for RiscLens pSEO Pages
 * 
 * Optimizes titles and meta descriptions for higher CTR based on:
 * - Year signals (2026)
 * - Action-oriented language
 * - Price hooks where applicable
 * - Comparison signals for vs pages
 */

const CURRENT_YEAR = 2026;

// CTR-boosting title patterns by page type
const TITLE_PATTERNS = {
  directory: [
    `{company} SOC 2 & Security Status ${CURRENT_YEAR} | Compliance Profile`,
    `{company} SOC 2 Compliance Check ${CURRENT_YEAR} | Trust Signals`,
    `Is {company} SOC 2 Compliant? ${CURRENT_YEAR} Security Profile`,
  ],
  comparison: [
    `{toolA} vs {toolB} ${CURRENT_YEAR}: Honest Comparison + Pricing`,
    `{toolA} vs {toolB} Compared ${CURRENT_YEAR} | Features & Pricing`,
    `Compare {toolA} vs {toolB} ${CURRENT_YEAR}: Which Is Better?`,
  ],
  alternatives: [
    `Best {tool} Alternatives ${CURRENT_YEAR} | Top {count}+ Options`,
    `Top {tool} Competitors ${CURRENT_YEAR}: Compare Pricing & Features`,
    `{tool} Alternatives ${CURRENT_YEAR}: Find Better Options`,
  ],
  pricing: [
    `{tool} Pricing ${CURRENT_YEAR}: Plans, Costs & Hidden Fees Revealed`,
    `{tool} Cost ${CURRENT_YEAR}: Real Pricing + Negotiation Tips`,
    `How Much Does {tool} Cost in ${CURRENT_YEAR}? Pricing Guide`,
  ],
  stack: [
    `SOC 2 for {stack} Users ${CURRENT_YEAR}: Complete Guide`,
    `{stack} + SOC 2 Compliance ${CURRENT_YEAR} | Implementation Guide`,
    `SOC 2 Compliance with {stack} ${CURRENT_YEAR}: What You Need`,
  ],
  industry: [
    `SOC 2 for {industry} Companies ${CURRENT_YEAR}: Complete Guide`,
    `{industry} SOC 2 Compliance ${CURRENT_YEAR} | Requirements & Costs`,
    `SOC 2 Readiness for {industry} ${CURRENT_YEAR}: Step-by-Step`,
  ],
  framework_comparison: [
    `{frameworkA} vs {frameworkB} ${CURRENT_YEAR}: Key Differences`,
    `{frameworkA} or {frameworkB}? ${CURRENT_YEAR} Comparison Guide`,
    `Compare {frameworkA} vs {frameworkB}: Which Do You Need?`,
  ],
  migration: [
    `{from} to {to} Migration ${CURRENT_YEAR}: Complete Guide`,
    `Migrate {from} to {to} ${CURRENT_YEAR} | Step-by-Step Guide`,
    `{from} → {to}: Migration Requirements & Timeline`,
  ],
};

// Description templates optimized for CTR
const DESCRIPTION_PATTERNS = {
  directory: [
    `Check {company}'s SOC 2 and security status for ${CURRENT_YEAR}. View trust signals, compliance posture, and public disclosures. Updated ${getMonthYear()}.`,
    `See if {company} has SOC 2, security pages, and compliance signals. Unbiased ${CURRENT_YEAR} assessment for vendor due diligence.`,
  ],
  comparison: [
    `${CURRENT_YEAR} comparison of {toolA} vs {toolB}. See pricing from {priceA} vs {priceB}, features, integrations, and our expert verdict.`,
    `Choosing between {toolA} and {toolB}? Compare pricing, features, and see which compliance platform wins in ${CURRENT_YEAR}.`,
  ],
  alternatives: [
    `Looking for {tool} alternatives in ${CURRENT_YEAR}? Compare {count}+ top competitors by price, features, and best fit. Find your match.`,
    `Best {tool} alternatives for ${CURRENT_YEAR}: Compare pricing starting at {minPrice}, features, and expert recommendations.`,
  ],
  pricing: [
    `${CURRENT_YEAR} {tool} pricing breakdown: starts at {price}/year. See all tiers, hidden costs, and negotiation strategies. Verified data.`,
    `How much does {tool} really cost? ${CURRENT_YEAR} pricing guide with tiers from {price} to enterprise. Plus negotiation tips.`,
  ],
  stack: [
    `Complete SOC 2 guide for teams using {stack} in ${CURRENT_YEAR}. Learn specific controls, integrations, and how to accelerate compliance.`,
    `Using {stack}? Here's your SOC 2 roadmap for ${CURRENT_YEAR}. Specific recommendations, tool integrations, and timeline.`,
  ],
  industry: [
    `SOC 2 compliance guide for {industry} companies in ${CURRENT_YEAR}. Industry-specific requirements, costs ({costRange}), and timeline.`,
    `{industry} SOC 2 compliance ${CURRENT_YEAR}: Requirements, typical costs, timeline, and tools used by leading {industry} companies.`,
  ],
  framework_comparison: [
    `${CURRENT_YEAR} comparison: {frameworkA} vs {frameworkB}. Key differences, overlap, and which certification your business needs.`,
    `{frameworkA} or {frameworkB}? Compare requirements, costs, and timeline to decide which compliance framework fits your ${CURRENT_YEAR} roadmap.`,
  ],
  migration: [
    `Migrate from {from} to {to} in ${CURRENT_YEAR}. See control mapping, effort reduction ({overlap}% overlap), and step-by-step guide.`,
    `Already have {from}? Get {to} certified faster with {overlap}% control overlap. ${CURRENT_YEAR} migration guide with timeline.`,
  ],
};

function getMonthYear(): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
}

/**
 * Generate optimized title for directory/company pages
 */
export function generateDirectoryTitle(companyName: string): string {
  return `${companyName} SOC 2 & Security Compliance Status ${CURRENT_YEAR} | RiscLens`;
}

export function generateDirectoryDescription(companyName: string): string {
  return `Check ${companyName}'s SOC 2 compliance status and security signals for ${CURRENT_YEAR}. View trust center, security disclosures, and compliance posture. Verified by RiscLens.`;
}

/**
 * Generate optimized title for comparison pages
 */
export function generateComparisonTitleOptimized(
  toolA: { name: string; pricing_starting?: string | null },
  toolB: { name: string; pricing_starting?: string | null }
): string {
  return `${toolA.name} vs ${toolB.name} ${CURRENT_YEAR}: Pricing, Features & Verdict | RiscLens`;
}

export function generateComparisonDescriptionOptimized(
  toolA: { name: string; pricing_starting?: string | null },
  toolB: { name: string; pricing_starting?: string | null }
): string {
  const priceA = toolA.pricing_starting || 'Contact sales';
  const priceB = toolB.pricing_starting || 'Contact sales';
  return `Compare ${toolA.name} vs ${toolB.name} in ${CURRENT_YEAR}. Pricing: ${priceA} vs ${priceB}. See features, integrations, and our expert recommendation.`;
}

/**
 * Generate optimized title for alternatives pages
 */
export function generateAlternativesTitleOptimized(
  toolName: string,
  alternativesCount: number = 10
): string {
  return `Top ${alternativesCount} ${toolName} Alternatives & Competitors ${CURRENT_YEAR} | RiscLens`;
}

export function generateAlternativesDescriptionOptimized(
  toolName: string,
  alternatives: { name: string; pricing_starting?: string | null }[]
): string {
  const prices = alternatives
    .map(a => a.pricing_starting)
    .filter(p => p && p.includes('$'))
    .map(p => {
      const match = p?.match(/\$([\d,]+)/);
      return match ? parseInt(match[1].replace(',', '')) : null;
    })
    .filter((p): p is number => p !== null)
    .sort((a, b) => a - b);
  
  const minPrice = prices.length > 0 ? `$${prices[0].toLocaleString()}` : 'various prices';
  
  return `Looking for ${toolName} alternatives in ${CURRENT_YEAR}? Compare ${alternatives.length}+ compliance platforms starting at ${minPrice}/year. Features, pricing & expert picks.`;
}

/**
 * Generate optimized title for pricing pages
 */
export function generatePricingTitleOptimized(
  toolName: string,
  startingPrice?: string | null
): string {
  const priceHook = startingPrice ? ` (From ${startingPrice})` : '';
  return `${toolName} Pricing ${CURRENT_YEAR}${priceHook}: Plans, Costs & Hidden Fees`;
}

export function generatePricingDescriptionOptimized(
  toolName: string,
  startingPrice?: string | null,
  targetMarket?: string | null
): string {
  const priceInfo = startingPrice ? `Starting at ${startingPrice}/year. ` : '';
  const marketInfo = targetMarket ? `Best for ${targetMarket}. ` : '';
  return `${toolName} pricing guide ${CURRENT_YEAR}. ${priceInfo}${marketInfo}See all tiers, hidden costs, and negotiation tips. Verified by RiscLens.`;
}

/**
 * Generate optimized title for tech stack pages
 */
export function generateStackTitleOptimized(stackName: string): string {
  return `SOC 2 Compliance for ${stackName} Users ${CURRENT_YEAR} | Complete Guide`;
}

export function generateStackDescriptionOptimized(stackName: string): string {
  return `SOC 2 compliance guide for teams using ${stackName} in ${CURRENT_YEAR}. Specific controls, integration requirements, and how to accelerate your audit.`;
}

/**
 * Generate optimized title for industry pages
 */
export function generateIndustryTitleOptimized(industryName: string): string {
  return `SOC 2 for ${industryName} Companies ${CURRENT_YEAR} | Requirements & Costs`;
}

export function generateIndustryDescriptionOptimized(
  industryName: string,
  costRange?: string
): string {
  const cost = costRange ? ` Typical cost: ${costRange}.` : '';
  return `SOC 2 compliance guide for ${industryName} in ${CURRENT_YEAR}. Industry-specific requirements, timeline, and recommended tools.${cost}`;
}

/**
 * Generate optimized title for framework comparison pages
 */
export function generateFrameworkComparisonTitle(
  frameworkA: string,
  frameworkB: string
): string {
  return `${frameworkA} vs ${frameworkB} ${CURRENT_YEAR}: Differences & Which You Need`;
}

export function generateFrameworkComparisonDescription(
  frameworkA: string,
  frameworkB: string,
  overlap?: number
): string {
  const overlapInfo = overlap ? ` ${overlap}% control overlap.` : '';
  return `Compare ${frameworkA} vs ${frameworkB} in ${CURRENT_YEAR}. Key differences, requirements, and which certification fits your business.${overlapInfo}`;
}

/**
 * Generate optimized title for migration pages
 */
export function generateMigrationTitle(
  fromFramework: string,
  toFramework: string
): string {
  return `${fromFramework} to ${toFramework} Migration Guide ${CURRENT_YEAR} | RiscLens`;
}

export function generateMigrationDescription(
  fromFramework: string,
  toFramework: string,
  overlapPercent?: number
): string {
  const overlap = overlapPercent ? ` Leverage ${overlapPercent}% control overlap.` : '';
  return `Migrate from ${fromFramework} to ${toFramework} in ${CURRENT_YEAR}. Step-by-step guide with control mapping and timeline.${overlap}`;
}

/**
 * Generate JSON-LD Product schema for compliance tools
 */
export function generateProductSchema(tool: {
  name: string;
  slug: string;
  description?: string | null;
  pricing_starting?: string | null;
  g2_rating?: number | null;
  g2_reviews_count?: number | null;
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": tool.name,
    "description": tool.description || `${tool.name} compliance automation platform`,
    "url": `https://risclens.com/pricing/${tool.slug}`,
    "brand": {
      "@type": "Brand",
      "name": tool.name
    },
    "category": "Compliance Automation Software"
  };

  if (tool.pricing_starting) {
    const match = tool.pricing_starting.match(/\$([\d,]+)/);
    if (match) {
      schema.offers = {
        "@type": "Offer",
        "price": match[1].replace(',', ''),
        "priceCurrency": "USD",
        "priceValidUntil": `${CURRENT_YEAR}-12-31`
      };
    }
  }

  if (tool.g2_rating && tool.g2_reviews_count) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": tool.g2_rating.toString(),
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": tool.g2_reviews_count.toString()
    };
  }

  return schema;
}

/**
 * Generate enhanced FAQ schema
 */
export function generateEnhancedFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate SoftwareApplication schema
 */
export function generateSoftwareApplicationSchema(tool: {
  name: string;
  slug: string;
  description?: string | null;
  pricing_starting?: string | null;
  g2_rating?: number | null;
  g2_reviews_count?: number | null;
  website_url?: string | null;
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Compliance Management Software",
    "operatingSystem": "Web",
    "description": tool.description || `${tool.name} is a compliance automation platform`,
    "url": tool.website_url || `https://risclens.com/pricing/${tool.slug}`
  };

  if (tool.pricing_starting) {
    const match = tool.pricing_starting.match(/\$([\d,]+)/);
    if (match) {
      schema.offers = {
        "@type": "Offer",
        "price": match[1].replace(',', ''),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      };
    }
  }

  if (tool.g2_rating && tool.g2_reviews_count) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": tool.g2_rating.toString(),
      "bestRating": "5",
      "ratingCount": tool.g2_reviews_count.toString()
    };
  }

  return schema;
}

/**
 * Generate optimized Organization schema for directory pages
 */
export function generateOrganizationSchema(company: {
  name: string;
  slug: string;
  domain: string;
  signal_score: number;
  updated_at: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `https://risclens.com/compliance/directory/${company.slug}#organization`,
    "name": company.name,
    "url": `https://${company.domain}`,
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "domain",
      "value": company.domain
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Public Security Signals Score",
        "value": company.signal_score.toString()
      },
      {
        "@type": "PropertyValue",
        "name": "Last Verified",
        "value": company.updated_at
      }
    ]
  };
}

/**
 * Get CTR-optimized title suffix based on position
 */
export function getPositionBasedSuffix(position: number): string {
  if (position <= 3) {
    return ' | #1 Guide';
  } else if (position <= 10) {
    return ' | Expert Guide';
  } else if (position <= 20) {
    return ' | Complete Guide';
  }
  return '';
}

/**
 * CTR-Optimized Title Templates for High-Impression Queries
 * 
 * Based on GSC data analysis, these patterns are designed to:
 * - Include year freshness signal (2026)
 * - Add price hooks where data exists
 * - Use numbered lists for alternatives
 * - Include action verbs (Compare, See, Get)
 * - Add urgency/value signals
 */

// Top high-impression queries needing CTR optimization
const HIGH_IMPRESSION_QUERY_TITLES: Record<string, (vars?: Record<string, string>) => string> = {
  // Pricing queries - add price hook and year
  'pricing': (vars) => `${vars?.tool || 'Tool'} Pricing ${CURRENT_YEAR}: From ${vars?.price || '$X'}/yr + Hidden Costs Revealed`,
  'cost': (vars) => `${vars?.tool || 'Tool'} Cost ${CURRENT_YEAR}: Real Pricing (${vars?.price || 'See Plans'}) + Negotiation Tips`,
  
  // Alternatives queries - add count and ranking signal
  'alternatives': (vars) => `${vars?.count || '10'}+ Best ${vars?.tool || 'Tool'} Alternatives ${CURRENT_YEAR} (Ranked by Price)`,
  'competitors': (vars) => `Top ${vars?.count || '10'} ${vars?.tool || 'Tool'} Competitors ${CURRENT_YEAR}: Side-by-Side Comparison`,
  
  // Comparison queries - add verdict signal
  'vs': (vars) => `${vars?.toolA || 'Tool A'} vs ${vars?.toolB || 'Tool B'} ${CURRENT_YEAR}: Which Wins? (+ Pricing)`,
  
  // SOC 2 compliance queries - add company signal
  'soc2-compliance': (vars) => `${vars?.company || 'Company'} SOC 2 Status ${CURRENT_YEAR}: Compliance Check + Trust Signals`,
  
  // Location-based queries
  'soc2-location': (vars) => `SOC 2 Auditors in ${vars?.location || 'Your City'} ${CURRENT_YEAR} | Verified Firms + Pricing`,
  
  // Framework comparison queries
  'framework-vs': (vars) => `${vars?.frameworkA || 'SOC 2'} vs ${vars?.frameworkB || 'ISO 27001'}: Key Differences ${CURRENT_YEAR}`,
  
  // HIPAA/Healthcare queries
  'hipaa': (vars) => `HIPAA Compliance for ${vars?.industry || 'Your Industry'} ${CURRENT_YEAR}: Requirements + Checklist`,
  
  // Trust center queries
  'trust-center': (vars) => `${vars?.company || 'Company'} Trust Center ${CURRENT_YEAR}: Security & Compliance Signals`,
};

const HIGH_IMPRESSION_QUERY_DESCRIPTIONS: Record<string, (vars?: Record<string, string>) => string> = {
  'pricing': (vars) => 
    `${CURRENT_YEAR} ${vars?.tool || 'tool'} pricing breakdown. Plans start at ${vars?.price || 'various prices'}. See all tiers, annual vs monthly, and 5 negotiation strategies that saved teams 20%+.`,
  
  'alternatives': (vars) => 
    `Compare ${vars?.count || '10'}+ ${vars?.tool || 'tool'} alternatives in ${CURRENT_YEAR}. Filter by price (from ${vars?.minPrice || '$3K'}), features, and company size. Find your best-fit platform in 5 minutes.`,
  
  'competitors': (vars) => 
    `${vars?.tool || 'Tool'} competitors compared ${CURRENT_YEAR}. See ${vars?.count || '10'}+ options ranked by pricing, features, and G2 ratings. Expert recommendations by company size.`,
  
  'vs': (vars) => 
    `${vars?.toolA || 'Tool A'} vs ${vars?.toolB || 'Tool B'} ${CURRENT_YEAR}: Compare pricing (${vars?.priceA || '$X'} vs ${vars?.priceB || '$Y'}), features, and time-to-audit. Plus: our unbiased recommendation.`,
  
  'soc2-compliance': (vars) => 
    `Is ${vars?.company || 'this company'} SOC 2 compliant? Check their ${CURRENT_YEAR} security status, trust center, and public compliance signals. Updated ${getMonthYear()}.`,
  
  'soc2-location': (vars) => 
    `Find verified SOC 2 auditors in ${vars?.location || 'your city'} for ${CURRENT_YEAR}. Compare ${vars?.count || '5'}+ firms by specialization, pricing, and client reviews.`,
  
  'framework-vs': (vars) => 
    `${vars?.frameworkA || 'SOC 2'} vs ${vars?.frameworkB || 'ISO 27001'} ${CURRENT_YEAR}: Compare requirements, costs, timeline, and which certification your customers actually need.`,
  
  'hipaa': (vars) => 
    `HIPAA compliance guide for ${vars?.industry || 'healthcare'} ${CURRENT_YEAR}. Requirements checklist, cost breakdown, and timeline. Plus: common violations to avoid.`,
  
  'trust-center': (vars) => 
    `View ${vars?.company || 'company'}'s trust center and security compliance for ${CURRENT_YEAR}. See SOC 2 status, certifications, and public security disclosures.`,
};

/**
 * Generate CTR-optimized title based on query type
 */
export function generateCTROptimizedTitle(
  queryType: string,
  vars: Record<string, string> = {}
): string {
  const generator = HIGH_IMPRESSION_QUERY_TITLES[queryType];
  if (generator) {
    return generator(vars);
  }
  // Fallback to generic title with year
  return `${vars.topic || 'Compliance Guide'} ${CURRENT_YEAR} | RiscLens`;
}

/**
 * Generate CTR-optimized description based on query type
 */
export function generateCTROptimizedDescription(
  queryType: string,
  vars: Record<string, string> = {}
): string {
  const generator = HIGH_IMPRESSION_QUERY_DESCRIPTIONS[queryType];
  if (generator) {
    return generator(vars);
  }
  // Fallback
  return `${vars.topic || 'Comprehensive guide'} for ${CURRENT_YEAR}. Expert analysis, pricing data, and actionable recommendations from RiscLens.`;
}

/**
 * Detect query type from slug or URL
 */
export function detectQueryType(slug: string): string {
  if (slug.includes('-vs-')) return 'vs';
  if (slug.includes('-alternatives') || slug.endsWith('alternatives')) return 'alternatives';
  if (slug.includes('-competitors') || slug.endsWith('competitors')) return 'competitors';
  if (slug.includes('-pricing') || slug.endsWith('pricing')) return 'pricing';
  if (slug.includes('-cost') || slug.endsWith('cost')) return 'cost';
  if (slug.includes('trust-center')) return 'trust-center';
  if (slug.includes('hipaa')) return 'hipaa';
  if (slug.includes('soc-2') && (slug.includes('boston') || slug.includes('new-york') || slug.includes('los-angeles'))) return 'soc2-location';
  if (slug.includes('soc-2') || slug.includes('soc2')) return 'soc2-compliance';
  return 'generic';
}

/**
 * Power words for CTR boost (use sparingly)
 */
export const CTR_POWER_WORDS = {
  urgency: ['Now', 'Today', CURRENT_YEAR.toString(), 'Updated', 'New'],
  value: ['Free', 'Complete', 'Ultimate', 'Expert', 'Verified'],
  action: ['Compare', 'See', 'Get', 'Find', 'Discover', 'Check'],
  emotion: ['Honest', 'Real', 'Hidden', 'Revealed', 'Truth'],
  numbers: ['10+', '5+', '100+', '#1', 'Top'],
};

/**
 * Format title with proper character limit (50-60 chars ideal)
 */
export function formatTitleForSERP(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) return title;
  
  // Try to cut at a word boundary
  const truncated = title.slice(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength - 15) {
    return truncated.slice(0, lastSpace) + '...';
  }
  return truncated + '...';
}

/**
 * Format description with proper character limit (150-160 chars ideal)
 */
export function formatDescriptionForSERP(description: string, maxLength: number = 155): string {
  if (description.length <= maxLength) return description;
  
  const truncated = description.slice(0, maxLength - 3);
  const lastPeriod = truncated.lastIndexOf('.');
  if (lastPeriod > maxLength - 30) {
    return truncated.slice(0, lastPeriod + 1);
  }
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.slice(0, lastSpace) + '...';
}

export { CURRENT_YEAR };
