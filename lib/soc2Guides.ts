export type Soc2Category = 'cost' | 'timeline' | 'readiness';

export interface Soc2GuidePage {
  slug: string;
  title: string;
  summary: string;
  category: Soc2Category;
  parent: string;
  highlights: string[];
  related?: string[];
  delays?: string[];
  extraLinks?: { href: string; label: string }[];
}

const costParent = '/soc-2-cost';
const timelineParent = '/soc-2-timeline';
const readinessParent = '/learn/soc-2-readiness';

export const costGuides: Soc2GuidePage[] = [
  {
    slug: 'auditor-fees',
    title: 'SOC 2 Auditor Fees Explained',
    summary: 'How auditor selection, scope, and observation windows influence fee ranges and what pushes invoices up.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Compare boutique vs scaled audit firms and how they price evidence review.',
      'What Trust Service Criteria selection does to the statement of work.',
      'When rush timelines trigger premium day rates.',
    ],
  },
  {
    slug: 'automation-tools-vanta-drata',
    title: 'Automation Tools: Vanta, Drata, and Others',
    summary: 'How automation platforms offset audit effort, what they actually replace, and where manual work remains.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Licensing tiers by headcount and system count.',
      'Evidence connectors vs custom controls—where you still need people.',
      'When to layer GRC plus logging plus ticketing to satisfy auditors.',
    ],
  },
  {
    slug: 'internal-time-and-headcount',
    title: 'Internal Time and Headcount',
    summary: 'How many internal hours SOC 2 typically consumes across engineering, IT, and leadership.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Sizing core team vs borrowed time from engineering and IT.',
      'Expected cadence for control owners during readiness and audit.',
      'Where automation meaningfully reduces meetings and screenshots.',
    ],
  },
  {
    slug: 'policies-and-documentation',
    title: 'Policies and Documentation',
    summary: 'Policy drafting, versioning, and review cycles that auditors expect and how to keep effort low.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Templates vs bespoke policies for unique environments.',
      'Annual review rhythm and board acknowledgement considerations.',
      'Evidence packets auditors look for during walkthroughs.',
    ],
  },
  {
    slug: 'evidence-collection',
    title: 'Evidence Collection and Sampling',
    summary: 'The mechanics of gathering screenshots, exports, and tickets—and budgeting time to do it right.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Sampling sizes and how exceptions affect rework.',
      'Coordinating evidence across engineering, IT, and data teams.',
      'Reducing screenshot debt with system-of-record exports.',
    ],
  },
  {
    slug: 'penetration-testing',
    title: 'Penetration Testing Costs for SOC 2',
    summary: 'Where pentest spend fits in the SOC 2 budget and how scope, auth, and timelines influence price.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'What auditors expect from a pentest report for SOC 2.',
      'How many apps/APIs and environments change pricing.',
      'When to bundle retests and remediation validation.',
    ],
    related: ['/penetration-testing/for-soc-2'],
  },
  {
    slug: 'vendor-management',
    title: 'Vendor Management Costs',
    summary: 'Third-party reviews, questionnaires, and contract updates that add to SOC 2 timelines and spend.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Tracking critical suppliers and evidence for each.',
      'Review cadence for cloud, payments, and auth providers.',
      'When to refresh DPAs and security exhibits.',
    ],
  },
  {
    slug: 'cloud-and-infrastructure',
    title: 'Cloud and Infrastructure Costs',
    summary: 'Logging, backups, and hardening that often drive incremental cloud spend during SOC 2 prep.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Costs of enabling detailed logging and retention.',
      'Backups, disaster recovery testing, and replication choices.',
      'Tagging and inventory clean-up to simplify evidence.',
    ],
  },
  {
    slug: 'security-tooling',
    title: 'Security Tooling Budget',
    summary: 'Baseline tools (logging, EDR, SSO, vulnerability management) most teams add before a SOC 2 audit.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Required vs nice-to-have tools for early-stage teams.',
      'Licensing math for EDR and logging platforms.',
      'Coordinating scan evidence with auditor expectations.',
    ],
  },
  {
    slug: 'legal-and-grc-support',
    title: 'Legal and GRC Support',
    summary: 'Where outside counsel and fractional GRC advisors fit, and how to budget for targeted help.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Contract updates tied to SOC 2 deliverables.',
      'Policy reviews and control narratives with counsel.',
      'When to engage fractional compliance leads vs full-time.',
    ],
  },
  {
    slug: 'type-1-vs-type-2-cost',
    title: 'Type I vs Type II Cost',
    summary: 'How observation periods, testing depth, and scheduling shift budgets between Type I and Type II.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Shorter engagements for Type I vs sustained effort for Type II.',
      'Operating effectiveness evidence volume differences.',
      'Customer expectations and when Type I is acceptable.',
    ],
  },
  {
    slug: 'hidden-costs',
    title: 'Hidden SOC 2 Costs',
    summary: 'Common surprise costs—retests, logging upgrades, and overtime—that teams often miss.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Rush fees from auditors or vendors.',
      'Unexpected licensing to enable required controls.',
      'Internal opportunity cost when engineers pause roadmap work.',
    ],
  },
  {
    slug: '5-10-employees',
    title: 'SOC 2 Cost for 5-10 Employees',
    summary: 'How very small teams can scope lean audits and avoid over-buying tools.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Lightweight policy sets and evidence owners.',
      'Picking automation tiers that fit early headcount.',
      'Aligning Type I timelines with product milestones.',
    ],
  },
  {
    slug: '10-50-employees',
    title: 'SOC 2 Cost for 10-50 Employees',
    summary: 'Growing teams balancing feature velocity with SOC 2 readiness and auditor expectations.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Coordinating multiple control owners and reviewers.',
      'Layering tooling without ballooning subscription spend.',
      'Sequencing readiness before enterprise deals close.',
    ],
  },
  {
    slug: '50-200-employees',
    title: 'SOC 2 Cost for 50-200 Employees',
    summary: 'Maturing organizations with more systems in scope and heavier evidence requirements.',
    category: 'cost',
    parent: costParent,
    highlights: [
      'Scaling access reviews and asset inventories.',
      'Observation windows and sampling across multiple teams.',
      'Integrating SOC 2 with existing security programs.',
    ],
  },
];

export const timelineGuides: Soc2GuidePage[] = [
  {
    slug: 'startups',
    title: 'SOC 2 Timeline for Startups',
    summary: 'Lean teams can reach Type I quickly if scope stays focused and evidence is organized; Type II depends on consistent logs and access reviews.',
    category: 'timeline',
    parent: timelineParent,
    highlights: [
      'Centralized owners and fewer systems accelerate decisions.',
      'Shorter path to Type I; Type II depends on evidence maturity.',
      'Run pentests and vendor reviews early to avoid blocking audit start.',
    ],
    delays: [
      'Missing logging or inconsistent access reviews that require backfill.',
      'Late scope changes (vendors/systems) that add sampling and walkthroughs.',
      'Unclear ownership across engineering, IT, and founders.',
    ],
    extraLinks: [
      { href: '/soc-2-timeline', label: 'SOC 2 Timeline (overview)' },
      { href: '/soc-2-cost/startups', label: 'SOC 2 Cost for Startups' },
      { href: '/soc-2-readiness/startups', label: 'SOC 2 Readiness for Startups' },
    ],
  },
  {
    slug: 'saas',
    title: 'SOC 2 Timeline for SaaS',
    summary: 'SaaS teams balance multi-tenant scope, CI/CD pace, and customer pressure; timelines hinge on evidence quality and scope control.',
    category: 'timeline',
    parent: timelineParent,
    highlights: [
      'Align deployment cadence with evidence collection and change approvals.',
      'Customer security asks often dictate Type I vs Type II timing.',
      'Tooling maturity (logging, monitoring, access reviews) reduces delays.',
    ],
    delays: [
      'High release velocity without change evidence or approvals.',
      'Third-party integrations added late in scope that need reviews.',
      'Tenant isolation controls not documented, causing auditor rework.',
    ],
    extraLinks: [
      { href: '/soc-2-timeline', label: 'SOC 2 Timeline (overview)' },
      { href: '/soc-2-cost/saas', label: 'SOC 2 Cost for SaaS' },
      { href: '/soc-2-readiness/saas', label: 'SOC 2 Readiness for SaaS' },
    ],
  },
  {
    slug: 'fintech',
    title: 'SOC 2 Timeline for Fintech',
    summary: 'Fintech teams face heavier expectations around vendor risk, monitoring, and data protection; plan for deeper evidence and longer observation windows.',
    category: 'timeline',
    parent: timelineParent,
    highlights: [
      'Regulated data and payment flows expand evidence scope.',
      'Vendor due diligence and monitoring cadence must be documented.',
      'Observation windows and sampling may be longer given risk profile.',
    ],
    delays: [
      'Vendor risk reviews and contractual updates that lag behind audits.',
      'Incomplete logging/monitoring for payment or PII systems.',
      'Pentest remediation and retests not aligned with audit milestones.',
    ],
    extraLinks: [
      { href: '/soc-2-timeline', label: 'SOC 2 Timeline (overview)' },
      { href: '/soc-2-cost/fintech', label: 'SOC 2 Cost for Fintech' },
      { href: '/soc-2-readiness/fintech', label: 'SOC 2 Readiness for Fintech' },
    ],
  },
  {
    slug: '5-10-employees',
    title: 'SOC 2 Timeline for 5-10 Employees',
    summary: 'Lean teams running focused readiness to reach Type I quickly without overloading engineers.',
    category: 'timeline',
    parent: timelineParent,
    highlights: [
      'Prep work that can be done in parallel with product delivery.',
      'Where to borrow time from founders vs engineers.',
      'Evidence sequencing to avoid rework.',
    ],
    delays: [
      'No clear owner for access reviews or change management.',
      'Evidence backfill for logs and tickets.',
      'Scope creep from late vendor additions.',
    ],
  },
  {
    slug: '10-50-employees',
    title: 'SOC 2 Timeline for 10-50 Employees',
    summary: 'Coordinating controls across squads and IT while keeping the audit calendar realistic.',
    category: 'timeline',
    parent: timelineParent,
    highlights: [
      'How to run access reviews without slowing sprint cadence.',
      'Scheduling observation windows to match renewals and big deals.',
      'Reducing churn with clear owners and RACI.',
    ],
    delays: [
      'Parallel projects competing for control owners’ time.',
      'Inconsistent change approvals across teams.',
      'Late alignment on observation window start/end dates.',
    ],
  },
  {
    slug: '50-200-employees',
    title: 'SOC 2 Timeline for 50-200 Employees',
    summary: 'Operating multiple environments and product lines through a predictable SOC 2 cycle.',
    category: 'timeline',
    parent: timelineParent,
    highlights: [
      'Calendar planning across products and regions.',
      'Coordination with procurement and legal cycles.',
      'How to avoid drift between readiness and audit start.',
    ],
    delays: [
      'Coordinating evidence across multiple business units.',
      'Vendor and contract updates lagging behind audit scope.',
      'Drift between readiness completion and audit kickoff.',
    ],
  },
];

export const readinessGuides: Soc2GuidePage[] = [
  {
    slug: 'access-control',
    title: 'SOC 2 Access Control',
    summary: 'Provisioning, least privilege, and offboarding practices auditors test first.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Centralized identity, SSO, and MFA coverage.',
      'Joiner-mover-leaver workflows and approvals.',
      'Documented admin roles and break-glass access.',
    ],
  },
  {
    slug: 'user-access-reviews',
    title: 'User Access Reviews for SOC 2',
    summary: 'Cadence, sampling, and evidence patterns for periodic access reviews auditors rely on.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Quarterly review rhythms and tracking exceptions.',
      'Tools that reduce screenshot debt and manual exports.',
      'Reconciliation steps across apps, infra, and vendors.',
    ],
  },
  {
    slug: 'mfa-and-authentication',
    title: 'MFA and Authentication Controls',
    summary: 'Rolling out MFA coverage, SSO, and session controls that satisfy CC6 and CC7.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Coverage expectations for workforce and privileged users.',
      'Device and network considerations for remote teams.',
      'Documenting exceptions and compensating controls.',
    ],
  },
  {
    slug: 'change-management',
    title: 'Change Management for SOC 2',
    summary: 'Ticketing, approvals, and deployment tracing to show safe delivery to production.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Branch protections and pull request evidence.',
      'Release approvals vs automated deploys.',
      'Tracking emergency changes and rollbacks.',
    ],
  },
  {
    slug: 'secure-sdlc',
    title: 'Secure SDLC Practices',
    summary: 'Embedding security checks into the delivery lifecycle for SOC 2.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Static/dynamic testing expectations by risk.',
      'Dependency scanning and remediation SLAs.',
      'Security sign-off for major launches.',
    ],
  },
  {
    slug: 'logging-and-monitoring',
    title: 'Logging and Monitoring',
    summary: 'Evidence for detection coverage, alerting, and response runbooks.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Log sources and retention expectations.',
      'Alert tuning to avoid fatigue while staying audit-ready.',
      'How to evidence investigations and escalations.',
    ],
  },
  {
    slug: 'incident-response',
    title: 'Incident Response for SOC 2',
    summary: 'Plans, tabletop exercises, and timelines auditors ask about during walkthroughs.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'IR playbooks and roles/responsibilities.',
      'Testing the plan and documenting lessons learned.',
      'Coordinating comms with customers and leadership.',
    ],
  },
  {
    slug: 'vulnerability-management',
    title: 'Vulnerability Management',
    summary: 'Scanning cadence, prioritization, and patch windows tied to SOC 2 evidence.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Severity-based remediation timelines.',
      'Coordinating infra, app, and dependency scanning.',
      'Exception handling and compensating controls.',
    ],
  },
  {
    slug: 'patch-management',
    title: 'Patch Management',
    summary: 'Operating system and package updates with audit-friendly tracking.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Baseline patch cadences for workstations and servers.',
      'Change control for emergency fixes.',
      'Documenting approvals and deployment artifacts.',
    ],
  },
  {
    slug: 'vendor-management',
    title: 'Vendor Management for SOC 2',
    summary: 'Due diligence, monitoring, and contracts for critical suppliers.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Defining critical vs non-critical vendors.',
      'SOC reports, DPAs, and security addenda.',
      'Tracking exceptions and remediation asks.',
    ],
  },
  {
    slug: 'asset-inventory',
    title: 'Asset Inventory',
    summary: 'Keeping accurate lists of devices, cloud assets, and applications for auditors.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Automated discovery vs manual spreadsheets.',
      'Ownership, tagging, and lifecycle states.',
      'How inventory feeds access reviews and patching.',
    ],
  },
  {
    slug: 'data-encryption',
    title: 'Data Encryption',
    summary: 'Encryption in transit and at rest requirements and how to evidence keys and rotations.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Transport encryption defaults and cipher expectations.',
      'Key management, rotation, and access logging.',
      'Handling customer-managed keys and exceptions.',
    ],
  },
  {
    slug: 'backup-and-recovery',
    title: 'Backup and Recovery',
    summary: 'Retention policies, testing, and documentation that satisfy SOC 2 auditors.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Recovery objectives and evidence of restores.',
      'Immutable backups and access controls.',
      'Documenting results of disaster recovery tests.',
    ],
  },
  {
    slug: 'business-continuity',
    title: 'Business Continuity Planning',
    summary: 'Keeping services available through disruptions and documenting plans customers trust.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Risk scenarios and decision trees.',
      'Testing cadence and post-mortem expectations.',
      'Coordinating with incident response and DR.',
    ],
  },
  {
    slug: 'security-awareness-training',
    title: 'Security Awareness Training',
    summary: 'Baseline training program, phishing exercises, and documentation auditors request.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Onboarding and annual training compliance.',
      'Tracking completion and exceptions.',
      'Including engineering-specific secure coding refreshers.',
    ],
  },
  {
    slug: 'risk-assessment',
    title: 'Risk Assessment for SOC 2',
    summary: 'Identifying, rating, and mitigating risks with evidence you can share.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Methodologies and scoring that align with SOC 2.',
      'Documenting mitigations and ownership.',
      'Refreshing risk registers ahead of audits.',
    ],
  },
  {
    slug: 'policies-and-procedures',
    title: 'Policies and Procedures for SOC 2',
    summary: 'Creating practical policies and living procedures auditors can actually test.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Versioning and approvals cadence.',
      'Mapping policies to controls and evidence.',
      'Training teams on the procedures they own.',
    ],
  },
  {
    slug: 'audit-logging-evidence',
    title: 'Audit Logging Evidence',
    summary: 'Collecting and presenting log evidence that supports control testing.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Retention and tamper resistance expectations.',
      'Sampling access to sensitive actions.',
      'Aligning alerts with incident response.',
    ],
  },
  {
    slug: 'least-privilege',
    title: 'Least Privilege in Practice',
    summary: 'Designing roles and approvals that keep access tight without blocking delivery.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Role design for apps and cloud.',
      'Temporary access and break-glass controls.',
      'Documenting approvals and expirations.',
    ],
  },
  {
    slug: 'endpoint-security',
    title: 'Endpoint Security',
    summary: 'Device hardening, EDR, and monitoring practices most auditors look for.',
    category: 'readiness',
    parent: readinessParent,
    highlights: [
      'Baseline configs for laptops and servers.',
      'EDR deployment and alert handling.',
      'Handling BYOD and contractor devices.',
    ],
  },
];

export const costGuideBySlug = costGuides.reduce((acc, page) => {
  acc[page.slug] = page;
  return acc;
}, {} as Record<string, Soc2GuidePage>);

export const timelineGuideBySlug = timelineGuides.reduce((acc, page) => {
  acc[page.slug] = page;
  return acc;
}, {} as Record<string, Soc2GuidePage>);

export const readinessGuideBySlug = readinessGuides.reduce((acc, page) => {
  acc[page.slug] = page;
  return acc;
}, {} as Record<string, Soc2GuidePage>);

export const soc2GuideSlugs = [
  ...costGuides.map((page) => `${page.parent}/${page.slug}`),
  ...timelineGuides.map((page) => `${page.parent}/${page.slug}`),
  ...readinessGuides.map((page) => `${page.parent}/${page.slug}`),
];
