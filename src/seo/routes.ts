import { readinessGuides, costGuides, timelineGuides, salesGuides } from '@/lib/soc2Guides';
import { industryGuides } from '@/lib/soc2Industries';
import { pentestPages } from '@/lib/pentestPages';
import { comparisonPages } from '@/lib/soc2Comparisons';
import { evidenceGuides } from '@/lib/soc2Evidence';

/**
 * SITEMAP BUCKETS & PRIORITIES
 * 
 * 1.0:  Flagship Tools
 * 0.95: High-Intent Calculators
 * 0.90: Main Hubs
 * 0.85: Commercial Sub-pages
 * 0.70: Default / Other
 * 0.65: Learn Cluster
 * 0.40: Legal
 */

export const FLAGSHIP_ROUTES = [
  '/',
];

export const CALCULATOR_ROUTES = [
  '/soc-2-readiness-calculator',
  '/soc-2-cost',
  '/soc-2-timeline',
  '/auditor-match',
  '/compliance-roi-calculator',
  '/penetration-testing/cost-estimator',
];

export const HUB_ROUTES = [
  '/penetration-testing',
  '/vendor-risk-assessment',
  '/soc-2/guides',
  '/soc-2/industries',
  '/soc-2-sales',
  '/soc-2-evidence/vault',
  '/learn/soc-2-readiness',
];

export const LEGAL_ROUTES = [
  '/privacy',
  '/terms',
];

export const COMMERCIAL_ROUTES = [
  '/about',
  '/security',
  '/methodology',
  '/auditor-directory',
  '/iso-27001-checklist',
  '/soc-2-readiness-checklist',
  '/soc-2-cost-breakdown',
  '/when-do-you-need-soc-2',
  '/soc-2-vs-iso-27001',
  '/soc-2-type-i-vs-type-ii',
  ...costGuides.map(g => `${g.parent}/${g.slug}`),
  ...timelineGuides.map(g => `${g.parent}/${g.slug}`),
  ...salesGuides.map(g => `${g.parent}/${g.slug}`),
  ...industryGuides.map(g => `/soc-2/industries/${g.slug}`),
  ...pentestPages.map(p => `/penetration-testing/${p.slug}`),
  ...comparisonPages.map(c => `/compare/${c.slug}`),
  ...evidenceGuides.map(e => `/soc-2-evidence/${e.slug}`),
  // Static subpages from file system not in libs
  '/penetration-testing/pricing',
  '/penetration-testing/sow',
  '/penetration-testing/retesting-remediation',
  '/penetration-testing/compliance-buyers',
  '/penetration-testing/scoping',
  '/vendor-risk-assessment/questionnaire',
  '/vendor-risk-assessment/triage',
  '/vendor-risk-assessment/checklist',
  '/vendor-risk-assessment/scoring-model',
  '/vendor-risk-assessment/evidence-by-tier',
  '/vendor-risk-assessment/monitoring-cadence',
  '/vendor-risk-assessment/contract-clauses',
  '/vendor-risk-assessment/subprocessors-vs-vendors',
  '/vendor-risk-assessment/common-mistakes',
  '/vendor-risk-assessment/roi-calculator',
  '/vendor-risk-assessment/automation-vs-manual',
  '/vendor-risk-assessment/tiering',
  '/vendor-risk-assessment/industries/saas',
  '/vendor-risk-assessment/industries/fintech',
  '/vendor-risk-assessment/industries/healthcare',
  '/vendor-risk-assessment/soc-2-compliance-requirements',
  '/soc-2-sales/multi-framework-mapping',
  '/soc-2-sales/qualified-opinions',
  '/soc-2-sales/subservice-organizations',
  '/soc-2/continuous-monitoring',
  '/soc-2/auditor-selection',
];

export const LEARN_ROUTES = [
  ...readinessGuides.map(g => `${g.parent}/${g.slug}`),
  '/glossary',
];

/**
 * Combined list of all public, indexable routes.
 * Excludes /admin, /api, /experiments, and internal utility routes.
 */
export const ROUTES = Array.from(new Set([
  ...FLAGSHIP_ROUTES,
  ...CALCULATOR_ROUTES,
  ...HUB_ROUTES,
  ...COMMERCIAL_ROUTES,
  ...LEARN_ROUTES,
  ...LEGAL_ROUTES,
])).sort();

/**
 * Helper to determine the bucket for a given path
 */
export function getRouteBucket(path: string): 'flagship' | 'calculator' | 'hub' | 'commercial' | 'learn' | 'legal' | 'other' {
  if (FLAGSHIP_ROUTES.includes(path)) return 'flagship';
  if (CALCULATOR_ROUTES.includes(path)) return 'calculator';
  if (HUB_ROUTES.includes(path)) return 'hub';
  if (LEGAL_ROUTES.includes(path)) return 'legal';
  if (LEARN_ROUTES.some(r => path.startsWith(r)) || path.startsWith('/learn/')) return 'learn';
  if (COMMERCIAL_ROUTES.includes(path)) return 'commercial';
  return 'other';
}
