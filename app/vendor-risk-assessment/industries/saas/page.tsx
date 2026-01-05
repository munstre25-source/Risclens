import { Metadata } from 'next';
import { VendorRiskIndustryPage, VendorRiskIndustryContent } from '@/components/VendorRiskIndustryPage';

const content: VendorRiskIndustryContent = {
  industry: 'SaaS',
  heroDescription: 'Standardize vendor oversight for B2B SaaS. Balancing security requirements with the speed of modern cloud procurement.',
  requirements: [
    'SOC 2 Type II reports for all Tier 1 infrastructure and subservice providers.',
    'Inventory of subprocessors for privacy compliance (GDPR/CCPA).',
    'Automated alerts for expiring security certifications of critical vendors.',
  ],
  challenges: [
    'Fast-moving teams "self-serving" SaaS tools without security review.',
    'Managing hundreds of low-risk vendors that collectively create a large attack surface.',
    'Keeping the "Subprocessor List" accurate for customer legal requests.',
  ],
  auditorFocus: [
    'Annual review of system-wide subservice organizations (CC9.2).',
    'Evidence of onboarding/offboarding for vendor-managed accounts.',
    'Monitoring of vendor breach notifications and follow-up actions.',
  ],
  tieringStrategy: [
    'Tier 1: Cloud Service Providers (AWS/Azure/GCP), Identity (Okta/Auth0).',
    'Tier 2: CRM, Email Providers, Billing/Subscription Platforms.',
    'Tier 3: Productivity tools, Design tools, and low-data SaaS.',
  ],
  relatedLinks: [
    { href: '/vendor-risk-assessment/tiering', label: 'Vendor Tiering Tool' },
    { href: '/vendor-risk-assessment/automation-vs-manual', label: 'Automation vs. Manual Reviews' },
    { href: '/soc-2-cost/saas', label: 'SOC 2 Cost for SaaS' },
  ],
};

export const metadata: Metadata = {
  title: 'Vendor Risk Assessment for SaaS | RiscLens',
  description: 'Vendor risk management for B2B SaaS. Manage subprocessors, SOC 2 reviews, and cloud-native supplier risk.',
};

export default function VendorRiskSaaSPage() {
  return <VendorRiskIndustryPage {...content} />;
}
