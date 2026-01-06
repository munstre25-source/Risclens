import React from 'react';
import Link from 'next/link';

export function DirectoryUsageGuide() {
  return (
    <section className="mt-20 border-t border-gray-200 pt-16 pb-12">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How to use this directory
        </h2>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          This directory summarizes publicly observable security disclosures to help with vendor risk reviews and procurement research. A higher score usually indicates clearer public transparency, but it does not confirm audit status or security posture.
        </p>
        <ul className="space-y-3 mb-12">
          {[
            "Use it to quickly find a vendor’s security page or trust center.",
            "Use it to understand what procurement teams commonly look for.",
            "Use it as a starting point before requesting evidence from the vendor."
          ].map((bullet, i) => (
            <li key={i} className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span className="text-gray-700">{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="h-px bg-gray-200 w-full mb-12" />

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Next steps for SOC 2 and vendor risk
        </h2>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          If you’re preparing for SOC 2 or reviewing vendors, these tools help you estimate impact and move faster.
        </p>

        <div className="space-y-8">
          <div>
            <Link 
              href="/soc-2-audit-delay-cost" 
              className="text-xl font-semibold text-blue-600 hover:underline block mb-2"
            >
              SOC 2 Audit Delay Cost Calculator
            </Link>
            <p className="text-gray-600">
              Estimate how audit delays may affect revenue and deal timelines.
            </p>
          </div>

          <div>
            <Link 
              href="/soc-2-readiness-calculator" 
              className="text-xl font-semibold text-blue-600 hover:underline block mb-2"
            >
              SOC 2 Readiness Calculator
            </Link>
            <p className="text-gray-600">
              Assess readiness across scope, controls, and evidence.
            </p>
          </div>

          <div>
            <Link 
              href="/vendor-risk-assessment/questionnaire" 
              className="text-xl font-semibold text-blue-600 hover:underline block mb-2"
            >
              Vendor Risk Assessment Questionnaire
            </Link>
            <p className="text-gray-600">
              Run a structured vendor risk review workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
