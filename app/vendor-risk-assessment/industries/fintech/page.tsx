import { Metadata } from 'next';
import { VendorRiskIndustryPage, VendorRiskIndustryContent } from '@/components/VendorRiskIndustryPage';

const content: VendorRiskIndustryContent = {
  industry: 'Fintech',
  heroDescription: 'Secure your financial supply chain. Manage high-risk vendors handling payment data (PCI-DSS) and customer financial records.',
  requirements: [
    'Annual review of SOC 1 Type II or SOC 2 Type II for critical financial vendors.',
    'PCI-DSS AoC (Attestation of Compliance) for all payment processors.',
    'Bail-in and service continuity evidence for critical banking partners.',
  ],
  challenges: [
    'Complex "Fourth-Party" risk (the vendors of your vendors).',
    'Ensuring PCI compliance doesn\'t lapse between annual reviews.',
    'Mapping vendor outages to mandatory regulatory reporting (e.g., DORA in EU).',
  ],
  auditorFocus: [
    'Encryption of financial data at rest and in transit by vendors.',
    'Incident response coordination between the fintech and its partners.',
    'Evidence of "Performance Monitoring" for SLA-critical banking APIs.',
  ],
  tieringStrategy: [
    'Tier 1: Core Banking Platforms, Payment Processors, Ledger Systems.',
    'Tier 2: KYC/AML Providers, Credit Scoring APIs.',
    'Tier 3: Analytics and Customer Support Tools.',
  ],
  relatedLinks: [
    { href: '/vendor-risk-assessment/tiering', label: 'Vendor Tiering Tool' },
    { href: '/vendor-risk-assessment/questionnaire', label: 'Security Questionnaire Guide' },
    { href: '/soc-2-cost/fintech', label: 'SOC 2 Cost for Fintech' },
  ],
};

export const metadata: Metadata = {
  title: 'Vendor Risk Assessment for Fintech | RiscLens',
  description: 'Fintech-specific vendor risk management. PCI-DSS, SOC 1/2 reviews, and banking partner oversight.',
};

export default function VendorRiskFintechPage() {
  return <VendorRiskIndustryPage {...content} />;
}
