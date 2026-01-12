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

interface Role {
  id: string;
  name: string;
  slug: string;
}

interface DecisionType {
  id: string;
  name: string;
  slug: string;
}

const industryPainPoints: Record<string, string[]> = {
  fintech: [
    'Managing multi-jurisdictional financial regulations',
    'Securing high-frequency transaction data',
    'Third-party risk management for banking partners',
    'Mapping ISO 27001 controls to PCI DSS and SOC 2',
  ],
  healthcare: [
    'HIPAA alignment and PHI protection',
    'Medical device security and IoT vulnerabilities',
    'Patient data privacy across distributed systems',
    'Audit logging for clinical data access',
  ],
  saas: [
    'Multi-tenant cloud architecture security',
    'Rapid CI/CD pipeline integrity',
    'Customer-facing trust and security portals',
    'Scalable evidence automation for global clients',
  ],
  'ai-ml': [
    'Training data provenance and protection',
    'Model governance and algorithmic transparency',
    'Protecting intellectual property in LLM deployments',
    'Securing API endpoints for real-time inference',
  ],
  proptech: [
    'Tenant data privacy and building management security',
    'IoT security for smart building infrastructure',
    'Transaction security for real estate payments',
  ],
  'hr-tech': [
    'Employee PII protection and GDPR compliance',
    'Secure integration with payroll and benefit providers',
    'Access control for sensitive people operations data',
  ],
};

function generateDecisionContent(framework: Framework, industry: Industry, decision: DecisionType) {
  const isCost = decision.slug.includes('cost');
  const isTimeline = decision.slug.includes('timeline');
  const isChecklist = decision.slug.includes('checklist');
  const isROI = decision.slug.includes('roi');

  let title = `${framework.name} ${decision.name} for ${industry.name} Startups (2026)`;
  let metaDescription = `Calculate and optimize your ${framework.name} ${decision.name} as a ${industry.name} company. Expert benchmarks and implementation strategies.`;

  if (isCost) {
    title = `ISO 27001 Certification Cost for ${industry.name} | 2026 Budget Guide`;
    metaDescription = `How much does ISO 27001 cost for a ${industry.name} startup? Breakdown of audit fees, implementation costs, and automation ROI.`;
  } else if (isChecklist) {
    title = `ISO 27001 Implementation Checklist for ${industry.name} Companies`;
    metaDescription = `A step-by-step ISO 27001 checklist tailored for ${industry.name}. Cover Clauses 4-10 and Annex A with industry-specific evidence.`;
  }

  const painPoints = industryPainPoints[industry.slug] || [
    'Balancing security rigor with operational velocity',
    'Manual evidence collection overhead',
    'Complex vendor risk management',
  ];

  const content = {
    title,
    summary: `For ${industry.name} companies, achieving ${framework.name} ${decision.name} is a strategic milestone. This guide provides data-driven benchmarks to help you plan effectively, avoid common pitfalls, and accelerate your time-to-compliance.`,
    highlights: [
      `Tailored ${decision.name} benchmarks for ${industry.name} Seed to Series C stages.`,
      `Critical ${industry.name} risks: ${painPoints.join(', ')}.`,
      'Evidence automation strategies to reduce manual burden by up to 60%.',
      'Integration with GRC platforms (Vanta, Drata, etc.) specifically for cloud-native workflows.',
    ],
    faqs: [
      {
        question: `What is the average ${decision.name} for ${framework.name} in ${industry.name}?`,
        answer: `While it varies by team size, most ${industry.name} startups find that ${decision.name} is heavily influenced by the maturity of their ISMS and the choice of accredited registrar. For ${industry.name}, specialized controls around ${painPoints[0]} often impact the final outcome.`,
      },
      {
        question: `How can we optimize our ${framework.name} ${decision.name}?`,
        answer: `The most effective way for ${industry.name} companies to optimize ${decision.name} is through early internal audits and selecting tools that automate the Annex A control evidence collection. This is particularly important for ${industry.name} firms due to high-velocity engineering cultures.`,
      },
    ],
    expertVerified: true,
    lastUpdated: '2026-01-12',
  };

  return { title, metaDescription, content };
}

function generateRoleContent(framework: Framework, industry: Industry, role: Role) {
  const title = `ISO 27001 Compliance Strategy for ${industry.name} ${role.name}s`;
  const metaDescription = `A tactical guide for ${role.name}s at ${industry.name} startups navigating ISO 27001. Implementation priorities and accountability mapping.`;

  const roleFocus = {
    cto: 'technical architecture, evidence automation, and secure SDLC integration',
    ciso: 'risk management framework, policy governance, and auditor relationships',
    founders: 'business case for certification, resource allocation, and ROI tracking',
    'security-engineer': 'control implementation, vulnerability management, and technical evidence collection',
    'compliance-manager': 'documentation, internal audits, and continuous improvement processes',
  }[role.slug] || 'compliance oversight and operational security';

  const content = {
    title,
    summary: `As a ${role.name} at a ${industry.name} startup, your role in ${framework.name} certification is pivotal. You must balance the technical requirements of the ISMS with the operational needs of a fast-growing business.`,
    highlights: [
      `Your primary focus: ${roleFocus}.`,
      `${industry.name}-specific risk mapping for ${role.name} accountability.`,
      'Streamlining evidence collection across engineering and operations teams.',
      'Maintaining a continuous compliance posture that supports enterprise sales.',
    ],
    faqs: [
      {
        question: `What is the most critical task for a ${role.name} in ${framework.name}?`,
        answer: `For a ${role.name} in the ${industry.name} sector, the most critical task is ensuring that the ISMS scope correctly reflects the technical risks associated with ${industryPainPoints[industry.slug]?.[0] || 'customer data handling'}.`,
      },
      {
        question: `How does ${framework.name} benefit a ${industry.name} ${role.name}?`,
        answer: `Certification reduces the burden of manual security questionnaires from enterprise prospects by up to 70%, allowing you to focus on core ${role.name} responsibilities.`,
      },
    ],
    expertVerified: true,
    lastUpdated: '2026-01-12',
  };

  return { title, metaDescription, content };
}

async function run() {
  const supabase = getSupabaseAdmin();
  const frameworkSlug = 'iso-27001';

  const { data: framework } = await supabase.from('pseo_frameworks').select('*').eq('slug', frameworkSlug).single();
  const { data: industries } = await supabase.from('pseo_industries').select('*');
  const { data: roles } = await supabase.from('pseo_roles').select('*');
  const { data: decisions } = await supabase.from('pseo_decision_types').select('*');

  if (!framework || !industries || !roles || !decisions) {
    console.error('Missing required metadata tables');
    return;
  }

  console.log(`Targeting ${industries.length} industries, ${roles.length} roles, and ${decisions.length} decisions.`);

  let count = 0;

  // 1. Generate Decision Pages
  for (const industry of industries) {
    for (const decision of decisions) {
      // Filter for relevant high-intent decisions
      if (!['cost', 'timeline', 'checklist', 'readiness', 'roi'].includes(decision.slug)) continue;

      const pageSlug = `iso-27001-${decision.slug}-for-${industry.slug}`;
      const { title, metaDescription, content } = generateDecisionContent(framework, industry, decision);

      const { error } = await supabase.from('pseo_pages').upsert({
        slug: pageSlug,
        title,
        meta_description: metaDescription,
        content_json: content,
        framework_id: framework.id,
        industry_id: industry.id,
        decision_type_id: decision.id,
        category: 'compliance',
      }, { onConflict: 'slug' });

      if (error) console.error(`Error creating ${pageSlug}:`, error);
      else count++;
    }
  }

  // 2. Generate Role Pages
  for (const industry of industries) {
    for (const role of roles) {
      // Filter for high-intent roles
      if (!['cto', 'ciso', 'founders', 'security-engineer', 'compliance-manager'].includes(role.slug)) continue;

      const pageSlug = `iso-27001-for-${role.slug}-at-${industry.slug}`;
      const { title, metaDescription, content } = generateRoleContent(framework, industry, role);

      const { error } = await supabase.from('pseo_pages').upsert({
        slug: pageSlug,
        title,
        meta_description: metaDescription,
        content_json: content,
        framework_id: framework.id,
        industry_id: industry.id,
        role_id: role.id,
        category: 'compliance',
      }, { onConflict: 'slug' });

      if (error) console.error(`Error creating ${pageSlug}:`, error);
      else count++;
    }
  }

  console.log(`Successfully generated ${count} ISO 27001 Hub pages.`);
}

run();
