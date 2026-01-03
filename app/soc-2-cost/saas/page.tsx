import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CTA_HREF = '/soc-2-readiness-index';

const faqs = [
  {
    question: 'Why do SOC 2 costs vary for SaaS companies?',
    answer:
      'Multi-tenant architectures, rapid deploy cycles, and third-party integrations expand the scope auditors review. More releases and shared infrastructure mean more evidence and change-control testing.',
  },
  {
    question: 'Do we need SOC 2 Type II on the first audit?',
    answer:
      'Most SaaS teams start with Type I to validate control design, then move to Type II once controls have operated for a period. If customers demand Type II immediately, budget for the longer observation window.',
  },
  {
    question: 'How do CI/CD pipelines affect cost?',
    answer:
      'Frequent deployments require documented approvals, code reviews, and evidence of testing. Mature pipelines lower audit friction, but if controls aren’t formalized, expect extra readiness effort.',
  },
  {
    question: 'What software expenses should we expect?',
    answer:
      'Budget for GRC/evidence automation, logging/monitoring, vulnerability management, and access review tooling. These reduce manual effort but add recurring spend.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for SaaS (2026) | Budget Estimate',
  description:
    'See what drives SOC 2 audit pricing for SaaS in 2026—multi-tenant scope, CI/CD pace, and customer demands. Get a quick budget guide and start the readiness assessment.',
  alternates: {
    canonical: '/soc-2-cost/saas',
  },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/saas',
    title: 'SOC 2 Cost for SaaS Companies (2026): Estimate Your Budget',
    description:
      'Understand SOC 2 pricing drivers for SaaS and move straight into the readiness assessment to see your budget and timeline.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'RiscLens - SOC 2 Cost for SaaS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for SaaS Companies (2026): Estimate Your Budget',
    description:
      'See SOC 2 pricing factors for SaaS and get a readiness score to anchor your budget.',
    images: ['/opengraph-image'],
  },
};

export default function Soc2CostSaasPage() {
  return (
    <>
      <Script
        id="soc2-cost-saas-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen flex flex-col bg-slate-100">
        <Header />

        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              <span className="block">SOC 2 Cost (2026)</span>
              <span className="block text-brand-600">SaaS Budget Estimate</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              SaaS teams juggle multi-tenant architectures, fast release cycles, and customer security demands. These factors shape audit scope, evidence collection, and tooling needs—impacting your SOC 2 budget.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Jump into the readiness assessment: SOC 2 Readiness Index.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Link
                href={CTA_HREF}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Readiness Score
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-sm text-slate-500">Free • No sales calls • Instant results</p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What drives cost?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                SaaS companies often handle customer data across shared infrastructure with frequent deployments. The combination of multi-tenancy, integrations, and pace of change affects how much evidence auditors review and how much readiness work you need.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Key cost drivers for SaaS</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>Deployment frequency</strong> — High CI/CD velocity requires documented approvals, testing, and change evidence.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>Multi-tenant scope</strong> — Shared infrastructure and tenant isolation controls increase audit attention.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>Third-party integrations</strong> — Customer data flowing through partners and vendors expands evidence collection.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>Customer security requirements</strong> — Enterprise deals often drive scope (Type I vs Type II, criteria included).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>Tooling maturity</strong> — Logging, monitoring, and access review automation reduce manual audit prep but add subscription cost.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Ready to see your number?</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The readiness assessment benchmarks your SaaS environment, release cadence, and scope to project a realistic SOC 2 budget. It highlights where to reduce cost before you engage an auditor.
              </p>
              <Link
                href={CTA_HREF}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all"
              >
                Start the readiness assessment
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">SOC 2 Cost FAQs for SaaS</h3>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="space-y-2">
                    <p className="text-base font-semibold text-slate-900">{faq.question}</p>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Explore related resources</h3>
              <div className="flex flex-wrap gap-4 text-brand-700">
                <Link href="/soc-2-cost" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 Cost (overview)
                </Link>
                <Link href="/soc-2-readiness/saas" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 Readiness for SaaS
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">SOC 2 Cost FAQs</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">How much does SOC 2 typically cost?</h3>
                <p className="text-slate-600">SaaS teams often budget for auditor fees, tooling, and internal time; totals vary with scope and deployment complexity.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">What increases SOC 2 audit cost the most?</h3>
                <p className="text-slate-600">Broad scope, heavy integrations, and compressed timelines increase testing hours and evidence collection.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Is SOC 2 Type II more expensive than Type I?</h3>
                <p className="text-slate-600">Yes. Type II requires operating evidence across deployments, adding auditor time and internal effort.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Can startups reduce SOC 2 costs?</h3>
                <p className="text-slate-600">Standardized change control, clear tenant isolation, and evidence automation can reduce effort and fees.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">How long does SOC 2 usually take?</h3>
                <p className="text-slate-600">Readiness can take a few months; Type I follows quickly; Type II adds an observation window of several months.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
