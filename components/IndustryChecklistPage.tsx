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
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import GapAnalyzerCTA from '@/components/GapAnalyzerCTA';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  BarChart3, 
  AlertTriangle,
  ClipboardCheck,
  Zap,
  Lock
} from 'lucide-react';
import { getRecommendedTools } from '@/lib/pseo-links';

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex flex-col items-start mb-6">
                <Breadcrumb 
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Checklists', href: '/soc-2-readiness-checklist' },
                    { label: industryName }
                  ]} 
                />
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

            <div className="lg:mt-0 mt-8">
              <GapAnalyzerCTA />
            </div>
          </div>

          {/* Recommended Tools for Industry */}
          <div className="mt-24 pt-16 border-t border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Recommended Automation for {industryName}</h2>
                <p className="text-slate-500 font-medium">Top-rated platforms to automate your {industryName} compliance roadmap.</p>
              </div>
              <Link href="/pricing" className="text-brand-600 font-bold flex items-center gap-2 hover:underline">
                View All Tool Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              {getRecommendedTools(industrySlug).map((tool) => (
                <div key={tool.slug} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                  <h4 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">{tool.name}</h4>
                  <div className="flex flex-col gap-3">
                    <Link 
                      href={`/pricing/${tool.slug}`}
                      className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors"
                    >
                      <DollarSign className="w-4 h-4" />
                      View 2026 Pricing
                    </Link>
                    <Link 
                      href={`/compare/${tool.slug}-alternatives`}
                      className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Compare Alternatives
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Checklist Section */}
      <section className="py-20 bg-slate-50" id="checklist">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Complete SOC 2 Checklist</h2>
            <p className="text-slate-600">Broken down by compliance domain for {industryName} teams.</p>
          </div>

          <div className="space-y-8">
            {checklistData.map((category, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="bg-slate-900 px-8 py-4 flex items-center justify-between">
                  <h3 className="text-white font-bold">{category.category}</h3>
                  <ClipboardCheck className="w-5 h-5 text-brand-400" />
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-md border-2 border-slate-200 flex items-center justify-center">
                          {/* Empty checkbox */}
                        </div>
                        <span className="text-slate-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pitfalls Section */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200">
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

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AuthorBio authorId="raphael" />
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
