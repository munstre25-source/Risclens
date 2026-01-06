import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReadinessNav from '@/components/ReadinessNav';
import AboutSection from '@/components/AboutSection';
import { ReactNode } from 'react';

interface FAQ {
  question: string;
  answer: string | ReactNode;
  list?: string[];
}

interface Challenge {
  title: string;
  description: string;
}

interface Scenario {
  title: string;
  description: string;
}

interface ReadinessIndustryPageProps {
  industryName: string;
  industrySlug: string;
  heroCtaText: string;
  whySoc2Scenarios: Scenario[];
  challenges: Challenge[];
  faqs: FAQ[];
  relatedLinks?: { label: string; href: string }[];
  crossLinkIndustry?: { name: string; href: string };
}

export default function ReadinessIndustryPage({
  industryName,
  industrySlug,
  heroCtaText,
  whySoc2Scenarios,
  challenges,
  faqs,
  relatedLinks,
  crossLinkIndustry,
}: ReadinessIndustryPageProps) {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-24 text-center">
            <ReadinessNav />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            <span className="block">SOC 2 Readiness Assessment</span>
            <span className="block text-brand-600">for {industryName}</span>
          </h1>
          <p className="text-base text-slate-700 max-w-2xl mx-auto mb-3 leading-relaxed">
            Get a SOC 2 readiness score + cost range in under 2 minutes.
          </p>
          <p className="text-base text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
            See what to fix first before you talk to an auditor.
          </p>
          <p className="text-sm text-slate-600 mb-4">
            This is not a certification, audit, or compliance software. It’s a readiness assessment.
          </p>
          <div className="max-w-3xl mx-auto text-left mb-6">
            <p className="text-sm font-medium text-slate-700 mb-2">What you’ll get</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
              <li>Readiness score (0–100) + band (Early-stage / Near-ready / Audit-ready)</li>
              <li>Estimated cost range (auditor + tooling + internal effort)</li>
              <li>Top next steps auditors expect (highest impact first)</li>
            </ul>
          </div>
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                {heroCtaText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-xs text-slate-400">
                No sales pitch — just clarity on what’s slowing your audit.
              </p>
            </div>
          <p className="mt-4 text-sm text-slate-500">
            Free • 2 minutes • Business email required
          </p>
          <p className="text-sm text-slate-600 mt-2">
            Deciding audit type? Read the{' '}
            <Link href="/soc-2-type-i-vs-type-ii" className="underline underline-offset-2 text-brand-700 hover:text-brand-800">
              SOC 2 Type I vs Type II guide
            </Link>
            .
          </p>
          {relatedLinks && relatedLinks.length > 0 && (
            <div className="mt-4 text-sm text-brand-700 flex flex-col sm:flex-row gap-2 justify-center">
              {relatedLinks.map((link, idx) => (
                <Link key={idx} href={link.href} className="underline underline-offset-4 hover:text-brand-800">
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          <div className="mt-6 bg-white/70 border border-slate-200 rounded-lg p-4 text-left max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-slate-800 mb-2">Trust &amp; privacy</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 leading-relaxed">
              <li>Why free? Built to help early-stage teams understand SOC 2 without sales pressure. No sales calls.</li>
              <li>No login required; business email required to see results.</li>
              <li>Reliability: Estimates are directional ranges based on common SOC 2 readiness patterns. Use as planning guidance, not audit advice.</li>
            </ul>
            <p className="text-sm text-slate-600 mt-3">
              About: Built by the RiscLens team (contact: reports@risclens.com). Independent SOC 2 readiness project. See <Link href="/terms" className="underline underline-offset-2 text-brand-700 hover:text-brand-800">Terms</Link> and <Link href="/privacy" className="underline underline-offset-2 text-brand-700 hover:text-brand-800">Privacy</Link>. No lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* Why SOC 2 Matters Section */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Why SOC 2 Matters for {industryName}
          </h2>
          
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              For {industryName}, SOC 2 compliance is often a prerequisite for enterprise sales and establishing trust in high-stakes environments.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Common scenarios where SOC 2 becomes essential:
              </h3>
              <ul className="space-y-3">
                {whySoc2Scenarios.map((scenario, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-brand-600 font-medium">•</span>
                    <span><strong>{scenario.title}</strong> — {scenario.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p>
              The earlier you understand your SOC 2 readiness posture, the more time you have to remediate gaps without derailing critical business opportunities.
            </p>
          </div>
        </div>
      </section>

      <AboutSection />

      {/* Challenges Section */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Common SOC 2 Readiness Challenges for {industrySlug.toUpperCase()}
          </h2>
          
          <div className="space-y-6">
            {challenges.map((challenge, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {idx + 1}. {challenge.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">
            SOC 2 FAQs for {industryName}
          </h2>
          
          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {faq.question}
                </h3>
                <div className="text-slate-600 leading-relaxed">
                  {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                  {faq.list && (
                    <ul className="space-y-2 mt-3">
                      {faq.list.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-brand-600 font-medium">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 pt-6 border-t border-slate-200">
            <p className="text-slate-600 mb-4">
              Ready to assess your {industryName}&apos;s SOC 2 readiness?
            </p>
            <Link 
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              Start your free assessment
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Cross-link */}
          {crossLinkIndustry && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                SOC 2 readiness for other industries:{" "}
                <Link 
                  href={crossLinkIndustry.href}
                  className="text-slate-600 hover:text-brand-600 transition-colors underline underline-offset-2"
                >
                  {crossLinkIndustry.name}
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
