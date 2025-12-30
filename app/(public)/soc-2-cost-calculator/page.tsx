import { Suspense } from 'react';
import { Metadata } from 'next';
import CalculatorForm from '@/components/CalculatorForm';

export const metadata: Metadata = {
  title: 'Free SOC 2 Cost Calculator | Get Your Readiness Score',
  description: 'Calculate your SOC 2 compliance costs in 2 minutes. Get instant readiness score, cost estimates, and a personalized PDF roadmap.',
};

// Loading fallback for the form
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

export default function SOC2CalculatorPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            How Much Will Your SOC 2 Compliance Cost?
          </h1>
          <p className="text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto">
            Get your personalized readiness score and cost estimate in under 2 minutes.
            No credit card required.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<FormSkeleton />}>
            <CalculatorForm />
          </Suspense>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2">500+</div>
              <div className="text-gray-600">Companies Assessed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2">100%</div>
              <div className="text-gray-600">Free Assessment</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2">2 min</div>
              <div className="text-gray-600">Time to Complete</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400 text-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p>&copy; {new Date().getFullYear()} RiscLens. All rights reserved.</p>
          <p className="mt-2">
            Your data is protected and never shared without consent.
          </p>
        </div>
      </footer>
    </main>
  );
}

