import { Suspense } from 'react';
import { Metadata } from 'next';
import CalculatorForm from '@/components/CalculatorForm';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Index (2026) | Free Score & Budget Range',
  description: 'Instant SOC 2 readiness score with a budget range and next steps. Built for teams preparing their 2026 audit.',
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

