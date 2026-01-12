import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { ArrowRight, Star, Shield, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { getPricingHref } from '@/lib/pseo-links';

interface Alternative {
  name: string;
  slug: string;
  bestFor: string;
  keyStrength: string;
  estimatedPrice: string;
}

interface ToolAlternativePageProps {
  toolName: string;
  toolSlug: string;
  heroDescription: string;
  alternatives: Alternative[];
  comparisonFactors: string[];
}

export default function ToolAlternativePage({
  toolName,
  toolSlug,
  heroDescription,
  alternatives = [],
  comparisonFactors = [],
}: ToolAlternativePageProps) {
  const pageUrl = `https://risclens.com/compare/${toolSlug}-alternatives`;
  const pageTitle = `Top ${toolName} Alternatives for 2026 | RiscLens Report`;
  const lastUpdated = "January 10, 2026";

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <GeneralPageSchema
        title={pageTitle}
        description={heroDescription}
        url={pageUrl}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'Market Comparisons', item: 'https://risclens.com/compare' },
          { name: `${toolName} Alternatives`, item: pageUrl },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-24 text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
              Market Intelligence Report
            </div>
            <VerifiedBy authorId="raphael" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Top {toolName} <span className="text-brand-600">Alternatives</span> for 2026
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {heroDescription}
          </p>
          <div className="flex justify-center">
            <Link 
              href={getPricingHref(toolSlug)}
              className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors bg-brand-50 px-6 py-3 rounded-xl border border-brand-100"
            >
              <DollarSign className="w-5 h-5" />
              View Full {toolName} Pricing Analysis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Alternatives List */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ExpertReview authorId="raphael" date={lastUpdated} />
          
          <div className="grid gap-8 mt-12">
            {alternatives.map((alt, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Star className="w-24 h-24 text-brand-600" />
                </div>
                
                <div className="grid md:grid-cols-4 gap-8 items-center">
                  <div className="md:col-span-1">
                    <Link href={`/pricing/${alt.slug}`} className="hover:text-brand-600 transition-colors">
                      <h3 className="text-2xl font-black text-slate-900 mb-2">{alt.name}</h3>
                    </Link>
                    <div className="inline-flex items-center gap-1 text-amber-500 mb-4">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Best For</p>
                        <p className="text-slate-700 font-medium">{alt.bestFor}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Key Strength</p>
                        <p className="text-slate-700 font-medium">{alt.keyStrength}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-right">Est. Starting Price</p>
                    <p className="text-2xl font-bold text-brand-600 mb-4">{alt.estimatedPrice}</p>
                    <div className="flex flex-col gap-2">
                      <Link 
                        href={`/compliance/compare/${toolSlug}-vs-${alt.slug}`}
                        className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-all text-sm"
                      >
                        Compare Data
                      </Link>
                      <Link 
                        href={`/pricing/${alt.slug}`}
                        className="text-xs font-bold text-slate-400 hover:text-brand-600 transition-colors underline underline-offset-4"
                      >
                        View {alt.name} Pricing →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AuthorBio authorId="raphael" />

          {/* Market Overview / Related Comparisons */}
          <div className="mt-24 border-t border-slate-200 pt-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Related Market Comparisons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {['Drata', 'Vanta', 'Secureframe', 'Sprinto', 'Thoropass'].filter(t => t.toLowerCase() !== toolName.toLowerCase()).slice(0, 3).map((tool) => (
                <Link
                  key={tool}
                  href={`/compare/${tool.toLowerCase()}-alternatives`}
                  className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all"
                >
                  <p className="text-xs font-bold text-brand-600 uppercase mb-2">Comparison Guide</p>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 mb-4">Top {tool} Alternatives</h4>
                  <div className="flex items-center text-slate-400 text-sm font-medium group-hover:text-brand-600">
                    View Market Report
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Guide */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">How to Evaluate Alternatives</h2>
          <div className="grid sm:grid-cols-2 gap-12">
            {comparisonFactors.map((factor, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-bold text-brand-400">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{factor.split(':')[0]}</h3>
                  <p className="text-slate-400 leading-relaxed">{factor.split(':')[1]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-brand-600 rounded-3xl p-10 text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Unsure which tool fits your stack?</h3>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto text-lg">
              Our 2-minute Readiness Index analyzes your cloud provider, HRIS, and engineering workflow to recommend the fastest path to SOC 2.
            </p>
            <Link 
              href="/soc-2-readiness-index"
              className="inline-flex items-center justify-center bg-white text-brand-600 font-black px-10 py-5 rounded-2xl hover:bg-brand-50 transition-all shadow-xl scale-110"
            >
              Start Free Readiness Index
            </Link>
          </div>
        </div>
      </section>

      <AboutSection />

      <Footer />
      <StickyCTA 
        label={`Compare ${toolName} to the Market`} 
        targetHref="/soc-2-cost-calculator" 
      />
    </main>
  );
}
