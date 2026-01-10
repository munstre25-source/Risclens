import { Metadata } from 'next';
import MigrationPage from '@/components/MigrationPage';

export const metadata: Metadata = {
  title: 'SOC 2 to ISO 27001 Migration Guide | RiscLens',
  description: 'Expanding from SOC 2 to ISO 27001? Learn how to leverage your existing controls, bridge the documentation gaps, and achieve dual compliance.',
  alternates: {
    canonical: 'https://risclens.com/compliance/migrate/soc2-to-iso27001',
  },
};

export default function SOC2ToISO27001MigrationPage() {
  return (
    <MigrationPage
      fromFramework="SOC 2"
      toFramework="ISO 27001"
      fromSlug="soc2"
      toSlug="iso27001"
      heroDescription="Most companies with a SOC 2 report are already 80% of the way to ISO 27001. The transition is less about new technical controls and more about formalizing your Information Security Management System (ISMS)."
      overlapPercentage={80}
      keyGaps={[
        {
          area: 'ISMS Governance',
          description: 'ISO 27001 requires a formal ISMS (Clauses 4-10) including context of the organization, leadership commitment, and a mandatory Internal Audit.',
        },
        {
          area: 'Statement of Applicability (SoA)',
          description: 'Unlike SOC 2 where the auditor helps define scope, ISO 27001 requires you to formally declare which Annex A controls apply (and which don\'t) in an SoA document.',
        },
        {
          area: 'Continuous Improvement',
          description: 'ISO 27001 has a stronger focus on the "Plan-Do-Check-Act" (PDCA) cycle and formal management reviews of security performance.',
        },
      ]}
      steps={[
        'Perform a gap analysis between SOC 2 TSCs and ISO 27001 Annex A.',
        'Formalize your ISMS scope and policy framework.',
        'Conduct a formal ISO-compliant risk assessment.',
        'Draft your Statement of Applicability (SoA).',
        'Perform a mandatory Internal Audit.',
        'Undergo Stage 1 (Design) and Stage 2 (Operational) external audits.',
      ]}
    />
  );
}
