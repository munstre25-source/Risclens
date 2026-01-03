import { Suspense } from 'react';
import { Metadata } from 'next';
import CalculatorForm from '@/components/CalculatorForm';

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
    <main className="min-h-screen bg-gray-50">
      <section className="py-8 lg:py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-lg font-medium text-slate-900">Get a SOC 2 readiness score + cost range in under 2 minutes.</p>
            <p className="text-base text-slate-700 mt-1">See what to fix first before you talk to an auditor.</p>
            <p className="text-sm text-slate-600 mt-2">This is not a certification, audit, or compliance software. It’s a readiness assessment.</p>
          </div>
          <div className="bg-white/70 border border-slate-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-slate-700 mb-2">What you’ll get</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
              <li>Readiness score (0–100) + band (Early-stage / Near-ready / Audit-ready)</li>
              <li>Estimated cost range (auditor + tooling + internal effort)</li>
              <li>Top next steps auditors expect (highest impact first)</li>
            </ul>
          </div>
          <Suspense fallback={<FormSkeleton />}>
            <CalculatorForm />
          </Suspense>
          <div className="mt-6 bg-white/70 border border-slate-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-800 mb-2">Trust &amp; privacy</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
              <li>Why free? Built to help early-stage teams understand SOC 2 without sales pressure. No sales calls.</li>
              <li>What happens to my answers? Used only to calculate your score. You can complete it without email.</li>
              <li>Reliability: Estimates are directional ranges based on common SOC 2 readiness patterns. Use as planning guidance, not audit advice.</li>
            </ul>
            <p className="text-sm text-slate-600 mt-3">
              About: Built by the RiscLens team (contact: reports@risclens.com). Independent SOC 2 readiness project. See <a href="/terms" className="underline underline-offset-2 text-brand-700 hover:text-brand-800">Terms</a> and <a href="/privacy" className="underline underline-offset-2 text-brand-700 hover:text-brand-800">Privacy</a>. No lock-in.
            </p>
          </div>
          <div className="mt-6 bg-white/70 border border-slate-200 rounded-lg p-4">
            <p className="text-sm font-medium text-slate-700 mb-2">Your data &amp; privacy</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
              <li>Inputs are not sold or shared</li>
              <li>Responses are used only to calculate your score</li>
              <li>You can complete the assessment without providing an email</li>
              <li>Aggregated, anonymous data may be used to improve estimates</li>
            </ul>
          </div>
          <div className="mt-4 text-sm text-slate-600">
            About RiscLens — Independent SOC 2 readiness project built to help early-stage teams understand audit expectations, costs, and gaps without sales pressure or lock-in. Contact: reports@risclens.com.
          </div>
        </div>
      </section>
    </main>
  );
}

