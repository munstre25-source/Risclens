import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import ChecklistDownloadForm from '@/components/ChecklistDownloadForm';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface ChecklistItem {
  category: string;
  items: string[];
}

interface IndustryChecklistPageProps {
  industryName: string;
  industrySlug: string;
  heroDescription: string;
  criticalControls: string[];
  checklistData: ChecklistItem[];
  commonPitfalls: string[];
}

export default function IndustryChecklistPage({
  industryName,
  industrySlug,
  heroDescription,
  criticalControls,
  checklistData,
  commonPitfalls,
}: IndustryChecklistPageProps) {
  const pageUrl = `https://risclens.com/soc-2-readiness-checklist/${industrySlug}`;
  const pageTitle = `SOC 2 Checklist for ${industryName} | RiscLens`;
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
          { name: 'Checklists', item: 'https://risclens.com/soc-2-readiness-checklist' },
          { name: industryName, item: pageUrl },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex flex-col items-start mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
                  Industry-Specific Checklist
                </div>
                <VerifiedBy authorId="raphael" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                SOC 2 Checklist for <span className="text-brand-600">{industryName}</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {heroDescription}
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  Critical {industrySlug.toUpperCase()} Controls
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {criticalControls.map((control, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {control}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-brand-100 rounded-3xl p-8 shadow-2xl relative">
              <div className="absolute -top-4 -right-4 bg-brand-600 text-white p-3 rounded-2xl shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Download PDF Checklist</h3>
              <p className="text-slate-500 mb-6">Get the full interactive checklist, including evidence templates and auditor notes for {industryName}.</p>
              <ChecklistDownloadForm industry={industrySlug} />
              <p className="text-xs text-slate-400 mt-4 text-center">
                Trusted by 500+ {industryName} teams. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Breakdown */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">The Essential {industryName} SOC 2 Roadmap</h2>
          
          <div className="space-y-12">
            {checklistData.map((section, idx) => (
              <div key={idx} className="relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 rounded-full" />
                <div className="pl-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-sm">
                      {idx + 1}
                    </span>
                    {section.category}
                  </h3>
                  <div className="grid gap-4">
                    {section.items.map((item, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-brand-200 transition-colors">
                        <p className="text-slate-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pitfalls Section */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-50 border-2 border-amber-100 rounded-3xl p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              Common {industryName} Pitfalls
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {commonPitfalls.map((pitfall, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center font-bold text-xs mt-1">
                    !
                  </div>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    {pitfall}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AboutSection />

      <Footer />
      <StickyCTA 
        label={`Get the Full ${industryName} Checklist (PDF)`} 
        targetHref="#checklist-form" 
      />
    </main>
  );
}
