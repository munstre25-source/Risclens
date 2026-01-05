import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TimelineEstimator } from '@/components/calculators/TimelineEstimator';

export const metadata: Metadata = {
  title: 'SOC 2 Timeline Estimator | RiscLens',
  description: 'Calculate exactly how long it will take to get your SOC 2 report. Get a custom roadmap based on your company size, cloud maturity, and audit type.',
};

export default function Soc2TimelineEstimatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              SOC 2 Timeline Estimator
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Stop guessing. Get a realistic estimate of your journey to compliance and a step-by-step roadmap to get there.
            </p>
          </div>

          <TimelineEstimator />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phase 1: Planning</h3>
              <p className="text-gray-600 text-sm">Define scope, identify gaps, and select your Trust Services Criteria. Crucial for a smooth audit.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phase 2: Remediation</h3>
              <p className="text-gray-600 text-sm">The "heavy lifting" phase where you implement controls, write policies, and fix security gaps.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phase 3: Audit</h3>
              <p className="text-gray-600 text-sm">Working with your CPA firm to verify controls. Includes fieldwork, testing, and final reporting.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
