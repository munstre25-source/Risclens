import { ComplianceTool, getAllTools, TOP_TOOLS } from './compliance-tools';
import { getSupabaseClient } from './supabase';

export interface InternalLink {
  href: string;
  text: string;
  title?: string;
  priority: 'high' | 'medium' | 'low';
  context?: string;
}

export interface LinkCluster {
  title: string;
  links: InternalLink[];
}

export async function getIndustryGuides(): Promise<InternalLink[]> {
  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from('pseo_pages')
    .select('slug, title, category')
    .eq('category', 'compliance')
    .limit(10);
  
  return (data || []).map(page => ({
    href: `/compliance/${page.slug}`,
    text: page.title.replace(' | RiscLens', ''),
    priority: 'medium' as const,
  }));
}

export async function getComparisonInternalLinks(
  toolASlug: string,
  toolBSlug: string
): Promise<LinkCluster[]> {
  const tools = await getAllTools();
  const toolA = tools.find(t => t.slug === toolASlug);
  const toolB = tools.find(t => t.slug === toolBSlug);
  
  if (!toolA || !toolB) return [];

  const clusters: LinkCluster[] = [];

  // Cluster 1: More Tool A Comparisons
  clusters.push({
    title: `More ${toolA.name} Comparisons`,
    links: tools
      .filter(t => t.slug !== toolASlug && t.slug !== toolBSlug)
      .slice(0, 8)
      .map(t => ({
        href: `/compare/${[toolASlug, t.slug].sort().join('-vs-')}`,
        text: `${toolA.name} vs ${t.name}`,
        priority: TOP_TOOLS.includes(t.slug) ? 'high' : 'medium' as const,
      })),
  });

  // Cluster 2: More Tool B Comparisons
  clusters.push({
    title: `More ${toolB.name} Comparisons`,
    links: tools
      .filter(t => t.slug !== toolASlug && t.slug !== toolBSlug)
      .slice(0, 8)
      .map(t => ({
        href: `/compare/${[toolBSlug, t.slug].sort().join('-vs-')}`,
        text: `${toolB.name} vs ${t.name}`,
        priority: TOP_TOOLS.includes(t.slug) ? 'high' : 'medium' as const,
      })),
  });

  // Cluster 3: Industry Specific Guides
  const industryGuides = await getIndustryGuides();
  if (industryGuides.length > 0) {
    clusters.push({
      title: 'Industry Compliance Guides',
      links: industryGuides.slice(0, 6),
    });
  }

  clusters.push({
    title: 'Related Resources',
    links: [
      {
        href: `/compare/${toolASlug}-alternatives`,
        text: `${toolA.name} Alternatives`,
        priority: 'high',
      },
      {
        href: `/compare/${toolBSlug}-alternatives`,
        text: `${toolB.name} Alternatives`,
        priority: 'high',
      },
      {
        href: `/pricing/${toolASlug}`,
        text: `${toolA.name} Pricing`,
        priority: 'high',
      },
      {
        href: `/pricing/${toolBSlug}`,
        text: `${toolB.name} Pricing`,
        priority: 'high',
      },
    ],
  });

  clusters.push({
    title: 'Compliance Hub',
    links: [
      { href: '/soc-2-cost-calculator', text: 'SOC 2 Cost Calculator', priority: 'high' },
      { href: '/soc-2-readiness', text: 'SOC 2 Readiness Guide', priority: 'medium' },
      { href: '/iso-27001', text: 'ISO 27001 Guide', priority: 'medium' },
      { href: '/auditor-match', text: 'Find an Auditor', priority: 'high' },
    ],
  });

  return clusters;
}

export async function getAlternativesInternalLinks(toolSlug: string): Promise<LinkCluster[]> {
  const tools = await getAllTools();
  const tool = tools.find(t => t.slug === toolSlug);
  
  if (!tool) return [];

  const clusters: LinkCluster[] = [];

  clusters.push({
    title: `${tool.name} Comparisons`,
    links: tools
      .filter(t => t.slug !== toolSlug)
      .slice(0, 8)
      .map(t => ({
        href: `/compare/${[toolSlug, t.slug].sort().join('-vs-')}`,
        text: `${tool.name} vs ${t.name}`,
        priority: TOP_TOOLS.includes(t.slug) ? 'high' : 'medium' as const,
      })),
  });

  clusters.push({
    title: 'Other Tool Alternatives',
    links: tools
      .filter(t => t.slug !== toolSlug && TOP_TOOLS.includes(t.slug))
      .map(t => ({
        href: `/compare/${t.slug}-alternatives`,
        text: `${t.name} Alternatives`,
        priority: 'medium' as const,
      })),
  });

  const industryGuides = await getIndustryGuides();
  if (industryGuides.length > 0) {
    clusters.push({
      title: 'Industry Compliance Guides',
      links: industryGuides.slice(0, 6),
    });
  }

  clusters.push({
    title: 'Pricing Guides',
    links: [
      { href: `/pricing/${toolSlug}`, text: `${tool.name} Pricing Guide`, priority: 'high' },
      ...tools
        .filter(t => t.slug !== toolSlug && TOP_TOOLS.includes(t.slug))
        .slice(0, 4)
        .map(t => ({
          href: `/pricing/${t.slug}`,
          text: `${t.name} Pricing`,
          priority: 'medium' as const,
        })),
    ],
  });

  clusters.push({
    title: 'Compliance Hub',
    links: [
      { href: '/soc-2-cost-calculator', text: 'SOC 2 Cost Calculator', priority: 'high' },
      { href: '/soc-2-readiness', text: 'SOC 2 Readiness Guide', priority: 'medium' },
      { href: '/compare/market-intelligence', text: 'Market Intelligence Hub', priority: 'medium' },
      { href: '/auditor-match', text: 'Find an Auditor', priority: 'high' },
    ],
  });

  return clusters;
}

export async function getPricingInternalLinks(toolSlug: string): Promise<LinkCluster[]> {
  const tools = await getAllTools();
  const tool = tools.find(t => t.slug === toolSlug);
  
  if (!tool) return [];

  const clusters: LinkCluster[] = [];

  clusters.push({
    title: 'Compare Pricing',
    links: tools
      .filter(t => t.slug !== toolSlug)
      .slice(0, 8)
      .map(t => ({
        href: `/compare/${[toolSlug, t.slug].sort().join('-vs-')}`,
        text: `${tool.name} vs ${t.name} Pricing`,
        priority: TOP_TOOLS.includes(t.slug) ? 'high' : 'medium' as const,
      })),
  });

  clusters.push({
    title: 'Other Pricing Guides',
    links: tools
      .filter(t => t.slug !== toolSlug && TOP_TOOLS.includes(t.slug))
      .map(t => ({
        href: `/pricing/${t.slug}`,
        text: `${t.name} Pricing`,
        priority: 'medium' as const,
      })),
  });

  const industryGuides = await getIndustryGuides();
  if (industryGuides.length > 0) {
    clusters.push({
      title: 'Compliance by Industry',
      links: industryGuides.slice(0, 6),
    });
  }

  clusters.push({
    title: 'Related Resources',
    links: [
      { href: `/compare/${toolSlug}-alternatives`, text: `${tool.name} Alternatives`, priority: 'high' },
      { href: '/soc-2-cost-calculator', text: 'SOC 2 Cost Calculator', priority: 'high' },
      { href: '/soc-2-cost', text: 'SOC 2 Cost Breakdown', priority: 'medium' },
      { href: '/auditor-match', text: 'Find an Auditor', priority: 'high' },
    ],
  });

  return clusters;
}

export function getContextualLinks(content: string, tools: ComplianceTool[]): string {
  let processedContent = content;
  
  tools.forEach(tool => {
    const regex = new RegExp(`\\b${tool.name}\\b(?![^<]*>)`, 'g');
    let isFirst = true;
    processedContent = processedContent.replace(regex, (match) => {
      if (isFirst) {
        isFirst = false;
        return `<a href="/pricing/${tool.slug}" class="text-blue-600 hover:underline">${match}</a>`;
      }
      return match;
    });
  });
  
  return processedContent;
}

export function getBreadcrumbs(path: string): { label: string; href: string }[] {
  const breadcrumbs = [{ label: 'Home', href: '/' }];
  
  if (path.startsWith('/compare/')) {
    breadcrumbs.push({ label: 'Compare', href: '/compare/market-intelligence' });
    
    const slug = path.replace('/compare/', '');
    if (slug.includes('-vs-')) {
      const [toolA, toolB] = slug.split('-vs-');
      breadcrumbs.push({ label: `${formatToolName(toolA)} vs ${formatToolName(toolB)}`, href: path });
    } else if (slug.includes('-alternatives')) {
      const toolSlug = slug.replace('-alternatives', '');
      breadcrumbs.push({ label: `${formatToolName(toolSlug)} Alternatives`, href: path });
    }
  } else if (path.startsWith('/pricing/')) {
    breadcrumbs.push({ label: 'Pricing', href: '/compare/market-intelligence' });
    const toolSlug = path.replace('/pricing/', '');
    breadcrumbs.push({ label: `${formatToolName(toolSlug)} Pricing`, href: path });
  }
  
  return breadcrumbs;
}

function formatToolName(slug: string): string {
  const specialCases: Record<string, string> = {
    'vanta': 'Vanta',
    'drata': 'Drata',
    'secureframe': 'Secureframe',
    'sprinto': 'Sprinto',
    'thoropass': 'Thoropass',
    'auditboard': 'AuditBoard',
    'hyperproof': 'Hyperproof',
    'scrut': 'Scrut',
    'scytale': 'Scytale',
    'strike-graph': 'Strike Graph',
    'logicgate': 'LogicGate',
    'onetrust': 'OneTrust',
    'a-lign': 'A-LIGN',
    'jupiterone': 'JupiterOne',
    'lacework': 'Lacework',
    'cynomi': 'Cynomi',
    'apptega': 'Apptega',
    'workiva': 'Workiva',
    'resolver': 'Resolver',
    'anecdotes': 'Anecdotes',
  };
  
  return specialCases[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function generateSchemaOrgBreadcrumbs(breadcrumbs: { label: string; href: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `https://risclens.com${crumb.href}`,
    })),
  };
}

export const generateFAQSchema = (faqs: { question: string; answer: string }[]): any => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export function generateComparisonSchema(
  toolA: ComplianceTool,
  toolB: ComplianceTool,
  url: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${toolA.name} vs ${toolB.name}: Which Compliance Platform is Better in 2026?`,
    description: `Compare ${toolA.name} and ${toolB.name} head-to-head. See pricing, features, integrations, and our expert verdict.`,
    author: {
      '@type': 'Organization',
      name: 'RiscLens Research Team',
      url: 'https://risclens.com/methodology',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RiscLens',
      url: 'https://risclens.com',
    },
    datePublished: '2026-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    about: [
      {
        '@type': 'SoftwareApplication',
        name: toolA.name,
        applicationCategory: 'Compliance Automation Software',
        aggregateRating: toolA.g2_rating ? {
          '@type': 'AggregateRating',
          ratingValue: toolA.g2_rating,
          reviewCount: toolA.g2_reviews_count,
          bestRating: 5,
        } : undefined,
      },
      {
        '@type': 'SoftwareApplication',
        name: toolB.name,
        applicationCategory: 'Compliance Automation Software',
        aggregateRating: toolB.g2_rating ? {
          '@type': 'AggregateRating',
          ratingValue: toolB.g2_rating,
          reviewCount: toolB.g2_reviews_count,
          bestRating: 5,
        } : undefined,
      },
    ],
  };
}

export function generateToolSchema(tool: ComplianceTool, url: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'Compliance Automation Software',
    operatingSystem: 'Web-based',
    offers: tool.pricing_starting ? {
      '@type': 'Offer',
      price: tool.pricing_starting,
      priceCurrency: 'USD',
      priceValidUntil: '2026-12-31',
    } : undefined,
    aggregateRating: tool.g2_rating ? {
      '@type': 'AggregateRating',
      ratingValue: tool.g2_rating,
      reviewCount: tool.g2_reviews_count,
      bestRating: 5,
    } : undefined,
    url: tool.website_url,
    sameAs: tool.website_url,
  };
}

export async function getIndustryGuideClusters(
  frameworkSlug: string,
  currentSlug: string
): Promise<LinkCluster[]> {
  const tools = await getAllTools();
  const supabase = getSupabaseClient();
  
  // Get other guides in the same framework
  const { data: otherGuides } = await supabase
    .from('pseo_pages')
    .select('slug, title, category')
    .eq('category', 'compliance')
    .neq('slug', currentSlug)
    .limit(8);

  const clusters: LinkCluster[] = [];

  clusters.push({
    title: 'Top Compliance Platforms',
    links: tools
      .filter(t => TOP_TOOLS.includes(t.slug))
      .map(t => ({
        href: `/pricing/${t.slug}`,
        text: `${t.name} for ${frameworkSlug.toUpperCase().replace('-', ' ')}`,
        priority: 'high',
      })),
  });

  if (otherGuides && otherGuides.length > 0) {
    clusters.push({
      title: 'Industry Specific Compliance',
      links: otherGuides.map(guide => ({
        href: `/compliance/${guide.slug}`,
        text: guide.title.replace(' | RiscLens', ''),
        priority: 'medium',
      })),
    });
  }

  clusters.push({
    title: 'Decision Tools',
    links: [
      { href: '/soc-2-cost-calculator', text: 'SOC 2 Cost Calculator', priority: 'high' },
      { href: '/auditor-match', text: 'Auditor Selection Tool', priority: 'high' },
      { href: '/compare/market-intelligence', text: 'Market Intelligence Hub', priority: 'medium' },
      { href: '/compliance/directory/san-francisco', text: 'Auditor Directory', priority: 'medium' },
    ],
  });

  return clusters;
}
