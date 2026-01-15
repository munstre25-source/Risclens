import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Penetration Testing Retesting & Remediation | RiscLens',
  description:
    'How to close pen test findings quickly: remediation playbook, evidence expectations, and retest best practices.',
  alternates: { canonical: 'https://risclens.com/penetration-testing/retesting-remediation' },
};

const steps = [
  { title: 'Triage & ownership', bullets: ['Assign an owner per finding immediately; log risk rating and deadline.', 'Clarify repro steps with the tester; avoid guessing root cause.', 'Group related findings (e.g., auth controls) to fix systematically.'] },
  { title: 'Fix & verify', bullets: ['Patch, configure, or redesign with least-privilege in mind.', 'Add tests (unit/integration) to prevent regressions.', 'Capture evidence: configs, logs, screenshots, or test output.'] },
  { title: 'Retest', bullets: ['Schedule retest window; provide exact repro steps and expected result.', 'Use the same accounts/endpoints used in the initial test.', 'Track pass/fail per finding; request updated report.'] },
];

export default function RetestingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Penetration Testing</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">Pen Test Retesting & Remediation</h1>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              Close findings fast with clear ownership, crisp evidence, and a predictable retest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Link
                href="/penetration-testing/cost-estimator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Run the cost estimator
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/penetration-testing/report" className="text-sm text-brand-700 underline underline-offset-4">
                See reporting expectations →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.title} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-3">
                  <h2 className="text-lg font-semibold text-slate-900">{step.title}</h2>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-brand-600">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Evidence that speeds retests</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Config diffs or code commits tied to the finding.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Logs/screenshots showing the exploit no longer works.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Automated tests added to prevent regression.</span></li>
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Avoid these delays</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Unclear fixes or missing repro steps in the retest request.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>No test accounts or environment access when retest starts.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Scope creep—new changes deployed mid-retest.</span></li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Set expectations up front</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Agree on retest window, number of cycles, and included findings.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Decide on what “pass” means per finding (e.g., mitigation vs full fix).</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Capture the updated report; share with security questionnaires as needed.</span></li>
                </ul>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-slate-700 leading-relaxed">
                Retests move faster when fixes are verified, evidence is ready, and scope is clear.
              </p>
              <Link
                href="/penetration-testing/cost-estimator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Run the cost estimator
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
