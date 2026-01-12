import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Shield, Gavel, CheckCircle, ArrowRight, Scale, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ISO 42001 vs EU AI Act | Framework Comparison Guide | RiscLens',
  description: 'Compare ISO 42001 and EU AI Act requirements. Understand how these frameworks work together for AI compliance and where they differ.',
  alternates: { canonical: 'https://risclens.com/ai-compliance/compare/iso-42001-vs-eu-ai-act' },
};

const comparisonData = [
  { aspect: 'Type', iso42001: 'Voluntary certification standard', euAiAct: 'Mandatory regulation (law)' },
  { aspect: 'Scope', iso42001: 'AI Management System (AIMS)', euAiAct: 'AI systems affecting EU citizens' },
  { aspect: 'Applicability', iso42001: 'Any organization globally', euAiAct: 'Organizations serving EU market' },
  { aspect: 'Risk Approach', iso42001: 'Organization-defined risk tiers', euAiAct: 'Four fixed risk categories' },
  { aspect: 'Certification', iso42001: 'Third-party certification available', euAiAct: 'Conformity assessment required for high-risk' },
  { aspect: 'Penalties', iso42001: 'None (market access benefit)', euAiAct: 'Up to 7% global annual revenue' },
  { aspect: 'Timeline', iso42001: 'Voluntary implementation', euAiAct: 'August 2026 for high-risk AI' },
  { aspect: 'Documentation', iso42001: '38 control objectives', euAiAct: 'Technical documentation + risk assessment' },
];

const mappingData = [
  { euRequirement: 'Risk Management System (Art. 9)', isoClause: 'Clause 6.1 - Risk Assessment', coverage: 'Full' },
  { euRequirement: 'Data Governance (Art. 10)', isoClause: 'Clause 7.2 - Data Management', coverage: 'Full' },
  { euRequirement: 'Technical Documentation (Art. 11)', isoClause: 'Clause 7.5 - Documented Information', coverage: 'Full' },
  { euRequirement: 'Record-Keeping (Art. 12)', isoClause: 'Clause 9.2 - Internal Audit', coverage: 'Full' },
  { euRequirement: 'Transparency (Art. 13)', isoClause: 'Clause 8.4 - Communication', coverage: 'Partial' },
  { euRequirement: 'Human Oversight (Art. 14)', isoClause: 'Clause 8.1 - Operational Planning', coverage: 'Full' },
  { euRequirement: 'Accuracy & Robustness (Art. 15)', isoClause: 'Clause 8.3 - AI System Development', coverage: 'Full' },
  { euRequirement: 'Quality Management (Art. 17)', isoClause: 'Clause 4.4 - AIMS', coverage: 'Full' },
];

export default function ISO42001VsEUAIActPage() {
  const breadcrumbItems = [
    { label: 'AI Compliance', href: '/ai-compliance' },
    { label: 'Compare', href: '/ai-compliance/compare' },
    { label: 'ISO 42001 vs EU AI Act', href: '/ai-compliance/compare/iso-42001-vs-eu-ai-act' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="ISO 42001 vs EU AI Act Comparison"
        description="Compare ISO 42001 and EU AI Act requirements for AI compliance."
        url="https://risclens.com/ai-compliance/compare/iso-42001-vs-eu-ai-act"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Compliance', item: 'https://risclens.com/ai-compliance' },
          { name: 'ISO 42001 vs EU AI Act', item: 'https://risclens.com/ai-compliance/compare/iso-42001-vs-eu-ai-act' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-slate-300 text-sm font-bold uppercase tracking-wider mb-6">
              <Scale className="w-4 h-4" />
              Framework Comparison
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              ISO 42001 <span className="text-slate-400">vs</span> EU AI Act
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Standard vs Regulation. Understand how these frameworks complement each other and build a compliance strategy that satisfies both.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">ISO 42001</h2>
                    <span className="text-sm text-blue-600 font-medium">International Standard</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Voluntary certification standard providing a framework for responsible AI development and governance. Demonstrates organizational commitment to AI best practices.
                </p>
                <Link href="/ai-compliance/iso-42001" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Gavel className="w-7 h-7 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">EU AI Act</h2>
                    <span className="text-sm text-orange-600 font-medium">Mandatory Regulation</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Binding legal framework with enforceable requirements and penalties. Applies to any AI system affecting EU citizens, regardless of where the organization is based.
                </p>
                <Link href="/ai-compliance/eu-ai-act" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-100 px-6 py-4">
                <h3 className="text-lg font-bold text-slate-900">Side-by-Side Comparison</h3>
              </div>
              <table className="w-full">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Aspect</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">ISO 42001</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-orange-700">EU AI Act</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.aspect}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{row.iso42001}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{row.euAiAct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Control Mapping: ISO 42001 → EU AI Act</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                ISO 42001 controls map directly to most EU AI Act requirements for high-risk AI systems.
              </p>
            </div>
            
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-orange-400">EU AI Act Requirement</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-400">ISO 42001 Clause</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {mappingData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 text-sm text-slate-300">{row.euRequirement}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{row.isoClause}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          row.coverage === 'Full' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {row.coverage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-2">90%+ Coverage</h3>
                  <p className="text-slate-300">ISO 42001 certification addresses the majority of EU AI Act high-risk requirements. The standard was designed with regulatory alignment in mind.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Which Do You Need?</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">You need <span className="text-orange-600">EU AI Act compliance</span> if:</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-1" />Your AI systems affect EU citizens or are deployed in the EU</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-1" />You operate high-risk AI (healthcare, HR, finance, etc.)</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-1" />You sell AI products or services to EU-based customers</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">You should pursue <span className="text-blue-600">ISO 42001 certification</span> if:</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-1" />You want to demonstrate AI governance maturity</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-1" />Enterprise customers are asking about AI risk management</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-1" />You need a structured framework for EU AI Act compliance</li>
                </ul>
              </div>

              <div className="bg-brand-50 border-2 border-brand-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-brand-900 mb-3">Our Recommendation: Both</h3>
                <p className="text-slate-600">Use ISO 42001 as your implementation framework to achieve EU AI Act compliance. Certification provides third-party validation of your AI governance and streamlines regulatory conformity assessment.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-brand-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Start Your AI Compliance Journey</h2>
            <p className="text-brand-200 mb-8">Get a free assessment covering both ISO 42001 readiness and EU AI Act requirements.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/ai-governance-readiness-index" className="w-full sm:w-auto bg-white text-brand-900 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all flex items-center justify-center gap-2">
                Get AI Readiness Score <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/iso-42001-calculator" className="w-full sm:w-auto bg-brand-800 text-white border border-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-700 transition-all">
                ISO 42001 Calculator
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <AuthorBio authorId="kevin" />
          </div>
        </section>

        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <Link href="/ai-compliance" className="text-slate-600 hover:text-brand-600 font-medium">AI Hub</Link>
              <Link href="/ai-compliance/iso-42001" className="text-slate-600 hover:text-brand-600 font-medium">ISO 42001 Guide</Link>
              <Link href="/ai-compliance/eu-ai-act" className="text-slate-600 hover:text-brand-600 font-medium">EU AI Act Guide</Link>
              <Link href="/ai-compliance/nist-ai-rmf" className="text-slate-600 hover:text-brand-600 font-medium">NIST AI RMF</Link>
              <Link href="/ai-compliance/compare/nist-ai-rmf-vs-iso-42001" className="text-slate-600 hover:text-brand-600 font-medium">NIST vs ISO 42001</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
