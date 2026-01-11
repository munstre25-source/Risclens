import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { industryCostLinks } from '@/lib/industryCostLinks';

export const metadata: Metadata = {
  title: 'SOC 2 Industry Compliance Hub | RiscLens',
  description: 'Explore SOC 2 compliance requirements and costs across 15+ industry verticals. Tailored guides for SaaS, Fintech, Healthcare, AI, and more.',
};

export default function IndustriesHubPage() {
  const topIndustries = industryCostLinks.slice(0, 5);
  const otherIndustries = industryCostLinks.slice(5);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl tracking-tight">
            SOC 2 for your <span className="text-brand-600">Industry</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
            Every industry has unique data risks. Explore tailored SOC 2 compliance guides, cost estimates, and readiness checklists for your specific vertical.
          </p>
        </div>

        {/* Top Industries Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-brand-600 rounded-full" />
            <h2 className="text-2xl font-bold text-slate-900">Top Industries</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topIndustries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} isTop />
            ))}
          </div>
        </div>

        {/* All Verticals Section */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-slate-300 rounded-full" />
            <h2 className="text-2xl font-bold text-slate-900">All Industry Verticals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherIndustries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Not sure where to start?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Get an instant SOC 2 readiness score and a customized roadmap for your industry in under 3 minutes, or explore compliance platform pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/soc-2-readiness-calculator"
                className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-lg transition-all"
              >
                Start Readiness Check
              </Link>
              <Link 
                href="/pricing"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all"
              >
                Compare Platform Pricing
              </Link>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function IndustryCard({ industry, isTop = false }: { industry: any, isTop?: boolean }) {
  return (
    <Link 
      href={industry.hubHref}
      className={`group flex flex-col p-6 bg-white border border-slate-200 rounded-3xl hover:border-brand-500 hover:shadow-xl transition-all duration-300 ${isTop ? 'md:p-8' : 'p-6'}`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className={`font-bold text-slate-900 group-hover:text-brand-600 transition-colors ${isTop ? 'text-2xl' : 'text-lg'}`}>
          {industry.label}
        </h3>
        <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-brand-50 transition-colors">
          <svg className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      
      <p className="text-slate-600 mb-6 flex-grow leading-relaxed text-sm">
        {industry.blurb}
      </p>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 uppercase tracking-tight">
          Guide
        </span>
        {isTop && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-tight">
            Cost Data
          </span>
        )}
      </div>
    </Link>
  );
}
