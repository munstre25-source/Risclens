import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Google Cloud (GCP): Implementation Guide | RiscLens',
  description: 'Learn how to secure your Google Cloud infrastructure for SOC 2. Map GCP services (IAM, Cloud Logging, KMS) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/gcp',
  },
};

export default function GCPSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Google Cloud (GCP)"
      platformSlug="gcp"
      heroDescription="Google Cloud's 'Secure by Design' infrastructure simplifies many SOC 2 requirements. By using Cloud Identity and VPC Service Controls, you can create a high-assurance compliance boundary."
      keyControls={[
        {
          title: 'Identity & Access Management (IAM)',
          implementation: 'Use Google Groups for permission management, enforce MFA via Cloud Identity, and use Service Accounts with limited scopes for GKE and Compute Engine.',
        },
        {
          title: 'Logging & Error Reporting (Operations Suite)',
          implementation: 'Enable Audit Logs for all administrative and data access events. Export logs to a locked Cloud Storage bucket or BigQuery for long-term retention and analysis.',
        },
        {
          title: 'Data Protection (Cloud KMS)',
          implementation: 'Enable Customer-Managed Encryption Keys (CMEK) for sensitive buckets and databases. Use Secret Manager to handle application credentials securely.',
        },
        {
          title: 'VPC Service Controls',
          implementation: 'Define a service perimeter to mitigate data exfiltration risks from services like Cloud Storage and BigQuery, satisfying the SOC 2 "Network Security" criteria.',
        },
      ]}
      bestPractices={[
        'Use Google Cloud Folders and Projects to create strict environment isolation.',
        'Implement Security Command Center to monitor for misconfigurations and threats in real-time.',
        'Use Binary Authorization to ensure only trusted container images are deployed to GKE.',
        'Leverage Config Controller to manage GCP resources using GitOps and Anthos Config Management.',
      ]}
    />
  );
}
