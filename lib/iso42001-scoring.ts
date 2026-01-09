/**
 * DETERMINISTIC ISO 42001 (AIMS) SCORING ENGINE
 */

import {
  ISO42001_READINESS_BANDS,
  ISO42001_SCORING_WEIGHTS,
  ISO42001_COST_PARAMETERS,
  type ISO42001ReadinessBand,
} from './iso42001-scoring-config';

export interface ISO42001Input {
  modelComplexity: string;
  aiRiskProfile: string;
  governanceMaturity: string;
  companySize: number;
  dataPrivacy: string;
}

export interface ISO42001Result {
  readiness_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  lead_score: number;
  band: string;
  recommendations: string[];
}

export function calculateISO42001Score(input: ISO42001Input): ISO42001Result {
  let rawScore = 0;
  let maxPossible = 0;

  // 1. Model Complexity
  const modelWeight = ISO42001_SCORING_WEIGHTS.modelComplexity.weights.find(w => w.value === input.modelComplexity);
  rawScore += modelWeight?.points || 0;
  maxPossible += ISO42001_SCORING_WEIGHTS.modelComplexity.maxPoints;

  // 2. Risk Profile
  const riskWeight = ISO42001_SCORING_WEIGHTS.aiRiskProfile.weights.find(w => w.value === input.aiRiskProfile);
  rawScore += riskWeight?.points || 0;
  maxPossible += ISO42001_SCORING_WEIGHTS.aiRiskProfile.maxPoints;

  // 3. Governance
  const govWeight = ISO42001_SCORING_WEIGHTS.governanceMaturity.weights.find(w => w.value === input.governanceMaturity);
  rawScore += govWeight?.points || 0;
  maxPossible += ISO42001_SCORING_WEIGHTS.governanceMaturity.maxPoints;

  // 4. Company Size
  const sizeWeight = ISO42001_SCORING_WEIGHTS.companySize.weights.find(w => input.companySize >= w.range[0] && input.companySize <= w.range[1]);
  rawScore += sizeWeight?.points || 0;
  maxPossible += ISO42001_SCORING_WEIGHTS.companySize.maxPoints;

  // 5. Data Privacy
  const privacyWeight = ISO42001_SCORING_WEIGHTS.dataPrivacy.weights.find(w => w.value === input.dataPrivacy);
  rawScore += privacyWeight?.points || 0;
  maxPossible += ISO42001_SCORING_WEIGHTS.dataPrivacy.maxPoints;

  const readiness_score = Math.round((rawScore / maxPossible) * 100);

  // Cost Estimation
  let costLow = ISO42001_COST_PARAMETERS.baseCost.low;
  let costHigh = ISO42001_COST_PARAMETERS.baseCost.high;

  const compMult = (ISO42001_COST_PARAMETERS.complexityMultiplier as any)[input.modelComplexity] || 1.0;
  const riskMult = (ISO42001_COST_PARAMETERS.riskMultiplier as any)[input.aiRiskProfile] || 1.0;

  costLow = Math.round(costLow * compMult * riskMult);
  costHigh = Math.round(costHigh * compMult * riskMult);

  // Banding
  let band = 'EXPLORATORY';
  if (readiness_score > 85) band = 'ISO42001_READY';
  else if (readiness_score > 60) band = 'ADVANCED';
  else if (readiness_score > 30) band = 'DEVELOPING';

  // Recommendations
  const recommendations: string[] = [];
  if (input.governanceMaturity === 'none') recommendations.push('Draft an AI Acceptable Use Policy immediately.');
  if (input.aiRiskProfile === 'customer_facing') recommendations.push('Implement real-time hallucination monitoring for LLM outputs.');
  if (input.dataPrivacy === 'raw_pii') recommendations.push('Establish automated PII redaction for AI training pipelines.');
  if (readiness_score < 50) recommendations.push('Conduct a formal AI Inventory to identify all shadow-AI usage.');
  if (recommendations.length < 3) recommendations.push('Document your AI System Life Cycle (ASLC) to align with ISO 42001.');

  return {
    readiness_score,
    estimated_cost_low: costLow,
    estimated_cost_high: costHigh,
    lead_score: Math.round(readiness_score / 10),
    band,
    recommendations: recommendations.slice(0, 4)
  };
}
