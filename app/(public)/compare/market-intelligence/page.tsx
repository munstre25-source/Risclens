import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { InteractivePlatformComparer } from '@/components/calculators/InteractivePlatformComparer';
import { getSupabaseAdmin } from '@/lib/supabase';
import { Shield, Zap, TrendingUp, BarChart3, Lock, Search } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Interactive Market Intelligence Tool | Platform Comparison | RiscLens',
  description: 'Compare Vanta, Drata, Secureframe, Sprinto, and Thoropass side-by-side with real-time pricing transparency and feature analysis.',
  alternates: { canonical: '/compare/market-intelligence' },
};

export const revalidate = 3600; // Revalidate every hour

async function getMarketData() {
  const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('market_insights')
      .select('*')
    .order('vendor_name', { ascending: true });

  if (error) {
    console.error('Error fetching market data:', error);
    return [];
  }

  return data || [];
}

export default async function MarketIntelligencePage() {
  const platforms = await getMarketData();

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.05),rgba(255,255,255,0))] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Live Market Intelligence v2.0</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Pitch Platforms <br />
              <span className="text-brand-600">Against Each Other.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Stop relying on biased sales decks. Use our interactive intelligence engine to compare pricing transparency, automation depth, and actual customer sentiment across the top compliance platforms.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                    {i === 5 ? '+12' : ''}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500">
                <span className="font-bold text-slate-900">Verified data</span> from 100+ recent 2026 contracts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Sidebar Stats/Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Market Context</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Price Volatility</p>
                      <p className="text-xs text-slate-500">Average contract prices have increased 14% since Q3 2025.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">AI Expansion</p>
                      <p className="text-xs text-slate-500">Platforms are bundling AI modules as mandatory "add-ons".</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Lock-in Risks</p>
                      <p className="text-xs text-slate-500">Multi-year commitments are becoming the new standard.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <Link href="/soc-2-cost" className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-2">
                    View Full Cost Guide
                    <Search className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
                <BarChart3 className="w-8 h-8 text-brand-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Platform Selection Quiz</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Can't decide? Our 2-minute diagnostic identifies the best platform for your specific tech stack.
                </p>
                <Link 
                  href="/soc-2-readiness-calculator"
                  className="block w-full text-center bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Start Quiz
                </Link>
              </div>
            </div>

            {/* The Tool */}
            <div className="lg:col-span-3">
              <InteractivePlatformComparer platforms={platforms} />
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-6">Our Methodology</h2>
          <p className="text-lg text-slate-600 mb-12">
            Unlike review sites that take referral fees, RiscLens is 100% independent. Our data comes from anonymized contract submissions, public pricing discovery, and interviews with 500+ security leaders.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-black text-brand-600 mb-2">500+</div>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Sourced Contracts</p>
            </div>
            <div>
              <div className="text-4xl font-black text-brand-600 mb-2">Weekly</div>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Data Refreshes</p>
            </div>
            <div>
              <div className="text-4xl font-black text-brand-600 mb-2">Zero</div>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Referral Fees</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
