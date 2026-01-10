import { Metadata } from 'next';
import MigrationPage from '@/components/MigrationPage';

export const metadata: Metadata = {
  title: 'SOC 2 to GDPR Compliance Guide | RiscLens',
  description: 'Learn how to bridge the gap between SOC 2 Security/Privacy criteria and GDPR requirements. Secure European user data and satisfy DPA requirements.',
  alternates: {
    canonical: 'https://risclens.com/compliance/migrate/soc2-to-gdpr',
  },
};

export default function SOC2ToGDPRMigrationPage() {
  return (
    <MigrationPage
      fromFramework="SOC 2"
      toFramework="GDPR"
      fromSlug="soc2"
      toSlug="gdpr"
      heroDescription="GDPR is a privacy regulation, while SOC 2 is a security framework. If you have the SOC 2 'Privacy' criteria in scope, you are well-positioned, but significant legal and operational gaps remain."
      overlapPercentage={60}
      keyGaps={[
        {
          area: 'Data Subject Rights',
          description: 'GDPR grants users specific rights (Right to Erasure, Data Portability, Right to Access) that must be operationally supported with documented workflows.',
        },
        {
          area: 'Legal Basis for Processing',
          description: 'You must define and document a valid legal basis (e.g., Consent, Legitimate Interest) for every piece of personal data you process.',
        },
        {
          area: 'Data Protection Impact Assessment (DPIA)',
          description: 'For high-risk processing, GDPR requires a formal DPIA, which is more prescriptive than a standard SOC 2 risk assessment.',
        },
      ]}
      steps={[
        'Update your Privacy Policy to meet GDPR transparency requirements.',
        'Implement an inventory of personal data (Data Mapping / ROPA).',
        'Establish a process for handling Data Subject Access Requests (DSARs).',
        'Review and update Data Processing Agreements (DPAs) with vendors.',
        'Appoint a Data Protection Officer (DPO) if required.',
        'Implement "Privacy by Design" in your SDLC.',
      ]}
    />
  );
}
