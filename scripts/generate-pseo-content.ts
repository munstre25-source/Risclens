import { getSupabaseAdmin } from '../lib/supabase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface Framework {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const frameworkHighlights: Record<string, string[]> = {
  'soc-2': [
    'Trust Services Criteria coverage for security, availability, and confidentiality',
    'Type I vs Type II audit preparation and timeline optimization',
    'Evidence collection automation and continuous monitoring',
    'Vendor and subservice organization management',
    'Control mapping to industry-specific requirements',
  ],
  'iso-27001': [
    'Information Security Management System (ISMS) implementation',
    'Risk assessment and treatment methodology',
    'Statement of Applicability (SoA) development',
    'Internal audit and management review processes',
    'Certification body selection and audit preparation',
  ],
  'hipaa': [
    'Protected Health Information (PHI) safeguards',
    'Administrative, physical, and technical security controls',
    'Business Associate Agreement (BAA) requirements',
    'Breach notification and incident response procedures',
    'Privacy Rule and Security Rule compliance mapping',
  ],
  'gdpr': [
    'Data subject rights implementation and management',
    'Lawful basis for processing documentation',
    'Data Protection Impact Assessment (DPIA) procedures',
    'Cross-border data transfer mechanisms',
    'Data Processing Agreement (DPA) requirements',
  ],
  'pci-dss': [
    'Cardholder data environment (CDE) scope reduction',
    'Network segmentation and access control implementation',
    'Encryption and key management best practices',
    'Vulnerability management and penetration testing',
    'Self-Assessment Questionnaire (SAQ) selection guidance',
  ],
  'nist-csf': [
    'Five core functions: Identify, Protect, Detect, Respond, Recover',
    'Implementation tiers and maturity assessment',
    'Framework profile development and gap analysis',
    'Supply chain risk management integration',
    'Continuous improvement and metrics tracking',
  ],
};

const industryContexts: Record<string, string> = {
  'saas': 'cloud-based software delivery, multi-tenant architecture, and API security',
  'fintech': 'financial data protection, transaction security, and regulatory oversight',
  'healthcare': 'patient data privacy, clinical systems security, and medical device integration',
  'ecommerce': 'payment processing, customer data protection, and supply chain security',
  'edtech': 'student data privacy (FERPA/COPPA), learning platform security, and institutional compliance',
  'ai-data': 'model governance, training data protection, and algorithmic transparency',
  'marketplace': 'two-sided platform security, user trust, and transactional integrity',
  'enterprise': 'complex organizational security, legacy integration, and scale requirements',
  'startup': 'rapid growth security, foundational compliance, and cost-effective controls',
  'government': 'strict regulatory standards, public sector security, and information assurance',
};

const industryFAQs: Record<string, Record<string, { question: string; answer: string }[]>> = {
  'soc-2': {
    'saas': [
      { question: 'How long does SOC 2 certification take for a SaaS company?', answer: 'Most SaaS companies can achieve SOC 2 Type I in 3-6 months, with Type II requiring an additional 6-12 month observation period. Timeline depends on existing security maturity and resource allocation.' },
      { question: 'What Trust Services Criteria are most important for SaaS?', answer: 'Security is mandatory. Most SaaS companies also include Availability and Confidentiality. Processing Integrity and Privacy are added based on data handling and customer requirements.' },
      { question: 'Can we use our existing cloud provider\'s SOC 2 report?', answer: 'Your cloud provider\'s SOC 2 (e.g., AWS, Azure) covers their infrastructure controls. You still need your own SOC 2 covering application-level controls, access management, and operational procedures.' },
    ],
    'fintech': [
      { question: 'Is SOC 2 sufficient for fintech regulatory compliance?', answer: 'SOC 2 is often a baseline requirement but may need to be combined with PCI DSS, state money transmitter requirements, or banking regulations depending on your specific services and jurisdictions.' },
      { question: 'How does SOC 2 help with enterprise fintech sales?', answer: 'Enterprise financial institutions typically require SOC 2 Type II reports before vendor onboarding. Having a clean report accelerates sales cycles and reduces due diligence friction by 40-60%.' },
      { question: 'What additional controls do fintech companies need?', answer: 'Fintech-specific controls include transaction monitoring, fraud detection procedures, financial data segregation, regulatory reporting capabilities, and enhanced change management for financial systems.' },
    ],
    'healthcare': [
      { question: 'Do healthcare companies need both SOC 2 and HIPAA?', answer: 'Yes, if handling PHI. HIPAA is legally required for covered entities and business associates. SOC 2 demonstrates operational security controls and is increasingly required by healthcare enterprise customers.' },
      { question: 'How do SOC 2 and HIPAA controls overlap?', answer: 'Approximately 60-70% of controls overlap, particularly in access management, encryption, audit logging, and incident response. A unified compliance program can address both efficiently.' },
      { question: 'What Trust Services Criteria map to HIPAA requirements?', answer: 'Security and Confidentiality criteria have the strongest HIPAA alignment. Privacy criteria can address HIPAA Privacy Rule requirements when properly scoped.' },
    ],
    'ai-data': [
      { question: 'How does SOC 2 apply to AI/ML model development?', answer: 'SOC 2 covers the infrastructure and processes around model development, including training data security, model versioning, access controls to production models, and monitoring for drift or anomalies.' },
      { question: 'What controls address training data security?', answer: 'Key controls include data provenance tracking, PII detection and handling in datasets, secure data pipeline architecture, and access restrictions to training environments and data stores.' },
      { question: 'Does SOC 2 cover AI bias and fairness?', answer: 'Traditional SOC 2 doesn\'t directly address algorithmic fairness. However, Processing Integrity criteria can be extended to cover model validation procedures and output quality assurance processes.' },
    ],
  },
  'iso-27001': {
    'saas': [
      { question: 'How does ISO 27001 differ from SOC 2 for SaaS companies?', answer: 'ISO 27001 is a management system certification requiring ongoing ISMS maintenance. SOC 2 is a point-in-time attestation. ISO 27001 is preferred for European markets; SOC 2 dominates North America.' },
      { question: 'What Annex A controls are most relevant for SaaS?', answer: 'Key controls include A.9 (Access Control), A.12 (Operations Security), A.14 (System Development), A.13 (Communications Security), and A.18 (Compliance). Cloud-specific guidance is in ISO 27017.' },
      { question: 'How long does ISO 27001 certification take?', answer: 'Initial certification typically takes 6-12 months depending on organizational size and existing security maturity. The certification is valid for 3 years with annual surveillance audits.' },
    ],
  },
};

function generatePageContent(framework: Framework, industry: Industry) {
  const frameworkSlug = framework.slug;
  const industrySlug = industry.slug;
  const industryContext = industryContexts[industrySlug] || 'industry-specific requirements';
  
  const title = `${framework.name} Compliance for ${industry.name} Companies | Complete Guide`;
  const metaDescription = `Expert guide to ${framework.name} compliance for ${industry.name}. Learn requirements, implementation steps, and best practices for achieving certification.`;
  
  const summary = `${framework.name} compliance is essential for ${industry.name} companies looking to demonstrate security maturity and meet customer expectations. This guide covers the key requirements, implementation strategies, and industry-specific considerations for ${industryContext}. Whether you're starting your compliance journey or optimizing an existing program, understanding ${framework.name} in the context of ${industry.name} operations is critical for success.`;
  
  const highlights = frameworkHighlights[frameworkSlug] || [
    'Comprehensive compliance requirements and controls',
    'Implementation timeline and resource planning',
    'Audit preparation and evidence collection',
    'Continuous monitoring and maintenance',
    'Integration with existing security programs',
  ];
  
  const faqs = industryFAQs[frameworkSlug]?.[industrySlug] || [
    { question: `How long does ${framework.name} compliance take for ${industry.name} companies?`, answer: `Timeline varies based on current security maturity, but most ${industry.name} organizations achieve compliance in 3-12 months with dedicated resources.` },
    { question: `What are the costs of ${framework.name} compliance?`, answer: `Costs depend on scope and approach. Budget for audit fees, tooling, and internal resources. Many ${industry.name} companies see ROI through reduced sales friction and risk mitigation.` },
    { question: `Do we need ${framework.name} if we have other certifications?`, answer: `Different frameworks serve different purposes. ${framework.name} may be required by specific customers or regulations. Evaluate based on your ${industry.name} market requirements.` },
  ];
  
  return {
    title,
    meta_description: metaDescription,
    summary,
    highlights,
    faqs,
  };
}

async function run() {
  const supabase = getSupabaseAdmin();
  
  const { data: frameworks, error: frameworksError } = await supabase.from('pseo_frameworks').select('*');
  const { data: industries, error: industriesError } = await supabase.from('pseo_industries').select('*');

  if (frameworksError || industriesError) {
    console.error('Error fetching data:', frameworksError || industriesError);
    return;
  }

  if (!frameworks || !industries) {
    console.error('Missing frameworks or industries');
    return;
  }

  console.log(`Generating content for ${frameworks.length * industries.length} combinations...`);

  let created = 0;
  let skipped = 0;

  for (const framework of frameworks) {
    for (const industry of industries) {
      const slug = `${framework.slug}-compliance-for-${industry.slug}`;
      
      const { data: existing } = await supabase.from('pseo_pages').select('id').eq('slug', slug).single();
      if (existing) {
        console.log(`Skipping existing page: ${slug}`);
        skipped++;
        continue;
      }

      console.log(`Generating: ${slug}`);
      try {
        const content = generatePageContent(framework, industry);
        
        const { error } = await supabase.from('pseo_pages').insert({
          slug,
          title: content.title,
          meta_description: content.meta_description,
          content_json: content,
          framework_id: framework.id,
          industry_id: industry.id,
          category: 'compliance',
        });

        if (error) throw error;
        created++;
      } catch (err) {
        console.error(`Failed to generate ${slug}:`, err);
      }
    }
  }

  console.log(`\nFinished! Created: ${created}, Skipped: ${skipped}`);
}

run();
