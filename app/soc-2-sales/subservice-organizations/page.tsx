import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { salesGuides, salesGuideBySlug } from '@/lib/soc2Guides';

const slug = 'subservice-organizations';
const page = salesGuideBySlug[slug];

export const metadata: Metadata = {
  title: 'AWS vs. Your SOC 2: Understanding Subservice Organizations | RiscLens',
  description: 'Why AWS’s SOC 2 doesn’t count as yours and how to handle vendor dependencies in your audit.',
};

const faqs = [
  {
    question: "If AWS is SOC 2 compliant, why do I need my own audit?",
    answer: "AWS is responsible for the 'security OF the cloud' (data centers, physical security), but you are responsible for 'security IN the cloud' (access controls, code deployments, data encryption). Your SOC 2 proves you are doing your part."
  },
  {
    question: "What is the difference between Carve-out and Inclusive methods?",
    answer: "The 'Carve-out' method excludes the subservice organization's controls from your report (standard for AWS/GCP). The 'Inclusive' method includes their controls and requires them to sign a management assertion, which is rare for large cloud providers."
  },
  {
    question: "Do I need to review my vendors' SOC 2 reports?",
    answer: "Yes. Auditors expect you to perform an annual 'Vendor Risk Review' where you check their SOC 2 reports for exceptions and ensure their Complementary User Entity Controls (CUECs) are implemented by you."
  }
];

export default function SubserviceOrganizationsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <Script id="faq-subservice" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <Header />
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">Technical Nuance</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">AWS SOC 2 ≠ Your SOC 2</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Founders often think using AWS or GCP means they are "already compliant." Here is why you still need your own audit and how to handle the "Carve-out" method.
            </p>
            <div className="flex justify-center">
              <AssessmentCTA />
            </div>
          </div>
        </section>

        <section className="bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-3 text-lg">What AWS Covers</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex gap-2">✅ Physical Data Center Security</li>
                  <li className="flex gap-2">✅ Server Hardware Maintenance</li>
                  <li className="flex gap-2">✅ Infrastructure Network Isolation</li>
                  <li className="flex gap-2">✅ Environmental Controls (Power/Cooling)</li>
                </ul>
              </div>
              <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
                <h3 className="font-bold text-brand-900 mb-3 text-lg">What YOU Must Cover</h3>
                <ul className="space-y-2 text-sm text-brand-800">
                  <li className="flex gap-2">🚀 IAM & Access Control (Who logs in?)</li>
                  <li className="flex gap-2">🚀 SDLC & Code Security (Is your code safe?)</li>
                  <li className="flex gap-2">🚀 Database Encryption (Is data at rest safe?)</li>
                  <li className="flex gap-2">🚀 Incident Response (What if you get hacked?)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">The "Carve-out" Method Explained</h2>
              <p className="text-slate-700">
                In a SOC 2 audit, you "carve out" vendors like AWS. This means the auditor acknowledges AWS is responsible for certain controls, and they don't audit AWS themselves. Instead, they look for your **annual review** of AWS's SOC 2 report.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Action Plan for Founders</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-sm">
                    <span className="font-bold text-brand-600">01.</span>
                    <span>Download the AWS SOC 2 Type II report from AWS Artifact.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="font-bold text-brand-600">02.</span>
                    <span>Identify <strong>Complementary User Entity Controls (CUECs)</strong> in their report. These are tasks AWS requires *you* to do (e.g., managing your own passwords).</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="font-bold text-brand-600">03.</span>
                    <span>Document how your company meets each of those CUECs.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-5">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <p className="font-bold text-slate-900 mb-2">{faq.question}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              <Link href="/soc-2-sales" className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-2 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Sales Hub
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
