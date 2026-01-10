import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Kubernetes (K8s): Implementation Guide | RiscLens',
  description: 'Learn how to secure your Kubernetes clusters for SOC 2. Map K8s native security (RBAC, Network Policies, Secrets) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/kubernetes',
  },
};

export default function KubernetesSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Kubernetes (K8s)"
      platformSlug="kubernetes"
      heroDescription="Kubernetes introduces new security abstractions that auditors must understand. By securing your control plane and implementing strict container isolation, you can meet SOC 2 standards in a cloud-native way."
      keyControls={[
        {
          title: 'Role-Based Access Control (RBAC)',
          implementation: 'Disable the default "cluster-admin" for developers. Use fine-grained RBAC roles, integrate with SSO via OIDC, and perform regular audits of ServiceAccounts.',
        },
        {
          title: 'Network Policies',
          implementation: 'Implement a "Default Deny" network policy. Use a Service Mesh (Istio/Linkerd) or K8s NetworkPolicies to enforce pod-to-pod encryption and isolation.',
        },
        {
          title: 'Secrets Management',
          implementation: 'Do not store secrets in K8s Secret objects without encryption at rest. Integrate with AWS Secrets Manager or HashiCorp Vault using the CSI Secrets Store driver.',
        },
        {
          title: 'Runtime Security',
          implementation: 'Use Admission Controllers to enforce security standards (e.g., "no root containers"). Implement runtime monitoring with tools like Falco or Pixie.',
        },
      ]}
      bestPractices={[
        'Enable audit logging for the K8s API server and ship logs to a centralized, encrypted log management system.',
        'Use "Infrastructure-as-Code" (Helm/Kustomize) to ensure all cluster configurations are version-controlled and peer-reviewed.',
        'Implement automated vulnerability scanning for all container images in your CI/CD pipeline.',
        'Perform regular "Kubernetes Benchmarks" (CIS) to identify and remediate cluster misconfigurations.',
      ]}
    />
  );
}
