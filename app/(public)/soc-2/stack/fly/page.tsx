import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Fly.io: Implementation Guide | RiscLens',
  description: 'Learn how to secure your Fly.io apps for SOC 2. Map Fly.io features (Private Networking, WireGuard, Log Shipping) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/fly',
  },
};

export default function FlySoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Fly.io"
      platformSlug="fly"
      heroDescription="Fly.io runs your code close to users. For SOC 2, focus on leveraging its private networking capabilities and ensuring your logs are shipped to a central repository for auditing."
      keyControls={[
        {
          title: 'Private 6PN Networking',
          implementation: 'Use Fly.io\'s private IPv6 networking (6PN) to communicate between services without exposing traffic to the public internet, satisfying network isolation requirements.',
        },
        {
          title: 'WireGuard Peering',
          implementation: 'Use Fly.io WireGuard for secure administrative access and to connect external infrastructure into your private network with encrypted tunnels.',
        },
        {
          title: 'Log Shipping',
          implementation: 'Configure fly-log-shipper to export application and system logs to external providers for compliance retention and centralized security monitoring.',
        },
        {
          title: 'Secrets Management',
          implementation: 'Use "fly secrets" to manage sensitive configuration. Ensure access to these secrets is limited to authorized personnel and deployment pipelines.',
        },
      ]}
      bestPractices={[
        'Use Fly.io\'s automated SSL termination to ensure all public traffic is encrypted via TLS 1.2 or higher.',
        'Implement multiple regions for high availability, satisfying SOC 2 availability requirements and disaster recovery planning.',
        'Configure health checks in your fly.toml to monitor service uptime and trigger automated restarts for reliability.',
        'Manage your Fly.io infrastructure using the Fly Terraform provider to maintain a version-controlled audit trail of all changes.',
      ]}
    />
  );
}
