export interface TieringInputs {
  dataAccess: 'none' | 'pii' | 'phi' | 'financial' | 'critical';
  serviceCriticality: 'low' | 'medium' | 'high';
  hostingModel: 'saas' | 'on-prem' | 'hybrid';
}

export type VendorTier = 'Tier 1 (Critical)' | 'Tier 2 (High)' | 'Tier 3 (Medium)' | 'Tier 4 (Low)';

export interface TieringResult {
  tier: VendorTier;
  riskScore: number;
  requirements: string[];
  monitoringCadence: string;
}

export function calculateVendorTier(inputs: TieringInputs): TieringResult {
  let score = 0;

  // Data Access Weighting
  const dataScores = {
    none: 0,
    pii: 3,
    phi: 5,
    financial: 4,
    critical: 5,
  };
  score += dataScores[inputs.dataAccess];

  // Criticality Weighting
  const criticalityScores = {
    low: 1,
    medium: 3,
    high: 5,
  };
  score += criticalityScores[inputs.serviceCriticality];

  let tier: VendorTier;
  let requirements: string[] = [];
  let monitoringCadence: string;

  if (score >= 8) {
    tier = 'Tier 1 (Critical)';
    requirements = ['SOC 2 Type II (Annual)', 'ISO 27001 Certificate', 'Penetration Test Report', 'BCP/DR Test Results'];
    monitoringCadence = 'Quarterly Review';
  } else if (score >= 6) {
    tier = 'Tier 2 (High)';
    requirements = ['SOC 2 Type I or II', 'Security Questionnaire (Full)', 'Privacy Policy Review'];
    monitoringCadence = 'Annual Review';
  } else if (score >= 4) {
    tier = 'Tier 3 (Medium)';
    requirements = ['Security Questionnaire (Lite)', 'Terms of Service Review'];
    monitoringCadence = 'Biennial Review';
  } else {
    tier = 'Tier 4 (Low)';
    requirements = ['Basic Security Profile', 'Self-Attestation'];
    monitoringCadence = 'As needed';
  }

  return {
    tier,
    riskScore: score,
    requirements,
    monitoringCadence,
  };
}
