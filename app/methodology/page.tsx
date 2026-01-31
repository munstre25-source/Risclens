import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQSection } from '@/components/FAQSection';
import { Metadata } from 'next';
import Link from 'next/link';
import { generateHubFAQs } from '@/lib/seo-enhancements';

export const metadata: Metadata = {
  title: 'Methodology & Assumptions | RiscLens',
  description: 'Learn how RiscLens calculates SOC 2 readiness, costs, and timelines.',
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Methodology & Assumptions</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            How we calculate readiness, costs, and timelines to help you plan your compliance journey.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-slate prose-lg max-w-none">
            <h2 id="purpose">1. Purpose of RiscLens Tools</h2>
            <p>
              RiscLens provides directional planning tools for B2B compliance buyers. Our goal is to reduce the "information asymmetry" between auditors and companies by providing data-driven estimates of readiness, cost, and timeline.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
              <h3 className="text-amber-900 mt-0">RiscLens is NOT:</h3>
              <ul className="text-amber-800 mb-0">
                <li>A CPA firm or licensed auditor.</li>
                <li>A guarantee of SOC 2 certification or "passing" an audit.</li>
                <li>A replacement for a formal readiness assessment.</li>
                <li>Legal advice.</li>
              </ul>
            </div>

            <h2 id="scoring">2. Scoring Methodology</h2>
            <p>
              Our Readiness Score (0-100) uses a <strong>risk-based weighting model</strong> mapped to the AICPA Trust Services Criteria (TSC):
            </p>
            <ul>
              <li><strong>Baseline Controls</strong>: Core security practices like MFA, encryption, and access reviews form the foundation of the score.</li>
              <li><strong>Risk Multipliers</strong>: Factors like handling PII, financial data, or ePHI increase the "bar" for readiness and decrease the baseline score until specific controls are confirmed.</li>
              <li><strong>Auditor Expectations</strong>: Weights are tuned based on practical audit experience and common TSC interpretations.</li>
            </ul>

            <h2 id="cost">3. Cost Estimation Logic</h2>
            <p>
              Cost estimates are calculated as a range based on three primary drivers:
            </p>
            <ul>
              <li><strong>Auditor Fees</strong>: Estimated based on company size, technical complexity, and required TSCs (typically $15k–$50k).</li>
              <li><strong>Tooling</strong>: Estimated costs for GRC and evidence automation platforms (typically $5k–$30k/year).</li>
              <li><strong>Internal Effort</strong>: An estimated "man-hour" cost based on the engineering and operational effort required to remediate identified gaps.</li>
            </ul>

            <h2 id="variability">4. Assumptions & Variability</h2>
            <p>
              Estimates are directional. Actual costs and timelines will vary based on:
            </p>
            <ul>
              <li><strong>Auditor Choice</strong>: Tier 1 firms (Big 4) vs. boutique regional firms have significantly different fee structures.</li>
              <li><strong>Scope Specifics</strong>: The number of cloud accounts, production systems, and employees in scope.</li>
              <li><strong>Remediation Speed</strong>: How quickly your team can implement required controls and collect evidence.</li>
            </ul>

            <h2 id="interpretation">5. Interpreting Results</h2>
            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              {[
                { band: '0–40: Pre-audit', desc: 'Focus on fundamental policies and technical baselines.' },
                { band: '41–70: Early-stage', desc: 'Implement repeatable controls and start evidence collection.' },
                { band: '71–85: Near-ready', desc: 'Fine-tune scope and perform a dry run.' },
                { band: '86–100: Audit-ready', desc: 'Formalize engagement with a CPA auditor.' },
              ].map((item) => (
                <div key={item.band} className="bg-white border border-slate-200 rounded-lg p-4">
                  <p className="font-bold text-slate-900 mb-1">{item.band}</p>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-600 mb-6 font-medium">Ready to see where you stand?</p>
            <Link 
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all text-lg"
            >
              Get Your Readiness Score
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        title="Methodology FAQs"
        faqs={generateHubFAQs('Methodology & Assumptions', 'RiscLens methodology and scoring')}
      />
      <Footer />
    </main>
  );
}
