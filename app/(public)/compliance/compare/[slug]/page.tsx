import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Shield, Zap, Target, Lock, TrendingUp, AlertCircle, ChevronRight, Check, X, ArrowRight } from 'lucide-react';
import { getSupabaseAdmin } from '@/lib/supabase';
import FrameworkComparisonView from '@/components/compliance/FrameworkComparisonView';

// URLs to redirect to canonical /compare/* versions (tool comparisons)
const REDIRECT_TO_COMPARE = [
  'vanta-vs-drata',
  'vanta-vs-secureframe', 
  'drata-vs-secureframe',
  'drata-vs-thoropass',
  'vanta-vs-thoropass',
  'secureframe-vs-thoropass',
  'vanta-vs-sprinto',
  'drata-vs-sprinto',
  'secureframe-vs-sprinto',
  'thoropass-vs-strike-graph',
  'drata-vs-laika',
  'vanta-vs-onetrust',
];

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  const supabase = getSupabaseAdmin();
  
  // Get all pSEO comparison pages
  const { data: pseoPages } = await supabase
    .from('pseo_pages')
    .select('slug')
    .in('category', ['alternatives', 'framework_comparison']);

  const staticSlugs = ['vanta-vs-drata', 'vanta-vs-secureframe', 'drata-vs-secureframe'];
  const pseoSlugs = pseoPages?.map(p => p.slug) || [];
  
  const allSlugs = Array.from(new Set([...staticSlugs, ...pseoSlugs]));
  return allSlugs.map(slug => ({ slug }));
}

async function getPseoPage(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('*, pseo_frameworks(*)')
    .eq('slug', slug)
    .single();
  return data;
}

/**
 * Generate metadata with canonical pointing to /compare/* for tool comparisons
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  // If it's a tool comparison, canonical should point to /compare/*
  if (slug.includes('-vs-') && !slug.includes('hipaa') && !slug.includes('gdpr') && !slug.includes('pci') && !slug.includes('iso') && !slug.includes('soc')) {
    return {
      title: `${formatSlug(slug)} Comparison | RiscLens`,
      alternates: {
        canonical: `https://risclens.com/compare/${slug}`,
      },
      robots: {
        index: false, // Don't index duplicate URLs
        follow: true,
      }
    };
  }
  
  // Framework comparisons stay at /compliance/compare/*
  return {
    title: `${formatSlug(slug)} | Compliance Framework Comparison`,
    alternates: {
      canonical: `https://risclens.com/compliance/compare/${slug}`,
    }
  };
}

function formatSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(' Vs ', ' vs ');
}

export default async function ComparisonPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Redirect tool comparisons to canonical /compare/* URL
  if (REDIRECT_TO_COMPARE.includes(slug)) {
    redirect(`/compare/${slug}`);
  }
  
  const page = await getPseoPage(slug);
  
  if (page && page.category === 'framework_comparison') {
    const { 
      title, 
      description, 
      frameworkA, 
      frameworkB, 
      tableRows, 
      decisions, 
      faqs 
    } = page.content_json;

    return (
      <>
        <Header />
        <FrameworkComparisonView
          title={title}
          description={description}
          frameworkA={frameworkA}
          frameworkB={frameworkB}
          tableRows={tableRows}
          decisions={decisions}
          faqs={faqs}
          lastUpdated={new Date(page.updated_at || page.created_at).toISOString().split('T')[0]}
        />
        <Footer />
      </>
    );
  }

  // Fallback to legacy static or other pSEO types
  const parts = slug.split('-vs-');
  const platformA = parts[0]?.charAt(0).toUpperCase() + parts[0]?.slice(1) || 'Platform A';
  const platformB = parts[1]?.charAt(0).toUpperCase() + parts[1]?.slice(1) || 'Platform B';

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Unbiased Intelligence</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            {platformA} vs {platformB}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The deterministic comparison for B2B startups. We analyze cost, speed-to-audit, and auditor flexibility.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-12">
          <div className="grid grid-cols-3 border-b border-slate-100">
            <div className="p-6 bg-slate-50 border-r border-slate-100 font-bold text-slate-400 text-xs uppercase tracking-widest">Feature</div>
            <div className="p-6 font-bold text-slate-900 text-center">{platformA}</div>
            <div className="p-6 font-bold text-slate-900 text-center">{platformB}</div>
          </div>
          
          {[
            { feature: 'Automated Evidence', a: true, b: true },
            { feature: 'Custom Auditor Choice', a: 'Limited', b: 'Flexible' },
            { feature: 'ISO 42001 Support', a: 'Early', b: 'Developing' },
            { feature: 'API-First Architecture', a: true, b: true },
            { feature: 'Fixed Pricing', a: 'Tiered', b: 'Volume-based' },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-3 border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
              <div className="p-6 border-r border-slate-100 text-sm font-bold text-slate-700">{row.feature}</div>
              <div className="p-6 flex items-center justify-center text-sm font-medium">
                {typeof row.a === 'boolean' ? (row.a ? <Check className="text-emerald-500 w-5 h-5" /> : <X className="text-red-400 w-5 h-5" />) : row.a}
              </div>
              <div className="p-6 flex items-center justify-center text-sm font-medium border-l border-slate-50">
                {typeof row.b === 'boolean' ? (row.b ? <Check className="text-emerald-500 w-5 h-5" /> : <X className="text-red-400 w-5 h-5" />) : row.b}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Stop comparing features. <br /><span className="text-brand-400">Compare Readiness.</span></h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl">
              Picking the wrong platform can add 4 months to your audit timeline. Use our Readiness Index to see which path is fastest for your specific tech stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/soc-2-readiness-index" 
                className="bg-brand-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-700 transition-all flex items-center justify-center gap-2"
              >
                Start Readiness Index
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/soc-2-cost-calculator" 
                className="bg-white/10 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-center"
              >
                Calculate Costs
              </Link>
            </div>
          </div>
          <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl" />
        </div>

        <div className="mt-16 prose prose-slate max-w-none">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">The Truth About {platformA} vs {platformB}</h3>
          <p className="text-slate-600 leading-relaxed">
            While both {platformA} and {platformB} offer market-leading compliance automation, the "winner" depends entirely on your auditor relationship. Most startups fail to realize that the platform is just the pipes—the auditor provides the water.
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            RiscLens recommends using our <strong>Auditor Directory</strong> to find a firm that has experience with your chosen platform before you sign a contract. This can save you up to $5,000 in redundant evidence collection fees.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
