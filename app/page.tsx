import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import ComplianceHub from '@/components/ComplianceHub';
import { Search, BarChart3, Cpu, Cloud, CreditCard, Activity, Rocket, ChevronRight, ArrowRight } from 'lucide-react';
import { AdvancedSchema } from '@/components/AdvancedSchema';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { TrustBadges, SecurityBadgeBar, ProofCounter } from '@/components/TrustBadges';
import { LiveActivityFeed } from '@/components/LiveActivityFeed';
import { ExitIntentModal } from '@/components/LeadCaptureCTA';

export const metadata: Metadata = {
  title: 'The Intelligence Layer for Enterprise Trust | RiscLens',
  description:
    'RiscLens provides deterministic compliance infrastructure, auditor directories, and the world\'s first ISO 42001 (AI) roadmap for B2B startups.',
  openGraph: {
    title: 'The Intelligence Layer for Enterprise Trust | RiscLens',
    description:
      'Deterministic compliance infrastructure, auditor directories, and the world\'s first ISO 42001 (AI) roadmap for B2B startups.',
    images: [{ url: '/og-home.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Intelligence Layer for Enterprise Trust | RiscLens',
    description:
      'Deterministic compliance infrastructure, auditor directories, and the world\'s first ISO 42001 (AI) roadmap for B2B startups.',
    images: ['/og-home.png'],
  },
  alternates: {
    canonical: 'https://risclens.com',
  },
};

export default function HomePage() {
  const faqItems = [
    {
      question: "What is RiscLens?",
      answer: "RiscLens is a compliance intelligence platform that helps early-stage companies navigate SOC 2, ISO 27001, and ISO 42001 (AI) audits with deterministic roadmaps and auditor matching."
    },
    {
      question: "How does the SOC 2 Readiness Assessment work?",
      answer: "Our assessment analyzes your current security stack and team size to provide a readiness score and estimated compliance budget in under 2 minutes."
    }
  ];

  return (
    <>
      <AdvancedSchema faq={faqItems} />
      <main className="min-h-screen flex flex-col bg-slate-50">
        <Header />

          {/* Enhanced Hero with Mesh Gradient */}
          <section className="bg-white border-b border-slate-200 overflow-hidden relative">
            {/* Mesh gradient background */}
            <div className="absolute inset-0 bg-mesh-gradient" />
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
            
              <div className="max-w-6xl mx-auto px-4 pt-12 pb-16 sm:pt-24 sm:pb-32 relative text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-brand-200 mb-4 sm:mb-8 shadow-sm animate-fade-in-up">
                  <span className="flex h-2 w-2 rounded-full bg-trust-500 animate-pulse" />
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Trusted by 500+ B2B Teams</span>
                </div>

                  <h1 className="text-3xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-4 sm:mb-8 animate-fade-in-up delay-100">
                    Get your SOC 2 and AI 
                    <span className="gradient-text"> audit-ready</span> fast.
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 animate-fade-in-up delay-200">
                    Auditor-approved ISO 42001 and SOC 2 roadmaps. Faster procurement, fewer rewrites.
                  </p>
                  
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-20 animate-fade-in-up delay-300">
                          <Link
                            href="/soc-2-readiness-index"
                            className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-brand-700 text-white text-lg font-bold px-8 py-4 sm:px-10 sm:py-5 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex flex-col items-center group relative overflow-hidden glow-brand"
                          >
                            <span className="relative z-10">Start Free Readiness Assessment</span>
                            <span className="relative z-10 text-[10px] font-medium text-white/80 uppercase tracking-widest mt-1 group-hover:text-white">SOC 2, ISO 42001 & Cost Estimate →</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-700 to-brand-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>

                        <Link
                          href="/tools"
                          className="w-full sm:w-auto bg-white text-slate-900 text-lg font-bold px-8 py-4 sm:px-10 sm:py-5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex flex-col items-center group border border-slate-200"
                        >
                          <span>All Compliance Tools</span>
                          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1 group-hover:text-brand-600">Calculators & Benchmarks →</span>
                        </Link>
                      </div>


                  {/* Social Proof / Trust Bar */}
                  <div className="mt-8 mb-16 py-8 border-y border-slate-100 max-w-4xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="text-center md:text-left">
                        <div className="text-2xl font-bold text-slate-900">100+</div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">B2B Security Stacks Benchmarked</div>
                      </div>
                      <div className="h-px w-full md:h-12 md:w-px bg-slate-200" />
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">500+</div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Audits Analyzed for ROI</div>
                      </div>
                      <div className="h-px w-full md:h-12 md:w-px bg-slate-200" />
                      <div className="text-center md:text-right">
                        <div className="text-2xl font-bold text-slate-900">2026</div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Market Intelligence Data</div>
                      </div>
                    </div>
                  </div>

                {/* Subtle Definition Block */}
                <div className="max-w-3xl mx-auto">
                  <div className="p-1 rounded-2xl bg-gradient-to-r from-slate-200 via-brand-100 to-slate-200 shadow-sm">
                    <div className="bg-white rounded-[calc(1rem-1px)] p-6 sm:p-8 text-left relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                        <svg className="w-24 h-24 text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em]">Industry Standard</span>
                        <div className="h-px flex-1 bg-slate-100" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-tight">System and Organization Controls (SOC 2)</h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        <strong className="text-slate-900 font-bold">SOC 2</strong> is the gold standard for service organizations, developed by the AICPA to verify how customer data is managed. It centers on five <span className="text-brand-700 font-medium italic">Trust Service Principles</span>: security, availability, processing integrity, confidentiality, and privacy.
                      </p>
                    </div>
                  </div>
                </div>

              <div className="mt-12 sm:mt-24 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-40 grayscale pointer-events-none">

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
              <h2 className="text-3xl font-bold text-slate-900 mb-4">What you get</h2>
              <p className="text-lg text-slate-600">Clear roadmaps, calculators, and a vetted auditor directory to move faster.</p>
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
                      { label: 'Fintech', href: '/soc-2/industries/fintech', icon: <CreditCard className="w-8 h-8 text-brand-600" /> },
                      { label: 'Healthcare', href: '/soc-2/industries/healthcare', icon: <Activity className="w-8 h-8 text-brand-600" /> },
                      { label: 'Startups', href: '/soc-2/industries/startups', icon: <Rocket className="w-8 h-8 text-brand-600" /> },
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


          {/* Testimonials Section */}
          <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">What Teams Are Saying</span>
                <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">Trusted by Compliance-First Teams</h2>
                <ProofCounter count={523} action="assessments completed" period="this month" className="mt-4" />
              </div>
              <div className="max-w-4xl mx-auto">
                <TestimonialCarousel variant="featured" />
              </div>
            </div>
          </section>

          {/* Trust Badges Section */}
          <section className="py-16 bg-slate-50 border-y border-slate-200">
            <div className="max-w-6xl mx-auto px-4">
              <TrustBadges variant="horizontal" />
              <SecurityBadgeBar className="mt-8" />
            </div>
          </section>

          <ComplianceHub />
          <AboutSection />

        <Footer />
        
        {/* Exit Intent Modal for Homepage */}
        <ExitIntentModal 
          variant="assessment"
          title="Wait! Get Your Free SOC 2 Roadmap"
          description="In 2 minutes, see your readiness score, cost estimate, and the gaps auditors will flag."
        />
        
        {/* Live Activity Feed Toast */}
        <LiveActivityFeed variant="toast" />
      </main>
    </>
  );
}
