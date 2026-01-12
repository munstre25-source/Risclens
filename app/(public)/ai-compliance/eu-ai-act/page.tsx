import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  Gavel, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  Ban,
  Eye,
  FileCheck,
  Building2,
  Users,
  Brain,
  Scale,
  Globe,
  Target,
  Zap,
  BookOpen
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EU AI Act Complete Guide 2026 | Risk Classification, Compliance Timeline | RiscLens',
  description:
    'The definitive guide to EU AI Act compliance. Understand risk classifications, August 2026 deadlines, penalties up to 7% revenue, and implementation requirements for high-risk AI systems.',
  openGraph: {
    title: 'EU AI Act Complete Guide 2026 | RiscLens',
    description: 'Navigate EU AI Act requirements. Risk-based classifications, deadlines, and compliance strategies.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens EU AI Act Guide' }],
  },
  alternates: {
    canonical: 'https://risclens.com/ai-compliance/eu-ai-act',
  },
};

const deadlineDate = new Date('2026-08-02');
const today = new Date();
const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

const riskTiers = [
  {
    level: 'Prohibited',
    color: 'red',
    icon: Ban,
    description: 'AI systems that pose an unacceptable risk to safety, livelihoods, and rights.',
    examples: [
      'Social scoring by governments',
      'Real-time biometric surveillance in public spaces',
      'Manipulation of vulnerable groups',
      'Predictive policing based on profiling'
    ],
    deadline: 'February 2025',
    penalty: '7% of global annual revenue or €35M'
  },
  {
    level: 'High-Risk',
    color: 'orange',
    icon: AlertTriangle,
    description: 'AI systems that significantly impact health, safety, or fundamental rights.',
    examples: [
      'Medical devices and diagnostics',
      'Employment and HR decisions',
      'Credit scoring and financial access',
      'Educational assessment systems'
    ],
    deadline: 'August 2026',
    penalty: '3% of global annual revenue or €15M'
  },
  {
    level: 'Limited Risk',
    color: 'yellow',
    icon: Eye,
    description: 'AI systems with transparency obligations requiring user disclosure.',
    examples: [
      'Chatbots (must disclose AI interaction)',
      'Emotion recognition systems',
      'Deepfake generators',
      'Biometric categorization'
    ],
    deadline: 'August 2025',
    penalty: '1.5% of global annual revenue or €7.5M'
  },
  {
    level: 'Minimal Risk',
    color: 'green',
    icon: CheckCircle,
    description: 'AI systems with no specific regulatory requirements under the Act.',
    examples: [
      'AI-powered spam filters',
      'Recommendation engines',
      'AI in video games',
      'Inventory management AI'
    ],
    deadline: 'No deadline',
    penalty: 'Voluntary codes of conduct'
  }
];

const complianceTimeline = [
  { date: 'August 2024', event: 'EU AI Act enters into force', status: 'completed' },
  { date: 'February 2025', event: 'Prohibited AI practices banned', status: 'completed' },
  { date: 'August 2025', event: 'Transparency obligations for limited-risk AI', status: 'upcoming' },
  { date: 'August 2026', event: 'Full compliance required for high-risk AI systems', status: 'upcoming' },
  { date: 'August 2027', event: 'Obligations for general-purpose AI models', status: 'future' },
];

const highRiskRequirements = [
  {
    title: 'Risk Management System',
    description: 'Establish, implement, document, and maintain a continuous risk management system throughout the AI lifecycle.',
    iso42001: 'Clause 6.1 - Risk Assessment'
  },
  {
    title: 'Data Governance',
    description: 'Ensure training, validation, and testing datasets are relevant, representative, and free from errors.',
    iso42001: 'Clause 7.2 - Data Management'
  },
  {
    title: 'Technical Documentation',
    description: 'Maintain comprehensive technical documentation demonstrating compliance before market placement.',
    iso42001: 'Clause 7.5 - Documented Information'
  },
  {
    title: 'Record-Keeping',
    description: 'Automatic logging of events for traceability during the AI system operation.',
    iso42001: 'Clause 9.2 - Internal Audit'
  },
  {
    title: 'Transparency',
    description: 'Provide clear information to deployers about capabilities, limitations, and intended use.',
    iso42001: 'Clause 8.4 - Communication'
  },
  {
    title: 'Human Oversight',
    description: 'Design systems to allow effective human oversight during operation.',
    iso42001: 'Clause 8.1 - Operational Planning'
  },
  {
    title: 'Accuracy & Robustness',
    description: 'Ensure appropriate levels of accuracy, robustness, and cybersecurity.',
    iso42001: 'Clause 8.3 - AI System Development'
  },
  {
    title: 'Quality Management',
    description: 'Implement a quality management system ensuring ongoing compliance.',
    iso42001: 'Clause 4.4 - AI Management System'
  }
];

export default function EUAIActPage() {
  const breadcrumbItems = [
    { label: 'AI Compliance', href: '/ai-compliance' },
    { label: 'EU AI Act', href: '/ai-compliance/eu-ai-act' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="EU AI Act Complete Guide 2026"
        description="The definitive guide to EU AI Act compliance. Risk classifications, deadlines, and implementation requirements."
        url="https://risclens.com/ai-compliance/eu-ai-act"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Compliance Hub', item: 'https://risclens.com/ai-compliance' },
          { name: 'EU AI Act', item: 'https://risclens.com/ai-compliance/eu-ai-act' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-orange-900 via-orange-900 to-orange-800 text-white py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
              <div className="lg:max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-orange-200 text-sm font-bold uppercase tracking-wider mb-6">
                  <Gavel className="w-4 h-4" />
                  World's First AI Regulation
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                  EU AI Act<br />
                  <span className="text-orange-300">Complete Guide</span>
                </h1>
                <p className="text-xl text-orange-100 leading-relaxed mb-8">
                  The European Union's AI Act is the world's first comprehensive legal framework for artificial intelligence. 
                  Understand the risk-based approach, compliance deadlines, and what it means for your AI systems.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/ai-compliance/eu-ai-act-classifier"
                    className="bg-white text-orange-900 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-orange-50 transition-all flex items-center gap-2"
                  >
                    Classify Your AI Risk
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/ai-compliance/compare/iso-42001-vs-eu-ai-act"
                    className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <Scale className="w-5 h-5" />
                    Compare with ISO 42001
                  </Link>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-6 h-6 text-orange-300" />
                  <span className="text-orange-200 font-bold">High-Risk Deadline</span>
                </div>
                <div className="text-5xl font-black text-white mb-2">{daysUntilDeadline}</div>
                <div className="text-orange-200 text-lg font-medium mb-4">Days Remaining</div>
                <div className="text-orange-300 text-sm">Until August 2, 2026</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 bg-orange-50 border-b border-orange-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <span className="font-medium text-orange-700">Quick Links:</span>
              <a href="#risk-tiers" className="text-orange-800 hover:text-orange-900 font-medium">Risk Classifications</a>
              <a href="#timeline" className="text-orange-800 hover:text-orange-900 font-medium">Compliance Timeline</a>
              <a href="#requirements" className="text-orange-800 hover:text-orange-900 font-medium">High-Risk Requirements</a>
              <a href="#industries" className="text-orange-800 hover:text-orange-900 font-medium">Industry Guides</a>
            </div>
          </div>
        </section>

        <section id="risk-tiers" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Risk-Based Classification System</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                The EU AI Act categorizes AI systems into four risk tiers, each with different compliance requirements and penalties.
              </p>
            </div>
            
              <div className="grid md:grid-cols-2 gap-8">
                {riskTiers.map((tier) => {
                  const Icon = tier.icon;
                  const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
                    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', iconBg: 'bg-red-100' },
                    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', iconBg: 'bg-orange-100' },
                    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', iconBg: 'bg-yellow-100' },
                    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', iconBg: 'bg-green-100' },
                  };
                  const colorClasses = colorMap[tier.color] || colorMap.green;
                  
                  return (
                    <div key={tier.level} className={`${colorClasses.bg} border-2 ${colorClasses.border} rounded-2xl p-8`}>

                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 ${colorClasses.iconBg} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 ${colorClasses.text}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${colorClasses.text}`}>{tier.level} Risk</h3>
                        <p className="text-sm text-slate-500">Deadline: {tier.deadline}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-6">{tier.description}</p>
                    <div className="mb-6">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Examples:</p>
                      <ul className="space-y-2">
                        {tier.examples.map((example, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className={`${colorClasses.text} mt-1`}>•</span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`${colorClasses.iconBg} rounded-lg p-3`}>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Maximum Penalty:</p>
                      <p className={`text-sm font-bold ${colorClasses.text}`}>{tier.penalty}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link 
                href="/ai-compliance/eu-ai-act-classifier"
                className="inline-flex items-center gap-2 bg-orange-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-700 transition-all shadow-lg"
              >
                <Scale className="w-5 h-5" />
                Classify Your AI System
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <section id="timeline" className="py-20 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Compliance Timeline</h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                The EU AI Act is being implemented in phases. Know your deadlines.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700" />
              <div className="space-y-8">
                {complianceTimeline.map((item, idx) => (
                  <div key={idx} className="relative flex gap-6 items-start">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      item.status === 'completed' ? 'bg-green-500' : 
                      item.status === 'upcoming' ? 'bg-orange-500' : 'bg-slate-600'
                    }`}>
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <Clock className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-xl p-6 border border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                          item.status === 'upcoming' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-600 text-slate-300'
                        }`}>
                          {item.date}
                        </span>
                        {item.status === 'upcoming' && (
                          <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded">ACTION REQUIRED</span>
                        )}
                      </div>
                      <p className="text-lg text-white font-medium">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="requirements" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">High-Risk AI Requirements</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                If your AI system is classified as high-risk, you must implement these mandatory requirements. 
                <span className="font-medium text-brand-600"> ISO 42001 maps directly to most of these obligations.</span>
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {highRiskRequirements.map((req, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-orange-700 font-bold text-sm">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{req.title}</h3>
                      <p className="text-slate-600 text-sm mb-4">{req.description}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700">{req.iso42001}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">ISO 42001 + EU AI Act = Complete Coverage</h3>
                  <p className="text-slate-600">
                    Implementing ISO 42001 addresses 90%+ of EU AI Act high-risk requirements. Get certified to demonstrate compliance.
                  </p>
                </div>
                <Link 
                  href="/ai-compliance/compare/iso-42001-vs-eu-ai-act"
                  className="shrink-0 inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
                >
                  See Full Mapping
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="industries" className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">High-Risk Industry Guides</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Industry-specific guidance for EU AI Act compliance.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/ai-compliance/industries/healthcare" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-200 transition-all h-full">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Healthcare AI</h3>
                  <p className="text-sm text-slate-600 mb-4">Medical devices, diagnostics, clinical decision support</p>
                  <span className="text-brand-600 font-medium text-sm group-hover:underline">View Guide →</span>
                </div>
              </Link>

              <Link href="/ai-compliance/industries/hr-tech" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-200 transition-all h-full">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">HR-Tech AI</h3>
                  <p className="text-sm text-slate-600 mb-4">Resume screening, interview analysis, performance evaluation</p>
                  <span className="text-brand-600 font-medium text-sm group-hover:underline">View Guide →</span>
                </div>
              </Link>

              <Link href="/ai-compliance/industries/fintech" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-200 transition-all h-full">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Fintech AI</h3>
                  <p className="text-sm text-slate-600 mb-4">Credit scoring, fraud detection, algorithmic trading</p>
                  <span className="text-brand-600 font-medium text-sm group-hover:underline">View Guide →</span>
                </div>
              </Link>

              <Link href="/ai-compliance/industries/insurance" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-200 transition-all h-full">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Insurance AI</h3>
                  <p className="text-sm text-slate-600 mb-4">Risk assessment, claims processing, underwriting</p>
                  <span className="text-brand-600 font-medium text-sm group-hover:underline">View Guide →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-orange-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Don't Wait Until August 2026</h2>
            <p className="text-orange-200 text-lg mb-10 max-w-2xl mx-auto">
              Start your EU AI Act compliance journey today. Get a free assessment of your AI systems and a roadmap to compliance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/ai-governance-readiness-index"
                className="w-full sm:w-auto bg-white text-orange-900 font-bold px-10 py-5 rounded-xl hover:bg-orange-50 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Get AI Readiness Score
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/ai-compliance/iso-42001"
                className="w-full sm:w-auto bg-orange-800 text-white border border-orange-700 font-bold px-10 py-5 rounded-xl hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Explore ISO 42001
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
              <Link href="/ai-compliance/iso-42001" className="text-slate-600 hover:text-brand-600 font-medium">ISO 42001 Guide</Link>
              <Link href="/ai-compliance/nist-ai-rmf" className="text-slate-600 hover:text-brand-600 font-medium">NIST AI RMF</Link>
              <Link href="/ai-compliance/compare/iso-42001-vs-eu-ai-act" className="text-slate-600 hover:text-brand-600 font-medium">Framework Comparison</Link>
              <Link href="/iso-42001-calculator" className="text-slate-600 hover:text-brand-600 font-medium">ISO 42001 Calculator</Link>
              <Link href="/soc-2-cost/ai-data" className="text-slate-600 hover:text-brand-600 font-medium">AI Company Costs</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
