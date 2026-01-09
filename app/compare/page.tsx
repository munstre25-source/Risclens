import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import PlatformSelector from '@/components/calculators/PlatformSelector';
import { toolComparisons } from '@/lib/toolComparisons';

export const metadata: Metadata = {
  title: 'Compliance Automation Comparisons Hub | Vanta, Drata, Secureframe & More',
  description: 'Compare the leading compliance automation platforms side-by-side. Find the right tool for your SOC 2, ISO 27001, or HIPAA audit.',
  alternates: { canonical: '/compare' },
};

export default function ComparisonsHubPage() {
  const platforms = ['vanta', 'drata', 'secureframe', 'thoropass', 'laika', 'strike-graph'];
  const programmaticComparisons = [];
  
  for (let i = 0; i < platforms.length; i++) {
    for (let j = i + 1; j < platforms.length; j++) {
      const toolA = platforms[i];
      const toolB = platforms[j];
      const slug = `${toolA}-vs-${toolB}`;
      
      // Check if it already exists in manual comparisons to avoid duplicates
      if (!toolComparisons.find(c => c.slug === slug)) {
        programmaticComparisons.push({
          slug,
          toolA: toolA.charAt(0).toUpperCase() + toolA.slice(1),
          toolB: toolB.charAt(0).toUpperCase() + toolB.slice(1),
          description: `The deterministic comparison for B2B startups. We analyze cost, speed-to-audit, and auditor flexibility for ${toolA.charAt(0).toUpperCase() + toolA.slice(1)} and ${toolB.charAt(0).toUpperCase() + toolB.slice(1)}.`,
          isProgrammatic: true
        });
      }
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Comparison Hub</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Compliance Automation <span className="text-brand-600">Showdown</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              We've done the heavy lifting. Compare features, pricing, and audit support across the most popular GRC and compliance tools in the market today.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/compliance-roi-calculator"
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculate Compliance ROI
              </Link>
              <AssessmentCTA />
            </div>
          </div>
          <div className="lg:block">
            <PlatformSelector />
          </div>
        </div>
      </section>

      {/* Comparisons Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Curated Matchups</h2>
            <p className="text-slate-600">High-intent comparisons with deep pricing and feature analysis.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {toolComparisons.map((comparison) => (
              <Link 
                key={comparison.slug}
                href={`/compare/${comparison.slug}`}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-brand-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center font-bold text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                      {comparison.toolA.name.charAt(0)}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center font-bold text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                      {comparison.toolB.name.charAt(0)}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-brand-400">vs</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                  {comparison.toolA.name} vs {comparison.toolB.name}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {comparison.description}
                </p>
                
                <div className="flex items-center text-brand-600 text-sm font-bold group-hover:translate-x-1 transition-transform">
                  View full comparison
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Platform Comparisons</h2>
            <p className="text-slate-600">Programmatic intelligence across the top 6 compliance automation tools.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmaticComparisons.map((comparison) => (
              <Link 
                key={comparison.slug}
                href={`/compliance/compare/${comparison.slug}`}
                className="group flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 transition-all hover:border-brand-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded bg-brand-50 text-brand-600 font-bold text-xs uppercase">
                    vs
                  </div>
                  <span className="font-bold text-slate-800 group-hover:text-brand-700 transition-colors">
                    {comparison.toolA} vs {comparison.toolB}
                  </span>
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          {/* Need help? card */}
          <div className="mt-20 bg-brand-600 rounded-3xl p-8 lg:p-12 text-center text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-bold">Still can't decide?</h2>
              <p className="text-brand-100 max-w-2xl mx-auto text-lg">
                Our free readiness assessment takes 2 minutes and helps you identify which framework you need and which tools best fit your tech stack.
              </p>
              <div className="flex justify-center">
                <Link 
                  href="/soc-2-readiness-calculator"
                  className="bg-white text-brand-600 px-8 py-4 rounded-full font-bold hover:bg-brand-50 transition-colors shadow-lg shadow-black/10"
                >
                  Start Free Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Resources */}
        <div className="mt-16 pt-16 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-100 rounded-3xl p-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">More Compliance Tools</h3>
              <p className="text-slate-600">Explore our other calculators and guides to plan your compliance journey.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/soc-2-cost" className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-brand-300 transition-colors">SOC 2 Cost Guide</Link>
              <Link href="/soc-2-timeline" className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-brand-300 transition-colors">Timeline Estimator</Link>
              <Link href="/penetration-testing/cost-estimator" className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-brand-300 transition-colors">Pentest Estimator</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
