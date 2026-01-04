import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';

export const metadata: Metadata = {
  title: 'When Do You Need SOC 2? (2026) | RiscLens',
  description: 'How to tell if SOC 2 is a must-have now or something to plan for later. See signals, risks of delay, and a quick self-check before you talk to auditors.',
  openGraph: {
    title: 'When Do You Need SOC 2? (2026) | RiscLens',
    description:
      'How to tell if SOC 2 is a must-have now or something to plan for later. See signals, risks of delay, and a quick self-check before you talk to auditors.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'When Do You Need SOC 2? (2026) | RiscLens',
    description:
      'How to tell if SOC 2 is a must-have now or something to plan for later. See signals, risks of delay, and a quick self-check before you talk to auditors.',
    images: ['/og.png'],
  },
};

export default function WhenDoYouNeedSoc2Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
              When Do You Need SOC 2? (2026)
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
              How to tell if SOC 2 is a must-have now, or something to plan for later.
            </p>
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Your Readiness Score →
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
              <h2 className="text-2xl font-semibold text-slate-900">When SOC 2 becomes required</h2>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-2">
                <li>Enterprise deals with security questionnaires and data protection addendums</li>
                <li>Handling sensitive customer data (PII, financial, health)</li>
                <li>Working with regulated partners (banks, healthcare, payment processors)</li>
                <li>Vendor risk reviews that block onboarding until SOC 2 evidence is provided</li>
                <li>Investor diligence expecting documented controls and evidence</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">When it’s too early</h2>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-2">
                <li>No enterprise pipeline or regulated data flows yet</li>
                <li>Policies and controls not defined or owned</li>
                <li>Logging and access controls not in place</li>
                <li>No capacity to maintain evidence during development sprints</li>
                <li>Unclear system boundaries and data flows</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">If you delay, what breaks</h2>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-2">
                <li>Enterprise deals stall when security reviews start</li>
                <li>Higher cost and rework when controls are rushed</li>
                <li>Data flow and ownership confusion during audits</li>
                <li>Evidence gaps that extend timelines or fail readiness</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Quick self-check</h2>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-2">
                <li>Do you have named owners for access control, change management, and incident response?</li>
                <li>Are MFA, logging, and monitoring enforced on critical systems?</li>
                <li>Do you maintain onboarding/offboarding with timely access removal?</li>
                <li>Can you produce change approvals and testing evidence?</li>
                <li>Are vendor risks reviewed and data flows documented?</li>
                <li>Do you have an incident response playbook and escalation path?</li>
                <li>Is evidence stored consistently, not scattered across tools?</li>
                <li>Do you know whether Type I or Type II fits your stage?</li>
              </ul>
            </div>

            <div className="text-center space-y-3">
              <p className="text-slate-700 leading-relaxed">
                Get your readiness band to see if SOC 2 is a must-have now or a planned milestone.
              </p>
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Your Readiness Score →
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-sm text-slate-500">Free • No credit card • Instant results</p>
            </div>

            <div className="bg-white/70 border border-slate-200 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-800">Trust &amp; privacy</p>
              <ul className="list-disc list-inside text-sm text-slate-600 leading-relaxed space-y-1">
                <li>Free, no sales calls</li>
                <li>Answers used only to calculate your score (email optional)</li>
                <li>Estimates are planning guidance, not audit advice</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-800">Related guides</p>
              <div className="flex flex-wrap gap-3 text-sm text-brand-700">
                <Link href="/soc-2-cost" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 Cost
                </Link>
                <Link href="/soc-2-timeline" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 Timeline
                </Link>
                <Link href="/soc-2-type-i-vs-type-ii" className="underline underline-offset-2 hover:text-brand-800">
                  Type I vs Type II
                </Link>
                <Link href="/soc-2-readiness/saas" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 for SaaS
                </Link>
                <Link href="/soc-2-readiness/fintech" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 for Fintech
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AssessmentCTA />
      <Footer />
    </>
  );
}
