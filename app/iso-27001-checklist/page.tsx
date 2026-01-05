import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import ChecklistDownloadForm from '@/components/ChecklistDownloadForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';

export const metadata: Metadata = {
  title: 'ISO 27001 Readiness Checklist (2026) | RiscLens',
  description: 'A comprehensive ISO 27001 readiness checklist for startups. Map your ISMS requirements, Annex A controls, and evidence expectations.',
  openGraph: {
    title: 'ISO 27001 Readiness Checklist (2026) | RiscLens',
    description: 'A comprehensive ISO 27001 readiness checklist for startups. Map your ISMS requirements, Annex A controls, and evidence expectations.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
};

export default function IsoChecklistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumbs items={[{ label: 'Compliance', href: '/soc-2' }, { label: 'ISO 27001 Checklist', href: '/iso-27001-checklist' }]} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-14 text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
              ISO 27001 Readiness Checklist (2026)
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-4 leading-relaxed">
              Step-by-step guidance for building an Information Security Management System (ISMS) that meets ISO 27001:2022 standards.
            </p>
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Assess Your Readiness →
            </Link>
          </div>
        </section>

        <section id="download" className="py-12 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold">
                  New for ISO 27001:2022
                </div>
                <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                  Download the ISO 27001 PDF Checklist
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Map your Annex A controls and clause requirements with our downloadable toolkit.
                </p>
                <ul className="space-y-3">
                  {[
                    'ISMS Clause 4-10 Roadmap',
                    'Annex A Control mapping',
                    'Statement of Applicability (SoA) template',
                    'Internal audit prep guide'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-700">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ChecklistDownloadForm />
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">1. Management Clauses (The &quot;ISMS Shell&quot;)</h2>
              <p className="text-slate-700 leading-relaxed">
                ISO 27001 is not just about technical controls; it&apos;s about management commitment and continuous improvement.
              </p>
              <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1">
                <li>Defined Scope of the ISMS (Clause 4.3)</li>
                <li>Information Security Policy approved by leadership (Clause 5.2)</li>
                <li>Risk Assessment and Treatment methodology (Clause 6.1)</li>
                <li>Competence records and awareness training (Clause 7.2 & 7.3)</li>
                <li>Internal Audit program (Clause 9.2)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">2. Annex A Controls (The &quot;Technical Guardrails&quot;)</h2>
              <p className="text-slate-700 leading-relaxed">
                The 2022 update reorganized Annex A into 4 themes: Organizational, People, Physical, and Technological.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-bold text-slate-900">Organizational (A.5)</p>
                  <p className="text-slate-600 text-sm">Policies, inventory of assets, information security in vendor relationships.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-bold text-slate-900">People (A.6)</p>
                  <p className="text-slate-600 text-sm">Screening, terms and conditions of employment, disciplinary process.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-bold text-slate-900">Technological (A.8)</p>
                  <p className="text-slate-600 text-sm">Access control, cryptography, configuration management, data masking.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">ISO 27001 vs SOC 2: Which is right for you?</h2>
              <p className="text-slate-700 leading-relaxed">
                While SOC 2 is the standard for US-based SaaS companies, ISO 27001 is the global gold standard. Many startups find that achieving SOC 2 first provides a strong foundation for ISO 27001.
              </p>
              <Link href="/soc-2-vs-iso-27001" className="text-brand-600 font-bold hover:underline">
                Read our full comparison guide →
              </Link>
            </div>

            <RelatedGuidesRow
              links={[
                { href: '/soc-2-vs-iso-27001', label: 'SOC 2 vs ISO 27001' },
                { href: '/soc-2-readiness-checklist', label: 'SOC 2 Checklist' },
                { href: '/soc-2-cost', label: 'SOC 2 Cost' },
                { href: '/penetration-testing', label: 'Pentest Guide' },
              ]}
            />
          </div>
        </section>
      </main>
      <AssessmentCTA />
      <Footer />
    </>
  );
}
