/**
 * RULES-BASED RECOMMENDATION LIBRARY
 * 
 * This file contains all predefined recommendations for RiscLens.
 * 
 * CRITICAL RULES:
 * - AI may NOT invent recommendations. All recommendations come from this library.
 * - AI may ONLY rewrite recommendation text for clarity.
 * - Each recommendation maps to SOC 2 Trust Service Criteria (TSC).
 * - Recommendations are triggered by explicit input conditions.
 */

// =============================================================================
// SOC 2 TRUST SERVICE CRITERIA REFERENCE
// =============================================================================

export const SOC2_CONTROL_CATEGORIES = {
  CC1: { id: 'CC1', name: 'Control Environment', description: 'Organization and management oversight' },
  CC2: { id: 'CC2', name: 'Communication and Information', description: 'Internal and external communications' },
  CC3: { id: 'CC3', name: 'Risk Assessment', description: 'Risk identification and management' },
  CC4: { id: 'CC4', name: 'Monitoring Activities', description: 'Ongoing evaluation of controls' },
  CC5: { id: 'CC5', name: 'Control Activities', description: 'Policies and procedures' },
  CC6: { id: 'CC6', name: 'Logical and Physical Access', description: 'Access control management' },
  CC7: { id: 'CC7', name: 'System Operations', description: 'System monitoring and incident response' },
  CC8: { id: 'CC8', name: 'Change Management', description: 'Change control processes' },
  CC9: { id: 'CC9', name: 'Risk Mitigation', description: 'Risk mitigation strategies' },
  A1: { id: 'A1', name: 'Availability', description: 'System availability commitments' },
  C1: { id: 'C1', name: 'Confidentiality', description: 'Confidential information protection' },
  PI1: { id: 'PI1', name: 'Processing Integrity', description: 'System processing completeness and accuracy' },
  P1: { id: 'P1', name: 'Privacy', description: 'Personal information handling' },
} as const;

// =============================================================================
// RECOMMENDATION LIBRARY
// Each recommendation has:
// - id: Unique identifier
// - category: SOC 2 control category
// - trigger: Rule that activates this recommendation
// - priority: high | medium | low
// - title: Short recommendation title
// - text: Full recommendation text (may be rewritten by AI for clarity)
// - rationale: Why this recommendation applies
// =============================================================================

export interface Recommendation {
  id: string;
  category: keyof typeof SOC2_CONTROL_CATEGORIES;
  trigger: RecommendationTrigger;
  priority: 'high' | 'medium' | 'low';
  title: string;
  text: string;
  rationale: string;
}

export interface RecommendationTrigger {
  type: 'audit_timeline' | 'data_type' | 'company_size' | 'industry' | 'requester' | 'readiness_band' | 'always';
  condition: TriggerCondition;
}

type TriggerCondition = 
  | { monthsUntilAudit: { max: number } }
  | { monthsUntilAudit: { min: number; max: number } }
  | { dataTypePresent: string }
  | { employeeCount: { max: number } }
  | { employeeCount: { min: number } }
  | { industry: string }
  | { requirer: string }
  | { readinessBand: string }
  | { always: true };

export const RECOMMENDATION_LIBRARY: Recommendation[] = [
  // ==========================================================================
  // AUDIT TIMELINE RECOMMENDATIONS
  // ==========================================================================
  {
    id: 'timeline-under-90-days',
    category: 'CC1',
    trigger: { type: 'audit_timeline', condition: { monthsUntilAudit: { max: 3 } } },
    priority: 'high',
    title: 'Engage readiness consultant immediately',
    text: 'Because your audit timeline is under 90 days: Consider engaging a SOC 2 readiness consultant immediately to accelerate control implementation and evidence collection.',
    rationale: 'Tight timelines require external acceleration support',
  },
  {
    id: 'timeline-3-6-months',
    category: 'CC5',
    trigger: { type: 'audit_timeline', condition: { monthsUntilAudit: { min: 3, max: 6 } } },
    priority: 'high',
    title: 'Prioritize control implementation',
    text: 'Because your audit is within 6 months: Prioritize control implementation and begin evidence collection now. Focus on high-priority controls first.',
    rationale: 'Limited time requires focused prioritization',
  },
  {
    id: 'timeline-6-12-months',
    category: 'CC3',
    trigger: { type: 'audit_timeline', condition: { monthsUntilAudit: { min: 6, max: 12 } } },
    priority: 'medium',
    title: 'Conduct gap assessment',
    text: 'Because you have 6–12 months until audit: Start with a comprehensive gap assessment to identify current compliance status and prioritize remediation.',
    rationale: 'Adequate time allows for methodical gap analysis',
  },
  {
    id: 'timeline-over-12-months',
    category: 'CC1',
    trigger: { type: 'audit_timeline', condition: { monthsUntilAudit: { min: 12, max: Infinity } } },
    priority: 'low',
    title: 'Build compliance foundation',
    text: 'With 12+ months until audit: Focus on building a strong compliance foundation. Establish policies, assign control ownership, and implement security basics.',
    rationale: 'Extended timeline allows for foundational work',
  },

  // ==========================================================================
  // DATA TYPE RECOMMENDATIONS
  // ==========================================================================
  {
    id: 'data-pii',
    category: 'C1',
    trigger: { type: 'data_type', condition: { dataTypePresent: 'pii' } },
    priority: 'high',
    title: 'Implement PII data classification',
    text: 'Because you handle PII: Implement comprehensive data classification and PII handling procedures. Document data flows and ensure encryption at rest and in transit.',
    rationale: 'PII requires explicit classification and protection controls',
  },
  {
    id: 'data-health',
    category: 'P1',
    trigger: { type: 'data_type', condition: { dataTypePresent: 'health' } },
    priority: 'high',
    title: 'Review HIPAA alignment',
    text: 'Because you handle health/PHI data: Review HIPAA requirements alongside SOC 2. Implement PHI-specific access controls and audit logging.',
    rationale: 'Health data requires HIPAA-aligned controls beyond SOC 2',
  },
  {
    id: 'data-financial',
    category: 'CC6',
    trigger: { type: 'data_type', condition: { dataTypePresent: 'financial' } },
    priority: 'high',
    title: 'Implement financial data controls',
    text: 'Because you handle financial data: Ensure robust encryption, access logging, and transaction monitoring mechanisms are in place.',
    rationale: 'Financial data requires enhanced access and audit controls',
  },
  {
    id: 'data-ip',
    category: 'CC6',
    trigger: { type: 'data_type', condition: { dataTypePresent: 'intellectual_property' } },
    priority: 'medium',
    title: 'Protect intellectual property',
    text: 'Because you handle intellectual property: Implement access restrictions, DLP controls, and code repository security.',
    rationale: 'IP requires access restrictions and monitoring',
  },
  {
    id: 'data-customer',
    category: 'C1',
    trigger: { type: 'data_type', condition: { dataTypePresent: 'customer_data' } },
    priority: 'medium',
    title: 'Secure customer data handling',
    text: 'Because you handle customer business data: Implement data segregation, access controls, and confidentiality agreements.',
    rationale: 'Customer data requires confidentiality protections',
  },

  // ==========================================================================
  // COMPANY SIZE RECOMMENDATIONS
  // ==========================================================================
  {
    id: 'size-small-team',
    category: 'CC4',
    trigger: { type: 'company_size', condition: { employeeCount: { max: 20 } } },
    priority: 'medium',
    title: 'Leverage automation for evidence collection',
    text: 'Because your team is under 20 people: Leverage automation tools to streamline evidence collection and reduce manual compliance burden.',
    rationale: 'Small teams benefit from compliance automation',
  },
  {
    id: 'size-medium-team',
    category: 'CC1',
    trigger: { type: 'company_size', condition: { employeeCount: { min: 21 } } },
    priority: 'medium',
    title: 'Assign control ownership',
    text: 'Because of your team size: Assign clear ownership for each SOC 2 control area across your team. Document roles and responsibilities.',
    rationale: 'Larger teams need clear control ownership',
  },

  // ==========================================================================
  // INDUSTRY RECOMMENDATIONS
  // ==========================================================================
  {
    id: 'industry-fintech',
    category: 'CC3',
    trigger: { type: 'industry', condition: { industry: 'fintech' } },
    priority: 'high',
    title: 'Address financial regulatory requirements',
    text: 'As a fintech company: Consider additional regulatory requirements beyond SOC 2. Review PCI DSS applicability and financial services regulations.',
    rationale: 'Fintech faces additional regulatory scrutiny',
  },
  {
    id: 'industry-healthcare',
    category: 'P1',
    trigger: { type: 'industry', condition: { industry: 'healthcare' } },
    priority: 'high',
    title: 'Align with healthcare regulations',
    text: 'As a healthcare company: Ensure SOC 2 controls align with HIPAA requirements. Consider pursuing HITRUST certification for comprehensive coverage.',
    rationale: 'Healthcare requires HIPAA alignment',
  },

  // ==========================================================================
  // REQUESTER-BASED RECOMMENDATIONS
  // ==========================================================================
  {
    id: 'requirer-enterprise',
    category: 'CC2',
    trigger: { type: 'requester', condition: { requirer: 'enterprise' } },
    priority: 'high',
    title: 'Prepare for enterprise security questionnaires',
    text: 'Because enterprise customers require SOC 2: Prepare for detailed security questionnaires. Document controls thoroughly for due diligence requests.',
    rationale: 'Enterprise customers conduct detailed security reviews',
  },
  {
    id: 'requirer-investors',
    category: 'CC1',
    trigger: { type: 'requester', condition: { requirer: 'investors' } },
    priority: 'medium',
    title: 'Document security posture for due diligence',
    text: 'Because investors require compliance evidence: Prepare a security posture summary for due diligence. Highlight existing controls and roadmap.',
    rationale: 'Investor due diligence includes security assessment',
  },

  // ==========================================================================
  // READINESS BAND RECOMMENDATIONS
  // ==========================================================================
  {
    id: 'band-pre-audit',
    category: 'CC5',
    trigger: { type: 'readiness_band', condition: { readinessBand: 'PRE_AUDIT' } },
    priority: 'high',
    title: 'Establish foundational security controls',
    text: 'At pre-audit stage: Focus on establishing foundational security controls. Start with access management, security policies, and basic monitoring.',
    rationale: 'Pre-audit requires foundational controls first',
  },
  {
    id: 'band-early-stage',
    category: 'CC3',
    trigger: { type: 'readiness_band', condition: { readinessBand: 'EARLY_STAGE' } },
    priority: 'medium',
    title: 'Address identified control gaps',
    text: 'At early-stage readiness: Focus on closing identified control gaps. Prioritize high-risk areas based on your data types and industry.',
    rationale: 'Early stage requires targeted gap closure',
  },

  // ==========================================================================
  // UNIVERSAL RECOMMENDATIONS (Always apply)
  // ==========================================================================
  {
    id: 'universal-policy-docs',
    category: 'CC5',
    trigger: { type: 'always', condition: { always: true } },
    priority: 'medium',
    title: 'Prioritize policy documentation',
    text: 'For all organizations: Prioritize policy documentation and access controls as foundational elements. These are required for any SOC 2 audit.',
    rationale: 'Policies and access controls are universal SOC 2 requirements',
  },
  {
    id: 'universal-evidence',
    category: 'CC4',
    trigger: { type: 'always', condition: { always: true } },
    priority: 'medium',
    title: 'Establish evidence collection process',
    text: 'For audit success: Establish a systematic evidence collection process early. Auditors require documented proof of control operation.',
    rationale: 'Evidence collection is essential for audit success',
  },
];

// =============================================================================
// RECOMMENDATION SELECTION ENGINE
// =============================================================================

export interface RecommendationInput {
  monthsUntilAudit: number;
  dataTypes: string[];
  employeeCount: number;
  industry: string;
  requirers: string[];
  readinessBand: string;
}

/**
 * Select applicable recommendations based on inputs.
 * This is a deterministic, rules-based selection.
 * 
 * @param input - Assessment inputs
 * @param maxRecommendations - Maximum recommendations to return (default 4)
 * @returns Array of applicable recommendations, sorted by priority
 */
export function selectRecommendations(
  input: RecommendationInput,
  maxRecommendations: number = 4
): Recommendation[] {
  const applicable: Recommendation[] = [];

  for (const rec of RECOMMENDATION_LIBRARY) {
    if (evaluateTrigger(rec.trigger, input)) {
      applicable.push(rec);
    }
  }

  // Sort by priority (high > medium > low)
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  applicable.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Return top N recommendations
  return applicable.slice(0, maxRecommendations);
}

/**
 * Evaluate if a trigger condition is met.
 * Pure function, fully deterministic.
 */
function evaluateTrigger(trigger: RecommendationTrigger, input: RecommendationInput): boolean {
  const { type, condition } = trigger;

  switch (type) {
    case 'audit_timeline': {
      const cond = condition as { monthsUntilAudit: { min?: number; max: number } };
      const min = cond.monthsUntilAudit.min ?? 0;
      const max = cond.monthsUntilAudit.max;
      return input.monthsUntilAudit >= min && input.monthsUntilAudit < max;
    }

    case 'data_type': {
      const cond = condition as { dataTypePresent: string };
      return input.dataTypes.includes(cond.dataTypePresent);
    }

    case 'company_size': {
      const cond = condition as { employeeCount: { min?: number; max?: number } };
      const min = cond.employeeCount.min ?? 0;
      const max = cond.employeeCount.max ?? Infinity;
      return input.employeeCount >= min && input.employeeCount <= max;
    }

    case 'industry': {
      const cond = condition as { industry: string };
      return input.industry === cond.industry;
    }

    case 'requester': {
      const cond = condition as { requirer: string };
      return input.requirers.includes(cond.requirer);
    }

    case 'readiness_band': {
      const cond = condition as { readinessBand: string };
      return input.readinessBand === cond.readinessBand;
    }

    case 'always': {
      return true;
    }

    default:
      return false;
  }
}

/**
 * Format recommendations with input-derived context.
 * Returns recommendation texts ready for display.
 */
export function formatRecommendationsForDisplay(recommendations: Recommendation[]): string[] {
  return recommendations.map(rec => rec.text);
}

/**
 * Get control category details for a recommendation.
 */
export function getControlCategory(categoryKey: keyof typeof SOC2_CONTROL_CATEGORIES) {
  return SOC2_CONTROL_CATEGORIES[categoryKey];
}
