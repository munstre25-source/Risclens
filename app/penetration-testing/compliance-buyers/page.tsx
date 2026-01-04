import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Penetration Testing for Compliance Buyers | RiscLens',
  description:
    'How to scope pen tests for SOC 2/ISO/HIPAA buyers: evidence expectations, reporting format, and what security reviewers want.',
  alternates: { canonical: '/penetration-testing/compliance-buyers' },
};

const needs = [
  { title: 'SOC 2 / ISO reviewers want', bullets: ['Clear scope: apps/APIs/cloud; include auth paths and third-party components.', 'Proof of remediation or retest for high/critical findings.', 'Report with CVSS/likelihood, business impact, and reproducible steps.'] },
  { title: 'Evidence to keep', bullets: ['Final report (sanitized if needed) and retest letter.', 'Tickets showing remediation and dates.', 'Screenshots/logs demonstrating the exploit is closed.'] },
  { title: 'Common blockers', bullets: ['Report missing repro steps or impact narrative.', 'No retest or unresolved critical findings.', 'Scope doesn’t match what security questionnaires ask about.'] },
];

export default function ComplianceBuyersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Penetration Testing</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">Pen Testing for Compliance Buyers</h1>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              Scope and deliverables that satisfy SOC 2 / ISO security reviewers without slowing deals.
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
            <div className="grid gap-4 md:grid-cols-3">
              {needs.map((item) => (
                <div key={item.title} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-3">
                  <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-brand-600">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Scope checklist</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Apps/APIs with auth flows, multi-tenant boundaries, and rate limits.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Cloud config (IAM, networking, storage) for critical data paths.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>3rd-party components that handle sensitive data (subprocessors).</span></li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Reporting expectations</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Findings with repro, impact, likelihood, and business context.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Evidence of remediation or retest for critical/high issues.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Statement that scope and tests align to SOC 2/ISO expectations.</span></li>
                </ul>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-slate-700 leading-relaxed">
                Compliance buyers want fit-for-purpose scope, clear reports, and proof you closed the gaps. Set that up at intake and retest.
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
