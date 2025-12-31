import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import CalculatorForm from '@/components/CalculatorForm';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Index | Free Assessment',
  description: 'Get your SOC 2 readiness score and cost estimate in under 2 minutes. Built for early-stage companies preparing for their first audit.',
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
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900 hover:text-brand-600 transition-colors">
            ← RiscLens
          </Link>
        </div>
      </header>

      {/* Calculator Section - Starts immediately */}
      <section className="py-8 lg:py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<FormSkeleton />}>
            <CalculatorForm />
          </Suspense>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <p>© {new Date().getFullYear()} RiscLens</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-gray-700">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-700">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

