import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AI Compliance & ISO 42001 Hub | RiscLens',
  description:
    'The intelligence layer for AI governance. Navigate ISO 42001, manage AI risks, and clear enterprise procurement 2x faster.',
};

export default function AiComplianceHub() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-bold uppercase tracking-wider mb-6">
              World's First AI Management Standard
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Clear Enterprise AI <br />
              <span className="text-brand-600">Procurement 2x Faster.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Enterprise teams are asking about your AI governance. RiscLens provides the roadmap, risk frameworks, and ISO 42001 readiness tools to win their trust.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/iso-42001-calculator"
                className="w-full sm:w-auto bg-brand-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-brand-700 transition-all"
              >
                Run AI Readiness Scan
              </Link>
              <Link
                href="/readiness-review"
                className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all"
              >
                Book Governance Review
              </Link>
            </div>
          </div>
        </section>

        {/* The moats Section */}
        <section className="py-24 max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why ISO 42001 is the new SOC 2 for AI.</h2>
              <p className="text-lg text-slate-600 mb-6">
                Just as SOC 2 became the baseline for cloud SaaS, ISO 42001 (AIMS) is becoming the "must-have" for any company using LLMs or proprietary models in an enterprise context.
              </p>
              <ul className="space-y-4">
                {[
                  "Deterministic AI Risk Identification",
                  "Data Lineage & Training Governance",
                  "Bias & Hallucination Mitigation Logs",
                  "Human-in-the-Loop Verification"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium text-slate-700">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-900 rounded-3xl p-10 text-white">
              <div className="text-brand-400 font-bold uppercase tracking-widest text-xs mb-4">Market Intelligence</div>
              <h3 className="text-2xl font-bold mb-4">68% of Fortune 500 Procurement Teams...</h3>
              <p className="text-brand-100/70 mb-8">
                ...now require a specific AI security addendum or ISO 42001 roadmap for all new software vendors.
              </p>
              <div className="pt-8 border-t border-brand-800">
                <Link href="/soc-2-cost/ai-data" className="text-brand-400 font-bold hover:text-brand-300 transition-colors">
                  Read the AI Compliance Report →
                </Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "ISO 42001 Calculator",
                desc: "Map your AI infrastructure to the 38 controls of ISO 42001 in minutes.",
                href: "/iso-42001-calculator",
                icon: "🤖"
              },
              {
                title: "AI Risk Directory",
                desc: "See how other AI companies are handling transparency and data governance.",
                href: "/compliance/directory",
                icon: "📊"
              },
              {
                title: "Auditor Match",
                desc: "Find specialized auditors who actually understand LLMs and RAG architectures.",
                href: "/auditor-directory",
                icon: "🤝"
              }
            ].map((tool) => (
              <Link 
                key={tool.title}
                href={tool.href}
                className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-xl transition-all group"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.title}</h3>
                <p className="text-slate-600 mb-4">{tool.desc}</p>
                <span className="text-sm font-bold text-brand-600">Open Tool →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-900 py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Don't let governance stall your GTM.</h2>
            <p className="text-slate-400 text-lg mb-10">
              Get your readiness score today and show enterprise buyers you take AI safety seriously.
            </p>
            <Link
              href="/iso-42001-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 text-white font-bold px-10 py-5 rounded-xl hover:bg-brand-700 transition-all shadow-xl"
            >
              Start AI Readiness Scan
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
