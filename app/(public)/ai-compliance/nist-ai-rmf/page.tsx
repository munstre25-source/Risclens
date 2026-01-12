import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Target, Shield, CheckCircle, ArrowRight, Layers, Users, Eye, Lock, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NIST AI RMF Complete Guide | AI Risk Management Framework | RiscLens',
  description: 'The definitive guide to NIST AI Risk Management Framework. Understand the 4 core functions, implementation for government contractors, and FedRAMP alignment.',
  alternates: { canonical: 'https://risclens.com/ai-compliance/nist-ai-rmf' },
};

const coreFunctions = [
  { name: 'GOVERN', description: 'Cultivate a culture of risk management within AI development and deployment.', color: 'blue', icon: Shield, activities: ['Policies and procedures', 'Roles and responsibilities', 'Risk culture', 'Legal and regulatory compliance'] },
  { name: 'MAP', description: 'Understand the context in which AI systems operate and their potential impacts.', color: 'green', icon: Eye, activities: ['System context', 'Data characteristics', 'Intended use cases', 'Stakeholder impacts'] },
  { name: 'MEASURE', description: 'Employ appropriate metrics and methods to assess AI risks.', color: 'purple', icon: Target, activities: ['Risk metrics', 'Testing methods', 'Performance monitoring', 'Bias detection'] },
  { name: 'MANAGE', description: 'Prioritize and act upon risks according to projected impact.', color: 'orange', icon: Layers, activities: ['Risk prioritization', 'Response strategies', 'Continuous monitoring', 'Incident response'] },
];

const trustworthyPrinciples = [
  { principle: 'Valid & Reliable', description: 'AI systems should produce consistently accurate outputs.' },
  { principle: 'Safe', description: 'AI should not pose unreasonable risks to safety.' },
  { principle: 'Secure & Resilient', description: 'AI systems should withstand attacks and recover from failures.' },
  { principle: 'Accountable & Transparent', description: 'Organizations should be accountable for AI decisions.' },
  { principle: 'Explainable & Interpretable', description: 'AI outputs should be understandable to stakeholders.' },
  { principle: 'Privacy-Enhanced', description: 'AI should protect individual and group privacy.' },
  { principle: 'Fair - with Harmful Bias Managed', description: 'AI should not perpetuate unfair bias.' },
];

export default function NISTAIRMFPage() {
  const breadcrumbItems = [
    { label: 'AI Compliance', href: '/ai-compliance' },
    { label: 'NIST AI RMF', href: '/ai-compliance/nist-ai-rmf' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title="NIST AI RMF Complete Guide"
        description="The definitive guide to NIST AI Risk Management Framework."
        url="https://risclens.com/ai-compliance/nist-ai-rmf"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Compliance Hub', item: 'https://risclens.com/ai-compliance' },
          { name: 'NIST AI RMF', item: 'https://risclens.com/ai-compliance/nist-ai-rmf' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-emerald-900 via-emerald-900 to-emerald-800 text-white py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
              <div className="lg:max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-sm font-bold uppercase tracking-wider mb-6">
                  <Target className="w-4 h-4" />
                  U.S. Federal Framework
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                  NIST AI RMF<br />
                  <span className="text-emerald-300">Complete Guide</span>
                </h1>
                <p className="text-xl text-emerald-100 leading-relaxed mb-8">
                  The NIST AI Risk Management Framework provides a comprehensive approach to managing AI risks. 
                  Essential for government contractors and increasingly expected by enterprise customers.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/ai-governance-readiness-index" className="bg-white text-emerald-900 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-emerald-50 transition-all flex items-center gap-2">
                    Assess AI Readiness <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/ai-compliance/compare/nist-ai-rmf-vs-iso-42001" className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all">
                    Compare with ISO 42001
                  </Link>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-white mb-2">4</div>
                  <div className="text-emerald-200 font-medium">Core Functions</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-emerald-100"><CheckCircle className="w-4 h-4 text-emerald-400" />Voluntary Framework</div>
                  <div className="flex items-center gap-2 text-emerald-100"><CheckCircle className="w-4 h-4 text-emerald-400" />FedRAMP Alignment</div>
                  <div className="flex items-center gap-2 text-emerald-100"><CheckCircle className="w-4 h-4 text-emerald-400" />7 Trustworthy Principles</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">The Four Core Functions</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                NIST AI RMF is built around four interconnected functions that guide organizations through AI risk management.
              </p>
            </div>
            
              <div className="grid md:grid-cols-2 gap-8">
                {coreFunctions.map((func) => {
                  const Icon = func.icon;
                  const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
                    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', iconBg: 'bg-blue-100' },
                    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', iconBg: 'bg-green-100' },
                    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', iconBg: 'bg-purple-100' },
                    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', iconBg: 'bg-orange-100' },
                  };
                  const colorClasses = colorMap[func.color] || colorMap.blue;
                  
                  return (
                    <div key={func.name} className={`${colorClasses.bg} border-2 ${colorClasses.border} rounded-2xl p-8`}>

                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 ${colorClasses.iconBg} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 ${colorClasses.text}`} />
                      </div>
                      <h3 className={`text-2xl font-black ${colorClasses.text}`}>{func.name}</h3>
                    </div>
                    <p className="text-slate-600 mb-6">{func.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {func.activities.map((activity, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle className={`w-4 h-4 ${colorClasses.text}`} />{activity}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trustworthy AI Characteristics</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">NIST AI RMF is grounded in seven principles for trustworthy AI.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trustworthyPrinciples.map((item, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-emerald-400 mb-2">{item.principle}</h3>
                  <p className="text-slate-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">NIST AI RMF FAQs</h2>
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Is NIST AI RMF mandatory?</h3>
                <p className="text-slate-600">The framework itself is voluntary. However, federal agencies may incorporate it into procurement requirements, making it effectively mandatory for government contractors selling AI solutions.</p>
              </div>
              <div className="border-b border-slate-200 pb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">How does it relate to ISO 42001?</h3>
                <p className="text-slate-600">Both frameworks address AI risk management but from different angles. NIST AI RMF is more prescriptive about functions and characteristics, while ISO 42001 provides a certifiable management system. Many organizations implement both.</p>
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Do I need NIST AI RMF for FedRAMP?</h3>
                <p className="text-slate-600">FedRAMP doesn't currently require NIST AI RMF, but AI-specific controls are being incorporated. Organizations seeking FedRAMP authorization for AI products should align with NIST AI RMF principles.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-emerald-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Implement NIST AI RMF</h2>
            <p className="text-emerald-200 mb-8">Get a free assessment of your AI systems against NIST AI RMF principles.</p>
            <Link href="/ai-governance-readiness-index" className="inline-flex items-center gap-2 bg-white text-emerald-900 font-bold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all">
              Get AI Readiness Score <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4"><AuthorBio authorId="kevin" /></div>
        </section>

        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <Link href="/ai-compliance" className="text-slate-600 hover:text-brand-600 font-medium">AI Hub</Link>
              <Link href="/ai-compliance/iso-42001" className="text-slate-600 hover:text-brand-600 font-medium">ISO 42001</Link>
              <Link href="/ai-compliance/eu-ai-act" className="text-slate-600 hover:text-brand-600 font-medium">EU AI Act</Link>
              <Link href="/ai-compliance/compare/nist-ai-rmf-vs-iso-42001" className="text-slate-600 hover:text-brand-600 font-medium">NIST vs ISO 42001</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
