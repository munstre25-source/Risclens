import { Metadata } from 'next';
import IndustryChecklistPage from '@/components/IndustryChecklistPage';

export const metadata: Metadata = {
  title: 'SOC 2 Checklist for Marketplaces | RiscLens',
  description: 'The definitive SOC 2 checklist for B2B and B2C marketplaces. Learn how to secure supply-side data, payment flows, and user privacy.',
  alternates: {
    canonical: 'https://risclens.com/soc-2-readiness-checklist/marketplace',
  },
};

export default function MarketplaceChecklistPage() {
  return (
    <IndustryChecklistPage
      industryName="Marketplace"
      industrySlug="marketplace"
      heroDescription="Marketplaces have complex data flows between buyers and sellers. Your SOC 2 audit needs to prove you protect both sides of the transaction and maintain platform integrity."
      criticalControls={[
        'Seller PII Protection',
        'Payment Flow Isolation',
        'KYC/AML Integration',
        'Dispute Resolution Logging',
        'Session Management',
        'Fraud Monitoring',
      ]}
      checklistData={[
        {
          category: 'Platform Integrity & Security',
          items: [
            'Secure session handling and CSRF protection for all user accounts.',
            'Rate limiting and brute-force protection on login and checkout endpoints.',
            'Automated fraud detection alerts for anomalous transaction patterns.',
            'Documented process for seller vetting and onboarding security.',
          ],
        },
        {
          category: 'Payment & Financial Data',
          items: [
            'PCI-DSS compliance maintained (if handling card data directly).',
            'Logical isolation of transaction records from general application logs.',
            'Encryption of bank account details and payout information.',
            'Regular reconciliation of platform accounts with bank statements.',
          ],
        },
        {
          category: 'User Privacy & Data Handling',
          items: [
            'User data deletion (Right to be Forgotten) process documented.',
            'Internal access to user support tickets and PII is restricted and logged.',
            'Clear data retention policy for inactive accounts.',
            'Privacy notice explicitly detailing third-party data sharing.',
          ],
        },
      ]}
      commonPitfalls={[
        'Leaking seller PII in public-facing API responses.',
        'Inadequate logging of administrative actions in the marketplace backend.',
        'Mixing test and production payment keys in staging environments.',
        'Failing to monitor for "account takeover" (ATO) attempts on seller accounts.',
      ]}
    />
  );
}
