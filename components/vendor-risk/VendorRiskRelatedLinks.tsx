import Link from 'next/link';

export function VendorRiskRelatedLinks() {
  const links = [
    { href: '/vendor-risk-assessment', label: 'VRA Hub' },
    { href: '/vendor-risk-assessment/triage', label: 'Run the VRA Triage' },
    { href: '/soc-2-readiness-calculator', label: 'SOC 2 Readiness Score' },
    { href: '/soc-2-cost', label: 'SOC 2 Cost Guide' },
  ];

  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-white">
      <h3 className="text-lg font-semibold text-slate-900 mb-3">Related</h3>
      <div className="flex flex-wrap gap-3 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-1.5 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
