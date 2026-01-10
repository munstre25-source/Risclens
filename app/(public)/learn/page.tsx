import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Education Hub | Compliance & Security Learning Center | RiscLens',
  description: 'Master SOC 2, ISO 27001, and Penetration Testing. Operational guides and resources for startups closing enterprise deals.',
  alternates: { canonical: '/learn' },
};

const learningPaths = [
  {
    title: 'SOC 2 Readiness',
    description: 'Deep-dives into access reviews, change management, and evidence patterns for SOC 2 Type II.',
    href: '/learn/soc-2-readiness',
    count: '12+ Guides',
    icon: (
      <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Penetration Testing',
    description: 'Learn how to scope, estimate costs, and prepare for high-quality penetration tests.',
    href: '/penetration-testing',
    count: '6 Resources',
    icon: (
      <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: 'Vendor Risk Management',
    description: 'Best practices for tiering vendors, reviewing SOC 2 reports, and mitigating supply chain risk.',
    href: '/vendor-risk-assessment',
    count: '8 Guides',
    icon: (
      <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: 'Sales & Revenue Impact',
    description: 'How to use compliance to close larger enterprise deals and handle security questionnaires.',
    href: '/soc-2-sales',
    count: '5 Guides',
    icon: (
      <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export default function EducationHubPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 mb-4">The Education Hub</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Compliance Intelligence <span className="text-brand-600">for Startups</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Operational playbooks and deep-dives for teams moving beyond simple automation to high-assurance security postures.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link 
              href="/soc-2-readiness-calculator"
              className="bg-brand-600 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200/50"
            >
              Start Free Assessment
            </Link>
            <Link 
              href="/soc-2-cost"
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all"
            >
              SOC 2 Cost Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Paths Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">Choose your Learning Path</h2>
            <p className="text-slate-600 mt-2">Structured resources to master every pillar of modern compliance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {learningPaths.map((path) => (
              <Link 
                key={path.href}
                href={path.href}
                className="group flex flex-col sm:flex-row items-start gap-6 bg-white border border-slate-200 rounded-3xl p-8 transition-all hover:shadow-xl hover:border-brand-200 hover:-translate-y-1"
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                  {path.icon}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">{path.title}</h3>
                    <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider">{path.count}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {path.description}
                  </p>
                  <div className="flex items-center text-brand-600 text-sm font-bold pt-2">
                    Start learning
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Deep Dives */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-900 rounded-[3rem] p-8 lg:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Popular Deep Dives</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Type I vs Type II: Choosing the right audit', href: '/soc-2-type-i-vs-type-ii' },
                    { title: 'The Cost of Audit Delays', href: '/soc-2-audit-delay-cost' },
                    { title: 'ISO 27001 Gap Analysis Checklist', href: '/iso-27001-checklist' },
                    { title: 'SOC 2 for FinTech: Regulatory Requirements', href: '/soc-2-readiness/fintech' },
                  ].map((guide) => (
                    <Link 
                      key={guide.href}
                      href={guide.href}
                      className="flex items-center justify-between group border-b border-white/10 pb-4 hover:border-brand-500 transition-colors"
                    >
                      <span className="text-lg font-medium group-hover:text-brand-400 transition-colors">{guide.title}</span>
                      <svg className="w-5 h-5 text-white/30 group-hover:text-brand-400 transition-all group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold">New: AI Compliance Hub</h3>
                <p className="text-slate-400 leading-relaxed">
                  We&apos;ve just launched our deep-dive into ISO 42001 and the EU AI Act. Learn how to prepare your LLM-based applications for enterprise security reviews.
                </p>
                <Link 
                  href="/ai-compliance"
                  className="inline-block bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                >
                  Explore AI Compliance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
