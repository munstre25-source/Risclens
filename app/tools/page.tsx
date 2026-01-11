import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Calculator, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Brain, 
  Target, 
  Users,
  Wrench,
  ArrowRight,
  Sparkles,
  BarChart3,
  FileSearch,
  Building2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compliance Tools Hub | Free Calculators & Assessments | RiscLens',
  description: 'Free compliance tools: SOC 2 Readiness Index, cost calculators, timeline estimators, ROI calculators, and more. Make data-driven compliance decisions.',
  alternates: {
    canonical: 'https://risclens.com/tools',
  },
};

const toolCategories = [
    {
      title: 'Readiness & Scoping',
      description: 'Assess your current state and scope your compliance journey',
      tools: [
        {
          name: 'Evidence Gap Analyzer',
          description: 'AI-powered mapping of your existing policies to SOC 2 controls',
          href: '/evidence-gap-analyzer',
          icon: FileSearch,
          badge: 'AI',
          color: 'brand',
        },
        {
          name: 'SOC 2 Readiness Index',
          description: 'Get a detailed readiness score with actionable recommendations',
          href: '/soc-2-readiness-index',
          icon: Target,
          badge: 'Flagship',
          color: 'blue',
        },
        {
          name: 'AI Governance Readiness',
          description: 'Assess your ISO 42001 AI governance maturity',
          href: '/ai-governance-readiness-index',
          icon: Brain,
          badge: 'New',
          color: 'purple',
        },
      ],
    },
  {
    title: 'Financial & ROI',
    description: 'Calculate costs, savings, and return on investment',
    tools: [
      {
        name: 'SOC 2 Cost Calculator',
        description: 'Estimate total cost of SOC 2 certification',
        href: '/soc-2-cost-calculator',
        icon: Calculator,
        badge: 'Popular',
        color: 'green',
      },
      {
        name: 'Compliance ROI Calculator',
        description: 'Calculate the business value of compliance',
        href: '/compliance-roi-calculator',
        icon: TrendingUp,
        color: 'emerald',
      },
      {
        name: 'Audit Delay Cost Calculator',
        description: 'Quantify the cost of delaying your audit',
        href: '/soc-2-audit-delay-cost',
        icon: DollarSign,
        color: 'amber',
      },
      {
        name: 'ISO 42001 Cost Calculator',
        description: 'Estimate AI governance certification costs',
        href: '/iso-42001-calculator',
        icon: Brain,
        color: 'violet',
      },
    ],
  },
  {
    title: 'Partners & Vendors',
    description: 'Find auditors and assess vendor risk',
    tools: [
      {
        name: 'Auditor Match',
        description: 'Get matched with pre-vetted SOC 2 auditors',
        href: '/auditor-match',
        icon: Users,
        badge: 'Free',
        color: 'indigo',
      },
      {
        name: 'Vendor Risk ROI Calculator',
        description: 'Calculate ROI of vendor risk management',
        href: '/vendor-risk-assessment/roi-calculator',
        icon: Shield,
        color: 'rose',
      },
      {
        name: 'Pentest Cost Estimator',
        description: 'Estimate penetration testing costs',
        href: '/penetration-testing/cost-estimator',
        icon: FileSearch,
        color: 'orange',
      },
    ],
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  brand: { bg: 'bg-brand-50', text: 'text-brand-700', border: 'border-brand-200', iconBg: 'bg-brand-100' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', iconBg: 'bg-blue-100' },
  green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', iconBg: 'bg-green-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', iconBg: 'bg-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', iconBg: 'bg-amber-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', iconBg: 'bg-purple-100' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', iconBg: 'bg-violet-100' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', iconBg: 'bg-indigo-100' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', iconBg: 'bg-rose-100' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', iconBg: 'bg-orange-100' },
};

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
          <section className="bg-white border-b border-slate-200 pt-16 pb-24 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
            <div className="max-w-7xl mx-auto px-4 relative text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-6">
                <Wrench className="w-3 h-3 text-brand-600" />
                <span className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em]">Tools Hub</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                Free Compliance Tools <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">& Calculators</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium mb-10">
                Data-driven tools to assess readiness, estimate costs, calculate ROI, 
                and make informed compliance decisions.
              </p>

              {/* Tool Discovery Guide (Quick Choice) */}
              <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-1 text-left shadow-2xl">
                <div className="bg-slate-900 rounded-[calc(1.5rem-2px)] p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-400" />
                    Which tool do you need right now?
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { q: "I'm just starting out", a: "Readiness Index", href: "/soc-2-readiness-index", icon: Target },
                      { q: "I need to budget", a: "Cost Calculator", href: "/soc-2-cost-calculator", icon: DollarSign },
                      { q: "I have a deal deadline", a: "Timeline Estimator", href: "/soc-2-timeline/estimator", icon: Clock },
                      { q: "I'm building with AI", a: "AI Governance", href: "/ai-governance-readiness-index", icon: Brain },
                    ].map((item) => (
                      <Link 
                        key={item.q}
                        href={item.href}
                        className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-500 transition-all"
                      >
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">{item.q}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white group-hover:text-brand-400">{item.a}</span>
                          <item.icon className="w-4 h-4 text-slate-500 group-hover:text-brand-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

        <div className="max-w-7xl mx-auto px-4 py-16 -mt-12">
          {toolCategories.map((category, categoryIndex) => (
            <div key={category.title} className={categoryIndex > 0 ? 'mt-16' : ''}>
              <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-900">{category.title}</h2>
                <p className="text-slate-600 mt-1">{category.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool) => {
                  const Icon = tool.icon;
                  const colors = colorClasses[tool.color] || colorClasses.brand;
                  
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${colors.iconBg}`}>
                          <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        {tool.badge && (
                          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                        {tool.name}
                      </h3>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center text-brand-600 text-sm font-semibold">
                        <span>Use Tool</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <section className="max-w-7xl mx-auto px-4 pb-24">
          <div className="bg-brand-600 rounded-3xl p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            
            <h2 className="text-3xl sm:text-4xl font-black mb-6 relative z-10">Need a Custom Assessment?</h2>
            <p className="text-brand-50 text-lg mb-10 max-w-2xl mx-auto relative z-10 opacity-90 leading-relaxed font-medium">
              Get a personalized compliance roadmap from our expert team. 
              Free 30-minute consultation included.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link 
                href="/readiness-review"
                className="w-full sm:w-auto px-10 py-5 bg-white text-brand-700 font-black rounded-2xl hover:bg-brand-50 transition-all shadow-xl"
              >
                Request Expert Review
              </Link>
              <Link 
                href="/compliance"
                className="w-full sm:w-auto px-10 py-5 bg-brand-500 text-white border border-brand-400 font-black rounded-2xl hover:bg-brand-400 transition-all shadow-xl"
              >
                Browse Intelligence Hub
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
