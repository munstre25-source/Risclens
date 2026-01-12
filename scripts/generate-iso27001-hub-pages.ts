import { getSupabaseAdmin } from '../lib/supabase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface Framework {
  id: string;
  name: string;
  slug: string;
}

interface Industry {
  id: string;
  name: string;
  slug: string;
}

interface DecisionType {
  id: string;
  name: string;
  slug: string;
}

const industryKnowledge: Record<string, string> = {
  'fintech': 'financial transaction security, banking data isolation, and regulatory reporting for fintech applications',
  'saas': 'multi-tenant cloud architecture, API endpoint security, and customer data privacy in SaaS environments',
  'healthtech': 'ePHI protection, clinical system integration security, and HIPAA-aligned ISMS controls',
  'ecommerce': 'payment gateway security, customer PII protection, and supply chain integrity for retail platforms',
  'ai-ml': 'model training data security, algorithmic transparency, and large-scale data processing protection',
  'edtech': 'student data privacy (FERPA/COPPA), learning management system security, and educational institutional compliance',
  'crypto-web3': 'private key management, smart contract security audits, and decentralized infrastructure protection',
  'msp-mssp': 'client data segregation, multi-customer security management, and service delivery integrity',
};

const categoryTemplates: Record<string, any> = {
  'cost': {
    title: 'ISO 27001 Certification Cost for {industry} | 2026 Price Guide',
    description: 'Breakdown of ISO 27001 audit fees, implementation costs, and resource requirements for {industry} companies.',
    getHighlights: (ind: string) => [
      `Average Stage 1 and Stage 2 audit fees for ${ind} startups`,
      'Internal resource allocation vs. compliance automation savings',
      'ISMS maintenance costs and surveillance audit budgeting',
      'Hidden expenses: gap analysis, risk assessment tools, and training',
      'ROI analysis: how ISO 27001 reduces security review overhead by 60%'
    ],
    getFaqs: (ind: string) => [
      { question: `What is the total cost of ISO 27001 for a ${ind} company?`, answer: `For mid-sized ${ind} firms, total costs typically range from $30,000 to $60,000, including audit fees and implementation resources.` },
      { question: 'Does automation reduce certification costs?', answer: 'Yes, using compliance automation can reduce implementation time by 50% and lower internal resource costs by up to $20,000.' }
    ]
  },
  'timeline': {
    title: 'ISO 27001 Implementation Timeline for {industry}',
    description: 'Step-by-step roadmap for achieving ISO 27001 certification in {industry}. Typical phases and timeframes.',
    getHighlights: (ind: string) => [
      'Phase 1: Gap Analysis and Scoping (2-4 weeks)',
      'Phase 2: ISMS Design and Risk Treatment (4-8 weeks)',
      'Phase 3: Control Implementation and Evidence Gathering (8-12 weeks)',
      'Phase 4: Internal Audit and Management Review (2-4 weeks)',
      'Phase 5: Stage 1 & Stage 2 Certification Audits (4-8 weeks)'
    ],
    getFaqs: (ind: string) => [
      { question: `Can a ${ind} startup get certified in 3 months?`, answer: 'While aggressive, it is possible with high maturity and dedicated automation tools. Most companies take 6-9 months.' },
      { question: 'What causes the most delays in ISO 27001?', answer: 'Delays usually occur during risk treatment implementation and gathering operational evidence for Annex A controls.' }
    ]
  },
  'audit': {
    title: 'ISO 27001 Audit Guide for {industry} | Auditor Selection',
    description: 'How to prepare for your Stage 1 and Stage 2 ISO 27001 audits in the {industry} sector.',
    getHighlights: (ind: string) => [
      'Criteria for selecting an accredited ISO 27001 registrar',
      'Difference between Stage 1 (Documentation) and Stage 2 (Effectiveness)',
      `Specific audit focus areas for ${ind} technology stacks`,
      'Common non-conformities found in information security audits',
      'Preparing your team for auditor interviews and site visits'
    ],
    getFaqs: (ind: string) => [
      { question: 'What happens if we fail the Stage 1 audit?', answer: 'Stage 1 identifies gaps. You will have time to remediate them before the critical Stage 2 audit begins.' },
      { question: `Which auditors specialize in ${ind}?`, answer: 'Look for registrars with experience in cloud-native and high-compliance sectors like yours.' }
    ]
  },
  'implementation': {
    title: 'How to Implement ISO 27001 for {industry} | ISMS Guide',
    description: 'Building a robust Information Security Management System (ISMS) tailored to {industry} workflows.',
    getHighlights: (ind: string) => [
      'Defining the ISMS scope for cloud-native architectures',
      `Mapping Annex A controls to ${ind}-specific data flows`,
      'Developing the Statement of Applicability (SoA)',
      'Integrating security into the CI/CD pipeline and dev workflows',
      'Establishing a culture of continuous security improvement'
    ],
    getFaqs: (ind: string) => [
      { question: 'What is the most critical part of implementation?', answer: 'The risk assessment methodology. It forms the foundation for all controls selected in your ISMS.' },
      { question: `Does ISO 27001 require specific tools for ${ind}?`, answer: 'The standard is tool-agnostic, but version control, access management, and logging tools are essential for evidence.' }
    ]
  },
  'checklist': {
    title: 'ISO 27001 Readiness Checklist for {industry}',
    description: 'Comprehensive readiness checklist for ISO 27001 Annex A controls and ISMS requirements for {industry}.',
    getHighlights: (ind: string) => [
      'Inventory of assets and information classification',
      'Access control policy and authentication standards',
      'Physical and environmental security for remote/office teams',
      'Operational security: backup, logging, and monitoring',
      'Incident management and business continuity planning'
    ],
    getFaqs: (ind: string) => [
      { question: 'Is the checklist different for every industry?', answer: 'The core requirements are the same, but the implementation of controls varies based on your specific risk profile.' },
      { question: 'Can we use this checklist for our internal audit?', answer: 'Yes, this checklist is designed to align with the internal audit requirements of Clause 9.2.' }
    ]
  },
  'roi': {
    title: 'The Business Value & ROI of ISO 27001 for {industry}',
    description: 'Why {industry} companies invest in ISO 27001. Analyzing sales acceleration and risk mitigation ROI.',
    getHighlights: (ind: string) => [
      'Accelerating enterprise sales cycles by 40-50%',
      'Eliminating repetitive security questionnaires from prospects',
      'Reducing cyber insurance premiums and breach risk',
      'Building global trust for international market expansion',
      'Competitive differentiation in crowded B2B marketplaces'
    ],
    getFaqs: (ind: string) => [
      { question: 'Is ISO 27001 worth it for early-stage startups?', answer: 'If you target enterprise or international customers, it often pays for itself by closing a single major deal.' },
      { question: 'How does ISO 27001 impact security reviews?', answer: 'It serves as a "trust passport," allowing prospects to skip detailed technical audits in many cases.' }
    ]
  }
};

async function run() {
  const supabase = getSupabaseAdmin();
  
  const { data: framework } = await supabase.from('pseo_frameworks').select('*').eq('slug', 'iso-27001').single();
  const { data: industries } = await supabase.from('pseo_industries').select('*');
  const { data: decisions } = await supabase.from('pseo_decision_types').select('*');

  if (!framework || !industries || !decisions) {
    console.error('Missing data for generation');
    return;
  }

  const targetDecisions = decisions.filter(d => categoryTemplates[d.slug]);

  console.log(`Generating ISO 27001 pages for ${industries.length} industries and ${targetDecisions.length} categories...`);

  let created = 0;
  let skipped = 0;

  for (const industry of industries) {
    for (const decision of targetDecisions) {
      const slug = `${decision.slug}/${industry.slug}`; // Note: the URL structure is /iso-27001/[slug]/[industry]
      const fullSlug = `iso-27001-${decision.slug}-for-${industry.slug}`; // Database slug for uniqueness
      
      const { data: existing } = await supabase.from('pseo_pages').select('id').eq('slug', fullSlug).single();
      if (existing) {
        skipped++;
        continue;
      }

      const template = categoryTemplates[decision.slug];
      const indName = industry.name;
      const industryCtx = industryKnowledge[industry.slug] || `security requirements for the ${indName} sector`;

      const title = template.title.replace('{industry}', indName);
      const description = template.description.replace('{industry}', indName);
      
      const content = {
        title,
        meta_description: description,
        heroDescription: `Achieving ISO 27001 ${decision.name} is a strategic milestone for ${indName} companies. Our guide provides the specific benchmarks and implementation data you need to secure ${industryCtx} and build lasting customer trust.`,
        keyPriorities: template.getHighlights(indName).map((h: string, i: number) => ({
          title: h.split(':')[0] || 'Key Focus',
          description: h.split(':')[1] || h
        })),
        faqs: template.getFaqs(indName)
      };

      try {
        const { error } = await supabase.from('pseo_pages').insert({
          slug: fullSlug, // We'll store it with a unique name, but the router will find it by framework+decision+industry
          title,
          meta_description: description,
          content_json: content,
          framework_id: framework.id,
          industry_id: industry.id,
          decision_type_id: decision.id,
          category: 'compliance',
        });

        if (error) throw error;
        created++;
      } catch (err) {
        console.error(`Failed to generate ${fullSlug}:`, err);
      }
    }
  }

  console.log(`\nISO 27001 Generation Finished! Created: ${created}, Skipped: ${skipped}`);
}

run();
