import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About RiscLens | Our Mission and Methodology',
  description: 'Learn why we built RiscLens and how our deterministic SOC 2 readiness scoring works.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We believe SOC 2 compliance shouldn&apos;t be a &quot;black box&quot; for early-stage startups. RiscLens was built to provide clarity, transparency, and deterministic guidance before you commit to expensive audits.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Why we built RiscLens
            </h2>
            <div className="prose prose-slate lg:prose-lg text-slate-600 space-y-6">
              <p>
                Navigating the world of SOC 2 often feels like a choice between two extremes: expensive, opaque manual audits or &quot;push-button&quot; automation platforms that promise more than they deliver.
              </p>
              <p>
                Founders and engineering leaders are often left asking: 
                <em className="block my-4 border-l-4 border-brand-500 pl-4 text-slate-800">
                  &quot;How much will this actually cost? How long will it take? And what gaps do we actually have to fix before an auditor arrives?&quot;
                </em>
              </p>
              <p>
                RiscLens was created as an independent resource to answer those questions. We aren&apos;t an auditor, and we aren&apos;t a compliance platform. We are a planning tool designed to help you benchmark your readiness using the same logic auditors use, without the sales pressure.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Our Methodology
            </h2>
            <div className="space-y-12">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                <p className="text-slate-600 mb-6 italic">
                  "Transparency is our core control. We publish our logic so you can verify our results."
                </p>
                <Link 
                  href="/editorial-policy" 
                  className="text-brand-600 font-bold hover:underline inline-flex items-center gap-2"
                >
                  Read our full Editorial & Data Policy →
                </Link>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Deterministic Scoring</h3>
                <p className="text-slate-600 leading-relaxed">
                  Unlike AI-driven tools that provide probabilistic guesses, RiscLens uses a deterministic, rules-based algorithm. Your readiness score is derived from explicit weights applied to your inputs—company size, data types, and current controls. Every point in your score can be traced back to a specific requirement in the Trust Service Criteria.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Real-World Benchmarking</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our cost estimates and timelines are informed by market data from hundreds of SOC 2 engagements across various industries. We include not just the &quot;sticker price&quot; of an auditor, but the hidden costs of compliance tooling and internal engineering effort.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Privacy by Design</h3>
                <p className="text-slate-600 leading-relaxed">
                  We believe your compliance posture is your business. RiscLens does not require a login or account creation to get a score. We collect only what is necessary to calculate your report, and we never sell your data to vendors or auditors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Expertise Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership & Expertise</h2>
              <p className="text-lg text-slate-600">Built by veterans of the audit, security, and privacy industry.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-slate-500 font-bold text-2xl border-2 border-white shadow-md mb-6">
                  RN
                </div>
                <h3 className="text-xl font-bold text-slate-900">Raphael Ngare</h3>
                <p className="text-brand-600 font-semibold text-sm mb-4">Head of Compliance Strategy (CPA, CISA)</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Over a decade of experience across Big Four firms and fintech startups, specializing in translating complex SOC 2 requirements into automated, engineering-friendly workflows.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-slate-500 font-bold text-2xl border-2 border-white shadow-md mb-6">
                  KA
                </div>
                <h3 className="text-xl font-bold text-slate-900">Kevin Anderson</h3>
                <p className="text-brand-600 font-semibold text-sm mb-4">Principal Security Engineer (CISSP, CISM)</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Security engineer turned GRC specialist focused on mapping cloud-native infrastructure (AWS/Azure/GCP) to modern compliance frameworks.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-slate-500 font-bold text-2xl border-2 border-white shadow-md mb-6">
                  SL
                </div>
                <h3 className="text-xl font-bold text-slate-900">Sarah Levin</h3>
                <p className="text-brand-600 font-semibold text-sm mb-4">Privacy & Data Advisor (CIPP/US, JD)</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Privacy attorney and data protection specialist ensuring our readiness tools account for global regulatory landscapes like GDPR and HIPAA.
                </p>
              </div>
            </div>

            <div className="mt-16 p-8 bg-slate-900 rounded-2xl text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h3 className="text-xl font-bold mb-2">Our Advisory Board</h3>
                  <p className="text-slate-400 text-sm">
                    RiscLens is supported by an advisory group of active CPAs from leading tech-focused audit firms, ensuring our data and calculators reflect current market pricing and auditor expectations.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="px-3 py-1 bg-slate-800 rounded text-xs font-mono">AICPA Verified Logic</span>
                  <span className="px-3 py-1 bg-slate-800 rounded text-xs font-mono">SOC 2 Specialist</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reuse the AboutSection for consistency */}
        <AboutSection />

        {/* Final CTA */}
        <section className="py-20 bg-brand-600 text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold mb-6">Ready to see where you stand?</h2>
            <p className="text-brand-100 text-lg mb-10">
              Get your SOC 2 readiness score and a detailed cost breakdown in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/soc-2-readiness-calculator" 
                className="bg-white text-brand-600 px-8 py-3 rounded-lg font-bold hover:bg-brand-50 transition-colors"
              >
                Start Assessment
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
