import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'Startups',
  heroDescription: 'Estimate audit, tooling, and internal effort with lean scope assumptions. Built for early-stage teams moving quickly toward a first SOC 2.',
  assumptions: [
    'Small team with shared owners and faster decisions.',
    'Limited systems in scope; some logging/access gaps to close.',
    'Type I first; Type II once evidence is steady.',
  ],
  costRanges: [
    'Typical first-year range: ~$25k–$70k depending on scope and tooling choices.',
    'Recurring tooling (SSO/MFA, logging, vuln mgmt) often $8k–$25k/yr for small teams.',
  ],
  timelineBands: [
    'Readiness: 6–12 weeks if scope is tight and owners are responsive.',
    'Type I: 2–6 weeks once controls and evidence are ready.',
    'Type II: add 3–9 months of observation depending on maturity.',
  ],
  scope: [
    'Product and infra in one cloud (single region).',
    'Core SaaS stack: CI/CD, ticketing, source control, monitoring.',
    'Key vendors: cloud, auth/SSO, payments, email, analytics.',
  ],
  drivers: [
    'Scope clarity (systems/vendors) and evidence quality.',
    'Tooling maturity: logging/monitoring and access reviews.',
    'Type I vs Type II decision and observation length.',
    'Pentest scope and remediation needs.',
  ],
  auditorFocus: [
    'Access control and offboarding proof.',
    'Change management with approvals and testing evidence.',
    'Logging/monitoring coverage and alert handling.',
    'Vendor risk tracking for critical suppliers.',
  ],
  changeCost: [
    'Rushed timelines that add auditor hours and internal overtime.',
    'Late vendor additions expanding scope and sampling.',
    'Backfilling missing logs or access reviews.',
  ],
  scenarios: [
    {
      title: 'Seed-stage, single product',
      detail: 'Lean Type I, limited vendors, minimal evidence backfill. Lowest cost band if scope stays tight.',
    },
    {
      title: 'Series A with customer security asks',
      detail: 'Type I followed by planned Type II; add logging/monitoring and tighten access reviews to avoid rework.',
    },
    {
      title: 'Audit under a tight deal deadline',
      detail: 'Accelerated prep increases auditor and advisor hours; prioritize scope freeze and change control evidence.',
    },
  ],
    hubHref: '/soc-2/industries/startups',
    timelineHref: '/soc-2-timeline/startups',
    readinessHref: '/soc-2-readiness-checklist/saas',
    relatedLinks: [
      { href: '/soc-2-timeline/startups', label: 'Timeline for startups' },
      { href: '/soc-2-readiness-checklist/saas', label: 'Readiness for startups' },
    ],
  };

export const metadata: Metadata = {
  title: 'SOC 2 Cost for Startups | RiscLens',
  description: 'Lean SOC 2 budget guidance for startups: audit fees, tooling, and internal effort with realistic timelines and scope.',
  alternates: { canonical: 'https://risclens.com/soc-2-cost/startups' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/startups',
    title: 'SOC 2 Cost for Startups | RiscLens',
    description: 'Estimate SOC 2 spend for early-stage teams with lean scope, realistic timelines, and auditor expectations.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for Startups' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for Startups | RiscLens',
    description: 'Plan SOC 2 budgets and timelines for lean teams. Audit fees, tooling, and internal effort.',
    images: ['/og.png'],
  },
};

export default function Soc2CostStartupsPage() {
  return <CostIndustryPage {...content} />;
}
