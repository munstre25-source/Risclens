import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolAlternativePage from '@/components/ToolAlternativePage';
import { getSupabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Shield, Zap, Target, Lock, TrendingUp, AlertCircle, ChevronRight, Check, X, ArrowRight } from 'lucide-react';
import { getContentPage } from '@/lib/content';
import { LastVerifiedBadge, AccuracyDisclaimer } from '@/components/AccuracyGuards';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContextualLinks } from '@/components/compliance/ContextualLinks';
import { EditorialPolicyBadge } from '@/components/compliance/AuthorByline';

async function getAlternativePage(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('slug', slug)
    .eq('category', 'alternatives')
    .single();
  
  return data;
}

export function generateStaticParams() {
  const platforms = ['vanta', 'drata', 'secureframe', 'thoropass', 'laika', 'strike-graph'];
  const params: { slug: string }[] = [];
  
  for (let i = 0; i < platforms.length; i++) {
    for (let j = i + 1; j < platforms.length; j++) {
      params.push({ slug: `${platforms[i]}-vs-${platforms[j]}` });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  if (slug.includes('-vs-')) {
    const parts = slug.split('-vs-');
    const platformA = parts[0]?.charAt(0).toUpperCase() + parts[0]?.slice(1) || 'Platform A';
    const platformB = parts[1]?.charAt(0).toUpperCase() + parts[1]?.slice(1) || 'Platform B';
    
    return {
      title: `${platformA} vs ${platformB} | Compliance Automation Comparison`,
      description: `Compare ${platformA} and ${platformB} side-by-side. Analyze features, pricing, and auditor flexibility for your compliance journey.`,
      alternates: {
        canonical: `https://risclens.com/compare/${slug}`,
      },
    };
  }
  
  const page = await getAlternativePage(slug);
  
  if (!page) {
    return {
      title: 'Tool Alternatives | RiscLens',
    };
  }

  return {
    title: page.title,
    description: page.meta_description,
    alternates: {
      canonical: `https://risclens.com/compare/${slug}`,
    },
  };
}

export default async function DynamicComparisonOrAlternativePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Handle "vs" Comparisons
  if (slug.includes('-vs-')) {
    const parts = slug.split('-vs-');
    const platformA = parts[0]?.charAt(0).toUpperCase() + parts[0]?.slice(1) || 'Platform A';
    const platformB = parts[1]?.charAt(0).toUpperCase() + parts[1]?.slice(1) || 'Platform B';

    const dbPage = await getContentPage(slug);
    
    const faqSchema = dbPage?.faqs ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      dateModified: dbPage.last_reviewed_at,
      mainEntity: dbPage.faqs.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    } : null;

    return (
      <>
        {faqSchema && (
          <Script
            id={`faq-${slug}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
          <main className="min-h-screen bg-slate-50">
            <Header />
            
            <div className="max-w-4xl mx-auto px-4 pt-8">
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Comparisons Hub', href: '/compare' }, { label: `${platformA} vs ${platformB}` }]} />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
              <div className="text-center mb-16">
                {dbPage && <LastVerifiedBadge date={dbPage.last_reviewed_at} framework={dbPage.framework_version || 'Market Analysis 2026'} />}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Unbiased Intelligence</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                  {platformA} vs {platformB}
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                  {dbPage?.description || `The deterministic comparison for B2B startups. We analyze cost, speed-to-audit, and auditor flexibility.`}
                </p>
                <div className="flex justify-center">
                  <Link href="/compare" className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-700">
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                    Back to Comparison Hub
                  </Link>
                </div>
              </div>

            {dbPage?.author_note && (
              <div className="mb-12 p-6 rounded-2xl bg-brand-50 border border-brand-100 text-brand-900 italic shadow-sm">
                <div className="flex items-center gap-2 mb-2 not-italic font-bold text-brand-800 uppercase tracking-widest text-xs">
                  <Shield size={14} /> Analyst Insight
                </div>
                "{dbPage.author_note}"
              </div>
            )}

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

            {dbPage?.faqs && dbPage.faqs.length > 0 && (
              <div className="mb-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Expert Comparison FAQ</h3>
                <div className="space-y-6">
                  {dbPage.faqs.map((faq: any) => (
                    <div key={faq.question} className="space-y-2">
                      <p className="font-bold text-slate-900">{faq.question}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

              <AccuracyDisclaimer />

              <EditorialPolicyBadge variant="footer" />

              <ContextualLinks currentPageType="alternatives" currentSlug={slug} />
            </div>

            <Footer />
        </main>
      </>
    );
  }

  // Handle "alternatives" pages
  const page = await getAlternativePage(slug);

  if (!page) {
    notFound();
  }

  const { toolName, heroDescription, alternatives, comparisonFactors } = page.content_json;

  return (
    <ToolAlternativePage
      toolName={toolName}
      toolSlug={slug.replace('-alternatives', '')}
      heroDescription={heroDescription}
      alternatives={alternatives}
      comparisonFactors={comparisonFactors}
    />
  );
}
