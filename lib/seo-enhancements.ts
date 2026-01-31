/**
 * SEO Enhancement Library for RiscLens pSEO Pages
 * 
 * Optimizes titles and meta descriptions for higher CTR based on:
 * - Year signals (2026)
 * - Action-oriented language
 * - Price hooks where applicable
 * - Comparison signals for vs pages
 * 
 * CTR Research Findings (Backlinko, 4M Google results):
 * - Position #1: 27.6% CTR, Position #2: 15.8%, Position #3: ~10%
 * - Top 3 results get 54.4% of all clicks
 * - Optimal title length: 40-60 characters (+33.3% CTR)
 * - Positive sentiment: +4.1% higher CTR
 * - Keyword-rich URLs: +45% higher CTR
 * - Moving up 1 position = +32% relative CTR increase
 */

const CURRENT_YEAR = 2026;

/**
 * CTR benchmarks by position (based on Backlinko study)
 */
export const CTR_BENCHMARKS = {
  position1: 27.6,
  position2: 15.8,
  position3: 10.0,
  position5: 6.3,
  position8: 3.9,
  position10: 2.5,
  topThree: 54.4,
};

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
 * 
 * Pattern: Question format that matches search intent
 * Research shows question format has similar CTR but matches intent better
 * Optimal length: 40-60 chars
 */
export function generateDirectoryTitle(companyName: string, hasSOC2?: boolean): string {
  // If we know SOC2 status, answer it directly in title
  if (hasSOC2 === true) {
    return `${companyName} SOC 2 Certified ${CURRENT_YEAR} | Trust Center & Compliance`;
  } else if (hasSOC2 === false) {
    return `${companyName} SOC 2 Status ${CURRENT_YEAR}: Compliance & Security Check`;
  }
  // Default: Question format to match intent (most searches are "Is X SOC 2 compliant?")
  return `Is ${companyName} SOC 2 Compliant? ${CURRENT_YEAR} Security Status`;
}

export function generateDirectoryDescription(companyName: string, trustCenterUrl?: string, lastVerified?: string): string {
  const verifiedDate = lastVerified ? `Last verified ${lastVerified}.` : `Updated ${getMonthYear()}.`;
  const trustCenterInfo = trustCenterUrl ? ' Trust center link included.' : '';
  return `Is ${companyName} SOC 2 compliant? Check their ${CURRENT_YEAR} security status, certifications, and compliance signals.${trustCenterInfo} ${verifiedDate}`;
}

/**
 * Generate optimized title for comparison pages
 * 
 * Research: Include price hooks and verdict signals
 * Optimal length: 40-60 chars (may need truncation)
 * Pattern: [Tool A] vs [Tool B] [Year]: [Value prop]
 */
export function generateComparisonTitleOptimized(
  toolA: { name: string; pricing_starting?: string | null },
  toolB: { name: string; pricing_starting?: string | null }
): string {
  // If both have pricing, include price comparison hook
  const hasPrice = toolA.pricing_starting && toolB.pricing_starting;
  if (hasPrice) {
    return formatTitleForSERP(`${toolA.name} vs ${toolB.name} ${CURRENT_YEAR}: Compare Pricing & Features`);
  }
  return formatTitleForSERP(`${toolA.name} vs ${toolB.name} ${CURRENT_YEAR}: Which Is Better?`);
}

export function generateComparisonDescriptionOptimized(
  toolA: { name: string; pricing_starting?: string | null },
  toolB: { name: string; pricing_starting?: string | null }
): string {
  const priceA = toolA.pricing_starting || 'Contact sales';
  const priceB = toolB.pricing_starting || 'Contact sales';
  // FAQ-style opener that matches search intent
  return formatDescriptionForSERP(
    `${toolA.name} vs ${toolB.name} ${CURRENT_YEAR}: Pricing (${priceA} vs ${priceB}), features, and which is best for your team. Expert comparison + our verdict.`
  );
}

/**
 * Generate optimized title for alternatives pages
 * 
 * Research: Number hooks increase CTR significantly
 * Pattern: [#]+ Best [Tool] Alternatives [Year] (Ranked by Price)
 */
export function generateAlternativesTitleOptimized(
  toolName: string,
  alternativesCount: number = 10
): string {
  // Use "+" after number to imply comprehensive coverage
  const count = alternativesCount >= 10 ? `${alternativesCount}+` : alternativesCount.toString();
  return formatTitleForSERP(`${count} Best ${toolName} Alternatives ${CURRENT_YEAR} (Compared)`);
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
  
  const minPrice = prices.length > 0 ? `$${prices[0].toLocaleString()}` : '$3,000';
  const count = alternatives.length || 10;
  
  // FAQ-style that matches "looking for alternatives" intent
  return formatDescriptionForSERP(
    `Looking for ${toolName} alternatives in ${CURRENT_YEAR}? Compare ${count}+ options by price (from ${minPrice}/yr), features, and best fit. Find your ideal platform.`
  );
}

/**
 * Generate optimized title for pricing pages
 * 
 * Research: Price hooks in titles increase CTR
 * Pattern: [Tool] Pricing [Year]: From [Price] + Hidden Costs
 */
export function generatePricingTitleOptimized(
  toolName: string,
  startingPrice?: string | null
): string {
  if (startingPrice) {
    return formatTitleForSERP(`${toolName} Pricing ${CURRENT_YEAR}: From ${startingPrice} + Hidden Costs`);
  }
  return formatTitleForSERP(`${toolName} Pricing ${CURRENT_YEAR}: Plans, Costs & Negotiation Tips`);
}

export function generatePricingDescriptionOptimized(
  toolName: string,
  startingPrice?: string | null,
  targetMarket?: string | null
): string {
  const priceInfo = startingPrice ? `Plans start at ${startingPrice}/year. ` : '';
  const marketInfo = targetMarket ? `Best for ${targetMarket}. ` : '';
  // Include specific actionable content in description
  return formatDescriptionForSERP(
    `How much does ${toolName} cost in ${CURRENT_YEAR}? ${priceInfo}${marketInfo}See all tiers, hidden costs, and negotiation strategies that save 20%+.`
  );
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
        "priceValidUntil": `${CURRENT_YEAR}-12-31`,
        "availability": "https://schema.org/InStock"
      };
    } else if (tool.pricing_starting.toLowerCase().includes('free')) {
      schema.offers = {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      };
    } else {
      schema.offers = {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Contact for pricing",
        "availability": "https://schema.org/PreOrder"
      };
    }
  }

  if (tool.g2_rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": tool.g2_rating.toString(),
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": (tool.g2_reviews_count || 10).toString()
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
    } else if (tool.pricing_starting.toLowerCase().includes('free')) {
      schema.offers = {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      };
    } else {
      schema.offers = {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/PreOrder"
      };
    }
  }

  if (tool.g2_rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": tool.g2_rating.toString(),
      "bestRating": "5",
      "ratingCount": (tool.g2_reviews_count || 10).toString()
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

/**
 * Generate industry-specific alternatives title
 * Pattern: [Tool] Alternatives for [Industry] [Year]: [Count]+ Compared
 */
export function generateIndustryAlternativesTitle(
  toolName: string,
  industry: string,
  count: number = 10
): string {
  return formatTitleForSERP(`${count}+ ${toolName} Alternatives for ${industry} ${CURRENT_YEAR}`);
}

export function generateIndustryAlternativesDescription(
  toolName: string,
  industry: string,
  count: number = 10
): string {
  return formatDescriptionForSERP(
    `Best ${toolName} alternatives for ${industry} companies in ${CURRENT_YEAR}. Compare ${count}+ options by compliance features, pricing, and ${industry}-specific capabilities.`
  );
}

/**
 * Generate FAQs for different page types based on common search patterns
 */
export function generateComparisonFAQs(
  toolA: string,
  toolB: string,
  priceA?: string,
  priceB?: string
): { question: string; answer: string }[] {
  return [
    {
      question: `Which is better, ${toolA} or ${toolB}?`,
      answer: `Both ${toolA} and ${toolB} are strong compliance platforms. ${toolA} is typically better for ${priceA ? 'budget-conscious' : 'enterprise'} teams, while ${toolB} excels at ${priceB ? 'comprehensive' : 'scalable'} compliance automation. The best choice depends on your team size, compliance requirements, and budget.`
    },
    {
      question: `What is the price difference between ${toolA} and ${toolB}?`,
      answer: `${toolA} pricing starts at ${priceA || 'contact sales'}, while ${toolB} starts at ${priceB || 'contact sales'}. Both offer enterprise tiers with custom pricing. See our detailed pricing comparison above.`
    },
    {
      question: `Can I switch from ${toolA} to ${toolB}?`,
      answer: `Yes, many companies migrate between compliance platforms. Both ${toolA} and ${toolB} offer migration assistance and data import tools. The typical migration takes 2-4 weeks depending on your compliance scope.`
    },
    {
      question: `Which platform is faster for SOC 2 certification?`,
      answer: `Time to SOC 2 certification depends more on your organization's readiness than the platform choice. Both ${toolA} and ${toolB} can help achieve SOC 2 in 4-8 weeks for prepared organizations. See our timeline comparison for details.`
    }
  ];
}

export function generateDirectoryFAQs(
  companyName: string,
  hasSOC2?: boolean,
  hasTrustCenter?: boolean
): { question: string; answer: string }[] {
  const soc2Status = hasSOC2 ? 'Yes' : hasSOC2 === false ? 'Based on public signals, no confirmed SOC 2 report was found' : 'Check the company\'s trust center for current status';
  
  return [
    {
      question: `Is ${companyName} SOC 2 compliant?`,
      answer: `${soc2Status}. Our analysis checks public security signals, trust centers, and disclosed certifications. For the most current information, visit ${companyName}'s official trust center.`
    },
    {
      question: `Where is ${companyName}'s trust center?`,
      answer: hasTrustCenter 
        ? `${companyName}'s trust center is linked in our profile above. It contains their security documentation, compliance certifications, and data protection policies.`
        : `We did not find a public trust center for ${companyName}. Contact their security team directly for compliance documentation.`
    },
    {
      question: `What certifications does ${companyName} have?`,
      answer: `See our detailed security signals analysis above for ${companyName}'s public compliance posture. Common certifications in this space include SOC 2, ISO 27001, HIPAA, and GDPR compliance.`
    },
    {
      question: `Is ${companyName} safe to use for enterprise data?`,
      answer: `Evaluate ${companyName}'s security posture using the signals above. Key factors include SOC 2 certification, data encryption practices, access controls, and their incident response process. Request their security questionnaire for detailed assessment.`
    }
  ];
}

export function generatePricingFAQs(
  toolName: string,
  startingPrice?: string,
  tiers?: string[]
): { question: string; answer: string }[] {
  return [
    {
      question: `How much does ${toolName} cost?`,
      answer: `${toolName} pricing ${startingPrice ? `starts at ${startingPrice}/year` : 'is available upon request'}. Pricing varies based on company size, compliance scope, and features needed. See our tier breakdown above for detailed pricing.`
    },
    {
      question: `Does ${toolName} offer a free trial?`,
      answer: `Most compliance platforms including ${toolName} offer demos rather than free trials due to the nature of compliance software. Contact ${toolName} directly for a personalized demo and trial options.`
    },
    {
      question: `What are the hidden costs with ${toolName}?`,
      answer: `Beyond base subscription, consider: implementation fees, additional user seats, premium integrations, audit support services, and annual price increases. Our hidden costs section above details what to watch for.`
    },
    {
      question: `Can I negotiate ${toolName} pricing?`,
      answer: `Yes, compliance software pricing is often negotiable. Key leverage points: multi-year commitments (15-25% savings), competitor quotes, timing (end of quarter), and bundling services. See our negotiation tips above.`
    },
    {
      question: `Is ${toolName} worth the cost?`,
      answer: `${toolName}'s ROI depends on your compliance needs. Companies typically see value through: faster audit completion, reduced manual work, and avoided compliance penalties. Calculate your specific ROI using factors like team size and audit frequency.`
    }
  ];
}

export function generateAlternativesFAQs(
  toolName: string,
  alternativesCount: number = 10,
  topAlternatives?: string[]
): { question: string; answer: string }[] {
  const altList = topAlternatives?.slice(0, 3).join(', ') || 'various options';
  
  return [
    {
      question: `What are the best ${toolName} alternatives?`,
      answer: `Top ${toolName} alternatives in ${CURRENT_YEAR} include ${altList}. The best choice depends on your company size, budget, and specific compliance requirements. See our detailed comparison above.`
    },
    {
      question: `What is cheaper than ${toolName}?`,
      answer: `Several ${toolName} alternatives offer lower starting prices. Budget-friendly options typically start at $3,000-$5,000/year for smaller teams. See our pricing comparison to find options within your budget.`
    },
    {
      question: `Why switch from ${toolName}?`,
      answer: `Common reasons to explore ${toolName} alternatives include: pricing concerns, missing features, integration limitations, or changing compliance needs. Our comparison helps you evaluate if switching makes sense for your situation.`
    },
    {
      question: `How do I choose between ${toolName} alternatives?`,
      answer: `Key factors: 1) Your compliance frameworks (SOC 2, ISO 27001, HIPAA), 2) Company size and budget, 3) Required integrations, 4) Implementation timeline, 5) Support quality. Our comparison matrix above helps evaluate these factors.`
    }
  ];
}

export function generateGuideFAQs(
  topic: string,
  frameworkName: string
): { question: string; answer: string }[] {
  return [
    {
      question: `What is the first step in ${topic}?`,
      answer: `The first step is conducting a gap analysis to understand your current security posture relative to ${frameworkName} requirements. This identifies what controls you already have and what needs to be implemented.`
    },
    {
      question: `How long does ${topic} typically take?`,
      answer: `For most mid-sized companies, the process takes 3-6 months. This includes 2-3 months for readiness prep and control implementation, followed by the audit period and report generation.`
    },
    {
      question: `What are the core requirements for ${topic}?`,
      answer: `Core requirements include established security policies, evidence of operational controls (like access reviews and vulnerability scans), and documented risk management processes aligned with ${frameworkName} standards.`
    },
    {
      question: `Can we automate ${topic}?`,
      answer: `Yes, compliance automation platforms can reduce manual effort by up to 80% through continuous evidence collection and automated control monitoring. However, you still need to define and own the underlying security processes.`
    }
  ];
}

/**
 * Generate contextual FAQs for hub/static pages (directory, about, methodology, etc.).
 * Use for any page that doesn't have tool-specific or comparison-specific FAQ data.
 */
export function generateHubFAQs(
  pageTitle: string,
  topic: string
): { question: string; answer: string }[] {
  const base = [
    {
      question: `What is ${topic}?`,
      answer: `${topic} helps organizations understand and demonstrate their security and compliance posture. RiscLens provides data-driven insights, benchmarks, and guidance so you can plan audits and vendor due diligence with confidence.`
    },
    {
      question: `How does RiscLens use data for ${pageTitle}?`,
      answer: `We analyze public security signals, trust centers, and disclosed certifications to give you an objective view. Our methodology is transparent and deterministic—scores and recommendations are based on explicit criteria, not black-box algorithms.`
    },
    {
      question: `Is the information on this page updated?`,
      answer: `We refresh our data regularly and surface "Updated" or "Last verified" where relevant. For the most current compliance status of a specific vendor, always confirm with their trust center or security team.`
    },
    {
      question: `Who is ${pageTitle} for?`,
      answer: `This resource is for founders, security leads, and procurement teams who need to benchmark compliance, compare options, or conduct vendor due diligence. We focus on practical, actionable guidance without sales pressure.`
    }
  ];
  return base;
}

/**
 * Generate contextual FAQs for auditor-directory location pages (e.g. SOC 2 Auditors in Austin).
 * Use when pSEO content has no faqs array so every programmatic location page has FAQs + schema.
 */
export function generateLocationFAQs(cityName: string): { question: string; answer: string }[] {
  return [
    {
      question: `How do I find SOC 2 auditors in ${cityName}?`,
      answer: `RiscLens lists vetted CPA firms and security auditors who serve ${cityName} and the surrounding area. Use our directory to compare specialties, reviews, and typical engagement scope. Many firms offer remote and hybrid options.`
    },
    {
      question: `Do ${cityName} auditors offer remote SOC 2 audits?`,
      answer: `Yes. Most SOC 2 audits can be conducted remotely. ${cityName}-based firms often support hybrid or fully remote engagements, which can reduce cost and scheduling friction. Confirm remote options when requesting quotes.`
    },
    {
      question: `What should I look for when choosing an auditor in ${cityName}?`,
      answer: `Look for experience with your industry (e.g. SaaS, fintech), familiarity with compliance automation tools (Vanta, Drata), and clear communication on timeline and scope. Check our directory for ratings and focus areas.`
    },
    {
      question: `How much does a SOC 2 audit cost in ${cityName}?`,
      answer: `Costs vary by firm size, audit type (Type I vs Type II), and scope. Use our SOC 2 Cost Calculator for ballpark estimates. Getting quotes from 2–3 ${cityName} auditors is recommended.`
    }
  ];
}

/**
 * Generate "Updated" date badge text
 */
export function getUpdatedBadgeText(date?: Date | string): string {
  const dateObj = date ? new Date(date) : new Date();
  return `Updated ${getMonthYear()}`;
}

/**
 * Generate last verified text for trust signals
 */
export function getLastVerifiedText(date?: Date | string): string {
  if (!date) return `Verified ${getMonthYear()}`;
  const dateObj = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `Last verified ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
}

/**
 * Analyze title length and provide recommendation
 */
export function analyzeTitleLength(title: string): {
  length: number;
  isOptimal: boolean;
  recommendation: string;
} {
  const length = title.length;
  const isOptimal = length >= 40 && length <= 60;
  
  let recommendation = '';
  if (length < 40) {
    recommendation = `Title is ${40 - length} characters short. Consider adding keywords or value props.`;
  } else if (length > 60) {
    recommendation = `Title is ${length - 60} characters over optimal. May be truncated in SERPs.`;
  } else {
    recommendation = 'Title length is optimal for CTR (40-60 chars).';
  }
  
  return { length, isOptimal, recommendation };
}

/**
 * Detect sentiment of title/description
 */
export function detectSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const lowerText = text.toLowerCase();
  
  const positiveWords = ['best', 'top', 'ultimate', 'complete', 'expert', 'proven', 'powerful', 'essential', 'effective', 'great', 'excellent', 'trusted', 'verified'];
  const negativeWords = ['worst', 'avoid', 'mistakes', 'errors', 'problems', 'issues', 'fails', 'bad', 'terrible', 'poor', 'hidden'];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  for (const word of positiveWords) {
    if (lowerText.includes(word)) positiveCount++;
  }
  
  for (const word of negativeWords) {
    if (lowerText.includes(word)) negativeCount++;
  }
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

export { CURRENT_YEAR };
