import { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | RiscLens',
  description: 'How RiscLens collects, uses, and protects data.',
  openGraph: {
    title: 'Privacy Policy | RiscLens',
    description: 'How RiscLens collects, uses, and protects data.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | RiscLens',
    description: 'How RiscLens collects, uses, and protects data.',
    images: ['/og.png'],
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Link
          href="/soc-2-readiness-calculator"
          className="text-brand-600 hover:text-brand-700 text-sm mb-8 inline-block"
        >
          ← Back to Calculator
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ownership</h2>
            <p className="text-gray-600">
              RiscLens is a platform owned and operated by its founders. 
              RiscLens holds all IP and rights associated with the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              When you use our SOC 2 Cost Calculator, we collect the following information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Company name and industry</li>
              <li>Company size (number of employees)</li>
              <li>Types of data you handle</li>
              <li>Planned audit timeline</li>
              <li>Your role in the organization</li>
              <li>Email address (when you request a PDF report)</li>
            </ul>
          </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use your information to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Calculate your SOC 2 readiness score and cost estimate</li>
                <li>Generate and deliver your personalized PDF report</li>
                <li>Connect you with vetted compliance partners and auditors (where applicable)</li>
                <li>Send relevant compliance resources and tips (with your consent)</li>
                <li>Improve our calculator and services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sharing Your Information</h2>
              <p className="text-gray-600 mb-4">
                By using our services and providing your contact information, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>We may share your lead data (including contact details and company profile) with vetted third-party compliance partners, auditors, and service providers who can assist you with your SOC 2 journey.</li>
                <li>These partners may contact you directly to provide quotes, assessments, or further information related to your request.</li>
                <li>We do not sell your data to generic data brokers or unrelated third parties.</li>
              </ul>
            </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Protection</h2>
            <p className="text-gray-600 mb-4">
              We take data protection seriously. Your data is:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Encrypted in transit and at rest</li>
              <li>Stored on secure, SOC 2 compliant infrastructure</li>
              <li>Never sold to third parties</li>
              <li>Accessible only to authorized personnel</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Unsubscribe from marketing communications at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-600">
              We use essential cookies to maintain your session and preferences. We do not use 
              tracking cookies for advertising purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              For privacy-related questions or requests, contact us at:{' '}
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

