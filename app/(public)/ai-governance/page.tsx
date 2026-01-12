import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { 
  Bot, 
  Shield, 
  Target, 
  ArrowRight, 
  Brain,
  CheckCircle,
  FileText,
  Search,
  Zap,
  Activity,
  BarChart3
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Governance Hub | Programmatic Compliance & Risk Frameworks | RiscLens',
  description: 'The definitive hub for AI governance. Explore ISO 42001, EU AI Act, and NIST AI RMF compliance guides across 50+ industries.',
  alternates: {
    canonical: 'https://risclens.com/ai-governance',
  },
};

const frameworks = [
  { name: 'AI Governance', slug: 'ai-governance', color: 'bg-brand-50 text-brand-700 border-brand-200' },
  { name: 'ISO 42001', slug: 'iso-42001', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'EU AI Act', slug: 'eu-ai-act', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { name: 'NIST AI RMF', slug: 'nist-ai-rmf', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

const industries = [
  { name: 'Healthcare', slug: 'healthcare' },
  { name: 'Fintech', slug: 'fintech' },
  { name: 'HR-Tech', slug: 'hr-tech' },
  { name: 'SaaS', slug: 'saas' },
  { name: 'Insurance', slug: 'insurance' },
  { name: 'Manufacturing', slug: 'manufacturing' },
  { name: 'Marketing AI', slug: 'marketing-ai' },
  { name: 'Cybersecurity', slug: 'cybersecurity' },
];

  const decisionTypes = [
    { name: 'Compliance', slug: 'compliance', icon: Shield },
    { name: 'Readiness', slug: 'readiness', icon: Activity },
    { name: 'Checklist', slug: 'checklist', icon: FileText },
    { name: 'Risk Assessment', slug: 'risk-assessment', icon: Target },
  ];

  const roleGuides = [
    { name: 'CTOs', slug: 'ai-governance-for-cto', icon: Brain },
    { name: 'Legal Counsel', slug: 'ai-governance-for-legal-counsel', icon: FileText },
    { name: 'Risk Managers', slug: 'ai-governance-for-risk-manager', icon: Target },
    { name: 'Security Architects', slug: 'ai-governance-for-security-architect', icon: Shield },
  ];

  const advancedTopics = [
    { name: 'ISO 42001 vs EU AI Act', slug: 'iso-42001-vs-eu-ai-act', category: 'Comparison' },
    { name: 'NIST AI RMF vs EU AI Act', slug: 'nist-ai-rmf-vs-eu-ai-act', category: 'Comparison' },
    { name: 'ISO 42001 vs NIST AI RMF', slug: 'iso-42001-vs-nist-ai-rmf', category: 'Comparison' },
    { name: 'Cost of AI Compliance', slug: 'ai-governance-budgeting-guide', category: 'Budgeting' },
  ];

  export default function AIGovernanceHubPage() {
    return (

    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <GeneralPageSchema
        title="AI Governance Hub"
        description="Navigate the complex landscape of AI regulations and standards with our programmatic compliance guides."
        url="https://risclens.com/ai-governance"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Governance Hub', item: 'https://risclens.com/ai-governance' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-slate-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">AI Governance Hub</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
              The intelligence layer for AI compliance. Programmatic guides for ISO 42001, 
              EU AI Act, and NIST AI RMF across every industry.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ai-governance-readiness-index" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all">
                <BarChart3 className="w-5 h-5" />
                Get AI Readiness Score
              </Link>
              <Link href="/iso-42001-calculator" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all">
                <Bot className="w-5 h-5" />
                ISO 42001 Calculator
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Explore by Industry</h2>
                <div className="space-y-2">
                  {industries.map((industry) => (
                    <Link 
                      key={industry.slug} 
                      href={`/ai-governance/compliance/${industry.slug}`}
                      className="block p-3 rounded-lg border border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all text-slate-700 hover:text-brand-700 font-medium"
                    >
                      {industry.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-8">High-Intent AI Compliance Guides</h2>
                
                <div className="grid gap-8">
                  {frameworks.map((framework) => (
                    <div key={framework.slug} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${framework.color}`}>
                          {framework.name}
                        </div>
                          <Link href={framework.slug === 'ai-governance' ? '/ai-governance' : `/ai-compliance/${framework.slug}`} className="text-brand-600 hover:text-brand-700 text-sm font-bold flex items-center gap-1 transition-all">
                            View Framework <ArrowRight className="w-4 h-4" />
                          </Link>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        {decisionTypes.map((decision) => (
                          <Link 
                            key={decision.slug}
                            href={`/${framework.slug}/${decision.slug}/healthcare`}
                            className="group p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <decision.icon className="w-5 h-5 text-slate-400 group-hover:text-brand-500" />
                              <h3 className="font-bold text-slate-900">{framework.name} {decision.name}</h3>
                            </div>
                            <p className="text-xs text-slate-500 mb-2 leading-tight italic">Programmatic compliance benchmarks and risk mitigation for AI.</p>
                            <span className="text-brand-600 text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all">
                              Explore 50+ Industries →
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-8">Strategic Role-Based Guides</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {roleGuides.map((role) => (
                      <Link 
                        key={role.slug}
                        href={`/ai-governance/${role.slug}`}
                        className="group flex items-center gap-4 p-6 rounded-2xl border border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all shadow-sm"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-white flex items-center justify-center transition-all">
                          <role.icon className="w-6 h-6 text-slate-400 group-hover:text-brand-500" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-brand-700">{role.name}</h3>
                          <p className="text-xs text-slate-500">Industry-specific governance roadmap.</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 ml-auto transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>

                  <div className="mt-16">
                    <h2 className="text-3xl font-bold mb-8">Advanced AI Governance Topics</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {advancedTopics.map((topic) => (
                        <Link 
                          key={topic.slug}
                          href={topic.category === 'Comparison' ? `/compliance/compare/${topic.slug}` : `/ai-governance/${topic.slug}`}
                          className="group p-5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-500 mb-2 block">{topic.category}</span>
                            <h3 className="font-bold text-slate-900 mb-2">{topic.name}</h3>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-brand-600 opacity-0 group-hover:opacity-100 transition-all">
                            Read Guide <ArrowRight className="w-3 h-3" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>


            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why AI Governance Matters</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Enterprise buyers now require documented AI safety and compliance before signing contracts.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Clear Enterprise Procurement', description: 'Pass AI security assessments with standardized documentation and ISO 42001 certification.', icon: CheckCircle },
                { title: 'Mitigate Algorithmic Risk', description: 'Systematically identify and reduce bias, hallucinations, and security vulnerabilities in your models.', icon: Shield },
                { title: 'Regulatory Readiness', description: 'Be ready for the EU AI Act enforcement with risk classifications and governance workflows.', icon: Zap },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <item.icon className="w-10 h-10 text-brand-500 mb-6" />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your AI systems?</h2>
            <p className="text-brand-200 mb-10">Get your programmatic compliance roadmap in minutes.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ai-governance-readiness-index" className="bg-white text-brand-900 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all">
                Start Readiness Index
              </Link>
              <Link href="/readiness-review" className="bg-brand-800 text-white border border-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-700 transition-all">
                Book Expert Review
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <AuthorBio authorId="kevin" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
