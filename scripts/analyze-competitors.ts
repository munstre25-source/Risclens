/**
 * Competitor SEO Analysis Script
 * 
 * This script documents competitor analysis findings and best practices
 * for CTR optimization based on research from:
 * - Backlinko (4 million Google search results analysis)
 * - Semrush SEO headline best practices
 * - Industry CTR benchmarks
 * 
 * Key Findings Summary:
 * 
 * CTR BY POSITION:
 * - Position #1: 27.6% CTR
 * - Position #2: 15.8% CTR
 * - Position #3: ~10% CTR
 * - Top 3 results get 54.4% of all clicks
 * - Position #10: ~2.5% CTR
 * - Moving up 1 position = +32% relative CTR increase
 * - Moving from #2 to #1 = +74.5% more clicks
 * 
 * TITLE TAG OPTIMIZATION:
 * - Optimal length: 40-60 characters (33.3% higher CTR)
 * - Optimal word count: 6-9 words
 * - Include target keyword at beginning
 * - Positive sentiment titles: +4.1% higher CTR
 * - Question vs non-question: similar CTR (15.5% vs 16.3%)
 * 
 * URL OPTIMIZATION:
 * - Keyword-rich URLs: +45% higher CTR
 * - Partial keyword match still provides significant boost
 * 
 * KEYWORD LENGTH:
 * - Long-tail keywords (10-15 words): 1.76x more clicks than short terms
 * - Most queries (90.3%) have only 10 impressions or less
 */

export interface CompetitorPageAnalysis {
  url: string;
  title: string;
  titleLength: number;
  metaDescription: string;
  metaDescriptionLength: number;
  h1: string;
  hasYearSignal: boolean;
  hasPriceHook: boolean;
  hasNumberedList: boolean;
  hasPowerWords: boolean;
  powerWordsFound: string[];
  hasQuestionFormat: boolean;
  sentiment: 'positive' | 'neutral' | 'negative';
  hasFaqSchema: boolean;
  hasComparisonTable: boolean;
  hasDateSignal: boolean;
}

export interface CTRBenchmarks {
  position1: number;
  position2: number;
  position3: number;
  position10: number;
  topThreeTotal: number;
}

export const CTR_BENCHMARKS: CTRBenchmarks = {
  position1: 27.6,
  position2: 15.8,
  position3: 10.0,
  position10: 2.5,
  topThreeTotal: 54.4,
};

// Power words that boost CTR
export const POWER_WORDS = {
  urgency: ['2026', 'Now', 'Today', 'Updated', 'New', 'Latest', 'Just Released'],
  value: ['Free', 'Complete', 'Ultimate', 'Expert', 'Verified', 'Proven', 'Best'],
  action: ['Compare', 'See', 'Get', 'Find', 'Discover', 'Check', 'Learn', 'Try'],
  emotion: ['Honest', 'Real', 'Hidden', 'Revealed', 'Truth', 'Secret', 'Surprising'],
  numbers: ['10+', '5+', '100+', '#1', 'Top', 'Best'],
  specificity: ['Step-by-Step', 'Guide', 'Checklist', 'Template', 'Framework'],
};

// SEO Headline Templates (from Semrush research)
export const HEADLINE_TEMPLATES = {
  // [#] + [Power Word] + [Keyword] + [Desired Result]
  numberedPowerResult: (count: number, powerWord: string, keyword: string, result: string) =>
    `${count} ${powerWord} ${keyword} ${result}`,
  
  // "How to" + [Keyword] + [Benefit]
  howToBenefit: (keyword: string, benefit: string) =>
    `How to ${keyword} ${benefit}`,
  
  // "Ultimate Guide to" + [Keyword] + [Quantified Benefit]
  ultimateGuide: (keyword: string, benefit: string) =>
    `Ultimate Guide to ${keyword}: ${benefit}`,
  
  // [#] + [Power Word] + [Keyword] + [Time Frame]
  numberedTimeFrame: (count: number, powerWord: string, keyword: string, year: number) =>
    `${count} ${powerWord} ${keyword} ${year}`,
  
  // [Keyword] + [Numbered List]
  keywordList: (keyword: string, count: number, listType: string) =>
    `${keyword}: ${count} ${listType}`,
  
  // Comparison specific
  comparison: (toolA: string, toolB: string, year: number) =>
    `${toolA} vs ${toolB} ${year}: Pricing, Features & Verdict`,
  
  // Alternatives specific
  alternatives: (tool: string, count: number, year: number) =>
    `${count}+ Best ${tool} Alternatives ${year} (Ranked by Price)`,
  
  // Directory/Company specific
  directory: (company: string, year: number) =>
    `Is ${company} SOC 2 Compliant? ${year} Security Status`,
  
  // Pricing specific
  pricing: (tool: string, price: string, year: number) =>
    `${tool} Pricing ${year}: From ${price} + Hidden Costs Revealed`,
};

// Meta description templates
export const DESCRIPTION_TEMPLATES = {
  comparison: (toolA: string, toolB: string, priceA: string, priceB: string, year: number) =>
    `${year} comparison of ${toolA} vs ${toolB}. Pricing: ${priceA} vs ${priceB}. See features, integrations, and our expert verdict. Updated January ${year}.`,
  
  alternatives: (tool: string, count: number, minPrice: string, year: number) =>
    `Compare ${count}+ ${tool} alternatives in ${year}. Filter by price (from ${minPrice}), features, and company size. Find your best-fit platform.`,
  
  directory: (company: string, year: number) =>
    `Is ${company} SOC 2 compliant? Check their ${year} security status, trust center link, and compliance certifications. Last verified January ${year}.`,
  
  pricing: (tool: string, price: string, year: number) =>
    `${year} ${tool} pricing breakdown. Plans start at ${price}. See all tiers, hidden costs, and 5 negotiation tips that save 20%+.`,
};

// Analysis functions
export function analyzeTitleLength(title: string): {
  length: number;
  isOptimal: boolean;
  recommendation: string;
} {
  const length = title.length;
  const isOptimal = length >= 40 && length <= 60;
  
  let recommendation = '';
  if (length < 40) {
    recommendation = `Title is ${40 - length} characters too short. Add more descriptive keywords.`;
  } else if (length > 60) {
    recommendation = `Title is ${length - 60} characters too long. May be truncated in SERPs.`;
  } else {
    recommendation = 'Title length is optimal for CTR.';
  }
  
  return { length, isOptimal, recommendation };
}

export function detectPowerWords(text: string): string[] {
  const found: string[] = [];
  const lowerText = text.toLowerCase();
  
  for (const category of Object.values(POWER_WORDS)) {
    for (const word of category) {
      if (lowerText.includes(word.toLowerCase())) {
        found.push(word);
      }
    }
  }
  
  return [...new Set(found)];
}

export function analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const lowerText = text.toLowerCase();
  
  const positiveWords = ['best', 'top', 'ultimate', 'complete', 'expert', 'proven', 'powerful', 'essential', 'effective', 'amazing', 'great', 'excellent'];
  const negativeWords = ['worst', 'avoid', 'mistakes', 'errors', 'problems', 'issues', 'fails', 'bad', 'terrible', 'poor'];
  
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

export function hasYearSignal(text: string): boolean {
  return /202[4-9]/.test(text);
}

export function hasPriceHook(text: string): boolean {
  return /\$[\d,]+|from \$|starting at|pricing|cost/i.test(text);
}

export function hasQuestionFormat(text: string): boolean {
  return /\?|how|what|why|which|when|where/i.test(text);
}

export function hasNumberedList(text: string): boolean {
  return /\d+\+?[\s]+(best|top|ways|tips|steps|things|reasons|mistakes)/i.test(text);
}

// Generate optimized title based on page type
export function generateOptimizedTitle(
  pageType: 'comparison' | 'alternatives' | 'directory' | 'pricing',
  params: Record<string, any>
): string {
  const year = 2026;
  
  switch (pageType) {
    case 'comparison':
      return HEADLINE_TEMPLATES.comparison(params.toolA, params.toolB, year);
    
    case 'alternatives':
      return HEADLINE_TEMPLATES.alternatives(params.tool, params.count || 10, year);
    
    case 'directory':
      return HEADLINE_TEMPLATES.directory(params.company, year);
    
    case 'pricing':
      return HEADLINE_TEMPLATES.pricing(params.tool, params.price || '$X/yr', year);
    
    default:
      return `${params.keyword || 'Guide'} ${year} | RiscLens`;
  }
}

// Generate optimized meta description based on page type
export function generateOptimizedDescription(
  pageType: 'comparison' | 'alternatives' | 'directory' | 'pricing',
  params: Record<string, any>
): string {
  const year = 2026;
  
  switch (pageType) {
    case 'comparison':
      return DESCRIPTION_TEMPLATES.comparison(
        params.toolA,
        params.toolB,
        params.priceA || 'Contact sales',
        params.priceB || 'Contact sales',
        year
      );
    
    case 'alternatives':
      return DESCRIPTION_TEMPLATES.alternatives(
        params.tool,
        params.count || 10,
        params.minPrice || '$3,000/yr',
        year
      );
    
    case 'directory':
      return DESCRIPTION_TEMPLATES.directory(params.company, year);
    
    case 'pricing':
      return DESCRIPTION_TEMPLATES.pricing(
        params.tool,
        params.price || 'various tiers',
        year
      );
    
    default:
      return `Expert guide for ${year}. Verified data, actionable insights, and recommendations from RiscLens.`;
  }
}

// Priority pages from GSC analysis that need CTR improvement
export const PRIORITY_PAGES = {
  topTenZeroClicks: [
    { url: '/compliance/directory/navan', impressions: 513, position: 7.2, type: 'directory' },
    { url: '/compliance/directory/tailscale', impressions: 464, position: 9.42, type: 'directory' },
    { url: '/compare/drata-vs-onetrust', impressions: 456, position: 8.88, type: 'comparison' },
    { url: '/compare/scytale-vs-workiva', impressions: 378, position: 3.61, type: 'comparison' },
    { url: '/compare/secureframe-vs-onetrust', impressions: 344, position: 4.47, type: 'comparison' },
    { url: '/pricing/auditboard', impressions: 215, position: 7.7, type: 'pricing' },
    { url: '/pricing/workiva', impressions: 200, position: 7.82, type: 'pricing' },
    { url: '/compare/secureframe-vs-scrut', impressions: 206, position: 7.8, type: 'comparison' },
    { url: '/pricing/scytale', impressions: 150, position: 6.35, type: 'pricing' },
    { url: '/pricing/thoropass', impressions: 101, position: 4.76, type: 'pricing' },
  ],
  pageTwoOpportunities: [
    { url: '/compare/auditboard-vs-workiva', impressions: 279, position: 14.38, type: 'comparison' },
    { url: '/compare/optimizely-alternatives/for/ecommerce', impressions: 275, position: 16.32, type: 'alternatives' },
    { url: '/compare/workiva-alternatives', impressions: 205, position: 12.7, type: 'alternatives' },
    { url: '/compliance/directory/upguard', impressions: 174, position: 12.9, type: 'directory' },
    { url: '/compare/apptega-alternatives', impressions: 150, position: 11.75, type: 'alternatives' },
  ],
};

// Run analysis if executed directly
if (require.main === module) {
  console.log('=== Competitor SEO Analysis Report ===\n');
  
  console.log('CTR Benchmarks by Position:');
  console.log(`  Position #1: ${CTR_BENCHMARKS.position1}%`);
  console.log(`  Position #2: ${CTR_BENCHMARKS.position2}%`);
  console.log(`  Position #3: ${CTR_BENCHMARKS.position3}%`);
  console.log(`  Position #10: ${CTR_BENCHMARKS.position10}%`);
  console.log(`  Top 3 combined: ${CTR_BENCHMARKS.topThreeTotal}%\n`);
  
  console.log('Title Optimization Guidelines:');
  console.log('  - Optimal length: 40-60 characters (+33.3% CTR)');
  console.log('  - Include year signal (2026)');
  console.log('  - Use positive sentiment (+4.1% CTR)');
  console.log('  - Include price hooks where possible');
  console.log('  - Add power words sparingly\n');
  
  console.log('Priority Pages Needing CTR Fix:');
  for (const page of PRIORITY_PAGES.topTenZeroClicks.slice(0, 5)) {
    console.log(`  ${page.url}`);
    console.log(`    Impressions: ${page.impressions}, Position: ${page.position}, Type: ${page.type}`);
  }
  
  console.log('\nGenerated Optimized Titles:');
  console.log('  Comparison:', generateOptimizedTitle('comparison', { toolA: 'Drata', toolB: 'OneTrust' }));
  console.log('  Alternatives:', generateOptimizedTitle('alternatives', { tool: 'Workiva', count: 15 }));
  console.log('  Directory:', generateOptimizedTitle('directory', { company: 'Navan' }));
  console.log('  Pricing:', generateOptimizedTitle('pricing', { tool: 'AuditBoard', price: '$25,000/yr' }));
}
