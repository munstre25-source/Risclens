import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { ArrowRightLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface MigrationGap {
  area: string;
  description: string;
}

interface MigrationPageProps {
  fromFramework: string;
  toFramework: string;
  fromSlug: string;
  toSlug: string;
  heroDescription: string;
  overlapPercentage: number;
  keyGaps: MigrationGap[];
  steps: string[];
}

export default function MigrationPage({
  fromFramework,
  toFramework,
  fromSlug,
  toSlug,
  heroDescription,
  overlapPercentage,
  keyGaps,
  steps,
}: MigrationPageProps) {
  const pageUrl = `https://risclens.com/compliance/migrate/${fromSlug}-to-${toSlug}`;
  const pageTitle = `Migrate from ${fromFramework} to ${toFramework} | RiscLens Roadmap`;
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
          { name: 'Compliance Migration', item: 'https://risclens.com/compliance/migrate' },
          { name: `${fromFramework} to ${toFramework}`, item: pageUrl },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-24 text-center">
          <div className="flex flex-col items-center mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-bold mb-4">
              <span className="bg-brand-600 text-white px-2 py-0.5 rounded text-[10px] uppercase">New</span>
              Framework Expansion Guide
            </div>
            <VerifiedBy authorId="kevin" />
          </div>
          
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 shadow-sm">
              <span className="text-2xl font-black text-slate-900">{fromFramework}</span>
            </div>
            <ArrowRightLeft className="w-8 h-8 text-brand-600 animate-pulse" />
            <div className="bg-brand-50 border-2 border-brand-200 rounded-2xl p-6 shadow-md">
              <span className="text-2xl font-black text-brand-700">{toFramework}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Migrating from {fromFramework} to {toFramework}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            {heroDescription}
          </p>

          <div className="bg-brand-600 rounded-2xl p-1 max-w-md mx-auto mb-12 shadow-lg">
            <div className="bg-white rounded-xl p-4 flex items-center justify-between">
              <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Estimated Overlap</span>
              <span className="text-3xl font-black text-brand-600">{overlapPercentage}%</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/soc-2-cost-calculator"
              className="bg-brand-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Get Multi-Framework Quote
            </Link>
            <Link 
              href="/soc-2-vs-iso-27001"
              className="bg-white border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all"
            >
              Comparison Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Identifying the Gaps</h2>
          
          <div className="grid gap-6">
            {keyGaps.map((gap, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{gap.area}</h3>
                  <p className="text-slate-600 leading-relaxed">{gap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Your {toFramework} Roadmap</h2>
          
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-brand-500 flex items-center justify-center font-bold text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                  {idx + 1}
                </div>
                <div className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors">
                  {step}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center border-t border-white/10 pt-16">
            <h3 className="text-2xl font-bold mb-4">Ready to expand your compliance?</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Our experts can help you map your existing {fromFramework} controls to {toFramework} in days, not months.
            </p>
            <Link 
              href="/auditor-match"
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all"
            >
              Speak to a Compliance Strategist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <AboutSection />

      <Footer />
      <StickyCTA 
        label={`Expand from ${fromFramework} to ${toFramework}`} 
        targetHref="/soc-2-cost-calculator" 
      />
    </main>
  );
}
