import { Metadata } from 'next';
import MigrationPage from '@/components/MigrationPage';

export const metadata: Metadata = {
  title: 'SOC 2 to HIPAA Compliance Guide | RiscLens',
  description: 'Learn how to extend your SOC 2 controls to meet HIPAA requirements. Map the Security Rule to SOC 2 TSCs and secure Protected Health Information (PHI).',
  alternates: {
    canonical: 'https://risclens.com/compliance/migrate/soc2-to-hipaa',
  },
};

export default function SOC2ToHIPAAMigrationPage() {
  return (
    <MigrationPage
      fromFramework="SOC 2"
      toFramework="HIPAA"
      fromSlug="soc2"
      toSlug="hipaa"
      heroDescription="For healthtech startups, SOC 2 + HIPAA is the industry standard. While SOC 2 is a flexible framework, HIPAA is a regulatory requirement with specific implementation specifications."
      overlapPercentage={75}
      keyGaps={[
        {
          area: 'PHI Inventory & Flow',
          description: 'HIPAA requires a comprehensive map of all Protected Health Information (PHI) within your systems, including how it enters, moves, and leaves your organization.',
        },
        {
          area: 'Business Associate Agreements (BAA)',
          description: 'You must have signed BAAs with every vendor that touches PHI. This is a non-negotiable legal requirement that goes beyond standard SOC 2 vendor reviews.',
        },
        {
          area: 'Privacy & Breach Notification',
          description: 'HIPAA includes the Privacy Rule and Breach Notification Rule, which require specific policies for patient rights and strictly defined timelines for reporting data breaches.',
        },
      ]}
      steps={[
        'Define your "HIPAA Boundary" and inventory all PHI.',
        'Execute BAAs with all critical cloud and software providers.',
        'Map SOC 2 Security TSCs to HIPAA Security Rule standards.',
        'Implement mandatory HIPAA training for all workforce members.',
        'Conduct a formal HIPAA Security Risk Analysis (SRA).',
        'Formalize your Breach Notification procedure.',
      ]}
    />
  );
}
