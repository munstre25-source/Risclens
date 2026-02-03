import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import ComplianceHub from '@/components/ComplianceHub';
import { FAQSection } from '@/components/FAQSection';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { AdvancedSchema } from '@/components/AdvancedSchema';

import { TrustBadges, SecurityBadgeBar } from '@/components/TrustBadges';

export const metadata: Metadata = {
  title: 'Get SOC 2 and AI Audit-Ready Faster (2026) | RiscLens',
  description:
    'Free readiness score and cost estimate in under 2 minutes. Deterministic roadmaps, auditor directories, and ISO 42001 (AI) guidance for B2B startups.',
  openGraph: {
    title: 'Get SOC 2 and AI Audit-Ready Faster (2026) | RiscLens',
    description:
      'Free readiness score and cost estimate in under 2 minutes. Deterministic roadmaps and auditor matching for B2B startups.',
    images: [{ url: '/og-home.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get SOC 2 and AI Audit-Ready Faster (2026) | RiscLens',
    description:
      'Free readiness score and cost estimate in under 2 minutes. Deterministic roadmaps and auditor matching for B2B startups.',
    images: ['/og-home.png'],
  },
  alternates: {
    canonical: 'https://risclens.com',
  },
};

export default function HomePage() {
  const faqItems = [
    {
      question: "What is RiscLens?",
      answer: "RiscLens is a compliance intelligence platform that helps early-stage companies navigate SOC 2, ISO 27001, and ISO 42001 (AI) audits with deterministic roadmaps and auditor matching."
    },
    {
      question: "How does the SOC 2 Readiness Assessment work?",
      answer: "Our assessment analyzes your current security stack and team size to provide a readiness score and estimated compliance budget in under 2 minutes."
    },
    {
      question: "Is RiscLens an auditor or compliance platform?",
      answer: "No. RiscLens is an independent planning and intelligence tool. We help you benchmark readiness, compare vendors, and find auditors—we don't sell audits or compliance software."
    },
    {
      question: "Who is RiscLens for?",
      answer: "Founders, security leads, and procurement teams at B2B startups who need to get SOC 2 or AI governance audit-ready. We focus on practical roadmaps and cost clarity without sales pressure."
    }
  ];

  return (
    <>
      <AdvancedSchema faq={faqItems} />
      <main className="min-h-screen flex flex-col bg-slate-50">
        <Header />

          {/* Hero Section - Clean, Professional */}
          <section className="bg-white border-b border-slate-200">
              <div className="max-w-5xl mx-auto px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
                    Get SOC 2 and AI audit-ready, faster.
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
                    Compliance intelligence for B2B teams. Roadmaps, cost calculators, and auditor matching.
                  </p>
                  
                  <p className="text-sm text-slate-500 mb-6">
                    Free · No signup · 2 min · <Link href="/methodology" className="text-slate-600 hover:text-slate-900 underline">Deterministic scoring</Link>
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <Link
                      href="/soc-2-readiness-index"
                      className="w-full sm:w-auto bg-slate-900 text-white font-semibold px-8 py-4 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Start Free Assessment
                    </Link>

                    <Link
                      href="/tools"
                      className="w-full sm:w-auto text-slate-700 font-semibold px-8 py-4 rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors"
                    >
                      View All Tools
                    </Link>
                  </div>
                  <p className="text-sm text-slate-500 mb-10">Join 500+ teams who got their score</p>

                  {/* Stats - Simple text-based */}
                  <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-slate-500 border-t border-slate-100 pt-10">
                    <span>100+ security stacks analyzed</span>
                    <span className="hidden sm:inline">·</span>
                    <span>500+ audits benchmarked</span>
                    <span className="hidden sm:inline">·</span>
                    <span>2026 data</span>
                  </div>
              </div>
        </section>

        {/* Features - Text-focused */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">What you get</h2>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Auditor Directory",
                    description: "Find verified audit firms specializing in SOC 2, ISO 27001, and AI governance.",
                    link: "/auditor-directory"
                  },
                  {
                    title: "Cost Calculator",
                    description: "Estimate your compliance costs with real market data and benchmarks.",
                    link: "/compliance-roi-calculator"
                  },
                  {
                    title: "ISO 42001 Readiness",
                    description: "AI governance assessment for teams building with LLMs and ML systems.",
                    link: "/iso-42001-calculator"
                  }
                ].map((feature) => (
                  <Link 
                    key={feature.title}
                    href={feature.link}
                    className="p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm mb-3">{feature.description}</p>
                    <span className="text-sm text-slate-500 hover:text-slate-700">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Compliance Directory</h2>
                <p className="text-slate-600 mb-6">
                  Research the security posture of 100+ companies. Public signals, trust center links, and compliance status in one place.
                </p>
                <Link 
                  href="/compliance/directory" 
                  className="text-slate-700 font-medium hover:text-slate-900 hover:underline"
                >
                  Browse directory →
                </Link>
              </div>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium text-slate-600">Company</th>
                      <th className="px-4 py-3 font-medium text-slate-600">Frameworks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'OpenAI', signals: 'SOC 2, ISO 27001, ISO 42001' },
                      { name: 'Anthropic', signals: 'SOC 2, HIPAA' },
                      { name: 'Vanta', signals: 'SOC 2, ISO 27001' },
                      { name: 'Drata', signals: 'SOC 2, ISO 27001' },
                    ].map((item) => (
                      <tr key={item.name}>
                        <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                        <td className="px-4 py-3 text-slate-600">{item.signals}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Guides */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-8 text-center">Compliance by industry</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'SaaS', href: '/soc-2/industries/saas' },
                { label: 'Fintech', href: '/soc-2/industries/fintech' },
                { label: 'Healthcare', href: '/soc-2/industries/healthcare' },
                { label: 'Startups', href: '/soc-2/industries/startups' },
              ].map((industry) => (
                <Link
                  key={industry.label}
                  href={industry.href}
                  className="px-5 py-2.5 bg-white rounded border border-slate-200 text-slate-700 font-medium hover:border-slate-300 hover:text-slate-900 transition-colors"
                >
                  {industry.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

          {/* Platform Comparisons */}
          <section className="py-16 bg-white border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900">Platform comparisons</h2>
                <Link 
                  href="/compare" 
                  className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
                >
                  View all →
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { slug: 'vanta-vs-drata', a: 'Vanta', b: 'Drata' },
                  { slug: 'drata-vs-secureframe', a: 'Drata', b: 'Secureframe' },
                  { slug: 'vanta-vs-secureframe', a: 'Vanta', b: 'Secureframe' },
                  { slug: 'thoropass-vs-vanta', a: 'Thoropass', b: 'Vanta' },
                  { slug: 'vanta-vs-auditboard', a: 'Vanta', b: 'AuditBoard' },
                  { slug: 'sprinto-vs-vanta', a: 'Sprinto', b: 'Vanta' },
                ].map((pair) => (
                  <Link 
                    key={pair.slug}
                    href={pair.slug === 'vanta-vs-auditboard' || pair.slug === 'sprinto-vs-vanta' || pair.slug === 'thoropass-vs-vanta' || pair.slug === 'drata-vs-secureframe' || pair.slug === 'vanta-vs-drata' ? `/compare/${pair.slug}` : `/compliance/compare/${pair.slug}`}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded hover:border-slate-300 transition-colors"
                  >
                    <span className="text-slate-900">{pair.a} vs {pair.b}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>
          </section>


          {/* Frameworks */}
          <section className="py-12 bg-white border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-4 text-center">
              <TrustBadges variant="compact" />
              <SecurityBadgeBar className="mt-4" />
            </div>
          </section>

          <ComplianceHub />
          <FAQSection title="Frequently Asked Questions" faqs={faqItems} showSchema={false} />
          <AboutSection />

        <Footer />
      </main>
    </>
  );
}
