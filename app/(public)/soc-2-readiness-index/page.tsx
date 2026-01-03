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
          <Suspense fallback={<FormSkeleton />}>
            <CalculatorForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

