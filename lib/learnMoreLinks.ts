export const learnMoreLinks = {
  penetrationTestingOverview: '/penetration-testing/pricing',
  penetrationTestingForSoc2: '/penetration-testing/for-soc-2',
  vendorRiskOverview: '/vendor-risk-assessment/checklist',
  soc2ReadinessIndex: '/soc-2-readiness-calculator',
} as const;

export type LearnMoreKey = keyof typeof learnMoreLinks;
