import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Cloud, Server, Shield, CheckCircle } from 'lucide-react';

interface TechControl {
  title: string;
  implementation: string;
}

interface TechStackSOC2PageProps {
  platformName: string;
  platformSlug: string;
  heroDescription: string;
  keyControls: TechControl[];
  bestPractices: string[];
}

export default function TechStackSOC2Page({
  platformName,
  platformSlug,
  heroDescription,
  keyControls,
  bestPractices,
}: TechStackSOC2PageProps) {
  const pageUrl = `https://risclens.com/soc-2/stack/${platformSlug}`;
  const pageTitle = `SOC 2 Compliance for ${platformName} | RiscLens Guide`;
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
          { name: 'Tech Stack Compliance', item: 'https://risclens.com/soc-2/stack' },
          { name: platformName, item: pageUrl },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24 text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              Stack-Specific Compliance
            </div>
            <VerifiedBy authorId="kevin" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            SOC 2 Compliance for <span className="text-brand-600">{platformName}</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroDescription}
          </p>
          
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
              <Cloud className="w-10 h-10 text-indigo-600" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/soc-2-cost-calculator"
              className="bg-brand-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Get {platformName} Audit Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Core {platformName} Controls</h2>
          
          <div className="grid gap-8">
            {keyControls.map((control, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-brand-200 transition-colors">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{control.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {control.implementation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-16 lg:py-24 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Auditor-Vetted Best Practices</h2>
              <div className="space-y-4">
                {bestPractices.map((practice, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-brand-400 flex-shrink-0 mt-1" />
                    <p className="text-indigo-100">{practice}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <Shield className="w-12 h-12 text-brand-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">Infrastructure-as-Code (IaC) is Key</h3>
              <p className="text-indigo-200 mb-8">
                The fastest way to achieve SOC 2 on {platformName} is to define your entire environment in code. This provides an immutable audit trail that auditors love.
              </p>
              <Link 
                href="/soc-2-readiness-checklist"
                className="inline-block bg-white text-indigo-900 font-bold px-6 py-3 rounded-lg hover:bg-brand-50 transition-all"
              >
                View IaC Checklist
              </Link>
            </div>
          </div>
        </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <AuthorBio authorId="kevin" />
          </div>
        </section>

        <AboutSection />


      <Footer />
      <StickyCTA 
        label={`Secure your ${platformName} Stack for SOC 2`} 
        targetHref="/soc-2-cost-calculator" 
      />
    </main>
  );
}
