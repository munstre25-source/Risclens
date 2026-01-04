import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Assessment for Fintech Companies | RiscLens',
  description:
    'Fintech demands rigorous controls. Get a SOC 2 readiness score, gap areas, and audit-style next steps tailored to fintech—fast and free.',
  openGraph: {
    title: 'SOC 2 Readiness Assessment for Fintech Companies | RiscLens',
    description:
      'Fintech demands rigorous controls. Get a SOC 2 readiness score, gap areas, and audit-style next steps tailored to fintech—fast and free.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Readiness Assessment for Fintech Companies | RiscLens',
    description:
      'Fintech demands rigorous controls. Get a SOC 2 readiness score, gap areas, and audit-style next steps tailored to fintech—fast and free.',
    images: ['/og.png'],
  },
};

export default function FintechSoc2ReadinessPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            <span className="block">SOC 2 Readiness Assessment</span>
            <span className="block text-brand-600">for Fintech Companies</span>
          </h1>
          <p className="text-base text-slate-700 max-w-2xl mx-auto mb-3 leading-relaxed">
            Get a SOC 2 readiness score + cost range in under 2 minutes.
          </p>
          <p className="text-base text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
            See what to fix first before you talk to an auditor.
          </p>
          <p className="text-sm text-slate-600 mb-4">
            This is not a certification, audit, or compliance software. It’s a readiness assessment.
          </p>
          <div className="max-w-3xl mx-auto text-left mb-6">
            <p className="text-sm font-medium text-slate-700 mb-2">What you’ll get</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
              <li>Readiness score (0–100) + band (Early-stage / Near-ready / Audit-ready)</li>
              <li>Estimated cost range (auditor + tooling + internal effort)</li>
              <li>Top next steps auditors expect (highest impact first)</li>
            </ul>
          </div>
          <Link
            href="/soc-2-readiness-index"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Your Fintech Readiness Score
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-slate-500">
            Free • 2 minutes • Instant results
          </p>
          <p className="text-sm text-slate-600 mt-2">
            Deciding audit type? Read the{' '}
            <Link href="/soc-2-type-i-vs-type-ii" className="underline underline-offset-2 text-brand-700 hover:text-brand-800">
              SOC 2 Type I vs Type II guide
            </Link>
            .
          </p>
          <div className="mt-4 text-sm text-brand-700 flex flex-col sm:flex-row gap-2 justify-center">
            <Link href="/penetration-testing#fintech" className="underline underline-offset-4 hover:text-brand-800">
              Related: Penetration Testing for Fintech
            </Link>
            <Link href="/vendor-risk-assessment#fintech" className="underline underline-offset-4 hover:text-brand-800">
              Related: Vendor Risk Assessment for Fintech
            </Link>
          </div>
          <div className="mt-6 bg-white/70 border border-slate-200 rounded-lg p-4 text-left max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-slate-800 mb-2">Trust &amp; privacy</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
              <li>Why free? Built to help early-stage teams understand SOC 2 without sales pressure. No sales calls.</li>
              <li>What happens to my answers? Used only to calculate your score. You can complete it without email.</li>
              <li>Reliability: Estimates are directional ranges based on common SOC 2 readiness patterns. Use as planning guidance, not audit advice.</li>
            </ul>
            <p className="text-sm text-slate-600 mt-3">
              About: Built by the RiscLens team (contact: reports@risclens.com). Independent SOC 2 readiness project. See <a href="/terms" className="underline underline-offset-2 text-brand-700 hover:text-brand-800">Terms</a> and <a href="/privacy" className="underline underline-offset-2 text-brand-700 hover:text-brand-800">Privacy</a>. No lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* Why SOC 2 Matters for Fintech */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Why SOC 2 Matters for Fintech Companies
          </h2>
          
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              Fintech companies operate at the intersection of technology and regulated financial services. Whether you&apos;re building payment infrastructure, lending platforms, or wealth management tools, your banking partners and enterprise clients expect rigorous security attestations.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Scenarios that accelerate SOC 2 requirements in fintech:
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Banking partnerships</strong> — Sponsor banks and BaaS providers require SOC 2 as a baseline</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Processing financial transactions</strong> — Payment, ACH, and wire transfer systems face heightened scrutiny</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Holding or transmitting funds</strong> — Money movement creates regulatory and security expectations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Enterprise financial tools</strong> — Corporate treasury, expense management, and accounting integrations</span>
                </li>
              </ul>
            </div>

            <p>
              SOC 2 serves as a common baseline across financial services — it demonstrates that your organization has implemented controls aligned with industry expectations, even if additional regulatory frameworks apply.
            </p>
            </div>
            <div className="border-t border-slate-200 pt-6 text-sm text-slate-600">
              <p className="font-medium text-slate-700 mb-2">About RiscLens</p>
              <p className="leading-relaxed">
                RiscLens is an independent SOC 2 readiness project built to help early-stage teams understand audit expectations, costs, and gaps — without sales pressure or automation lock-in.
              </p>
              <div className="mt-3">
                <p className="font-medium text-slate-700 mb-1">Your data &amp; privacy</p>
                <ul className="list-disc list-inside space-y-1 leading-relaxed">
                  <li>We do not sell or share your information</li>
                  <li>Responses are used only to calculate your score</li>
                  <li>You can complete the assessment without providing an email</li>
                  <li>Aggregated, anonymous data may be used to improve estimates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      {/* Common Readiness Challenges */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Common SOC 2 Readiness Challenges for Fintech
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                1. Overlapping Regulatory Requirements
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Fintech companies often navigate multiple compliance frameworks — PCI DSS for card data, state money transmitter licenses, GLBA for consumer financial information, and more. Mapping SOC 2 controls to existing regulatory requirements helps avoid duplication while ensuring comprehensive coverage.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                2. Financial Data Classification
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Account numbers, transaction histories, bank credentials, and PII require precise classification and handling procedures. Auditors evaluate how you identify, label, and protect sensitive financial data throughout its lifecycle — from ingestion to deletion.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                3. Third-Party API and Banking Integrations
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Fintech products typically integrate with banking APIs, payment networks, and data aggregators. Each integration creates security boundaries that must be documented. Auditors assess how you secure API credentials, handle webhook payloads, and manage data flows across system boundaries.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                4. Transaction Integrity and Audit Trails
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Financial transactions demand immutable logging and reconciliation capabilities. SOC 2&apos;s Processing Integrity criteria evaluates whether transactions are processed accurately, completely, and in a timely manner — with audit trails to prove it.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                5. Incident Response for Financial Systems
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Security incidents in fintech carry regulatory notification obligations and potential financial liability. Your incident response plan must address fraud detection, transaction reversal procedures, and communication protocols with banking partners and regulators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fintech-Specific FAQs */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">
            SOC 2 FAQs for Fintech Companies
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How does SOC 2 relate to PCI DSS?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                SOC 2 and PCI DSS address overlapping but distinct requirements. PCI DSS specifically covers cardholder data protection, while SOC 2 is broader — covering organizational security, availability, and confidentiality. Many fintech companies need both. Where requirements overlap (access control, encryption, logging), evidence can often satisfy both frameworks with proper mapping.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Do banking partners accept SOC 2 in lieu of their own audits?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                It depends on the partner. Many sponsor banks and BaaS providers accept SOC 2 Type II as a baseline security attestation, though they may layer additional requirements on top. Some conduct their own vendor assessments regardless. Having SOC 2 in place typically streamlines these conversations and reduces duplicative audit requests.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Which Trust Service Criteria matter most for fintech?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Security is mandatory. Beyond that, fintech companies commonly include:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Processing Integrity</strong> — critical for transaction accuracy and reconciliation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Availability</strong> — if you have uptime commitments for payment processing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Confidentiality</strong> — for handling non-public financial information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Privacy</strong> — if you collect consumer financial data subject to privacy regulations</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How does handling financial data affect SOC 2 scope?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Financial data — account numbers, transaction records, balance information — typically requires enhanced controls around encryption, access management, and data retention. Auditors pay close attention to how you segregate and protect financial data, both at rest and in transit. Expect detailed questions about your data flow diagrams and encryption key management.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What about state and federal regulatory requirements?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                SOC 2 does not replace state money transmitter licenses, federal banking regulations, or consumer protection requirements. However, many controls required by regulators align with SOC 2 criteria. A well-structured SOC 2 program can provide evidence for regulatory examinations, though you should work with compliance counsel to understand your specific obligations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How long should fintech companies budget for SOC 2?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Fintech SOC 2 timelines often extend beyond typical SaaS companies due to regulatory complexity:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Readiness phase:</strong> 4–8 months for companies with existing compliance programs</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Type I audit:</strong> 6–10 weeks once controls are implemented and documented</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Type II observation:</strong> 6–12 months of operating history required</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-3">
                Starting early is particularly important for fintech — banking partner timelines often don&apos;t flex for compliance delays.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 pt-6 border-t border-slate-200">
            <p className="text-slate-600 mb-4">
              Ready to evaluate your fintech company&apos;s SOC 2 readiness?
            </p>
            <Link 
              href="/soc-2-readiness-index"
              className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              Start your free assessment
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Cross-link to other industries */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              SOC 2 readiness for other industries:{" "}
              <Link 
                href="/soc-2-readiness/saas"
                className="text-slate-600 hover:text-brand-600 transition-colors underline underline-offset-2"
              >
                SaaS Companies
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
