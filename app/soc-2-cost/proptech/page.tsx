import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'PropTech',
  heroDescription: 'Estimate SOC 2 spend for property technology companies managing tenant PII, payments, and property management data.',
  assumptions: [
    'Tenant and landlord PII in scope; strong access controls and encryption expected.',
    'Payment integrations for rent collection and vendor disbursements.',
    'Third-party integrations with property management systems and listing services.',
  ],
  costRanges: [
    'Typical PropTech first-year range: ~$40k–$100k depending on data sensitivity and integration complexity.',
    'Recurring tooling: access management, encryption, logging/monitoring, vendor risk tracking.',
  ],
  timelineBands: [
    'Readiness: 10–14 weeks if scope is defined and evidence collection is underway.',
    'Type I: 3–6 weeks once evidence is stable and access controls are documented.',
    'Type II: add 3–12 months observation with consistent logging and access reviews.',
  ],
  scope: [
    'Property management platforms, tenant portals, and landlord dashboards.',
    'Payment processors for rent collection and maintenance disbursements.',
    'Integration APIs with listing services, background check providers, and maintenance vendors.',
  ],
  drivers: [
    'Volume and sensitivity of tenant PII (SSN, financial data, lease history).',
    'Payment flow complexity and third-party processor integrations.',
    'Multi-tenant architecture isolation requirements.',
    'Vendor ecosystem size for property services.',
  ],
  auditorFocus: [
    'Tenant data encryption at rest and in transit.',
    'Access controls and RBAC for property managers vs tenants.',
    'Payment processing security and PCI-adjacent controls.',
    'Background check data handling and retention policies.',
  ],
  changeCost: [
    'Adding new property management integrations mid-audit.',
    'Expanding payment processor scope after initial scoping.',
    'Late discovery of legacy tenant data stores.',
  ],
  scenarios: [
    {
      title: 'Multi-family property management SaaS',
      detail: 'High tenant volume with payment processing drives need for robust access controls and monitoring.',
    },
    {
      title: 'Commercial real estate platform',
      detail: 'Fewer but larger transactions; focus on lease data integrity and vendor contract reviews.',
    },
    {
      title: 'Short-term rental management',
      detail: 'Integration-heavy with booking platforms; API security and data flow documentation critical.',
    },
  ],
  hubHref: '/soc-2/industries/proptech',
  timelineHref: '/soc-2-timeline',
  readinessHref: '/soc-2-readiness-checklist',
  relatedLinks: [
    { href: '/soc-2-cost/saas', label: 'Cost for SaaS' },
    { href: '/soc-2-cost/fintech', label: 'Cost for Fintech' },
    { href: '/soc-2-cost/payments', label: 'Cost for Payments' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for PropTech | RiscLens',
  description: 'SOC 2 budget guidance for PropTech: tenant data handling, payment integrations, and property management compliance costs.',
  alternates: { canonical: '/soc-2-cost/proptech' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/proptech',
    title: 'SOC 2 Cost for PropTech | RiscLens',
    description: 'Estimate SOC 2 spend for property technology companies with realistic timelines and budgets.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for PropTech' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for PropTech | RiscLens',
    description: 'Plan SOC 2 budgets for PropTech: auditor fees, tooling, and compliance effort.',
    images: ['/og.png'],
  },
};

export default function Soc2CostProptechPage() {
  return <CostIndustryPage {...content} />;
}
