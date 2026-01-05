export const learnMoreLinks = {
  penetrationTestingOverview: '/penetration-testing/pricing',
  penetrationTestingForSoc2: '/penetration-testing/for-soc-2',
  vendorRiskOverview: '/vendor-risk-assessment/checklist',
  soc2ReadinessIndex: '/soc-2-readiness-calculator',
  soc2Overview: '/soc-2-readiness-checklist',
  readinessReview: '/readiness-review',
  pentestIntro: '/pentest-intro',
  vendorRiskProgram: '/vendor-risk-program',
} as const;

export type LearnMoreKey = keyof typeof learnMoreLinks;
