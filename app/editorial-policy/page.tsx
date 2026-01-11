import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Scale, FileCheck, Users } from 'lucide-react';

export const metadata = {
  title: 'Editorial Policy | RiscLens',
  description: 'How we ensure the accuracy, independence, and integrity of our compliance market intelligence.',
};

export default function EditorialPolicy() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Editorial Policy
          </h1>
          <p className="text-xl text-slate-600">
            Our commitment to accuracy, independence, and integrity in compliance reporting.
          </p>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          <p className="lead">
            RiscLens was founded to bring transparency to the often-opaque world of SOC 2 and security compliance. To maintain our position as a trusted resource for early-stage companies, we adhere to strict editorial standards.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-6">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Independence</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We are not owned by, nor do we accept referral fees from, any compliance automation platform or audit firm. Our rankings and scores are determined by our deterministic logic and market research alone.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Review</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every market comparison, pricing guide, and checklist is reviewed by a professional with active credentials (CPA, CISA, CISSP, or CIPP) to ensure technical accuracy and regulatory relevance.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-6">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Data Integrity</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our pricing data and "starting from" estimates are sourced from primary market research, anonymized user reports, and publicly available information. We update these figures quarterly to reflect market shifts.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Transparency</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                If we use AI to assist in data gathering or drafting, the resulting content is always fact-checked and edited by a human subject-matter expert before publication.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Our Review Process</h2>
          <ol className="space-y-4">
            <li>
              <strong>Research:</strong> We analyze current AICPA Trust Service Criteria and market offerings from top compliance vendors.
            </li>
            <li>
              <strong>Logic Calibration:</strong> Our deterministic scoring models are calibrated against real-world audit outcomes.
            </li>
            <li>
              <strong>Fact-Checking:</strong> Every claim regarding a vendor's feature set or pricing is cross-referenced with documentation.
            </li>
            <li>
              <strong>Quarterly Updates:</strong> Our "Last Updated" dates reflect the most recent technical audit of the page content.
            </li>
          </ol>

          <div className="bg-brand-50 border border-brand-100 p-8 rounded-2xl mt-16">
            <h3 className="text-brand-900 font-bold mb-2">Notice an Error?</h3>
            <p className="text-brand-800 text-sm leading-relaxed">
              We strive for 100% accuracy, but the compliance landscape moves fast. If you believe any of our data is outdated or inaccurate, please contact our editorial team at <a href="mailto:reports@risclens.com" className="font-bold underline">reports@risclens.com</a>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
