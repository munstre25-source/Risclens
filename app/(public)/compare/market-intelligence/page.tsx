
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, BarChart3, ShieldCheck, Zap, Scale, Layers } from 'lucide-react';
import { getAllTools, TOP_TOOLS } from '@/lib/compliance-tools';
import { Breadcrumbs } from '@/components/InternalLinks';
import { getBreadcrumbs } from '@/lib/pseo-internal-links';

export const metadata: Metadata = {
  title: 'Market Intelligence: Compliance Automation Comparison Hub 2026',
  description: 'Unbiased comparison of top compliance automation platforms including Vanta, Drata, Secureframe, and more. Compare pricing, features, and expert verdicts.',
};

export default async function MarketIntelligencePage() {
  const tools = await getAllTools();
  const breadcrumbs = getBreadcrumbs('/compare/market-intelligence');

  const topToolObjects = tools.filter(t => TOP_TOOLS.includes(t.slug));
  const otherTools = tools.filter(t => !TOP_TOOLS.includes(t.slug));

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Market Intelligence Hub</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            The Compliance Automation <span className="text-blue-600">Landscape</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Independent, data-driven analysis of the top 20+ compliance platforms. We track pricing, feature parity, and auditor networks so you don't have to.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Unbiased Comparisons</h3>
            <p className="text-slate-600">Head-to-head analysis of features, automation levels, and implementation speed.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Real Pricing Data</h3>
            <p className="text-slate-600">Crowdsourced pricing ranges, hidden fees, and bundled vs. separate auditor costs.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Verdicts</h3>
            <p className="text-slate-600">Nuanced recommendations based on your company size, industry, and tech stack.</p>
          </div>
        </div>

        {/* Top Tool Comparisons */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Layers className="w-8 h-8 text-blue-600" />
            Primary Market Comparisons
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generateTopComparisons(topToolObjects).map((comp, i) => (
              <Link 
                key={i} 
                href={`/compare/${comp.slug}`}
                className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center font-bold text-slate-400">
                      {comp.toolA.charAt(0)}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center font-bold text-blue-600">
                      {comp.toolB.charAt(0)}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {comp.toolA} vs {comp.toolB}
                </h3>
                <p className="text-sm text-slate-500 mt-2">Compare features, pricing, and ROI</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Directory List */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-blue-900" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Platform Directory</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">
            Detailed guides, pricing, and alternatives for every major player in the compliance ecosystem.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            <div>
              <h4 className="font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 uppercase text-xs tracking-widest">Market Leaders</h4>
              <ul className="space-y-4">
                {topToolObjects.map(tool => (
                  <li key={tool.slug}>
                    <Link href={`/compare/${tool.slug}-alternatives`} className="text-slate-600 hover:text-blue-600 font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 uppercase text-xs tracking-widest">Growth & Vertical</h4>
              <ul className="space-y-4">
                {otherTools.slice(0, 6).map(tool => (
                  <li key={tool.slug}>
                    <Link href={`/compare/${tool.slug}-alternatives`} className="text-slate-600 hover:text-blue-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 uppercase text-xs tracking-widest">Enterprise & GRC</h4>
              <ul className="space-y-4">
                {otherTools.slice(6, 12).map(tool => (
                  <li key={tool.slug}>
                    <Link href={`/compare/${tool.slug}-alternatives`} className="text-slate-600 hover:text-blue-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 uppercase text-xs tracking-widest">Specialized</h4>
              <ul className="space-y-4">
                {otherTools.slice(12).map(tool => (
                  <li key={tool.slug}>
                    <Link href={`/compare/${tool.slug}-alternatives`} className="text-slate-600 hover:text-blue-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Need a custom recommendation?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Our SOC 2 Readiness Calculator takes your company data and suggests the best platform and auditor for your specific needs.
          </p>
          <Link 
            href="/soc-2-readiness-calculator" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            Start Readiness Assessment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function generateTopComparisons(tools: any[]) {
  const comparisons = [];
  const primarySlugs = ['vanta', 'drata', 'secureframe', 'sprinto'];
  const primaryTools = tools.filter(t => primarySlugs.includes(t.slug));

  for (let i = 0; i < primaryTools.length; i++) {
    for (let j = i + 1; j < primaryTools.length; j++) {
      const toolA = primaryTools[i];
      const toolB = primaryTools[j];
      const sorted = [toolA.slug, toolB.slug].sort();
      comparisons.push({
        slug: `${sorted[0]}-vs-${sorted[1]}`,
        toolA: toolA.name,
        toolB: toolB.name
      });
    }
  }

  // Add some cross-tier comparisons
  comparisons.push({ slug: 'vanta-vs-auditboard', toolA: 'Vanta', toolB: 'AuditBoard' });
  comparisons.push({ slug: 'drata-vs-hyperproof', toolA: 'Drata', toolB: 'Hyperproof' });
  comparisons.push({ slug: 'vanta-vs-thoropass', toolA: 'Vanta', toolB: 'Thoropass' });

  return comparisons;
}
