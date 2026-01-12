import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for DigitalOcean: Implementation Guide | RiscLens',
  description: 'Learn how to secure your DigitalOcean infrastructure for SOC 2. Map DigitalOcean features (VPC, Cloud Firewalls, Teams) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/digitalocean',
  },
};

export default function DigitalOceanSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="DigitalOcean"
      platformSlug="digitalocean"
      heroDescription="DigitalOcean provides a simplified cloud experience. For SOC 2, you must focus on securing your Droplets, configuring VPCs, and managing team access robustly."
      keyControls={[
        {
          title: 'Team Management & MFA',
          implementation: 'Use DigitalOcean Teams to manage collaborator access. Enforce MFA for all team members and use SSH keys (not passwords) for Droplet access.',
        },
        {
          title: 'Network Security (VPC & Firewalls)',
          implementation: 'Use VPCs to isolate resources and Cloud Firewalls to restrict traffic to necessary ports and sources only, following the principle of least privilege.',
        },
        {
          title: 'Managed Databases & Backups',
          implementation: 'Use DigitalOcean Managed Databases with encryption at rest and automated backups to ensure data availability, integrity, and compliance.',
        },
        {
          title: 'Activity Logs',
          implementation: 'Monitor and export DigitalOcean Activity Logs to track administrative actions across your account for security auditing and incident response.',
        },
      ]}
      bestPractices={[
        'Never use root passwords; always use SSH keys for Droplet access and keep them updated.',
        'Enable automated backups for all critical Droplets and test restoration procedures regularly.',
        'Use DigitalOcean\'s App Platform where possible to reduce the surface area of infrastructure you manage.',
        'Implement infrastructure-as-code using the DigitalOcean Terraform provider for auditable configuration changes.',
      ]}
    />
  );
}
