import { industryCostLinks } from './industryCostLinks';

export const CTA = {
  href: '/soc-2-readiness-calculator',
  label: 'Get Readiness Score',
};

export const navConfig = {
  soc: {
    overview: { label: 'SOC 2 Overview', href: '/soc-2' },
      primary: { label: 'Readiness Score', href: CTA.href, badge: 'Tool' },
      tools: [
        { label: 'Cost Calculator', href: '/compliance-roi-calculator', badge: 'Tool' },
        { label: 'Timeline Estimator', href: '/soc-2-timeline/estimator', badge: 'Tool' },
        { label: 'SOC 2 vs ISO Gap', href: '/soc-2-vs-iso-27001', badge: 'Tool' },
      ],
    guides: [
      { label: 'SOC 2 Cost Guide', href: '/soc-2-cost' },
      { label: 'SOC 2 Timeline', href: '/soc-2-timeline' },
      { label: 'Sales & Operations', href: '/soc-2-sales' },
      { label: 'Type I vs Type II', href: '/soc-2-type-i-vs-type-ii' },
      { label: 'Readiness Checklist', href: '/soc-2-readiness-checklist' },
    ],
    industries: [
      { label: 'SaaS', href: '/soc-2/industries/saas' },
      { label: 'Fintech', href: '/soc-2-cost/fintech' },
      { label: 'Healthcare', href: '/soc-2-cost/healthcare' },
      { label: 'Startups', href: '/soc-2-cost/startups' },
    ],
    viewAll: { label: 'View all SOC 2 →', href: '/soc-2/guides' },
  },
  pentest: {
    overview: { label: 'Pentest Overview', href: '/penetration-testing' },
    primary: { label: 'Cost Estimator', href: '/penetration-testing/cost-estimator', badge: 'Tool' },
    tools: [
      { label: 'Scoping Worksheet', href: '/penetration-testing/scoping', badge: 'Tool' },
      { label: 'SOW Builder', href: '/penetration-testing/sow', badge: 'Tool' },
    ],
    guides: [
      { label: 'Pentest Pricing', href: '/penetration-testing/pricing' },
      { label: 'Web App vs Network', href: '/penetration-testing/web-app-vs-network' },
      { label: 'Pentest vs Scan', href: '/penetration-testing/vs-vulnerability-scan' },
      { label: 'For SOC 2', href: '/penetration-testing/for-soc-2' },
    ],
    viewAll: { label: 'View all Pentest →', href: '/penetration-testing' },
  },
  vendor: {
    overview: { label: 'Vendor Risk Overview', href: '/vendor-risk-assessment' },
    primary: { label: 'Risk Triage', href: '/vendor-risk-assessment/triage', badge: 'Tool' },
    tools: [
      { label: 'Vendor Tiering', href: '/vendor-risk-assessment/tiering', badge: 'Tool' },
      { label: 'ROI Calculator', href: '/vendor-risk-assessment/roi-calculator', badge: 'Tool' },
      { label: 'VRA Questionnaire', href: '/vendor-risk-assessment/questionnaire', badge: 'Tool' },
    ],
    guides: [
      { label: 'Checklist', href: '/vendor-risk-assessment/checklist' },
      { label: 'Auto vs Manual', href: '/vendor-risk-assessment/automation-vs-manual' },
      { label: 'SOC 2 Requirements', href: '/vendor-risk-assessment/soc-2-compliance-requirements' },
    ],
    industries: [
      { label: 'Healthcare', href: '/vendor-risk-assessment/industries/healthcare' },
      { label: 'Fintech', href: '/vendor-risk-assessment/industries/fintech' },
      { label: 'SaaS', href: '/vendor-risk-assessment/industries/saas' },
    ],
    viewAll: { label: 'View all Vendor Risk →', href: '/vendor-risk-assessment' },
  },
  resources: {
    about: { label: 'About RiscLens', href: '/about' },
    guides: [
      { label: 'All SOC 2 Guides', href: '/soc-2/guides' },
      { label: 'SOC 2 Cost Breakdown', href: '/soc-2-cost-breakdown' },
      { label: 'SOC 2 vs ISO 27001', href: '/soc-2-vs-iso-27001' },
    ],
    comparisons: [
      { label: 'Vanta vs Drata', href: '/compare/vanta-vs-drata' },
      { label: 'Drata vs Secureframe', href: '/compare/drata-vs-secureframe' },
      { label: 'Thoropass vs Vanta', href: '/compare/thoropass-vs-vanta' },
    ],
      viewAll: { label: 'View all comparisons →', href: '/compare' },
  },
};

export const industriesNav = industryCostLinks.map(({ label, hubHref }) => ({
  label,
  href: hubHref,
}));

export const costIndustries = industryCostLinks;
