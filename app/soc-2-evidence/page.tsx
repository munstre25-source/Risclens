import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { evidenceGuides } from '@/lib/soc2Evidence';
import { Database, Shield, Lock, Activity, RefreshCw, Truck, HardDrive } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SOC 2 Evidence Hub: Guide to Audit Artifacts | RiscLens',
  description: 'Master SOC 2 evidence collection. Browse category-specific guides for access control, change management, and more. Access the Evidence Vault.',
  alternates: { canonical: '/soc-2-evidence' },
};

const iconMap: Record<string, any> = {
  'access-control': <Lock className="w-6 h-6 text-brand-600" />,
  'change-management': <RefreshCw className="w-6 h-6 text-brand-600" />,
  'logging-monitoring': <Activity className="w-6 h-6 text-brand-600" />,
  'incident-response': <Shield className="w-6 h-6 text-brand-600" />,
  'vendor-management': <Truck className="w-6 h-6 text-brand-600" />,
  'business-continuity': <HardDrive className="w-6 h-6 text-brand-600" />,
};

export default function EvidenceHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 pt-8 pb-16 lg:pt-12 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'SOC 2', href: '/soc-2' },
                { label: 'Evidence Hub' }
              ]} 
            />
            
            <div className="mt-8 lg:mt-12 max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-700 mb-6">
                SOC 2 Evidence Library
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl tracking-tight mb-6">
                The SOC 2 <span className="text-brand-600">Evidence Hub</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-10">
                Stop guessing what auditors want. Browse our comprehensive guides for every evidence category and build a vault that passes every review.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/soc-2-evidence/vault"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white font-bold rounded-xl shadow-lg hover:bg-brand-700 transition-all"
                >
                  <Database className="w-5 h-5 mr-2" />
                  Access Evidence Vault
                </Link>
                <Link
                  href="/soc-2-readiness-calculator"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                >
                  Check Readiness Score
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Evidence Categories</h2>
              <p className="text-slate-600 mt-2">Deep-dive guides on what to collect, common mistakes, and auditor expectations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {evidenceGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/soc-2-evidence/${guide.slug}`}
                  className="group bg-white p-8 border border-slate-200 rounded-[2rem] hover:border-brand-500 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors">
                    {React.cloneElement(iconMap[guide.slug] || <Shield />, { 
                      className: "w-6 h-6 text-brand-600 group-hover:text-white transition-colors" 
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {guide.title.split(':')[0]}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {guide.description}
                  </p>
                  <div className="flex items-center text-brand-700 font-bold text-sm">
                    View Guide
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Vault Teaser */}
        <section className="py-20 bg-brand-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6">Ready to build your Evidence Vault?</h2>
              <p className="text-brand-100 text-lg mb-8 leading-relaxed">
                Our Evidence Vault provides a blueprint for structuring your compliance artifacts. Learn how to store evidence with consistent ownership, naming conventions, and retention policies.
              </p>
              <Link
                href="/soc-2-evidence/vault"
                className="inline-flex items-center px-8 py-4 bg-white text-brand-900 font-bold rounded-xl hover:bg-brand-50 transition-all"
              >
                Explore the Vault
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

import React from 'react';
