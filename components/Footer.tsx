import Link from 'next/link';
import { navConfig, industriesNav } from '@/lib/navConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
            <div className="col-span-2 lg:col-span-1 space-y-6">
              <Link href="/" className="text-xl font-bold text-white tracking-tight">
                RiscLens
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Open-source compliance readiness infrastructure for early-stage companies. Plan, budget, and execute your SOC 2 with confidence.
              </p>
              <div className="flex gap-4">
                <a href="https://linkedin.com/company/risclens" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://twitter.com/risclens" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                </div>
              </div>


          {/* SOC 2 Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">SOC 2 Compliance</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/soc-2" className="hover:text-white transition-colors">SOC 2 Hub</Link></li>
              <li><Link href="/soc-2-readiness-calculator" className="hover:text-white transition-colors">Readiness Calculator</Link></li>
              <li><Link href="/soc-2-cost" className="hover:text-white transition-colors">SOC 2 Cost Guide</Link></li>
              <li><Link href="/soc-2-timeline" className="hover:text-white transition-colors">Timeline Estimator</Link></li>
              <li><Link href="/soc-2-readiness-checklist" className="hover:text-white transition-colors">Readiness Checklist</Link></li>
              <li><Link href="/soc-2-evidence/vault" className="hover:text-white transition-colors">Evidence Vault</Link></li>
              <li><Link href="/compliance-roi-calculator" className="hover:text-white transition-colors">Compliance ROI</Link></li>
            </ul>
          </div>

          {/* Pentest & Vendor Risk Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Security Testing</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/penetration-testing" className="hover:text-white transition-colors">Pentest Hub</Link></li>
              <li><Link href="/penetration-testing/cost-estimator" className="hover:text-white transition-colors">Pentest Cost Estimator</Link></li>
              <li><Link href="/penetration-testing/scoping" className="hover:text-white transition-colors">Scoping Worksheet</Link></li>
                <li className="pt-2 font-semibold text-slate-400">Vendor Risk</li>
                <li><Link href="/vendor-risk-assessment" className="hover:text-white transition-colors">Vendor Risk Hub</Link></li>
                <li><Link href="/vendor-risk-assessment/triage" className="hover:text-white transition-colors">VRA Triage Tool</Link></li>
                <li><Link href="/vendor-risk-assessment/tiering" className="hover:text-white transition-colors">Vendor Tiering Tool</Link></li>
                <li><Link href="/vendor-risk-assessment/questionnaire" className="hover:text-white transition-colors">VRA Questionnaire</Link></li>
                <li><Link href="/vendor-risk-assessment/roi-calculator" className="hover:text-white transition-colors">VRA ROI Calculator</Link></li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Industries</h4>
            <ul className="space-y-2 text-sm">
              {industriesNav.slice(0, 7).map((industry) => (
                <li key={industry.href}>
                  <Link href={industry.href} className="hover:text-white transition-colors">
                    {industry.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/soc-2/industries" className="hover:text-white transition-colors italic">View all industries →</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="hover:text-white transition-colors">About RiscLens</Link></li>
                  <li><Link href="/readiness-review" className="hover:text-white transition-colors font-semibold text-brand-400">Talk to a compliance expert</Link></li>
                  <li><Link href="/methodology" className="hover:text-white transition-colors">Methodology & Assumptions</Link></li>

                <li><Link href="/soc-2/guides" className="hover:text-white transition-colors">All Guides</Link></li>
                <li><Link href="/search" className="hover:text-white transition-colors">Search Library</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><a href="mailto:hello@risclens.com" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <p className="text-xs font-bold text-white uppercase tracking-widest">Disclaimer</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                RiscLens provides informational estimates and readiness tools only. We are not a CPA firm, law firm, or SOC 2 auditor. 
                We do not provide legal advice, audit services, or formal SOC 2 attestations. All results are based on self-reported inputs 
                and should be used for internal planning and budgeting purposes only. For formal compliance guidance or a SOC 2 report, 
                always consult a qualified independent auditor.
              </p>
            </div>
            <div className="flex flex-col justify-end lg:items-end space-y-2">
              <p className="text-xs text-slate-500">
                © {currentYear} RiscLens. Built for the security community.
              </p>
              <p className="text-[10px] text-slate-600 uppercase tracking-tight">
                Data is encrypted at rest and never sold to third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
