import { Metadata } from 'next';
import { VendorRiskTopicPage } from '@/components/VendorRiskTopicPage';
import { generateTopicMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = generateTopicMetadata(
  'SOC 2 Vendor Oversight Requirements',
  'Understand the specific vendor management controls required for SOC 2 compliance. Learn how to satisfy auditors with your third-party risk program.',
  '/vendor-risk-assessment/soc-2-compliance-requirements',
  'Vendor Risk Assessment'
);

const requirements = [
  {
    title: 'Vendor Inventory',
    description: 'Maintain a complete list of all third-party service providers that could impact the security, availability, or confidentiality of your system.',
  },
  {
    title: 'Risk Assessment (Triage)',
    description: 'A formal process to categorize vendors based on the risk they pose. Not all vendors require the same level of scrutiny.',
  },
  {
    title: 'Due Diligence (Evidence)',
    description: 'Reviewing SOC 2 reports, ISO certifications, or security questionnaires before onboarding a new vendor.',
  },
  {
    title: 'Contractual Protections',
    description: 'Ensuring security requirements, breach notification timelines, and "right to audit" clauses are in your vendor contracts.',
  },
  {
    title: 'Ongoing Monitoring',
    description: 'Reviewing vendor performance and security posture at least annually (or more frequently for high-risk vendors).',
  },
];

const faqs = [
  {
    question: 'Does SOC 2 require a full audit of every vendor?',
    answer: 'No. You must perform "due diligence" proportional to the risk. For a low-risk vendor, a simple questionnaire might suffice. For a critical subprocessor, you likely need to review their latest SOC 2 Type II report.',
  },
  {
    question: 'What if a vendor doesn’t have a SOC 2 report?',
    answer: 'You must use alternative "compensating" evidence, such as a detailed security questionnaire, an ISO 27001 certificate, or a penetration test summary.',
  },
];

export default function Soc2VendorRequirementsPage() {
  return (
    <VendorRiskTopicPage
      id="soc2-vrm-reqs"
      title="SOC 2 Vendor Oversight"
      subtitle="How to build a vendor management program that satisfies SOC 2 auditors."
      description="Understand the specific vendor management controls required for SOC 2 compliance. Learn how to satisfy auditors with your third-party risk program."
      faqs={faqs}
      leadMagnet={{
        title: "SOC 2 Vendor Oversight Checklist",
        description: "A step-by-step guide to meeting SOC 2 Common Criteria for third-party risk management.",
        buttonText: "Download Checklist",
        templateId: "soc2-vrm-checklist",
        resourceName: "SOC 2 Vendor Oversight Checklist"
      }}
    >
      <div className="space-y-6">
        <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">The 5 Core Requirements</h2>
          <div className="grid gap-4">
            {requirements.map((req, index) => (
              <div key={index} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{req.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{req.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Auditor Perspective</h3>
          <p className="text-sm text-slate-700 leading-relaxed italic">
            "Auditors aren't looking for a perfect vendor list—they're looking for a consistent process. If you have 50 vendors, they will sample 3-5 and ask to see the risk score, the evidence review, and the signed contract for each."
          </p>
          <div className="pt-2">
            <Link 
              href="/vendor-risk-assessment/tiering"
              className="text-brand-700 text-sm font-semibold hover:underline flex items-center gap-1"
            >
              Use the Vendor Tiering Tool to standardize your process
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Common Audit "Findings" to Avoid</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-red-500">✗</span>
              <span>"Evidence of review not retained" (e.g., reviewed the SOC 2 but didn't document the findings).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500">✗</span>
              <span>"Expired SOC 2 reports" (e.g., the last review was 18 months ago).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500">✗</span>
              <span>"Missing Complementary User Entity Controls (CUECs)" (e.g., you didn't implement the controls the vendor expects you to).</span>
            </li>
          </ul>
        </div>
      </div>
    </VendorRiskTopicPage>
  );
}
