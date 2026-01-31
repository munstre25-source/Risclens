/**
 * FAQ Section Component with Schema.org Markup
 * Clean, professional design following Vanta/Drata style
 */

import Script from 'next/script';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQ[];
  className?: string;
  showSchema?: boolean;
  id?: string;
}

function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function FAQSection({ 
  title = "Frequently Asked Questions",
  faqs,
  className = "",
  showSchema = true
}: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <>
      {showSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(faqs))
          }}
        />
      )}

      <section className={`py-16 lg:py-20 bg-white ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-12 text-center">{title}</h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Pre-built FAQ sets for common page types
 */
export const COMPARISON_FAQ_TEMPLATES = {
  getQuestions: (toolA: string, toolB: string, priceA?: string, priceB?: string): FAQ[] => [
    {
      question: `Which is better, ${toolA} or ${toolB}?`,
      answer: `Both ${toolA} and ${toolB} are strong compliance platforms. ${toolA} is typically better for fast-growing startups needing quick SOC 2, while ${toolB} excels at comprehensive compliance for larger teams. The best choice depends on your team size, compliance requirements, and budget.`
    },
    {
      question: `What's the price difference between ${toolA} and ${toolB}?`,
      answer: `${toolA} pricing starts at ${priceA || 'contact sales'}, while ${toolB} starts at ${priceB || 'contact sales'}. Both offer enterprise tiers with custom pricing. Actual costs depend on team size, integrations needed, and audit scope.`
    },
    {
      question: `Can I switch from ${toolA} to ${toolB}?`,
      answer: `Yes, migration between compliance platforms is common. Both ${toolA} and ${toolB} offer data import tools and migration assistance. Typical migrations take 2-4 weeks depending on your compliance scope and existing evidence.`
    },
    {
      question: `Which platform is faster for SOC 2 certification?`,
      answer: `Time to SOC 2 depends more on your organization's readiness than the platform. Both can help achieve SOC 2 Type I in 4-8 weeks for prepared organizations. Key factors include existing controls, team bandwidth, and auditor availability.`
    }
  ]
};

export const DIRECTORY_FAQ_TEMPLATES = {
  getQuestions: (companyName: string, hasSOC2?: boolean, hasTrustCenter?: boolean): FAQ[] => [
    {
      question: `Is ${companyName} SOC 2 compliant?`,
      answer: hasSOC2 
        ? `Based on public signals, ${companyName} appears to maintain SOC 2 compliance. For verification, request their SOC 2 Type II report directly or check their trust center.`
        : `Based on public signals, we could not confirm ${companyName}'s SOC 2 status. Contact them directly for compliance documentation and security questionnaires.`
    },
    {
      question: `Where is ${companyName}'s trust center?`,
      answer: hasTrustCenter
        ? `${companyName} maintains a public trust center with security documentation. Check the link in the profile above for their certifications, data protection policies, and compliance information.`
        : `We did not find a public trust center for ${companyName}. Contact their security team directly for compliance documentation and security reviews.`
    },
    {
      question: `What certifications does ${companyName} have?`,
      answer: `See our detailed security signals analysis above for ${companyName}'s public compliance posture. Common certifications in the SaaS industry include SOC 2 Type I/II, ISO 27001, HIPAA, and GDPR compliance.`
    },
    {
      question: `Is ${companyName} safe for enterprise data?`,
      answer: `Evaluate ${companyName}'s security using the signals above. Key factors: SOC 2 certification, data encryption, access controls, and incident response. Always request their security questionnaire for detailed assessment before onboarding.`
    }
  ]
};

export const PRICING_FAQ_TEMPLATES = {
  getQuestions: (toolName: string, startingPrice?: string): FAQ[] => [
    {
      question: `How much does ${toolName} cost?`,
      answer: `${toolName} pricing ${startingPrice ? `starts at approximately ${startingPrice}/year` : 'varies by company size and requirements'}. Pricing depends on team size, compliance scope, and features needed. See our tier breakdown above for detailed pricing ranges.`
    },
    {
      question: `Does ${toolName} offer a free trial?`,
      answer: `Most compliance platforms including ${toolName} offer demos rather than free trials due to the complexity of compliance software. Contact ${toolName} directly for a personalized demo and potential pilot programs.`
    },
    {
      question: `What are the hidden costs with ${toolName}?`,
      answer: `Beyond base subscription, consider: implementation fees ($3K-15K typical), additional user seats, premium integrations, audit support services, and annual price increases (5-10% typical). Our hidden costs section above details specific items to watch for.`
    },
    {
      question: `Can I negotiate ${toolName} pricing?`,
      answer: `Yes, compliance software pricing is often negotiable. Key leverage: multi-year commitments (15-25% savings), competitor quotes, end-of-quarter timing, and bundling services. See our negotiation tips above for specific strategies.`
    },
    {
      question: `Is ${toolName} worth the cost?`,
      answer: `ROI depends on your compliance needs. Typical value drivers: 60-80% reduction in audit prep time, faster sales cycles with enterprise customers, and avoided compliance penalties ($10K-1M+). Calculate your specific ROI based on team size and audit frequency.`
    }
  ]
};

export const ALTERNATIVES_FAQ_TEMPLATES = {
  getQuestions: (toolName: string, count: number = 10, topAlternatives?: string[]): FAQ[] => {
    const altList = topAlternatives?.slice(0, 3).join(', ') || 'various compliance platforms';
    
    return [
      {
        question: `What are the best ${toolName} alternatives?`,
        answer: `Top ${toolName} alternatives in 2026 include ${altList}. The best choice depends on your company size, budget, and specific compliance requirements. See our detailed comparison above.`
      },
      {
        question: `What is cheaper than ${toolName}?`,
        answer: `Several ${toolName} alternatives offer lower starting prices for smaller teams. Budget-friendly options typically start at $3,000-$8,000/year. See our pricing comparison to find options within your budget.`
      },
      {
        question: `Why switch from ${toolName}?`,
        answer: `Common reasons to explore ${toolName} alternatives: pricing concerns, missing features, integration limitations, or expanding compliance needs. Our comparison helps evaluate if switching makes sense for your situation.`
      },
      {
        question: `How do I choose between ${toolName} alternatives?`,
        answer: `Key factors: 1) Your compliance frameworks (SOC 2, ISO 27001, HIPAA), 2) Company size and budget, 3) Required integrations, 4) Implementation timeline, 5) Support quality. Use our comparison matrix above to evaluate these.`
      }
    ];
  }
};
