import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';

const CTA_HREF = '/soc-2-readiness-index';

const faqs = [
  {
    question: 'Why is SOC 2 pricing different for fintech?',
    answer:
      'Handling payments, funds, or financial data increases scope. Auditors review transaction integrity, data flows, and partner controls, which adds evidence and time.',
  },
  {
    question: 'How do banking partners influence cost?',
    answer:
      'Sponsor banks and BaaS providers often require broader controls and Type II reports. Their questionnaires can expand scope, increasing auditor effort and internal prep.',
  },
  {
    question: 'Do we need additional frameworks besides SOC 2?',
    answer:
      'Fintech teams often align SOC 2 with PCI DSS, GLBA, or money-movement obligations. Mapping controls helps, but overlapping requirements can add tooling and documentation cost.',
  },
  {
    question: 'What drives fintech tooling spend?',
    answer:
      'Logging, transaction monitoring, anti-fraud controls, access reviews, and evidence automation reduce manual work but add recurring cost to the SOC 2 budget.',
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
  title: 'SOC 2 Cost for Fintech (2026) | Budget Estimate',
  description:
    'See what drives SOC 2 audit pricing for fintech in 2026—banking partners, transaction scope, and data sensitivity. Get a quick budget guide and start the readiness assessment.',
  alternates: {
    canonical: '/soc-2-cost/fintech',
  },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/fintech',
    title: 'SOC 2 Cost for Fintech Companies (2026): Estimate Your Budget',
    description:
      'Understand SOC 2 pricing drivers for fintech and move into the readiness assessment to see your budget and timeline.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'RiscLens - SOC 2 Cost for Fintech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for Fintech Companies (2026): Estimate Your Budget',
    description:
      'See SOC 2 pricing factors for fintech and get a readiness score to anchor your budget.',
    images: ['/opengraph-image'],
  },
};

export default function Soc2CostFintechPage() {
  return (
    <>
      <Script
        id="soc2-cost-fintech-faq-schema"
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
              <span className="block text-brand-600">Fintech Budget Estimate</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Fintech teams handle funds movement and sensitive financial data. Banking partners, transaction integrity, and regulatory overlap shape your SOC 2 scope—and the cost to prove controls work.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Start the readiness assessment: <Link href={CTA_HREF} className="underline underline-offset-2 text-brand-700 hover:text-brand-800">SOC 2 Readiness Index</Link>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                Payments, lending, and treasury tools face higher scrutiny. Transaction integrity, partner dependencies, and data classification add evidence and control expectations that influence SOC 2 pricing.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Key cost drivers for fintech</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>Funds movement and transactions</strong> — Payment flows and settlement processes expand evidence and control testing.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>Banking partner requirements</strong> — Sponsor banks/BaaS providers often expect Type II and broader criteria coverage.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>Data sensitivity</strong> — Financial PII and account data increase encryption, access, and monitoring expectations.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>Regulatory overlap</strong> — Mapping SOC 2 to PCI, GLBA, or money-movement controls adds documentation and validation effort.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>Tooling and monitoring stack</strong> — Transaction logging, fraud monitoring, and evidence automation reduce manual lift but add subscription cost.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Ready to see your number?</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The readiness assessment benchmarks your fintech scope, partners, and timelines to project a realistic SOC 2 budget. It highlights cost levers before you commit to an auditor.
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
              <h3 className="text-lg font-semibold text-slate-800 mb-4">SOC 2 Cost FAQs for Fintech</h3>
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
                <Link href="/soc-2-readiness/fintech" className="underline underline-offset-2 hover:text-brand-800">
                  SOC 2 Readiness for Fintech
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
