import { industryCostLinks } from './industryCostLinks';

export const CTA = {
  href: '/soc-2-readiness-index',
  label: 'Get Readiness Score',
};

export const navConfig = {
  soc: {
    overview: { label: 'Overview', href: '/soc-2/guides' },
    primary: { label: 'Readiness Score', href: CTA.href, badge: 'Tool' },
    guides: [
      { label: 'SOC 2 Cost', href: '/soc-2-cost' },
      { label: 'SOC 2 Timeline', href: '/soc-2-timeline' },
      { label: 'Type I vs Type II', href: '/soc-2-type-i-vs-type-ii' },
      { label: 'Readiness Checklist', href: '/soc-2-readiness-checklist' },
    ],
    viewAll: { label: 'View all SOC 2 →', href: '/soc-2/guides' },
  },
  pentest: {
    overview: { label: 'Overview', href: '/penetration-testing' },
    primary: { label: 'Cost Estimator', href: '/penetration-testing/cost-estimator', badge: 'Tool' },
    guides: [
      { label: 'Pricing', href: '/penetration-testing/pricing' },
      { label: 'Pentest vs Scan', href: '/penetration-testing/vs-vulnerability-scan' },
      { label: 'For SOC 2', href: '/penetration-testing/for-soc-2' },
      { label: 'Reporting', href: '/penetration-testing/report' },
    ],
    viewAll: { label: 'View all Pentest →', href: '/penetration-testing' },
  },
  vendor: {
    overview: { label: 'Overview', href: '/vendor-risk-assessment' },
    primary: { label: 'Risk Triage', href: '/vendor-risk-assessment/triage', badge: 'Tool' },
    guides: [
      { label: 'Checklist', href: '/vendor-risk-assessment/checklist' },
      { label: 'Evidence by Tier', href: '/vendor-risk-assessment/evidence-by-tier' },
      { label: 'Contract Clauses', href: '/vendor-risk-assessment/contract-clauses' },
      { label: 'Monitoring Cadence', href: '/vendor-risk-assessment/monitoring-cadence' },
    ],
    viewAll: { label: 'View all Vendor Risk →', href: '/vendor-risk-assessment' },
  },
  guides: [
    { label: 'SOC 2 Cost Breakdown', href: '/soc-2-cost-breakdown' },
    { label: 'SOC 2 Timeline', href: '/soc-2-timeline' },
    { label: 'SOC 2 vs ISO 27001', href: '/soc-2-vs-iso-27001' },
    { label: 'Pentest vs Scan', href: '/penetration-testing/vs-vulnerability-scan' },
    { label: 'Vendor Risk Assessment', href: '/vendor-risk-assessment' },
  ],
};

export const industriesNav = industryCostLinks.map(({ label, hubHref }) => ({
  label,
  href: hubHref,
}));

export const costIndustries = industryCostLinks;
