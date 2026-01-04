import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import CalculatorForm from '@/components/CalculatorForm';
import InfoDisclosure from '@/components/InfoDisclosure';
import DefinitionCallout from '@/components/DefinitionCallout';
import { HowItWorksButton } from '@/components/HowItWorksButton';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Score in Under 2 Minutes | RiscLens',
  description:
    'Answer a few questions and get an instant SOC 2 readiness score, gap highlights, and what auditors will likely ask next—built for early-stage teams.',
  openGraph: {
    title: 'SOC 2 Readiness Score in Under 2 Minutes | RiscLens',
    description:
      'Answer a few questions and get an instant SOC 2 readiness score, gap highlights, and what auditors will likely ask next—built for early-stage teams.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Readiness Score in Under 2 Minutes | RiscLens',
    description:
      'Answer a few questions and get an instant SOC 2 readiness score, gap highlights, and what auditors will likely ask next—built for early-stage teams.',
    images: ['/og.png'],
  },
  robots: {
    index: false,
    follow: false,
  },
};

function FormSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="h-12 bg-gray-300 rounded mt-6"></div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <main className="bg-gray-50">
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-4">
          <div className="text-center text-sm text-slate-600">Free • No credit card • No sales calls</div>
          <div className="text-center text-xs text-brand-700">
            <Link href="/penetration-testing/for-soc-2" className="underline underline-offset-4 hover:text-brand-800">
              Related: Penetration Testing for SOC 2
            </Link>
          </div>
          <div className="text-center text-xs text-brand-700">
            <Link href="/vendor-risk-assessment" className="underline underline-offset-4 hover:text-brand-800">
              Related: Vendor Risk Assessment
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="#calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm transition"
            >
              Get Readiness Score
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <HowItWorksButton />
          </div>
          <div id="calculator" className="rounded-2xl border border-slate-200 bg-white p-6">
            <Suspense fallback={<FormSkeleton />}>
              <CalculatorForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="border border-slate-200 rounded-2xl bg-white p-6 md:p-7 space-y-3" id="how-it-works">
            <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
              <li>Answer quick questions about access, change, vendors, and policies to get a readiness score.</li>
              <li>See highlighted gaps with suggested evidence so you can prep before auditors or buyers ask.</li>
              <li>Share the results with owners to prioritize fixes and rerun to track progress.</li>
            </ol>
            <p className="text-xs text-slate-500">Guidance only—confirm with your auditor and security team.</p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-3">
          <p className="text-sm font-semibold text-slate-900">Related concepts</p>
          <div className="grid gap-4 md:grid-cols-2">
            <DefinitionCallout
              title="Penetration testing"
              description="Penetration testing is a time-boxed security assessment where a qualified tester simulates real attacks to identify and validate exploitable weaknesses in an application, API, network, or cloud environment. It helps teams prioritize fixes based on real-world impact, not just theoretical findings."
              href="/penetration-testing/for-soc-2"
            />
            <DefinitionCallout
              title="Vendor risk assessment"
              description="A vendor risk assessment (VRA) evaluates a third-party provider’s security and operational risk before sharing data or granting access. It typically includes a questionnaire, evidence review (e.g., SOC 2/ISO), and a risk rating that determines required controls and reassessment frequency."
              href="/vendor-risk-assessment"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
