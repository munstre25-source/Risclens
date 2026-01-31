import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQSection } from '@/components/FAQSection';
import Link from 'next/link';
import { Search, MapPin, ExternalLink, ShieldCheck, Sparkles, Star, ChevronRight, ArrowRight } from 'lucide-react';
import { generateHubFAQs } from '@/lib/seo-enhancements';
import { getPSEOLocations } from '@/lib/pseo';
import { auditors as fallbackAuditors, SPECIALTIES, AuditorFirm } from '@/src/content/auditors';
import { getSupabaseClient } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Verified Auditor Directory | SOC 2 & ISO 42001 Partners',
  description: 'Find vetted CPA firms and security auditors specializing in SOC 2, ISO 27001, and ISO 42001 (AI Management) for startups.',
};

async function getAuditors(): Promise<AuditorFirm[]> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('auditors')
      .select('*')
      .order('is_vetted', { ascending: false })
      .order('rating', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return fallbackAuditors;

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      specialty: row.specialty,
      location: row.location,
      description: row.description,
      website: row.website,
      isNew: row.is_new,
      isVetted: row.is_vetted,
      specialties: row.specialties || [],
      industries: row.industries || [],
      teamSize: row.team_size || [],
      frameworks: row.frameworks || [],
      highlights: row.highlights || [],
      reviewCount: row.review_count || 0,
      rating: parseFloat(row.rating) || 0,
    }));
  } catch (error) {
    console.error('Error fetching auditors:', error);
    return fallbackAuditors;
  }
}

export default async function AuditorDirectoryPage() {
  const [locations, auditors] = await Promise.all([
    getPSEOLocations(),
    getAuditors()
  ]);
  
  const sortedLocations = [...locations].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <div className="flex-grow">
          {/* Hero */}
          <section className="py-20 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
                  Verified Partner Network
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  World-Class Auditor Directory
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  RiscLens benchmarks 500+ audits annually to find the most startup-friendly, tech-forward CPA firms. Connect with partners who understand your stack.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-100 pt-12">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-brand-600 mb-1">{auditors.length}</p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Vetted Firms</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-brand-600 mb-1">{locations.length}+</p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Global Tech Hubs</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-brand-600 mb-1">4.8</p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Avg. Partner Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-brand-600 mb-1">98%</p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Startup Approval</p>
                </div>
              </div>
            </div>
          </section>

          {/* Specialty Filters */}
          <section className="py-12 bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm overflow-x-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-4 min-w-max">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mr-4">Expertise:</span>
                {SPECIALTIES.map((spec) => (
                  <button 
                    key={spec.slug}
                    className="px-6 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-bold text-sm hover:border-brand-500 hover:text-brand-600 transition-all whitespace-nowrap"
                  >
                    {spec.name}
                  </button>
                ))}
              </div>
            </div>
          </section>
  
          {/* Main Directory & Sidebar */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* Left: Sidebar Filters */}
                <div className="space-y-10 lg:sticky lg:top-32 h-fit">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Browse by Hub</h3>
                    <div className="flex flex-wrap lg:flex-col gap-2">
                      {sortedLocations.map((location) => (
                        <Link 
                          key={location.id}
                          href={`/auditor-directory/${location.slug}`}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-all flex items-center justify-between group"
                        >
                          {location.name}
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-brand-50 rounded-2xl border border-brand-100">
                    <h4 className="font-bold text-brand-900 mb-2">Need a Match?</h4>
                    <p className="text-sm text-brand-700 mb-4">Our compliance engineers can match you with the right auditor based on your timeline and budget.</p>
                    <Link href="/readiness-review" className="text-sm font-bold text-brand-600 flex items-center gap-1 hover:gap-2 transition-all">
                      Get Expert Matching
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right: Directory List */}
                <div className="lg:col-span-3">
                  <div className="grid gap-6">
                    {auditors.map((auditor) => (
                      <div key={auditor.slug} className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all">
                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="flex-grow">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <Link href={`/auditor-directory/firm/${auditor.slug}`}>
                                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                                  {auditor.name}
                                </h2>
                              </Link>
                              {auditor.isVetted && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                                  <ShieldCheck className="w-3 h-3" />
                                  Vetted Partner
                                </span>
                              )}
                              {auditor.isNew && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                                  <Sparkles className="w-3 h-3" />
                                  AI Specialized
                                </span>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500 mb-6">
                              <div className="flex items-center gap-1.5">
                                <Search className="w-4 h-4 text-slate-400" />
                                {auditor.specialty}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                {auditor.location}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                {auditor.rating} ({auditor.reviewCount})
                              </div>
                            </div>

                            <p className="text-slate-600 leading-relaxed mb-8 line-clamp-2">
                              {auditor.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {auditor.frameworks.slice(0, 3).map((fw, i) => (
                                <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold border border-slate-100">
                                  {fw}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 min-w-[200px]">
                            <Link 
                              href={`/auditor-directory/firm/${auditor.slug}`}
                              className="flex items-center justify-center py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                            >
                              View Profile
                            </Link>
                            <Link 
                              href="/readiness-review"
                              className="flex items-center justify-center py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                            >
                              Request Intro
                            </Link>
                            <a 
                              href={auditor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-400 hover:text-brand-600 transition-colors"
                            >
                              Visit Website
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action for Auditors */}
              <div className="mt-24 p-12 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 blur-[100px] -mr-32 -mt-32" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="max-w-xl text-center md:text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Are you a Compliance Auditor?</h2>
                    <p className="text-xl text-slate-400 leading-relaxed mb-0">
                      Join the directory and connect with high-intent startups already readiness-scored by RiscLens.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <Link 
                      href="mailto:partners@risclens.com"
                      className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all text-center"
                    >
                      Apply for Partnership
                    </Link>
                    <Link 
                      href="/methodology"
                      className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all text-center border border-slate-700"
                    >
                      Learn Methodology
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FAQSection
            title="Auditor Directory FAQs"
            faqs={generateHubFAQs('Verified Auditor Directory', 'the auditor directory and SOC 2 auditors')}
          />
      </div>

      <Footer />
    </main>
  );
}
