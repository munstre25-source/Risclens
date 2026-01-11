import Link from 'next/link';
import { 
  DollarSign, 
  Search, 
  TrendingUp, 
  Calculator,
  ShieldCheck,
  Zap,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { getSupabaseAdmin } from '@/lib/supabase';

async function getPricingPages() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('slug, content_json')
    .eq('category', 'pricing')
    .order('slug');
  
  return data || [];
}

async function getAlternativesPages() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('slug, content_json')
    .eq('category', 'alternatives')
    .order('slug');
  
  return data || [];
}

export default async function PricingHub() {
  const pricingPages = await getPricingPages();
  const alternativesPages = await getAlternativesPages();

  const toolLinks = pricingPages
    .filter(p => p.content_json?.toolName || p.content_json?.vendor || p.content_json?.title)
    .map(p => {
      const toolName = p.content_json.toolName || p.content_json.vendor || 'Tool';
      return {
        name: `${toolName} Pricing`,
        href: `/pricing/${p.slug}`,
        vendor: toolName
      };
    });

  const comparisonLinks = alternativesPages
    .filter(alt => alt.content_json?.toolName || alt.content_json?.vendor || alt.content_json?.title)
    .map(alt => {
      const toolName = alt.content_json.toolName || alt.content_json.vendor || 'Tool';
      return {
        name: `${toolName} Alternatives`,
        href: `/compare/${alt.slug}`
      };
    });

    const costCalculators = [
      { name: 'SOC 2 Cost Guide', href: '/soc-2-cost', description: 'Deep dive into total compliance budgeting' },
      { name: 'SOC 2 Cost Calculator', href: '/soc-2-cost-calculator', description: 'Estimate your total compliance budget' },
      { name: 'Timeline Estimator', href: '/soc-2-timeline/estimator', description: 'Calculate time to audit readiness' },
      { name: 'Compliance ROI', href: '/compliance-roi-calculator', description: 'Measure the business value of SOC 2' },
    ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Compliance <span className="text-brand-600">Pricing Intelligence</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Stop overpaying for compliance. Access verified pricing data, platform comparisons, and cost calculators to budget your SOC 2 journey with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/soc-2-cost-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-700 transition-all shadow-lg"
            >
              Calculate My SOC 2 Cost
              <Calculator className="w-5 h-5" />
            </Link>
            <Link 
              href="/compare"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-200 transition-all"
            >
              Compare Platforms
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Intelligence Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Tool Pricing */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-brand-100 rounded-2xl">
                <DollarSign className="w-6 h-6 text-brand-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">Tool Pricing</h2>
            </div>
            <ul className="space-y-4">
              {toolLinks.length > 0 ? (
                toolLinks.map((link, i) => (
                  <li key={i}>
                    <Link 
                      href={link.href}
                      className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-brand-600">{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))
              ) : (
                ['Vanta', 'Drata', 'Secureframe', 'Sprinto'].map((tool, i) => (
                  <li key={i}>
                    <Link 
                      href={`/pricing/${tool.toLowerCase()}`}
                      className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-brand-600">{tool} Pricing</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Cost Calculators */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">Calculators</h2>
            </div>
            <ul className="space-y-4">
              {costCalculators.map((calc, i) => (
                <li key={i}>
                  <Link 
                    href={calc.href}
                    className="group block p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-700 group-hover:text-blue-600">{calc.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-slate-500">{calc.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternatives & Market Intel */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">Market Intel</h2>
            </div>
            <ul className="space-y-4">
              {comparisonLinks.slice(0, 4).map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href}
                    className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all"
                  >
                    <span className="font-bold text-slate-700 group-hover:text-emerald-600">{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/compare"
                  className="group flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:border-emerald-500 transition-all"
                >
                  <span className="font-bold text-emerald-700">Browse All Comparisons</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Why Pricing Matters */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
              Why Transparent <span className="text-brand-600">Pricing Data</span> Matters
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Verify Sales Quotes</h3>
                  <p className="text-slate-600 text-sm">Compare the quotes you receive from vendors against verified market data to ensure you're getting a fair deal.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Budget Accuracy</h3>
                  <p className="text-slate-600 text-sm">Don't get blindsided by hidden costs like implementation fees, premium support, or mandatory auditor pairings.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Objective Comparisons</h3>
                  <p className="text-slate-600 text-sm">Our data is collected from actual user reports and public disclosures, not marketing material.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-brand-600/5 blur-3xl rounded-full" />
            <div className="relative bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Sample Cost Breakdown</h3>
                <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full">2026 Estimate</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Platform License</span>
                  <span className="text-slate-900 font-bold">$7,500 – $12,000</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Auditor Fees</span>
                  <span className="text-slate-900 font-bold">$10,000 – $15,000</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Penetration Test</span>
                  <span className="text-slate-900 font-bold">$3,500 – $7,000</span>
                </div>
                <div className="pt-4 flex justify-between items-center">
                  <span className="text-slate-900 font-black">Total Estimated Cost</span>
                  <span className="text-brand-600 font-black text-xl">$21,000+</span>
                </div>
              </div>
              <Link 
                href="/soc-2-cost-calculator"
                className="mt-8 w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all"
              >
                Run Your Full Calculation
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-brand-600 rounded-[2rem] p-8 sm:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-900/20 blur-3xl rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 tracking-tight">Ready to start your SOC 2 journey?</h2>
            <p className="text-brand-100 text-lg mb-10">
              Join 500+ security-conscious companies using RiscLens to automate their readiness assessment and find the best auditors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/soc-2-readiness-index"
                className="bg-white text-brand-600 font-black px-10 py-5 rounded-2xl hover:bg-brand-50 transition-all shadow-xl"
              >
                Start Free Readiness Assessment
              </Link>
              <Link 
                href="/auditor-directory"
                className="bg-brand-700 text-white font-black px-10 py-5 rounded-2xl border border-brand-500 hover:bg-brand-800 transition-all"
              >
                Find an Auditor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
