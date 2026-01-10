import { Metadata } from 'next';
import IndustryChecklistPage from '@/components/IndustryChecklistPage';

export const metadata: Metadata = {
  title: 'SOC 2 Checklist for AI & Machine Learning Startups | RiscLens',
  description: 'The definitive SOC 2 checklist for AI/ML startups. Learn how to secure training data, model weights, and AI-driven workflows.',
  alternates: {
    canonical: 'https://risclens.com/soc-2-readiness-checklist/ai-ml',
  },
};

export default function AIMLChecklistPage() {
  return (
    <IndustryChecklistPage
      industryName="AI & Machine Learning"
      industrySlug="ai-ml"
      heroDescription="AI startups face unique security challenges around data privacy and model integrity. Your SOC 2 audit needs to prove you protect sensitive training data and prevent prompt injection or model theft."
      criticalControls={[
        'Training Data Privacy',
        'Model Weight Encryption',
        'Prompt Injection Defense',
        'Inference Logging',
        'Data Lineage Tracking',
        'AI Ethics Policy',
      ]}
      checklistData={[
        {
          category: 'Data Governance & Privacy',
          items: [
            'Sensitive user data scrubbed or anonymized before being used for model training.',
            'Clear opt-out mechanism for users who do not want their data used for training.',
            'Audit trail for all datasets used to train production models.',
            'Encryption of data at rest in vector databases and object storage.',
          ],
        },
        {
          category: 'Model & Infrastructure Security',
          items: [
            'Model weights and parameters stored in encrypted, access-restricted storage.',
            'Inference APIs protected by rate limiting and authentication.',
            'Regular security testing for AI-specific vulnerabilities (e.g., prompt injection).',
            'Logical separation of training and inference environments.',
          ],
        },
        {
          category: 'Operational Controls',
          items: [
            'Monitoring for model drift and anomalous inference patterns.',
            'Documented process for model versioning and rollback.',
            'Formal AI Acceptable Use Policy for employees.',
            'Human-in-the-loop (HITL) processes for high-stakes AI decisions.',
          ],
        },
      ]}
      commonPitfalls={[
        'Storing sensitive training data in unencrypted S3 buckets.',
        'Lack of visibility into third-party LLM provider data handling (e.g., OpenAI Enterprise BAAs).',
        'Assuming standard web application firewalls (WAFs) protect against prompt injection.',
        'Failure to document the "black box" nature of AI models during risk assessments.',
      ]}
    />
  );
}
