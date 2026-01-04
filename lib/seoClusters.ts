export type ClusterKey =
  | 'soc2-guides'
  | 'soc2-industries'
  | 'soc2-cost'
  | 'soc2-timeline'
  | 'soc2-readiness'
  | 'pentest'
  | 'vendor-risk';

type Cluster = {
  hub: { href: string; label: string };
  leaves: { href: string; label: string }[];
};

export const seoClusters: Record<ClusterKey, Cluster> = {
  'soc2-guides': {
    hub: { href: '/soc-2/guides', label: 'SOC 2 Guides' },
    leaves: [
      { href: '/soc-2-cost-breakdown', label: 'SOC 2 Cost Breakdown' },
      { href: '/when-do-you-need-soc-2', label: 'When Do You Need SOC 2?' },
      { href: '/soc-2-vs-iso-27001', label: 'SOC 2 vs ISO 27001' },
      { href: '/soc-2-readiness/enterprise-sales', label: 'SOC 2 for Enterprise Sales' },
      { href: '/soc-2-readiness/startups', label: 'SOC 2 for Startups' },
    ],
  },
  'soc2-industries': {
    hub: { href: '/soc-2/industries', label: 'SOC 2 Industries' },
    leaves: [
      { href: '/soc-2/industries/saas', label: 'SaaS' },
      { href: '/soc-2/industries/fintech', label: 'Fintech' },
      { href: '/soc-2/industries/startups', label: 'Startups' },
      { href: '/soc-2/industries/enterprise', label: 'Enterprise' },
      { href: '/soc-2/industries/healthcare', label: 'Healthcare' },
      { href: '/soc-2/industries/ecommerce', label: 'E-commerce' },
      { href: '/soc-2/industries/marketplaces', label: 'Marketplaces' },
      { href: '/soc-2/industries/ai-data', label: 'AI/Data' },
    ],
  },
  'soc2-cost': {
    hub: { href: '/soc-2-cost', label: 'SOC 2 Cost' },
    leaves: [
      { href: '/soc-2-cost-breakdown', label: 'Cost Breakdown' },
      { href: '/soc-2-cost/auditor-fees', label: 'Auditor Fees' },
      { href: '/soc-2-cost/automation-tools-vanta-drata', label: 'Automation Tools' },
      { href: '/soc-2-cost/internal-time-and-headcount', label: 'Internal Time & Headcount' },
      { href: '/soc-2-cost/fintech', label: 'Fintech SOC 2 Cost' },
      { href: '/soc-2-cost/saas', label: 'SaaS SOC 2 Cost' },
    ],
  },
  'soc2-timeline': {
    hub: { href: '/soc-2-timeline', label: 'SOC 2 Timeline' },
    leaves: [
      { href: '/soc-2-timeline/5-10-employees', label: '5–10 employees' },
      { href: '/soc-2-timeline/10-50-employees', label: '10–50 employees' },
      { href: '/soc-2-timeline/50-200-employees', label: '50–200 employees' },
    ],
  },
  'soc2-readiness': {
    hub: { href: '/soc-2-readiness-index', label: 'SOC 2 Readiness Index' },
    leaves: [
      { href: '/soc-2-readiness/access-control', label: 'Access Control' },
      { href: '/soc-2-readiness/user-access-reviews', label: 'User Access Reviews' },
      { href: '/soc-2-readiness/mfa-and-authentication', label: 'MFA & Authentication' },
      { href: '/soc-2-readiness/change-management', label: 'Change Management' },
      { href: '/soc-2-readiness/logging-monitoring', label: 'Logging & Monitoring' },
      { href: '/soc-2-readiness/saas', label: 'Readiness for SaaS' },
      { href: '/soc-2-readiness/startups', label: 'Readiness for Startups' },
      { href: '/soc-2-readiness/fintech', label: 'Readiness for Fintech' },
      { href: '/soc-2-readiness/enterprise-sales', label: 'Readiness for Enterprise Sales' },
    ],
  },
  pentest: {
    hub: { href: '/penetration-testing', label: 'Penetration Testing' },
    leaves: [
      { href: '/penetration-testing/cost-estimator', label: 'Cost Estimator' },
      { href: '/penetration-testing/pricing', label: 'Pricing' },
      { href: '/penetration-testing/vs-vulnerability-scan', label: 'Pentest vs Scan' },
      { href: '/penetration-testing/for-soc-2', label: 'Pentest for SOC 2' },
      { href: '/penetration-testing/report', label: 'Reporting' },
      { href: '/penetration-testing/web-application', label: 'Web Application' },
      { href: '/penetration-testing/api', label: 'API Pentest' },
      { href: '/penetration-testing/mobile', label: 'Mobile Pentest' },
      { href: '/penetration-testing/cloud', label: 'Cloud Pentest' },
      { href: '/penetration-testing/network', label: 'Network/Internal' },
    ],
  },
  'vendor-risk': {
    hub: { href: '/vendor-risk-assessment', label: 'Vendor Risk Assessment' },
    leaves: [
      { href: '/vendor-risk-assessment/triage', label: 'VRA Triage' },
      { href: '/vendor-risk-assessment/checklist', label: 'Checklist' },
      { href: '/vendor-risk-assessment/scoring-model', label: 'Scoring Model' },
      { href: '/vendor-risk-assessment/evidence-by-tier', label: 'Evidence by Tier' },
      { href: '/vendor-risk-assessment/monitoring-cadence', label: 'Monitoring Cadence' },
      { href: '/vendor-risk-assessment/contract-clauses', label: 'Contract Clauses' },
      { href: '/vendor-risk-assessment/subprocessors-vs-vendors', label: 'Subprocessors vs Vendors' },
      { href: '/vendor-risk-assessment/common-mistakes', label: 'Common Mistakes' },
    ],
  },
};

export function getClusterByPath(path: string): ClusterKey | null {
  const entries = Object.entries(seoClusters) as [ClusterKey, Cluster][];
  for (const [key, cluster] of entries) {
    if (path === cluster.hub.href) return key;
    if (cluster.leaves.some((leaf) => path.startsWith(leaf.href))) return key;
  }
  return null;
}
