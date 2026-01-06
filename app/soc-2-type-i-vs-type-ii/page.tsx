import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';

export const metadata: Metadata = {
  title: 'SOC 2 Type I vs Type II: Which is right for you? | RiscLens',
  description: 'Understand the core differences between SOC 2 Type I (point-in-time) and Type II (6-12 month window). Map your sales needs to audit timelines.',
};

export default function Soc2TypeComparisonPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'SOC 2', href: '/soc-2' }, { label: 'Type I vs Type II' }]} />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-14 text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
              SOC 2 Type I vs Type II Readiness
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
              Decide which audit type you’re realistically ready for—before you commit to Type I or Type II.
            </p>
            <p className="text-sm text-slate-600 mb-8">
              Built for early-stage teams who need a clear path without overcommitting to audit scope or timelines.
            </p>
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Check My SOC 2 Readiness
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="mt-4 text-sm text-slate-500">Free • No credit card • Business email required</p>
          </div>
        </section>

        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Plain-English comparison</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-inside">
                <li>Type I: point-in-time validation of control design and documentation.</li>
                <li>Type II: design + operating effectiveness over an observation window.</li>
                <li>Scope expands with systems, data sensitivity, and evidence quality expectations.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Timeline and cost implications</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-inside">
                <li>Type I: faster; typically 2–6 weeks once controls and evidence are ready.</li>
                <li>Type II: adds 3–12 month observation; higher effort and audit fees.</li>
                <li>Typically, scope and evidence quality drive both timeline and cost.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Common early-stage mistakes</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-inside">
                <li>Attempting Type II before controls and evidence are stable.</li>
                <li>Underestimating internal preparation time for evidence quality.</li>
                <li>Ignoring scope clarity—more systems and data types expand audit effort.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">When each type makes sense</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-inside">
                <li>Type I: proving control design quickly for enterprise buyers or early diligence.</li>
                <li>Type II: demonstrating operating effectiveness once controls, logs, and evidence are consistent.</li>
                <li>Most early-stage teams start with Type I, then plan Type II once operations are repeatable.</li>
              </ul>
            </div>

              <div className="text-center">
                <Link
                  href="/soc-2-readiness-calculator"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  See My Type I vs Type II Readiness
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="mt-3 text-sm text-slate-500">Uses the existing readiness assessment—no new inputs required.</p>
              </div>

              <RelatedGuidesRow
                links={[
                  { href: '/soc-2-readiness-checklist', label: 'SOC 2 Checklist' },
                  { href: '/soc-2-evidence', label: 'Evidence Vault' },
                  { href: '/soc-2-cost', label: 'SOC 2 Cost' },
                  { href: '/soc-2-timeline', label: 'SOC 2 Timeline' },
                  { href: '/vendor-risk-assessment', label: 'Vendor Risk Hub' },
                ]}
                className="mt-12"
              />
            </div>
          </section>
        </main>

      <AssessmentCTA />
      <Footer />
    </>
  );
}
