/**
 * ENTERPRISE-GRADE SOC 2 SCORING CONFIGURATION
 * 
 * This file contains all deterministic scoring rules for RiscLens.
 * 
 * IMPORTANT: All scoring logic is rules-based and inspectable.
 * AI is NOT allowed to modify scores, identify gaps, or invent recommendations.
 * AI may ONLY explain deterministic outputs in natural language.
 * 
 * Readiness Score = sum of weighted inputs, mapped to readiness bands
 * Cost Estimate = base + (employee factor) + (data complexity) × urgency multiplier
 */

// =============================================================================
// READINESS BANDS (0-100 scale)
// =============================================================================

export const READINESS_BANDS = {
  PRE_AUDIT: {
    min: 0,
    max: 30,
    label: 'Pre-audit',
    description: 'Early exploration stage. Significant preparation typically needed before audit engagement.',
    templateText: 'Your organization is in the pre-audit phase. This means foundational security controls, policies, and documentation are not yet in place. Focus on establishing baseline security practices before engaging an auditor.',
  },
  EARLY_STAGE: {
    min: 31,
    max: 60,
    label: 'Early-stage readiness',
    description: 'Initial readiness work has begun. Core gaps remain.',
    templateText: 'Your organization shows early-stage readiness. Some controls may be in place, but gaps exist in policy documentation, evidence collection, or control implementation. A gap assessment is recommended.',
  },
  NEAR_READY: {
    min: 61,
    max: 80,
    label: 'Near-ready',
    description: 'Good progress. Minor gaps to address before audit.',
    templateText: 'Your organization is near-ready for SOC 2 audit. Most controls are implemented, but some refinement or evidence collection may be needed. Consider a pre-audit readiness review.',
  },
  AUDIT_READY: {
    min: 81,
    max: 100,
    label: 'Audit-ready',
    description: 'Well-prepared. Ready to engage auditor.',
    templateText: 'Your organization appears audit-ready. Controls are in place, policies documented, and evidence collection processes established. Proceed with auditor selection and engagement.',
  },
} as const;

// =============================================================================
// SCORING WEIGHTS MATRIX
// Each input maps to explicit points. Total points → normalized to 0-100
// =============================================================================

export const SCORING_WEIGHTS = {
  // Company size: larger companies have more complexity
  companySize: {
    inputField: 'num_employees',
    weights: [
      { range: [1, 5], points: 4, label: '1-5 employees', rationale: 'Minimal org complexity' },
      { range: [6, 20], points: 8, label: '6-20 employees', rationale: 'Small team complexity' },
      { range: [21, 50], points: 12, label: '21-50 employees', rationale: 'Growing team complexity' },
      { range: [51, 100], points: 16, label: '51-100 employees', rationale: 'Medium org complexity' },
      { range: [101, Infinity], points: 20, label: '100+ employees', rationale: 'Large org complexity' },
    ],
    maxPoints: 20,
  },

  // Audit timeline urgency
  auditTimeline: {
    inputField: 'audit_date',
    weights: [
      { monthsRange: [0, 3], points: -5, label: 'Under 90 days', rationale: 'Urgent timeline without fundamentals increases risk' },
      { monthsRange: [3, 6], points: 5, label: '3-6 months', rationale: 'Tight timeline - focused effort needed' },
      { monthsRange: [6, 12], points: 12, label: '6-12 months', rationale: 'Reasonable timeline' },
      { monthsRange: [12, Infinity], points: 16, label: '12+ months', rationale: 'Ample preparation time' },
    ],
    maxPoints: 16,
  },

  // Data types handled (cumulative)
  dataTypes: {
    inputField: 'data_types',
    weights: [
      { value: 'pii', points: 10, label: 'PII', controlCategory: 'CC6.1', rationale: 'Personal data typically needs classification controls' },
      { value: 'financial', points: 10, label: 'Financial', controlCategory: 'CC6.1', rationale: 'Financial data typically needs encryption and access logging' },
      { value: 'health', points: 12, label: 'Health/PHI', controlCategory: 'CC6.1', rationale: 'PHI typically needs HIPAA-aligned controls' },
      { value: 'intellectual_property', points: 6, label: 'IP', controlCategory: 'CC6.7', rationale: 'IP typically needs access restrictions' },
      { value: 'customer_data', points: 6, label: 'Customer Data', controlCategory: 'CC6.1', rationale: 'Customer data typically needs confidentiality controls' },
    ],
    maxPoints: 44, // Sum of all possible
  },

  // SOC 2 requester type (optional, for routing)
  requesterType: {
    inputField: 'soc2_requirers',
    weights: [
      { value: 'enterprise', points: 6, label: 'Enterprise customers', urgencySignal: 'high', rationale: 'Enterprise deals often have compliance deadlines' },
      { value: 'midmarket', points: 4, label: 'Mid-market customers', urgencySignal: 'medium', rationale: 'Growing customer requirements' },
      { value: 'investors', points: 5, label: 'Investors', urgencySignal: 'high', rationale: 'Due diligence often requires compliance posture' },
      { value: 'exploratory', points: 0, label: 'Exploratory', urgencySignal: 'low', rationale: 'No external pressure yet' },
    ],
    maxPoints: 15, // Sum of top 3 (enterprise + midmarket + investors)
  },

  // Role seniority (decision-making authority)
  role: {
    inputField: 'role',
    weights: [
      { value: 'cto', points: 5, label: 'CTO/VP Engineering', rationale: 'Technical decision maker' },
      { value: 'ceo', points: 5, label: 'CEO/Founder', rationale: 'Executive decision maker' },
      { value: 'security', points: 5, label: 'Security/Compliance Lead', rationale: 'Direct compliance owner' },
      { value: 'engineering', points: 3, label: 'Engineering Manager', rationale: 'Technical influencer' },
      { value: 'operations', points: 3, label: 'Operations/IT', rationale: 'Operational stakeholder' },
      { value: 'other', points: 0, label: 'Other', rationale: 'Indirect stakeholder; unclear owner' },
    ],
    maxPoints: 5,
  },

  // Industry risk profile
  industry: {
    inputField: 'industry',
    weights: [
      { value: 'fintech', points: 10, label: 'Fintech', riskProfile: 'high', rationale: 'Regulated industry with stricter expectations' },
      { value: 'healthcare', points: 10, label: 'Healthcare', riskProfile: 'high', rationale: 'HIPAA and PHI considerations' },
      { value: 'saas', points: 4, label: 'SaaS', riskProfile: 'medium', rationale: 'Standard B2B compliance needs' },
      { value: 'ecommerce', points: 4, label: 'E-commerce', riskProfile: 'medium', rationale: 'PCI and customer data considerations' },
      { value: 'consulting', points: 2, label: 'Consulting', riskProfile: 'low', rationale: 'Client data handling varies' },
      { value: 'manufacturing', points: 2, label: 'Manufacturing', riskProfile: 'low', rationale: 'IP and operational data' },
      { value: 'other', points: 1, label: 'Other', riskProfile: 'low', rationale: 'Variable requirements' },
    ],
    maxPoints: 10,
  },
} as const;

// =============================================================================
// COST ESTIMATION PARAMETERS
// =============================================================================

export const COST_PARAMETERS = {
  // Base audit cost (auditor fees, platform licensing)
  baseCost: {
    low: 8000,
    high: 15000,
    description: 'Base auditor engagement and platform costs',
  },

  // Per-employee cost (documentation, training, access reviews)
  perEmployee: {
    low: 100,
    high: 250,
    description: 'Per-employee documentation and training effort',
  },

  // Per-data-type complexity (additional controls, policies)
  perDataType: {
    low: 2000,
    high: 5000,
    description: 'Data type-specific control implementation',
  },

  // Urgency multipliers (expedited work costs more)
  urgencyMultipliers: {
    under90Days: { multiplier: 1.4, label: 'Rush engagement (<90 days)' },
    under6Months: { multiplier: 1.2, label: 'Accelerated timeline (3-6 months)' },
    under12Months: { multiplier: 1.1, label: 'Standard timeline (6-12 months)' },
    over12Months: { multiplier: 1.0, label: 'Extended timeline (12+ months)' },
  },

  // Industry complexity adjustments
  industryMultipliers: {
    fintech: 1.3,
    healthcare: 1.3,
    saas: 1.0,
    ecommerce: 1.1,
    consulting: 0.9,
    manufacturing: 0.9,
    other: 1.0,
  },
} as const;

// =============================================================================
// SCORE CALCULATION BOUNDS
// =============================================================================

export const SCORE_BOUNDS = {
  // Maximum possible raw score (sum of all max weights)
  // Updated after weight tuning
  maxRawScore: 105,
  
  // Minimum possible raw score
  minRawScore: 0,

  // Normalization range
  normalizedMin: 0,
  normalizedMax: 100,
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ReadinessBand = keyof typeof READINESS_BANDS;

export interface ScoreExplanation {
  input: string;
  value: string | number | string[];
  points: number;
  maxPoints: number;
  rationale: string;
}

export interface DetailedScoringResult {
  rawScore: number;
  normalizedScore: number;
  readinessBand: ReadinessBand;
  bandLabel: string;
  bandDescription: string;
  bandTemplateText: string;
  breakdown: ScoreExplanation[];
  costEstimate: {
    low: number;
    high: number;
    explanation: string;
  };
  isFullyDeterministic: true; // Type assertion for audit trail
  calculatedAt: string;
}
