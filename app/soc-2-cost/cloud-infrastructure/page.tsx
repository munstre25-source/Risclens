import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'Cloud Infrastructure',
  heroDescription: 'Estimate SOC 2 cost for platforms, IaaS/PaaS providers, and infrastructure-heavy products with shared services.',
  assumptions: [
    'Shared control planes and multi-tenant infrastructure with clear boundary controls.',
    'Backups, DR, and availability zones defined with evidence of testing.',
    'Runbooks and on-call processes documented for incidents and customer impact.',
  ],
  costRanges: [
    'Typical first-year range: ~$40k–$110k depending on platform breadth and evidence maturity.',
    'Tooling: logging/metrics, vulnerability management, EDR, and ticketing sized by host/service count.',
  ],
  timelineBands: [
    'Readiness: 10–16 weeks if inventories, tagging, and runbooks are in place.',
    'Type I: 4–8 weeks once shared services and tenant controls are evidenced.',
    'Type II: add 6–12 months observation with sampling across key services and regions.',
  ],
  scope: [
    'Control plane, shared services, customer workloads boundaries, backups/DR.',
    'Identity and access for operators, least-privilege roles, break-glass patterns.',
    'Logging/monitoring, alerting, incident response, and change management flows.',
  ],
  drivers: [
    'Clarity of shared responsibility and how customer isolation is enforced.',
    'Depth of observability (logs/metrics/traces) with alert routing and response.',
    'Frequency of infrastructure changes and region/service expansion during audit.',
    'Vendor and subprocessors supporting the platform (e.g., DNS, auth, payments).',
  ],
  auditorFocus: [
    'Access controls to production and customer environments with approvals and reviews.',
    'Backup/restore evidence, DR testing, and resilience patterns.',
    'Change windows, infrastructure-as-code reviews, and separation of duties.',
    'Incident response readiness and communication to customers.',
  ],
  changeCost: [
    'Late changes to network boundaries or tenancy models that require re-walkthroughs.',
    'Incomplete logging/monitoring coverage across shared services.',
    'DR/backup testing gaps that need remediation before Type I sign-off.',
  ],
  scenarios: [
    { title: 'Single-region platform', detail: 'Lean scope with focused services; lower range if logging and access reviews are strong.' },
    { title: 'Multi-region rollout', detail: 'Cross-region replication and DR testing expand sampling; budget mid-to-upper range.' },
    { title: 'Platform with customer-managed components', detail: 'Shared responsibility clarity and support processes increase walkthrough depth.' },
  ],
  hubHref: '/soc-2/industries/cloud-infrastructure',
  timelineHref: '/soc-2-timeline',
  readinessHref: '/soc-2-readiness-calculator',
  relatedLinks: [
    { href: '/soc-2/industries/cloud-infrastructure', label: 'Industry guide: Cloud Infrastructure' },
    { href: '/soc-2-timeline', label: 'SOC 2 timeline (overview)' },
    { href: '/soc-2-evidence/logging-monitoring', label: 'Logging & monitoring evidence' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for Cloud Infrastructure | RiscLens',
  description: 'SOC 2 budget guidance for cloud infrastructure and platform teams: tenancy controls, DR, logging, and operator access.',
  alternates: { canonical: '/soc-2-cost/cloud-infrastructure' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/cloud-infrastructure',
    title: 'SOC 2 Cost for Cloud Infrastructure | RiscLens',
    description: 'Estimate SOC 2 cost for platforms and IaaS/PaaS providers with shared services and tenant controls.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for Cloud Infrastructure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for Cloud Infrastructure | RiscLens',
    description: 'Plan SOC 2 budgets for cloud infrastructure providers: tenancy, DR, logging, and on-call evidence.',
    images: ['/og.png'],
  },
};

export default function Soc2CostCloudInfrastructurePage() {
  return <CostIndustryPage {...content} />;
}
