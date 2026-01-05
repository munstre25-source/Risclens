export interface GapInputs {
  currentFramework: 'soc2' | 'iso27001' | 'none';
  targetFramework: 'soc2' | 'iso27001';
  companySize: 'small' | 'medium' | 'large';
}

export interface GapArea {
  name: string;
  status: 'covered' | 'partial' | 'missing';
  effort: 'low' | 'medium' | 'high';
  description: string;
}

export interface GapResult {
  readinessPercentage: number;
  estimatedEffortMonths: number;
  gapAreas: GapArea[];
}

export function calculateGap(inputs: GapInputs): GapResult {
  if (inputs.currentFramework === 'none') {
    return {
      readinessPercentage: 0,
      estimatedEffortMonths: inputs.companySize === 'large' ? 9 : 6,
      gapAreas: [
        { name: 'Policy Framework', status: 'missing', effort: 'medium', description: 'Need to draft and approve all security policies.' },
        { name: 'Technical Controls', status: 'missing', effort: 'high', description: 'Implementation of encryption, access control, etc.' },
        { name: 'Risk Management', status: 'missing', effort: 'medium', description: 'Establishment of a formal risk assessment process.' },
      ],
    };
  }

  if (inputs.currentFramework === 'soc2' && inputs.targetFramework === 'iso27001') {
    return {
      readinessPercentage: 75,
      estimatedEffortMonths: inputs.companySize === 'large' ? 4 : 3,
      gapAreas: [
        { name: 'ISMS Governance', status: 'missing', effort: 'high', description: 'ISO 27001 requires a formal Information Security Management System (ISMS).' },
        { name: 'Internal Audit', status: 'missing', effort: 'medium', description: 'Mandatory internal audit against ISO 27001 clauses.' },
        { name: 'Statement of Applicability (SoA)', status: 'missing', effort: 'low', description: 'Mapping SOC 2 controls to Annex A.' },
        { name: 'Physical Security', status: 'covered', effort: 'low', description: 'Most SOC 2 physical controls map directly.' },
        { name: 'Logical Access', status: 'covered', effort: 'low', description: 'Strong alignment with SOC 2 Access Control.' },
      ],
    };
  }

  if (inputs.currentFramework === 'iso27001' && inputs.targetFramework === 'soc2') {
    return {
      readinessPercentage: 80,
      estimatedEffortMonths: inputs.companySize === 'large' ? 3 : 2,
      gapAreas: [
        { name: 'Trust Services Criteria Alignment', status: 'partial', effort: 'medium', description: 'Mapping Annex A to TSC (Security, Availability, etc.).' },
        { name: 'Auditor Selection', status: 'missing', effort: 'low', description: 'SOC 2 requires a CPA firm.' },
        { name: 'Observation Period', status: 'missing', effort: 'high', description: 'SOC 2 Type II requires a 3-6 month window.' },
        { name: 'Incident Response', status: 'covered', effort: 'low', description: 'ISO 27001 A.16 maps well to SOC 2.' },
      ],
    };
  }

  return { readinessPercentage: 100, estimatedEffortMonths: 0, gapAreas: [] };
}
