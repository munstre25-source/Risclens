import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'SaaS',
  heroDescription: 'Estimate SOC 2 spend for SaaS teams managing multi-tenant scope, CI/CD velocity, and customer security demands.',
  assumptions: [
    'Multi-tenant architecture with shared infra and standard SSO/MFA.',
    'CI/CD pipeline in place; change evidence may need tightening.',
    'Customer-driven scope; Type I first unless enterprise buyers demand Type II.',
  ],
  costRanges: [
    'Typical SaaS first-year range: ~$35k–$95k including auditor fees, tooling, and internal time.',
    'Recurring tooling: logging/monitoring, access reviews, vuln management, SSO/IdP.',
  ],
  timelineBands: [
    'Readiness: 8–14 weeks depending on scope and evidence quality.',
    'Type I: 3–6 weeks once evidence is stable.',
    'Type II: add 3–12 months of observation with consistent change/access controls.',
  ],
  scope: [
    'App + API stack across cloud environments.',
    'CI/CD, ticketing, source control, observability, and feature flag systems.',
    'Critical vendors: cloud, auth/SSO, payments, messaging, data pipelines.',
  ],
  drivers: [
    'Deployment frequency and change control evidence.',
    'Tenant isolation and data flow documentation.',
    'Third-party integrations and vendor reviews.',
    'Customer-required criteria and reporting timelines.',
  ],
  auditorFocus: [
    'Change management approvals and testing artifacts per deploy cadence.',
    'Access reviews for shared services and admin roles.',
    'Logging/monitoring coverage for multi-tenant environments.',
    'Vendor risk management for critical integrations.',
  ],
  changeCost: [
    'High release velocity without change evidence backfill.',
    'Late-added vendors expanding sampling and walkthroughs.',
    'Jumping to Type II without steady observation-ready evidence.',
  ],
  scenarios: [
    {
      title: 'Single-product SaaS with stable pipeline',
      detail: 'Lean Type I scope, solid CI/CD evidence, smaller auditor effort and tooling uplift.',
    },
    {
      title: 'SaaS with heavy integrations',
      detail: 'Broader vendor reviews and data flow mapping increase evidence and testing hours.',
    },
    {
      title: 'Enterprise buyer demands Type II',
      detail: 'Longer observation window and stricter sampling raise both audit and internal effort.',
    },
  ],
  hubHref: '/soc-2/industries/saas',
  timelineHref: '/soc-2-timeline/saas',
  readinessHref: '/soc-2-readiness/saas',
  relatedLinks: [
    { href: '/soc-2-timeline/saas', label: 'Timeline for SaaS' },
    { href: '/soc-2-readiness/saas', label: 'Readiness for SaaS' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for SaaS | RiscLens',
  description: 'SOC 2 budget guidance for SaaS: auditor fees, tooling, and internal effort with multi-tenant scope and CI/CD considerations.',
  alternates: { canonical: '/soc-2-cost/saas' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/saas',
    title: 'SOC 2 Cost for SaaS | RiscLens',
    description: 'Estimate SOC 2 spend for SaaS teams balancing multi-tenant scope, CI/CD, and buyer expectations.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for SaaS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for SaaS | RiscLens',
    description: 'Plan SOC 2 budgets and timelines for SaaS with clear scope, evidence, and tooling.',
    images: ['/og.png'],
  },
};

export default function Soc2CostSaasPage() {
  return <CostIndustryPage {...content} />;
}
