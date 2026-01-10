import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Microsoft Azure: Implementation Guide | RiscLens',
  description: 'Learn how to secure your Microsoft Azure infrastructure for SOC 2. Map Azure services (Entra ID, Monitor, Key Vault) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/azure',
  },
};

export default function AzureSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Microsoft Azure"
      platformSlug="azure"
      heroDescription="Azure's enterprise-grade security features make it an ideal choice for SOC 2. By leveraging Entra ID and Azure Monitor, you can maintain a highly defensible compliance posture."
      keyControls={[
        {
          title: 'Identity & Access (Entra ID)',
          implementation: 'Enforce MFA via Conditional Access policies, use Privileged Identity Management (PIM) for JIT admin access, and sync with your HRIS for automated offboarding.',
        },
        {
          title: 'Logging & Monitoring (Azure Monitor / Sentinel)',
          implementation: 'Centralize all resource logs in a Log Analytics workspace. Use Azure Sentinel for SIEM capabilities and automated alerting on security-critical events.',
        },
        {
          title: 'Data Security (Azure Key Vault)',
          implementation: 'Manage all application secrets, certificates, and encryption keys in Key Vault. Use managed identities to allow resources to access secrets without stored credentials.',
        },
        {
          title: 'Network Security (Azure Firewall/NSGs)',
          implementation: 'Use Network Security Groups (NSGs) to restrict traffic at the subnet level. Implement Azure Firewall for centralized outbound traffic filtering and auditability.',
        },
      ]}
      bestPractices={[
        'Use Azure Blueprints or Bicep templates to deploy standardized, compliant environments across subscriptions.',
        'Leverage Microsoft Defender for Cloud to get real-time security posture scoring and remediation advice.',
        'Implement Azure Policy to enforce compliance guardrails (e.g., "deny all unencrypted storage accounts").',
        'Use Azure Bastion for secure, RDP/SSH access to VMs without public IP addresses.',
      ]}
    />
  );
}
