import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'Payments',
  heroDescription: 'Estimate SOC 2 cost for payments teams handling cardholder data flows, payouts, and bank/vendor diligence.',
  assumptions: [
    'Payment data or cardholder-related PII in scope; PCI alignment considered even if SOC 2-focused.',
    'Pentest and remediation planned before audit start; evidence ready for walkthroughs.',
    'Vendor contracts (processors, gateways, fraud tools) documented with security addenda.',
  ],
  costRanges: [
    'Typical first-year range: ~$45k–$120k depending on PCI overlap, processors, and remediation.',
    'Tooling: logging/SIEM, fraud monitoring, vulnerability scanning, EDR, and ticketing.',
  ],
  timelineBands: [
    'Readiness: 10–16 weeks if payment flows, contracts, and evidence are mapped.',
    'Type I: 4–8 weeks once pentest remediation and access reviews are complete.',
    'Type II: add 6–12 months observation with tighter sampling around payment systems.',
  ],
  scope: [
    'Payment processing flows, card/token handling, payout systems, and data stores.',
    'Access control and segregation of duties for finance/engineering/support.',
    'Logging/monitoring, fraud signals, and incident response processes.',
  ],
  drivers: [
    'PCI-related controls layered onto SOC 2 scope.',
    'Number of processors/gateways and contract/security review expectations.',
    'Pentest depth (apps/APIs) and retest cycles.',
    'Vendor risk evidence for banks, payment partners, and fraud tools.',
  ],
  auditorFocus: [
    'Logging and alerting for payment flows with response playbooks.',
    'Segregation of duties between finance, engineering, and support.',
    'Evidence of vendor due diligence, DPAs, and contract clauses.',
    'Pentest results, remediation tracking, and retest evidence.',
  ],
  changeCost: [
    'New payment partners added mid-audit requiring fresh vendor reviews.',
    'Delayed pentest remediation or missing retest evidence.',
    'Gaps in transaction logging or alert response documentation.',
  ],
  scenarios: [
    { title: 'Gateway-only integration', detail: 'Lean surface area; lower range if logging and contracts are strong.' },
    { title: 'Full-stack processor', detail: 'Broader systems, more vendors, and PCI overlap push budget to mid/upper range.' },
    { title: 'Marketplace payouts', detail: 'Multi-party payouts and fraud tooling add vendor reviews and sampling depth.' },
  ],
  hubHref: '/soc-2/industries/payments',
  timelineHref: '/soc-2-timeline/fintech',
  readinessHref: '/soc-2-readiness-calculator',
  relatedLinks: [
    { href: '/soc-2/industries/payments', label: 'Industry guide: Payments' },
    { href: '/soc-2-timeline/fintech', label: 'Timeline for fintech/payments' },
    { href: '/vendor-risk-assessment/contract-clauses', label: 'Vendor clauses for critical suppliers' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for Payments | RiscLens',
  description: 'SOC 2 budget guidance for payments: PCI-adjacent controls, vendor diligence, pentest remediation, and fraud/alerting coverage.',
  alternates: { canonical: 'https://risclens.com/soc-2-cost/payments' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/payments',
    title: 'SOC 2 Cost for Payments | RiscLens',
    description: 'Estimate SOC 2 cost for payments teams handling cardholder flows, payouts, and bank/vendor reviews.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for Payments' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for Payments | RiscLens',
    description: 'Plan SOC 2 budgets for payments: PCI overlap, vendor clauses, pentest and logging expectations.',
    images: ['/og.png'],
  },
};

export default function Soc2CostPaymentsPage() {
  return <CostIndustryPage {...content} />;
}
