import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorForm from '@/components/CalculatorForm';
import ReadinessNav from '@/components/ReadinessNav';
import { HowItWorksAccordion } from '@/components/HowItWorksAccordion';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { ContextualSignals } from '@/components/compliance/ContextualSignals';
import { SoftwareApplicationSchema } from '@/components/SoftwareApplicationSchema';
import { messaging } from '@/src/content/messaging';

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
  alternates: {
    canonical: 'https://risclens.com/soc-2-readiness-calculator',
  },
  robots: {
    index: true,
    follow: true,
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

interface PageProps {
  searchParams: Promise<{ framework?: string }>;
}

export default async function CalculatorPage({ searchParams }: PageProps) {
  const { framework = 'soc2' } = await searchParams;
  const isIso27001 = framework === 'iso27001';
  const isIso42001 = framework === 'iso42001';

  const heroContent = isIso27001 
    ? messaging.iso27001Readiness.hero 
    : isIso42001 
      ? messaging.iso42001Calculator.hero 
      : messaging.readinessCalculator.hero;

  const frameworkName = isIso27001 ? 'ISO 27001' : isIso42001 ? 'ISO 42001' : 'SOC 2';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <SoftwareApplicationSchema
          name={`${frameworkName} Readiness Calculator`}
          description={`Get an instant ${frameworkName} readiness score and gap analysis.`}
          url={`https://risclens.com/soc-2-readiness-calculator?framework=${framework}`}
          category="SecurityApplication"
        />

          <section className="bg-white border-b border-slate-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-2 mx-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                Recommended starting point for serious buyers
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {heroContent.headline}
              </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {heroContent.subhead}
            </p>
          </div>
        </section>

        <section className="py-10 md:py-12">

          <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-4 text-center">
            <ReadinessNav />
            <div id="calculator" className="space-y-6 text-left">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <Suspense fallback={<FormSkeleton />}>
                  <CalculatorForm framework={framework} />
                </Suspense>
              </div>
              
                <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900">Validate this with a compliance expert</h3>
                    <p className="text-sm text-slate-600">Get a 15-minute technical sanity check on your readiness plan.</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Link 
                      href="/readiness-review"
                      className="btn-primary whitespace-nowrap"
                    >
                      Confirm Readiness
                    </Link>
                    <p className="text-[10px] text-slate-400">
                      No sales pitch — just clarity on what’s slowing your audit.
                    </p>
                  </div>
                </div>
            </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_350px] items-start">
            {/* Detailed Methodology */}
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
                      Your score (0–100) is calculated using a <strong>risk-based scoring logic</strong>—not AI guesswork. Each input maps to explicit weights based on the <strong>AICPA Trust Services Criteria (TSC)</strong> and practical audit experience.
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
                        <span><strong>Benchmark</strong>: Identify potential gaps in your readiness on the 0-100 readiness scale.</span>
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

            {/* Sidebar / Quick Links */}
            <div className="space-y-6">
              <HowItWorksAccordion defaultExpandedOnDesktop={false} />
              <ContextualSignals />
              <RelatedGuidesRow
                topics={['soc2-readiness', 'soc2-cost', 'soc2-timeline', 'pentest']}
              />
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);
}
