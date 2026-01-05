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

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_350px] items-start">
            <div className="space-y-10">
              <div className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  How RiscLens Calculates Your SOC 2 Readiness
                </h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Inputs We Evaluate</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      Our assessment evaluates your organization across dimensions that directly impact audit complexity and preparation effort:
                    </p>
                    <ul className="space-y-3 text-slate-600 list-none pl-0">
                      <li className="flex gap-3">
                        <span className="text-brand-600 font-medium shrink-0">•</span>
                        <span><strong>Company Size & Structure</strong>: Determines documentation scope and control ownership complexity.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-600 font-medium shrink-0">•</span>
                        <span><strong>Data Sensitivity</strong>: Handling PII, financial, or health data increases control requirements (explicitly mapped to CC6.1).</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-600 font-medium shrink-0">•</span>
                        <span><strong>Audit Timeline</strong>: Urgency affects resource allocation—compressed timelines increase preparation costs.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-600 font-medium shrink-0">•</span>
                        <span><strong>Industry Vertical</strong>: Baseline requirements vary significantly for Fintech, Healthcare, and SaaS platforms.</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">How the Readiness Score Is Derived</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      Your score (0–100) is calculated using a <strong>deterministic, rules-based algorithm</strong>—not AI guesswork. Each input maps to explicit weights based on the <strong>AICPA Trust Services Criteria (TSC)</strong> and practical audit experience.
                    </p>
                    <ul className="space-y-3 text-slate-600 list-none pl-0">
                      <li className="flex gap-3">
                        <span className="text-brand-600 font-medium shrink-0">•</span>
                        <span><strong>Readiness Bands</strong>: You are placed into one of four categories: Pre-audit, Early-stage, Near-ready, or Audit-ready.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-600 font-medium shrink-0">•</span>
                        <span><strong>Cost Range</strong>: We provide an estimate that includes auditor fees, internal effort, and tooling costs.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-600 font-medium shrink-0">•</span>
                        <span><strong>Gap Rationale</strong>: For every input, we provide a rationale (e.g., &quot;Handling PHI requires HIPAA-aligned controls&quot;).</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">How to Use These Results</h3>
                    <ul className="space-y-3 text-slate-600 list-none pl-0">
                      <li className="flex gap-3">
                        <span className="text-brand-600 font-medium shrink-0">•</span>
                        <span><strong>Benchmark</strong>: Identify exactly where you sit on the 0-100 readiness scale.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-600 font-medium shrink-0">•</span>
                        <span><strong>Budget</strong>: Use the estimated cost ranges for internal planning and vendor selection.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-600 font-medium shrink-0">•</span>
                        <span><strong>Prioritize</strong>: Focus on the specific &quot;Gaps&quot; identified by the algorithm before engaging an auditor.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <HowItWorksAccordion defaultExpandedOnDesktop={false} />
              <RelatedGuidesRow
                links={[
                  { href: '/soc-2-cost', label: 'SOC 2 Cost guide' },
                  { href: '/soc-2-timeline', label: 'SOC 2 Timeline' },
                  { href: '/penetration-testing/cost-estimator', label: 'Pentest Cost Estimator' },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
