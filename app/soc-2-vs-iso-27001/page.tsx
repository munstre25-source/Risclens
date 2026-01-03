import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';

export const metadata: Metadata = {
  title: 'SOC 2 vs ISO 27001: Readiness, Cost, and Timing | RiscLens',
  description:
    'Compare SOC 2 and ISO 27001: what each signals to buyers, readiness effort, cost and timeline differences, and when SOC 2 should come first.',
};

export default function Soc2VsIsoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-22 text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
              SOC 2 vs ISO 27001: Readiness, Cost, and Timing
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
              How to decide which framework makes sense first.
            </p>
            <p className="text-sm text-slate-600 mb-8">
              A practical comparison for teams selling in the US vs globally, balancing speed to signal with depth of control coverage.
            </p>
            <Link
              href="/soc-2-readiness-index"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Your Readiness Score →
            </Link>
            <p className="mt-4 text-sm text-slate-500">Free • No credit card • Instant results</p>
          </div>
        </section>

        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">What each framework signals to buyers</h2>
              <p className="text-slate-700 leading-relaxed">
                SOC 2 is widely recognized in the US for B2B SaaS; ISO 27001 signals globally and is often expected in regulated or international deals.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>SOC 2: Common ask for US enterprise security questionnaires.</li>
                <li>ISO 27001: Strong for global buyers, data processors, and partners with EU/UK footprints.</li>
                <li>Both focus on controls and evidence; scope and audience differ.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Readiness effort comparison</h2>
              <p className="text-slate-700 leading-relaxed">
                Both require clear ownership, policies, and evidence. ISO 27001 adds an ISMS and risk management formality.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>SOC 2: Emphasis on access, change, vendor risk, and evidence cadence.</li>
                <li>ISO 27001: Adds Statement of Applicability, risk treatment plans, and ISMS governance.</li>
                <li>People/process: similar control owners; ISO 27001 expects more formal documentation.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Timeline and cost differences at early stage</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>SOC 2 Type I can land faster (weeks) once controls are in place; Type II adds observation.</li>
                <li>ISO 27001 typically takes longer due to ISMS setup and certification prep.</li>
                <li>Cost drivers: scope clarity, evidence quality, and observation period length for either path.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">When SOC 2 is the better first move</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                <li>US-first customer base that asks for SOC 2 in questionnaires.</li>
                <li>Need a near-term signal (Type I) to unlock deals before a longer observation window.</li>
                <li>Smaller team that wants to build evidence cadence before formal ISMS overhead.</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                Use the readiness index to decide if SOC 2 now and ISO 27001 later is the right sequencing for your pipeline.
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/soc-2-readiness-index"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Your Readiness Score →
              </Link>
              <p className="mt-3 text-sm text-slate-500">Free • No credit card • Instant results</p>
            </div>

            <div className="bg-white/70 border border-slate-200 rounded-lg p-4 space-y-2">
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
