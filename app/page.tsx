import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Index for Early-Stage Companies | RiscLens',
  description: 'Calculate your SOC 2 compliance costs and get a personalized readiness assessment. Free instant results with detailed PDF report.',
  keywords: ['SOC 2', 'compliance', 'cost calculator', 'audit', 'security', 'readiness', 'startup', 'saas'],
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="text-xl font-bold text-slate-900">
            RiscLens
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 lg:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
            <span className="block sm:inline">SOC 2 Readiness</span>{" "}
            <span className="block sm:inline">Index for{" "}</span>
            <span className="block sm:inline text-brand-600">Early-Stage Companies</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            See where you stand before the auditor does. Get your readiness score, cost estimate, and a clear path forward — in under 2 minutes.
          </p>
          <Link
            href="/soc-2-readiness-index"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Your Readiness Score
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="mt-5 text-sm text-slate-500">
            Free • No credit card • Instant results
          </p>
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

      {/* Footer */}
      <footer className="py-10 bg-slate-900 text-slate-400 text-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-200">RiscLens</p>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide">
                Compliance readiness infrastructure
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-slate-400 hover:text-slate-200 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-slate-200 transition-colors">
                Terms
              </Link>
              <a href="mailto:reports@risclens.com" className="text-slate-400 hover:text-slate-200 transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-10 pt-8 border-t border-slate-800">
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
              <strong className="text-slate-400">Disclaimer:</strong> RiscLens provides informational 
              estimates only. We do not provide legal advice, audit services, or SOC 2 certification. 
              All results are based on self-reported inputs and should be used for planning purposes only. 
              For formal compliance guidance, consult a qualified auditor or legal professional.
            </p>
          </div>

          <p className="mt-8 text-center text-slate-500 text-xs">
            © {new Date().getFullYear()} RiscLens. Your data is encrypted and never shared without consent.
          </p>
        </div>
      </footer>
    </main>
  );
}
