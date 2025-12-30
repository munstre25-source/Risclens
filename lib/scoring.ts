/**
 * Lead Scoring Logic for SOC 2 Calculator
 * 
 * This module implements deterministic scoring rules for lead qualification
 * and readiness assessment. All scoring logic is centralized here for
 * easy tuning and consistent application across the application.
 */

export interface ScoringInput {
  num_employees: number;
  audit_date: string; // ISO date string
  data_types: string[]; // e.g., ['pii', 'financial', 'health']
  role: string;
}

export interface ScoringResult {
  lead_score: number; // 1-10 normalized
  raw_score: number; // Actual sum before normalization
  keep_or_sell: 'keep' | 'sell';
  readiness_score: number; // 0-100
  estimated_cost_low: number;
  estimated_cost_high: number;
  score_breakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
  company_size_points: number;
  audit_urgency_points: number;
  data_types_points: number;
  role_points: number;
}

// =============================================================================
// SCORING CONFIGURATION
// Adjust these values to tune the scoring algorithm
// =============================================================================

const SCORING_CONFIG = {
  // Company size thresholds and points
  companySize: {
    small: { max: 5, points: 3 },      // 1-5 employees
    medium: { max: 20, points: 6 },    // 6-20 employees
    large: { min: 21, points: 9 },     // >20 employees
  },

  // Audit urgency thresholds (months from today)
  auditUrgency: {
    urgent: { months: 6, points: 2 },   // <= 6 months
    soon: { months: 12, points: 1 },    // <= 12 months
    later: { points: 0 },               // > 12 months
  },

  // Data type points (1 point each if present)
  dataTypesWithPoints: ['pii', 'financial', 'health'],

  // High-value roles (case-insensitive match)
  highValueRoles: ['cto', 'ceo', 'founder', 'security'],
  rolePoints: 2,

  // Score normalization
  minNormalizedScore: 1,
  maxNormalizedScore: 10,

  // Keep/Sell threshold (leads with score >= this are kept)
  keepThreshold: 5,

  // Readiness score formula parameters
  readinessBase: 50,
  readinessMultiplier: 10, // (lead_score - 5) * multiplier

  // Cost estimation parameters (USD)
  costBase: {
    low: 8000,
    high: 15000,
  },
  costPerEmployee: {
    low: 100,
    high: 250,
  },
  costPerDataType: {
    low: 2000,
    high: 5000,
  },
  urgencyMultiplier: {
    urgent: 1.3,   // Rush jobs cost more
    soon: 1.1,
    later: 1.0,
  },
};

// =============================================================================
// SCORING FUNCTIONS
// =============================================================================

/**
 * Calculate company size points based on number of employees
 */
function calculateCompanySizePoints(numEmployees: number): number {
  const { companySize } = SCORING_CONFIG;
  
  if (numEmployees <= companySize.small.max) {
    return companySize.small.points;
  } else if (numEmployees <= companySize.medium.max) {
    return companySize.medium.points;
  } else {
    return companySize.large.points;
  }
}

/**
 * Calculate audit urgency points based on planned audit date
 */
function calculateAuditUrgencyPoints(auditDate: string): number {
  const { auditUrgency } = SCORING_CONFIG;
  
  const today = new Date();
  const audit = new Date(auditDate);
  const monthsUntilAudit = (audit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);

  if (monthsUntilAudit <= auditUrgency.urgent.months) {
    return auditUrgency.urgent.points;
  } else if (monthsUntilAudit <= auditUrgency.soon.months) {
    return auditUrgency.soon.points;
  } else {
    return auditUrgency.later.points;
  }
}

/**
 * Calculate data type points (+1 for each PII, Financial, Health present)
 */
function calculateDataTypesPoints(dataTypes: string[]): number {
  const { dataTypesWithPoints } = SCORING_CONFIG;
  
  return dataTypes.filter((dt) => 
    dataTypesWithPoints.includes(dt.toLowerCase())
  ).length;
}

/**
 * Calculate role points based on seniority/decision-making power
 */
function calculateRolePoints(role: string): number {
  const { highValueRoles, rolePoints } = SCORING_CONFIG;
  
  const roleLower = role.toLowerCase();
  const isHighValue = highValueRoles.some((hvr) => roleLower.includes(hvr));
  
  return isHighValue ? rolePoints : 0;
}

/**
 * Normalize raw score to 1-10 range
 */
function normalizeScore(rawScore: number): number {
  const { minNormalizedScore, maxNormalizedScore } = SCORING_CONFIG;
  
  // Max possible raw score: 9 (size) + 2 (urgency) + 3 (data) + 2 (role) = 16
  // Min possible raw score: 3 (size) + 0 (urgency) + 0 (data) + 0 (role) = 3
  const minRaw = 3;
  const maxRaw = 16;
  
  const normalized = minNormalizedScore + 
    ((rawScore - minRaw) / (maxRaw - minRaw)) * (maxNormalizedScore - minNormalizedScore);
  
  return Math.max(minNormalizedScore, Math.min(maxNormalizedScore, Math.round(normalized)));
}

/**
 * Calculate readiness score (0-100)
 * 
 * Formula: base + (lead_score - 5) * multiplier, clamped to 0-100
 * Tune readinessBase and readinessMultiplier in SCORING_CONFIG to adjust
 */
function calculateReadinessScore(leadScore: number): number {
  const { readinessBase, readinessMultiplier } = SCORING_CONFIG;
  
  const score = readinessBase + (leadScore - 5) * readinessMultiplier;
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Calculate estimated cost range based on inputs
 */
function calculateCostEstimate(
  numEmployees: number,
  dataTypes: string[],
  auditDate: string
): { low: number; high: number } {
  const { costBase, costPerEmployee, costPerDataType, urgencyMultiplier, auditUrgency } = SCORING_CONFIG;

  // Base cost
  let low = costBase.low;
  let high = costBase.high;

  // Add employee-based cost
  low += numEmployees * costPerEmployee.low;
  high += numEmployees * costPerEmployee.high;

  // Add data type complexity cost
  const dataTypeCount = dataTypes.length;
  low += dataTypeCount * costPerDataType.low;
  high += dataTypeCount * costPerDataType.high;

  // Apply urgency multiplier
  const today = new Date();
  const audit = new Date(auditDate);
  const monthsUntilAudit = (audit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);

  let multiplier = urgencyMultiplier.later;
  if (monthsUntilAudit <= auditUrgency.urgent.months) {
    multiplier = urgencyMultiplier.urgent;
  } else if (monthsUntilAudit <= auditUrgency.soon.months) {
    multiplier = urgencyMultiplier.soon;
  }

  low = Math.round(low * multiplier);
  high = Math.round(high * multiplier);

  return { low, high };
}

// =============================================================================
// MAIN SCORING FUNCTION
// =============================================================================

/**
 * Calculate lead score and all derived metrics
 * 
 * @param input - Scoring input data
 * @returns Complete scoring result with breakdown
 */
export function calculateLeadScore(input: ScoringInput): ScoringResult {
  // Calculate individual score components
  const companySizePoints = calculateCompanySizePoints(input.num_employees);
  const auditUrgencyPoints = calculateAuditUrgencyPoints(input.audit_date);
  const dataTypesPoints = calculateDataTypesPoints(input.data_types);
  const rolePoints = calculateRolePoints(input.role);

  // Calculate raw and normalized scores
  const rawScore = companySizePoints + auditUrgencyPoints + dataTypesPoints + rolePoints;
  const leadScore = normalizeScore(rawScore);

  // Determine keep or sell
  const keepOrSell = leadScore >= SCORING_CONFIG.keepThreshold ? 'keep' : 'sell';

  // Calculate readiness score
  const readinessScore = calculateReadinessScore(leadScore);

  // Calculate cost estimate
  const costEstimate = calculateCostEstimate(
    input.num_employees,
    input.data_types,
    input.audit_date
  );

  return {
    lead_score: leadScore,
    raw_score: rawScore,
    keep_or_sell: keepOrSell,
    readiness_score: readinessScore,
    estimated_cost_low: costEstimate.low,
    estimated_cost_high: costEstimate.high,
    score_breakdown: {
      company_size_points: companySizePoints,
      audit_urgency_points: auditUrgencyPoints,
      data_types_points: dataTypesPoints,
      role_points: rolePoints,
    },
  };
}

/**
 * Generate personalized recommendations based on scoring input
 */
export function generateRecommendations(input: ScoringInput, result: ScoringResult): string[] {
  const recommendations: string[] = [];

  // Urgency-based recommendations
  const today = new Date();
  const audit = new Date(input.audit_date);
  const monthsUntilAudit = (audit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);

  if (monthsUntilAudit <= 6) {
    recommendations.push(
      'Your audit timeline is tight. Consider engaging a SOC 2 readiness consultant immediately.'
    );
  } else if (monthsUntilAudit <= 12) {
    recommendations.push(
      'Start with a gap assessment to identify current compliance status.'
    );
  }

  // Data type recommendations
  if (input.data_types.includes('pii')) {
    recommendations.push(
      'Implement comprehensive data classification and PII handling procedures.'
    );
  }
  if (input.data_types.includes('health')) {
    recommendations.push(
      'Review HIPAA requirements alongside SOC 2 for healthcare data handling.'
    );
  }
  if (input.data_types.includes('financial')) {
    recommendations.push(
      'Ensure robust financial data encryption and access logging mechanisms.'
    );
  }

  // Size-based recommendations
  if (input.num_employees <= 20) {
    recommendations.push(
      'As a smaller team, leverage automation tools to streamline evidence collection.'
    );
  } else {
    recommendations.push(
      'Assign clear ownership for each SOC 2 control area across your team.'
    );
  }

  // General best practice
  recommendations.push(
    'Prioritize policy documentation and access controls as foundational elements.'
  );

  // Return top 4 recommendations
  return recommendations.slice(0, 4);
}

// Export configuration for potential admin tuning
export { SCORING_CONFIG };

