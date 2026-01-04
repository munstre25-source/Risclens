import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'DevTools',
  heroDescription: 'Estimate SOC 2 cost for developer tooling: CI/CD integrations, secrets management, and supply chain trust.',
  assumptions: [
    'Product integrates with source control, CI/CD, or package registries; clear permission scopes.',
    'Secrets handling and dependency security are documented with monitoring in place.',
    'Support access to customer orgs is controlled and logged.',
  ],
  costRanges: [
    'Typical first-year range: ~$30k–$85k depending on integration depth and access model.',
    'Tooling: logging for integrations, EDR for build hosts, SCA/vulnerability scanning.',
  ],
  timelineBands: [
    'Readiness: 8–12 weeks if integration scopes and support access are mapped.',
    'Type I: 3–6 weeks once evidence for access reviews and change control is stable.',
    'Type II: add 4–9 months observation with sampling across key integrations.',
  ],
  scope: [
    'Source control/CI/CD connections, tokens, and scopes.',
    'Secrets handling, package signing/verifications, and build artifact integrity.',
    'Support access pathways to customer environments or org configs.',
  ],
  drivers: [
    'Breadth of integrations and permissions granted to the tool.',
    'Secrets storage/rotation maturity and incident playbooks.',
    'Change management for plugins, agents, and build steps.',
    'Volume of customer support access requests and reviews.',
  ],
  auditorFocus: [
    'Access to customer repos/pipelines with approvals and logging.',
    'Supply chain controls (SCA, signing, dependency policies).',
    'Secrets lifecycle management and rotation evidence.',
    'Change history for agents/plugins and rollback options.',
  ],
  changeCost: [
    'Expanding integration scopes late, triggering new walkthroughs.',
    'Weak logging around support access that needs uplift.',
    'Unclear secrets ownership causing remediation before Type I.',
  ],
  scenarios: [
    { title: 'Pipeline add-on with limited scopes', detail: 'Narrow scopes and strong logging keep cost/timeline lower.' },
    { title: 'Agent-based product with deep repo access', detail: 'Higher scrutiny on secrets and access reviews; budget mid-to-upper range.' },
    { title: 'Marketplace app across multiple CI/CDs', detail: 'Multiple integrations expand sampling and evidence collection.' },
  ],
  hubHref: '/soc-2/industries/devtools',
  timelineHref: '/soc-2-timeline',
  readinessHref: '/soc-2-readiness-calculator',
  relatedLinks: [
    { href: '/soc-2/industries/devtools', label: 'Industry guide: DevTools' },
    { href: '/soc-2-readiness/secure-sdlc', label: 'Secure SDLC readiness' },
    { href: '/soc-2-timeline', label: 'SOC 2 timeline (overview)' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for DevTools | RiscLens',
  description: 'SOC 2 budget guidance for developer tooling: CI/CD integrations, secrets, and software supply chain expectations.',
  alternates: { canonical: '/soc-2-cost/devtools' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/devtools',
    title: 'SOC 2 Cost for DevTools | RiscLens',
    description: 'Estimate SOC 2 cost for DevTools products with CI/CD integrations, secrets handling, and support access.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for DevTools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for DevTools | RiscLens',
    description: 'Plan SOC 2 budgets for DevTools: integrations, supply chain controls, and customer access logging.',
    images: ['/og.png'],
  },
};

export default function Soc2CostDevToolsPage() {
  return <CostIndustryPage {...content} />;
}
