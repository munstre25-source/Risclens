import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Iso42001CalculatorForm from '@/components/calculators/Iso42001CalculatorForm';
import { SoftwareApplicationSchema } from '@/components/SoftwareApplicationSchema';
import { messaging } from '@/src/content/messaging';

export const metadata: Metadata = {
  title: 'ISO 42001 AI Readiness Score | RiscLens',
  description:
    'Get an instant ISO 42001 readiness score for your AI management system. Identify governance gaps and audit risks in under 2 minutes.',
  openGraph: {
    title: 'ISO 42001 AI Readiness Score | RiscLens',
    description:
      'Get an instant ISO 42001 readiness score for your AI management system. Identify governance gaps and audit risks in under 2 minutes.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens ISO 42001' }],
  },
  alternates: {
    canonical: 'https://risclens.com/iso-42001-calculator',
  },
};

function FormSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="h-12 bg-gray-300 rounded mt-6"></div>
    </div>
  );
}

export default function Iso42001Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <SoftwareApplicationSchema
          name="ISO 42001 AI Readiness Calculator"
          description="Get an instant ISO 42001 readiness score for your AI management system."
          url="https://risclens.com/iso-42001-calculator"
          category="SecurityApplication"
        />

        <section className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-2 mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              New: World's first AI Management Standard
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              {messaging.iso42001Calculator.hero.headline}
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {messaging.iso42001Calculator.hero.subhead}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div id="calculator" className="space-y-6">
              <Suspense fallback={<FormSkeleton />}>
                <Iso42001CalculatorForm />
              </Suspense>
              
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">AI Governance Review</h3>
                  <p className="text-sm text-slate-600">Get a sanity check on your AI risk framework from a technical auditor.</p>
                </div>
                <Link 
                  href="/readiness-review"
                  className="btn-primary whitespace-nowrap bg-blue-600 hover:bg-blue-700 border-blue-600"
                >
                  Schedule Review
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                What is ISO 42001?
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                ISO/IEC 42001 is the world's first international standard for AI Management Systems (AIMS). It provides a framework for organizations to develop, deploy, and use AI responsibly, focusing on:
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">AI Risk Management</h3>
                  <p className="text-sm text-slate-600">Systematically identifying and mitigating risks specific to AI models, including bias, hallucination, and security vulnerabilities.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Data Governance</h3>
                  <p className="text-sm text-slate-600">Ensuring the quality, security, and ethical use of data used for training and inference in AI systems.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Transparency & Explainability</h3>
                  <p className="text-sm text-slate-600">Documenting AI logic and providing disclosures so users and stakeholders understand how AI impacts outcomes.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Human Oversight</h3>
                  <p className="text-sm text-slate-600">Defining "Human-in-the-loop" requirements to prevent autonomous AI failures in high-stakes environments.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
