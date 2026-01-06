import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PentestSOWBuilder } from '@/components/pentest/PentestSOWBuilder';

export const metadata: Metadata = {
  title: 'Penetration Testing SOW Template | RiscLens',
  description: 'Download a standardized Statement of Work (SOW) template for SOC 2 penetration testing. Lock in scope, deliverables, and rules of engagement.',
  alternates: { canonical: '/penetration-testing/sow' },
};

const sections = [
  { title: 'Scope Definition', items: ['In-scope assets (apps, APIs, cloud, network) with URLs/IP ranges.', 'Authentication flows and test accounts; MFA/SSO notes.', 'Data sensitivity, third-party dependencies, and change freeze windows.'] },
  { title: 'Methodology & ROE', items: ['Testing windows and expected noise levels.', 'Exploitation depth (read-only vs POC) and social engineering limits.', 'Rate limits, safe list configuration, and kill switch contacts.'] },
  { title: 'Deliverables', items: ['Executive summary + technical report with CVSS/likelihood.', 'Evidence for each finding (repro steps, screenshots, payloads).', 'Retest window and what evidence is required to close findings.'] },
  { title: 'Legal & Compliance', items: ['Data handling and retention (where reports live, how long).', 'Liability caps and breach notification triggers.', 'Right to share a sanitized report with customers.'] },
];

export default function PenTestSOWPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24 text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Interactive Tool
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Pentest SOW Builder
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Standardize your Statement of Work to ensure your test covers the right controls and provides the evidence auditors require.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900">What's in the template?</h2>
                  <p className="text-slate-600">
                    A professional SOW removes surprises. Our template covers the four critical pillars of a SOC 2-ready penetration test.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {sections.map((section) => (
                    <div key={section.title} className="border border-slate-200 rounded-xl p-5 bg-slate-50 shadow-sm space-y-3">
                      <h3 className="text-base font-bold text-slate-900">{section.title}</h3>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-brand-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-brand-50 border border-brand-100 rounded-xl space-y-3">
                  <h3 className="font-bold text-brand-900 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Auditor Tip
                  </h3>
                  <p className="text-sm text-brand-800 leading-relaxed">
                    Auditors check your SOW to verify that the "System Boundary" described in your SOC 2 report matches the targets actually tested. Misalignment here is a common cause of audit delays.
                  </p>
                </div>
              </div>

              <div id="builder" className="lg:sticky lg:top-8">
                <PentestSOWBuilder />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Why this tool works</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="text-brand-600 font-bold text-xl">01</div>
                <h3 className="font-bold text-slate-900">Zero Ambiguity</h3>
                <p className="text-sm text-slate-600">Clearly defines what is (and isn't) being tested to avoid scope creep.</p>
              </div>
              <div className="space-y-2">
                <div className="text-brand-600 font-bold text-xl">02</div>
                <h3 className="font-bold text-slate-900">Auditor Approved</h3>
                <p className="text-sm text-slate-600">Structured to provide the specific evidence trust service criteria require.</p>
              </div>
              <div className="space-y-2">
                <div className="text-brand-600 font-bold text-xl">03</div>
                <h3 className="font-bold text-slate-900">Fixed Results</h3>
                <p className="text-sm text-slate-600">Helps establish expectations for a retest window and clean reporting format.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
