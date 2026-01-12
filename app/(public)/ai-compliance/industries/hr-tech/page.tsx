import { Metadata } from 'next';
import AIIndustryPage from '@/components/AIIndustryPage';

export const metadata: Metadata = {
  title: 'AI Compliance for HR-Tech | EU AI Act & ISO 42001 Guide | RiscLens',
  description: 'HR-Tech AI compliance guide covering EU AI Act high-risk classifications for resume screening, interview analysis, and performance evaluation systems.',
  alternates: { canonical: 'https://risclens.com/ai-compliance/industries/hr-tech' },
};

export default function HRTechAICompliancePage() {
  return (
    <AIIndustryPage
      industryName="HR-Tech"
      industrySlug="hr-tech"
      heroDescription="Employment-related AI is explicitly classified as high-risk under the EU AI Act. Resume screening, interview analysis, and performance management AI face the strictest compliance requirements."
      euAiActRiskLevel="high-risk"
      riskCategories={[
        {
          level: 'high-risk',
          title: 'Recruitment & Hiring AI',
          description: 'AI systems used in recruitment, candidate screening, and hiring decisions.',
          examples: ['Resume/CV screening and ranking', 'AI-powered candidate sourcing', 'Video interview analysis', 'Skill and personality assessments']
        },
        {
          level: 'high-risk',
          title: 'Performance & Workforce Management',
          description: 'AI influencing employee evaluation, promotion, and termination decisions.',
          examples: ['Performance review scoring', 'Promotion recommendation systems', 'Productivity monitoring AI', 'Workforce planning algorithms']
        },
        {
          level: 'limited',
          title: 'Employee-Facing Chatbots',
          description: 'AI systems interacting with employees requiring transparency.',
          examples: ['HR helpdesk chatbots', 'Benefits inquiry assistants', 'Onboarding virtual assistants', 'Policy Q&A systems']
        },
        {
          level: 'minimal',
          title: 'Administrative HR AI',
          description: 'Back-office automation with minimal impact on employment decisions.',
          examples: ['Payroll processing automation', 'Time tracking optimization', 'Meeting scheduling AI', 'Document processing']
        }
      ]}
      keyRequirements={[
        {
          title: 'Bias Testing & Mitigation',
          description: 'Mandatory testing for discrimination across protected characteristics: gender, race, age, disability. Document adverse impact analysis and remediation steps.',
          frameworks: ['EU AI Act Art. 10', 'ISO 42001 Clause 6.1', 'EEOC Guidelines']
        },
        {
          title: 'Transparency to Candidates',
          description: 'Candidates must be informed when AI is used in hiring decisions. Provide clear explanations of how AI assessments influence outcomes.',
          frameworks: ['EU AI Act Art. 13', 'ISO 42001 Clause 8.4', 'GDPR Art. 22']
        },
        {
          title: 'Human Review Requirements',
          description: 'All significant employment decisions must include meaningful human oversight. AI should augment, not replace, human judgment.',
          frameworks: ['EU AI Act Art. 14', 'ISO 42001 Clause 8.1', 'NYC Local Law 144']
        },
        {
          title: 'Data Quality for Training',
          description: 'Training data must be representative and free from historical bias. Document data sources, cleaning procedures, and quality controls.',
          frameworks: ['EU AI Act Art. 10', 'ISO 42001 Clause 7.2', 'NIST AI RMF']
        },
        {
          title: 'Audit Trail & Record Keeping',
          description: 'Maintain comprehensive logs of AI-assisted decisions for audit and dispute resolution. Enable reconstruction of decision rationale.',
          frameworks: ['EU AI Act Art. 12', 'ISO 42001 Clause 9.2', 'Employment Law']
        },
        {
          title: 'Regular Bias Audits',
          description: 'Conduct annual (or more frequent) bias audits with results publicly disclosed. Implement ongoing monitoring for disparate impact.',
          frameworks: ['EU AI Act Art. 61', 'ISO 42001 Clause 9.1', 'NYC Local Law 144']
        }
      ]}
      implementationSteps={[
        'Audit all AI touchpoints in the employee lifecycle from sourcing to termination',
        'Conduct baseline bias testing across protected characteristics',
        'Implement candidate notification and consent workflows',
        'Design human-in-the-loop processes for all hiring and performance decisions',
        'Establish data governance for employment records used in AI',
        'Create public-facing bias audit disclosure processes',
        'Train HR staff on AI limitations and proper oversight',
        'Implement grievance and appeal mechanisms for AI-influenced decisions'
      ]}
      faqs={[
        {
          question: 'Does NYC Local Law 144 overlap with the EU AI Act?',
          answer: 'Yes, both require bias audits and candidate notification for hiring AI. However, the EU AI Act has broader scope covering performance management and promotion decisions. Organizations operating in both jurisdictions should design compliance programs that satisfy both frameworks.'
        },
        {
          question: 'Can we use AI for resume screening without human review?',
          answer: 'Under the EU AI Act, high-risk employment AI requires meaningful human oversight. Fully automated rejection of candidates without human review would likely violate compliance requirements. Design workflows where AI assists human decision-makers.'
        },
        {
          question: 'What about AI used for internal mobility, not external hiring?',
          answer: 'The EU AI Act explicitly covers AI used for "task allocation based on individual behavior or personal traits" and "monitoring and evaluation of performance." Internal mobility and promotion systems using AI are subject to the same high-risk requirements.'
        },
        {
          question: 'How do we handle AI vendor compliance?',
          answer: 'As a "deployer" under the EU AI Act, you share compliance responsibility with AI vendors. Require vendors to provide conformity assessments, bias testing documentation, and technical documentation. Include AI Act compliance clauses in vendor contracts.'
        }
      ]}
    />
  );
}
