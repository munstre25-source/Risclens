import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  Brain, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  AlertTriangle,
  Scale,
  FileCheck,
  BookOpen,
  Users,
  Building2,
  Cpu,
  Lock,
  Eye,
  Target,
  Zap,
  Globe,
  Gavel
} from 'lucide-react';
import { ReactNode } from 'react';

interface RiskCategory {
  level: 'prohibited' | 'high-risk' | 'limited' | 'minimal';
  title: string;
  description: string;
  examples: string[];
}

interface Requirement {
  title: string;
  description: string;
  frameworks: string[];
}

interface FAQ {
  question: string;
  answer: string | ReactNode;
}

interface AIIndustryPageProps {
  industryName: string;
  industrySlug: string;
  heroDescription: string;
  euAiActRiskLevel: 'high-risk' | 'limited' | 'minimal';
  riskCategories: RiskCategory[];
  keyRequirements: Requirement[];
  implementationSteps: string[];
  faqs: FAQ[];
  relatedIndustries?: { name: string; href: string }[];
}

const riskLevelColors = {
  'prohibited': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: AlertTriangle },
  'high-risk': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: Shield },
  'limited': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: Eye },
  'minimal': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
};

const industryIcons: Record<string, typeof Brain> = {
  healthcare: Brain,
  'hr-tech': Users,
  fintech: Building2,
  insurance: Shield,
  legal: Gavel,
  education: BookOpen,
  automotive: Cpu,
  biometrics: Eye,
};

export default function AIIndustryPage({
  industryName,
  industrySlug,
  heroDescription,
  euAiActRiskLevel,
  riskCategories,
  keyRequirements,
  implementationSteps,
  faqs,
  relatedIndustries,
}: AIIndustryPageProps) {
  const pageUrl = `https://risclens.com/ai-compliance/industries/${industrySlug}`;
  const pageTitle = `AI Compliance for ${industryName} | EU AI Act & ISO 42001 Guide`;
  const lastUpdated = "January 12, 2026";
  
    const Icon = industryIcons[industrySlug] || Brain;
    const riskColors = riskLevelColors[euAiActRiskLevel] || riskLevelColors['minimal'];
    const RiskIcon = riskColors.icon;


  const breadcrumbItems = [
    { label: 'AI Compliance', href: '/ai-compliance' },
    { label: 'Industries', href: '/ai-compliance/industries' },
    { label: industryName, href: `/ai-compliance/industries/${industrySlug}` },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title={pageTitle}
        description={heroDescription}
        url={pageUrl}
        faqs={faqs?.length ? faqs.map((f) => ({ question: f.question, answer: typeof f.answer === 'string' ? f.answer : 'See page for full details.' })) : undefined}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'AI Compliance Hub', item: 'https://risclens.com/ai-compliance' },
          { name: 'Industries', item: 'https://risclens.com/ai-compliance/industries' },
          { name: industryName, item: pageUrl },
        ]}
      />

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            <div className="lg:max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium uppercase tracking-wide">
                  <Brain className="w-3.5 h-3.5" />
                  AI Governance Guide
                </div>
                <VerifiedBy authorId="kevin" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                AI Compliance for <span className="text-brand-700">{industryName}</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {heroDescription}
              </p>
              
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${riskColors.bg} ${riskColors.border} border mb-8`}>
                <RiskIcon className={`w-5 h-5 ${riskColors.text}`} />
                <span className={`font-bold ${riskColors.text}`}>
                  EU AI Act Classification: {euAiActRiskLevel.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/ai-governance-readiness-index"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-lg transition-all"
                >
                  Get AI Readiness Score
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/ai-compliance/eu-ai-act"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium px-6 py-3 rounded-lg border border-slate-300 transition-all"
                >
                  <Gavel className="w-4 h-4" />
                  EU AI Act Guide
                </Link>
              </div>
            </div>
            
            <div className="w-28 h-28 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <Icon className="w-14 h-14 text-slate-600" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 bg-slate-100 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
            <span className="font-medium text-slate-500">Related Frameworks:</span>
            <Link href="/ai-compliance/iso-42001" className="text-brand-700 hover:text-brand-800 font-medium">ISO 42001</Link>
            <Link href="/ai-compliance/eu-ai-act" className="text-brand-700 hover:text-brand-800 font-medium">EU AI Act</Link>
            <Link href="/ai-compliance/nist-ai-rmf" className="text-brand-700 hover:text-brand-800 font-medium">NIST AI RMF</Link>
            <Link href="/soc-2-readiness-checklist/ai-ml" className="text-brand-700 hover:text-brand-800 font-medium">SOC 2 for AI</Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <Scale className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">EU AI Act Risk Classification for {industryName}</h2>
          </div>
          
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {riskCategories.map((category, idx) => {
                const categoryColors = riskLevelColors[category.level] || riskLevelColors['minimal'];
                const CategoryIcon = categoryColors.icon;
                return (

                <div 
                  key={idx} 
                  className={`${categoryColors.bg} border ${categoryColors.border} rounded-lg p-6`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <CategoryIcon className={`w-6 h-6 ${categoryColors.text}`} />
                    <h3 className={`text-lg font-bold ${categoryColors.text}`}>{category.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm">{category.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Examples in {industryName}:</p>
                    <ul className="space-y-1">
                      {category.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className={`${categoryColors.text} mt-1`}>•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold">August 2026 Deadline</h3>
            </div>
            <p className="text-slate-300 mb-6">
              {industryName} companies deploying AI in the EU must achieve compliance by August 2026. Start your readiness assessment now to avoid rushing implementation or facing penalties up to 7% of global revenue.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/ai-compliance/compare/iso-42001-vs-eu-ai-act"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-5 py-2.5 rounded-lg hover:bg-brand-50 transition-all text-sm"
              >
                ISO 42001 vs EU AI Act
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/iso-42001-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 text-white font-bold px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-all text-sm"
              >
                Calculate Readiness
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-brand-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Key Requirements for {industryName} AI</h2>
          </div>
          
          <div className="space-y-6">
            {keyRequirements.map((req, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-brand-700 font-bold text-sm">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{req.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm mb-4">{req.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {req.frameworks.map((framework, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                          {framework}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-brand-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-brand-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Implementation Roadmap</h2>
              </div>
              <p className="text-brand-100 mb-8">
                Follow this {industryName}-specific roadmap to achieve AI compliance. Most organizations complete these steps in 6-12 months.
              </p>
              <div className="space-y-4">
                {implementationSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">{idx + 1}</span>
                    </div>
                    <p className="text-brand-100 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-10 h-10 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Start Your AI Governance Journey</h3>
              <p className="text-brand-100 mb-8 leading-relaxed">
                Get a personalized readiness score and action plan for your {industryName} AI systems. Our calculator maps your current state to ISO 42001 and EU AI Act requirements.
              </p>
              <Link 
                href="/ai-governance-readiness-index"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-all w-full justify-center"
              >
                Get Free AI Readiness Score
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-brand-300 text-sm mt-4">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-slate-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{industryName} AI Compliance FAQs</h2>
          </div>
          
          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-8 last:border-0">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                <div className="text-slate-600 leading-relaxed">
                  {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6 text-center">Explore Other AI Compliance Industries</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { slug: 'healthcare', name: 'Healthcare AI', icon: Brain },
              { slug: 'hr-tech', name: 'HR-Tech AI', icon: Users },
              { slug: 'fintech', name: 'Fintech AI', icon: Building2 },
              { slug: 'insurance', name: 'Insurance AI', icon: Shield },
            ].filter(i => i.slug !== industrySlug).map((industry) => (
              <Link
                key={industry.slug}
                href={`/ai-compliance/industries/${industry.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-200 bg-white hover:border-brand-300 hover:shadow-md transition-all"
              >
                <industry.icon className="w-8 h-8 text-brand-600" />
                <span className="text-sm font-semibold text-slate-700 text-center">{industry.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <span className="font-medium text-slate-500">Related Resources:</span>
            <Link href="/ai-compliance" className="text-brand-700 hover:text-brand-800 underline underline-offset-4">AI Hub</Link>
            <Link href="/ai-compliance/eu-ai-act" className="text-brand-700 hover:text-brand-800 underline underline-offset-4">EU AI Act</Link>
            <Link href="/ai-compliance/iso-42001" className="text-brand-700 hover:text-brand-800 underline underline-offset-4">ISO 42001</Link>
            <Link href="/ai-compliance/compare/iso-42001-vs-eu-ai-act" className="text-brand-700 hover:text-brand-800 underline underline-offset-4">Framework Comparison</Link>
            <Link href="/soc-2-cost/ai-data" className="text-brand-700 hover:text-brand-800 underline underline-offset-4">AI Company Costs</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AuthorBio authorId="kevin" />
        </div>
      </section>

      <AboutSection />
      <Footer />
      <StickyCTA 
        label={`Start Your ${industryName} AI Compliance`} 
        targetHref="/ai-governance-readiness-index" 
      />
    </main>
  );
}
