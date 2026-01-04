import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VendorRiskRelatedLinks } from '@/components/vendor-risk/VendorRiskRelatedLinks';
import DefinitionCallout from '@/components/DefinitionCallout';
import CommonForIndustries from '@/components/CommonForIndustries';
import { HowItWorksButton } from '@/components/HowItWorksButton';

const lastUpdated = '2026-03-20';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a vendor risk assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A structured review of a vendor’s security posture, data handling, and contract terms to decide required evidence, security controls, and monitoring cadence.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should vendors be reassessed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Low-risk vendors are typically reviewed annually, medium-risk vendors get annual reviews plus quarterly attestations, and high-risk vendors merit semiannual checks or continuous monitoring.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this replace legal advice or an audit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This guidance helps structure diligence but does not replace counsel, auditor review, or your internal risk management process.',
      },
    },
  ],
};

const clusterLinks = [
  { href: '/vendor-risk-assessment/triage', title: 'VRA Triage Tool', summary: 'Score vendor risk in minutes with deterministic logic and evidence expectations.' },
  { href: '/vendor-risk-assessment/checklist', title: 'VRA Checklist', summary: 'Prep list for intake, due diligence, contracts, and ongoing monitoring.' },
  { href: '/vendor-risk-assessment/scoring-model', title: 'Scoring Model', summary: 'How the VRA tiers map to control asks and cadence.' },
  { href: '/vendor-risk-assessment/evidence-by-tier', title: 'Evidence by Tier', summary: 'Evidence packs to request at Low, Medium, and High risk.' },
  { href: '/vendor-risk-assessment/monitoring-cadence', title: 'Monitoring Cadence', summary: 'Right-size follow-up frequency and attestation rhythm.' },
  { href: '/vendor-risk-assessment/contract-clauses', title: 'Contract Clauses', summary: 'Security addenda and DPAs that match the risk tier.' },
  { href: '/vendor-risk-assessment/subprocessors-vs-vendors', title: 'Subprocessors vs Vendors', summary: 'How to track chains of custody and downstream risk.' },
  { href: '/vendor-risk-assessment/common-mistakes', title: 'Common Mistakes', summary: 'Avoid over-collecting evidence or missing critical signals.' },
];

export const metadata: Metadata = {
  title: 'Vendor Risk Assessment Hub | SOC 2 Vendor Management | RiscLens',
  description: 'Vendor risk assessment templates, triage tool, evidence by tier, and monitoring cadence to keep SOC 2 vendor management credible.',
  alternates: { canonical: '/vendor-risk-assessment' },
  openGraph: {
    title: 'Vendor Risk Assessment Hub | SOC 2 Vendor Management | RiscLens',
    description: 'Vendor risk assessment templates, triage tool, evidence by tier, and monitoring cadence to keep SOC 2 vendor management credible.',
    url: 'https://risclens.com/vendor-risk-assessment',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens Vendor Risk Assessment' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendor Risk Assessment Hub | SOC 2 Vendor Management | RiscLens',
    description: 'Vendor risk assessment templates, triage tool, evidence by tier, and monitoring cadence to keep SOC 2 vendor management credible.',
    images: ['/og.png'],
  },
};

export default function VendorRiskAssessmentHubPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="vra-hub-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center space-y-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vendor Risk Assessment</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">SOC 2 Vendor Risk Assessment Hub</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Score vendor risk quickly, pick the right evidence pack, and set a monitoring cadence. Built for SOC 2 vendor management without adding another tool.
          </p>
          <div className="flex justify-center">
            <Link
              href="/vendor-risk-assessment/triage"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition-all"
            >
              Run the VRA Triage
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <div className="ml-3">
              <HowItWorksButton />
            </div>
          </div>
          <p className="text-sm text-slate-500">Guidance only; align outcomes with your risk team. Last updated: {lastUpdated}.</p>
          <div className="max-w-3xl mx-auto">
            <DefinitionCallout
              title="What is a vendor risk assessment?"
              description="A vendor risk assessment (VRA) evaluates a third-party provider’s security and operational risk before sharing data or granting access. It typically includes a questionnaire, evidence review (e.g., SOC 2/ISO), and a risk rating that determines required controls and reassessment frequency."
              linkKey="vendorRiskOverview"
            />
          </div>
          <div className="max-w-4xl mx-auto mt-6">
            <CommonForIndustries
              items={[
                { label: 'SaaS', href: '/vendor-risk-assessment#saas' },
                { label: 'Fintech', href: '/vendor-risk-assessment#fintech' },
                { label: 'Healthcare', href: '/vendor-risk-assessment#healthcare' },
                { label: 'B2B APIs', href: '/vendor-risk-assessment#b2b-apis' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            {clusterLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border border-slate-200 rounded-xl p-5 bg-slate-50 hover:border-brand-200 transition"
              >
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed">{item.summary}</p>
              </Link>
            ))}
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Why this matters for SOC 2</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Vendor management is a core SOC 2 control area. Clear triage, evidence expectations, and contract requirements reduce friction with auditors and speed up security questionnaires from your customers.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-brand-600">•</span>
                <span>Tier vendors consistently to avoid over-collecting evidence from low-risk suppliers.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">•</span>
                <span>Align contract clauses with data sensitivity and access, not guesswork.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">•</span>
                <span>Keep a single “evidence-by-tier” checklist so reviews are predictable.</span>
              </li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-3" id="how-it-works">
            <h3 className="text-lg font-semibold text-slate-900">How it works</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
              <li>Run the triage to set risk tier, cadence, and evidence asks.</li>
              <li>Pull the checklist and evidence-by-tier guidance for intake and contract reviews.</li>
              <li>Share the monitoring cadence with control owners and track attestations.</li>
            </ol>
            <p className="text-xs text-slate-500">Use as guidance—align asks with your security, legal, and compliance owners.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Related high-intent VRA guides</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/vendor-risk-assessment/questionnaire" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                Vendor Questionnaire Template
              </Link>
              <Link href="/vendor-risk-assessment/contract-clauses" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                Contract Clauses
              </Link>
              <Link href="/vendor-risk-assessment/monitoring-cadence" className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200">
                Monitoring Cadence
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2" id="saas">
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
              <p className="text-sm font-semibold text-slate-900">SaaS vendors</p>
              <p className="text-sm text-slate-700">Focus on multi-tenant data handling, support access controls, and change evidence. Keep cadence annual + quarterly attestations.</p>
              <Link href="/vendor-risk-assessment/triage" className="text-sm text-brand-700 underline underline-offset-4">Run triage</Link>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2" id="fintech">
              <p className="text-sm font-semibold text-slate-900">Fintech vendors</p>
              <p className="text-sm text-slate-700">Payment/financial data pushes for stronger evidence (SOC 2 Type II, pentest summaries) and semiannual attestations.</p>
              <Link href="/vendor-risk-assessment/triage" className="text-sm text-brand-700 underline underline-offset-4">Run triage</Link>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2" id="healthcare">
              <p className="text-sm font-semibold text-slate-900">Healthcare vendors</p>
              <p className="text-sm text-slate-700">PHI drives deeper review of subprocessors, breach notice, and IR/BCP evidence; cadence often semiannual.</p>
              <Link href="/vendor-risk-assessment/triage" className="text-sm text-brand-700 underline underline-offset-4">Run triage</Link>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2" id="b2b-apis">
              <p className="text-sm font-semibold text-slate-900">B2B APIs</p>
              <p className="text-sm text-slate-700">Data flows and scopes matter most; show auth, rate limits, and logging. Annual reviews with quarterly attestations work well.</p>
              <Link href="/vendor-risk-assessment/triage" className="text-sm text-brand-700 underline underline-offset-4">Run triage</Link>
            </div>
          </div>

          <VendorRiskRelatedLinks />
        </div>
      </section>
      <Footer />
    </main>
  );
}
