import { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, 
  MapPin, 
  Globe, 
  ExternalLink, 
  Star, 
  CheckCircle2, 
  Users, 
  Building2, 
  ChevronRight,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { auditors } from '@/src/content/auditors';
import { AuthorBio } from '@/components/AuthorBio';
import { FAQSection } from '@/components/FAQSection';
import { generateAuditorFAQs, generateEnhancedFAQSchema } from '@/lib/seo-enhancements';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const auditor = auditors.find(a => a.slug === slug);
  
  if (!auditor) return { title: 'Auditor Not Found' };

  return {
    title: `${auditor.name} | Verified Compliance Auditor Profile`,
    description: `Learn about ${auditor.name}, a vetted auditor specializing in ${auditor.specialties.join(', ')}. View certifications, industry expertise, and request a discovery call.`,
  };
}

export async function generateStaticParams() {
  return auditors.map((auditor) => ({
    slug: auditor.slug,
  }));
}

export default async function AuditorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const auditor = auditors.find(a => a.slug === slug);

  if (!auditor) {
    notFound();
  }

  const auditorFaqs = generateAuditorFAQs(auditor.name);
  const auditorFaqSchema = generateEnhancedFAQSchema(auditorFaqs);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <Script id={`auditor-faq-${slug}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(auditorFaqSchema) }} />
      
      <div className="flex-grow">
        {/* Breadcrumbs */}
        <nav className="bg-white border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/auditor-directory" className="hover:text-brand-600 flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              Directory
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 font-medium">{auditor.name}</span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              <div className="flex-grow max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  {auditor.isVetted && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-100">
                      <ShieldCheck className="w-4 h-4" />
                      Vetted Partner
                    </span>
                  )}
                  {auditor.isNew && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
                      <Sparkles className="w-4 h-4" />
                      AI Specialized
                    </span>
                  )}
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  {auditor.name}
                </h1>
                <div className="flex flex-wrap gap-6 text-slate-600 mb-8 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    {auditor.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-slate-400" />
                    Global Delivery
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    {auditor.rating} / 5 ({auditor.reviewCount} Reviews)
                  </div>
                </div>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {auditor.description}
                </p>
              </div>

              <div className="w-full md:w-80 flex-shrink-0">
                <div className="bg-slate-900 rounded-xl p-8 text-white shadow-sm">
                  <h3 className="text-lg font-bold mb-6">Ready to start?</h3>
                  <Link 
                    href="/readiness-review"
                    className="flex items-center justify-center w-full py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors mb-4"
                  >
                    Request Intro
                  </Link>
                  <a 
                    href={auditor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                  </a>
                  <p className="text-slate-400 text-xs text-center mt-6">
                    RiscLens partners receive priority scheduling and pre-negotiated startup rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs-style layout */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Specialties */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-brand-600" />
                    Core Specialties
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {auditor.specialties.map((spec, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-500" />
                        <span className="font-semibold text-slate-700">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Supported Frameworks</h2>
                  <div className="flex flex-wrap gap-3">
                    {auditor.frameworks.map((fw, idx) => (
                      <Link 
                        key={idx}
                        href={fw.includes('SOC 2') ? '/soc-2' : fw.includes('ISO 27001') ? '/iso-27001' : '/ai-compliance/iso-42001'}
                        className="px-6 py-3 bg-white border border-slate-200 rounded-full font-bold text-slate-600 hover:border-brand-500 hover:text-brand-600 transition-all shadow-sm"
                      >
                        {fw}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Why {auditor.name}?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {auditor.highlights.map((highlight, idx) => (
                      <div key={idx} className="text-center">
                        <div className="w-12 h-12 rounded-lg bg-white border border-blue-100 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="font-bold text-slate-900">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <AuthorBio authorId="matthew-risclens" />

              </div>

              {/* Right Column: Firm Stats */}
              <div className="space-y-8">
                <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Firm Profile</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Industries</p>
                        <p className="font-semibold text-slate-900">{auditor.industries.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Target Team Size</p>
                        <p className="font-semibold text-slate-900">{auditor.teamSize.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Benchmarked Data</h3>
                  <p className="text-brand-100 mb-6 leading-relaxed">
                    Based on our data from 100+ audits with {auditor.name}, they score exceptionally well in:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="font-medium">Automation Tool Integration</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="font-medium">Report Turnaround Time</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="font-medium">Auditor Responsiveness</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <FAQSection title={`${auditor.name} FAQs`} faqs={auditorFaqs} />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
