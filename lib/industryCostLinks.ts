export type IndustryCostLink = {
  slug: string;
  label: string;
  blurb: string;
  costHref: string;
  hubHref: string;
};

export const industryCostLinks: IndustryCostLink[] = [
  { slug: 'startups', label: 'Startups', blurb: 'Lean scope, faster Type I first.', costHref: '/soc-2-cost/startups', hubHref: '/soc-2/industries/startups' },
  { slug: 'saas', label: 'SaaS', blurb: 'Multi-tenant scope and CI/CD pace.', costHref: '/soc-2-cost/saas', hubHref: '/soc-2/industries/saas' },
  { slug: 'fintech', label: 'Fintech', blurb: 'Payments/PII, vendor risk, pentests.', costHref: '/soc-2-cost/fintech', hubHref: '/soc-2/industries/fintech' },
  { slug: 'enterprise', label: 'Enterprise', blurb: 'Multi-team sampling and governance.', costHref: '/soc-2-cost/enterprise', hubHref: '/soc-2/industries/enterprise' },
  { slug: 'healthcare', label: 'Healthcare', blurb: 'PHI logging, BAAs, IR rigor.', costHref: '/soc-2-cost/healthcare', hubHref: '/soc-2/industries/healthcare' },
  { slug: 'ecommerce', label: 'E-commerce', blurb: 'Payments, customer data, vendors.', costHref: '/soc-2-cost/ecommerce', hubHref: '/soc-2/industries/ecommerce' },
  { slug: 'marketplaces', label: 'Marketplaces', blurb: 'Partners, payouts, fraud monitoring.', costHref: '/soc-2-cost/marketplaces', hubHref: '/soc-2/industries/marketplaces' },
  { slug: 'ai-data', label: 'AI/Data', blurb: 'Pipelines, model change, data lineage.', costHref: '/soc-2-cost/ai-data', hubHref: '/soc-2/industries/ai-data' },
  { slug: 'b2b-saas', label: 'B2B SaaS', blurb: 'Admin RBAC, SSO/SCIM, tenant isolation.', costHref: '/soc-2-cost/b2b-saas', hubHref: '/soc-2/industries/b2b-saas' },
  { slug: 'cloud-infrastructure', label: 'Cloud Infrastructure', blurb: 'Platform/IaaS controls, shared responsibility.', costHref: '/soc-2-cost/cloud-infrastructure', hubHref: '/soc-2/industries/cloud-infrastructure' },
  { slug: 'devtools', label: 'DevTools', blurb: 'SDLC telemetry, secrets, supply chain.', costHref: '/soc-2-cost/devtools', hubHref: '/soc-2/industries/devtools' },
  { slug: 'edtech', label: 'EdTech', blurb: 'Student data, parent consent, access reviews.', costHref: '/soc-2-cost/edtech', hubHref: '/soc-2/industries/edtech' },
  { slug: 'payments', label: 'Payments', blurb: 'Cardholder data flows, vendor risk, uptime.', costHref: '/soc-2-cost/payments', hubHref: '/soc-2/industries/payments' },
];
