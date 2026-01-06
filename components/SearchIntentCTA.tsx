import React from 'react';
import Link from 'next/link';

interface SearchIntentCTAProps {
  query: string;
}

interface CTAContent {
  headline: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  secondaryHref?: string;
}

export function SearchIntentCTA({ query }: SearchIntentCTAProps) {
  if (query.length < 3) return null;

  const q = query.toLowerCase();
  let content: CTAContent | null = null;

  if (q.includes('cost') || q.includes('pricing') || q.includes('budget') || q.includes('price')) {
    content = {
      headline: "Need a clear SOC 2 budget?",
      description: "Our comprehensive pricing guide breaks down auditor fees, automation tool costs, and hidden expenses.",
      buttonLabel: "View Cost Guide",
      buttonHref: "/soc-2-cost",
      secondaryHref: "/soc-2-readiness-calculator"
    };
  } else if (q.includes('pen test') || q.includes('pentest') || q.includes('penetration')) {
    content = {
      headline: "Scope your next penetration test",
      description: "Get a high-quality pentest report designed for SOC 2 and enterprise buyers. Start with a clear Statement of Work.",
      buttonLabel: "Define Scope (SOW)",
      buttonHref: "/penetration-testing/sow",
      secondaryHref: "/penetration-testing/cost-estimator"
    };
  } else if (q.includes('vendor') || q.includes('questionnaire') || q.includes('vrm') || q.includes('third party')) {
    content = {
      headline: "Master Vendor Risk Management",
      description: "Triage vendors effectively and score questionnaires with our expert-designed templates and guides.",
      buttonLabel: "Get Questionnaires",
      buttonHref: "/vendor-risk-assessment/questionnaire",
      secondaryHref: "/vendor-risk-assessment/roi-calculator"
    };
  } else if (
    q.includes('soc 2') || q.includes('readiness') || 
    q.includes('type 1') || q.includes('type i') || 
    q.includes('type 2') || q.includes('type ii')
  ) {
    content = {
      headline: "Navigate SOC 2 Controls & Evidence",
      description: "Explore our comprehensive library of trust service criteria, control mappings, and implementation examples.",
        buttonLabel: "Browse Readiness Assessment",
      buttonHref: "/soc-2-readiness-index",
      secondaryHref: "/soc-2-readiness-calculator"
    };
  }

  if (!content) return null;

  return (
    <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{content.headline}</h3>
        <p className="text-slate-600">{content.description}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <Link 
          href={content.buttonHref}
          className="bg-brand-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-700 transition-colors text-center shadow-sm"
        >
          {content.buttonLabel}
        </Link>
        {content.secondaryHref && (
          <Link 
            href={content.secondaryHref}
            className="text-slate-600 hover:text-brand-600 px-4 py-2.5 text-sm font-medium transition-colors text-center"
          >
            {content.secondaryHref.includes('calculator') ? 'Try Calculator' : 'Learn More'}
          </Link>
        )}
      </div>
    </div>
  );
}
