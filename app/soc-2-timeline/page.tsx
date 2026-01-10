import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import AboutSection from '@/components/AboutSection';
import { timelineGuides } from '@/lib/soc2Guides';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { ContextualSignals } from '@/components/compliance/ContextualSignals';
import { StickyCTA } from '@/components/StickyCTA';

const faqs = [
  {
    question: 'How long does a SOC 2 audit take?',
    answer:
      'A SOC 2 journey typically takes 6 to 12 months. Readiness and remediation usually take 2-4 months, while the audit itself (for Type II) includes an observation period of 3-12 months.',
  },
  {
    question: 'What is the difference between Type I and Type II timelines?',
    answer:
      'Type I validates controls at a single point in time and can be completed in weeks once readiness is done. Type II requires an observation period (usually 3, 6, or 12 months) to prove controls operate effectively over time.',
  },
  {
    question: 'Can we speed up the SOC 2 process?',
    answer:
      'Yes, by using compliance automation tools (like Vanta or Drata), having well-documented policies, and dedicating a clear owner for evidence collection. This can reduce the remediation phase by several weeks.',
  },
  {
    question: 'When should we start the audit?',
    answer:
      'You should start the audit only after you have completed your readiness assessment and remediated any gaps. Starting too early can lead to audit exceptions if controls are not yet in place.',
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
  title: 'SOC 2 Timeline Guide (2026) | RiscLens',
  description:
    'Learn exactly how long SOC 2 takes. From readiness to the final report, understand the phases, observation windows, and how to avoid common delays.',
  alternates: {
    canonical: '/soc-2-timeline',
  },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-timeline',
    title: 'SOC 2 Timeline Guide (2026) | RiscLens',
    description:
      'Learn exactly how long SOC 2 takes. From readiness to the final report, understand the phases, observation windows, and how to avoid common delays.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'RiscLens - SOC 2 Timeline Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Timeline Guide (2026) | RiscLens',
    description:
      'Learn exactly how long SOC 2 takes. From readiness to the final report, understand the phases, observation windows, and how to avoid common delays.',
    images: ['/og.png'],
  },
};

export default function Soc2TimelineGuidePage() {
  return (
    <>
      <Script
        id="soc2-timeline-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen flex flex-col bg-slate-100">
        <Header />

        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              <span className="block text-brand-600">SOC 2 Timeline</span>
              <span className="block">Planning Guide</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Don&apos;t let your SOC 2 audit become a black hole of time. Understand the phases, observation windows, and common bottlenecks that slow teams down. Use this guide to map your journey, then use our estimator for a custom roadmap.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/soc-2-timeline/estimator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Use the Timeline Estimator
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/soc-2-cost" className="text-sm text-brand-700 underline underline-offset-2 hover:text-brand-800 font-medium">
                Looking for costs? See our Cost Guide
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Timeline by Industry & Size</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {timelineGuides.map((item) => (
                <Link
                  key={item.slug}
                  href={`${item.parent}/${item.slug}`}
                  className="group block rounded-xl border border-slate-200 bg-white hover:border-brand-200 hover:shadow-sm transition-all p-5"
                >
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-slate-900 group-hover:text-brand-700">{item.title}</p>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.summary}</p>
                    <div className="pt-2 flex items-center text-brand-600 text-sm font-medium">
                      Read guide
                      <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">The 4 Phases of SOC 2</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Gap Assessment & Planning (2-4 Weeks)</h3>
                    <p className="text-slate-600">Determine scope, select TSCs (Security, Availability, etc.), and identify what controls are missing.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Remediation (1-3 Months)</h3>
                    <p className="text-slate-600">The "heavy lifting" phase. Drafting policies, implementing MFA, setting up logging, and closing technical gaps.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Observation Period (3-12 Months)</h3>
                    <p className="text-slate-600">Only for Type II. The period where the auditor monitors your controls to ensure they operate effectively over time.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Fieldwork & Reporting (4-8 Weeks)</h3>
                    <p className="text-slate-600">The auditor reviews evidence, conducts interviews, and drafts the final report for your signatures.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Avoid these "Timeline Killers"</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Scope Creep</h4>
                  <p className="text-sm text-slate-600">Adding new vendors or systems mid-audit adds weeks of evidence collection and review time.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Slow Policy Approval</h4>
                  <p className="text-sm text-slate-600">Waiting for executive sign-off on policies can block the entire remediation phase.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Missing Logs</h4>
                  <p className="text-sm text-slate-600">If you don&apos;t have logs for the full observation period, your auditor may have to restart the clock.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Lack of Ownership</h4>
                  <p className="text-sm text-slate-600">Without a dedicated compliance lead, tasks often stall between engineering and IT.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Timeline FAQs</h2>
                <div className="space-y-6">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="space-y-2">
                      <p className="text-base font-semibold text-slate-900">{faq.question}</p>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

                <div className="pt-4 space-y-8">
                  <ContextualSignals />
                  <RelatedGuidesRow
                    topics={['soc2-timeline', 'soc2-readiness', 'soc2-cost', 'pentest']}
                  />
                </div>

            </div>
          </section>

        <AboutSection />

        <AssessmentCTA />
        <StickyCTA label="Estimate Your Timeline" href="/soc-2-timeline/estimator" />
      </main>
      <Footer />
    </>
  );
}
