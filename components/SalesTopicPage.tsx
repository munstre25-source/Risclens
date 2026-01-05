'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import AssessmentCTA from '@/components/AssessmentCTA';
import { FAQSection } from '@/components/FAQSection';

interface FAQItem {
  question: string;
  answer: string;
}

interface SalesTopicPageProps {
  id: string;
  title: string;
  subtitle: string;
  category?: string;
  children: React.ReactNode;
  faqs?: FAQItem[];
  showAssessmentCTA?: boolean;
}

export function SalesTopicPage({
  id,
  title,
  subtitle,
  category = "SOC 2 Sales Hub",
  children,
  faqs,
  showAssessmentCTA = true
}: SalesTopicPageProps) {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">{category}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">{title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            {subtitle}
          </p>
          {showAssessmentCTA && (
            <div className="flex justify-center">
              <AssessmentCTA />
            </div>
          )}
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          {children}

          {faqs && faqs.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <FAQSection id={id} faqs={faqs} />
            </div>
          )}

          <div className="flex justify-between items-center pt-6 border-t border-slate-100">
            <Link href="/soc-2-sales" className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Sales Hub
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
