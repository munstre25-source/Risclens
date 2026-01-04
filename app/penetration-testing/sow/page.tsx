import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Penetration Testing SOW Template | RiscLens',
  description: 'Scope, deliverables, and clauses for a clean pen test SOW. Avoid rework and get actionable findings.',
  alternates: { canonical: '/penetration-testing/sow' },
};

const sections = [
  { title: 'Scope definition', items: ['In-scope assets (apps, APIs, cloud, network) with URLs/IP ranges.', 'Authentication flows and test accounts; MFA/SSO notes.', 'Data sensitivity, third-party dependencies, and change freeze windows.'] },
  { title: 'Methodology & rules of engagement', items: ['Testing windows and expected noise levels.', 'Exploitation depth (read-only vs proof-of-concept) and social engineering in/out of scope.', 'Rate limits, safe list configuration, and kill switch contacts.'] },
  { title: 'Deliverables', items: ['Executive summary + technical report with CVSS/likelihood + remediation.', 'Evidence for each finding (repro steps, screenshots, payloads).', 'Retest window and what evidence is required to close findings.'] },
  { title: 'Legal & compliance clauses', items: ['Data handling and retention (where reports and evidence live, how long).', 'Liability caps and breach notification triggers.', 'Right to share a sanitized report with customers (as allowed).'] },
];

export default function PenTestSOWPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Penetration Testing</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">Penetration Testing SOW Template</h1>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              Lock in scope, deliverables, and ROE so your pen test finishes on time and produces actionable findings.
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
              <Link href="/penetration-testing/pricing" className="text-sm text-brand-700 underline underline-offset-4">
                See pricing signals →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="grid gap-4 md:grid-cols-2">
              {sections.map((section) => (
                <div key={section.title} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-3">
                  <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-brand-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Clauses that prevent rework</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Retest window and criteria for closure included in base price.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Clear findings format: repro, impact, likelihood, fix.</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>Escalation path for blockers and out-of-scope issues discovered.</span></li>
              </ul>
            </div>

            <div className="text-center space-y-3">
              <p className="text-slate-700 leading-relaxed">
                A good SOW removes surprises: scope, evidence, and retest expectations are clear before testing starts.
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
