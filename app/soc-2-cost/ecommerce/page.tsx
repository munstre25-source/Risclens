import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'E-commerce',
  heroDescription: 'SOC 2 cost guidance for e-commerce platforms handling payments, customer data, and third-party logistics integrations.',
  assumptions: [
    'Cardholder or customer data in scope; payment processors integrated.',
    'Multiple third-party apps (marketing, support, fulfillment) touching data.',
    'Type I to start; Type II when evidence cadence stabilizes.',
  ],
  costRanges: [
    'Typical e-commerce range: ~$35k–$90k depending on payment scope and vendor complexity.',
    'Tooling: logging/monitoring, access reviews, vulnerability scanning, vendor management.',
  ],
  timelineBands: [
    'Readiness: 8–14 weeks if scope is defined and vendors are cataloged.',
    'Type I: 3–6 weeks once payment and data flows are evidenced.',
    'Type II: add 3–9 months observation with payment/PII sampling.',
  ],
  scope: [
    'Web/app storefronts, payment processors, customer data stores, support systems.',
    'CI/CD, ticketing, source control, monitoring/alerting.',
    'Vendors for marketing automation, fulfillment, analytics, messaging.',
  ],
  drivers: [
    'Payment and PII data flows and storage locations.',
    'Number of vendors touching customer data.',
    'Logging/monitoring quality on customer-facing systems.',
    'Change control and rollback evidence for frequent releases.',
  ],
  auditorFocus: [
    'Access control for payment/PII systems and support tools.',
    'Change management with testing for customer-facing updates.',
    'Logging/monitoring with alert response for fraud/abuse signals.',
    'Vendor reviews (DPAs/BAAs where applicable).',
  ],
  changeCost: [
    'Late vendor additions requiring extra reviews.',
    'Sparse logging on payment/customer systems.',
    'High release velocity without change evidence.',
  ],
  scenarios: [
    {
      title: 'Direct-to-consumer storefront',
      detail: 'Moderate vendor list; cost depends on logging depth and payment scope.',
    },
    {
      title: 'Marketplace-style catalog with many partners',
      detail: 'Broader vendor reviews and data flows push evidence and auditor time higher.',
    },
    {
      title: 'Frequent marketing releases',
      detail: 'High change volume needs strong approvals/testing to avoid rework and schedule slips.',
    },
  ],
  hubHref: '/soc-2/industries/ecommerce',
  timelineHref: '/soc-2-timeline',
  readinessHref: '/soc-2-readiness/saas',
  relatedLinks: [
    { href: '/soc-2-timeline', label: 'SOC 2 timeline (overview)' },
    { href: '/soc-2-readiness/saas', label: 'Readiness for SaaS teams' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for E-commerce | RiscLens',
  description: 'SOC 2 budget guidance for e-commerce: payments, customer data, vendor integrations, and realistic timelines.',
  alternates: { canonical: 'https://risclens.com/soc-2-cost/ecommerce' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/ecommerce',
    title: 'SOC 2 Cost for E-commerce | RiscLens',
    description: 'Estimate SOC 2 spend for e-commerce platforms handling payments and customer data.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for E-commerce' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for E-commerce | RiscLens',
    description: 'Plan SOC 2 budgets for e-commerce with payment scope, vendors, and frequent releases.',
    images: ['/og.png'],
  },
};

export default function Soc2CostEcommercePage() {
  return <CostIndustryPage {...content} />;
}
