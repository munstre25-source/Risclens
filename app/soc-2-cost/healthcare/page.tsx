import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'Healthcare',
  heroDescription: 'SOC 2 budgets for healthcare and healthtech handling PHI/PII. Account for stricter logging, vendor controls, and evidence.',
  assumptions: [
    'PHI/PII in scope with HIPAA-aligned controls expected.',
    'Heightened logging/monitoring and incident response evidence.',
    'BAAs and vendor due diligence included in scope.',
  ],
  costRanges: [
    'Typical healthcare range: ~$50k–$130k depending on PHI flows and vendor complexity.',
    'Tooling: SIEM/logging, EDR, vulnerability management, incident response and vendor risk tracking.',
  ],
  timelineBands: [
    'Readiness: 10–16 weeks; longer if logging/IR gaps exist.',
    'Type I: 4–8 weeks once evidence and BAAs are in place.',
    'Type II: add 4–12 months observation with tighter sampling on PHI systems.',
  ],
  scope: [
    'EHR integrations, patient portals, data lakes/analytics with PHI.',
    'Identity/SSO, logging/SIEM, monitoring/alerting, ticketing, CI/CD.',
    'Vendors with BAAs and subprocessors handling PHI.',
  ],
  drivers: [
    'PHI data flows and storage/retention requirements.',
    'Logging/monitoring depth and alert response documentation.',
    'Vendor/BAA coverage and review cadence.',
    'Pentest/remediation for clinical or patient-facing apps.',
  ],
  auditorFocus: [
    'Access control and offboarding for PHI systems.',
    'Logging/monitoring with alert triage and IR runbooks.',
    'Vendor risk management with BAAs and evidence of reviews.',
    'Data retention/disposal and encryption in transit/at rest.',
  ],
  changeCost: [
    'Missing logging on PHI systems requiring backfill or tooling uplift.',
    'Delayed BAAs or vendor inventories.',
    'Observation window extensions from inconsistent access reviews.',
  ],
  scenarios: [
    {
      title: 'Telehealth platform',
      detail: 'Multiple patient-facing apps and vendors; logging/IR depth and vendor reviews push cost toward upper range.',
    },
    {
      title: 'Analytics on de-identified data with some PHI',
      detail: 'Scoped PHI environments and vendor contracts; mid-range cost if logging and access are controlled.',
    },
    {
      title: 'Clinical integrations with hospital partners',
      detail: 'Stricter evidence expectations and contract reviews; higher audit and advisory time.',
    },
  ],
    hubHref: '/soc-2/industries/healthcare',
    timelineHref: '/soc-2-timeline',
    readinessHref: '/soc-2-readiness-checklist/healthcare',
    relatedLinks: [
      { href: '/soc-2-timeline', label: 'SOC 2 timeline (overview)' },
      { href: '/soc-2-cost', label: 'Cost overview' },
      { href: '/soc-2-readiness-checklist/healthcare', label: 'Readiness for Healthcare teams' },
    ],
  };

export const metadata: Metadata = {
  title: 'SOC 2 Cost for Healthcare | RiscLens',
  description: 'SOC 2 budget guidance for healthcare and healthtech teams handling PHI: logging, vendor BAAs, pentests, and timelines.',
  alternates: { canonical: '/soc-2-cost/healthcare' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/healthcare',
    title: 'SOC 2 Cost for Healthcare | RiscLens',
    description: 'Estimate SOC 2 spend for healthtech with PHI: tooling, vendors, and observation windows.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for Healthcare' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for Healthcare | RiscLens',
    description: 'Plan SOC 2 budgets for healthcare with PHI/PII, BAAs, and stricter logging.',
    images: ['/og.png'],
  },
};

export default function Soc2CostHealthcarePage() {
  return <CostIndustryPage {...content} />;
}
