export type DataSensitivity =
  | 'none_public'
  | 'internal_only'
  | 'pii'
  | 'financial'
  | 'regulated';

export type AccessLevel =
  | 'no_access'
  | 'limited_user'
  | 'api_scoped'
  | 'admin'
  | 'network';

export type VendorCriticality = 'nice' | 'important' | 'critical';
export type IntegrationType = 'standalone' | 'sso' | 'one_way' | 'bi_directional';
export type DataVolume = 'low' | 'medium' | 'high';
export type IncidentHistory = 'none' | 'minor' | 'significant';

export interface VendorRiskInput {
  dataSensitivity: DataSensitivity;
  accessLevel: AccessLevel;
  vendorCriticality: VendorCriticality;
  integrationType: IntegrationType;
  dataVolume: DataVolume;
  hasSubprocessors: boolean;
  incidentHistory: IncidentHistory;
}

export type VendorRiskTier = 'low' | 'medium' | 'high';

export interface VendorRiskResult {
  score: number;
  tier: VendorRiskTier;
  evidencePackage: string[];
  requirements: string[];
  cadence: string;
  why: string[];
}

interface Option {
  value: string;
  label: string;
  points: number;
}

export const dataSensitivityOptions: Option[] = [
  { value: 'none_public', label: 'None / Public', points: 0 },
  { value: 'internal_only', label: 'Internal only', points: 10 },
  { value: 'pii', label: 'Customer data (PII)', points: 25 },
  { value: 'financial', label: 'Sensitive (financial/payment)', points: 35 },
  { value: 'regulated', label: 'Highly sensitive (PHI/regulated)', points: 45 },
];

export const accessLevelOptions: Option[] = [
  { value: 'no_access', label: 'No system access (file exchange only)', points: 0 },
  { value: 'limited_user', label: 'Limited app access (user-level)', points: 10 },
  { value: 'api_scoped', label: 'API access (scoped)', points: 20 },
  { value: 'admin', label: 'Admin access / privileged', points: 35 },
  { value: 'network', label: 'Network/production access', points: 45 },
];

export const vendorCriticalityOptions: Option[] = [
  { value: 'nice', label: 'Nice-to-have', points: 5 },
  { value: 'important', label: 'Important', points: 15 },
  { value: 'critical', label: 'Business-critical', points: 25 },
];

export const integrationTypeOptions: Option[] = [
  { value: 'standalone', label: 'Standalone SaaS (no integration)', points: 0 },
  { value: 'sso', label: 'SSO only', points: 5 },
  { value: 'one_way', label: 'Data sync (one-way)', points: 10 },
  { value: 'bi_directional', label: 'Bi-directional integration', points: 20 },
];

export const dataVolumeOptions: Option[] = [
  { value: 'low', label: 'Low', points: 0 },
  { value: 'medium', label: 'Medium', points: 10 },
  { value: 'high', label: 'High', points: 20 },
];

export const incidentHistoryOptions: Option[] = [
  { value: 'none', label: 'None / Not disclosed', points: 10 },
  { value: 'minor', label: 'Minor past incident (resolved)', points: 15 },
  { value: 'significant', label: 'Significant incident (last 24 months)', points: 25 },
];

const tierEvidence: Record<VendorRiskTier, string[]> = {
  low: [
    'Security questionnaire (lite)',
    'Data Processing Agreement (if PII is processed)',
    'Basic policy attestations (access control, incident response)',
  ],
  medium: [
    'SOC 2 Type II or ISO 27001 (or explanation + roadmap)',
    'Incident response summary',
    'Access control overview with MFA/SSO support',
    'Vendor/subprocessor list',
    'BCP/DR summary',
  ],
  high: [
    'SOC 2 Type II (preferred) + bridge letter if needed',
    'Recent pentest summary or independent assessment',
    'Detailed IR + BCP/DR evidence',
    'Data flow diagram / architecture overview',
    'Strong contractual requirements (security addendum)',
    'More frequent attestations',
  ],
};

const tierRequirements: Record<VendorRiskTier, string[]> = {
  low: [
    'SSO + MFA enabled where supported',
    'Documented incident contacts and SLAs',
    'Clear data retention/deletion terms',
    'Subprocessor transparency (if applicable)',
    'Annual policy attestations',
  ],
  medium: [
    'SSO + MFA enforced for admins and support access',
    'Logging and alerting on admin/API actions',
    'Documented data flows and encryption in transit/at rest',
    'Incident response runbooks with notification paths',
    'Quarterly access reviews for privileged roles',
    'Contractual security addendum and DPAs',
  ],
  high: [
    'Privileged access restrictions with approvals and logging',
    'Network segmentation and least-privilege API scopes',
    'Strong key management and rotation practices',
    'Continuous monitoring or semiannual security attestations',
    'Formal BCP/DR testing evidence',
    'Clear breach notification and liability terms',
    'Updated pen test or third-party assessment annually',
  ],
};

const tierCadence: Record<VendorRiskTier, string> = {
  low: 'Annual attestation and light questionnaire review.',
  medium: 'Annual review plus quarterly attestations for changes and incidents.',
  high: 'Initial deep review plus semiannual reassessment; consider continuous monitoring for critical integrations.',
};

function pointsForValue(options: Option[], value: string): number {
  return options.find((opt) => opt.value === value)?.points ?? 0;
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, score));
}

function mapTier(score: number): VendorRiskTier {
  if (score >= 65) return 'high';
  if (score >= 35) return 'medium';
  return 'low';
}

function buildWhy(input: VendorRiskInput, score: number): string[] {
  const reasons: string[] = [];

  const sensitivityPoints = pointsForValue(dataSensitivityOptions, input.dataSensitivity);
  const accessPoints = pointsForValue(accessLevelOptions, input.accessLevel);
  const criticalityPoints = pointsForValue(vendorCriticalityOptions, input.vendorCriticality);
  const integrationPoints = pointsForValue(integrationTypeOptions, input.integrationType);
  const volumePoints = pointsForValue(dataVolumeOptions, input.dataVolume);
  const incidentPoints = pointsForValue(incidentHistoryOptions, input.incidentHistory);

  if (sensitivityPoints >= 35) reasons.push('Handles financial, payment, or regulated data that increases breach impact.');
  if (accessPoints >= 35) reasons.push('Privileged or production-level access expands the blast radius.');
  if (criticalityPoints >= 25) reasons.push('Classified as business-critical to operations or customers.');
  if (integrationPoints >= 20) reasons.push('Bi-directional integrations create tighter coupling and data movement.');
  if (volumePoints >= 20) reasons.push('High data volumes mean more exposure if controls fail.');
  if (input.hasSubprocessors) reasons.push('Uses subprocessors, requiring downstream oversight.');
  if (incidentPoints >= 25) reasons.push('Recent significant incident drives higher assurance needs.');

  if (reasons.length < 3) {
    if (sensitivityPoints <= 10 && accessPoints <= 10) {
      reasons.push('Limited data sensitivity and low access reduce inherent risk.');
    }
    if (integrationPoints === 0) {
      reasons.push('Standalone or SSO-only integration lowers blast radius.');
    }
    if (!input.hasSubprocessors) {
      reasons.push('No subprocessors reduces chain-of-custody complexity.');
    }
  }

  return reasons.slice(0, 5);
}

export function calculateVendorRisk(input: VendorRiskInput): VendorRiskResult {
  const score =
    pointsForValue(dataSensitivityOptions, input.dataSensitivity) +
    pointsForValue(accessLevelOptions, input.accessLevel) +
    pointsForValue(vendorCriticalityOptions, input.vendorCriticality) +
    pointsForValue(integrationTypeOptions, input.integrationType) +
    pointsForValue(dataVolumeOptions, input.dataVolume) +
    (input.hasSubprocessors ? 10 : 0) +
    pointsForValue(incidentHistoryOptions, input.incidentHistory);

  const clamped = clampScore(score);
  const tier = mapTier(clamped);

  return {
    score: clamped,
    tier,
    evidencePackage: tierEvidence[tier],
    requirements: tierRequirements[tier],
    cadence: tierCadence[tier],
    why: buildWhy(input, clamped),
  };
}
