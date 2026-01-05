import { Metadata } from 'next';
import { PentestTopicPage } from '@/components/PentestTopicPage';
import { generateTopicMetadata } from '@/lib/seo';

export const metadata: Metadata = generateTopicMetadata(
  'Penetration Testing for Compliance Buyers',
  'How to scope pen tests for SOC 2/ISO/HIPAA buyers: evidence expectations, reporting format, and what security reviewers want.',
  '/penetration-testing/compliance-buyers',
  'Penetration Testing'
);

const needs = [
  { title: 'SOC 2 / ISO reviewers want', bullets: ['Clear scope: apps/APIs/cloud; include auth paths and third-party components.', 'Proof of remediation or retest for high/critical findings.', 'Report with CVSS/likelihood, business impact, and reproducible steps.'] },
  { title: 'Evidence to keep', bullets: ['Final report (sanitized if needed) and retest letter.', 'Tickets showing remediation and dates.', 'Screenshots/logs demonstrating the exploit is closed.'] },
  { title: 'Common blockers', bullets: ['Report missing repro steps or impact narrative.', 'No retest or unresolved critical findings.', 'Scope doesn’t match what security questionnaires ask about.'] },
];

export default function ComplianceBuyersPage() {
  return (
    <PentestTopicPage
      id="compliance-buyers"
      title="Pen Testing for Compliance Buyers"
      subtitle="Scope and deliverables that satisfy SOC 2 / ISO security reviewers without slowing deals."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {needs.map((item) => (
          <div key={item.title} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {item.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-brand-600">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Scope checklist</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2"><span className="text-brand-600">•</span><span>Apps/APIs with auth flows, multi-tenant boundaries, and rate limits.</span></li>
            <li className="flex gap-2"><span className="text-brand-600">•</span><span>Cloud config (IAM, networking, storage) for critical data paths.</span></li>
            <li className="flex gap-2"><span className="text-brand-600">•</span><span>3rd-party components that handle sensitive data (subprocessors).</span></li>
          </ul>
        </div>
        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Reporting expectations</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2"><span className="text-brand-600">•</span><span>Findings with repro, impact, likelihood, and business context.</span></li>
            <li className="flex gap-2"><span className="text-brand-600">•</span><span>Evidence of remediation or retest for critical/high issues.</span></li>
            <li className="flex gap-2"><span className="text-brand-600">•</span><span>Statement that scope and tests align to SOC 2/ISO expectations.</span></li>
          </ul>
        </div>
      </div>

      <div className="text-center space-y-3">
        <p className="text-slate-700 leading-relaxed italic">
          Compliance buyers want fit-for-purpose scope, clear reports, and proof you closed the gaps. Set that up at intake and retest.
        </p>
      </div>
    </PentestTopicPage>
  );
}
