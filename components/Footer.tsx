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
              The compliance intelligence platform for modern engineering teams. Plan, budget, and execute your audit with confidence.
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

          {/* Tools Zone */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Calculators & Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/soc-2-readiness-index" className="hover:text-white transition-colors font-bold text-brand-400">Readiness Index →</Link></li>
                <li><Link href="/soc-2-cost-calculator" className="hover:text-white transition-colors">SOC 2 Cost Estimator</Link></li>
                <li><Link href="/soc-2-timeline/estimator" className="hover:text-white transition-colors">Audit Timeline Planner</Link></li>
                <li><Link href="/compliance-roi-calculator" className="hover:text-white transition-colors">Compliance ROI Model</Link></li>
                <li><Link href="/evidence-gap-analyzer" className="hover:text-white transition-colors">Evidence Gap Analyzer</Link></li>
                <li><Link href="/pci-dss-readiness-calculator" className="hover:text-white transition-colors">PCI-DSS Cost Tool</Link></li>
                <li><Link href="/ai-governance-readiness-index" className="hover:text-white transition-colors">AI Governance Index</Link></li>
              </ul>
            </div>

          {/* Intelligence Zone */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Intelligence Hub</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pricing" className="hover:text-white transition-colors">SaaS Pricing Hub</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Platform Comparisons</Link></li>
              <li><Link href="/compliance/matrix" className="hover:text-white transition-colors font-bold text-brand-400">Full Matrix Directory →</Link></li>
              <li><Link href="/compliance/directory" className="hover:text-white transition-colors">Security Signals Registry</Link></li>
              <li><Link href="/auditor-directory" className="hover:text-white transition-colors">Auditor Directory</Link></li>
              <li className="pt-2"><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Market Insights</p></li>
              <li><Link href="/soc-2-evidence/vault" className="hover:text-white transition-colors">Evidence Vault</Link></li>
              <li><Link href="/compliance/migrate" className="hover:text-white transition-colors">Migration Hub</Link></li>
            </ul>
          </div>

          {/* The Matrix Zone */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">The Matrix</h4>
            <ul className="space-y-2 text-sm">
              {industriesNav.slice(0, 6).map((industry) => (
                <li key={industry.href}>
                  <Link href={industry.href} className="hover:text-white transition-colors">
                    {industry.label} Compliance
                  </Link>
                </li>
              ))}
              <li><Link href="/soc-2/industries" className="hover:text-white transition-colors italic">View all 15,000+ nodes →</Link></li>
              <li className="pt-2"><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">By Architecture</p></li>
              <li><Link href="/soc-2/stack" className="hover:text-white transition-colors">Stack-Specific Guides</Link></li>
              <li><Link href="/intelligence-hub?tab=Roles" className="hover:text-white transition-colors">Role-Specific Paths</Link></li>
            </ul>
          </div>

          {/* Company Zone */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About RiscLens</Link></li>
              <li><Link href="/readiness-review" className="hover:text-white transition-colors font-semibold text-brand-400">Audit Readiness Review</Link></li>
              <li><Link href="/methodology" className="hover:text-white transition-colors">Data Methodology</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-white transition-colors">Editorial Policy</Link></li>
              <li><Link href="/auditor-portal" className="hover:text-white transition-colors">Auditor Partner Portal</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Crawl Discovery Section - Helps search engines find all pSEO pages */}
        <div className="border-t border-slate-800 mt-16 pt-8">
          <div className="mb-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Access: Frameworks × Industries</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { href: '/soc-2/readiness-checklist/fintech', label: 'SOC 2 Fintech' },
                { href: '/soc-2/readiness-checklist/healthcare', label: 'SOC 2 Healthcare' },
                { href: '/soc-2/readiness-checklist/saas', label: 'SOC 2 SaaS' },
                { href: '/iso-27001/certification-timeline/fintech', label: 'ISO 27001 Fintech' },
                { href: '/hipaa/compliance-checklist/healthcare', label: 'HIPAA Healthcare' },
                { href: '/pci-dss/certification-roadmap/ecommerce', label: 'PCI DSS E-commerce' },
                { href: '/ai-governance/risk-assessment/ai-data', label: 'AI Gov Risk' },
                { href: '/compare/vanta-vs-drata', label: 'Vanta vs Drata' },
                { href: '/compare/secureframe-alternatives', label: 'Secureframe Alternatives' },
                { href: '/pricing/vanta', label: 'Vanta Pricing' },
                { href: '/pricing/drata', label: 'Drata Pricing' },
                { href: '/auditor-directory/new-york', label: 'NYC Auditors' },
                { href: '/auditor-directory/san-francisco', label: 'SF Auditors' },
                { href: '/soc-2-vs-iso-27001/cost-comparison', label: 'SOC 2 vs ISO Cost' },
              ].map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/tools" className="px-2 py-1 bg-brand-600/20 hover:bg-brand-600/30 rounded text-brand-400 hover:text-brand-300 transition-colors font-semibold">
                View All 25,000+ Pages →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <p className="text-xs font-bold text-white uppercase tracking-widest">Regulatory Disclaimer</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                RiscLens provides compliance intelligence, informational estimates, and readiness tools. We are not a CPA firm, law firm, or accredited SOC 2 auditor. 
                We do not provide legal advice, audit services, or formal SOC 2 attestations. All results are based on market data and self-reported inputs 
                and should be used for internal planning and budgeting purposes only. For formal compliance guidance or a SOC 2 report, 
                always consult a qualified independent CPA auditor.
              </p>
            </div>
            <div className="flex flex-col justify-end lg:items-end space-y-2">
              <p className="text-xs text-slate-500">
                © {currentYear} RiscLens Intelligence. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
