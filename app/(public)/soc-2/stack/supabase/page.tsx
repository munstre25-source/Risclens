import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Supabase: Implementation Guide | RiscLens',
  description: 'Learn how to secure your Supabase project for SOC 2. Map Supabase features (Auth, RLS, Storage, Database Backups) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/supabase',
  },
};

export default function SupabaseSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Supabase"
      platformSlug="supabase"
      heroDescription="Supabase provides a powerful open-source backend-as-a-service. For SOC 2, your focus will be on Row Level Security (RLS) policies, authentication configuration, and database access controls."
      keyControls={[
        {
          title: 'Row Level Security (RLS)',
          implementation: 'Enable RLS on every table. Write specific policies to ensure that users can only access their own data, fulfilling the "Principle of Least Privilege".',
        },
        {
          title: 'Authentication & MFA',
          implementation: 'Enforce MFA for the Supabase dashboard. Use Supabase Auth with secure providers and ensure that your application-layer auth logic is audited for common vulnerabilities.',
        },
        {
          title: 'Database Access & Backups',
          implementation: 'Restrict database access via the dashboard. Enable Point-in-Time Recovery (PITR) for continuous backups and ensure all data at rest is encrypted.',
        },
        {
          title: 'Storage Security',
          implementation: 'Use RLS policies for Supabase Storage buckets. Ensure that sensitive assets are not publicly accessible and that all uploads are validated.',
        },
      ]}
      bestPractices={[
        'Use the "Database Webhooks" feature to log security-sensitive data changes to an external audit trail.',
        'Implement automated tests to verify that your RLS policies correctly block unauthorized access attempts.',
        'Rotate your database passwords and API keys regularly via the Supabase dashboard.',
        'Monitor "Edge Function" logs for anomalous execution patterns or unauthorized attempts to bypass security layers.',
      ]}
    />
  );
}
