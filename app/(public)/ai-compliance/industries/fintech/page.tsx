import { Metadata } from 'next';
import AIIndustryPage from '@/components/AIIndustryPage';

export const metadata: Metadata = {
  title: 'AI Compliance for Fintech | EU AI Act & ISO 42001 Guide | RiscLens',
  description: 'Fintech AI compliance guide covering EU AI Act high-risk classifications for credit scoring, fraud detection, and algorithmic trading systems.',
  alternates: { canonical: 'https://risclens.com/ai-compliance/industries/fintech' },
};

export default function FintechAICompliancePage() {
  return (
    <AIIndustryPage
      industryName="Fintech"
      industrySlug="fintech"
      heroDescription="Financial services AI affecting creditworthiness and access to essential services is classified as high-risk under the EU AI Act. Credit scoring, fraud detection, and risk assessment AI require rigorous compliance."
      euAiActRiskLevel="high-risk"
      riskCategories={[
        {
          level: 'high-risk',
          title: 'Credit & Risk Assessment',
          description: 'AI systems evaluating creditworthiness or determining access to financial services.',
          examples: ['Credit scoring algorithms', 'Loan approval models', 'Insurance underwriting AI', 'Mortgage risk assessment']
        },
        {
          level: 'high-risk',
          title: 'Fraud Detection & AML',
          description: 'AI systems making decisions that can restrict financial access.',
          examples: ['Transaction fraud scoring', 'AML/KYC screening', 'Account suspension triggers', 'Identity verification AI']
        },
        {
          level: 'limited',
          title: 'Customer-Facing AI',
          description: 'AI systems interacting with customers requiring transparency.',
          examples: ['Financial advisory chatbots', 'Robo-advisors', 'Customer service automation', 'Spending insights AI']
        },
        {
          level: 'minimal',
          title: 'Back-Office AI',
          description: 'Administrative and operational AI with minimal customer impact.',
          examples: ['Document processing', 'Reconciliation automation', 'Report generation', 'Market data analysis']
        }
      ]}
      keyRequirements={[
        {
          title: 'Explainability for Credit Decisions',
          description: 'Provide clear explanations for credit denials and adverse actions. Enable customers to understand factors influencing AI decisions.',
          frameworks: ['EU AI Act Art. 13', 'ISO 42001 Clause 8.4', 'ECOA', 'FCRA']
        },
        {
          title: 'Fair Lending & Bias Testing',
          description: 'Test AI models for disparate impact across protected classes. Document fair lending analysis and implement bias mitigation.',
          frameworks: ['EU AI Act Art. 10', 'ISO 42001 Clause 6.1', 'Fair Lending Laws']
        },
        {
          title: 'Model Risk Management',
          description: 'Implement SR 11-7 compliant model risk management for AI. Document model development, validation, and ongoing monitoring.',
          frameworks: ['EU AI Act Art. 9', 'ISO 42001 Clause 8.3', 'OCC SR 11-7']
        },
        {
          title: 'Human Oversight for High-Stakes Decisions',
          description: 'Ensure meaningful human review for credit denials, account closures, and fraud holds. Design escalation workflows.',
          frameworks: ['EU AI Act Art. 14', 'ISO 42001 Clause 8.1', 'CFPB Guidelines']
        },
        {
          title: 'Data Governance & Privacy',
          description: 'Implement robust data governance for financial data used in AI. Ensure compliance with privacy regulations and data localization.',
          frameworks: ['EU AI Act Art. 10', 'ISO 42001 Clause 7.2', 'GDPR', 'GLBA']
        },
        {
          title: 'Audit Trail & Regulatory Reporting',
          description: 'Maintain comprehensive logs for regulatory examination. Enable reconstruction of AI-assisted decisions.',
          frameworks: ['EU AI Act Art. 12', 'ISO 42001 Clause 9.2', 'Bank Examination']
        }
      ]}
      implementationSteps={[
        'Inventory all AI systems affecting customer financial access or outcomes',
        'Classify AI systems under EU AI Act and applicable financial regulations',
        'Implement fair lending testing and disparate impact analysis',
        'Design explainability features for customer-facing credit decisions',
        'Establish model risk management program aligned with SR 11-7',
        'Create human review workflows for adverse action decisions',
        'Implement audit logging for regulatory examination readiness',
        'Train staff on AI limitations and proper escalation procedures'
      ]}
      faqs={[
        {
          question: 'How does the EU AI Act interact with existing banking regulations?',
          answer: 'The EU AI Act adds AI-specific requirements on top of existing financial regulations. You must satisfy both traditional model risk management (SR 11-7, MaRisk) and new AI governance requirements. ISO 42001 can help bridge these frameworks.'
        },
        {
          question: 'Is fraud detection AI subject to high-risk requirements?',
          answer: 'Fraud detection AI that can result in account restrictions or denials of service is considered high-risk. Systems that merely flag for human review may have reduced requirements, but the final decision workflow determines classification.'
        },
        {
          question: 'What about algorithmic trading AI?',
          answer: 'Algorithmic trading is not explicitly listed as high-risk in Annex III, but market manipulation detection and risk management AI may qualify. Existing MiFID II and MAR requirements continue to apply.'
        },
        {
          question: 'How do we explain AI credit decisions to customers?',
          answer: 'Implement "reason codes" explaining the top factors influencing AI decisions. Provide specific, actionable information about why applications were declined and what customers can do to improve their standing.'
        }
      ]}
    />
  );
}
