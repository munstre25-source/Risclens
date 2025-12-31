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
      <section className="flex-1 flex items-center bg-gradient-to-br from-gray-50 via-white to-brand-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 lg:py-32 text-center">
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
          <p className="mt-6 text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} RiscLens. Your data is encrypted and never shared without consent.
          </p>
        </div>
      </footer>
    </main>
  );
}
