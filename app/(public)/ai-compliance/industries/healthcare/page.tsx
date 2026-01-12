import { Metadata } from 'next';
import AIIndustryPage from '@/components/AIIndustryPage';

export const metadata: Metadata = {
  title: 'AI Compliance for Healthcare | EU AI Act & ISO 42001 Guide | RiscLens',
  description: 'Healthcare AI compliance guide covering EU AI Act high-risk classifications, ISO 42001 requirements for medical devices, diagnostic AI, and clinical decision support systems.',
  alternates: { canonical: 'https://risclens.com/ai-compliance/industries/healthcare' },
};

export default function HealthcareAICompliancePage() {
  return (
    <AIIndustryPage
      industryName="Healthcare"
      industrySlug="healthcare"
      heroDescription="Healthcare AI systems are classified as high-risk under the EU AI Act. From diagnostic imaging to clinical decision support, your AI must meet rigorous safety, transparency, and governance requirements."
      euAiActRiskLevel="high-risk"
      riskCategories={[
        {
          level: 'high-risk',
          title: 'Medical Devices & Diagnostics',
          description: 'AI systems intended for medical diagnosis, prognosis, or treatment recommendations.',
          examples: ['AI-powered radiology analysis', 'Pathology slide interpretation', 'Symptom checkers recommending treatment', 'Predictive patient deterioration alerts']
        },
        {
          level: 'high-risk',
          title: 'Clinical Decision Support',
          description: 'Systems that influence clinical decisions about patient care.',
          examples: ['Drug interaction checkers', 'Treatment pathway recommendations', 'Risk stratification models', 'Sepsis prediction algorithms']
        },
        {
          level: 'limited',
          title: 'Patient-Facing Chatbots',
          description: 'AI systems interacting with patients requiring transparency disclosures.',
          examples: ['Appointment scheduling bots', 'Symptom triage chatbots', 'Mental health support assistants', 'Medication reminder systems']
        },
        {
          level: 'minimal',
          title: 'Administrative AI',
          description: 'Back-office AI with minimal patient impact.',
          examples: ['Medical coding automation', 'Claims processing optimization', 'Supply chain management', 'Staff scheduling algorithms']
        }
      ]}
      keyRequirements={[
        {
          title: 'Clinical Validation & Testing',
          description: 'AI systems must be validated against clinical outcomes with representative patient populations. Document sensitivity, specificity, and performance across demographic groups.',
          frameworks: ['EU AI Act Art. 9', 'ISO 42001 Clause 8.3', 'FDA AI/ML Guidance']
        },
        {
          title: 'Bias Testing Across Demographics',
          description: 'Test and document AI performance across age, sex, ethnicity, and health conditions. Implement ongoing monitoring for performance drift.',
          frameworks: ['EU AI Act Art. 10', 'ISO 42001 Clause 6.1', 'NIST AI RMF']
        },
        {
          title: 'Human-in-the-Loop Requirements',
          description: 'Clinical AI must support, not replace, clinician judgment. Design for appropriate human oversight in diagnostic and treatment decisions.',
          frameworks: ['EU AI Act Art. 14', 'ISO 42001 Clause 8.1', 'MDR 2017/745']
        },
        {
          title: 'Explainability for Clinicians',
          description: 'Provide clinicians with interpretable outputs explaining AI reasoning. Document model logic and limitations in clinical contexts.',
          frameworks: ['EU AI Act Art. 13', 'ISO 42001 Clause 8.4', 'HIPAA']
        },
        {
          title: 'Patient Data Governance',
          description: 'Implement robust data governance for PHI used in AI training and inference. Ensure HIPAA compliance and EU data protection requirements.',
          frameworks: ['EU AI Act Art. 10', 'ISO 42001 Clause 7.2', 'HIPAA', 'GDPR']
        },
        {
          title: 'Continuous Performance Monitoring',
          description: 'Implement real-time monitoring for model drift, accuracy degradation, and adverse events. Establish incident response protocols.',
          frameworks: ['EU AI Act Art. 61', 'ISO 42001 Clause 9.1', 'FDA Post-Market']
        }
      ]}
      implementationSteps={[
        'Inventory all AI systems touching patient care or clinical workflows',
        'Classify each system under EU AI Act risk tiers and MDR/IVDR where applicable',
        'Conduct clinical validation studies with diverse patient populations',
        'Implement bias testing and demographic performance analysis',
        'Design human oversight workflows for high-risk clinical AI',
        'Establish data governance for PHI in AI pipelines',
        'Document model explainability and clinician-facing disclosures',
        'Create incident response and adverse event reporting processes'
      ]}
      faqs={[
        {
          question: 'Does the EU AI Act apply if we only serve US patients?',
          answer: 'If your AI system is used to make decisions about EU citizens or is marketed in the EU, the AI Act applies. Many US healthcare companies with international operations or EU customers will need to comply.'
        },
        {
          question: 'How does the EU AI Act interact with FDA AI/ML regulations?',
          answer: 'They are complementary but distinct. FDA focuses on safety and effectiveness for US market authorization. The EU AI Act adds transparency, bias testing, and governance requirements. Organizations selling in both markets need to satisfy both frameworks.'
        },
        {
          question: 'Is ISO 42001 required for healthcare AI?',
          answer: 'Not legally required, but increasingly expected by health systems and payers. ISO 42001 certification demonstrates systematic AI governance and can streamline EU AI Act compliance. Many procurement processes now ask about AI management systems.'
        },
        {
          question: 'What about AI used only for research, not clinical care?',
          answer: 'Research-only AI may fall outside high-risk classifications if not used for clinical decisions. However, if research AI informs patient care or transitions to clinical use, it becomes subject to full requirements.'
        }
      ]}
    />
  );
}
