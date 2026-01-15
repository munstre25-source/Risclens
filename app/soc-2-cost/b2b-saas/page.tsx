import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'B2B SaaS',
  heroDescription: 'Estimate SOC 2 cost for multi-tenant SaaS with enterprise buyers, SSO/SCIM, and admin RBAC expectations.',
  assumptions: [
    'Multi-tenant architecture with shared services; clear tenant isolation patterns documented.',
    'Enterprise features (SSO/SCIM, audit logs, RBAC) are either live or in flight before audit.',
    'Change management and deployment pipelines are traceable with approvals where needed.',
  ],
  costRanges: [
    'Typical first-year range: ~$35k–$95k depending on scope breadth, tenants, and evidence quality.',
    'Tooling: logging, SSO, EDR, and ticketing often sized by tenant/admin count.',
  ],
  timelineBands: [
    'Readiness: 8–14 weeks when RBAC and audit logging are in place.',
    'Type I: 3–6 weeks once isolation controls and user provisioning flows are evidenced.',
    'Type II: add 4–9 months of observation with sampling across key tenants.',
  ],
  scope: [
    'Production app, auth/SSO, SCIM/just-in-time provisioning, tenant isolation controls.',
    'Deployment pipelines (CI/CD), source control, observability stack, and change approvals.',
    'Customer-facing admin surfaces (roles, audit logs) and data export/delete flows.',
  ],
  drivers: [
    'Tenant isolation design and how it is proved to auditors.',
    'SSO/SCIM readiness and evidence for least-privilege roles.',
    'Volume of customer-impacting changes during observation.',
    'Depth of logging and monitoring across shared services.',
  ],
  auditorFocus: [
    'Role design, access reviews, and provisioning for admins and support engineers.',
    'How tenant boundaries are enforced (IDs, policies, network segmentation).',
    'CI/CD approvals, change logging, and rollback patterns.',
    'Customer data handling (exports, deletes, backups) with audit evidence.',
  ],
  changeCost: [
    'Adding enterprise features mid-audit (SSO/SCIM, RBAC) that trigger extra walkthroughs.',
    'Limited audit logging across shared services requiring uplift.',
    'Inconsistent deployment approvals or emergency changes without documentation.',
  ],
  scenarios: [
    { title: 'Seed-stage SaaS with core RBAC', detail: 'Lean team, few tenants; lower range if logging and deployment traces are solid.' },
    { title: 'Enterprise-focused SaaS rolling out SCIM', detail: 'SSO/SCIM rollout plus tenant isolation evidence pushes time and budget mid-range.' },
    { title: 'Multi-product platform', detail: 'Multiple surfaces and admin models increase sampling and walkthroughs; budget toward upper range.' },
  ],
  hubHref: '/soc-2/industries/b2b-saas',
  timelineHref: '/soc-2-timeline/saas',
  readinessHref: '/soc-2-readiness/saas',
  relatedLinks: [
    { href: '/soc-2-timeline/saas', label: 'Timeline for SaaS' },
    { href: '/soc-2-readiness/saas', label: 'Readiness for SaaS' },
    { href: '/soc-2/industries/b2b-saas', label: 'Industry guide: B2B SaaS' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for B2B SaaS | RiscLens',
  description: 'SOC 2 budget guidance for B2B SaaS: tenant isolation, SSO/SCIM, admin RBAC, and enterprise buyer expectations.',
  alternates: { canonical: 'https://risclens.com/soc-2-cost/b2b-saas' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/b2b-saas',
    title: 'SOC 2 Cost for B2B SaaS | RiscLens',
    description: 'Estimate SOC 2 spend for B2B SaaS teams with multi-tenant environments, SSO/SCIM, and admin RBAC.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for B2B SaaS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for B2B SaaS | RiscLens',
    description: 'Plan SOC 2 budgets for B2B SaaS with tenant isolation, SSO/SCIM, and enterprise audit demands.',
    images: ['/og.png'],
  },
};

export default function Soc2CostB2BSaasPage() {
  return <CostIndustryPage {...content} />;
}
