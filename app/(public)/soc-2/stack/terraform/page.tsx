import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Terraform: Implementation Guide | RiscLens',
  description: 'Learn how to use Terraform to achieve and maintain SOC 2 compliance. Map IaC practices (State Locking, Sentinel, Versioning) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/terraform',
  },
};

export default function TerraformSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Terraform"
      platformSlug="terraform"
      heroDescription="Infrastructure-as-Code (IaC) is a superpower for SOC 2. Terraform provides an immutable, version-controlled record of your infrastructure, which auditors find highly trustworthy."
      keyControls={[
        {
          title: 'Version-Controlled Infrastructure',
          implementation: 'Manage all infrastructure changes via pull requests in Git. This provides a built-in audit trail of who changed what, when, and why.',
        },
        {
          title: 'Remote State Security',
          implementation: 'Store Terraform state in a secure, encrypted backend (like S3 with KMS or Terraform Cloud) with state locking enabled to prevent corruption.',
        },
        {
          title: 'Policy as Code (Sentinel/OPA)',
          implementation: 'Use Sentinel or Open Policy Agent (OPA) to enforce security guardrails, such as "no public buckets," before infrastructure is provisioned.',
        },
        {
          title: 'Terraform Cloud Audit Logs',
          implementation: 'If using Terraform Cloud or Enterprise, leverage Audit Logs to track workspace changes, state access, and configuration updates.',
        },
      ]}
      bestPractices={[
        'Implement "Plan-only" CI jobs to review infrastructure changes and cost estimates before they are applied to production.',
        'Use "Variable Sets" in Terraform Cloud to securely manage provider credentials and environment secrets without exposing them in code.',
        'Modularize your Terraform code to ensure consistent, security-hardened configurations are reused across the entire organization.',
        'Regularly run "terraform plan" in your CI/CD pipelines to detect and remediate "configuration drift" from your intended state.',
      ]}
    />
  );
}
