import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQSection } from '@/components/FAQSection';
import { industryCostLinks } from '@/lib/industryCostLinks';
import AssessmentCTA from '@/components/AssessmentCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { generateGuideFAQs } from '@/lib/seo-enhancements';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return industryCostLinks.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const industry = industryCostLinks.find((i) => i.slug === params.slug);
  if (!industry) return {};

  return {
    title: `SOC 2 Compliance for ${industry.label} | Industry Guide`,
    description: `Specific SOC 2 readiness requirements, cost estimates, and compliance roadmap for ${industry.label} companies. ${industry.blurb}`,
  };
}

export default function IndustryDetailPage({ params }: PageProps) {
  const industry = industryCostLinks.find((i) => i.slug === params.slug);

  if (!industry) {
    notFound();
  }

  const faqs = generateGuideFAQs(`SOC 2 Compliance for ${industry.label}`, 'SOC 2');

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 pt-8 pb-16 lg:pt-12 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Industries', href: '/soc-2/industries' },
                { label: industry.label }
              ]} 
            />
            
            <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-700 mb-6">
                  Industry-Specific Hub
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl tracking-tight mb-6">
                  SOC 2 for <span className="text-brand-600">{industry.label}</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-10">
                  {industry.blurb} We've tailored our SOC 2 framework to address the unique data risks, auditor expectations, and security controls relevant to {industry.label} organizations.
                </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <AssessmentCTA />
                    <Link 
                      href="/soc-2-cost-calculator"
                      className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                    >
                      Estimate Your Cost
                    </Link>
                  </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-xl font-bold text-white">Why {industry.label} needs SOC 2:</h3>
                    <ul className="space-y-4">
                      {[
                        'Accelerate enterprise sales cycles',
                        'Satisfy vendor risk assessments',
                        'Build trust with investors and partners',
                        'Verify security posture independently'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300">
                          <svg className="w-5 h-5 text-brand-500 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Grid */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your {industry.label} Compliance Roadmap</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Select a guide to dive deep into the specific requirements for your vertical.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Readiness Card */}
                  <div className="group p-8 bg-white border border-slate-200 rounded-[2rem] hover:border-brand-500 hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors">
                      <svg className="w-7 h-7 text-brand-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">Readiness Checklist</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      A line-by-line breakdown of the controls, policies, and evidence you need to pass a SOC 2 audit as a {industry.label} company.
                    </p>
                    <div className="mt-auto space-y-4">
                      <Link 
                        href={`/soc-2-readiness-checklist/${industry.slug}`}
                        className="flex items-center justify-between w-full px-4 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors"
                      >
                        <span>Explore Readiness Guide</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      <Link 
                        href={`/soc-2-readiness-checklist/${industry.slug}#checklist-form`}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors border border-slate-200"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download PDF Roadmap</span>
                      </Link>
                    </div>
                  </div>

                  {/* Cost Calculator Card */}
                  <div className="group p-8 bg-white border border-slate-200 rounded-[2rem] hover:border-brand-500 hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">
                      <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Cost & Timeline Tools</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      Calculate your expected audit fees, timeline, and total compliance budget for {industry.label}.
                    </p>
                      <div className="mt-auto space-y-3">
                        <Link 
                          href="/soc-2-cost-calculator"
                          className="flex items-center justify-between w-full px-4 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors"
                        >
                          <span>Estimate My SOC 2 Cost</span>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                          <Link 
                            href={industry.costHref}
                            className="flex items-center justify-between w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors border border-slate-200"
                          >
                            <span>Detailed Cost Breakdown</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                      </div>
                  </div>
            </div>
          </div>
        </section>

        <FAQSection title={`SOC 2 for ${industry.label} FAQs`} faqs={faqs} />

        {/* Secondary Navigation */}
        <section className="py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Explore other industries</h3>
                <p className="text-slate-600 mt-1">Compare SOC 2 requirements across different verticals.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {industryCostLinks.filter(i => i.slug !== params.slug).slice(0, 4).map((i) => (
                  <Link 
                    key={i.slug}
                    href={i.hubHref}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-600 transition-all"
                  >
                    {i.label}
                  </Link>
                ))}
                <Link 
                  href="/soc-2/industries"
                  className="px-4 py-2 text-brand-600 font-bold text-sm hover:underline"
                >
                  View All →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
