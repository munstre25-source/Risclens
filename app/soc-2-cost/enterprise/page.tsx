import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'Enterprise',
  heroDescription: 'SOC 2 budgets for large organizations with multiple products and teams. Balance scope control, sampling, and evidence at scale.',
  assumptions: [
    'Multiple environments/products; shared services across business units.',
    'Established controls but uneven evidence quality across teams.',
    'Type II commonly requested; coordination and sampling drive effort.',
  ],
  costRanges: [
    'Typical enterprise range: ~$60k–$150k based on scope size, sampling depth, and coordination.',
    'Tooling often includes SIEM, EDR, IAM/SSO, access review automation, vendor risk platforms.',
  ],
  timelineBands: [
    'Readiness: 10–18 weeks depending on alignment across teams.',
    'Type I: 4–8 weeks once evidence is harmonized.',
    'Type II: add 6–12 months observation; sampling across teams increases effort.',
  ],
  scope: [
    'Multiple apps/APIs across regions/environments.',
    'Centralized IAM/SSO, logging/monitoring, vulnerability management.',
    'Vendor and subprocessors catalog across business units.',
  ],
  drivers: [
    'Scope harmonization and sampling across teams and regions.',
    'Quality and consistency of change/access evidence.',
    'Vendor/contract reviews and data residency considerations.',
    'Observation window planning across multiple releases.',
  ],
  auditorFocus: [
    'Segregation of duties and approvals across squads.',
    'Consistent access reviews and offboarding across business units.',
    'Logging/monitoring coverage and alert response SLAs.',
    'Vendor risk management and data residency controls.',
  ],
  changeCost: [
    'Scope creep from late-added systems or teams.',
    'Inconsistent evidence formats requiring rework.',
    'Vendor lists and contracts not aligned with actual data flows.',
  ],
  scenarios: [
    {
      title: 'Multi-product platform with shared services',
      detail: 'Sampling and coordination across products increase auditor time; expect mid-to-upper range budgets.',
    },
    {
      title: 'Enterprise sales-driven Type II',
      detail: 'Longer observation with heavier sampling; requires tight evidence governance and higher audit effort.',
    },
    {
      title: 'M&A integration year',
      detail: 'Scope volatility and system migrations add rework and extended readiness; cost rises with change management.',
    },
  ],
  hubHref: '/soc-2/industries/enterprise',
  timelineHref: '/soc-2-timeline',
  readinessHref: '/soc-2-readiness/enterprise-sales',
  relatedLinks: [
    { href: '/soc-2-timeline', label: 'SOC 2 timeline (overview)' },
    { href: '/soc-2-readiness/enterprise-sales', label: 'Readiness for enterprise sales' },
    { href: '/soc-2-cost', label: 'Cost overview' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for Enterprise | RiscLens',
  description: 'Enterprise SOC 2 budgets: multi-team scope, sampling, vendor oversight, and observation planning with realistic timelines.',
  alternates: { canonical: '/soc-2-cost/enterprise' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/enterprise',
    title: 'SOC 2 Cost for Enterprise | RiscLens',
    description: 'Estimate SOC 2 spend for large organizations with multiple products and teams. Control scope, sampling, and timelines.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for Enterprise' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for Enterprise | RiscLens',
    description: 'Plan SOC 2 budgets for multi-team enterprises: scope, sampling, vendor risk, and observation windows.',
    images: ['/og.png'],
  },
};

export default function Soc2CostEnterprisePage() {
  return <CostIndustryPage {...content} />;
}
