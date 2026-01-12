import { getSupabaseClient, getSupabaseAdmin } from './supabase';

export interface ComplianceTool {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  founded_year: number | null;
  headquarters: string | null;
  pricing_starting: string | null;
  pricing_range: string | null;
  pricing_model: string | null;
  auditor_included: boolean;
  hidden_costs: string | null;
  integrations_count: number | null;
  frameworks_supported: string[];
  frameworks_count: number | null;
  automation_level: string | null;
  key_features: string[];
  target_market: string | null;
  company_size_fit: string[];
  industry_focus: string[];
  primary_value: string | null;
  best_for: string | null;
  limitations: string[];
  g2_rating: number | null;
  g2_reviews_count: number | null;
  capterra_rating: number | null;
  customers_count: number | null;
  notable_customers: string[];
  pros: string[];
  cons: string[];
  verdict: string | null;
  is_active: boolean;
  display_order: number;
  last_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface ToolComparison {
  id: string;
  slug: string;
  tool_a_slug: string;
  tool_b_slug: string;
  title: string;
  meta_description: string | null;
  intro: string | null;
  verdict: string | null;
  winner_slug: string | null;
  comparison_rows: ComparisonRow[];
  pricing_comparison: PricingComparison | null;
  faqs: FAQ[];
  methodology_note: string | null;
  sources: string[];
  author: string;
  is_active: boolean;
  last_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface ComparisonRow {
  feature: string;
  tool_a_value: string;
  tool_b_value: string;
  winner?: 'a' | 'b' | 'tie';
}

export interface PricingComparison {
  tool_a_starting: string;
  tool_b_starting: string;
  tool_a_range: string;
  tool_b_range: string;
  tool_a_hidden_costs: string;
  tool_b_hidden_costs: string;
  tool_a_auditor_included: boolean;
  tool_b_auditor_included: boolean;
  summary: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

const CACHE_TTL = process.env.NODE_ENV === 'development' ? 5 * 1000 : 60 * 60 * 1000; // 5 seconds in dev, 1 hour in prod
let toolsCache: { data: ComplianceTool[]; timestamp: number } | null = null;

export async function getAllTools(): Promise<ComplianceTool[]> {
    if (toolsCache && Date.now() - toolsCache.timestamp < CACHE_TTL) {
      return toolsCache.data;
    }

    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from('compliance_tools')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('[getAllTools] Supabase error:', error.message, error.code);
        return toolsCache?.data || [];
      }

      const tools = data || [];
      if (tools.length === 0) {
        console.warn('[getAllTools] No tools found in database');
      }

      toolsCache = { data: tools, timestamp: Date.now() };
      return tools;
    } catch (err) {
      console.error('[getAllTools] Exception:', err);
      return toolsCache?.data || [];
    }

}

export async function getToolBySlug(slug: string): Promise<ComplianceTool | null> {
  const tools = await getAllTools();
  return tools.find(t => t.slug === slug) || null;
}

export async function getToolsByMarket(market: string): Promise<ComplianceTool[]> {
  const tools = await getAllTools();
  return tools.filter(t => 
    t.target_market?.toLowerCase().includes(market.toLowerCase()) ||
    t.company_size_fit?.some(s => s.toLowerCase().includes(market.toLowerCase()))
  );
}

export async function getToolsForComparison(slugA: string, slugB: string): Promise<{ toolA: ComplianceTool | null; toolB: ComplianceTool | null }> {
  const tools = await getAllTools();
  return {
    toolA: tools.find(t => t.slug === slugA) || null,
    toolB: tools.find(t => t.slug === slugB) || null
  };
}

export async function getToolComparisonBySlug(slug: string): Promise<ToolComparison | null> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('tool_comparisons')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // PGRST116 is "no rows found"
        console.error('[getToolComparisonBySlug] Supabase error:', error.message);
      }
      return null;
    }

    return data;
  } catch (err) {
    console.error('[getToolComparisonBySlug] Exception:', err);
    return null;
  }
}

export async function getAlternativesFor(toolSlug: string): Promise<ComplianceTool[]> {
  const tools = await getAllTools();
  const targetTool = tools.find(t => t.slug === toolSlug);
  if (!targetTool) return [];
  
  return tools
    .filter(t => t.slug !== toolSlug)
    .sort((a, b) => {
      const aOverlap = countOverlap(a.company_size_fit, targetTool.company_size_fit) +
                       countOverlap(a.industry_focus, targetTool.industry_focus);
      const bOverlap = countOverlap(b.company_size_fit, targetTool.company_size_fit) +
                       countOverlap(b.industry_focus, targetTool.industry_focus);
      return bOverlap - aOverlap;
    });
}

function countOverlap(arr1: string[], arr2: string[]): number {
  if (!arr1 || !arr2) return 0;
  return arr1.filter(item => arr2.includes(item)).length;
}

export function generateComparisonSlug(toolASlug: string, toolBSlug: string): string {
  const sorted = [toolASlug, toolBSlug].sort();
  return `${sorted[0]}-vs-${sorted[1]}`;
}

export function parseComparisonSlug(slug: string): { toolASlug: string; toolBSlug: string } | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return { toolASlug: match[1], toolBSlug: match[2] };
}

export async function getAllComparisonSlugs(): Promise<string[]> {
  const tools = await getAllTools();
  const slugs: string[] = [];
  
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      const baseSlug = generateComparisonSlug(tools[i].slug, tools[j].slug);
      slugs.push(baseSlug);
    }
  }
  
  return slugs;
}

export async function getAllAlternativesSlugs(): Promise<string[]> {
  const tools = await getAllTools();
  return tools.map(t => `${t.slug}-alternatives`);
}

export async function getIndustryBySlug(slug: string) {
  const { data } = await getSupabaseAdmin()
    .from('pseo_industries')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export async function getFrameworkOverlap(fromFramework: string, toFramework: string) {
  const { data } = await getSupabaseAdmin()
    .from('framework_migrations')
    .select('*')
    .eq('from_framework_slug', fromFramework)
    .eq('to_framework_slug', toFramework)
    .single();
  return data;
}

export function generateComparisonData(toolA: ComplianceTool, toolB: ComplianceTool, industry?: any): {
  comparisonRows: ComparisonRow[];
  pricingComparison: PricingComparison;
  faqs: FAQ[];
} {
  const commonFrameworks = toolA.frameworks_supported?.filter(f => toolB.frameworks_supported?.includes(f)) || [];
  
  const comparisonRows: ComparisonRow[] = [
    {
      feature: 'Industry Fit',
      tool_a_value: industry ? (toolA.industry_focus?.includes(industry.name) ? `Excellent for ${industry.name}` : toolA.target_market || 'N/A') : toolA.target_market || 'N/A',
      tool_b_value: industry ? (toolB.industry_focus?.includes(industry.name) ? `Excellent for ${industry.name}` : toolB.target_market || 'N/A') : toolB.target_market || 'N/A',
    },
    {
      feature: 'Multi-Framework Support',
      tool_a_value: `${toolA.frameworks_count}+ frameworks (${toolA.frameworks_supported?.slice(0, 3).join(', ')})`,
      tool_b_value: `${toolB.frameworks_count}+ frameworks (${toolB.frameworks_supported?.slice(0, 3).join(', ')})`,
    },
    {
      feature: 'Common Frameworks',
      tool_a_value: commonFrameworks.length > 0 ? commonFrameworks.join(', ') : 'SOC 2, ISO 27001',
      tool_b_value: commonFrameworks.length > 0 ? commonFrameworks.join(', ') : 'SOC 2, ISO 27001',
    },

    {
      feature: 'Starting Price',
      tool_a_value: toolA.pricing_starting || 'Contact Sales',
      tool_b_value: toolB.pricing_starting || 'Contact Sales',
    },
    {
      feature: 'Auditor Included',
      tool_a_value: toolA.auditor_included ? 'Yes' : 'No',
      tool_b_value: toolB.auditor_included ? 'Yes' : 'No',
    },
    {
      feature: 'Integrations',
      tool_a_value: toolA.integrations_count ? `${toolA.integrations_count}+` : 'N/A',
      tool_b_value: toolB.integrations_count ? `${toolB.integrations_count}+` : 'N/A',
    },
    {
      feature: 'Frameworks Supported',
      tool_a_value: toolA.frameworks_count ? `${toolA.frameworks_count}+` : 'N/A',
      tool_b_value: toolB.frameworks_count ? `${toolB.frameworks_count}+` : 'N/A',
    },
    {
      feature: 'Automation Level',
      tool_a_value: toolA.automation_level || 'N/A',
      tool_b_value: toolB.automation_level || 'N/A',
    },
    {
      feature: 'G2 Rating',
      tool_a_value: toolA.g2_rating ? `${toolA.g2_rating}/5 (${toolA.g2_reviews_count} reviews)` : 'N/A',
      tool_b_value: toolB.g2_rating ? `${toolB.g2_rating}/5 (${toolB.g2_reviews_count} reviews)` : 'N/A',
    },
    {
      feature: 'Best For',
      tool_a_value: toolA.best_for || 'N/A',
      tool_b_value: toolB.best_for || 'N/A',
    },
  ];

  const pricingComparison: PricingComparison = {
    tool_a_starting: toolA.pricing_starting || 'Contact Sales',
    tool_b_starting: toolB.pricing_starting || 'Contact Sales',
    tool_a_range: toolA.pricing_range || 'Custom pricing',
    tool_b_range: toolB.pricing_range || 'Custom pricing',
    tool_a_hidden_costs: toolA.hidden_costs || 'None disclosed',
    tool_b_hidden_costs: toolB.hidden_costs || 'None disclosed',
    tool_a_auditor_included: toolA.auditor_included,
    tool_b_auditor_included: toolB.auditor_included,
    summary: generatePricingSummary(toolA, toolB),
  };

  const faqs: FAQ[] = [
    {
      question: `Is ${toolA.name} cheaper than ${toolB.name}?`,
      answer: generatePriceFAQ(toolA, toolB),
    },
    {
      question: `Which is better for startups: ${toolA.name} or ${toolB.name}?`,
      answer: generateStartupFAQ(toolA, toolB),
    },
    {
      question: `Can I switch from ${toolA.name} to ${toolB.name}?`,
      answer: `Yes, most compliance platforms support data export. However, evidence migration may require manual effort. Both ${toolA.name} and ${toolB.name} offer onboarding support for migrating customers.`,
    },
    {
      question: `Do ${toolA.name} or ${toolB.name} include audit services?`,
      answer: toolA.auditor_included || toolB.auditor_included
        ? `${toolA.auditor_included ? toolA.name + ' includes bundled audit services. ' : toolA.name + ' requires a separate auditor. '}${toolB.auditor_included ? toolB.name + ' includes bundled audit services.' : toolB.name + ' requires a separate auditor.'}`
        : `Neither ${toolA.name} nor ${toolB.name} include audit services in their base pricing. You will need to engage a separate auditor, typically costing $8,000-$25,000 additionally.`,
    },
  ];

  return { comparisonRows, pricingComparison, faqs };
}

function generatePricingSummary(toolA: ComplianceTool, toolB: ComplianceTool): string {
  const aPrice = parsePriceRange(toolA.pricing_starting);
  const bPrice = parsePriceRange(toolB.pricing_starting);
  
  let summary = "";
  
  if (aPrice && bPrice) {
    if (aPrice < bPrice) {
      summary = `${toolA.name} is generally the more budget-friendly entry point, starting at ${toolA.pricing_starting} compared to ${toolB.name}'s ${toolB.pricing_starting}. `;
    } else if (bPrice < aPrice) {
      summary = `${toolB.name} is generally more accessible for early-stage teams, with pricing starting at ${toolB.pricing_starting} vs ${toolA.name}'s ${toolA.pricing_starting}. `;
    } else {
      summary = `Both ${toolA.name} and ${toolB.name} have similar starting price points around ${toolA.pricing_starting}. `;
    }
  } else {
    summary = `Both platforms typically require a custom quote, though ${toolA.pricing_starting || toolB.pricing_starting} is the reported starting point. `;
  }

  if (toolA.auditor_included !== toolB.auditor_included) {
    const inclusive = toolA.auditor_included ? toolA.name : toolB.name;
    summary += `Crucially, ${inclusive} includes bundled auditor fees, which can save $8,000–$15,000 in out-of-pocket costs compared to the other. `;
  }

  summary += `For 2026, we recommend ${toolA.name} for ${toolA.primary_value?.toLowerCase()} and ${toolB.name} for ${toolB.primary_value?.toLowerCase()}.`;
  
  return summary;
}

function generatePriceFAQ(toolA: ComplianceTool, toolB: ComplianceTool): string {
  const aPrice = parsePriceRange(toolA.pricing_starting);
  const bPrice = parsePriceRange(toolB.pricing_starting);
  
  if (aPrice && bPrice) {
    if (aPrice < bPrice) {
      return `${toolA.name} generally has lower starting prices (${toolA.pricing_starting}) compared to ${toolB.name} (${toolB.pricing_starting}). However, ${toolB.auditor_included ? toolB.name + ' includes auditor fees which could make total cost comparable' : 'total cost depends on your specific needs and any add-ons'}.`;
    } else if (bPrice < aPrice) {
      return `${toolB.name} generally has lower starting prices (${toolB.pricing_starting}) compared to ${toolA.name} (${toolA.pricing_starting}). However, ${toolA.auditor_included ? toolA.name + ' includes auditor fees which could make total cost comparable' : 'total cost depends on your specific needs and any add-ons'}.`;
    }
  }
  
  return `Pricing varies based on company size and requirements. Request quotes from both vendors for accurate comparison.`;
}

function generateStartupFAQ(toolA: ComplianceTool, toolB: ComplianceTool): string {
  const aForStartups = toolA.company_size_fit?.includes('1-50') || toolA.target_market?.toLowerCase().includes('startup');
  const bForStartups = toolB.company_size_fit?.includes('1-50') || toolB.target_market?.toLowerCase().includes('startup');
  
  if (aForStartups && !bForStartups) {
    return `${toolA.name} is generally better suited for startups with ${toolA.target_market}. ${toolB.name} targets ${toolB.target_market}, which may be more than early-stage companies need.`;
  } else if (bForStartups && !aForStartups) {
    return `${toolB.name} is generally better suited for startups with ${toolB.target_market}. ${toolA.name} targets ${toolA.target_market}, which may be more than early-stage companies need.`;
  } else if (aForStartups && bForStartups) {
    return `Both ${toolA.name} and ${toolB.name} work well for startups. ${toolA.name} emphasizes ${toolA.primary_value}, while ${toolB.name} focuses on ${toolB.primary_value}. Choose based on what matters most to your team.`;
  }
  
  return `Neither platform is specifically designed for startups. Consider alternatives like Vanta, Sprinto, or Secureframe for early-stage companies.`;
}

function parsePriceRange(priceStr: string | null): number | null {
  if (!priceStr) return null;
  const match = priceStr.match(/\$?([\d,]+)/);
  if (!match) return null;
  return parseInt(match[1].replace(/,/g, ''), 10);
}

export function generateComparisonTitle(toolA: ComplianceTool, toolB: ComplianceTool): string {
  return `${toolA.name} vs ${toolB.name}: Which Compliance Platform is Better in 2026?`;
}

export function generateComparisonDescription(toolA: ComplianceTool, toolB: ComplianceTool): string {
  return `Compare ${toolA.name} and ${toolB.name} head-to-head. See pricing, features, integrations, and our expert verdict on which compliance automation platform is right for your business.`;
}

export function generateAlternativesTitle(tool: ComplianceTool): string {
  return `Top ${tool.name} Alternatives & Competitors in 2026`;
}

export function generateAlternativesDescription(tool: ComplianceTool): string {
  return `Looking for ${tool.name} alternatives? Compare the best compliance automation platforms including pricing, features, and expert recommendations for your business.`;
}

export function generatePricingTitle(tool: ComplianceTool): string {
  return `${tool.name} Pricing 2026: Plans, Costs & Hidden Fees`;
}

export function generatePricingDescription(tool: ComplianceTool): string {
  return `Complete ${tool.name} pricing guide for 2026. See starting costs, what drives pricing, hidden fees, and whether auditor services are included.`;
}

export function generateVerdict(toolA: ComplianceTool, toolB: ComplianceTool): string {
  const aIsStartup = toolA.company_size_fit?.includes('1-50');
  const bIsStartup = toolB.company_size_fit?.includes('1-50');
  const aIsEnterprise = toolA.company_size_fit?.includes('1000+');
  const bIsEnterprise = toolB.company_size_fit?.includes('1000+');
  
  let verdict = `**Choose ${toolA.name} if:** ${toolA.best_for}\n\n`;
  verdict += `**Choose ${toolB.name} if:** ${toolB.best_for}\n\n`;
  
  if (aIsStartup && !bIsStartup) {
    verdict += `**Bottom Line:** ${toolA.name} is better for startups and growth-stage companies. ${toolB.name} is better suited for ${toolB.target_market}.`;
  } else if (bIsStartup && !aIsStartup) {
    verdict += `**Bottom Line:** ${toolB.name} is better for startups and growth-stage companies. ${toolA.name} is better suited for ${toolA.target_market}.`;
  } else if (aIsEnterprise && !bIsEnterprise) {
    verdict += `**Bottom Line:** ${toolA.name} is designed for enterprise scale. ${toolB.name} is a better fit for ${toolB.target_market}.`;
  } else if (bIsEnterprise && !aIsEnterprise) {
    verdict += `**Bottom Line:** ${toolB.name} is designed for enterprise scale. ${toolA.name} is a better fit for ${toolA.target_market}.`;
  } else {
    verdict += `**Bottom Line:** Both platforms serve similar markets. Your choice should depend on specific feature priorities and budget constraints.`;
  }
  
  return verdict;
}

export const TOP_TOOLS = [
  'vanta', 
  'drata', 
  'secureframe', 
  'sprinto', 
  'thoropass', 
  'auditboard', 
  'wiz', 
  'hyperproof', 
  'scrut-automation', 
  'cynomi',
  'smartsuite',
  'scytale',
  'anecdotes',
  'tugboat-logic'
];

export function isTopTool(slug: string): boolean {
  return TOP_TOOLS.includes(slug);
}
