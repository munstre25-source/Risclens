import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'EdTech',
  heroDescription: 'Estimate SOC 2 cost for EdTech teams handling student data, parent consent, and district/vendor reviews.',
  assumptions: [
    'Student data (PII/education records) in scope with defined data flows and retention.',
    'Parent/guardian consent flows documented where applicable.',
    'District or school vendor reviews drive extra diligence on access and privacy.',
  ],
  costRanges: [
    'Typical first-year range: ~$30k–$80k depending on data sensitivity and buyer diligence.',
    'Tooling: logging/monitoring, EDR, ticketing, and privacy/consent tracking where needed.',
  ],
  timelineBands: [
    'Readiness: 8–12 weeks if data flows, consent, and access reviews are mapped.',
    'Type I: 3–6 weeks once evidence for provisioning, consent, and logging is stable.',
    'Type II: add 4–9 months observation with sampling tied to student data systems.',
  ],
  scope: [
    'Apps storing student/teacher/guardian data, analytics pipelines, and reporting.',
    'Authentication/authorization, role design for staff/support, and consent tracking.',
    'Vendor risk for LMS, payments, communications, and storage providers.',
  ],
  drivers: [
    'Sensitivity of student data and privacy commitments.',
    'Consent capture/storage and how it is evidenced.',
    'Vendor reviews for critical education providers and subprocessors.',
    'Logging/monitoring depth for access to records.',
  ],
  auditorFocus: [
    'Access controls and reviews for staff/support and contractors.',
    'Consent records, retention, and deletion/archival processes.',
    'Incident response and notification expectations for student data.',
    'Vendor risk management with education-focused subprocessors.',
  ],
  changeCost: [
    'Updating consent or retention models mid-audit, requiring new evidence.',
    'Gaps in access review cadence for staff/support accounts.',
    'Incomplete logging around student data access that needs remediation.',
  ],
  scenarios: [
    { title: 'Classroom app with minimal vendors', detail: 'Lean vendor set and simple roles keep cost/timeline in lower range.' },
    { title: 'District-wide platform', detail: 'More vendors, integrations, and consent nuances push budget mid-range.' },
    { title: 'Analytics-heavy EdTech', detail: 'Data pipelines and sharing drive logging and retention requirements; budget toward upper range.' },
  ],
  hubHref: '/soc-2/industries/edtech',
  timelineHref: '/soc-2-timeline',
  readinessHref: '/soc-2-readiness-calculator',
  relatedLinks: [
    { href: '/soc-2/industries/edtech', label: 'Industry guide: EdTech' },
    { href: '/soc-2-timeline', label: 'SOC 2 timeline (overview)' },
    { href: '/soc-2-readiness/asset-inventory', label: 'Readiness: asset inventory' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for EdTech | RiscLens',
  description: 'SOC 2 budget guidance for EdTech: student data privacy, consent evidence, and vendor diligence with schools/districts.',
  alternates: { canonical: 'https://risclens.com/soc-2-cost/edtech' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/edtech',
    title: 'SOC 2 Cost for EdTech | RiscLens',
    description: 'Estimate SOC 2 cost for EdTech teams handling student data, consent, and education vendor reviews.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for EdTech' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for EdTech | RiscLens',
    description: 'Plan SOC 2 budgets for EdTech: privacy, consent, vendor risk, and logging expectations.',
    images: ['/og.png'],
  },
};

export default function Soc2CostEdTechPage() {
  return <CostIndustryPage {...content} />;
}
