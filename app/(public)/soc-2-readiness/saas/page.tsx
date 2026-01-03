import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Assessment for SaaS Companies | RiscLens',
  description:
    'Understand your SOC 2 readiness for SaaS: security controls, access, change management, and vendor risk. Get a score and next steps in under 2 minutes.',
  openGraph: {
    title: 'SOC 2 Readiness Assessment for SaaS Companies | RiscLens',
    description:
      'Understand your SOC 2 readiness for SaaS: security controls, access, change management, and vendor risk. Get a score and next steps in under 2 minutes.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Readiness Assessment for SaaS Companies | RiscLens',
    description:
      'Understand your SOC 2 readiness for SaaS: security controls, access, change management, and vendor risk. Get a score and next steps in under 2 minutes.',
    images: ['/og.png'],
  },
};

export default function SaaSSoc2ReadinessPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            <span className="block">SOC 2 Readiness Assessment</span>
            <span className="block text-brand-600">for SaaS Companies</span>
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
            Get Your SaaS Readiness Score
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

      {/* Why SOC 2 Matters for SaaS */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Why SOC 2 Matters for SaaS Companies
          </h2>
          
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              For B2B SaaS companies, SOC 2 compliance is often a prerequisite for enterprise sales. Large organizations require SOC 2 reports as part of vendor due diligence before they can onboard your software into their environment.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Common scenarios where SOC 2 becomes essential:
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Enterprise sales cycles</strong> — Security questionnaires often stall or fail without a SOC 2 report</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Handling customer data</strong> — SaaS platforms processing or storing customer data face scrutiny</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Integrations and partnerships</strong> — API partners and integration ecosystems may require compliance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Investor due diligence</strong> — Growth-stage investors increasingly expect SOC 2 as table stakes</span>
                </li>
              </ul>
            </div>

            <p>
              The earlier you understand your SOC 2 readiness posture, the more time you have to remediate gaps without derailing active sales opportunities.
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
            Common SOC 2 Readiness Challenges for SaaS
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                1. Cloud Infrastructure Complexity
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Multi-cloud deployments, containerized workloads, and serverless architectures require clear documentation of security boundaries. Auditors need to understand your shared responsibility model and how you secure each layer.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                2. Access Control at Scale
              </h3>
              <p className="text-slate-600 leading-relaxed">
                SaaS companies typically manage access for developers, operations, support, and customer success teams — each with different permission requirements. Implementing least-privilege access and maintaining audit trails is a common gap.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                3. Multi-Tenant Data Isolation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                For SaaS platforms serving multiple customers, demonstrating logical or physical data isolation is critical. Auditors evaluate how tenant data is segregated at the database, application, and infrastructure levels.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                4. Continuous Deployment and Change Management
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Fast-moving engineering teams often ship multiple times per day. SOC 2 requires documented change management processes, code review evidence, and deployment approval workflows — which may need formalization.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                5. Vendor and Subprocessor Management
              </h3>
              <p className="text-slate-600 leading-relaxed">
                SaaS products rely on third-party services — payment processors, analytics, email providers. You need documented vendor risk assessments and evidence that critical subprocessors meet security standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS-Specific FAQs */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">
            SOC 2 FAQs for SaaS Companies
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                When should a SaaS company start SOC 2?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Most SaaS companies begin SOC 2 preparation when enterprise sales require it — typically when closing deals with companies that have formal vendor security requirements. Starting 3–6 months before you need the report allows time for remediation without rushing. Beginning earlier, when controls are being designed, is more cost-effective than retrofitting later.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Do we need SOC 2 Type I or Type II?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Most enterprise customers prefer Type II, which demonstrates that controls operated effectively over a period (typically 6–12 months). However, many SaaS companies start with Type I to establish a baseline and satisfy immediate customer requirements, then progress to Type II. Your customers&apos; security teams will specify which report they accept.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What Trust Service Criteria apply to SaaS?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Security is always in scope. Beyond that, the criteria depend on your product and customer commitments:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Availability</strong> — if you have uptime SLAs or availability commitments</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Confidentiality</strong> — if you handle confidential customer data or IP</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Privacy</strong> — if you process personal information with specific privacy obligations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Processing Integrity</strong> — if accuracy and completeness of data processing is critical</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How does cloud infrastructure affect SOC 2 scope?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Cloud providers like AWS, Azure, and GCP maintain their own SOC 2 reports, which you can reference. However, your audit covers how you configure and use those services. Auditors evaluate your security configurations, access controls, monitoring, and incident response — not the underlying cloud infrastructure.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What documentation do SaaS companies typically lack?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Common documentation gaps for SaaS companies include:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span>Formal information security policies and procedures</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span>Documented change management and code review processes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span>Vendor risk assessments and third-party agreements</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span>Incident response plans with defined escalation paths</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span>Access review evidence and offboarding checklists</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Can we use compliance automation tools?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Yes. Platforms like Vanta, Drata, Secureframe, and others can streamline evidence collection and policy management. These tools integrate with your cloud infrastructure and business systems to automate monitoring. However, they are tools — not substitutes for implementing actual controls. Auditors evaluate your controls, not your tooling.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 pt-6 border-t border-slate-200">
            <p className="text-slate-600 mb-4">
              Ready to assess your SaaS company&apos;s SOC 2 readiness?
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
                href="/soc-2-readiness/fintech"
                className="text-slate-600 hover:text-brand-600 transition-colors underline underline-offset-2"
              >
                Fintech Companies
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
