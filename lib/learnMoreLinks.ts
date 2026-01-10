export const learnMoreLinks = {
  penetrationTestingOverview: '/penetration-testing/cost-estimator',
  penetrationTestingForSoc2: '/penetration-testing/compliance-buyers',
  vendorRiskOverview: '/vendor-risk-assessment/triage',
  soc2ReadinessIndex: '/soc-2-readiness-calculator',
  soc2Overview: '/soc-2-readiness-checklist',
  readinessReview: '/readiness-review',
  pentestIntro: '/pentest-intro',
  vendorRiskProgram: '/vendor-risk-program',
    soc2Cost: '/compliance-roi-calculator',
  complianceROI: '/compliance-roi-calculator',
} as const;

export type LearnMoreKey = keyof typeof learnMoreLinks;
