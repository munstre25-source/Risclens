import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'Marketplaces',
  heroDescription: 'SOC 2 budgets for marketplaces coordinating buyers, sellers, payments, and multi-tenant data flows.',
  assumptions: [
    'Multi-tenant platform with partner/vendor integrations.',
    'Payment/PII flows across multiple parties; vendor oversight required.',
    'Type I first; Type II once evidence cadence is repeatable.',
  ],
  costRanges: [
    'Typical marketplace range: ~$40k–$100k depending on vendor complexity and payment scope.',
    'Tooling: logging/monitoring, access review automation, vendor risk tracking, vulnerability scanning.',
  ],
  timelineBands: [
    'Readiness: 8–14 weeks if vendor lists and data flows are defined.',
    'Type I: 3–6 weeks once evidence is stable.',
    'Type II: add 3–9 months observation with sampling across partners.',
  ],
  scope: [
    'Marketplace core app/API, payment processors, messaging/support systems.',
    'CI/CD, ticketing, source control, observability, fraud/abuse monitoring.',
    'Vendors supporting payouts, identity verification, analytics, communications.',
  ],
  drivers: [
    'Number of partners/vendors and data they touch.',
    'Logging/monitoring coverage for multi-tenant activity and fraud.',
    'Change control for frequent feature updates.',
    'Contractual requirements from key partners.',
  ],
  auditorFocus: [
    'Access and segregation for buyer/seller data.',
    'Change approvals and testing for rapid feature cycles.',
    'Vendor risk and subprocessors with data access.',
    'Monitoring/fraud controls and incident handling.',
  ],
  changeCost: [
    'Late vendor onboarding requiring extra reviews and contracts.',
    'Weak monitoring leading to evidence backfill.',
    'Frequent changes without approvals/testing artifacts.',
  ],
  scenarios: [
    {
      title: 'Niche B2B marketplace',
      detail: 'Moderate vendor set; cost hinges on clean data flows and monitoring quality.',
    },
    {
      title: 'High-volume consumer marketplace',
      detail: 'Broader fraud/abuse monitoring and vendor oversight; pushes evidence and audit time higher.',
    },
    {
      title: 'Marketplace adding new payment partners',
      detail: 'New integrations late in scope increase walkthroughs and sampling, raising cost.',
    },
  ],
  hubHref: '/soc-2/industries/marketplaces',
  timelineHref: '/soc-2-timeline',
  readinessHref: '/soc-2-readiness/saas',
  relatedLinks: [
    { href: '/soc-2-timeline', label: 'SOC 2 timeline (overview)' },
    { href: '/soc-2-readiness/saas', label: 'Readiness for SaaS teams' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for Marketplaces | RiscLens',
  description: 'SOC 2 budget guidance for marketplaces: vendor oversight, fraud monitoring, payment scope, and timelines.',
  alternates: { canonical: 'https://risclens.com/soc-2-cost/marketplaces' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/marketplaces',
    title: 'SOC 2 Cost for Marketplaces | RiscLens',
    description: 'Estimate SOC 2 spend for marketplaces coordinating buyers, sellers, and vendors.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for Marketplaces' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for Marketplaces | RiscLens',
    description: 'Plan SOC 2 budgets for marketplaces with vendor oversight and multi-tenant data.',
    images: ['/og.png'],
  },
};

export default function Soc2CostMarketplacesPage() {
  return <CostIndustryPage {...content} />;
}
