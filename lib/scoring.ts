/**
 * ENTERPRISE-GRADE SOC 2 SCORING ENGINE
 * 
 * This module implements DETERMINISTIC scoring rules for SOC 2 readiness assessment.
 * 
 * CRITICAL RULES:
 * - All scoring is rules-based and inspectable.
 * - No LLM/AI reasoning for scores.
 * - No probabilistic or "confidence" logic.
 * - Every score can be explained as: Input → Weight → Adjustment → Final score
 * 
 * AI is ONLY allowed to:
 * - Explain scores in natural language
 * - Rewrite deterministic explanations for clarity
 * 
 * AI may NOT:
 * - Decide scores
 * - Identify compliance gaps
 * - Generate unbounded compliance advice
 */

import {
  READINESS_BANDS,
  SCORING_WEIGHTS,
    COST_PARAMETERS,
    SCORE_BOUNDS,
    CONVERSION_ADJUSTMENTS,
    type ReadinessBand,
    type ScoreExplanation,
    type DetailedScoringResult,
  } from './scoring-config';


import {
  selectRecommendations,
  formatRecommendationsForDisplay,
  type RecommendationInput,
} from './recommendations-library';

// =============================================================================
// INPUT INTERFACES
// =============================================================================

export interface ScoringInput {
  num_employees: number;
  audit_date: string; // ISO date string
  data_types: string[]; // e.g., ['pii', 'financial', 'health']
  role: string;
  industry?: string;
  soc2_requirers?: string[];
}

// Legacy interface for backward compatibility
export interface ScoringResult {
  lead_score: number;
  raw_score: number;
  keep_or_sell: 'keep' | 'sell';
  readiness_score: number;
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
// HELPER FUNCTIONS
// =============================================================================

/**
 * Calculate months until audit from date string.
 * Deterministic calculation.
 */
function calculateMonthsUntilAudit(auditDate: string): number {
  const today = new Date();
  const audit = new Date(auditDate);
  return (audit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
}

/**
 * Find weight for numeric range input.
 */
function findRangeWeight(
  weights: readonly { range: readonly [number, number]; points: number; label: string; rationale: string }[],
  value: number
): { points: number; label: string; rationale: string } {
  for (const w of weights) {
    if (value >= w.range[0] && value <= w.range[1]) {
      return { points: w.points, label: w.label, rationale: w.rationale };
    }
  }
  // Fallback to last weight
  const last = weights[weights.length - 1];
  return { points: last.points, label: last.label, rationale: last.rationale };
}

/**
 * Find weight for timeline (months) input.
 */
function findTimelineWeight(
  weights: readonly { monthsRange: readonly [number, number]; points: number; label: string; rationale: string }[],
  months: number
): { points: number; label: string; rationale: string } {
  for (const w of weights) {
    if (months >= w.monthsRange[0] && months < w.monthsRange[1]) {
      return { points: w.points, label: w.label, rationale: w.rationale };
    }
  }
  // Fallback to last weight
  const last = weights[weights.length - 1];
  return { points: last.points, label: last.label, rationale: last.rationale };
}

/**
 * Find weight for string value input.
 */
function findValueWeight(
  weights: readonly { value: string; points: number; label: string; rationale: string }[],
  value: string
): { points: number; label: string; rationale: string } | null {
  const match = weights.find(w => w.value === value.toLowerCase());
  return match ? { points: match.points, label: match.label, rationale: match.rationale } : null;
}

/**
 * Determine readiness band from normalized score.
 */
function determineReadinessBand(score: number): ReadinessBand {
  if (score <= READINESS_BANDS.PRE_AUDIT.max) return 'PRE_AUDIT';
  if (score <= READINESS_BANDS.EARLY_STAGE.max) return 'EARLY_STAGE';
  if (score <= READINESS_BANDS.NEAR_READY.max) return 'NEAR_READY';
  return 'AUDIT_READY';
}

/**
 * Normalize raw score to 0-100 scale.
 * Formula: ((raw - min) / (max - min)) * 100
 */
function normalizeToHundred(rawScore: number): number {
  const { minRawScore, maxRawScore } = SCORE_BOUNDS;
  const normalized = ((rawScore - minRawScore) / (maxRawScore - minRawScore)) * 100;
  return Math.max(0, Math.min(100, Math.round(normalized)));
}

// =============================================================================
// MAIN SCORING FUNCTION (ENTERPRISE-GRADE)
// =============================================================================

export interface ScoringConfig {
  scoring_weights?: any;
  cost_parameters?: any;
}

/**
 * Calculate detailed scoring result with full breakdown.
 * This is the primary enterprise-grade scoring function.
 * 
 * DETERMINISTIC: Same inputs always produce same outputs.
 * INSPECTABLE: Every point can be traced to explicit rules.
 */
export function calculateDetailedScore(input: ScoringInput, config?: ScoringConfig): DetailedScoringResult {
  const breakdown: ScoreExplanation[] = [];
  let rawScore = 0;
  const monthsUntilAudit = calculateMonthsUntilAudit(input.audit_date);

  // Use dynamic weights if provided, otherwise fallback to defaults
  const weights = config?.scoring_weights || SCORING_WEIGHTS;

  // 1. Company Size Score
  const sizeWeight = findRangeWeight(
    weights.companySize.weights,
    input.num_employees
  );
  rawScore += sizeWeight.points;
  breakdown.push({
    input: 'Company Size',
    value: input.num_employees,
    points: sizeWeight.points,
    maxPoints: weights.companySize.maxPoints,
    rationale: `${sizeWeight.label}: ${sizeWeight.rationale}`,
  });

  // 2. Audit Timeline Score
  const timelineWeight = findTimelineWeight(
    weights.auditTimeline.weights,
    monthsUntilAudit
  );
  rawScore += timelineWeight.points;
  breakdown.push({
    input: 'Audit Timeline',
    value: `${Math.round(monthsUntilAudit)} months`,
    points: timelineWeight.points,
    maxPoints: weights.auditTimeline.maxPoints,
    rationale: `${timelineWeight.label}: ${timelineWeight.rationale}`,
  });

  // 3. Data Types Score (cumulative)
  let dataTypePoints = 0;
  const matchedDataTypes: string[] = [];
  for (const dt of input.data_types) {
    const weight = weights.dataTypes.weights.find(
      (w: any) => w.value === dt.toLowerCase()
    );
    if (weight) {
      dataTypePoints += weight.points;
      matchedDataTypes.push(weight.label);
    }
  }
  rawScore += dataTypePoints;
  breakdown.push({
    input: 'Data Types',
    value: input.data_types,
    points: dataTypePoints,
    maxPoints: weights.dataTypes.maxPoints,
    rationale: matchedDataTypes.length > 0
      ? `Handling: ${matchedDataTypes.join(', ')}`
      : 'No sensitive data types selected',
  });

  // 4. Requester Type Score (optional, cumulative)
  let requesterPoints = 0;
  const matchedRequirers: string[] = [];
  if (input.soc2_requirers && input.soc2_requirers.length > 0) {
    for (const req of input.soc2_requirers) {
      const weight = weights.requesterType.weights.find(
        (w: any) => w.value === req.toLowerCase()
      );
      if (weight) {
        requesterPoints += weight.points;
        matchedRequirers.push(weight.label);
      }
    }
  }
  rawScore += requesterPoints;
  breakdown.push({
    input: 'SOC 2 Requesters',
    value: input.soc2_requirers || [],
    points: requesterPoints,
    maxPoints: weights.requesterType.maxPoints,
    rationale: matchedRequirers.length > 0
      ? `Required by: ${matchedRequirers.join(', ')}`
      : 'No external requirements specified',
  });

  // 5. Role Score
  const roleWeight = findValueWeight(weights.role.weights, input.role);
  const rolePoints = roleWeight?.points || 1;
  rawScore += rolePoints;
  breakdown.push({
    input: 'Role',
    value: input.role,
    points: rolePoints,
    maxPoints: weights.role.maxPoints,
    rationale: roleWeight?.rationale || 'Role not specified',
  });

  // 6. Industry Score
  const industry = input.industry || 'other';
  const industryWeight = findValueWeight(weights.industry.weights, industry);
  const industryPoints = industryWeight?.points || 2;
  rawScore += industryPoints;
  breakdown.push({
    input: 'Industry',
    value: industry,
    points: industryPoints,
    maxPoints: weights.industry.maxPoints,
    rationale: industryWeight?.rationale || 'Industry profile applied',
  });

  // Normalize to 0-100
  const normalizedScore = normalizeToHundred(rawScore);
  const readinessBand = determineReadinessBand(normalizedScore);
  const bandInfo = READINESS_BANDS[readinessBand];

  // Calculate cost estimate
  const costEstimate = calculateCostEstimateDetailed(input, monthsUntilAudit, config?.cost_parameters);

  return {
    rawScore,
    normalizedScore,
    readinessBand,
    bandLabel: bandInfo.label,
    bandDescription: bandInfo.description,
    bandTemplateText: bandInfo.templateText,
    breakdown,
    costEstimate,
    isFullyDeterministic: true,
    calculatedAt: new Date().toISOString(),
  };
}

/**
 * Calculate cost estimate with detailed explanation.
 */
function calculateCostEstimateDetailed(
  input: ScoringInput,
  monthsUntilAudit: number,
  params?: any
): { low: number; high: number; explanation: string } {
  const { baseCost, perEmployee, perDataType, urgencyMultipliers, industryMultipliers } = params || COST_PARAMETERS;

  // Base cost
  let low: number = baseCost.low;
  let high: number = baseCost.high;

  // Employee-based cost
  low += input.num_employees * perEmployee.low;
  high += input.num_employees * perEmployee.high;

  // Data type complexity
  const dataTypeCount = input.data_types.length;
  low += dataTypeCount * perDataType.low;
  high += dataTypeCount * perDataType.high;

  // Urgency multiplier
  let urgencyMult: number = urgencyMultipliers.over12Months.multiplier;
  let urgencyLabel: string = urgencyMultipliers.over12Months.label;
  if (monthsUntilAudit < 3) {
    urgencyMult = urgencyMultipliers.under90Days.multiplier;
    urgencyLabel = urgencyMultipliers.under90Days.label;
  } else if (monthsUntilAudit < 6) {
    urgencyMult = urgencyMultipliers.under6Months.multiplier;
    urgencyLabel = urgencyMultipliers.under6Months.label;
  } else if (monthsUntilAudit < 12) {
    urgencyMult = urgencyMultipliers.under12Months.multiplier;
    urgencyLabel = urgencyMultipliers.under12Months.label;
  }

  low = Math.round(low * urgencyMult);
  high = Math.round(high * urgencyMult);

  // Industry multiplier
  const industry = (input.industry || 'other') as keyof typeof industryMultipliers;
  const industryMult = industryMultipliers[industry] || 1.0;
  low = Math.round(low * industryMult);
  high = Math.round(high * industryMult);

  const explanation = `Base costs + ${input.num_employees} employees + ${dataTypeCount} data types × ${urgencyLabel} (${urgencyMult}x) × industry factor (${industryMult}x)`;

  return { low, high, explanation };
}

// =============================================================================
// LEGACY SCORING FUNCTION (BACKWARD COMPATIBILITY)
// =============================================================================

/**
 * Calculate lead score using legacy format.
 * Maintained for backward compatibility with existing API.
 */
export function calculateLeadScore(input: ScoringInput, config?: ScoringConfig): ScoringResult {
  const detailed = calculateDetailedScore(input, config);
  
  // Convert to legacy 1-10 scale
  let leadScore = Math.max(1, Math.min(10, Math.round(detailed.normalizedScore / 10)));
  
  // Apply Conversion Adjustments (Intelligence Feedback Loop)
  const industry = (input.industry || 'other') as keyof typeof CONVERSION_ADJUSTMENTS.industry;
  const industryMultiplier = CONVERSION_ADJUSTMENTS.industry[industry] || 1.0;
  
  if (industryMultiplier !== 1.0) {
    const oldScore = leadScore;
    leadScore = Math.max(1, Math.min(10, Math.round(leadScore * industryMultiplier)));
    if (oldScore !== leadScore) {
      console.log(`[SCORING] Adjusted lead score from ${oldScore} to ${leadScore} based on industry conversion data (${industry})`);
    }
  }
  
  // Calculate legacy breakdown
  const monthsUntilAudit = calculateMonthsUntilAudit(input.audit_date);
  const companySizePoints = detailed.breakdown.find(b => b.input === 'Company Size')?.points || 0;
  const auditUrgencyPoints = detailed.breakdown.find(b => b.input === 'Audit Timeline')?.points || 0;
  const dataTypesPoints = detailed.breakdown.find(b => b.input === 'Data Types')?.points || 0;
  const rolePoints = detailed.breakdown.find(b => b.input === 'Role')?.points || 0;

  return {
    lead_score: leadScore,
    raw_score: detailed.rawScore,
    keep_or_sell: leadScore >= 5 ? 'keep' : 'sell',
    readiness_score: detailed.normalizedScore,
    estimated_cost_low: detailed.costEstimate.low,
    estimated_cost_high: detailed.costEstimate.high,
    score_breakdown: {
      company_size_points: companySizePoints,
      audit_urgency_points: auditUrgencyPoints,
      data_types_points: dataTypesPoints,
      role_points: rolePoints,
    },
  };
}


// =============================================================================
// RECOMMENDATIONS FUNCTION
// =============================================================================

/**
 * Generate recommendations based on deterministic rules.
 * Uses the recommendation library - no AI-generated recommendations.
 */
export function generateRecommendations(input: ScoringInput, result: ScoringResult): string[] {
  const monthsUntilAudit = calculateMonthsUntilAudit(input.audit_date);
  const readinessBand = determineReadinessBand(result.readiness_score);

  const recInput: RecommendationInput = {
    monthsUntilAudit,
    dataTypes: input.data_types,
    employeeCount: input.num_employees,
    industry: input.industry || 'other',
    requirers: input.soc2_requirers || [],
    readinessBand,
  };

  const recommendations = selectRecommendations(recInput, 4);
  return formatRecommendationsForDisplay(recommendations);
}

// =============================================================================
// EXPORTS
// =============================================================================

// Re-export for convenience
export { READINESS_BANDS, SCORING_WEIGHTS, COST_PARAMETERS } from './scoring-config';
export { RECOMMENDATION_LIBRARY, SOC2_CONTROL_CATEGORIES } from './recommendations-library';
