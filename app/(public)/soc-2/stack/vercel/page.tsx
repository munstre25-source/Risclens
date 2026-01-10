import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Vercel: Implementation Guide | RiscLens',
  description: 'Learn how to secure your Vercel deployments for SOC 2. Map Vercel features (Access Control, Edge Middleware, Security Headers) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/vercel',
  },
};

export default function VercelSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Vercel"
      platformSlug="vercel"
      heroDescription="Vercel's managed platform abstracts away much of the infrastructure-level SOC 2 burden. Your audit will focus on how you manage deployment permissions, environment secrets, and application-layer security."
      keyControls={[
        {
          title: 'Deployment Permissions',
          implementation: 'Use Vercel Teams with Role-Based Access Control (RBAC). Enforce SAML SSO and ensure that only authorized developers can trigger production deployments.',
        },
        {
          title: 'Environment Variable Security',
          implementation: 'Encrypt all environment variables. Use Vercel\'s native "Sensitive Environment Variables" feature to prevent secrets from being exposed in build logs or to unauthorized users.',
        },
        {
          title: 'Edge Middleware & Security Headers',
          implementation: 'Use Vercel Middleware to enforce security headers (HSTS, CSP) and implement geo-blocking or IP allowlisting where required by your security policy.',
        },
        {
          title: 'Audit Logging',
          implementation: 'Enable Vercel Audit Logs and ship them to a third-party log management provider (Datadog, Logflare) for long-term retention and security monitoring.',
        },
      ]}
      bestPractices={[
        'Enable "Deployment Protection" (Vercel Authentication) for all preview deployments to prevent public access to non-prod code.',
        'Use Vercel\'s Check Service to integrate automated security scans into every deployment.',
        'Implement "Skew Protection" to ensure consistency between your serverless functions and frontend assets during deployments.',
        'Regularly review "Team Audit Logs" to monitor for anomalous administrative actions or permission changes.',
      ]}
    />
  );
}
