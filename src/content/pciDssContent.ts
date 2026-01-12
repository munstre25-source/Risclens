export const pciDssHub = {
  hero: {
    headline: 'PCI DSS Compliance Hub',
    subhead: 'Your mission control for PCI DSS 4.0 readiness. Navigate technical requirements, estimate certification costs, and prepare for your QSA assessment.',
  },
  lastUpdated: '2026-01-10',
};

export const pciDssTools = [
  {
    href: '/pci-dss-readiness-calculator',
    title: 'PCI Readiness Scorecard',
    summary: 'Identify technical gaps against the 12 PCI DSS requirements before your QSA arrives.',
    cta: 'Check Readiness'
  },
  {
    href: '/pci-dss-cost-calculator',
    title: 'PCI Cost Estimator',
    summary: 'Estimate QSA fees, ASV scanning costs, and internal engineering effort.',
    cta: 'Estimate Costs'
  },
  {
    href: '/auditor-match',
    title: 'Find a QSA',
    summary: 'Connect with qualified security assessors vetted for your specific stack and industry.',
    cta: 'Match with QSA'
  },
  {
    href: '/compliance-roi-calculator',
    title: 'PCI Automation ROI',
    summary: 'Compare the ROI of using a compliance platform vs. manual spreadsheet evidence collection.',
    cta: 'Calculate ROI'
  }
];

export const pciDssRequirements = [
  {
    number: '1',
    title: 'Network Security Controls',
    description: 'Install and maintain network security controls (firewalls) to protect the cardholder data environment.',
  },
  {
    number: '2',
    title: 'Secure Configurations',
    description: 'Apply secure configurations to all system components. Change default passwords and settings.',
  },
  {
    number: '3',
    title: 'Protect Stored Account Data',
    description: 'Protect stored cardholder data. Use encryption, truncation, masking, and hashing.',
  },
  {
    number: '4',
    title: 'Protect Data During Transmission',
    description: 'Protect cardholder data with strong cryptography during transmission over open, public networks.',
  },
  {
    number: '5',
    title: 'Protect Against Malware',
    description: 'Protect all systems and networks from malicious software by using anti-virus software or programs.',
  },
  {
    number: '6',
    title: 'Secure Systems and Software',
    description: 'Develop and maintain secure systems and software. Perform regular vulnerability assessments.',
  },
  {
    number: '7',
    title: 'Restrict Access by Business Need',
    description: 'Restrict access to cardholder data by business need to know. Implement least privilege.',
  },
  {
    number: '8',
    title: 'Identify & Authenticate Access',
    description: 'Identify and authenticate access to system components. Use multi-factor authentication (MFA).',
  },
  {
    number: '9',
    title: 'Restrict Physical Access',
    description: 'Restrict physical access to cardholder data. Use locks, cameras, and badge access.',
  },
  {
    number: '10',
    title: 'Log & Monitor Access',
    description: 'Log and monitor all access to system components and cardholder data.',
  },
  {
    number: '11',
    title: 'Test Security Regularly',
    description: 'Test security of systems and networks regularly. Perform internal/external vulnerability scans and pentests.',
  },
  {
    number: '12',
    title: 'Support Information Security',
    description: 'Support information security with organizational policies and programs.',
  }
];

export const pciDssFAQs = [
  {
    question: 'What is the difference between PCI DSS 3.2.1 and 4.0?',
    answer: 'PCI DSS 4.0 is the latest version, introducing a more flexible "customized approach" to meeting requirements, increased emphasis on continuous monitoring, and new requirements for MFA and e-commerce security.'
  },
  {
    question: 'Do I need a QSA for PCI compliance?',
    answer: 'It depends on your transaction volume. Level 1 merchants typically require an On-Site Assessment by a QSA, while Level 2-4 may be eligible for a Self-Assessment Questionnaire (SAQ).'
  },
  {
    question: 'How often do I need to perform ASV scans?',
    answer: 'Approved Scanning Vendor (ASV) scans must be performed at least quarterly on all external-facing IP addresses in the cardholder data environment.'
  }
];

export const pciDssIndustries = [
  { name: 'Ecommerce', slug: 'ecommerce', summary: 'Focus on payment gateway integration, SAQ A-EP requirements, and web application firewalls.', bg: 'bg-white' },
  { name: 'Fintech', slug: 'fintech', summary: 'Deep dive into transaction processing, tokenization, and multi-tenant cloud security.', bg: 'bg-slate-50' },
  { name: 'Retail', slug: 'retail', summary: 'Emphasis on POS security, physical access controls, and network segmentation.', bg: 'bg-slate-50' },
  { name: 'SaaS', slug: 'saas', summary: 'Best practices for cloud-native applications, infrastructure as code, and CI/CD security.', bg: 'bg-white' },
];
