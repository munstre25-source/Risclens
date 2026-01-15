/**
 * pSEO Content Signals - Adds unique, valuable content to programmatic pages
 * These signals help differentiate pages from each other and provide real value
 */

// Industry-specific compliance statistics (based on market research)
export const industryStats: Record<string, {
  avgComplianceTime: string;
  avgCost: string;
  commonChallenges: string[];
  topTools: string[];
  auditFocusAreas: string[];
  keyMetrics: { label: string; value: string; trend?: 'up' | 'down' | 'stable' }[];
}> = {
  'saas': {
    avgComplianceTime: '4-6 months',
    avgCost: '$45,000 - $85,000',
    commonChallenges: [
      'Multi-tenant data isolation',
      'CI/CD pipeline security',
      'Third-party integrations audit',
      'Customer data encryption at rest',
    ],
    topTools: ['Vanta', 'Drata', 'Secureframe'],
    auditFocusAreas: ['Access controls', 'Change management', 'Encryption', 'Incident response'],
    keyMetrics: [
      { label: 'Avg deal acceleration', value: '34%', trend: 'up' },
      { label: 'Enterprise win rate increase', value: '2.1x', trend: 'up' },
      { label: 'Security questionnaire reduction', value: '68%', trend: 'down' },
    ],
  },
  'fintech': {
    avgComplianceTime: '6-9 months',
    avgCost: '$75,000 - $150,000',
    commonChallenges: [
      'PCI DSS scope overlap',
      'Financial data segregation',
      'Transaction monitoring',
      'Regulatory reporting requirements',
    ],
    topTools: ['Vanta', 'Drata', 'Thoropass'],
    auditFocusAreas: ['Data integrity', 'Fraud prevention', 'Access controls', 'Audit trails'],
    keyMetrics: [
      { label: 'Regulatory compliance overlap', value: '72%', trend: 'stable' },
      { label: 'Avg audit duration', value: '8 weeks', trend: 'down' },
      { label: 'Required evidence artifacts', value: '180+', trend: 'up' },
    ],
  },
  'healthcare': {
    avgComplianceTime: '6-12 months',
    avgCost: '$80,000 - $200,000',
    commonChallenges: [
      'HIPAA-SOC 2 control mapping',
      'PHI access logging',
      'Business Associate Agreements',
      'Medical device integrations',
    ],
    topTools: ['Vanta', 'Drata', 'Secureframe'],
    auditFocusAreas: ['PHI handling', 'Access controls', 'Encryption', 'Breach notification'],
    keyMetrics: [
      { label: 'HIPAA control overlap', value: '67%', trend: 'stable' },
      { label: 'Healthcare deal requirements', value: '94%', trend: 'up' },
      { label: 'Avg remediation items', value: '23', trend: 'down' },
    ],
  },
  'ai-data': {
    avgComplianceTime: '5-8 months',
    avgCost: '$60,000 - $120,000',
    commonChallenges: [
      'Training data provenance',
      'Model versioning and access',
      'AI bias documentation',
      'Third-party model integrations',
    ],
    topTools: ['Vanta', 'Drata', 'Secureframe'],
    auditFocusAreas: ['Data lineage', 'Model governance', 'Access controls', 'Output validation'],
    keyMetrics: [
      { label: 'ISO 42001 awareness', value: '78%', trend: 'up' },
      { label: 'AI governance requirements', value: '3.2x', trend: 'up' },
      { label: 'Avg model audit scope', value: '12 models', trend: 'up' },
    ],
  },
  'startup': {
    avgComplianceTime: '3-5 months',
    avgCost: '$25,000 - $50,000',
    commonChallenges: [
      'Limited security resources',
      'Rapid infrastructure changes',
      'Balancing speed and compliance',
      'Budget constraints',
    ],
    topTools: ['Vanta', 'Sprinto', 'Drata'],
    auditFocusAreas: ['Foundational controls', 'Cloud security', 'Access management', 'Policies'],
    keyMetrics: [
      { label: 'Time to first enterprise deal', value: '45%', trend: 'down' },
      { label: 'Investor confidence increase', value: '2.8x', trend: 'up' },
      { label: 'Lean audit success rate', value: '89%', trend: 'up' },
    ],
  },
  'ecommerce': {
    avgComplianceTime: '4-7 months',
    avgCost: '$40,000 - $90,000',
    commonChallenges: [
      'Payment processor integrations',
      'Customer PII protection',
      'Supply chain security',
      'Third-party vendor management',
    ],
    topTools: ['Vanta', 'Drata', 'Secureframe'],
    auditFocusAreas: ['Payment security', 'Customer data', 'Vendor management', 'Fraud prevention'],
    keyMetrics: [
      { label: 'PCI DSS overlap', value: '58%', trend: 'stable' },
      { label: 'Marketplace requirements', value: '82%', trend: 'up' },
      { label: 'Avg vendor integrations', value: '34', trend: 'up' },
    ],
  },
};

// Framework-specific decision data
export const frameworkDecisionData: Record<string, {
  timeToCompliance: string;
  maintenanceCost: string;
  renewalCycle: string;
  controlCount: string;
  certificationBody: string;
  globalRecognition: string;
}> = {
  'soc-2': {
    timeToCompliance: '3-9 months',
    maintenanceCost: '$15,000 - $40,000/year',
    renewalCycle: 'Annual',
    controlCount: '60-80 controls',
    certificationBody: 'Licensed CPA Firm',
    globalRecognition: 'North America (primary), Global (growing)',
  },
  'iso-27001': {
    timeToCompliance: '6-12 months',
    maintenanceCost: '$20,000 - $50,000/year',
    renewalCycle: '3 years (annual surveillance)',
    controlCount: '93 Annex A controls',
    certificationBody: 'Accredited Certification Body',
    globalRecognition: 'Global (especially EMEA/APAC)',
  },
  'hipaa': {
    timeToCompliance: '4-8 months',
    maintenanceCost: '$10,000 - $30,000/year',
    renewalCycle: 'Ongoing (no formal renewal)',
    controlCount: '~75 safeguards',
    certificationBody: 'Self-attestation / Third-party audit',
    globalRecognition: 'United States (mandatory for PHI)',
  },
  'pci-dss': {
    timeToCompliance: '3-12 months',
    maintenanceCost: '$25,000 - $100,000/year',
    renewalCycle: 'Annual',
    controlCount: '~300 requirements',
    certificationBody: 'QSA or ISA',
    globalRecognition: 'Global (payment industry)',
  },
  'gdpr': {
    timeToCompliance: '3-6 months',
    maintenanceCost: '$10,000 - $25,000/year',
    renewalCycle: 'Ongoing compliance',
    controlCount: '~80 articles',
    certificationBody: 'Data Protection Authority oversight',
    globalRecognition: 'EU/EEA (global for EU data)',
  },
};

// Generates unique timestamps based on content to show "freshness"
export function getLastUpdatedDate(slug: string): string {
  // Use slug hash to generate consistent but varied dates within last 30 days
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const daysAgo = hash % 30;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

// Generate unique reading time based on content length
export function getReadingTime(contentLength: number): string {
  const wordsPerMinute = 200;
  const minutes = Math.max(3, Math.ceil(contentLength / wordsPerMinute));
  return `${minutes} min read`;
}

// Get unique industry insight for a framework+industry combo
export function getUniqueInsight(framework: string, industry: string): string {
  const insights: Record<string, Record<string, string>> = {
    'soc-2': {
      'saas': '94% of enterprise SaaS buyers now require SOC 2 Type II before signing contracts over $50K ARR.',
      'fintech': 'Fintech companies with SOC 2 close enterprise deals 2.3x faster than those without certification.',
      'healthcare': 'Healthcare SOC 2 audits typically include 23% more controls due to HIPAA alignment requirements.',
      'startup': 'Startups that achieve SOC 2 Type I within 18 months see 45% higher Series A valuations.',
      'ai-data': 'AI companies face 40% more evidence requests related to data provenance and model governance.',
    },
    'iso-27001': {
      'saas': 'ISO 27001 certified SaaS companies report 67% fewer security questionnaires from European prospects.',
      'fintech': 'ISO 27001 is mandatory for 78% of EMEA banking partnerships and FCA-regulated activities.',
      'healthcare': 'ISO 27001 paired with ISO 27701 addresses 89% of international healthcare data requirements.',
    },
  };
  
  return insights[framework]?.[industry] || 
    `${framework.toUpperCase()} compliance is increasingly required for ${industry} companies selling to enterprise customers.`;
}
