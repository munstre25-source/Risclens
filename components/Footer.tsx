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
               {/* Could add social links here if available */}
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
                We do not provide legal advice, audit services, or formal SOC 2 certifications. All results are based on self-reported inputs 
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
