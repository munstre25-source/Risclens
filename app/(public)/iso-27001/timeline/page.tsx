import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { implementationPhases } from '@/src/content/iso27001Content';
import { 
  Clock,
  CheckCircle,
  ArrowRight,
  Calendar,
  AlertTriangle,
  Target,
  FileCheck,
  Users,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ISO 27001 Certification Timeline | 6-12 Month Roadmap | RiscLens',
  description:
    'Plan your ISO 27001 certification timeline. Understand the 5 phases from gap assessment to certification and how to accelerate your ISMS implementation.',
  alternates: {
    canonical: 'https://risclens.com/iso-27001/timeline',
  },
};

const timelineFactors = [
  {
    factor: 'Organization Size',
    impact: 'High',
    description: 'Larger organizations have more assets, processes, and stakeholders to coordinate.',
    examples: ['< 50 employees: 4-6 months', '50-200 employees: 6-9 months', '200+ employees: 9-12+ months'],
  },
  {
    factor: 'Existing Security Maturity',
    impact: 'High',
    description: 'Organizations with existing controls (SOC 2, NIST) can accelerate significantly.',
    examples: ['No existing framework: +3-4 months', 'SOC 2 certified: -2-3 months', 'ISO 27001:2013: 2-3 months'],
  },
  {
    factor: 'Scope Complexity',
    impact: 'Medium',
    description: 'Multi-location, multi-cloud, or complex supply chains increase implementation time.',
    examples: ['Single location/cloud: baseline', 'Multi-cloud: +1-2 months', 'Global operations: +2-4 months'],
  },
  {
    factor: 'Resource Allocation',
    impact: 'Medium',
    description: 'Dedicated compliance team vs. part-time resources affects velocity.',
    examples: ['Full-time team: baseline', 'Part-time resources: +2-3 months', 'External consultants: -1-2 months'],
  },
];

const accelerators = [
  { title: 'Leverage SOC 2 Evidence', description: 'If you have SOC 2, 70-80% of evidence can be reused for ISO 27001.' },
  { title: 'Use GRC Automation', description: 'Platforms like Vanta, Drata, or Sprinto can cut implementation time by 40-50%.' },
  { title: 'Pre-build Documentation', description: 'Start drafting policies and procedures before the formal gap assessment.' },
  { title: 'Engage Registrar Early', description: 'Book your audit dates early to avoid scheduling bottlenecks.' },
];

export default function ISO27001TimelinePage() {
  const breadcrumbItems = [
    { label: 'Frameworks', href: '/compliance' },
    { label: 'ISO 27001', href: '/iso-27001' },
    { label: 'Timeline', href: '/iso-27001/timeline' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <GeneralPageSchema
        title="ISO 27001 Certification Timeline"
        description="Plan your ISO 27001 certification timeline with our comprehensive guide."
        url="https://risclens.com/iso-27001/timeline"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'ISO 27001', item: 'https://risclens.com/iso-27001' },
          { name: 'Timeline', item: 'https://risclens.com/iso-27001/timeline' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-900 via-blue-900 to-blue-800 text-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-bold uppercase tracking-wider mb-6">
                <Clock className="w-4 h-4" />
                Planning Guide
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                ISO 27001 Certification<br />
                <span className="text-blue-300">Timeline & Roadmap</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-3xl">
                A typical ISO 27001 implementation takes 6-12 months. Understand the factors that affect your timeline 
                and how to accelerate your path to certification.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/soc-2-readiness-calculator"
                  className="bg-white text-blue-900 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                  Assess Your Readiness
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/iso-27001"
                  className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all"
                >
                  Back to ISO 27001 Hub
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">5-Phase Implementation Roadmap</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                The ISO 27001 certification journey consists of five distinct phases. Each phase builds on the previous one.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-100 hidden md:block" />
              
              <div className="space-y-8">
                {implementationPhases.map((phase, idx) => (
                  <div key={phase.phase} className="relative">
                    <div className="md:ml-20 bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                      <div className="absolute left-4 top-8 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold hidden md:flex">
                        {phase.phase}
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="md:hidden w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {phase.phase}
                            </span>
                            <h3 className="text-xl font-bold text-slate-900">{phase.title}</h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg shrink-0">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-bold text-blue-700">{phase.duration}</span>
                        </div>
                      </div>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {phase.activities.map((activity, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Total Timeline: 6-12 Months</h3>
                  <p className="text-slate-600">
                    The total duration depends on your organization&apos;s size, complexity, and existing security maturity. 
                    Organizations with SOC 2 can often achieve certification in 4-6 months.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Factors That Affect Your Timeline</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Understanding these factors helps you plan realistic timelines and allocate resources appropriately.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {timelineFactors.map((factor) => (
                <div key={factor.factor} className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{factor.factor}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      factor.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {factor.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{factor.description}</p>
                  <ul className="space-y-2">
                    {factor.examples.map((example, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How to Accelerate Your Timeline</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Use these strategies to reduce your time to certification without compromising quality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {accelerators.map((item, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Plan Your ISO 27001 Timeline</h2>
            <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
              Get a personalized timeline estimate based on your organization&apos;s current security posture.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/soc-2-readiness-calculator"
                className="w-full sm:w-auto bg-white text-blue-900 font-bold px-10 py-5 rounded-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Start Readiness Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/iso-27001/auditor-selection"
                className="w-full sm:w-auto bg-blue-800 text-white border border-blue-700 font-bold px-10 py-5 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Choose a Registrar
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
              <Link href="/iso-27001" className="text-slate-600 hover:text-blue-600 font-medium">ISO 27001 Hub</Link>
              <Link href="/iso-27001/controls" className="text-slate-600 hover:text-blue-600 font-medium">Annex A Controls</Link>
              <Link href="/iso-27001-checklist" className="text-slate-600 hover:text-blue-600 font-medium">ISO 27001 Checklist</Link>
              <Link href="/soc-2-vs-iso-27001" className="text-slate-600 hover:text-blue-600 font-medium">SOC 2 vs ISO 27001</Link>
              <Link href="/soc-2-timeline" className="text-slate-600 hover:text-blue-600 font-medium">SOC 2 Timeline</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
