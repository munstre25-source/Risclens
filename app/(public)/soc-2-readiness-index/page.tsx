import { Suspense } from 'react';
import { Metadata } from 'next';
import CalculatorForm from '@/components/CalculatorForm';
import InfoDisclosure from '@/components/InfoDisclosure';

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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
              <p className="text-base font-semibold text-slate-800">What you’ll get</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                <li>Readiness score (0–100) + band (Early-stage / Near-ready / Audit-ready)</li>
                <li>Estimated cost range (auditor + tooling + internal effort)</li>
                <li>Top next steps auditors expect (highest impact first)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
                <p className="text-base font-semibold text-slate-800">What is SOC 2 readiness?</p>
                <p>
                  SOC 2 readiness is a pre-audit assessment used to estimate how prepared a company is for a SOC 2 audit, including likely gaps, cost ranges, and preparation timelines. It is not a certification, an audit opinion, or compliance software.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-base font-semibold text-slate-800">What this is not</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 pb-2">
                  <li>Not a SOC 2 certification or badge</li>
                  <li>Not a CPA audit or attestation</li>
                  <li>Not a replacement for an auditor</li>
                  <li>Not compliance automation software</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <Suspense fallback={<FormSkeleton />}>
              <CalculatorForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}

