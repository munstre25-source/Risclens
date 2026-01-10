import { industryCostLinks } from './industryCostLinks';

export const CTA = {
  href: '/soc-2-readiness-calculator',
  label: 'Get Readiness Score',
};

export const navConfig = {
  frameworks: {
    label: 'Frameworks',
    items: [
      { label: 'SOC 2 Suite', href: '/soc-2', description: 'Readiness, costs, and timelines' },
      { label: 'ISO 27001', href: '/soc-2-vs-iso-27001', description: 'Gap analysis and roadmap' },
      { label: 'ISO 42001 (AI)', href: '/ai-compliance', badge: 'New', description: 'AI Governance & Compliance' },
    ],
    guides: [
      { label: 'SOC 2 Cost Guide', href: '/soc-2-cost' },
      { label: 'SOC 2 Timeline', href: '/soc-2-timeline' },
      { label: 'Readiness Checklist', href: '/soc-2-readiness-checklist' },
    ]
  },
  tools: {
    label: 'Tools',
    primary: { label: 'Audit Delay Cost', href: '/soc-2-audit-delay-cost', badge: 'Tool' },
    items: [
      { label: 'Readiness Index', href: '/soc-2-readiness-index', badge: 'Tool' },
      { label: 'Compliance ROI', href: '/compliance-roi-calculator', badge: 'Tool' },
      { label: 'Timeline Estimator', href: '/soc-2-timeline/estimator', badge: 'Tool' },
      { label: 'VRA ROI Calculator', href: '/vendor-risk-assessment/roi-calculator', badge: 'Tool' },
    ]
  },
    directory: {
      label: 'Directory',
      href: '/auditor-directory',
      items: [
        { label: 'Compliance Directory', href: '/compliance/directory' },
        { label: 'Auditor Directory', href: '/auditor-directory' },
        { label: 'Auditor Bidding Portal', href: '/auditor-portal' },
      ]
    },

    resources: {
      label: 'Resources',
      about: { label: 'About RiscLens', href: '/about' },
      guides: [
        { label: 'Sales & Operations', href: '/soc-2-sales' },
        { label: 'Type I vs Type II', href: '/soc-2-type-i-vs-type-ii' },
        { label: 'All SOC 2 Guides', href: '/soc-2/guides' },
      ],
      comparisons: [
        { label: 'Vanta vs Drata', href: '/compare/vanta-vs-drata' },
        { label: 'Drata vs Secureframe', href: '/compare/drata-vs-secureframe' },
        { label: 'Thoropass vs Vanta', href: '/compare/thoropass-vs-vanta' },
      ],
      viewAll: { label: 'View 24+ Comparisons →', href: '/compare' },
    },

};

export const industriesNav = industryCostLinks.map(({ label, hubHref }) => ({
  label,
  href: hubHref,
}));

export const costIndustries = industryCostLinks;
