import { industryCostLinks } from './industryCostLinks';

export const CTA = {
  href: '/soc-2-readiness-calculator',
  label: 'Get Readiness Score',
};

export const navConfig = {
  soc: {
    overview: { label: 'Overview', href: '/soc-2/guides' },
    primary: { label: 'Readiness Score', href: CTA.href, badge: 'Tool' },
      guides: [
        { label: 'SOC 2 Cost', href: '/soc-2-cost' },
        { label: 'SOC 2 Timeline', href: '/soc-2-timeline' },
        { label: 'Sales & Operations', href: '/soc-2-sales' },
        { label: 'Type I vs Type II', href: '/soc-2-type-i-vs-type-ii' },
        { label: 'Readiness Checklist', href: '/soc-2-readiness-checklist' },
        { label: 'Evidence Vault', href: '/soc-2-evidence/vault' },
        { label: 'Auditor Selection', href: '/soc-2/auditor-selection' },
        { label: 'Continuous Monitoring', href: '/soc-2/continuous-monitoring' },
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
      { label: 'SOW Template', href: '/penetration-testing/sow' },
      { label: 'Retesting & Remediation', href: '/penetration-testing/retesting-remediation' },
      { label: 'For Compliance Buyers', href: '/penetration-testing/compliance-buyers' },
    ],
    viewAll: { label: 'View all Pentest →', href: '/penetration-testing' },
  },
    vendor: {
      overview: { label: 'Overview', href: '/vendor-risk-assessment' },
      primary: { label: 'Risk Triage', href: '/vendor-risk-assessment/triage', badge: 'Tool' },
      roi: { label: 'ROI Calculator', href: '/vendor-risk-assessment/roi-calculator', badge: 'Tool' },
      guides: [
      { label: 'Checklist', href: '/vendor-risk-assessment/checklist' },
      { label: 'Evidence by Tier', href: '/vendor-risk-assessment/evidence-by-tier' },
      { label: 'Contract Clauses', href: '/vendor-risk-assessment/contract-clauses' },
      { label: 'Monitoring Cadence', href: '/vendor-risk-assessment/monitoring-cadence' },
      { label: 'Questionnaire Template', href: '/vendor-risk-assessment/questionnaire' },
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
