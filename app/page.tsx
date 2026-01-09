import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import { Search, BarChart3, Cpu, Cloud, CreditCard, Activity, Rocket, ChevronRight, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Intelligence Layer for Enterprise Trust | RiscLens',
  description:
    'RiscLens provides deterministic compliance infrastructure, auditor directories, and the world\'s first ISO 42001 (AI) roadmap for B2B startups.',
  openGraph: {
    title: 'The Intelligence Layer for Enterprise Trust | RiscLens',
    description:
      'Deterministic compliance infrastructure, auditor directories, and the world\'s first ISO 42001 (AI) roadmap for B2B startups.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Intelligence Layer for Enterprise Trust | RiscLens',
    description:
      'Deterministic compliance infrastructure, auditor directories, and the world\'s first ISO 42001 (AI) roadmap for B2B startups.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://risclens.com',
  },
};

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen flex flex-col bg-slate-50">
        <Header />

        {/* New Intelligence Layer Hero */}
        <section className="bg-white border-b border-slate-200 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
          
            <div className="max-w-6xl mx-auto px-4 pt-12 pb-16 sm:pt-24 sm:pb-32 relative text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-4 sm:mb-8">
                <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">The Source of Truth for 100+ B2B Security Stacks</span>
              </div>

                <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-4 sm:mb-8">
                  The Intelligence Layer for <br className="hidden lg:block" />
                  <span className="text-brand-600">AI Trust & Compliance.</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12">
                  The definitive source for ISO 42001 (AI) and SOC 2 readiness. Stop guessing costs. Clear procurement 2x faster with deterministic intelligence and auditor directories.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/ai-governance-readiness-index"
                      className="w-full sm:w-auto bg-brand-600 text-white text-lg font-bold px-8 py-4 sm:px-10 sm:py-5 rounded-xl shadow-xl hover:bg-brand-700 transition-all flex flex-col items-center group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 bg-white/20 text-[10px] px-2 py-0.5 rounded-bl-lg font-bold uppercase tracking-tighter animate-pulse">Trending</div>
                      <span>Get ISO 42001 Index</span>

                    <span className="text-[10px] font-medium text-white/70 uppercase tracking-widest mt-1 group-hover:text-white">AI Governance Roadmap →</span>
                  </Link>

                  <Link
                    href="/soc-2-readiness-index"
                    className="w-full sm:w-auto bg-slate-900 text-white text-lg font-bold px-8 py-4 sm:px-10 sm:py-5 rounded-xl shadow-xl hover:bg-slate-800 transition-all flex flex-col items-center group"
                  >
                    <span>Get SOC 2 Index</span>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1 group-hover:text-slate-300">Readiness & Cost →</span>
                  </Link>
                </div>

              <div className="mt-8 sm:mt-16 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-40 grayscale pointer-events-none">
              <span className="text-xl font-bold">VANTA</span>
              <span className="text-xl font-bold">DRATA</span>
              <span className="text-xl font-bold">SECUREFRAME</span>
              <span className="text-xl font-bold">THOROPASS</span>
            </div>
          </div>
        </section>

        {/* Feature Grid: GPS vs the Pipes */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">The GPS for the Compliance Journey</h2>
              <p className="text-lg text-slate-600">While platforms handle the "pipes," RiscLens provides the deterministic intelligence to navigate them.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Auditor Matching",
                    description: "Don't pick an auditor blindly. Access our directory of verified firms specializing in AI and B2B SaaS.",
                    icon: <Search className="w-8 h-8 text-brand-600" />,
                    link: "/auditor-directory"
                  },
                  {
                    title: "Deterministic ROI",
                    description: "Calculate the exact impact of compliance on your sales velocity and enterprise deal value.",
                    icon: <BarChart3 className="w-8 h-8 text-brand-600" />,
                    link: "/compliance-roi-calculator"
                  },
                  {
                    title: "AI Governance",
                    description: "The world's first ISO 42001 (AI Management) calculator for teams building with LLMs.",
                    icon: <Cpu className="w-8 h-8 text-brand-600" />,
                    link: "/iso-42001-calculator"
                  }
                ].map((feature) => (
                  <Link 
                    key={feature.title}
                    href={feature.link}
                    className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:bg-white hover:shadow-xl transition-all group"
                  >
                    <div className="mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{feature.description}</p>
                  <span className="text-sm font-bold text-brand-600 group-hover:translate-x-1 inline-block transition-transform">Explore →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Directory Teaser */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block">The Compliance Directory</span>
                <h2 className="text-4xl font-bold mb-6 leading-tight">Access the Security Signals of 100+ Enterprises.</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  The current platforms hide pricing and complexity. RiscLens wins by being the "Source of Truth" for cost, timeline, and ROI. See how your competitors are handling trust.
                </p>
                <Link 
                  href="/compliance/directory" 
                  className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-colors"
                >
                  Explore the Directory
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  {[
                    { name: 'OpenAI', signals: 'SOC 2 Type II, ISO 27001, ISO 42001', status: 'Enterprise' },
                    { name: 'Anthropic', signals: 'SOC 2 Type II, HIPAA', status: 'Enterprise' },
                    { name: 'Vanta', signals: 'SOC 2 Type II, ISO 27001', status: 'Scale' },
                    { name: 'Drata', signals: 'SOC 2 Type II, ISO 27001', status: 'Scale' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.signals}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-brand-500/20 text-brand-400 border border-brand-500/20 uppercase tracking-widest">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Benchmarks */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Compliance by Industry</h2>
              <p className="text-lg text-slate-600">Tailored readiness guides and cost benchmarks for your specific vertical.</p>
            </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'SaaS', href: '/soc-2/industries/saas', icon: <Cloud className="w-8 h-8 text-brand-600" /> },
                    { label: 'Fintech', href: '/soc-2-cost/fintech', icon: <CreditCard className="w-8 h-8 text-brand-600" /> },
                    { label: 'Healthcare', href: '/soc-2-cost/healthcare', icon: <Activity className="w-8 h-8 text-brand-600" /> },
                    { label: 'Startups', href: '/soc-2-cost/startups', icon: <Rocket className="w-8 h-8 text-brand-600" /> },
                  ].map((industry) => (
                    <Link
                      key={industry.label}
                      href={industry.href}
                      className="flex flex-col items-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-200 hover:bg-white hover:shadow-lg transition-all text-center group"
                    >
                      <div className="mb-4 group-hover:scale-110 transition-transform">{industry.icon}</div>
                      <span className="font-bold text-slate-900 text-lg">{industry.label}</span>
                    </Link>
                  ))}
                </div>
            </div>
          </section>

          {/* Comparison Factory Section */}
          <section className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                  <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">Compare the Market</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                    Unbiased Platform <span className="text-brand-600">Intelligence.</span>
                  </h2>
                  <p className="text-lg text-slate-600 mt-4">
                    Stop relying on biased sales decks. We compare 24+ platform pairings based on cost, speed-to-audit, and auditor flexibility.
                  </p>
                </div>
                <Link 
                  href="/compare" 
                  className="group flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors"
                >
                  View All Comparisons
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { slug: 'vanta-vs-drata', a: 'Vanta', b: 'Drata' },
                  { slug: 'drata-vs-secureframe', a: 'Drata', b: 'Secureframe' },
                  { slug: 'vanta-vs-secureframe', a: 'Vanta', b: 'Secureframe' },
                  { slug: 'thoropass-vs-vanta', a: 'Thoropass', b: 'Vanta' },
                  { slug: 'vanta-vs-auditboard', a: 'Vanta', b: 'AuditBoard' },
                  { slug: 'sprinto-vs-vanta', a: 'Sprinto', b: 'Vanta' },
                ].map((pair) => (
                  <Link 
                    key={pair.slug}
                    href={pair.slug === 'vanta-vs-auditboard' || pair.slug === 'sprinto-vs-vanta' || pair.slug === 'thoropass-vs-vanta' || pair.slug === 'drata-vs-secureframe' || pair.slug === 'vanta-vs-drata' ? `/compare/${pair.slug}` : `/compliance/compare/${pair.slug}`}
                    className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 font-bold text-xs group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                        VS
                      </div>
                      <span className="font-bold text-slate-900">{pair.a} vs {pair.b}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>


        <AboutSection />
        <Footer />
      </main>
    </>
  );
}
