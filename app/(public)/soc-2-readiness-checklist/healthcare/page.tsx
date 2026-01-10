import { Metadata } from 'next';
import IndustryChecklistPage from '@/components/IndustryChecklistPage';

export const metadata: Metadata = {
  title: 'SOC 2 Checklist for Healthcare & Healthtech | RiscLens',
  description: 'The definitive SOC 2 checklist for healthcare startups. Learn how to align SOC 2 with HIPAA requirements and secure PHI.',
  alternates: {
    canonical: 'https://risclens.com/soc-2-readiness-checklist/healthcare',
  },
};

export default function HealthcareChecklistPage() {
  return (
    <IndustryChecklistPage
      industryName="Healthcare"
      industrySlug="healthcare"
      heroDescription="Healthcare companies must navigate the intersection of SOC 2 and HIPAA. Your audit needs to demonstrate high-assurance protection of Protected Health Information (PHI)."
      criticalControls={[
        'HIPAA Mapping',
        'Business Associate Agreements (BAA)',
        'Data Masking / Anonymization',
        'Advanced Access Logging',
        'Disaster Recovery (DR)',
        'Physical Security (if applicable)',
      ]}
      checklistData={[
        {
          category: 'Compliance & Governance',
          items: [
            'Business Associate Agreements (BAAs) in place for all subprocessors handling PHI.',
            'Documented HIPAA-to-SOC 2 control mapping.',
            'Appointed Privacy Officer and Security Officer roles.',
            'Annual HIPAA security risk assessment completed.',
          ],
        },
        {
          category: 'Technical PHI Protection',
          items: [
            'Data encryption at rest using AES-256 and in transit using TLS 1.2+.',
            'Production data masked or de-identified for use in non-prod environments.',
            'Unique user IDs and strong password policies (MFA) for all PHI access.',
            'Audit logging for all access to systems containing PHI.',
          ],
        },
        {
          category: 'Operations & IR',
          items: [
            'Breach notification procedure documented and tested.',
            'Sanction policy for employees who violate security procedures.',
            'Documented disaster recovery (DR) and business continuity plans.',
            'Workstation security controls (encryption, auto-lock, remote wipe).',
          ],
        },
      ]}
      commonPitfalls={[
        'Assuming SOC 2 compliance automatically means HIPAA compliance (it doesn\'t).',
        'Failing to obtain BAAs from cloud providers or third-party tools.',
        'Inadequate logging of administrative access to production databases.',
        'Lack of formal employee training on handling PHI.',
      ]}
    />
  );
}
