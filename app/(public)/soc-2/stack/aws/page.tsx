import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for AWS: Implementation Guide | RiscLens',
  description: 'Learn how to secure your AWS infrastructure for SOC 2. Map AWS services (IAM, KMS, CloudTrail) to SOC 2 controls and automate evidence collection.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/aws',
  },
};

export default function AWSSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="AWS"
      platformSlug="aws"
      heroDescription="AWS provides a robust foundation for SOC 2. By leveraging native security services and infrastructure-as-code, you can automate up to 80% of your technical evidence collection."
      keyControls={[
        {
          title: 'Identity & Access Management (IAM)',
          implementation: 'Enforce MFA for all users, use IAM Roles for EC2/Lambda (no long-lived keys), and perform quarterly access reviews of IAM Users and Groups.',
        },
        {
          title: 'Logging & Monitoring (CloudTrail)',
          implementation: 'Enable CloudTrail in all regions, ship logs to an encrypted S3 bucket with MFA delete enabled, and set up CloudWatch alarms for security events.',
        },
        {
          title: 'Encryption (KMS)',
          implementation: 'Use AWS KMS for data at rest across S3, EBS, and RDS. Ensure rotation is enabled and access to keys is restricted to specific service roles.',
        },
        {
          title: 'Network Security (VPC/WAF)',
          implementation: 'Use security groups to enforce least-privilege networking, implement AWS WAF for public-facing applications, and use VPC Flow Logs for auditability.',
        },
      ]}
      bestPractices={[
        'Use AWS Organizations to separate production, staging, and development accounts logically.',
        'Implement AWS Config to continuously monitor for non-compliant resource configurations.',
        'Use AWS Inspector for automated vulnerability scanning of EC2 instances and ECR images.',
        'Define all resources via Terraform or CloudFormation to provide a version-controlled audit trail.',
      ]}
    />
  );
}
