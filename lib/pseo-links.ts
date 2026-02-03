/**
 * Utility for generating smart contextual links between pSEO pages
 */

export interface RelatedLink {
  title: string;
  href: string;
  category: string;
}

export const HIGH_INTENT_TOOLS = [
  { href: '/soc-2-readiness-index', label: 'Get Readiness Score', description: 'Free SOC 2 readiness assessment' },
  { href: '/soc-2-cost', label: 'SOC 2 Cost Guide', description: 'Estimate audit and tooling costs' },
  { href: '/penetration-testing/cost-estimator', label: 'Pentest Cost Estimator', description: 'Scope and estimate pentest costs' },
  { href: '/vendor-risk-assessment/triage', label: 'VRA Triage', description: 'Score vendor risk in minutes' },
] as const;

/**
 * Maps a tool slug to its alternatives slug
 */
export function getAlternativesHref(toolSlug: string): string {
  // If slug already ends with -alternatives, return it
  if (toolSlug.endsWith('-alternatives')) return `/compare/${toolSlug}`;
  return `/compare/${toolSlug}-alternatives`;
}

/**
 * Maps a tool slug to its pricing slug
 */
export function getPricingHref(toolSlug: string): string {
  // Remove -alternatives if present
  const base = toolSlug.replace('-alternatives', '');
  return `/pricing/${base}`;
}

/**
 * Returns common tools for a given industry/framework to help with cross-linking
 */
export function getRecommendedTools(industrySlug: string): { name: string, slug: string }[] {
  const recommendations: Record<string, { name: string, slug: string }[]> = {
    'saas': [
      { name: 'Vanta', slug: 'vanta' },
      { name: 'Drata', slug: 'drata' },
      { name: 'Sprinto', slug: 'sprinto' }
    ],
    'fintech': [
      { name: 'Vanta', slug: 'vanta' },
      { name: 'Thoropass', slug: 'thoropass' },
      { name: 'Secureframe', slug: 'secureframe' }
    ],
    'healthcare': [
      { name: 'Drata', slug: 'drata' },
      { name: 'Vanta', slug: 'vanta' },
      { name: 'Secureframe', slug: 'secureframe' }
    ],
    'ai-ml': [
      { name: 'Wiz', slug: 'wiz' },
      { name: 'Vanta', slug: 'vanta' },
      { name: 'Snyk', slug: 'snyk' }
    ],
    'enterprise': [
      { name: 'AuditBoard', slug: 'auditboard' },
      { name: 'OneTrust', slug: 'onetrust' },
      { name: 'LogicGate', slug: 'logicgate' }
    ]
  };

  return recommendations[industrySlug] || recommendations['saas'];
}

/**
 * Returns related roles for cross-linking
 */
export function getRelatedRoles(currentRoleSlug: string): { name: string, slug: string }[] {
  const roles = [
    { name: 'Founder', slug: 'founder' },
    { name: 'CTO', slug: 'cto' },
    { name: 'Engineering Manager', slug: 'engineering-manager' },
    { name: 'Compliance Officer', slug: 'compliance-officer' },
    { name: 'IT Director', slug: 'it-director' }
  ];
  
  return roles.filter(r => r.slug !== currentRoleSlug).slice(0, 4);
}
