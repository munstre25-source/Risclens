export interface TimelineInputs {
  companySize: 'small' | 'medium' | 'large';
  cloudMaturity: 'low' | 'medium' | 'high';
  auditType: 'type1' | 'type2';
  teamAvailability: 'low' | 'medium' | 'high';
}

export interface TimelinePhase {
  name: string;
  durationWeeks: number;
  description: string;
  tasks: string[];
}

export interface TimelineResult {
  phases: TimelinePhase[];
  totalWeeks: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export function estimateTimeline(inputs: TimelineInputs): TimelineResult {
  const phases: TimelinePhase[] = [];
  
  // Phase 1: Gap Analysis
  phases.push({
    name: 'Gap Analysis & Planning',
    durationWeeks: inputs.companySize === 'large' ? 3 : 2,
    description: 'Identifying control gaps and defining the audit scope.',
    tasks: ['Inventory assets', 'Risk assessment', 'Select Trust Services Criteria'],
  });

  // Phase 2: Remediation
  let remediationWeeks = 4;
  if (inputs.cloudMaturity === 'low') remediationWeeks += 6;
  if (inputs.cloudMaturity === 'medium') remediationWeeks += 3;
  if (inputs.companySize === 'medium') remediationWeeks += 2;
  if (inputs.companySize === 'large') remediationWeeks += 4;
  if (inputs.teamAvailability === 'low') remediationWeeks *= 1.5;
  
  phases.push({
    name: 'Remediation & Implementation',
    durationWeeks: Math.round(remediationWeeks),
    description: 'Implementing missing controls and evidence collection processes.',
    tasks: ['Policy creation', 'Technical control setup', 'Employee training'],
  });

  // Phase 3: Observation Period (Type II only)
  if (inputs.auditType === 'type2') {
    phases.push({
      name: 'Observation Period',
      durationWeeks: 12, // Standard 3 months
      description: 'The period during which the auditor observes the controls in operation.',
      tasks: ['Evidence gathering', 'Continuous monitoring'],
    });
  } else {
    phases.push({
      name: 'Readiness Review',
      durationWeeks: 2,
      description: 'Final check before the audit starts.',
      tasks: ['Self-assessment', 'Evidence review'],
    });
  }

  // Phase 4: Audit
  phases.push({
    name: 'Audit Fieldwork & Reporting',
    durationWeeks: inputs.companySize === 'large' ? 6 : 4,
    description: 'Auditor review and issuance of the final report.',
    tasks: ['Interviews', 'Sample testing', 'Report drafting'],
  });

  const totalWeeks = phases.reduce((acc, phase) => acc + phase.durationWeeks, 0);

  return {
    phases,
    totalWeeks,
    riskLevel: totalWeeks > 24 ? 'high' : totalWeeks > 16 ? 'medium' : 'low',
  };
}
