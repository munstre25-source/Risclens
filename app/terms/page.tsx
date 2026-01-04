import { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | RiscLens',
  description: 'Terms for using RiscLens and the SOC 2 readiness tools.',
  openGraph: {
    title: 'Terms of Service | RiscLens',
    description: 'Terms for using RiscLens and the SOC 2 readiness tools.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | RiscLens',
    description: 'Terms for using RiscLens and the SOC 2 readiness tools.',
    images: ['/og.png'],
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Link
          href="/soc-2-readiness-calculator"
          className="text-brand-600 hover:text-brand-700 text-sm mb-8 inline-block"
        >
          ← Back to Calculator
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using the RiscLens SOC 2 Cost Calculator, you agree to be bound by 
              these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-600 mb-4">
              RiscLens provides a free SOC 2 Cost Calculator that offers:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Readiness score assessments based on your inputs</li>
              <li>Estimated cost ranges for SOC 2 compliance</li>
              <li>Personalized PDF reports with recommendations</li>
              <li>Educational content about SOC 2 compliance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The estimates and recommendations provided by our calculator are for informational 
              purposes only and should not be considered as:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Professional audit or compliance advice</li>
              <li>Guaranteed cost predictions</li>
              <li>Legal or regulatory guidance</li>
              <li>A substitute for professional consultation</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Actual costs and timelines may vary based on your specific circumstances, auditor 
              requirements, and organizational complexity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Responsibilities</h2>
            <p className="text-gray-600 mb-4">When using our service, you agree to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Provide accurate information to receive meaningful results</li>
              <li>Use the service for lawful purposes only</li>
              <li>Not attempt to reverse engineer or exploit the service</li>
              <li>Not submit false or misleading information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-600">
              All content, branding, and materials on this site are the property of RiscLens. 
              You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              RiscLens shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use of or inability to use the service. 
              Our total liability shall not exceed the amount you paid for the service (if any).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Continued use of the 
              service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-600">
              For questions about these terms, contact us at:{' '}
              <a href="mailto:reports@risclens.com" className="text-brand-600 hover:text-brand-700">
                reports@risclens.com
              </a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

