import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Index for Early-Stage Companies | RiscLens',
  description: 'Calculate your SOC 2 compliance costs and get a personalized readiness assessment. Free instant results with detailed PDF report.',
  keywords: ['SOC 2', 'compliance', 'cost calculator', 'audit', 'security', 'readiness', 'startup', 'saas'],
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="text-xl font-bold text-gray-900">
            RiscLens
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-brand-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            SOC 2 Readiness Index<br className="hidden sm:block" />
            <span className="text-brand-600">for Early-Stage Companies</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            See where you stand before the auditor does. Get your readiness score, cost estimate, and a clear path forward — in under 2 minutes.
          </p>
          <Link
            href="/soc-2-readiness-index"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Your Readiness Score
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Free • No credit card • Instant results
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How RiscLens Calculates Your SOC 2 Readiness
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
            <p>
              The RiscLens Readiness Index evaluates your organization across several key dimensions: 
              company size and team structure, types of data you handle (such as PII, financial, or health data), 
              your planned audit timeline, and current team maturity in security operations.
            </p>
            <p>
              Our scoring methodology is informed by common SOC 2 readiness frameworks and practical 
              experience from audit preparation engagements. The algorithm weighs factors that typically 
              correlate with compliance effort and cost, including data sensitivity, organizational 
              complexity, and timeline urgency.
            </p>
            <p>
              Results are designed to help engineering and security teams understand potential gaps 
              before engaging auditors or compliance vendors. The estimates provide a starting point 
              for internal planning — not a substitute for professional audit services.
            </p>
          </div>
        </div>
      </section>

      {/* About RiscLens Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            About RiscLens
          </h2>
          <p className="text-gray-600 leading-relaxed">
            RiscLens provides compliance readiness tools for early-stage and growing technology companies. 
            Our focus is on helping teams understand what SOC 2 preparation involves — including realistic 
            cost ranges and common gaps — so they can plan effectively before committing to an audit 
            timeline or vendor engagement.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400 text-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-300">RiscLens</p>
              <p className="text-xs text-gray-500">Compliance readiness infrastructure</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <a href="mailto:reports@risclens.com" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
              <strong className="text-gray-400">Disclaimer:</strong> RiscLens provides informational 
              estimates only. We do not provide legal advice, audit services, or SOC 2 certification. 
              All results are based on self-reported inputs and should be used for planning purposes only. 
              For formal compliance guidance, consult a qualified auditor or legal professional.
            </p>
          </div>

          <p className="mt-6 text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} RiscLens. Your data is encrypted and never shared without consent.
          </p>
        </div>
      </footer>
    </main>
  );
}
