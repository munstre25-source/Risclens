import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Cloudflare: Implementation Guide | RiscLens',
  description: 'Learn how to secure your Cloudflare setup for SOC 2. Map Cloudflare features (WAF, Access, Zero Trust, Audit Logs) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/cloudflare',
  },
};

export default function CloudflareSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Cloudflare"
      platformSlug="cloudflare"
      heroDescription="Cloudflare provides critical edge security and performance. For SOC 2, focus on configuring Zero Trust access, robust WAF rules, and comprehensive audit logging."
      keyControls={[
        {
          title: 'Zero Trust Access',
          implementation: 'Use Cloudflare Access to protect internal applications. Implement MFA and device posture checks before granting access to sensitive company resources.',
        },
        {
          title: 'Web Application Firewall (WAF)',
          implementation: 'Enable Cloudflare WAF with managed rulesets to protect against OWASP Top 10 vulnerabilities. Audit WAF events for potential security incidents.',
        },
        {
          title: 'Audit Logs & Logpush',
          implementation: 'Enable Cloudflare Audit Logs to track every configuration change. Use Logpush to send logs to your SIEM or cloud storage for long-term audit retention.',
        },
        {
          title: 'SSL/TLS Configuration',
          implementation: 'Enforce "Full (strict)" SSL/TLS encryption and use Cloudflare\'s edge certificates to ensure secure data transmission between users and your origin.',
        },
      ]}
      bestPractices={[
        'Implement Cloudflare Page Shield to monitor for malicious scripts and ensure the integrity of your frontend assets.',
        'Use Cloudflare Tunnels (Cloudflared) to connect your origin servers securely without exposing them to the public internet.',
        'Regularly review Zero Trust access policies and group memberships as part of your access review process.',
        'Manage your entire Cloudflare configuration via Terraform to maintain a version-controlled and auditable history of changes.',
      ]}
    />
  );
}
