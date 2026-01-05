import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { salesGuides, salesGuideBySlug } from '@/lib/soc2Guides';

const slug = 'qualified-opinions';
const page = salesGuideBySlug[slug];

export const metadata: Metadata = {
  title: 'Qualified Opinions: What Happens if Your SOC 2 "Fails" | RiscLens',
  description: 'Understanding audit exceptions, qualified opinions, and how to explain them to enterprise buyers.',
};

const faqs = [
  {
    question: "Is a Qualified Opinion the same as failing an audit?",
    answer: "There is no 'pass/fail' in SOC 2, but a 'Qualified' opinion is the closest thing to it. it means the auditor found significant flaws in your controls that prevent them from saying your system is fully secure."
  },
  {
    question: "Will a Qualified Opinion kill my deals?",
    answer: "Not necessarily. Most enterprise buyers care more about your 'Management Response'—how you explain the flaw and what you are doing to fix it—than the exception itself."
  },
  {
    question: "What is an Exception?",
    answer: "An exception is a single instance of a control failing (e.g., one employee didn't sign their NDA). Many exceptions are common and result in an 'Unqualified' (clean) opinion if they aren't pervasive."
  }
];

export default function QualifiedOpinionsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <Script id="faq-qualified" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <Header />
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">Technical Nuance</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">The "Failed Audit" Guide</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              What happens if an auditor finds a flaw in your controls? Learn the difference between exceptions and qualified opinions, and how to stay in the deal.
            </p>
            <div className="flex justify-center">
              <AssessmentCTA />
            </div>
          </div>
        </section>

        <section className="bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4 font-bold">1</div>
                <h3 className="font-bold text-slate-900 mb-2">Unqualified</h3>
                <p className="text-sm text-slate-600">The "Clean" report. The auditor agrees your controls worked as intended during the period.</p>
              </div>
              <div className="p-5 rounded-xl border border-brand-200 bg-brand-50 shadow-sm ring-1 ring-brand-500">
                <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-4 font-bold">2</div>
                <h3 className="font-bold text-slate-900 mb-2">Qualified</h3>
                <p className="text-sm text-slate-600">The "Flawed" report. The auditor found a material weakness in one or more areas.</p>
              </div>
              <div className="p-5 rounded-xl border border-red-200 bg-red-50 shadow-sm">
                <div className="w-10 h-10 bg-red-100 text-red-700 rounded-full flex items-center justify-center mb-4 font-bold">3</div>
                <h3 className="font-bold text-slate-900 mb-2">Adverse</h3>
                <p className="text-sm text-slate-600">The "Failed" report. Pervasive failures across the entire system. Extremely rare.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">How to Handle an Audit Exception</h2>
              <p className="text-slate-700 leading-relaxed">
                An exception is just a data point (e.g., "1 out of 25 employees sampled did not complete training"). If you have an exception, you should write a **Management Response** directly in the SOC 2 report.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4 text-lg">The "Management Response" Template</h3>
                <div className="bg-white border border-slate-200 rounded p-4 font-mono text-xs text-slate-800">
                  "Management acknowledges the exception regarding [Control Name]. This was due to [Root Cause]. To remediate this, we have [Corrective Action Taken]. We have since updated our [Policy/Process] to ensure this does not recur."
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Action Plan for Founders</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">1</div>
                  <p className="text-slate-700"><span className="font-bold">Don't Panic:</span> A single exception rarely kills a deal if you have a clear remediation plan.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">2</div>
                  <p className="text-slate-700"><span className="font-bold">Draft Your Response:</span> Work with your auditor to ensure your management response is professional and forward-looking.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">3</div>
                  <p className="text-slate-700"><span className="font-bold">Brief Sales:</span> Ensure your sales team knows how to pivot the conversation to your remediation efforts if a customer notices the exception.</p>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-5">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <p className="font-bold text-slate-900 mb-2">{faq.question}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              <Link href="/soc-2-sales" className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-2 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Sales Hub
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
