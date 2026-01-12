import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  DollarSign, 
  Calculator, 
  TrendingUp, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { toolPricing } from '@/src/content/pricing';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';

export const metadata: Metadata = {
  title: 'Compliance Pricing Intelligence | RiscLens',
  description: 'Access verified pricing data, platform comparisons, and cost calculators to budget your SOC 2 journey with confidence.',
};

export default function PricingHubPage() {
  // Map all tools from content
  const tools = toolPricing.map(tool => ({
    name: `${tool.name} Pricing`,
    slug: tool.slug
  })).sort((a, b) => a.name.localeCompare(b.name));

  const calculators = [
    { name: 'SOC 2 Cost Guide', href: '/soc-2-cost', description: 'Deep dive into total compliance budgeting' },
    { name: 'SOC 2 Cost Calculator', href: '/soc-2-cost-calculator', description: 'Estimate your total compliance budget' },
    { name: 'Timeline Estimator', href: '/soc-2-timeline/estimator', description: 'Calculate time to audit readiness' },
    { name: 'Compliance ROI', href: '/compliance-roi-calculator', description: 'Measure the business value of SOC 2' },
  ];

  const marketIntel = [
    { name: 'AuditBoard Alternatives', slug: 'auditboard-alternatives' },
    { name: 'Auth0 Alternatives', slug: 'auth0-alternatives' },
    { name: 'Compliance.ai Alternatives', slug: 'compliance-ai-alternatives' },
    { name: 'Drata Alternatives', slug: 'drata-alternatives' },
    { name: 'Vanta Alternatives', slug: 'vanta-alternatives' },
    { name: 'Secureframe Alternatives', slug: 'secureframe-alternatives' },
    { name: 'Sprinto Alternatives', slug: 'sprinto-alternatives' },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      <GeneralPageSchema 
        title="Compliance Pricing Intelligence"
        description="Access verified pricing data, platform comparisons, and cost calculators to budget your SOC 2 journey with confidence."
        url="https://risclens.com/pricing"
      />
      
      <div className="flex-grow">
        {/* Hero */}
        <section className="py-16 lg:py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-[#002B49] mb-6 tracking-tight">
              Compliance <span className="text-[#0070B8]">Pricing Intelligence</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop overpaying for compliance. Access verified pricing data, platform comparisons, and cost calculators to budget your SOC 2 journey with confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/soc-2-cost-calculator"
                className="w-full sm:w-auto px-8 py-4 bg-[#0070B8] text-white font-bold rounded-lg hover:bg-[#005a96] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10"
              >
                Calculate My SOC 2 Cost
                <Calculator className="w-4 h-4" />
              </Link>
              <Link 
                href="/compare"
                className="w-full sm:w-auto px-8 py-4 bg-slate-100 text-[#002B49] font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                Compare Platforms
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Intelligence Grid */}
        <section className="pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
              
              {/* Tool Pricing Column */}
              <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#0070B8]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-[#002B49] uppercase tracking-wider">Tool Pricing</h2>
                </div>
                <div className="space-y-3">
                  {tools.map((tool) => (
                    <Link 
                      key={tool.slug}
                      href={`/pricing/${tool.slug}`}
                      className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-[#0070B8]">{tool.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0070B8] transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Calculators Column */}
              <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#0070B8]">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-[#002B49] uppercase tracking-wider">Calculators</h2>
                </div>
                <div className="space-y-3">
                  {calculators.map((calc) => (
                    <Link 
                      key={calc.href}
                      href={calc.href}
                      className="flex flex-col p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-700 group-hover:text-[#0070B8]">{calc.name}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0070B8] transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-xs text-slate-400 font-medium tracking-tight uppercase">{calc.description}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Market Intel Column */}
              <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-8">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F9F1] flex items-center justify-center text-[#10B981]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-[#002B49] uppercase tracking-wider">Market Intel</h2>
                </div>
                <div className="space-y-3">
                  {marketIntel.map((intel) => (
                    <Link 
                      key={intel.slug}
                      href={`/compare/${intel.slug}`}
                      className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all group"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-[#10B981]">{intel.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#10B981] transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                  <Link 
                    href="/compare"
                    className="flex items-center justify-between p-5 bg-[#F0FDF4] rounded-xl border border-emerald-100 text-[#059669] font-bold hover:bg-[#DCFCE7] transition-all group mt-6"
                  >
                    <span>Browse All Comparisons</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
