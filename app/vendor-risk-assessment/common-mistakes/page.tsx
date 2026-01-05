import { Metadata } from 'next';
import { VendorRiskTopicPage } from '@/components/VendorRiskTopicPage';
import { generateTopicMetadata } from '@/lib/seo';

export const metadata: Metadata = generateTopicMetadata(
  'Common Vendor Risk Assessment Mistakes',
  'Avoid the common pitfalls in vendor risk assessments—over-collection, missing subprocessor chains, and weak monitoring.',
  '/vendor-risk-assessment/common-mistakes',
  'Vendor Risk Assessment'
);

const mistakes = [
  'Requesting full SOC 2 + pen tests from every vendor regardless of tier.',
  'Skipping data flow clarity—unclear data types and volumes lead to wrong tiers.',
  'Ignoring incident history or relying only on marketing claims.',
  'No cadence ownership; reassessments slip and evidence goes stale.',
  'Contracts that omit breach notice, subprocessor approval, or access requirements.',
  'Not documenting exceptions or remediation timelines.',
];

const faqs = [
  {
    question: 'What is the biggest vendor risk assessment mistake?',
    answer: 'Applying the same evidence requirements to every vendor. It slows procurement and frustrates auditors. Tiering keeps effort proportional.',
  },
  {
    question: 'How do teams miss incident history?',
    answer: 'They skip explicit questions about past incidents or rely only on sales contacts. Ask for disclosures and check public incident records when risk is higher.',
  },
];

export default function VendorRiskCommonMistakesPage() {
  return (
    <VendorRiskTopicPage
      id="vra-mistakes"
      title="Common Mistakes"
      subtitle="Keep vendor risk assessments lean and defensible by avoiding these common pitfalls."
      description="Avoid the common pitfalls in vendor risk assessments—over-collection, missing subprocessor chains, and weak monitoring."
      faqs={faqs}
    >
      <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">What to avoid</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {mistakes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-brand-600">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">How to stay on track</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Use the triage tool to set tier and cadence before requesting evidence.</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Store one evidence-by-tier list and reuse it for every review.</span></li>
          <li className="flex gap-2"><span className="text-brand-600">•</span><span>Note exceptions with owners and due dates so audits stay clean.</span></li>
        </ul>
      </div>
    </VendorRiskTopicPage>
  );
}
