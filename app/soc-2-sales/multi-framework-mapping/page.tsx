import { Metadata } from 'next';
import { SalesTopicPage } from '@/components/SalesTopicPage';
import { generateTopicMetadata } from '@/lib/seo';

export const metadata: Metadata = generateTopicMetadata(
  'SOC 2 to HIPAA & ISO 27001: Multi-Framework Mapping',
  'How to leverage your SOC 2 audit to achieve 80% readiness for HIPAA and ISO 27001 with cross-framework mapping.',
  '/soc-2-sales/multi-framework-mapping',
  'SOC 2 Sales Hub'
);

const faqs = [
  {
    question: "Does SOC 2 count as ISO 27001?",
    answer: "No, but they share about 80% of the same controls. If you have a solid SOC 2, you have already done most of the technical work for ISO 27001. The main difference is ISO's focus on a 'Management System' (ISMS)."
  },
  {
    question: "How do I add HIPAA to my SOC 2?",
    answer: "You can add the HIPAA 'Security Rule' requirements as an additional set of Trust Services Criteria to your SOC 2 audit. This results in a 'SOC 2 + HIPAA' report."
  },
  {
    question: "Can I use the same evidence for multiple audits?",
    answer: "Absolutely. A single screenshot of your MFA configuration can serve as evidence for SOC 2, ISO 27001, HIPAA, and GDPR. This 'collect once, use many' approach is the key to scaling compliance."
  }
];

export default function MultiFrameworkMappingPage() {
  return (
    <SalesTopicPage
      id="mapping"
      title="The 80% Compliance Shortcut"
      subtitle="If you have SOC 2, you are already 80% of the way to ISO 27001 and HIPAA. Learn how to map your controls and scale your compliance program without doubling the work."
      category="Scale Topics"
      faqs={faqs}
    >
      <div className="bg-brand-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">The Mapping Math</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
              <div className="text-3xl font-bold mb-1">80%</div>
              <div className="text-xs uppercase tracking-wider text-brand-200">Overlap with ISO 27001</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
              <div className="text-3xl font-bold mb-1">90%</div>
              <div className="text-xs uppercase tracking-wider text-brand-200">Overlap with HIPAA</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
              <div className="text-3xl font-bold mb-1">75%</div>
              <div className="text-xs uppercase tracking-wider text-brand-200">Overlap with GDPR</div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">How to Leverage SOC 2 for Other Standards</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-brand-600">ISO</span>
              ISO 27001 Strategy
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Focus on building your **Information Security Management System (ISMS)**. This includes high-level policies, internal audit processes, and management reviews that SOC 2 doesn't always go deep on.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-brand-600">H</span>
              HIPAA Strategy
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Add the **Privacy** and **Confidentiality** Trust Service Criteria to your SOC 2 audit. This covers the vast majority of the HIPAA Security Rule and some of the Privacy Rule.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="font-semibold text-slate-900 mb-4 text-lg">Action Plan for Founders</h3>
        <ul className="space-y-4">
          <li className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">1</div>
            <p className="text-slate-700 font-medium">Map once, audit many.</p>
          </li>
          <li className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">2</div>
            <p className="text-slate-700 font-medium">Use a GRC tool to link one piece of evidence to multiple framework controls.</p>
          </li>
          <li className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">3</div>
            <p className="text-slate-700 font-medium">When hiring an auditor, ask if they can perform a 'Consolidated Audit' for multiple frameworks at once.</p>
          </li>
        </ul>
      </div>
    </SalesTopicPage>
  );
}
