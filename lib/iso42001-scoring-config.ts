/**
 * DETERMINISTIC ISO 42001 (AI MANAGEMENT SYSTEM) SCORING CONFIGURATION
 */

export const ISO42001_READINESS_BANDS = {
  EXPLORATORY: {
    min: 0,
    max: 30,
    label: 'AI Governance Exploratory',
    description: 'Initial stages of AI governance. Foundational policies needed.',
    templateText: 'Your AI governance posture is in the early exploratory phase. Focus on defining AI acceptable use policies and identifying your AI inventory.',
  },
  DEVELOPING: {
    min: 31,
    max: 60,
    label: 'Governance Developing',
    description: 'Core AI risk management processes are being established.',
    templateText: 'You have begun developing an AI Management System. Gaps remain in impact assessments and monitoring for bias or hallucinations.',
  },
  ADVANCED: {
    min: 61,
    max: 85,
    label: 'Advanced AI Readiness',
    description: 'Strong alignment with ISO 42001 requirements.',
    templateText: 'Your organization is advanced in AI readiness. Most impact assessments are automated and governance is integrated into the SDLC.',
  },
  ISO42001_READY: {
    min: 86,
    max: 100,
    label: 'ISO 42001 Audit Ready',
    description: 'Ready for certification audit.',
    templateText: 'You appear ready for ISO 42001 certification. All AI system life cycle controls and impact assessments are documented.',
  },
} as const;

export const ISO42001_SCORING_WEIGHTS = {
  modelComplexity: {
    weights: [
      { value: 'api_only', points: 15, label: 'Standard API usage (e.g. GPT-4)', rationale: 'Lower complexity, inherited safety' },
      { value: 'fine_tuned', points: 10, label: 'Fine-tuned / RAG', rationale: 'Increased data governance complexity' },
      { value: 'custom_trained', points: 5, label: 'Custom trained models', rationale: 'High complexity; full lifecycle responsibility' },
    ],
    maxPoints: 15,
  },
  aiRiskProfile: {
    weights: [
      { value: 'internal', points: 15, label: 'Internal productivity only', rationale: 'Lower risk to external subjects' },
      { value: 'customer_facing', points: 8, label: 'Customer-facing AI', rationale: 'Higher requirement for bias/hallucination monitoring' },
      { value: 'high_stakes', points: 2, label: 'High-stakes (Medical/Finance/Legal)', rationale: 'Extreme regulatory and safety requirements' },
    ],
    maxPoints: 15,
  },
  governanceMaturity: {
    weights: [
      { value: 'none', points: 0, label: 'No formal policy', rationale: 'Foundational gap' },
      { value: 'policy_only', points: 10, label: 'Acceptable Use Policy in place', rationale: 'Core governance established' },
      { value: 'full_aims', points: 25, label: 'Integrated AIMS (AI Management System)', rationale: 'Advanced alignment with ISO 42001' },
    ],
    maxPoints: 25,
  },
  companySize: {
    weights: [
      { range: [1, 10], points: 15, label: 'Small Team', rationale: 'Lower coordination overhead' },
      { range: [11, 50], points: 10, label: 'Mid-size Team', rationale: 'Moderate governance complexity' },
      { range: [51, Infinity], points: 5, label: 'Large Enterprise', rationale: 'High departmental complexity' },
    ],
    maxPoints: 15,
  },
  dataPrivacy: {
    weights: [
      { value: 'synthetic', points: 15, label: 'Synthetic/Public data only', rationale: 'Lower privacy risk' },
      { value: 'anonymized', points: 10, label: 'Anonymized customer data', rationale: 'Standard privacy controls needed' },
      { value: 'raw_pii', points: 2, label: 'Raw PII / Sensitive data', rationale: 'High requirement for data protection in AI' },
    ],
    maxPoints: 15,
  }
} as const;

export const ISO42001_COST_PARAMETERS = {
  baseCost: { low: 12000, high: 22000 },
  complexityMultiplier: {
    api_only: 1.0,
    fine_tuned: 1.3,
    custom_trained: 1.8
  },
  riskMultiplier: {
    internal: 1.0,
    customer_facing: 1.2,
    high_stakes: 1.6
  }
};

export type ISO42001ReadinessBand = keyof typeof ISO42001_READINESS_BANDS;
