import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Layers,
  Zap,
  Lock,
  Search,
  Users,
  Building2,
  FileCheck,
  Brain,
  Scale
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'SOC 2 vs ISO 42001 Bridge | Compliance Mapping Matrix | RiscLens',
  description:
    'Leverage your existing SOC 2 audit to accelerate ISO 42001 certification. Our mapping matrix shows 60% control overlap between Security and AI Governance.',
  openGraph: {
    title: 'SOC 2 vs ISO 42001 Bridge | RiscLens',
    description: 'Map SOC 2 controls to ISO 42001 requirements. Fast-track your AI compliance.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'SOC 2 vs ISO 42001 Bridge' }],
  },
  alternates: {
    canonical: 'https://risclens.com/ai-compliance/compare/soc-2-vs-iso-42001',
  },
};

const mappingTable = [
  {
    iso42001: 'AI Policy (A.5.1)',
    soc2: 'Logical Access / Security Policies (CC6.1)',
    overlap: 'High',
    action: 'Extend existing InfoSec policy to include AI-specific ethical usage.'
  },
  {
    iso42001: 'Risk Assessment (6.1)',
    soc2: 'Risk Assessment (CC3.1 - CC3.4)',
    overlap: 'High',
    action: 'Add "AI System Impact" as a specific risk vector in your current register.'
  },
  {
    iso42001: 'Data Management (B.7)',
    soc2: 'Confidentiality & Privacy Criteria',
    overlap: 'Medium',
    action: 'Map training data pipelines to existing data classification tiers.'
  },
  {
    iso42001: 'Third-Party Risk (A.8.5)',
    soc2: 'Vendor Management (CC9.2)',
    overlap: 'Medium',
    action: 'Add LLM-specific questions to your existing vendor security review.'
  },
  {
    iso42001: 'Incident Response (A.10)',
    soc2: 'Incident Management (CC7.3)',
    overlap: 'High',
    action: 'Update IR plan to include model hallucinations or adversarial attacks.'
  }
];

export default function SOC2toISO42001Bridge() {
  const breadcrumbItems = [
    { label: 'AI Compliance', href: '/ai-compliance' },
    { label: 'SOC 2 vs ISO 42001', href: '/ai-compliance/compare/soc-2-vs-iso-42001' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="SOC 2 vs ISO 42001 Bridge"
        description="Map SOC 2 controls to ISO 42001 requirements."
        url="https://risclens.com/ai-compliance/compare/soc-2-vs-iso-42001"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Compliance', item: 'https://risclens.com/ai-compliance' },
          { name: 'SOC 2 vs ISO 42001', item: 'https://risclens.com/ai-compliance/compare/soc-2-vs-iso-42001' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-bold uppercase tracking-wider mb-6">
                  <Layers className="w-4 h-4" />
                  Efficiency Accelerator
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                  The SOC 2 to <br />
                  <span className="text-blue-300">ISO 42001 Bridge</span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Don't start from scratch. Your existing SOC 2 Type II report already covers ~60% of the requirements for ISO 42001. 
                  Learn how to bridge the gap and achieve AI certification 2x faster.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-blue-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-50 transition-all">
                    Download Mapping PDF
                  </button>
                  <Link
                    href="/iso-42001-calculator"
                    className="bg-blue-700 text-white border border-blue-500 font-bold px-8 py-4 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    Run Gap Analysis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-80 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-white mb-1">60%</div>
                    <div className="text-blue-200 text-xs font-bold uppercase tracking-widest">Control Overlap</div>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-[60%]"></div>
                  </div>
                  <ul className="space-y-4 text-sm text-blue-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Shared Access Controls
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Shared Risk Assessment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Shared Incident Response
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Control Mapping Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-900 border-b border-slate-200">ISO 42001 Requirement</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-900 border-b border-slate-200">SOC 2 Equivalent</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-900 border-b border-slate-200 text-center">Overlap</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-900 border-b border-slate-200">Implementation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mappingTable.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5 text-sm font-bold text-slate-900">{row.iso42001}</td>
                      <td className="px-6 py-5 text-sm text-slate-600">{row.soc2}</td>
                      <td className="px-6 py-5 text-sm text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          row.overlap === 'High' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {row.overlap}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600 leading-relaxed">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Why the SOC 2 Bridge Matters</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Most startups treat ISO 42001 as a completely new project. This is a mistake. By reusing your SOC 2 evidence, you save:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <Zap className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-medium">300+ hours of evidence collection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <Zap className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-medium">$20k+ in redundant consulting fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <Zap className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-medium">Internal distraction for engineering teams</span>
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-slate-900 rounded-3xl text-white">
                <Building2 className="w-12 h-12 text-blue-400 mb-6" />
                <h4 className="text-xl font-bold mb-4">Enterprise Readiness</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Fortune 500 companies are now asking for "SOC 2 + AI" or ISO 42001. Showing them how your existing security foundation supports AI governance is the ultimate trust-builder.
                </p>
                <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition-all">
                  Request Bridge Audit Guide
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Master the AI Compliance Transition</h2>
            <p className="text-lg text-slate-600 mb-10">
              Join 500+ security leaders using RiscLens to bridge the gap between SOC 2 and ISO 42001.
            </p>
            <Link
              href="/ai-governance"
              className="inline-flex items-center gap-2 bg-indigo-900 text-white font-bold px-10 py-5 rounded-xl hover:bg-slate-800 transition-all shadow-xl"
            >
              Back to AI Governance Hub
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <AuthorBio authorId="kevin" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
