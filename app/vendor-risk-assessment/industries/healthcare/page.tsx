import { Metadata } from 'next';
import { VendorRiskIndustryPage, VendorRiskIndustryContent } from '@/components/VendorRiskIndustryPage';

const content: VendorRiskIndustryContent = {
  industry: 'Healthcare',
  heroDescription: 'Manage vendor risk in healthcare (PHI/PII) with SOC 2 and HIPAA-aligned oversight. Automate tiering and evidence collection.',
  requirements: [
    'Business Associate Agreements (BAAs) for all PHI-handling vendors.',
    'Evidence of annual security reviews for Tier 1 & 2 suppliers.',
    'Stricter data disposal and encryption requirements for clinical vendors.',
  ],
  challenges: [
    'Delayed BAAs holding up procurement and audits.',
    'Over-reviewing low-risk vendors (e.g., office supplies) while missing clinical data risks.',
    'Inconsistent evidence of "Downstream Oversight" for subcontractors.',
  ],
  auditorFocus: [
    'Completeness of the BAA inventory and signed agreements.',
    'Review of vendor SOC 2 reports for PHI-specific control failures.',
    'Right-to-audit clause exercise for critical clinical platforms.',
  ],
  tieringStrategy: [
    'Tier 1: EHRs, Patient Portals, and Cloud Infrastructure with PHI.',
    'Tier 2: CRM/Marketing tools with PII but no clinical data.',
    'Tier 3: Administrative tools and Supportive SaaS.',
  ],
  relatedLinks: [
    { href: '/vendor-risk-assessment/tiering', label: 'Vendor Tiering Tool' },
    { href: '/vendor-risk-assessment/soc-2-compliance-requirements', label: 'SOC 2 Vendor Requirements' },
    { href: '/soc-2-cost/healthcare', label: 'SOC 2 Cost for Healthcare' },
  ],
};

export const metadata: Metadata = {
  title: 'Vendor Risk Assessment for Healthcare | RiscLens',
  description: 'Specific vendor risk guidance for healthcare teams handling PHI. BAAs, SOC 2 reviews, and tiering strategies.',
};

export default function VendorRiskHealthcarePage() {
  return <VendorRiskIndustryPage {...content} />;
}
