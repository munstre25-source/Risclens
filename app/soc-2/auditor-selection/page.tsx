import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'How to Choose a SOC 2 Auditor | RiscLens',
  description:
    'Practical guide to selecting a SOC 2 auditor: scope fit, evidence expectations, pricing signals, and how to avoid rework.',
  alternates: { canonical: 'https://risclens.com/soc-2/auditor-selection' },
};

const criteria = [
  { title: 'Scope fit', points: ['Similar size and stack (cloud-first, SaaS, API), not just any SOC 2 logo.', 'Experience with your industry data types (PII/financial/health).', 'Understands your control boundary (product vs corporate IT).'] },
  { title: 'Evidence expectations', points: ['Ask for sample requests by control area; check reasonableness vs your evidence vault.', 'Confirm how they handle redactions and de-identification.', 'Clarify observation window for Type II and acceptable sample sizes.'] },
  { title: 'Process and tooling', points: ['Portal quality and response times.', 'Frequency of check-ins; escalation path for blockers.', 'Retest policy for exceptions and remediation evidence.'] },
  { title: 'Pricing and terms', points: ['Fixed vs time-and-material; what changes price (scope, readiness, timeline).', 'Rescheduling and delay fees; retest fees.', 'Multi-year incentives vs lock-in risk.'] },
];

export default function AuditorSelectionPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">SOC 2 Guides</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">How to Choose a SOC 2 Auditor</h1>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              Scope fit, evidence expectations, and pricing signals to avoid rework and delays.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get your readiness score
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/soc-2-cost" className="text-sm text-brand-700 underline underline-offset-4">
                See SOC 2 cost →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="grid gap-4 md:grid-cols-2">
              {criteria.map((item) => (
                <div key={item.title} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-3">
                  <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-brand-600">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Questions to ask before you sign</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>“Show me sample evidence requests for access, change, logging, IR.”</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>“What triggers scope change and price changes?”</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>“How do you handle exceptions, retests, and remediation evidence?”</span></li>
                <li className="flex gap-2"><span className="text-brand-600">•</span><span>“Who will be on my engagement? How many Type II SaaS audits have they led?”</span></li>
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Red flags</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>No sample requests; “we’ll see during fieldwork.”</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Unclear on Type I vs Type II effort or observation window.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Heavy change fees for minor scope adjustments.</span></li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Good signals</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Clear evidence checklist and timelines up front.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Experience with your stack (cloud infra, CI/CD, SaaS) and data types.</span></li>
                  <li className="flex gap-2"><span className="text-brand-600">•</span><span>Practical guidance on sampling and retests to avoid rework.</span></li>
                </ul>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-slate-700 leading-relaxed">
                Pick an auditor who matches your scope, shows evidence expectations up front, and keeps retests predictable.
              </p>
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get your readiness score
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
