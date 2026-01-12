export interface PciReadinessInputs {
  requirements: Record<string, boolean>;
  companyName: string;
  email: string;
  industry: string;
  transactionVolume: string; // 'level1', 'level2', 'level3', 'level4'
}

export interface PciReadinessResult {
  score: number;
  readinessBand: 'pre_audit' | 'early_stage' | 'near_ready' | 'audit_ready';
  gaps: string[];
  estimatedCostLow: number;
  estimatedCostHigh: number;
}

export function calculatePciReadiness(inputs: PciReadinessInputs): PciReadinessResult {
  const totalRequirements = 12;
  const metCount = Object.values(inputs.requirements).filter(Boolean).length;
  const score = Math.round((metCount / totalRequirements) * 100);

  let readinessBand: PciReadinessResult['readinessBand'] = 'pre_audit';
  if (score >= 90) readinessBand = 'audit_ready';
  else if (score >= 70) readinessBand = 'near_ready';
  else if (score >= 40) readinessBand = 'early_stage';

  const gaps: string[] = [];
  const requirementNames: Record<string, string> = {
    req1: 'Network Security Controls',
    req2: 'Secure Configurations',
    req3: 'Stored Data Protection',
    req4: 'Transmission Encryption',
    req5: 'Malware Protection',
    req6: 'Secure Systems & Software',
    req7: 'Access Restriction',
    req8: 'Identification & Authentication',
    req9: 'Physical Security',
    req10: 'Logging & Monitoring',
    req11: 'Security Testing (ASV/Pentest)',
    req12: 'Security Policies',
  };

  Object.entries(inputs.requirements).forEach(([id, met]) => {
    if (!met) {
      gaps.push(requirementNames[id] || id);
    }
  });

  // Basic cost estimation logic for PCI
  let baseLow = 15000;
  let baseHigh = 30000;

  if (inputs.transactionVolume === 'level1') {
    baseLow = 50000;
    baseHigh = 150000; // Level 1 requires QSA on-site audit
  } else if (inputs.transactionVolume === 'level2') {
    baseLow = 25000;
    baseHigh = 60000;
  }

  // Add ASV costs
  const asvCost = 5000;
  baseLow += asvCost;
  baseHigh += asvCost * 2;

  return {
    score,
    readinessBand,
    gaps,
    estimatedCostLow: baseLow,
    estimatedCostHigh: baseHigh,
  };
}
