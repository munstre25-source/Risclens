import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SOC 2 Cost Breakdown (2026) | RiscLens',
  description: 'See where SOC 2 budget really goes: auditor fees, tooling, internal effort, and how urgency changes cost. Get planning guidance before you engage auditors.',
  openGraph: {
    title: 'SOC 2 Cost Breakdown (2026) | RiscLens',
    description:
      'See where SOC 2 budget really goes: auditor fees, tooling, internal effort, and how urgency changes cost. Get planning guidance before you engage auditors.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost Breakdown (2026) | RiscLens',
    description:
      'See where SOC 2 budget really goes: auditor fees, tooling, internal effort, and how urgency changes cost. Get planning guidance before you engage auditors.',
    images: ['/og.png'],
  },
};

export default function Soc2CostBreakdownPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
              SOC 2 Cost Breakdown (2026)
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
              Where SOC 2 budget really goes: auditor fees, tooling, and internal effort.
            </p>
            <Link
              href="/soc-2-readiness-index"
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
              <h2 className="text-2xl font-semibold text-slate-900">SOC 2 cost components</h2>
              <p className="text-slate-700 leading-relaxed">
                Budget spans external auditor fees, tooling, and internal effort. Urgency and scope change the mix.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-base font-semibold text-slate-800">Auditor fees</p>
                <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1">
                  <li>Driven by scope (systems, criteria), observation window, and evidence quality.</li>
                  <li>Type I vs Type II and how much hand-holding you need influence pricing.</li>
                </ul>
              </div>
              <div>
                <p className="text-base font-semibold text-slate-800">Tooling</p>
                <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1">
                  <li>Helps automate evidence and logging; optional if controls are already mature.</li>
                  <li>Costs vary by seat and integration depth; evidence quality matters more than tool count.</li>
                </ul>
              </div>
              <div>
                <p className="text-base font-semibold text-slate-800">Internal effort</p>
                <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1">
                  <li>Engineering and operations time to stabilize access controls, logging, and change records.</li>
                  <li>Preparation time is often underestimated; ownership clarity reduces churn.</li>
                </ul>
              </div>
              <div>
                <p className="text-base font-semibold text-slate-800">Timeline compression</p>
                <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1">
                  <li>Urgent timelines increase cost; auditors charge for acceleration and gaps create rework.</li>
                  <li>Typically, scope clarity and evidence quality drive both timeline and cost.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">How to reduce cost without cutting corners</h2>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-2">
                <li>Lock down access control and change management to avoid scope creep and rework.</li>
                <li>Clarify systems and data flows so auditors price accurately.</li>
                <li>Stabilize evidence collection before asking for Type II.</li>
                <li>Use tooling where it improves evidence quality, not just to add dashboards.</li>
                <li>Sequence policies and controls in line with what auditors actually test.</li>
              </ul>
            </div>

            <div className="text-center space-y-3">
              <p className="text-slate-700 leading-relaxed">
                Use the readiness assessment to get a tailored cost range tied to your scope and timeline.
              </p>
              <Link
                href="/soc-2-readiness-index"
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
      <Footer />
    </>
  );
}
