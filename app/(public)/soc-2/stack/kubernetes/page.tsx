import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Kubernetes (K8s): Implementation Guide | RiscLens',
  description: 'Learn how to secure your Kubernetes clusters for SOC 2. Map K8s features (RBAC, Network Policies, Secrets, Pod Security) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/kubernetes',
  },
};

export default function KubernetesSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Kubernetes"
      platformSlug="kubernetes"
      heroDescription="Kubernetes orchestration requires a layered security approach. For SOC 2, you must demonstrate control over cluster access, workload isolation, and secret management within your K8s environment."
      keyControls={[
        {
          title: 'Role-Based Access Control (RBAC)',
          implementation: 'Implement strict RBAC policies. Avoid using cluster-admin roles for daily operations and ensure that service accounts have the minimum necessary permissions.',
        },
        {
          title: 'Network Policies',
          implementation: 'Use Kubernetes Network Policies to enforce pod-to-pod traffic isolation. Deny all traffic by default and explicitly allow only required communication paths.',
        },
        {
          title: 'Secret Management',
          implementation: 'Encrypt Kubernetes Secrets at rest. Consider using external secret managers like HashiCorp Vault or AWS Secrets Manager integrated via CSI drivers for enhanced security.',
        },
        {
          title: 'Pod Security Standards',
          implementation: 'Enforce Pod Security Standards (Admission Controllers) to prevent privileged containers, ensure read-only root filesystems, and block host path mounts.',
        },
      ]}
      bestPractices={[
        'Enable Audit Logging for the API Server and ship logs to a secure, centralized location for monitoring.',
        'Use a container image scanner (like Trivy or Snyk) to scan all images for vulnerabilities before they are deployed to the cluster.',
        'Implement "Runtime Security" monitoring (e.g., Falco) to detect and alert on anomalous behavior within running containers.',
        'Keep your cluster version up to date and regularly patch nodes to address underlying OS and K8s vulnerabilities.',
      ]}
    />
  );
}
