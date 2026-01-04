import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InfoAccordion from '@/components/InfoAccordion';
import InfoDisclosure from '@/components/InfoDisclosure';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Index for Early-Stage Companies | RiscLens',
  description:
    'Get a free SOC 2 readiness score and cost estimate in under 2 minutes. See gaps, what auditors will ask next, and a clear path forward.',
  openGraph: {
    title: 'SOC 2 Readiness Index for Early-Stage Companies | RiscLens',
    description:
      'Get a free SOC 2 readiness score and cost estimate in under 2 minutes. See gaps, what auditors will ask next, and a clear path forward.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Readiness Index for Early-Stage Companies | RiscLens',
    description:
      'Get a free SOC 2 readiness score and cost estimate in under 2 minutes. See gaps, what auditors will ask next, and a clear path forward.',
    images: ['/og.png'],
  },
};

// FAQ Schema for SEO - aligned with on-page FAQ content
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is SOC 2 readiness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SOC 2 readiness refers to an organization's preparedness to undergo a SOC 2 audit. It encompasses having the necessary policies, procedures, technical controls, and documentation in place to satisfy the Trust Service Criteria — Security, Availability, Processing Integrity, Confidentiality, and Privacy. A readiness assessment helps identify gaps before engaging an auditor, reducing the risk of failed audits or costly remediation cycles."
      }
    },
    {
      "@type": "Question",
      "name": "How is SOC 2 readiness calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RiscLens calculates SOC 2 readiness using a deterministic, rules-based scoring method. Each score is derived from explicit weights applied to inputs including company size and team structure, data types handled (PII, financial, health), audit timeline urgency, and industry vertical. The result is a readiness band (Pre-audit, Early-stage, Near-ready, or Audit-ready) and a cost range estimate. Each element of the score can be traced back to specific inputs."
      }
    },
    {
      "@type": "Question",
      "name": "How long does SOC 2 take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SOC 2 timelines vary based on your starting point and audit type. The readiness phase typically takes 2–6 months depending on existing controls and gaps. A Type I audit takes 4–8 weeks once controls are in place. A Type II audit requires a 3–12 month observation period. For most early-stage companies with limited existing controls, expect 3–6 months of preparation before a Type I audit is feasible."
      }
    },
    {
      "@type": "Question",
      "name": "How much does SOC 2 cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SOC 2 costs depend on company size, complexity, and timeline. A typical first-time engagement includes auditor fees ($15,000–$50,000+ depending on scope), compliance tooling ($5,000–$30,000/year), and internal engineering and operational effort for remediation. RiscLens provides planning estimates based on your inputs — actual costs depend on vendor selection and organizational factors."
      }
    },
    {
      "@type": "Question",
      "name": "Do startups need SOC 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many startups pursue SOC 2 when enterprise customers or partners require it as part of vendor due diligence. It is not legally mandatory, but increasingly expected for B2B SaaS, fintech, and companies handling sensitive data. The decision depends on your sales cycle, customer requirements, and data handling practices. A readiness assessment can help determine timing and scope."
      }
    },
    {
      "@type": "Question",
      "name": "Is this a SOC 2 audit or certification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. RiscLens provides a readiness assessment, not an audit or certification. SOC 2 audits must be performed by licensed CPA firms. SOC 2 reports (often called certifications) are formal attestations issued by auditors. Our assessment provides planning estimates and identifies potential gaps — it is not a substitute for a formal SOC 2 engagement with a qualified auditor."
      }
    }
  ]
};

export default function HomePage() {
  return (
    <>
      {/* FAQ Schema JSON-LD */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      
      <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-slate-900 mb-6 leading-snug tracking-tight">
            <span className="block">SOC 2 Readiness Index for</span>
            <span className="block text-brand-600">Early-Stage Companies</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto mb-3 leading-relaxed">
            Get a SOC 2 readiness score + cost range in under 2 minutes.
          </p>
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
            See what to fix first so you don’t waste time or money with auditors.
          </p>
          <p className="text-sm text-slate-600 mb-6">
            This is a readiness assessment, not a certification, audit, or compliance software.
          </p>
          <div className="mt-3 mb-4">
            <InfoAccordion
              triggerLabel="What SOC 2 actually means"
              body="SOC 2 (System and Organization Controls) is an independent audit framework used by enterprise customers to evaluate how a company protects customer data. It focuses on whether your internal controls, processes, and evidence meet real-world security expectations — not whether you claim to be secure."
              clarifier="SOC 2 is not a certification, badge, or software product. It’s an audit outcome based on documented evidence."
            />
          </div>

          <div className="max-w-3xl mx-auto text-left mb-6">
            <p className="text-sm font-medium text-slate-700 mb-2">What you’ll get</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm leading-relaxed">
              <li>Readiness score (0–100) + band (Early-stage / Near-ready / Audit-ready)</li>
              <li>Estimated cost range (auditor + tooling + internal effort)</li>
              <li>Top next steps auditors expect (highest impact first)</li>
            </ul>
          </div>

          <div className="mt-4 mb-8">
            <InfoDisclosure
              collapsible
              triggerLabel="What is SOC 2 readiness?"
              title="What SOC 2 readiness is not"
              body="Clarifies the boundaries of the readiness assessment so expectations stay grounded."
              bullets={[
                'Not a SOC 2 certification or badge',
                'Not a CPA audit or attestation',
                'Not a replacement for an auditor',
                'Not a compliance automation platform',
              ]}
              showTitle={false}
            />
          </div>

          <Link
            href="/soc-2-readiness-index"
            className="mt-4 inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Your Readiness Score
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <p className="mt-4 text-sm text-slate-500">
            Free • No credit card • Instant results
          </p>
          <p className="mt-2 text-sm text-brand-700">
            <Link href="/soc-2-cost" className="underline underline-offset-2 hover:text-brand-800">
              Prefer to start with estimates? See SOC 2 cost + timeline guides →
            </Link>
          </p>
          <div className="mt-3 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-center gap-2">
            <span className="font-semibold text-slate-700">Related tools:</span>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/penetration-testing/pricing" className="underline underline-offset-4 hover:text-brand-800 text-slate-700">
                Penetration Testing Pricing
              </Link>
              <Link href="/vendor-risk-assessment" className="underline underline-offset-4 hover:text-brand-800 text-slate-700">
                Vendor Risk Assessment
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white/70 border border-slate-200 rounded-lg p-4">
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
            <div className="bg-white/70 border border-slate-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-800 mb-2">What signing up actually does</p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
                <li>You provide basic company details: size, industry, data types, and audit timeline.</li>
                <li>You receive a readiness score (0–100), SOC 2 cost range, and prioritized next steps.</li>
                <li>Takes about 2 minutes to complete.</li>
              </ul>
            </div>
            <div className="bg-white/70 border border-slate-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-800 mb-2">How to interpret your score</p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
                <li>0–40 = Pre-audit</li>
                <li>41–70 = Early-stage</li>
                <li>71–85 = Near-ready</li>
                <li>86–100 = Audit-ready</li>
              </ul>
              <p className="text-sm text-slate-600 mt-2">There is no pass/fail. SOC 2 readiness is a spectrum.</p>
              <p className="text-sm text-slate-600">Most early-stage teams underestimate internal preparation time.</p>
            </div>
            <div className="bg-white/70 border border-slate-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-800 mb-2">How accurate are the estimates?</p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
                <li>Scores are deterministic and rules-based, not “AI” guesses.</li>
                <li>Cost ranges are directional, not quotes.</li>
                <li>Typical variance is ±15–25% based on auditor, scope changes, and control maturity.</li>
                <li>Final costs depend on the auditor you pick and how much scope you include.</li>
              </ul>
              <p className="text-sm text-slate-600 mt-2">Typically, scope and evidence quality drive both timeline and cost.</p>
            </div>
          </div>

          <div className="mt-4 max-w-2xl mx-auto bg-white/60 border border-slate-200 rounded-lg p-4 text-left">
            <p className="text-sm font-medium text-slate-700 mb-2">Your data &amp; privacy</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
              <li>Inputs are not sold or shared</li>
              <li>Data is used only to calculate your score</li>
              <li>Email is optional; you can complete the assessment without it</li>
              <li>Aggregated, anonymous data may be used to improve estimates</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/50 text-sm text-slate-500">
            Built for your industry: SaaS companies • Fintech companies
            <div className="mt-4 text-sm text-slate-600">
              About &amp; legitimacy — RiscLens is an independent SOC 2 readiness project for early-stage SaaS, fintech, and data-driven startups. It’s free for education and early demand discovery. No sales calls. No lock-in.
            </div>
            <div className="mt-3 text-sm text-slate-600">
              Early results — The assessment is being tested with founders and operators preparing for SOC 2. Early users report clearer expectations on cost, timeline, and readiness.
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            How RiscLens Calculates Your SOC 2 Readiness
          </h2>
          
          {/* Key Inputs */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Key Inputs We Evaluate
            </h3>
            <p className="text-slate-600 mb-4">
              The RiscLens SOC 2 readiness assessment evaluates your organization across several dimensions that directly impact audit preparation effort:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span><strong>Company size and team structure</strong> — determines documentation scope and control ownership complexity</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span><strong>Data types handled</strong> — PII, financial, or health data each require specific controls</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span><strong>Planned audit timeline</strong> — urgency affects cost and resource allocation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span><strong>Industry vertical</strong> — fintech, healthcare, and SaaS have different compliance baselines</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span><strong>Who requires SOC 2</strong> — enterprise customers, investors, or internal initiative</span>
              </li>
            </ul>
          </div>

          {/* Score Derivation */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              How the Readiness Score Is Derived
            </h3>
            <p className="text-slate-600 mb-4">
              Your SOC 2 readiness score is calculated using a deterministic, rules-based algorithm — not AI guesswork. Each input maps to explicit weights based on common SOC 2 readiness frameworks and practical audit preparation experience.
            </p>
            <p className="text-slate-600 mb-4">
              The scoring methodology weighs factors that correlate with compliance effort and cost:
            </p>
            <ul className="space-y-2 text-slate-600 mb-4">
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span><strong>Data sensitivity</strong> — handling PHI or financial data increases control requirements</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span><strong>Organizational complexity</strong> — larger teams need more documentation and access reviews</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span><strong>Timeline urgency</strong> — compressed timelines increase cost and require acceleration</span>
              </li>
            </ul>
            <p className="text-slate-600">
              The result is a readiness band (Pre-audit, Early-stage, Near-ready, or Audit-ready) along with an estimated cost range that includes auditor fees, tooling, and internal preparation effort.
            </p>
          </div>

          {/* How to Use */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              How to Use These Results
            </h3>
            <p className="text-slate-600 mb-4">
              Results are designed to help engineering and security teams understand their SOC 2 readiness posture before engaging auditors or compliance vendors.
            </p>
            <p className="text-slate-600 mb-4">
              Use the assessment to:
            </p>
            <ul className="space-y-2 text-slate-600 mb-4">
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span>Benchmark your current readiness and identify gaps</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span>Estimate SOC 2 audit preparation cost and timeline</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span>Prioritize internal resources before vendor selection</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-600 font-medium">•</span>
                <span>Communicate readiness status to stakeholders</span>
              </li>
            </ul>
            <p className="text-slate-600">
              The estimates provide a starting point for internal planning — not a substitute for professional audit services.
            </p>
          </div>

          {/* Inline CTA */}
          <div className="pt-4 border-t border-slate-200">
            <Link 
              href="/soc-2-readiness-index"
              className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              See your SOC 2 readiness score
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About RiscLens Section */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            About RiscLens
          </h2>
          
          <div className="space-y-4 text-slate-600 leading-relaxed">
            {/* Who this is for */}
            <p>
              <strong className="text-slate-800">Who we serve:</strong>{" "}
              RiscLens is built for early-stage and growing technology companies — SaaS, fintech, healthcare tech — preparing for their first SOC 2 audit or responding to enterprise customer requirements.
            </p>
            
            {/* What problem it solves */}
            <p>
              <strong className="text-slate-800">What we provide:</strong>{" "}
              Clarity before commitment. We help teams understand what SOC 2 readiness involves — realistic cost ranges, timeline expectations, and common gaps — so they can plan effectively before engaging auditors or compliance vendors.
            </p>
            
            {/* What it does NOT do */}
            <p>
              <strong className="text-slate-800">What we don&apos;t do:</strong>{" "}
              RiscLens does not provide legal advice, audit services, or SOC 2 certification. Our assessments support internal planning and decision-making — they are not a substitute for professional compliance guidance.
            </p>
          </div>
          
          {/* Credibility statement */}
          <p className="mt-6 text-sm text-slate-500 border-l-2 border-slate-300 pl-4">
            Our scoring methodology is informed by established SOC 2 readiness frameworks and emphasizes realistic planning over automation promises.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            {/* FAQ 1 */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What is SOC 2 readiness?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                SOC 2 readiness refers to an organization&apos;s preparedness to undergo a SOC 2 audit. It encompasses having the necessary policies, procedures, technical controls, and documentation in place to satisfy the Trust Service Criteria — Security, Availability, Processing Integrity, Confidentiality, and Privacy. A readiness assessment helps identify gaps before engaging an auditor, reducing the risk of failed audits or costly remediation cycles.
              </p>
            </div>

            {/* FAQ 2 */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How is SOC 2 readiness calculated?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                RiscLens calculates SOC 2 readiness using a deterministic, rules-based algorithm. There is no AI reasoning or probabilistic modeling — every score is derived from explicit weights applied to your inputs:
              </p>
              <ul className="space-y-2 text-slate-600 mb-3">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span>Company size and team structure affect documentation scope</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span>Data types (PII, financial, health) determine required controls</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span>Audit timeline urgency impacts cost and resource intensity</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span>Industry vertical influences baseline compliance expectations</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                The result is a readiness band (Pre-audit, Early-stage, Near-ready, or Audit-ready) and a cost range estimate. Each element of the score can be traced back to specific inputs.
              </p>
            </div>

            {/* FAQ 3 */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How long does SOC 2 take?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                SOC 2 timelines vary significantly based on your starting point and audit type:
              </p>
              <ul className="space-y-2 text-slate-600 mb-3">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Readiness phase:</strong> 2–6 months depending on existing controls and gaps</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Type I audit:</strong> Typically 4–8 weeks once controls are in place</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Type II audit:</strong> Requires a 3–12 month observation period</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                For most early-stage companies with limited existing controls, expect 3–6 months of preparation before a Type I audit is feasible. Compressed timelines are possible but typically increase cost.
              </p>
            </div>

            {/* FAQ 4 */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How much does SOC 2 cost?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                SOC 2 costs depend on company size, complexity, and timeline. A typical first-time SOC 2 engagement includes:
              </p>
              <ul className="space-y-2 text-slate-600 mb-3">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Auditor fees:</strong> $15,000–$50,000+ depending on scope and firm</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Compliance tooling:</strong> $5,000–$30,000/year for automation platforms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Internal effort:</strong> Engineering and operational time for remediation</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                RiscLens estimates total cost ranges based on your inputs, including auditor fees, tooling, and internal preparation effort. These are planning estimates — actual costs depend on vendor selection and organizational factors.
              </p>
            </div>

            {/* FAQ 5 */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                SOC 2 Type I vs Type II: What&apos;s the difference?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Both audit types evaluate your controls against the Trust Service Criteria, but differ in scope:
              </p>
              <ul className="space-y-2 text-slate-600 mb-3">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Type I:</strong> Point-in-time assessment of whether controls are designed and implemented</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Type II:</strong> Evaluates whether controls operated effectively over a period (typically 3–12 months)</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Most enterprise customers prefer Type II reports. Many companies start with Type I to demonstrate initial compliance, then progress to Type II. The choice depends on customer requirements and your compliance timeline.
              </p>
            </div>

            {/* FAQ 6 */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Is this a SOC 2 audit or certification?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                No. RiscLens provides a <strong>readiness assessment</strong>, not an audit or certification.
              </p>
              <ul className="space-y-2 text-slate-600 mb-3">
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>SOC 2 audits</strong> must be performed by licensed CPA firms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>SOC 2 reports</strong> (often called &quot;certifications&quot;) are formal attestations issued by auditors</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-600 font-medium">•</span>
                  <span><strong>Readiness assessments</strong> help organizations prepare before engaging auditors</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Our assessment provides planning estimates and identifies potential gaps — it is not a substitute for a formal SOC 2 engagement with a qualified auditor.
              </p>
            </div>
          </div>

          {/* FAQ CTA */}
          <div className="mt-12 pt-6 border-t border-slate-200">
            <p className="text-slate-600 mb-4">
              Ready to assess your SOC 2 readiness?
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
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}
