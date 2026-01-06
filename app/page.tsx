import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InfoAccordion from '@/components/InfoAccordion';
import InfoDisclosure from '@/components/InfoDisclosure';
import AboutSection from '@/components/AboutSection';
import { messaging } from '@/src/content/messaging';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Assessment for Early-Stage Companies | RiscLens',
  description:
    'Get a free SOC 2 readiness score and cost estimate in under 2 minutes. See gaps, what auditors will ask next, and a clear path forward.',
  openGraph: {
    title: 'SOC 2 Readiness Assessment for Early-Stage Companies | RiscLens',
    description:
      'Get a free SOC 2 readiness score and cost estimate in under 2 minutes. See gaps, what auditors will ask next, and a clear path forward.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Readiness Assessment for Early-Stage Companies | RiscLens',
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
          "text": "RiscLens calculates SOC 2 readiness on a 0–100 scale using a risk-based scoring logic. Each score is derived from explicit weights mapped to the AICPA Trust Services Criteria (TSC). Key factors include company size and team structure, data sensitivity (PII, financial, or health data mapped to CC6.1), audit timeline urgency, and industry vertical. The result includes a readiness band (Pre-audit, Early-stage, Near-ready, or Audit-ready) and a cost range estimate covering auditor fees, internal effort, and tooling."
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
          "name": "Is this a SOC 2 audit or attestation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. RiscLens provides a readiness assessment, not an audit or attestation. SOC 2 audits must be performed by licensed CPA firms. SOC 2 reports are formal attestations issued by auditors. Our assessment provides planning estimates and identifies potential gaps — it is not a substitute for a formal SOC 2 engagement with a qualified auditor."
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
      <section className="bg-white border-b border-slate-200/70">
        <div className="section-shell pt-8 pb-12 lg:pt-12 lg:pb-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
                  <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">Recommended starting point</span>
                      </div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      Before choosing tools or auditors, understand your SOC 2 readiness.
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-5xl font-medium text-slate-900 leading-tight">
                      {messaging.home.hero.headline}
                    </h1>

                  <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">
                    {messaging.home.hero.subhead}
                  </p>
                    
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                        <Link
                          href="/soc-2-readiness-calculator"
                          className="btn-primary text-base px-8 py-3"
                        >
                          {messaging.home.hero.cta}
                        </Link>

                        <Link
                          href="/soc-2-readiness-checklist#download"
                          className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                        >
                          Prefer a checklist instead? Download the SOC 2 checklist.
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">Free • No credit card • Business email required</span>
                  </div>
                
                {/* Framework Alignment */}
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-4">
                    Aligned with industry standards
                  </p>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-70">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      <span className="text-[11px] font-bold tracking-tight text-slate-600 uppercase">AICPA TSC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      <span className="text-[11px] font-bold tracking-tight text-slate-600 uppercase">NIST 800-53</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      <span className="text-[11px] font-bold tracking-tight text-slate-600 uppercase">ISO 27001</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      <span className="text-[11px] font-bold tracking-tight text-slate-600 uppercase">HIPAA Security</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/soc-2-cost" className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors group">
                    See SOC 2 cost + timeline guides
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 pt-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">SOC 2 Audit</span>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Independent validation of security controls required to close enterprise deals.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Readiness Gap</span>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Distance between your current infrastructure and auditor expectations.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="inline-flex items-center rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-200/60">
                    Private by default
                  </span>
                  <span className="inline-flex items-center rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-200/60">
                    No login required
                  </span>
                  <span className="inline-flex items-center rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-200/60">
                    Designed for auditors
                  </span>
                </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                    {[
                      {
                        step: '01',
                        title: 'Readiness Score',
                        body: 'Instant gap analysis and score (0–100) based on real auditor expectations.',
                        icon: (
                          <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        ),
                      },
                      {
                        step: '02',
                        title: 'Cost Planning',
                        body: 'Deterministic budget range including auditor fees, tools, and internal effort.',
                        icon: (
                          <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .843-3 1.882 0 1.038 1.343 1.881 3 1.881s3 .843 3 1.88C15 15.881 13.657 16.724 12 16.724c-1.26 0-2.342-.457-2.812-1.1M12 6v12m9-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ),
                      },
                      {
                        step: '03',
                        title: 'Auditor Match',
                        body: 'Generate a standardized RFP and get competitive quotes from vetted firms.',
                        icon: (
                          <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ),
                      },
                    ].map((item) => (
                      <div key={item.title} className="group relative bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-200">
                        <div className="absolute -top-3 left-4 px-2 py-0.5 bg-brand-600 text-white text-[10px] font-bold rounded shadow-sm">
                          STEP {item.step}
                        </div>
                        <div className="flex items-center gap-3 mb-3 pt-2">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 group-hover:bg-brand-100 transition-colors">
                            {item.icon}
                          </div>
                          <p className="text-sm font-bold text-slate-900 tracking-tight">{item.title}</p>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                      </div>
                    ))}
                  </div>

            </div>

                {/* Hero preview card */}
                <div className="card shadow-md border-slate-200 bg-white space-y-4 hover:shadow-lg transition-shadow duration-300 group">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      Sample Readiness Report
                    </p>
                    <p className="text-sm text-slate-600">Example output from the readiness index</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative inline-flex items-center justify-center group/score cursor-help">
                      <svg className="w-24 h-24 -rotate-90 group-hover/score:scale-105 transition-transform">
                        <circle cx="48" cy="48" r="42" strokeWidth="10" fill="none" className="text-slate-200" />
                        <circle
                          cx="48"
                          cy="48"
                          r="42"
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray={`${0.72 * 264} 264`}
                          strokeLinecap="round"
                          className="stroke-trust-500"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-bold text-trust-600">72</span>
                        <span className="text-[10px] uppercase text-slate-500 tracking-wide">Near-ready</span>
                      </div>
                      {/* Tooltip on hover */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/score:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg border border-slate-700">
                        Standard band for Series A SaaS
                      </div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="relative group/cost rounded-lg bg-slate-50 border border-slate-200 p-3 hover:border-brand-200 transition-colors cursor-help">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Estimated cost</p>
                          <svg className="w-3 h-3 text-slate-400 group-hover/cost:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-lg font-bold text-brand-700">$38k–$68k</p>
                        <p className="text-xs text-slate-500">Auditor + tooling + internal effort</p>
                        
                        {/* Cost Tooltip */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 bg-slate-900 text-white text-[10px] p-2 rounded opacity-0 group-hover/cost:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg border border-slate-700 leading-normal">
                          Range varies by company size, complexity, and auditor choice. We include internal resource costs.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-800">Top fixes</p>
                    <ul className="space-y-3">
                      {[
                        { 
                          text: 'Tighten access reviews with evidence logs', 
                          icon: (
                            <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                          )
                        },
                        { 
                          text: 'Document change management with approvals', 
                          icon: (
                            <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )
                        },
                        { 
                          text: 'Vendor risk: tier critical vendors with proofs', 
                          icon: (
                            <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          )
                        },
                      ].map((item) => (
                        <li key={item.text} className="flex gap-3 text-sm text-slate-700 group/item hover:bg-slate-50 p-2 -m-2 rounded-lg transition-colors items-center">
                          <span className="flex-shrink-0 group-hover/item:scale-110 transition-transform">{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-slate-500 italic">This is a static preview. Your actual score and custom recommendations will match your specific inputs.</p>
                </div>
          </div>
        </div>
      </section>

      {/* Context and trust */}
      <section className="bg-slate-50 border-b border-slate-200/70">
        <div className="section-shell py-10 space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="card-muted">
              <p className="text-sm font-semibold text-slate-800 mb-2">Trust &amp; privacy</p>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
                  <li>No login required; business email required.</li>
                  <li>Answers are used only to calculate your score.</li>
                  <li>Directional estimates based on common SOC 2 readiness patterns.</li>
                </ul>
            </div>
            <div className="card-muted">
              <p className="text-sm font-semibold text-slate-800 mb-2">How it works</p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
                <li>Answer questions on access, change, vendors, and policies.</li>
                <li>Get a score, cost range, and prioritized next steps.</li>
                <li>Built to mirror real auditor questions.</li>
              </ul>
            </div>
            <div className="card-muted">
              <p className="text-sm font-semibold text-slate-800 mb-2">Score interpretation</p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
                <li>0–40 = Pre-audit</li>
                <li>41–70 = Early-stage</li>
                <li>71–85 = Near-ready</li>
                <li>86–100 = Audit-ready</li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">No pass/fail. SOC 2 readiness is about documented, repeatable controls.</p>
            </div>
          </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center pt-4">
              <Link 
                href="/soc-2-readiness-calculator"
                className="btn-primary text-base px-8 py-3"
              >
                Validate Readiness Now
              </Link>
              <div className="text-center sm:text-left">
                <p className="text-sm font-semibold text-slate-900">Technical Validation</p>
                <p className="text-xs text-slate-500">Sanity-check your plan with a compliance expert. No sales demo.</p>
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
              <p className="text-slate-600 mb-4 leading-relaxed">
                Our assessment evaluates your organization across dimensions that directly impact audit complexity and preparation effort:
              </p>
              <ul className="space-y-3 text-slate-600">
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

            {/* Score Derivation */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                How the Readiness Score Is Derived
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Your score (0–100) is calculated using a <strong>risk-based scoring logic</strong>—not AI guesswork. Each input maps to explicit weights based on the <strong>AICPA Trust Services Criteria (TSC)</strong> and practical audit experience.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                The scoring methodology weighs factors correlating with compliance effort:
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
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

            {/* How to Use */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                How to Use These Results
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Results are designed to help engineering and security teams understand their SOC 2 readiness posture before engaging auditors or compliance vendors.
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
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
                    <span><strong>Prioritize</strong>: Focus on the specific potential gaps identified by the assessment before engaging an auditor.</span>
                  </li>
              </ul>
              <p className="text-slate-600 italic text-sm">
                The estimates provide a starting point for internal planning — not a substitute for professional audit services.
              </p>
            </div>

          {/* Inline CTA */}
          <div className="pt-4 border-t border-slate-200">
            <Link 
              href="/soc-2-readiness-calculator"
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
      <AboutSection />

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
                  RiscLens calculates SOC 2 readiness on a <strong>0–100 scale</strong> using a <strong>risk-based scoring logic</strong>. Every score is derived from explicit weights mapped to the <strong>AICPA Trust Services Criteria (TSC)</strong>:
                </p>
                <ul className="space-y-2 text-slate-600 mb-3">
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium shrink-0">•</span>
                    <span><strong>Company Size & Structure</strong> affects documentation scope and control ownership complexity.</span>
                  </li>
                    <li className="flex gap-3">
                      <span className="text-brand-600 font-medium shrink-0">•</span>
                      <span><strong>Data Sensitivity</strong> (PII, financial, health) determines commonly expected controls (mapped to CC6.1).</span>
                    </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium shrink-0">•</span>
                    <span><strong>Audit Timeline</strong> urgency impacts resource allocation and preparation costs.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium shrink-0">•</span>
                    <span><strong>Industry Vertical</strong> influences baseline compliance expectations for SaaS, Fintech, and Healthcare.</span>
                  </li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  The result includes a <strong>readiness band</strong> (Pre-audit, Early-stage, Near-ready, or Audit-ready) and a <strong>cost range estimate</strong> covering auditor fees, internal effort, and tooling costs.
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
                  Is this a SOC 2 audit or attestation?
                </h3>
                <p className="text-slate-600 leading-relaxed mb-3">
                  No. RiscLens provides a <strong>readiness assessment</strong>, not an audit or attestation.
                </p>
                <ul className="space-y-2 text-slate-600 mb-3">
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>SOC 2 audits</strong> must be performed by licensed CPA firms</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>SOC 2 reports</strong> are formal attestations issued by auditors</span>
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
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-colors"
              >
                Start your assessment
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
