import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { ReactNode } from 'react';

interface FAQ {
  question: string;
  answer: string | ReactNode;
  list?: string[];
}

interface KeyPriority {
  title: string;
  description: string;
}

interface RoleSOC2PageProps {
  roleName: string;
  roleSlug: string;
  heroDescription: string;
  keyPriorities: KeyPriority[];
  faqs: FAQ[];
  relatedLinks?: { label: string; href: string }[];
}

export default function RoleSOC2Page({
  roleName,
  roleSlug,
  heroDescription,
  keyPriorities,
  faqs,
  relatedLinks,
}: RoleSOC2PageProps) {
  const pageUrl = `https://risclens.com/soc-2/for/${roleSlug}`;
  const pageTitle = `SOC 2 Compliance for ${roleName}s | RiscLens`;
  const lastUpdated = "January 10, 2026";

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <GeneralPageSchema
        title={pageTitle}
        description={heroDescription}
        url={pageUrl}
        faqs={faqs.map(f => ({ question: f.question, answer: typeof f.answer === 'string' ? f.answer : 'Read more on page' }))}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'SOC 2', item: 'https://risclens.com/soc-2' },
          { name: `For ${roleName}s`, item: pageUrl },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-24 text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold mb-4 uppercase tracking-wider">
              Role-Specific Guide
            </div>
            <VerifiedBy authorId="raphael" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            <span className="block">SOC 2 Compliance</span>
            <span className="block text-brand-600 font-extrabold italic">for {roleName}s</span>
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            {heroDescription}
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/soc-2-cost-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Calculate Your SOC 2 Cost
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-sm text-slate-500">
              Free cost breakdown tailored to your team size and stack.
            </p>
          </div>

          {relatedLinks && relatedLinks.length > 0 && (
            <div className="mt-8 text-sm text-brand-700 flex flex-wrap gap-x-6 gap-y-2 justify-center">
              {relatedLinks.map((link, idx) => (
                <Link key={idx} href={link.href} className="underline underline-offset-4 hover:text-brand-800 font-medium">
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Priorities Section */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ExpertReview authorId="raphael" date={lastUpdated} />
          
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 mt-8">
            Key SOC 2 Priorities for {roleName}s
          </h2>
          <p className="text-slate-600 mb-10 text-lg">
            As a {roleName}, your focus on SOC 2 is unique. Here are the core areas where you can provide the most impact and where common pitfalls occur.
          </p>
          
          <div className="grid gap-6">
            {keyPriorities.map((priority, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 hover:border-brand-200 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {priority.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {priority.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AuthorBio authorId="raphael" />
        </div>
      </section>

      <AboutSection />

      {/* FAQs Section */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex gap-3">
                  <span className="text-brand-600">Q:</span>
                  {faq.question}
                </h3>
                <div className="text-slate-600 leading-relaxed pl-7 border-l-2 border-slate-100 ml-3">
                  {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                  {faq.list && (
                    <ul className="space-y-3 mt-4">
                      {faq.list.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-brand-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to start?</h3>
            <p className="text-slate-600 mb-8">
              Don't let SOC 2 compliance slow down your {roleName === 'Founder' ? 'growth' : 'team'}. Get the clarity you need today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/soc-2-cost-calculator"
                className="inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-lg shadow-md transition-all"
              >
                Cost Calculator
              </Link>
              <Link 
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-semibold px-8 py-4 rounded-lg shadow-sm transition-all"
              >
                Readiness Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA 
        label={`Download SOC 2 Guide for ${roleName}s`} 
        targetHref="/soc-2-readiness-checklist" 
      />
    </main>
  );
}
