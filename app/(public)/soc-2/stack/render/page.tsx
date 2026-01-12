import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Render: Implementation Guide | RiscLens',
  description: 'Learn how to secure your Render services for SOC 2. Map Render features (Teams, Env Groups, Private Services) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/render',
  },
};

export default function RenderSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Render"
      platformSlug="render"
      heroDescription="Render's modern platform simplifies deployment. Achieving SOC 2 on Render involves leveraging its native security features like environment groups and private networking."
      keyControls={[
        {
          title: 'Render Teams & RBAC',
          implementation: 'Use Render Teams to manage collaborator access. Enforce MFA for all users and use Roles (Admin, Member) to limit permissions according to job function.',
        },
        {
          title: 'Environment Groups',
          implementation: 'Use Environment Groups to manage secrets and config across services securely. Audit changes to these groups to ensure environment integrity.',
        },
        {
          title: 'Private Networking',
          implementation: 'Use Render Private Services to ensure internal components (like databases or microservices) are not exposed to the public internet.',
        },
        {
          title: 'Log Streams',
          implementation: 'Configure Log Streams to export application and system logs to external providers (Datadog, Papertrail, etc.) for long-term audit retention.',
        },
      ]}
      bestPractices={[
        'Use Render\'s automated SSL certificates for all public-facing services to ensure data in transit is encrypted.',
        'Implement Preview Environments to test security changes and configurations before they reach production.',
        'Configure health checks for all services to ensure availability monitoring and automated recovery.',
        'Use the Render API or Terraform provider to manage infrastructure changes in an auditable, version-controlled manner.',
      ]}
    />
  );
}
