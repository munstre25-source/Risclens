import { Suspense } from 'react';
import { Metadata } from 'next';
import CalculatorForm from '@/components/CalculatorForm';
import { HowItWorksAccordion } from '@/components/HowItWorksAccordion';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { SoftwareApplicationSchema } from '@/components/SoftwareApplicationSchema';

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
      <SoftwareApplicationSchema
        name="SOC 2 Readiness Calculator"
        description="Get an instant SOC 2 readiness score and gap analysis."
        url="https://risclens.com/soc-2-readiness-calculator"
        category="SecurityApplication"
      />
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-4">
          <div id="calculator" className="rounded-2xl border border-slate-200 bg-white p-6">
            <Suspense fallback={<FormSkeleton />}>
              <CalculatorForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-6">
          <HowItWorksAccordion />
          <RelatedGuidesRow
            links={[
              { href: '/soc-2-cost', label: 'SOC 2 Cost guide' },
              { href: '/soc-2-timeline', label: 'SOC 2 Timeline' },
              { href: '/penetration-testing/cost-estimator', label: 'Pentest Cost Estimator' },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
