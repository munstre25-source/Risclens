import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';

export const metadata: Metadata = {
  title: 'SOC 2 Timeline Calculator | RiscLens',
  description: 'Estimate SOC 2 preparation and audit timelines before engaging auditors. Understand readiness stage, Type I vs Type II differences, and factors that accelerate or delay SOC 2.',
};

export default function Soc2TimelinePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
              SOC 2 Timeline Calculator
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
              How long does SOC 2 take? Get a clear view of preparation and audit timelines based on your readiness stage before you talk to an auditor.
            </p>
            <p className="text-sm text-slate-600 mb-8">
              Built to help founders avoid wasted time and budget by understanding realistic SOC 2 timelines upfront.
            </p>
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Check Your Readiness &amp; Timeline
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="mt-4 text-sm text-slate-500">Free • No credit card • Instant results</p>
          </div>
        </section>

        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Readiness stage → timeline ranges</h2>
              <p className="text-slate-700 leading-relaxed">
                Timeline depends on how much is already in place. Use your readiness stage to set expectations.
              </p>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-inside">
                <li>Early-stage: 8–16+ weeks to stand up policies, controls, and evidence.</li>
                <li>Near-ready: 4–8 weeks to close gaps and stabilize evidence collection.</li>
                <li>Audit-ready: 2–4 weeks to prepare evidence packages and engage auditors.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Type I vs Type II timelines</h2>
              <p className="text-slate-700 leading-relaxed">
                Type I validates design of controls at a point in time. Type II validates operation over an observation window.
              </p>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-inside">
                <li>Type I: fastest path; typically 2–6 weeks once controls and evidence are ready.</li>
                <li>Type II: adds 3–12 month observation, plus preparation; longer if evidence quality is inconsistent.</li>
                <li>Most early-stage teams start with Type I to prove control design before moving to Type II.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">What accelerates or delays SOC 2</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-inside">
                <li>Typically, scope clarity and evidence quality drive both timeline and cost.</li>
                <li>Well-documented access control and change management often shorten preparation.</li>
                <li>Delays come from unclear ownership, missing logs, and inconsistent evidence.</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                Use the readiness index to map your current state to a realistic timeline before booking auditor time.
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Estimate My SOC 2 Timeline
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="mt-3 text-sm text-slate-500">Uses the existing readiness assessment—no new inputs required.</p>
            </div>
          </div>
        </section>
      </main>
      <AssessmentCTA />
      <Footer />
    </>
  );
}
