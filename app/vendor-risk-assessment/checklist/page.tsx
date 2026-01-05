import { Metadata } from 'next';
import { VendorRiskTopicPage } from '@/components/VendorRiskTopicPage';
import { generateTopicMetadata } from '@/lib/seo';

export const metadata: Metadata = generateTopicMetadata(
  'Vendor Risk Assessment Checklist',
  'Intake and diligence checklist for SOC 2 vendor management—tiering, evidence requests, and contract checkpoints.',
  '/vendor-risk-assessment/checklist',
  'Vendor Risk Assessment'
);

const faqs = [
  {
    question: 'What should a vendor risk intake form capture?',
    answer: 'Data sensitivity, access type, criticality, integrations, data volumes, subprocessors, and incident history. Those inputs drive tiering and evidence asks.',
  },
  {
    question: 'Do all vendors need the same evidence?',
    answer: 'No. Evidence should scale with risk. Low-risk vendors can often provide a light questionnaire and attestations; high-risk vendors should provide SOC reports, pentest summaries, and stronger contract terms.',
  },
];

export default function VendorRiskChecklistPage() {
  return (
    <VendorRiskTopicPage
      id="vra-checklist"
      title="Vendor Risk Checklist"
      subtitle="A lean intake and diligence checklist so vendor management stays consistent across security, procurement, and legal."
      description="Intake and diligence checklist for SOC 2 vendor management—tiering, evidence requests, and contract checkpoints."
      faqs={faqs}
      leadMagnet={{
        title: "Vendor Review Checklist (PDF)",
        description: "Download our comprehensive vendor due diligence checklist. Maps every intake question to specific evidence requirements and contract clauses.",
        buttonText: "Download Checklist PDF",
        templateId: "vra_checklist",
        resourceName: "Vendor_Risk_Assessment_Checklist"
      }}
    >
      <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Intake (before scoring)</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Describe data processed (PII/PHI/payment/internal).</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Document access paths (user, admin, API, network).</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Classify vendor criticality and business owner.</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Integration type and data flow diagram (one-way vs bi-directional).</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Estimated data volume and regions.</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Subprocessor list, if any.</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Disclosed incidents or breaches in the last 24 months.</span></li>
        </ul>
      </div>

      <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Due diligence (after tiering)</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Request evidence-by-tier package (SOC reports, pentest, DPAs as needed).</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Validate identity and access model (SSO/MFA, privileged access logging).</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Review incident response process and notification SLAs.</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Check data retention/deletion and encryption coverage.</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Confirm subprocessors and upstream certifications.</span></li>
        </ul>
      </div>

      <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Contracts and ongoing</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Include tier-aligned security addendum and DPA.</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Document reassessment cadence and owners.</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Track exceptions with remediation dates.</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Store all materials with audit-ready labeling.</span></li>
        </ul>
      </div>
    </VendorRiskTopicPage>
  );
}
