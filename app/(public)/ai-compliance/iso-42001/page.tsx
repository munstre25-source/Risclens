import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  FileCheck,
  Building2,
  Users,
  Brain,
  Target,
  Zap,
  BookOpen,
  Layers,
  Settings,
  BarChart3,
  Lock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ISO 42001 Complete Guide | AI Management System Certification | RiscLens',
  description:
    'The definitive guide to ISO 42001 certification. Understand the 38 controls, implementation roadmap, costs, and how it maps to EU AI Act compliance.',
  openGraph: {
    title: 'ISO 42001 Complete Guide | RiscLens',
    description: 'Master ISO 42001 AI Management System certification. Controls, costs, and implementation.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens ISO 42001 Guide' }],
  },
  alternates: {
    canonical: 'https://risclens.com/ai-compliance/iso-42001',
  },
};

const controlDomains = [
  {
    clause: '4',
    title: 'Context of the Organization',
    controls: 4,
    description: 'Understanding the organization, interested parties, scope, and establishing the AIMS.',
    icon: Building2
  },
  {
    clause: '5',
    title: 'Leadership',
    controls: 3,
    description: 'Management commitment, AI policy, and organizational roles and responsibilities.',
    icon: Users
  },
  {
    clause: '6',
    title: 'Planning',
    controls: 5,
    description: 'Risk assessment, AI objectives, impact assessment, and change planning.',
    icon: Target
  },
  {
    clause: '7',
    title: 'Support',
    controls: 6,
    description: 'Resources, competence, awareness, communication, and documented information.',
    icon: Settings
  },
  {
    clause: '8',
    title: 'Operation',
    controls: 8,
    description: 'Operational planning, AI system lifecycle, data management, and third-party relationships.',
    icon: Zap
  },
  {
    clause: '9',
    title: 'Performance Evaluation',
    controls: 6,
    description: 'Monitoring, internal audit, and management review of the AIMS.',
    icon: BarChart3
  },
  {
    clause: '10',
    title: 'Improvement',
    controls: 6,
    description: 'Nonconformity handling, corrective action, and continual improvement.',
    icon: Layers
  }
];

const implementationPhases = [
  {
    phase: 1,
    title: 'Gap Assessment',
    duration: '2-4 weeks',
    activities: [
      'Current state assessment against ISO 42001 requirements',
      'AI system inventory and risk classification',
      'Stakeholder identification and scope definition',
      'Gap analysis report and remediation roadmap'
    ]
  },
  {
    phase: 2,
    title: 'AIMS Design',
    duration: '4-8 weeks',
    activities: [
      'AI policy and objectives development',
      'Risk assessment methodology implementation',
      'Control framework design and documentation',
      'Roles and responsibilities matrix'
    ]
  },
  {
    phase: 3,
    title: 'Implementation',
    duration: '8-16 weeks',
    activities: [
      'Control implementation across AI systems',
      'Training and awareness programs',
      'Process documentation and procedures',
      'Technical controls deployment'
    ]
  },
  {
    phase: 4,
    title: 'Certification',
    duration: '4-8 weeks',
    activities: [
      'Internal audit and management review',
      'Pre-certification assessment',
      'Stage 1 and Stage 2 audits',
      'Certificate issuance and maintenance'
    ]
  }
];

const costBreakdown = [
  { item: 'Gap Assessment', range: '$8,000 - $20,000', notes: 'Depends on AI system complexity' },
  { item: 'Consulting & Implementation', range: '$30,000 - $80,000', notes: '3-6 months engagement' },
  { item: 'Training & Awareness', range: '$5,000 - $15,000', notes: 'All staff + specialized' },
  { item: 'Certification Audit', range: '$15,000 - $40,000', notes: 'Stage 1 + Stage 2' },
  { item: 'Annual Surveillance', range: '$8,000 - $20,000/year', notes: 'Ongoing maintenance' },
];

export default function ISO42001Page() {
  const breadcrumbItems = [
    { label: 'AI Compliance', href: '/ai-compliance' },
    { label: 'ISO 42001', href: '/ai-compliance/iso-42001' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="ISO 42001 Complete Guide"
        description="The definitive guide to ISO 42001 AI Management System certification."
        url="https://risclens.com/ai-compliance/iso-42001"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Compliance Hub', item: 'https://risclens.com/ai-compliance' },
          { name: 'ISO 42001', item: 'https://risclens.com/ai-compliance/iso-42001' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-900 via-blue-900 to-blue-800 text-white py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
              <div className="lg:max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-bold uppercase tracking-wider mb-6">
                  <Shield className="w-4 h-4" />
                  World's First AI Standard
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                  ISO 42001<br />
                  <span className="text-blue-300">Complete Guide</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed mb-8">
                  ISO/IEC 42001:2023 is the world's first international standard for AI Management Systems (AIMS). 
                  Learn how to implement, certify, and demonstrate responsible AI governance.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/iso-42001-calculator"
                    className="bg-white text-blue-900 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2"
                  >
                    Calculate Readiness Score
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/ai-compliance/compare/iso-42001-vs-eu-ai-act"
                    className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    Compare with EU AI Act
                  </Link>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-white mb-2">38</div>
                  <div className="text-blue-200 font-medium">Control Objectives</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-blue-100">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    Certifiable Standard
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    Global Recognition
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    EU AI Act Aligned
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 bg-blue-50 border-b border-blue-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <span className="font-medium text-blue-700">Quick Links:</span>
              <a href="#controls" className="text-blue-800 hover:text-blue-900 font-medium">Control Domains</a>
              <a href="#implementation" className="text-blue-800 hover:text-blue-900 font-medium">Implementation</a>
              <a href="#costs" className="text-blue-800 hover:text-blue-900 font-medium">Costs</a>
              <a href="#faq" className="text-blue-800 hover:text-blue-900 font-medium">FAQs</a>
            </div>
          </div>
        </section>

        <section id="controls" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">ISO 42001 Control Domains</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                ISO 42001 follows the Annex SL structure with 7 main clauses and 38 control objectives across the AI lifecycle.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {controlDomains.map((domain) => {
                const Icon = domain.icon;
                return (
                  <div key={domain.clause} className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-blue-600 uppercase">Clause {domain.clause}</span>
                        <h3 className="text-lg font-bold text-slate-900">{domain.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{domain.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-xs font-bold text-blue-700">{domain.controls} Controls</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link 
                href="/iso-42001-calculator"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
              >
                Assess Your Control Gaps
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <section id="implementation" className="py-20 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Implementation Roadmap</h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                A typical ISO 42001 implementation takes 6-12 months depending on organizational complexity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {implementationPhases.map((phase) => (
                <div key={phase.phase} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-xl font-black text-white">{phase.phase}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{phase.title}</h3>
                      <span className="text-sm text-blue-400">{phase.duration}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="costs" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">ISO 42001 Cost Estimates</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Budget ranges for small to mid-sized organizations implementing ISO 42001.
              </p>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Cost Item</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Range</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {costBreakdown.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.item}</td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-600">{item.range}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-blue-50">
                  <tr>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">Total First Year</td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-700" colSpan={2}>$66,000 - $175,000</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/iso-42001-calculator"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold"
              >
                Get Personalized Cost Estimate
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">ISO 42001 FAQs</h2>
            </div>
            
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Who should get ISO 42001 certified?</h3>
                <p className="text-slate-600">Organizations that develop, deploy, or use AI systems and want to demonstrate responsible AI governance. Particularly relevant for companies serving enterprise customers, operating in regulated industries, or deploying high-risk AI systems under the EU AI Act.</p>
              </div>
              
              <div className="border-b border-slate-200 pb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">How does ISO 42001 relate to the EU AI Act?</h3>
                <p className="text-slate-600">ISO 42001 certification can demonstrate compliance with many EU AI Act requirements for high-risk AI systems. The standard's risk management, documentation, and governance requirements align closely with regulatory obligations.</p>
              </div>
              
              <div className="border-b border-slate-200 pb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Can ISO 42001 be integrated with ISO 27001?</h3>
                <p className="text-slate-600">Yes. Both standards follow the Annex SL structure, making integration straightforward. Organizations with existing ISO 27001 certification can extend their ISMS to include AI-specific controls from ISO 42001.</p>
              </div>
              
              <div className="pb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">How long does certification take?</h3>
                <p className="text-slate-600">Typically 6-12 months from gap assessment to certification, depending on organizational complexity, existing governance maturity, and the scope of AI systems covered.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Start Your ISO 42001 Journey</h2>
            <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
              Get a free readiness assessment and understand what it takes to achieve ISO 42001 certification.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/iso-42001-calculator"
                className="w-full sm:w-auto bg-white text-blue-900 font-bold px-10 py-5 rounded-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Calculate Readiness Score
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/readiness-review"
                className="w-full sm:w-auto bg-blue-800 text-white border border-blue-700 font-bold px-10 py-5 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Book Expert Review
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <AuthorBio authorId="kevin" />
          </div>
        </section>

        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">Related Resources</h3>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <Link href="/ai-compliance" className="text-slate-600 hover:text-brand-600 font-medium">AI Hub</Link>
              <Link href="/ai-compliance/eu-ai-act" className="text-slate-600 hover:text-brand-600 font-medium">EU AI Act Guide</Link>
              <Link href="/ai-compliance/nist-ai-rmf" className="text-slate-600 hover:text-brand-600 font-medium">NIST AI RMF</Link>
              <Link href="/ai-compliance/compare/iso-42001-vs-eu-ai-act" className="text-slate-600 hover:text-brand-600 font-medium">Framework Comparison</Link>
              <Link href="/iso-27001" className="text-slate-600 hover:text-brand-600 font-medium">ISO 27001</Link>
              <Link href="/soc-2" className="text-slate-600 hover:text-brand-600 font-medium">SOC 2</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
