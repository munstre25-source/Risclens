export interface FrameworkCostData {
  name: string;
  slug: string;
  description: string;
  overlap: string;
  savings: string;
  costBreakdown: string[];
  timelineImpact: string;
  faqs: { question: string; answer: string }[];
}

export const frameworks: FrameworkCostData[] = [
  {
    name: 'SOC 2 + ISO 27001',
    slug: 'soc2-plus-iso27001',
    description: 'The "Gold Standard" combination for global SaaS companies. By mapping controls once, you can achieve both certifications with significant efficiency.',
    overlap: 'Approximately 80% overlap in controls across access management, encryption, and change control.',
    savings: 'Achieve both for ~60% of the cost of doing them separately. Save $15k - $30k in total audit fees.',
    costBreakdown: [
      'Combined Auditor Fee: $35k - $65k (Phase 1 & 2 for ISO + SOC 2 Type II).',
      'Automation Tooling: $15k - $35k (multi-framework tier).',
      'Internal Effort: 150 - 250 hours (heaviest on ISO 27001 ISMS setup).',
    ],
    timelineImpact: 'Adds 4-8 weeks to the initial readiness phase to establish the ISMS framework required by ISO.',
    faqs: [
      {
        question: 'Should I do SOC 2 or ISO 27001 first?',
        answer: 'For US-centric sales, SOC 2 is usually first. For international or enterprise deals, ISO 27001 is often required. Doing them together is the most cost-effective path.',
      },
      {
        question: 'Can I reuse evidence?',
        answer: 'Yes, almost all evidence collected for SOC 2 (screenshots, logs, policies) can be reused for the ISO 27001 audit.',
      },
    ],
  },
  {
    name: 'SOC 2 + HIPAA',
    slug: 'soc2-plus-hipaa',
    description: 'Essential for healthtech startups. Adding HIPAA criteria to your SOC 2 audit provides a third-party validated report that satisfies healthcare procurement teams.',
    overlap: 'High overlap in security, availability, and confidentiality. HIPAA adds specific privacy and data handling requirements.',
    savings: 'Adding a HIPAA mapping to a SOC 2 audit typically costs only $3k - $7k extra, compared to a separate $15k HIPAA assessment.',
    costBreakdown: [
      'Incremental Auditor Fee: $3k - $8k on top of SOC 2 base.',
      'Software Add-on: $2k - $5k for HIPAA control monitoring.',
      'Internal Effort: 20 - 40 additional hours for privacy policy updates.',
    ],
    timelineImpact: 'Negligible impact on timeline if started simultaneously with SOC 2 readiness.',
    faqs: [
      {
        question: 'Is a SOC 2 HIPAA report a legal certification?',
        answer: 'There is no official "HIPAA certification" from the HHS, but a SOC 2 Type II with HIPAA mapping is the most widely accepted proof of compliance.',
      },
      {
        question: 'What are the additional controls?',
        answer: 'Additional focus on PHI (Protected Health Information) disposal, Business Associate Agreements (BAAs), and specific patient data access rights.',
      },
    ],
  },
];

export const frameworkBySlug = frameworks.reduce((acc, framework) => {
  acc[framework.slug] = framework;
  return acc;
}, {} as Record<string, FrameworkCostData>);
