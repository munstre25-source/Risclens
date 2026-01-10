import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { FileText, CheckSquare, Shield, Clock, Search } from 'lucide-react';

interface EvidenceRequirement {
  title: string;
  description: string;
  auditorExpectation: string;
}

interface EvidenceCategoryPageProps {
  categoryName: string;
  categorySlug: string;
  heroDescription: string;
  requirements: EvidenceRequirement[];
  automationTips: string[];
}

export default function EvidenceCategoryPage({
  categoryName,
  categorySlug,
  heroDescription,
  requirements,
  automationTips,
}: EvidenceCategoryPageProps) {
  const pageUrl = `https://risclens.com/soc-2-evidence/${categorySlug}`;
  const pageTitle = `SOC 2 Evidence Guide: ${categoryName} | RiscLens`;
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
          { name: 'Evidence Vault', item: 'https://risclens.com/soc-2-evidence/vault' },
          { name: categoryName, item: pageUrl },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24 text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              Evidence Vault: {categoryName}
            </div>
            <VerifiedBy authorId="kevin" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            SOC 2 Evidence Guide: <span className="text-brand-600">{categoryName}</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroDescription}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/soc-2-evidence/vault"
              className="text-brand-600 hover:text-brand-700 font-bold flex items-center gap-2 underline underline-offset-4"
            >
              <FileText className="w-4 h-4" />
              Browse Full Evidence Vault
            </Link>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ExpertReview authorId="kevin" date={lastUpdated} />
          
          <h2 className="text-2xl font-bold text-slate-900 mb-12 flex items-center gap-3 mt-12">
            <CheckSquare className="w-8 h-8 text-brand-600" />
            What Auditors Look For
          </h2>
          
          <div className="space-y-8">
            {requirements.map((req, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{req.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {req.description}
                </p>
                <div className="bg-slate-50 border-l-4 border-brand-500 p-4 rounded-r-xl">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Auditor Expectation</p>
                  <p className="text-slate-700 font-medium italic">"{req.auditorExpectation}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Section */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Shield className="w-8 h-8 text-brand-400" />
                Automating {categoryName}
              </h2>
              <div className="space-y-4">
                {automationTips.map((tip, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-500/20 text-brand-400 rounded-full flex items-center justify-center font-bold text-xs mt-1">
                      {idx + 1}
                    </div>
                    <p className="text-slate-300">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Reduce Audit Fatigue</h3>
              <p className="text-slate-400 mb-8">
                90% of {categoryName} evidence can be automated using modern GRC tools. Stop taking manual screenshots and start collecting evidence continuously.
              </p>
              <Link 
                href="/soc-2-cost-calculator"
                className="block text-center bg-brand-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-700 transition-all shadow-lg"
              >
                Compare Automation Tools
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Search className="w-64 h-64" />
        </div>
      </section>

      <AboutSection />

      <Footer />
      <StickyCTA 
        label={`Download ${categoryName} Evidence Checklist`} 
        targetHref="/soc-2-readiness-checklist" 
      />
    </main>
  );
}
