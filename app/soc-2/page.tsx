import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DefinitionCallout from '@/components/DefinitionCallout';
import { HowItWorksButton } from '@/components/HowItWorksButton';
import { messaging } from '@/src/content/messaging';

const lastUpdated = '2026-01-05';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is SOC 2 compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SOC 2 is an auditing framework that evaluates whether your service providers have controls in place to help protect customer data. It assesses security practices across five Trust Service Criteria.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to get SOC 2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type I usually takes 2-3 months of prep, while Type II requires a 3-12 month observation window after Type I is complete.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does SOC 2 cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Total costs range from $20k to $100k+ depending on company size, technical complexity, and whether you use automation tools.',
      },
    },
  ],
};

const SOC2_TOOLS = [
  {
    id: 'delay',
    href: '/soc-2-audit-delay-cost',
    title: 'Audit Delay Cost Calculator',
    summary: 'Estimate revenue stalled by audit timelines and enterprise deal pressure.',
    cta: 'Calculate Delay Cost'
  },
  {
    id: 'readiness',
    href: '/soc-2-readiness-calculator',
    title: 'SOC 2 Readiness Calculator',
    summary: 'Flagship gap assessment tool to identify potential gaps for an audit.',
    cta: 'Start Readiness Assessment'
  },
  {
    id: 'cost',
    href: '/soc-2-cost-calculator',
    title: 'SOC 2 Cost Calculator',
    summary: 'Market-aligned pricing estimator for audits, tools, and engineering time.',
    cta: 'Estimate Audit Costs'
  },
  {
    id: 'timeline',
    href: '/soc-2-timeline/estimator',
    title: 'SOC 2 Timeline Estimator',
    summary: 'Plan your Type I and Type II windows based on your security maturity.',
    cta: 'Plan Your Timeline'
  },
  {
    id: 'roi',
    href: '/compliance-roi-calculator',
    title: 'Compliance ROI Calculator',
    summary: 'Compare Manual vs Automation vs All-in-One approaches for your team.',
    cta: 'Calculate Compliance ROI'
  }
];

const SOC2_GUIDES = [
  { href: '/soc-2-audit-delays-cost', title: 'Why Audits Get Delayed', summary: 'Learn why SOC 2 timelines slip and the compounding impact on enterprise deals.' },
  { href: '/soc-2-readiness-checklist', title: 'Readiness Checklist', summary: 'A step-by-step prep list for technical, operational, and HR controls.' },
  { href: '/soc-2-evidence', title: 'Evidence Vault', summary: 'Browse common evidence requests and auditor expectations for each trust criteria.' },
  { href: '/soc-2-type-i-vs-type-ii', title: 'Type I vs Type II', summary: 'Understand the difference in scope, cost, and effort between reports.' },
  { href: '/soc-2-vs-iso-27001', title: 'SOC 2 vs ISO 27001', summary: 'Compare the two most popular security frameworks for B2B companies.' },
  { href: '/soc-2-sales', title: 'Sales Enablement', summary: 'How to use your SOC 2 report to close enterprise deals faster.' },
  { href: '/when-do-you-need-soc-2', title: 'Timing & Necessity', summary: 'Signals that indicate it is time to start your SOC 2 journey.' },
];

const SOC2_INDUSTRIES = [
  { name: 'SaaS', summary: 'Focus on multi-tenancy, SDLC, and cloud infrastructure security.', href: '/soc-2/industries/saas', bg: 'bg-white' },
  { name: 'Fintech', summary: 'Deep review of transaction integrity, encryption, and segregation of duties.', href: '/soc-2/industries/fintech', bg: 'bg-slate-50' },
  { name: 'Healthcare', summary: 'Emphasis on ePHI protection, breach notification, and HIPAA crossover.', href: '/soc-2/industries/healthcare', bg: 'bg-slate-50' },
  { name: 'Startups', summary: 'Lean compliance path: prioritize Security TSC and automate evidence.', href: '/soc-2/industries/startups', bg: 'bg-white' },
];

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Hub | Audit Prep, Cost, & Timeline | RiscLens',
  description: 'The mission control for SOC 2 readiness. Use our gap assessment, cost estimator, and timeline tools to prepare for your audit with confidence.',
  alternates: { canonical: '/soc-2' },
  openGraph: {
    title: 'SOC 2 Readiness Hub | Audit Prep, Cost, & Timeline | RiscLens',
    description: 'The mission control for SOC 2 readiness. Use our gap assessment, cost estimator, and timeline tools.',
    url: 'https://risclens.com/soc-2',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2 Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Readiness Hub | Audit Prep, Cost, & Timeline | RiscLens',
    description: 'The mission control for SOC 2 readiness. Use our gap assessment, cost estimator, and timeline tools.',
    images: ['/og.png'],
  },
};

export default function Soc2HubPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="soc2-hub-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">The SOC 2 Readiness Engine</p>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight">
              {messaging.soc2Hub.hero.headline}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {messaging.soc2Hub.hero.subhead}
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/soc-2-audit-delay-cost"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-lg shadow-md transition-all text-lg"
              >
                Calculate Audit Delay Cost
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </Link>

            <Link
              href="/soc-2-readiness-calculator"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-semibold px-8 py-4 rounded-lg shadow-sm transition-all text-lg"
            >
              Check Readiness Score
              <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
            <div className="hidden sm:block">
              <HowItWorksButton />
            </div>
          </div>
          
          <p className="text-sm text-slate-500">Last updated: {lastUpdated}. All tools align with latest AICPA TSC standards.</p>
          
          <div className="max-w-3xl mx-auto mt-10">
            <DefinitionCallout
              title="What is SOC 2?"
              description="SOC 2 is a voluntary compliance standard for service organizations, developed by the AICPA, which specifies how organizations should manage customer data based on Trust Services Criteria (TSC)."
              linkKey="soc2Overview"
            />
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Featured Planning Tools</h2>
            <p className="text-slate-600">Interactive calculators to de-risk your compliance journey.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SOC2_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block border border-brand-100 bg-white rounded-2xl p-6 shadow-sm hover:border-brand-300 hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3">
                   <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Interactive
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 mt-4">{tool.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{tool.summary}</p>
                <div className="flex items-center text-xs font-bold text-brand-700 uppercase tracking-widest group-hover:gap-2 transition-all">
                  Launch {tool.id === 'roi' ? 'Calculator' : tool.id === 'cost' ? 'Estimator' : 'Tool'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDES SECTION */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Core SOC 2 Guides</h2>
            <p className="text-slate-600">Deep dives into technical controls, evidence, and report types.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {SOC2_GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block border border-slate-200 bg-white rounded-2xl p-6 hover:border-brand-200 transition-all"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700">{guide.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{guide.summary}</p>
                  <span className="text-xs font-semibold text-brand-700 flex items-center">
                    Review Checklist
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Industry-Specific Playbooks</h2>
            <p className="text-slate-600">Tailored SOC 2 advice for your specific business model.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SOC2_INDUSTRIES.map((industry) => (
              <Link
                key={industry.href}
                href={industry.href}
                className={`block border border-slate-200 rounded-2xl p-6 transition-all hover:border-brand-200 hover:shadow-sm ${industry.bg}`}
              >
                <h3 className="text-base font-bold text-slate-900 mb-2">{industry.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{industry.summary}</p>
                  <span className="text-xs font-medium text-brand-700 underline underline-offset-4">Execute Roadmap</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT & LINKS SECTION */}
      <section className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Why SOC 2 Matters</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                For B2B companies, SOC 2 is often a requirement for closing enterprise deals. It proves to your customers that you have the technical and operational controls to handle their data safely.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-brand-600 font-bold">✓</span>
                  <span>Unlocks larger deals by satisfying security questionnaires early.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-600 font-bold">✓</span>
                  <span>Builds a repeatable security culture within your team.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4" id="how-it-works">
              <h3 className="text-xl font-bold text-slate-900">How to Get Started</h3>
              <ol className="list-decimal list-inside space-y-3 text-sm text-slate-700">
                <li>Run the <Link href="/soc-2-readiness-calculator" className="text-brand-700 underline">Readiness Calculator</Link> to find gaps.</li>
                <li>Use the <Link href="/soc-2-cost-calculator" className="text-brand-700 underline">Cost Calculator</Link> to set your budget.</li>
                <li>Analyze the <Link href="/compliance-roi-calculator" className="text-brand-700 underline">ROI</Link> of automation platforms.</li>
              </ol>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 text-center">Quick Navigation</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Auditor Selection', href: '/soc-2/auditor-selection' },
                { label: 'Continuous Monitoring', href: '/soc-2/continuous-monitoring' },
                { label: 'All SOC 2 Guides', href: '/soc-2/guides' },
                { label: 'Pentest Hub', href: '/penetration-testing' },
                { label: 'Vendor Risk Hub', href: '/vendor-risk-assessment' }
              ].map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="px-4 py-2 rounded-full border border-slate-200 bg-white text-sm font-medium text-brand-700 hover:border-brand-300 hover:bg-brand-50 transition-all shadow-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
