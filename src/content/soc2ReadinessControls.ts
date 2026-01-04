export interface Soc2ReadinessControl {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  faqs: { q: string; a: string }[];
  related: string[];
}

const controls: Soc2ReadinessControl[] = [
  {
    slug: 'access-control',
    title: 'Access Control',
    subtitle: 'SSO, MFA, and role-based access',
    summary: 'Who can access production systems and customer data, and how you enforce authentication and approvals.',
    faqs: [
      { q: 'Why auditors care', a: 'Access defines your blast radius. Auditors look for SSO, MFA, role-based access, and timely offboarding.' },
      { q: 'Common gaps', a: 'Local accounts without MFA, shared admin credentials, and slow offboarding workflows.' },
    ],
    related: ['least-privilege', 'endpoint-security', 'user-access-reviews'],
  },
  {
    slug: 'user-access-reviews',
    title: 'User Access Reviews',
    subtitle: 'Periodic reviews and approvals',
    summary: 'Scheduled reviews to confirm only the right people keep access to critical systems and data.',
    faqs: [
      { q: 'What to show', a: 'Evidence of quarterly or monthly reviews, approvals, removals, and exception handling.' },
      { q: 'Typical blockers', a: 'No owner assigned, stale exports, and missing sign-off records.' },
    ],
    related: ['access-control', 'least-privilege', 'asset-inventory'],
  },
  {
    slug: 'mfa-authentication',
    title: 'MFA & Authentication',
    subtitle: 'Multi-factor and session controls',
    summary: 'Strong authentication for workforce, admin, and customer access to reduce credential-based compromise.',
    faqs: [
      { q: 'Evidence to collect', a: 'IdP configuration screenshots, enforced MFA policies, and coverage for admin accounts.' },
      { q: 'Mistakes to avoid', a: 'Partial rollout, unmonitored exceptions, and missing MFA on break-glass accounts.' },
    ],
    related: ['access-control', 'least-privilege', 'endpoint-security'],
  },
  {
    slug: 'change-management',
    title: 'Change Management',
    subtitle: 'Approvals and deployment safety',
    summary: 'Controlled changes to code, infrastructure, and configuration with approvals and rollback plans.',
    faqs: [
      { q: 'What auditors expect', a: 'Peer review evidence, approvals in tickets or PRs, and rollback or deploy checklists.' },
      { q: 'Common issues', a: 'Emergency changes without documentation and missing linkage between tickets and deployments.' },
    ],
    related: ['secure-sdlc', 'logging-and-monitoring', 'incident-response'],
  },
  {
    slug: 'secure-sdlc',
    title: 'Secure SDLC',
    subtitle: 'Security in the build pipeline',
    summary: 'Embedding security checks into code, build, and deployment processes with documented outcomes.',
    faqs: [
      { q: 'Key artifacts', a: 'Static analysis, dependency scanning, PR templates with security checks, and sign-offs.' },
      { q: 'Pitfalls', a: 'Untracked exceptions, disabled checks, and no owner for fixing findings.' },
    ],
    related: ['change-management', 'vulnerability-management', 'logging-and-monitoring'],
  },
  {
    slug: 'logging-and-monitoring',
    title: 'Logging & Monitoring',
    subtitle: 'Detection coverage and alerts',
    summary: 'Collect, retain, and review logs for critical systems with alerts for suspicious activity.',
    faqs: [
      { q: 'Evidence', a: 'Logging configs, retention settings, alert rules, and sample investigations with tickets.' },
      { q: 'Gaps', a: 'No alert tuning, short retention, and missing coverage for admin actions.' },
    ],
    related: ['incident-response', 'access-control', 'secure-sdlc'],
  },
  {
    slug: 'incident-response',
    title: 'Incident Response',
    subtitle: 'Playbooks and rehearsals',
    summary: 'Defined roles, runbooks, and communication plans to handle security incidents quickly and consistently.',
    faqs: [
      { q: 'Auditor focus', a: 'Documented plan, roles, tabletop results, and evidence of lessons learned or follow-up tasks.' },
      { q: 'Mistakes', a: 'No rehearsals, unclear severity levels, or missing customer notification paths.' },
    ],
    related: ['logging-and-monitoring', 'business-continuity-planning', 'backup-and-recovery'],
  },
  {
    slug: 'vulnerability-management',
    title: 'Vulnerability Management',
    subtitle: 'Scanning and remediation',
    summary: 'Identify, prioritize, and remediate vulnerabilities across applications and infrastructure with tracked SLAs.',
    faqs: [
      { q: 'What to show', a: 'Scan schedules, findings, SLA mappings, exceptions, and remediation tickets with dates.' },
      { q: 'Common misses', a: 'Unowned findings, no SLA mapping, or stale exceptions with no expiry.' },
    ],
    related: ['patch-management', 'endpoint-security', 'secure-sdlc'],
  },
  {
    slug: 'patch-management',
    title: 'Patch Management',
    subtitle: 'OS and dependency updates',
    summary: 'Timely updates for operating systems, packages, and infrastructure components with documented approvals.',
    faqs: [
      { q: 'Evidence', a: 'Patch cadence policy, recent patch cycles, approvals, and exception handling.' },
      { q: 'Pitfalls', a: 'Unpatched long-lived servers, untracked exceptions, and missing emergency patch path.' },
    ],
    related: ['vulnerability-management', 'endpoint-security', 'change-management'],
  },
  {
    slug: 'vendor-management',
    title: 'Vendor Management',
    subtitle: 'Triage and evidence by tier',
    summary: 'Assess third parties, collect evidence proportionate to risk, and track approvals and exceptions.',
    faqs: [
      { q: 'What auditors ask', a: 'Vendor inventory, risk tiers, evidence by tier (SOC/ISO, DPAs), and reassessment cadence.' },
      { q: 'Mistakes', a: 'Same evidence for every vendor, no subprocessor visibility, or missing follow-up dates.' },
    ],
    related: ['risk-assessment', 'asset-inventory', 'audit-logging-evidence'],
  },
  {
    slug: 'asset-inventory',
    title: 'Asset Inventory',
    subtitle: 'Systems, devices, and ownership',
    summary: 'Authoritative lists of devices, cloud assets, and applications with owners and lifecycle states.',
    faqs: [
      { q: 'Evidence', a: 'Exports from inventory tools, ownership fields, and decommission records.' },
      { q: 'Common gaps', a: 'Stale records, no owner, and missing links to access reviews or patching.' },
    ],
    related: ['access-control', 'endpoint-security', 'user-access-reviews'],
  },
  {
    slug: 'data-encryption',
    title: 'Data Encryption',
    subtitle: 'In transit and at rest',
    summary: 'Encryption coverage for data in transit and at rest, with key management practices documented.',
    faqs: [
      { q: 'What to provide', a: 'TLS configurations, storage encryption settings, key rotation, and access controls.' },
      { q: 'Pitfalls', a: 'Unencrypted backups, missing rotation, or unmanaged keys.' },
    ],
    related: ['backup-and-recovery', 'endpoint-security', 'logging-and-monitoring'],
  },
  {
    slug: 'backup-and-recovery',
    title: 'Backup & Recovery',
    subtitle: 'Restorable and tested backups',
    summary: 'Backups for critical data with defined retention, encryption, and tested recovery procedures.',
    faqs: [
      { q: 'Evidence', a: 'Backup configs, retention schedules, and recent restore test results with timestamps.' },
      { q: 'Mistakes', a: 'Unverified restores, missing encryption, or unclear RPO/RTO ownership.' },
    ],
    related: ['business-continuity-planning', 'data-encryption', 'asset-inventory'],
  },
  {
    slug: 'business-continuity-planning',
    title: 'Business Continuity Planning',
    subtitle: 'Keep operations running',
    summary: 'Plans to sustain critical services during disruptions, with roles, dependencies, and test results.',
    faqs: [
      { q: 'What auditors look for', a: 'Documented plan, test cadence, results, and follow-up actions.' },
      { q: 'Pitfalls', a: 'Unowned plans, no testing, and missing dependencies or communication trees.' },
    ],
    related: ['backup-and-recovery', 'incident-response', 'risk-assessment'],
  },
  {
    slug: 'security-awareness-training',
    title: 'Security Awareness Training',
    subtitle: 'Educate and measure',
    summary: 'Regular security training, phishing simulations, and tracking of completion with follow-up for exceptions.',
    faqs: [
      { q: 'Evidence', a: 'Training completion reports, reminders, and remediation for non-compliance.' },
      { q: 'Mistakes', a: 'One-time training only and no proof of completion or follow-up.' },
    ],
    related: ['incident-response', 'endpoint-security', 'least-privilege'],
  },
  {
    slug: 'risk-assessment',
    title: 'Risk Assessment',
    subtitle: 'Identify and treat risks',
    summary: 'Periodic risk assessments with owners, treatments, and timelines to keep controls aligned with threats.',
    faqs: [
      { q: 'Evidence', a: 'Risk register entries with scoring, treatment plans, and review dates.' },
      { q: 'Pitfalls', a: 'Stale registers, no action owners, and missing follow-up dates.' },
    ],
    related: ['vendor-management', 'business-continuity-planning', 'audit-logging-evidence'],
  },
  {
    slug: 'audit-logging-evidence',
    title: 'Audit Logging Evidence',
    subtitle: 'Prove control operation',
    summary: 'Traceability for control operation with logs, tickets, and approvals tied to each control activity.',
    faqs: [
      { q: 'What to show', a: 'Tickets or logs proving reviews occurred, who approved, and how exceptions were handled.' },
      { q: 'Pitfalls', a: 'No linkage between evidence and control, or missing timestamps/owners.' },
    ],
    related: ['logging-and-monitoring', 'change-management', 'user-access-reviews'],
  },
  {
    slug: 'least-privilege',
    title: 'Least Privilege',
    subtitle: 'Minimize access scope',
    summary: 'Ensure users and services have only the access they need, with just-in-time elevation where possible.',
    faqs: [
      { q: 'Evidence', a: 'Role definitions, approval records for privileged access, and periodic reviews.' },
      { q: 'Mistakes', a: 'Persistent admin access, shared accounts, and no time limits on elevation.' },
    ],
    related: ['access-control', 'user-access-reviews', 'endpoint-security'],
  },
  {
    slug: 'endpoint-security',
    title: 'Endpoint Security',
    subtitle: 'EDR, patching, and disk encryption',
    summary: 'Protect laptops and servers with EDR, disk encryption, and enforced patching baselines.',
    faqs: [
      { q: 'Evidence', a: 'EDR deployment reports, encryption enforcement, and patch compliance reports.' },
      { q: 'Pitfalls', a: 'Unmanaged contractor devices and no proof of remediation for failed agents.' },
    ],
    related: ['patch-management', 'least-privilege', 'access-control'],
  },
];

export default controls;
