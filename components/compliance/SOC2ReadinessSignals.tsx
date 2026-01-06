import Link from 'next/link';

interface Props {
  companyName: string;
}

export function SOC2ReadinessSignals({ companyName }: Props) {
  const items = [
    {
      title: "SOC 2 Audit Delay Cost Calculator",
      href: "/soc-2-audit-delay-cost",
      description: `Estimate how SOC 2 delays for organizations like ${companyName} may be impacting revenue and enterprise deal timelines.`
    },
    {
      title: "SOC 2 Readiness Calculator",
      href: "/soc-2-readiness-calculator",
      description: `Assess how prepared your organization is for SOC 2 compared to the public profile of ${companyName}.`
    },
    {
      title: "Vendor Risk Assessment Questionnaire",
      href: "/vendor-risk-assessment/questionnaire",
      description: `See how security disclosures like those from ${companyName} are evaluated during vendor risk reviews.`
    }
  ];

  return (
    <section className="space-y-6 pt-12 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900">
        What this means for {companyName} SOC 2 readiness
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Public security disclosures for <strong>{companyName}</strong> are often reviewed during vendor risk and enterprise procurement processes. If you are preparing for SOC 2, the signals above typically influence timelines, deal velocity, and audit expectations.
      </p>
      <div className="grid grid-cols-1 gap-8">
        {items.map((item, index) => (
          <div key={index} className="space-y-1">
            <Link 
              href={item.href}
              className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {item.title}
            </Link>
            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
