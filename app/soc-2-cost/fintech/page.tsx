import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'Fintech',
  heroDescription: 'Estimate SOC 2 spend when handling payments, PII, and regulated data. Build budgets that align with bank/finserv expectations.',
  assumptions: [
    'Payment flows or sensitive PII in scope; stronger logging and monitoring expected.',
    'Vendor risk and contractual controls (DPAs, subprocessors) must be documented.',
    'Pentest and remediation often required before audit start.',
  ],
  costRanges: [
    'Typical fintech first-year range: ~$45k–$120k driven by scope depth and control maturity.',
    'Recurring tooling: logging/SIEM, alerting/IR, vulnerability management, vendor risk tracking.',
  ],
  timelineBands: [
    'Readiness: 10–16 weeks if scope is defined and evidence is maturing.',
    'Type I: 3–8 weeks once evidence is stable and pentest remediation is closed.',
    'Type II: add 4–12 months observation with tighter sampling for regulated data.',
  ],
  scope: [
    'Payment processors, core banking integrations, and data pipelines.',
    'Logging/monitoring, alerting, ticketing, CI/CD, source control.',
    'Third-party risk program for critical vendors and subprocessors.',
  ],
  drivers: [
    'Data classification and storage/processing flows (PCI/PII).',
    'Vendor and contract reviews for critical suppliers.',
    'Pentest scope, remediation, and retests.',
    'Observation window expectations from banks/partners.',
  ],
  auditorFocus: [
    'Logging/monitoring coverage for payment and PII systems with alert response.',
    'Change control and segregation of duties in CI/CD.',
    'Vendor risk management with evidence of reviews and contracts.',
    'Incident response readiness and evidence of exercises.',
  ],
  changeCost: [
    'Adding payment partners late in scope, triggering more walkthroughs.',
    'Remediating pentest findings during audit prep (retakes, revalidation).',
    'Observation window extensions due to inconsistent evidence.',
  ],
  scenarios: [
    {
      title: 'API-first fintech platform',
      detail: 'Broad vendor set and payment data flows increase evidence and pentest depth; budget in upper mid-range.',
    },
    {
      title: 'Card-processing startup working with banks',
      detail: 'Bank due diligence adds contract/vendor reviews and longer observation; higher audit and advisory time.',
    },
    {
      title: 'Data enrichment fintech with limited payments',
      detail: 'Lean payment scope but heavy PII handling; logging/monitoring quality drives audit effort.',
    },
  ],
    hubHref: '/soc-2/industries/fintech',
    timelineHref: '/soc-2-timeline/fintech',
    readinessHref: '/soc-2-readiness-checklist/fintech',
    relatedLinks: [
      { href: '/soc-2-timeline/fintech', label: 'Timeline for fintech' },
      { href: '/soc-2-readiness-checklist/fintech', label: 'Readiness for fintech' },
      { href: '/penetration-testing/for-soc-2', label: 'Pentest expectations for SOC 2' },
    ],
  };

export const metadata: Metadata = {
  title: 'SOC 2 Cost for Fintech | RiscLens',
  description: 'SOC 2 budget guidance for fintech: payments/PII scope, vendor risk, pentest remediation, and observation timelines.',
  alternates: { canonical: '/soc-2-cost/fintech' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/fintech',
    title: 'SOC 2 Cost for Fintech | RiscLens',
    description: 'Estimate SOC 2 spend for fintech teams handling payments and regulated data with realistic timelines.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for Fintech' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for Fintech | RiscLens',
    description: 'Plan SOC 2 budgets for fintech: auditor fees, tooling, pentests, and vendor risk effort.',
    images: ['/og.png'],
  },
};

export default function Soc2CostFintechPage() {
  return <CostIndustryPage {...content} />;
}
