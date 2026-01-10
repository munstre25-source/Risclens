import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { ArrowRight, Star, Shield, Zap, TrendingUp } from 'lucide-react';

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
  alternatives,
  comparisonFactors,
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
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {heroDescription}
          </p>
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
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{alt.name}</h3>
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
                    <Link 
                      href={`/compliance/compare/${toolSlug}-vs-${alt.slug}`}
                      className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-all text-sm"
                    >
                      View Comparison
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AuthorBio authorId="raphael" />
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
