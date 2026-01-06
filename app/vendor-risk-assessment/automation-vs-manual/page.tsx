import { Metadata } from 'next';
import { VendorRiskTopicPage } from '@/components/VendorRiskTopicPage';
import { generateTopicMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = generateTopicMetadata(
  'Automation vs Manual Vendor Risk Reviews',
  'Compare automated vendor risk management tools with manual spreadsheet-based reviews. Learn when to scale and how to save time.',
  '/vendor-risk-assessment/automation-vs-manual',
  'Vendor Risk Assessment'
);

const faqs = [
  {
    question: 'When should we move from spreadsheets to automation?',
    answer: 'Once you hit 20+ active vendors or start receiving 5+ new vendor requests per month, manual tracking becomes a bottleneck for procurement and compliance.',
  },
  {
    question: 'Does automation replace human review?',
    answer: 'No. Automation handles data collection, initial scoring, and reminders, but a human must still validate the "residual risk" and approve the vendor.',
  },
];

export default function AutomationVsManualPage() {
  return (
    <VendorRiskTopicPage
      id="auto-vs-manual"
      title="Automation vs Manual Reviews"
      subtitle="Deciding between GRC automation and spreadsheet-based vendor management."
      description="Compare automated vendor risk management tools with manual spreadsheet-based reviews. Learn when to scale and how to save time."
      faqs={faqs}
      leadMagnet={{
        title: "Download the Vendor Risk ROI Calculator",
        description: "Calculate exactly how much time and money your team can save by automating vendor security reviews.",
        buttonText: "Get the Calculator",
        templateId: "vrm-roi",
        resourceName: "VRM ROI Calculator"
      }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <span className="p-1.5 bg-brand-50 text-brand-700 rounded-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            Manual (Spreadsheets)
          </h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-2"><span className="text-green-600">✓</span><span>Zero upfront software cost.</span></li>
            <li className="flex gap-2"><span className="text-green-600">✓</span><span>Complete flexibility in questionnaire design.</span></li>
            <li className="flex gap-2"><span className="text-red-600">✗</span><span>Hard to track "last reviewed" dates at scale.</span></li>
            <li className="flex gap-2"><span className="text-red-600">✗</span><span>Manual email follow-ups for evidence.</span></li>
            <li className="flex gap-2"><span className="text-red-600">✗</span><span>No centralized repository for SOC 2 reports.</span></li>
          </ul>
        </div>

        <div className="border border-brand-100 rounded-xl p-6 bg-brand-50/30 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <span className="p-1.5 bg-brand-100 text-brand-700 rounded-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            Automated (GRC/VRM)
          </h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-2"><span className="text-green-600">✓</span><span>Automated chase-emails for stale evidence.</span></li>
            <li className="flex gap-2"><span className="text-green-600">✓</span><span>Instant scoring based on questionnaire answers.</span></li>
            <li className="flex gap-2"><span className="text-green-600">✓</span><span>Centralized dashboard for auditor review.</span></li>
            <li className="flex gap-2"><span className="text-red-600">✗</span><span>Annual subscription costs ($5k-$20k+).</span></li>
            <li className="flex gap-2"><span className="text-red-600">✗</span><span>Rigid workflows may not fit custom processes.</span></li>
          </ul>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Which path is right for you?</h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          For most startups, the "Hybrid" approach works best: Use risk-based scoring logic to triage vendors (like our <Link href="/vendor-risk-assessment/triage" className="text-brand-700 underline">VRA Triage Tool</Link>), and only invest in heavy automation once your vendor count exceeds your ability to review them manually in 1-2 hours per month.
        </p>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">The Efficiency Test</h4>
          <p className="text-xs text-slate-600 italic">
            "If it takes more than 45 minutes to find a vendor's latest SOC 2 report and check if they've remediated last year's findings, you are losing money on manual labor."
          </p>
        </div>
      </div>
    </VendorRiskTopicPage>
  );
}
