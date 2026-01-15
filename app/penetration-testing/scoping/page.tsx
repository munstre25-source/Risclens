import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScopingWorksheet from '@/components/pentest/ScopingWorksheet';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Pentest Scoping Worksheet | RiscLens',
  description:
    'Define your penetration testing scope for Web Apps, APIs, Mobile, and Networks. Generate a professional scoping document for vendor quotes and SOC 2 audits.',
  alternates: { canonical: 'https://risclens.com/penetration-testing/scoping' },
};

export default function ScopingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Pentest', href: '/penetration-testing' },
                { label: 'Scoping Worksheet' }
              ]} 
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16 text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Pentest Scoping Worksheet
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Scope correctly before engaging vendors. Finalize your audit targets, complexity, and compliance goals to ensure a successful audit execution.
            </p>
          </div>
        </section>

        <section className="flex-grow py-12 px-4 sm:px-6">
          <ScopingWorksheet />
        </section>

        <section className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Why scope before execution?</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-brand-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Accurate Quotes:</strong> Vendors can't give fixed pricing without clear scope.</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-brand-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Audit Readiness:</strong> SOC 2 auditors require a documented "System Description" and scope.</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-brand-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Eliminate Bloat:</strong> Focus your budget on high-risk assets, not low-value subdomains.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4 text-slate-600">
              <h3 className="text-xl font-bold text-slate-900">What's included?</h3>
              <p>
                Your final summary includes target types, estimated dynamic pages/endpoints, auth complexity analysis, and compliance alignment. 
              </p>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 italic text-sm">
                "Defining scope early saved us 30% on our annual pentest by excluding legacy dev environments that didn't contain customer data."
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
