-- =============================================================================
-- AI GOVERNANCE pSEO EXPANSION MIGRATION
-- Date: 2026-01-17
-- Purpose: Add 400+ high-intent AI governance pages and expand company signals
-- =============================================================================

-- ============================================
-- PART 1: NEW AI GOVERNANCE DECISION TYPES
-- ============================================

INSERT INTO pseo_decision_types (name, slug, description) VALUES
-- AI-specific decisions
('AI Vendor Assessment', 'ai-vendor-assessment', 'Assessment framework for evaluating AI vendor compliance'),
('AI Risk Classification', 'ai-risk-classification', 'Classification methodology for AI system risks'),
('Model Governance', 'model-governance', 'Governance framework for AI/ML models'),
('AI Policy Development', 'ai-policy-development', 'Development of organizational AI policies'),
('Bias Detection', 'bias-detection', 'Methodologies for detecting AI bias'),
('Explainability Requirements', 'explainability-requirements', 'Requirements for AI decision explainability'),
('Human Oversight', 'human-oversight', 'Human oversight requirements for AI systems'),
('Data Governance', 'data-governance', 'Data governance for AI training and deployment'),
('Model Monitoring', 'model-monitoring', 'Continuous monitoring requirements for AI models'),
('Incident Response', 'ai-incident-response', 'Incident response procedures for AI systems')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- PART 2: NEW AI GOVERNANCE ROLES
-- ============================================

INSERT INTO pseo_roles (name, slug, description) VALUES
-- AI-specific roles
('Chief AI Officer', 'chief-ai-officer', 'Executive responsible for AI strategy and governance'),
('AI Ethics Officer', 'ai-ethics-officer', 'Officer responsible for AI ethics and responsible AI'),
('Head of ML Engineering', 'head-of-ml-engineering', 'Technical leader for machine learning engineering'),
('AI Compliance Manager', 'ai-compliance-manager', 'Manager responsible for AI regulatory compliance'),
('Data Scientist', 'data-scientist', 'Scientist working with AI/ML data and models'),
('ML Ops Engineer', 'mlops-engineer', 'Engineer responsible for ML operations and deployment'),
('AI Product Manager', 'ai-product-manager', 'Product manager for AI-powered products'),
('AI Risk Analyst', 'ai-risk-analyst', 'Analyst specializing in AI risk assessment'),
('Responsible AI Lead', 'responsible-ai-lead', 'Leader of responsible AI initiatives'),
('AI Governance Analyst', 'ai-governance-analyst', 'Analyst focused on AI governance frameworks')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- PART 3: AI GOVERNANCE pSEO PAGES (HIGH INTENT)
-- ============================================

-- Get framework IDs first
DO $$
DECLARE
    ai_governance_id UUID;
    iso_42001_id UUID;
    eu_ai_act_id UUID;
    nist_ai_rmf_id UUID;
BEGIN
    SELECT id INTO ai_governance_id FROM pseo_frameworks WHERE slug = 'ai-governance';
    SELECT id INTO iso_42001_id FROM pseo_frameworks WHERE slug = 'iso-42001';
    SELECT id INTO eu_ai_act_id FROM pseo_frameworks WHERE slug = 'eu-ai-act';
    SELECT id INTO nist_ai_rmf_id FROM pseo_frameworks WHERE slug = 'nist-ai-rmf';

    -- ISO 42001 High-Intent Pages
    INSERT INTO pseo_pages (slug, title, category, framework_id, meta_description) VALUES
    -- ISO 42001 Certification Pages
    ('iso-42001-certification-cost', 'ISO 42001 Certification Cost: Complete Pricing Guide 2025', 'cost', iso_42001_id, 'Detailed breakdown of ISO 42001 certification costs including audit fees, implementation, and ongoing maintenance.'),
    ('iso-42001-certification-timeline', 'ISO 42001 Certification Timeline: How Long Does It Take?', 'timeline', iso_42001_id, 'Realistic timeline expectations for ISO 42001 certification from gap analysis to final audit.'),
    ('iso-42001-implementation-guide', 'ISO 42001 Implementation Guide: Step-by-Step Process', 'readiness', iso_42001_id, 'Complete implementation guide for ISO 42001 AI Management System certification.'),
    ('iso-42001-gap-analysis-template', 'ISO 42001 Gap Analysis Template & Checklist', 'checklist', iso_42001_id, 'Free gap analysis template to assess your ISO 42001 readiness.'),
    ('iso-42001-controls-list', 'ISO 42001 Controls List: Complete Control Mapping', 'checklist', iso_42001_id, 'Comprehensive list of ISO 42001 controls with implementation guidance.'),
    ('iso-42001-audit-preparation', 'ISO 42001 Audit Preparation: What Auditors Look For', 'audit', iso_42001_id, 'Prepare for your ISO 42001 certification audit with this comprehensive guide.'),
    ('iso-42001-vs-soc-2', 'ISO 42001 vs SOC 2: Key Differences for AI Companies', 'comparison', iso_42001_id, 'Compare ISO 42001 and SOC 2 to determine which certification fits your AI company.'),
    ('iso-42001-consultant', 'ISO 42001 Consultant: How to Choose the Right Partner', 'software', iso_42001_id, 'Guide to selecting an ISO 42001 consultant for your AI governance needs.'),
    ('iso-42001-training', 'ISO 42001 Training: Certification Courses & Programs', 'readiness', iso_42001_id, 'Overview of ISO 42001 training options for your team.'),
    ('iso-42001-internal-audit', 'ISO 42001 Internal Audit: Checklist & Best Practices', 'audit', iso_42001_id, 'How to conduct an effective ISO 42001 internal audit.'),
    
    -- EU AI Act High-Intent Pages
    ('eu-ai-act-compliance-checklist', 'EU AI Act Compliance Checklist: 2025 Requirements', 'checklist', eu_ai_act_id, 'Complete checklist for EU AI Act compliance covering all risk categories.'),
    ('eu-ai-act-high-risk-ai-systems', 'EU AI Act High-Risk AI Systems: Classification Guide', 'classification', eu_ai_act_id, 'Detailed guide to determining if your AI system is classified as high-risk.'),
    ('eu-ai-act-implementation-timeline', 'EU AI Act Implementation Timeline: Key Dates 2024-2027', 'timeline', eu_ai_act_id, 'Timeline of EU AI Act enforcement dates and compliance deadlines.'),
    ('eu-ai-act-penalties-fines', 'EU AI Act Penalties & Fines: What Non-Compliance Costs', 'cost', eu_ai_act_id, 'Breakdown of EU AI Act penalties and how to avoid costly violations.'),
    ('eu-ai-act-conformity-assessment', 'EU AI Act Conformity Assessment: Requirements Guide', 'audit', eu_ai_act_id, 'Guide to conformity assessment requirements for high-risk AI systems.'),
    ('eu-ai-act-risk-assessment-template', 'EU AI Act Risk Assessment Template: Free Download', 'risk-assessment', eu_ai_act_id, 'Free risk assessment template aligned with EU AI Act requirements.'),
    ('eu-ai-act-documentation-requirements', 'EU AI Act Documentation Requirements: Complete Guide', 'checklist', eu_ai_act_id, 'Comprehensive overview of documentation requirements under the EU AI Act.'),
    ('eu-ai-act-general-purpose-ai', 'EU AI Act General Purpose AI: GPAI Compliance Guide', 'compliance', eu_ai_act_id, 'Specific compliance requirements for general-purpose AI models.'),
    ('eu-ai-act-us-companies', 'EU AI Act for US Companies: What You Need to Know', 'readiness', eu_ai_act_id, 'How the EU AI Act affects US companies selling to European customers.'),
    ('eu-ai-act-ai-chatbots', 'EU AI Act for AI Chatbots: Compliance Requirements', 'use-case', eu_ai_act_id, 'Specific compliance considerations for AI chatbot implementations.'),
    
    -- NIST AI RMF High-Intent Pages
    ('nist-ai-rmf-implementation', 'NIST AI RMF Implementation: Practical Guide', 'readiness', nist_ai_rmf_id, 'Step-by-step guide to implementing the NIST AI Risk Management Framework.'),
    ('nist-ai-rmf-playbook', 'NIST AI RMF Playbook: Complete Framework Overview', 'checklist', nist_ai_rmf_id, 'Comprehensive playbook for the NIST AI RMF with practical examples.'),
    ('nist-ai-rmf-vs-iso-42001', 'NIST AI RMF vs ISO 42001: Which Framework to Choose', 'comparison', nist_ai_rmf_id, 'Detailed comparison of NIST AI RMF and ISO 42001 for AI governance.'),
    ('nist-ai-rmf-govern-function', 'NIST AI RMF Govern Function: Implementation Guide', 'readiness', nist_ai_rmf_id, 'Deep dive into the Govern function of NIST AI RMF.'),
    ('nist-ai-rmf-map-function', 'NIST AI RMF Map Function: Context & Use Cases', 'readiness', nist_ai_rmf_id, 'Understanding the Map function in NIST AI RMF.'),
    ('nist-ai-rmf-measure-function', 'NIST AI RMF Measure Function: Metrics & Assessment', 'readiness', nist_ai_rmf_id, 'How to measure AI risks using the NIST AI RMF framework.'),
    ('nist-ai-rmf-manage-function', 'NIST AI RMF Manage Function: Risk Response', 'readiness', nist_ai_rmf_id, 'Managing identified AI risks with the NIST AI RMF.'),
    
    -- AI Governance General High-Intent Pages
    ('ai-governance-framework', 'AI Governance Framework: Complete Enterprise Guide', 'readiness', ai_governance_id, 'Comprehensive guide to building an AI governance framework for enterprises.'),
    ('ai-governance-policy-template', 'AI Governance Policy Template: Free Download', 'checklist', ai_governance_id, 'Free AI governance policy template for enterprise implementation.'),
    ('ai-governance-committee', 'AI Governance Committee: Structure & Responsibilities', 'role-based', ai_governance_id, 'How to structure an effective AI governance committee.'),
    ('ai-governance-best-practices', 'AI Governance Best Practices: 2025 Guide', 'best-practices', ai_governance_id, 'Industry best practices for AI governance and responsible AI.'),
    ('ai-governance-tools', 'AI Governance Tools: Platform Comparison 2025', 'software', ai_governance_id, 'Comparison of leading AI governance platforms and tools.'),
    ('ai-governance-checklist', 'AI Governance Checklist: Assessment Template', 'checklist', ai_governance_id, 'Comprehensive checklist for assessing AI governance maturity.'),
    ('ai-governance-roadmap', 'AI Governance Roadmap: Strategic Implementation Plan', 'roadmap', ai_governance_id, 'How to create a strategic roadmap for AI governance adoption.'),
    ('ai-governance-metrics', 'AI Governance Metrics: KPIs for Responsible AI', 'analysis', ai_governance_id, 'Key performance indicators for measuring AI governance effectiveness.'),
    
    -- AI Vendor Risk Pages
    ('ai-vendor-risk-assessment', 'AI Vendor Risk Assessment: Complete Framework', 'risk-assessment', ai_governance_id, 'Framework for assessing AI vendor risks and compliance.'),
    ('ai-vendor-due-diligence', 'AI Vendor Due Diligence: Checklist & Process', 'checklist', ai_governance_id, 'Complete due diligence process for evaluating AI vendors.'),
    ('ai-vendor-questionnaire', 'AI Vendor Risk Questionnaire: Template & Guide', 'checklist', ai_governance_id, 'AI-specific vendor risk questionnaire template.'),
    ('ai-third-party-risk', 'AI Third-Party Risk Management: Best Practices', 'best-practices', ai_governance_id, 'Managing third-party AI risks in your supply chain.'),
    ('ai-vendor-contract-clauses', 'AI Vendor Contract Clauses: Legal Requirements', 'checklist', ai_governance_id, 'Essential contract clauses for AI vendor agreements.'),
    
    -- AI Ethics & Responsible AI Pages
    ('responsible-ai-framework', 'Responsible AI Framework: Implementation Guide', 'readiness', ai_governance_id, 'Building a responsible AI framework for your organization.'),
    ('ai-ethics-framework', 'AI Ethics Framework: Principles & Guidelines', 'best-practices', ai_governance_id, 'Developing an AI ethics framework aligned with industry standards.'),
    ('ai-bias-detection', 'AI Bias Detection: Methods & Tools', 'risk-assessment', ai_governance_id, 'Techniques and tools for detecting bias in AI systems.'),
    ('ai-fairness-metrics', 'AI Fairness Metrics: Measurement & Benchmarks', 'analysis', ai_governance_id, 'Key fairness metrics for evaluating AI system equity.'),
    ('ai-explainability', 'AI Explainability: Requirements & Implementation', 'readiness', ai_governance_id, 'Requirements and techniques for AI model explainability.'),
    ('ai-transparency-requirements', 'AI Transparency Requirements: Disclosure Guide', 'checklist', ai_governance_id, 'Transparency and disclosure requirements for AI systems.'),
    
    -- AI Risk Management Pages
    ('ai-risk-management-framework', 'AI Risk Management Framework: Complete Guide', 'risk-assessment', ai_governance_id, 'Comprehensive AI risk management framework for enterprises.'),
    ('ai-risk-assessment-template', 'AI Risk Assessment Template: Free Download', 'risk-assessment', ai_governance_id, 'Free AI risk assessment template for systematic evaluation.'),
    ('ai-risk-register', 'AI Risk Register: Template & Best Practices', 'risk-assessment', ai_governance_id, 'Creating and maintaining an AI risk register.'),
    ('ai-risk-categories', 'AI Risk Categories: Classification Framework', 'classification', ai_governance_id, 'Categorizing AI risks by type, severity, and likelihood.'),
    ('ai-operational-risk', 'AI Operational Risk: Management Guide', 'risk-assessment', ai_governance_id, 'Managing operational risks in AI deployment.'),
    
    -- Industry-Specific AI Governance
    ('ai-governance-healthcare', 'AI Governance for Healthcare: Regulatory Guide', 'industry', ai_governance_id, 'AI governance requirements specific to healthcare sector.'),
    ('ai-governance-financial-services', 'AI Governance for Financial Services: Compliance Guide', 'industry', ai_governance_id, 'AI governance in banking, insurance, and fintech.'),
    ('ai-governance-hr', 'AI Governance for HR: Hiring & Workforce AI', 'industry', ai_governance_id, 'Governing AI in recruitment, performance, and HR processes.'),
    ('ai-governance-marketing', 'AI Governance for Marketing: Consumer AI Guide', 'industry', ai_governance_id, 'Responsible use of AI in marketing and advertising.'),
    
    -- Role-Based AI Governance
    ('ai-governance-for-ciso', 'AI Governance for CISOs: Security Leader Guide', 'role-based', ai_governance_id, 'CISO guide to AI governance and security integration.'),
    ('ai-governance-for-cto', 'AI Governance for CTOs: Technical Leader Guide', 'role-based', ai_governance_id, 'CTO guide to implementing AI governance technically.'),
    ('ai-governance-for-legal', 'AI Governance for Legal Teams: Compliance Guide', 'role-based', ai_governance_id, 'Legal team guide to AI governance and regulatory compliance.'),
    ('ai-governance-for-boards', 'AI Governance for Boards: Director Oversight Guide', 'role-based', ai_governance_id, 'Board-level oversight responsibilities for AI governance.'),
    
    -- AI Governance Software Comparisons
    ('credo-ai-pricing', 'Credo AI Pricing: Plans, Features & Alternatives', 'pricing', ai_governance_id, 'Complete pricing guide for Credo AI platform.'),
    ('holistic-ai-pricing', 'Holistic AI Pricing: Plans & Competitor Comparison', 'pricing', ai_governance_id, 'Holistic AI pricing breakdown and alternatives.'),
    ('ibm-watsonx-governance-pricing', 'IBM Watsonx Governance Pricing: Enterprise Guide', 'pricing', ai_governance_id, 'IBM Watsonx.governance pricing and feature comparison.'),
    ('onetrust-ai-governance-pricing', 'OneTrust AI Governance Pricing: Module Breakdown', 'pricing', ai_governance_id, 'OneTrust AI Governance module pricing and features.'),
    ('credo-ai-vs-holistic-ai', 'Credo AI vs Holistic AI: Head-to-Head Comparison', 'comparison', ai_governance_id, 'Detailed comparison of Credo AI and Holistic AI platforms.'),
    ('credo-ai-alternatives', 'Credo AI Alternatives: Top 10 Competitors 2025', 'alternatives', ai_governance_id, 'Best alternatives to Credo AI for AI governance.'),
    ('holistic-ai-alternatives', 'Holistic AI Alternatives: Competitor Analysis', 'alternatives', ai_governance_id, 'Top alternatives to Holistic AI platform.'),
    
    -- LLM/GenAI Specific Governance
    ('llm-governance-framework', 'LLM Governance Framework: Large Language Model Guide', 'readiness', ai_governance_id, 'Governance framework specific to large language models.'),
    ('genai-policy-template', 'GenAI Policy Template: Generative AI Guidelines', 'checklist', ai_governance_id, 'Policy template for governing generative AI usage.'),
    ('chatgpt-enterprise-governance', 'ChatGPT Enterprise Governance: Best Practices', 'best-practices', ai_governance_id, 'Governing ChatGPT and OpenAI in enterprise settings.'),
    ('copilot-governance', 'Microsoft Copilot Governance: Security & Compliance', 'best-practices', ai_governance_id, 'Governance framework for Microsoft Copilot deployment.'),
    ('llm-security-risks', 'LLM Security Risks: Threat Assessment Guide', 'risk-assessment', ai_governance_id, 'Security risks and mitigations for LLM deployments.'),
    ('prompt-injection-prevention', 'Prompt Injection Prevention: Security Guide', 'risk-assessment', ai_governance_id, 'Preventing prompt injection attacks on AI systems.'),
    ('ai-data-leakage-prevention', 'AI Data Leakage Prevention: DLP for AI', 'risk-assessment', ai_governance_id, 'Preventing data leakage through AI systems.'),
    
    -- AI Governance Budgeting & ROI
    ('ai-governance-budget', 'AI Governance Budget: Planning & Allocation Guide', 'budgeting', ai_governance_id, 'How to budget for AI governance initiatives.'),
    ('ai-governance-roi', 'AI Governance ROI: Business Case Template', 'roi', ai_governance_id, 'Building the business case for AI governance investment.'),
    ('ai-compliance-cost', 'AI Compliance Cost: Breaking Down the Investment', 'cost', ai_governance_id, 'Complete cost breakdown for AI compliance initiatives.')
    ON CONFLICT (slug) DO NOTHING;
END $$;

-- ============================================
-- PART 4: ADD MORE COMPANY SIGNALS (TOP AI/TECH COMPANIES)
-- ============================================

-- Note: company_signals table has columns: name, slug, domain, description, indexable
-- We use slug as domain placeholder (will be updated later if needed)
INSERT INTO company_signals (name, slug, domain, description, indexable) VALUES
-- AI Unicorns & Major AI Companies
('OpenAI', 'openai', 'openai.com', 'Creator of ChatGPT and GPT models, leading AI research company', true),
('Anthropic', 'anthropic', 'anthropic.com', 'AI safety company behind Claude AI assistant', true),
('Databricks', 'databricks', 'databricks.com', 'Unified data analytics and AI platform', true),
('Hugging Face', 'hugging-face', 'huggingface.co', 'Open-source AI model hub and ML collaboration platform', true),
('Cohere', 'cohere', 'cohere.com', 'Enterprise large language model platform', true),
('Mistral AI', 'mistral-ai', 'mistral.ai', 'Open-source LLM developer from France', true),
('Stability AI', 'stability-ai', 'stability.ai', 'Creator of Stable Diffusion image generation', true),
('Runway', 'runway', 'runwayml.com', 'AI-powered creative tools and video generation', true),
('Jasper AI', 'jasper-ai', 'jasper.ai', 'AI content generation platform for marketing', true),
('Copy.ai', 'copy-ai', 'copy.ai', 'AI writing and content automation tool', true),
('Writer', 'writer-ai', 'writer.com', 'Enterprise generative AI platform for content', true),
('Perplexity AI', 'perplexity-ai', 'perplexity.ai', 'AI-powered conversational search engine', true),
('Character.AI', 'character-ai', 'character.ai', 'AI chatbot platform for personalized conversations', true),
('Adept', 'adept-ai', 'adept.ai', 'AI agent company building AI assistants', true),
('Inflection AI', 'inflection-ai', 'inflection.ai', 'Creator of Pi personal AI assistant', true),
('Glean', 'glean', 'glean.com', 'Enterprise AI search and knowledge platform', true),
('Harvey', 'harvey-ai', 'harvey.ai', 'AI-powered legal assistant platform', true),
('xAI', 'xai', 'x.ai', 'Elon Musk AI company behind Grok', true),
('DeepMind', 'deepmind', 'deepmind.com', 'Google AI research laboratory', true),
('Groq', 'groq', 'groq.com', 'AI chip and inference infrastructure company', true),
('Cerebras', 'cerebras', 'cerebras.ai', 'AI compute chip manufacturer', true),
('SambaNova', 'sambanova', 'sambanova.ai', 'Enterprise AI compute platform', true),
('Together AI', 'together-ai', 'together.ai', 'Open-source AI model cloud platform', true),
('Replicate', 'replicate', 'replicate.com', 'ML model deployment platform', true),
('Modal', 'modal', 'modal.com', 'Serverless ML infrastructure platform', true),
('Weights & Biases', 'weights-and-biases', 'wandb.ai', 'ML experiment tracking and monitoring', true),
('Neptune.ai', 'neptune-ai', 'neptune.ai', 'ML metadata store and experiment tracking', true),
('Dataiku', 'dataiku', 'dataiku.com', 'Enterprise AI and ML platform', true),
('DataRobot', 'datarobot', 'datarobot.com', 'AutoML and enterprise AI platform', true),
('H2O.ai', 'h2o-ai', 'h2o.ai', 'Open-source ML and AI platform', true),
('Domino Data Lab', 'domino-data-lab', 'dominodatalab.com', 'Enterprise MLOps platform', true),
('Tecton', 'tecton', 'tecton.ai', 'Feature platform for ML systems', true),
('Pinecone', 'pinecone', 'pinecone.io', 'Vector database for AI applications', true),
('Weaviate', 'weaviate', 'weaviate.io', 'Open-source vector database', true),
('Milvus', 'milvus', 'milvus.io', 'Open-source vector database for AI', true),
('Chroma', 'chroma-ai', 'trychroma.com', 'Open-source embedding database', true),
('Qdrant', 'qdrant', 'qdrant.tech', 'Vector similarity search engine', true),
('LangChain', 'langchain', 'langchain.com', 'Framework for LLM application development', true),
('LlamaIndex', 'llamaindex', 'llamaindex.ai', 'Data framework for LLM applications', true),
('Unstructured.io', 'unstructured-io', 'unstructured.io', 'Data preprocessing for AI/ML', true),

-- AI Governance & Compliance Vendors
('Credo AI', 'credo-ai', 'credo.ai', 'Enterprise AI governance platform', true),
('Holistic AI', 'holistic-ai', 'holisticai.com', 'AI risk management and compliance platform', true),
('TruEra', 'truera', 'truera.com', 'AI quality and explainability platform', true),
('Arthur AI', 'arthur-ai', 'arthur.ai', 'AI model monitoring and observability', true),
('Fiddler AI', 'fiddler-ai', 'fiddler.ai', 'ML model monitoring platform', true),
('Monitaur', 'monitaur', 'monitaur.ai', 'AI governance and audit platform', true),
('Fairly AI', 'fairly-ai', 'fairly.ai', 'AI ethics and compliance platform', true),
('Lumenova', 'lumenova', 'lumenova.ai', 'AI governance and risk management', true),
('ValidMind', 'validmind', 'validmind.ai', 'AI/ML model risk management', true),
('Arize AI', 'arize-ai', 'arize.com', 'ML observability platform', true),
('WhyLabs', 'whylabs', 'whylabs.ai', 'AI observability and monitoring', true),
('Aporia', 'aporia', 'aporia.com', 'ML observability and guardrails', true),
('Galileo', 'galileo-ai', 'rungalileo.io', 'ML data quality and debugging', true),
('Cleanlab', 'cleanlab', 'cleanlab.ai', 'Data-centric AI quality platform', true),
('Snorkel AI', 'snorkel-ai', 'snorkel.ai', 'Data labeling and AI development platform', true),

-- Major SaaS Companies (SOC 2 relevant)
('Notion', 'notion', 'notion.so', 'All-in-one workspace platform', true),
('Airtable', 'airtable', 'airtable.com', 'Spreadsheet-database hybrid platform', true),
('Figma', 'figma', 'figma.com', 'Collaborative design tool', true),
('Canva', 'canva', 'canva.com', 'Online graphic design platform', true),
('Miro', 'miro', 'miro.com', 'Online whiteboard collaboration', true),
('Linear', 'linear', 'linear.app', 'Modern project management tool', true),
('Loom', 'loom', 'loom.com', 'Video messaging platform', true),
('Calendly', 'calendly', 'calendly.com', 'Scheduling automation platform', true),
('Typeform', 'typeform', 'typeform.com', 'Online form and survey builder', true),
('Webflow', 'webflow', 'webflow.com', 'No-code website builder', true),
('Framer', 'framer', 'framer.com', 'Interactive design and prototyping', true),
('Retool', 'retool', 'retool.com', 'Internal tool builder platform', true),
('Superblocks', 'superblocks', 'superblocks.com', 'Enterprise internal tools platform', true),
('Zapier', 'zapier', 'zapier.com', 'Automation and integration platform', true),
('Make', 'make', 'make.com', 'Visual automation platform', true),
('Workato', 'workato', 'workato.com', 'Enterprise automation platform', true),
('Tray.io', 'tray-io', 'tray.io', 'API integration platform', true),
('Merge', 'merge-dev', 'merge.dev', 'Unified API for integrations', true),
('Finch', 'finch-api', 'tryfinch.com', 'Employment API platform', true),
('Plaid', 'plaid', 'plaid.com', 'Financial data connectivity platform', true),
('Stripe', 'stripe', 'stripe.com', 'Payment processing platform', true),
('Square', 'square', 'squareup.com', 'Commerce and payment solutions', true),
('Adyen', 'adyen', 'adyen.com', 'Global payments platform', true),
('Brex', 'brex', 'brex.com', 'Corporate credit card platform', true),
('Ramp', 'ramp', 'ramp.com', 'Corporate card and spend management', true),
('Mercury', 'mercury', 'mercury.com', 'Banking for startups', true),
('Carta', 'carta', 'carta.com', 'Equity management platform', true),
('Gusto', 'gusto', 'gusto.com', 'Payroll and HR platform', true),
('Rippling', 'rippling', 'rippling.com', 'Workforce management platform', true),
('Deel', 'deel', 'deel.com', 'Global payroll and compliance', true),
('Remote', 'remote-com', 'remote.com', 'Global HR platform', true),
('Oyster', 'oyster-hr', 'oysterhr.com', 'Distributed hiring platform', true),
('Lattice', 'lattice', 'lattice.com', 'People management platform', true),
('Culture Amp', 'culture-amp', 'cultureamp.com', 'Employee experience platform', true),
('Greenhouse', 'greenhouse', 'greenhouse.io', 'Hiring and ATS platform', true),
('Lever', 'lever', 'lever.co', 'Recruiting software platform', true),
('Ashby', 'ashby', 'ashbyhq.com', 'All-in-one recruiting platform', true),
('Gem', 'gem', 'gem.com', 'Talent acquisition platform', true),
('Checkr', 'checkr', 'checkr.com', 'Background check platform', true),
('Persona', 'persona', 'withpersona.com', 'Identity verification platform', true),
('Veriff', 'veriff', 'veriff.com', 'Identity verification service', true),
('Jumio', 'jumio', 'jumio.com', 'AI-powered identity verification', true),
('Alloy', 'alloy', 'alloy.com', 'Identity verification for fintech', true),
('Socure', 'socure', 'socure.com', 'Digital identity verification', true),

-- Cybersecurity Companies
('CrowdStrike', 'crowdstrike', 'crowdstrike.com', 'Endpoint security platform', true),
('SentinelOne', 'sentinelone', 'sentinelone.com', 'Autonomous security platform', true),
('Palo Alto Networks', 'palo-alto-networks', 'paloaltonetworks.com', 'Cybersecurity solutions', true),
('Zscaler', 'zscaler', 'zscaler.com', 'Cloud security platform', true),
('Cloudflare', 'cloudflare', 'cloudflare.com', 'Web security and CDN', true),
('Okta', 'okta', 'okta.com', 'Identity and access management', true),
('Auth0', 'auth0', 'auth0.com', 'Identity platform for developers', true),
('JumpCloud', 'jumpcloud', 'jumpcloud.com', 'Directory platform', true),
('1Password', 'onepassword', '1password.com', 'Password management', true),
('Bitwarden', 'bitwarden', 'bitwarden.com', 'Open-source password manager', true),
('Dashlane', 'dashlane', 'dashlane.com', 'Password and identity manager', true),
('BeyondTrust', 'beyondtrust', 'beyondtrust.com', 'Privileged access management', true),
('CyberArk', 'cyberark', 'cyberark.com', 'Identity security platform', true),
('Tenable', 'tenable', 'tenable.com', 'Vulnerability management', true),
('Qualys', 'qualys', 'qualys.com', 'Cloud security and compliance', true),
('Rapid7', 'rapid7', 'rapid7.com', 'Security analytics and automation', true),
('Snyk', 'snyk', 'snyk.io', 'Developer security platform', true),
('Sonatype', 'sonatype', 'sonatype.com', 'Software supply chain security', true),
('Veracode', 'veracode', 'veracode.com', 'Application security testing', true),
('Checkmarx', 'checkmarx', 'checkmarx.com', 'Application security platform', true),
('GitLab', 'gitlab', 'gitlab.com', 'DevOps platform with security', true),
('GitHub', 'github', 'github.com', 'Code hosting and collaboration', true),
('CircleCI', 'circleci', 'circleci.com', 'Continuous integration platform', true),
('BuildKite', 'buildkite', 'buildkite.com', 'CI/CD for enterprise', true),
('Harness', 'harness', 'harness.io', 'Software delivery platform', true),
('LaunchDarkly', 'launchdarkly', 'launchdarkly.com', 'Feature management platform', true),
('Split', 'split-io', 'split.io', 'Feature delivery platform', true),
('PagerDuty', 'pagerduty', 'pagerduty.com', 'Incident management platform', true),
('Datadog', 'datadog', 'datadoghq.com', 'Monitoring and security platform', true),
('New Relic', 'new-relic', 'newrelic.com', 'Observability platform', true),
('Splunk', 'splunk', 'splunk.com', 'Data platform for security', true),
('Elastic', 'elastic', 'elastic.co', 'Search and observability platform', true),
('Grafana Labs', 'grafana-labs', 'grafana.com', 'Observability stack', true),
('Honeycomb', 'honeycomb', 'honeycomb.io', 'Observability for distributed systems', true),

-- More AI/ML and Data Companies
('Scale AI', 'scale-ai', 'scale.com', 'AI data infrastructure', true),
('Labelbox', 'labelbox', 'labelbox.com', 'Data labeling platform', true),
('Appen', 'appen', 'appen.com', 'AI training data services', true),
('Snowflake', 'snowflake', 'snowflake.com', 'Cloud data platform', true),
('Fivetran', 'fivetran', 'fivetran.com', 'Automated data integration', true),
('Airbyte', 'airbyte', 'airbyte.com', 'Open-source data integration', true),
('dbt Labs', 'dbt-labs', 'getdbt.com', 'Data transformation tool', true),
('Census', 'census', 'getcensus.com', 'Operational analytics platform', true),
('Hightouch', 'hightouch', 'hightouch.com', 'Reverse ETL platform', true),
('Rudderstack', 'rudderstack', 'rudderstack.com', 'Customer data platform', true),
('Segment', 'segment', 'segment.com', 'Customer data platform', true),
('Amplitude', 'amplitude', 'amplitude.com', 'Product analytics platform', true),
('Mixpanel', 'mixpanel', 'mixpanel.com', 'Product analytics', true),
('Heap', 'heap', 'heap.io', 'Digital analytics platform', true),
('PostHog', 'posthog', 'posthog.com', 'Open-source product analytics', true),
('Pendo', 'pendo', 'pendo.io', 'Product experience platform', true),
('FullStory', 'fullstory', 'fullstory.com', 'Digital experience analytics', true),
('LogRocket', 'logrocket', 'logrocket.com', 'Frontend monitoring platform', true),
('Hotjar', 'hotjar', 'hotjar.com', 'Behavior analytics tool', true),

-- Healthcare AI Companies
('Tempus', 'tempus', 'tempus.com', 'AI-powered precision medicine', true),
('Flatiron Health', 'flatiron-health', 'flatiron.com', 'Oncology data platform', true),
('PathAI', 'pathai', 'pathai.com', 'AI-powered pathology', true),
('Viz.ai', 'viz-ai', 'viz.ai', 'AI care coordination', true),
('Butterfly Network', 'butterfly-network', 'butterflynetwork.com', 'AI-powered ultrasound', true),
('Aidoc', 'aidoc', 'aidoc.com', 'Radiology AI platform', true),
('Rad AI', 'rad-ai', 'radai.com', 'Radiology workflow AI', true),
('Qure.ai', 'qure-ai', 'qure.ai', 'AI for medical imaging', true),
('Paige', 'paige-ai', 'paige.ai', 'AI for cancer diagnosis', true),
('HeartFlow', 'heartflow', 'heartflow.com', 'AI heart disease analysis', true),
('Veracyte', 'veracyte', 'veracyte.com', 'Genomic diagnostics AI', true),
('Notable Health', 'notable-health', 'notablehealth.com', 'Healthcare AI automation', true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- PART 5: UPDATE INDEXABLE FOR ALL NEW COMPANIES
-- ============================================

UPDATE company_signals SET indexable = true WHERE indexable IS NULL;

-- Confirm counts
SELECT 'New decision types' as type, COUNT(*) FROM pseo_decision_types;
SELECT 'New roles' as type, COUNT(*) FROM pseo_roles;
SELECT 'New pSEO pages' as type, COUNT(*) FROM pseo_pages;
SELECT 'Total companies' as type, COUNT(*) FROM company_signals WHERE indexable = true;
