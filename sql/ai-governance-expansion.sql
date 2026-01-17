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

INSERT INTO company_signals (name, slug, industry, description, indexable) VALUES
-- AI Unicorns & Major AI Companies
('OpenAI', 'openai', 'AI/ML', 'Creator of ChatGPT and GPT models, leading AI research company', true),
('Anthropic', 'anthropic', 'AI/ML', 'AI safety company behind Claude AI assistant', true),
('Databricks', 'databricks', 'AI/ML', 'Unified data analytics and AI platform', true),
('Hugging Face', 'hugging-face', 'AI/ML', 'Open-source AI model hub and ML collaboration platform', true),
('Cohere', 'cohere', 'AI/ML', 'Enterprise large language model platform', true),
('Mistral AI', 'mistral-ai', 'AI/ML', 'Open-source LLM developer from France', true),
('Stability AI', 'stability-ai', 'AI/ML', 'Creator of Stable Diffusion image generation', true),
('Runway', 'runway', 'AI/ML', 'AI-powered creative tools and video generation', true),
('Jasper AI', 'jasper-ai', 'AI/ML', 'AI content generation platform for marketing', true),
('Copy.ai', 'copy-ai', 'AI/ML', 'AI writing and content automation tool', true),
('Writer', 'writer-ai', 'AI/ML', 'Enterprise generative AI platform for content', true),
('Perplexity AI', 'perplexity-ai', 'AI/ML', 'AI-powered conversational search engine', true),
('Character.AI', 'character-ai', 'AI/ML', 'AI chatbot platform for personalized conversations', true),
('Adept', 'adept-ai', 'AI/ML', 'AI agent company building AI assistants', true),
('Inflection AI', 'inflection-ai', 'AI/ML', 'Creator of Pi personal AI assistant', true),
('Glean', 'glean', 'AI/ML', 'Enterprise AI search and knowledge platform', true),
('Harvey', 'harvey-ai', 'AI/ML', 'AI-powered legal assistant platform', true),
('xAI', 'xai', 'AI/ML', 'Elon Musk AI company behind Grok', true),
('DeepMind', 'deepmind', 'AI/ML', 'Google AI research laboratory', true),
('Groq', 'groq', 'AI/ML', 'AI chip and inference infrastructure company', true),
('Cerebras', 'cerebras', 'AI/ML', 'AI compute chip manufacturer', true),
('SambaNova', 'sambanova', 'AI/ML', 'Enterprise AI compute platform', true),
('Together AI', 'together-ai', 'AI/ML', 'Open-source AI model cloud platform', true),
('Replicate', 'replicate', 'AI/ML', 'ML model deployment platform', true),
('Modal', 'modal', 'AI/ML', 'Serverless ML infrastructure platform', true),
('Weights & Biases', 'weights-and-biases', 'AI/ML', 'ML experiment tracking and monitoring', true),
('Neptune.ai', 'neptune-ai', 'AI/ML', 'ML metadata store and experiment tracking', true),
('MLflow', 'mlflow', 'AI/ML', 'Open-source ML lifecycle management', true),
('Dataiku', 'dataiku', 'AI/ML', 'Enterprise AI and ML platform', true),
('DataRobot', 'datarobot', 'AI/ML', 'AutoML and enterprise AI platform', true),
('H2O.ai', 'h2o-ai', 'AI/ML', 'Open-source ML and AI platform', true),
('Domino Data Lab', 'domino-data-lab', 'AI/ML', 'Enterprise MLOps platform', true),
('Tecton', 'tecton', 'AI/ML', 'Feature platform for ML systems', true),
('Feast', 'feast-dev', 'AI/ML', 'Open-source feature store', true),
('Pinecone', 'pinecone', 'AI/ML', 'Vector database for AI applications', true),
('Weaviate', 'weaviate', 'AI/ML', 'Open-source vector database', true),
('Milvus', 'milvus', 'AI/ML', 'Open-source vector database for AI', true),
('Chroma', 'chroma-ai', 'AI/ML', 'Open-source embedding database', true),
('Qdrant', 'qdrant', 'AI/ML', 'Vector similarity search engine', true),
('LangChain', 'langchain', 'AI/ML', 'Framework for LLM application development', true),
('LlamaIndex', 'llamaindex', 'AI/ML', 'Data framework for LLM applications', true),
('Unstructured.io', 'unstructured-io', 'AI/ML', 'Data preprocessing for AI/ML', true),
('Haystack', 'haystack', 'AI/ML', 'Open-source LLM framework', true),

-- AI Governance & Compliance Vendors
('Credo AI', 'credo-ai', 'AI Governance', 'Enterprise AI governance platform', true),
('Holistic AI', 'holistic-ai', 'AI Governance', 'AI risk management and compliance platform', true),
('TruEra', 'truera', 'AI Governance', 'AI quality and explainability platform', true),
('Arthur AI', 'arthur-ai', 'AI Governance', 'AI model monitoring and observability', true),
('Fiddler AI', 'fiddler-ai', 'AI Governance', 'ML model monitoring platform', true),
('Monitaur', 'monitaur', 'AI Governance', 'AI governance and audit platform', true),
('Fairly AI', 'fairly-ai', 'AI Governance', 'AI ethics and compliance platform', true),
('Lumenova', 'lumenova', 'AI Governance', 'AI governance and risk management', true),
('Anch.AI', 'anch-ai', 'AI Governance', 'AI ethics and governance automation', true),
('ValidMind', 'validmind', 'AI Governance', 'AI/ML model risk management', true),
('Datatron', 'datatron', 'AI Governance', 'Enterprise MLOps and governance', true),
('Modzy', 'modzy', 'AI Governance', 'MLOps and AI deployment platform', true),
('Seldon', 'seldon', 'AI Governance', 'ML deployment and monitoring', true),
('BentoML', 'bentoml', 'AI Governance', 'ML model serving and deployment', true),
('Arize AI', 'arize-ai', 'AI Governance', 'ML observability platform', true),
('WhyLabs', 'whylabs', 'AI Governance', 'AI observability and monitoring', true),
('Aporia', 'aporia', 'AI Governance', 'ML observability and guardrails', true),
('Galileo', 'galileo-ai', 'AI Governance', 'ML data quality and debugging', true),
('Cleanlab', 'cleanlab', 'AI Governance', 'Data-centric AI quality platform', true),
('Snorkel AI', 'snorkel-ai', 'AI Governance', 'Data labeling and AI development platform', true),

-- Major SaaS Companies (SOC 2 relevant)
('Notion', 'notion', 'SaaS', 'All-in-one workspace platform', true),
('Airtable', 'airtable', 'SaaS', 'Spreadsheet-database hybrid platform', true),
('Figma', 'figma', 'SaaS', 'Collaborative design tool', true),
('Canva', 'canva', 'SaaS', 'Online graphic design platform', true),
('Miro', 'miro', 'SaaS', 'Online whiteboard collaboration', true),
('Linear', 'linear', 'SaaS', 'Modern project management tool', true),
('Loom', 'loom', 'SaaS', 'Video messaging platform', true),
('Calendly', 'calendly', 'SaaS', 'Scheduling automation platform', true),
('Typeform', 'typeform', 'SaaS', 'Online form and survey builder', true),
('Webflow', 'webflow', 'SaaS', 'No-code website builder', true),
('Framer', 'framer', 'SaaS', 'Interactive design and prototyping', true),
('Retool', 'retool', 'SaaS', 'Internal tool builder platform', true),
('Superblocks', 'superblocks', 'SaaS', 'Enterprise internal tools platform', true),
('Airplane', 'airplane-dev', 'SaaS', 'Internal tool development platform', true),
('Pipedream', 'pipedream', 'SaaS', 'Integration and automation platform', true),
('Zapier', 'zapier', 'SaaS', 'Automation and integration platform', true),
('Make', 'make', 'SaaS', 'Visual automation platform', true),
('Workato', 'workato', 'SaaS', 'Enterprise automation platform', true),
('Tray.io', 'tray-io', 'SaaS', 'API integration platform', true),
('Merge', 'merge-dev', 'SaaS', 'Unified API for integrations', true),
('Finch', 'finch-api', 'SaaS', 'Employment API platform', true),
('Plaid', 'plaid', 'Fintech', 'Financial data connectivity platform', true),
('Stripe', 'stripe', 'Fintech', 'Payment processing platform', true),
('Square', 'square', 'Fintech', 'Commerce and payment solutions', true),
('Adyen', 'adyen', 'Fintech', 'Global payments platform', true),
('Brex', 'brex', 'Fintech', 'Corporate credit card platform', true),
('Ramp', 'ramp', 'Fintech', 'Corporate card and spend management', true),
('Mercury', 'mercury', 'Fintech', 'Banking for startups', true),
('Carta', 'carta', 'Fintech', 'Equity management platform', true),
('Gusto', 'gusto', 'Fintech', 'Payroll and HR platform', true),
('Rippling', 'rippling', 'HR-Tech', 'Workforce management platform', true),
('Deel', 'deel', 'HR-Tech', 'Global payroll and compliance', true),
('Remote', 'remote-com', 'HR-Tech', 'Global HR platform', true),
('Oyster', 'oyster-hr', 'HR-Tech', 'Distributed hiring platform', true),
('Lattice', 'lattice', 'HR-Tech', 'People management platform', true),
('Culture Amp', 'culture-amp', 'HR-Tech', 'Employee experience platform', true),
('Greenhouse', 'greenhouse', 'HR-Tech', 'Hiring and ATS platform', true),
('Lever', 'lever', 'HR-Tech', 'Recruiting software platform', true),
('Ashby', 'ashby', 'HR-Tech', 'All-in-one recruiting platform', true),
('Gem', 'gem', 'HR-Tech', 'Talent acquisition platform', true),
('Checkr', 'checkr', 'HR-Tech', 'Background check platform', true),
('Persona', 'persona', 'Fintech', 'Identity verification platform', true),
('Veriff', 'veriff', 'Fintech', 'Identity verification service', true),
('Jumio', 'jumio', 'Fintech', 'AI-powered identity verification', true),
('Alloy', 'alloy', 'Fintech', 'Identity verification for fintech', true),
('Socure', 'socure', 'Fintech', 'Digital identity verification', true),

-- Cybersecurity Companies
('CrowdStrike', 'crowdstrike', 'Cybersecurity', 'Endpoint security platform', true),
('SentinelOne', 'sentinelone', 'Cybersecurity', 'Autonomous security platform', true),
('Palo Alto Networks', 'palo-alto-networks', 'Cybersecurity', 'Cybersecurity solutions', true),
('Zscaler', 'zscaler', 'Cybersecurity', 'Cloud security platform', true),
('Cloudflare', 'cloudflare', 'Cybersecurity', 'Web security and CDN', true),
('Okta', 'okta', 'Cybersecurity', 'Identity and access management', true),
('Auth0', 'auth0', 'Cybersecurity', 'Identity platform for developers', true),
('JumpCloud', 'jumpcloud', 'Cybersecurity', 'Directory platform', true),
('1Password', 'onepassword', 'Cybersecurity', 'Password management', true),
('Bitwarden', 'bitwarden', 'Cybersecurity', 'Open-source password manager', true),
('Dashlane', 'dashlane', 'Cybersecurity', 'Password and identity manager', true),
('Keeper', 'keeper', 'Cybersecurity', 'Password security platform', true),
('BeyondTrust', 'beyondtrust', 'Cybersecurity', 'Privileged access management', true),
('CyberArk', 'cyberark', 'Cybersecurity', 'Identity security platform', true),
('Tenable', 'tenable', 'Cybersecurity', 'Vulnerability management', true),
('Qualys', 'qualys', 'Cybersecurity', 'Cloud security and compliance', true),
('Rapid7', 'rapid7', 'Cybersecurity', 'Security analytics and automation', true),
('Snyk', 'snyk', 'Cybersecurity', 'Developer security platform', true),
('Sonatype', 'sonatype', 'Cybersecurity', 'Software supply chain security', true),
('Veracode', 'veracode', 'Cybersecurity', 'Application security testing', true),
('Checkmarx', 'checkmarx', 'Cybersecurity', 'Application security platform', true),
('GitLab', 'gitlab', 'DevTools', 'DevOps platform with security', true),
('GitHub', 'github', 'DevTools', 'Code hosting and collaboration', true),
('Bitbucket', 'bitbucket', 'DevTools', 'Git code management', true),
('CircleCI', 'circleci', 'DevTools', 'Continuous integration platform', true),
('Travis CI', 'travis-ci', 'DevTools', 'CI/CD platform', true),
('BuildKite', 'buildkite', 'DevTools', 'CI/CD for enterprise', true),
('Harness', 'harness', 'DevTools', 'Software delivery platform', true),
('LaunchDarkly', 'launchdarkly', 'DevTools', 'Feature management platform', true),
('Split', 'split-io', 'DevTools', 'Feature delivery platform', true),
('Flagsmith', 'flagsmith', 'DevTools', 'Feature flag and remote config', true),
('Unleash', 'unleash', 'DevTools', 'Open-source feature management', true),
('PagerDuty', 'pagerduty', 'DevTools', 'Incident management platform', true),
('Opsgenie', 'opsgenie', 'DevTools', 'Incident alerting platform', true),
('Datadog', 'datadog', 'DevTools', 'Monitoring and security platform', true),
('New Relic', 'new-relic', 'DevTools', 'Observability platform', true),
('Splunk', 'splunk', 'DevTools', 'Data platform for security', true),
('Elastic', 'elastic', 'DevTools', 'Search and observability platform', true),
('Grafana Labs', 'grafana-labs', 'DevTools', 'Observability stack', true),
('Chronosphere', 'chronosphere', 'DevTools', 'Cloud-native observability', true),
('Honeycomb', 'honeycomb', 'DevTools', 'Observability for distributed systems', true),
('Lightstep', 'lightstep', 'DevTools', 'Distributed tracing platform', true),

-- More AI/ML and Data Companies
('Scale AI', 'scale-ai', 'AI/ML', 'AI data infrastructure', true),
('Labelbox', 'labelbox', 'AI/ML', 'Data labeling platform', true),
('Appen', 'appen', 'AI/ML', 'AI training data services', true),
('Surge AI', 'surge-ai', 'AI/ML', 'Data labeling workforce', true),
('Snowflake', 'snowflake', 'Data', 'Cloud data platform', true),
('Fivetran', 'fivetran', 'Data', 'Automated data integration', true),
('Airbyte', 'airbyte', 'Data', 'Open-source data integration', true),
('Stitch', 'stitch-data', 'Data', 'ETL data pipeline', true),
('dbt Labs', 'dbt-labs', 'Data', 'Data transformation tool', true),
('Census', 'census', 'Data', 'Operational analytics platform', true),
('Hightouch', 'hightouch', 'Data', 'Reverse ETL platform', true),
('Rudderstack', 'rudderstack', 'Data', 'Customer data platform', true),
('Segment', 'segment', 'Data', 'Customer data platform', true),
('Amplitude', 'amplitude', 'Data', 'Product analytics platform', true),
('Mixpanel', 'mixpanel', 'Data', 'Product analytics', true),
('Heap', 'heap', 'Data', 'Digital analytics platform', true),
('PostHog', 'posthog', 'Data', 'Open-source product analytics', true),
('Pendo', 'pendo', 'Data', 'Product experience platform', true),
('FullStory', 'fullstory', 'Data', 'Digital experience analytics', true),
('LogRocket', 'logrocket', 'Data', 'Frontend monitoring platform', true),
('Hotjar', 'hotjar', 'Data', 'Behavior analytics tool', true),

-- Healthcare AI Companies
('Tempus', 'tempus', 'HealthTech', 'AI-powered precision medicine', true),
('Flatiron Health', 'flatiron-health', 'HealthTech', 'Oncology data platform', true),
('PathAI', 'pathai', 'HealthTech', 'AI-powered pathology', true),
('Viz.ai', 'viz-ai', 'HealthTech', 'AI care coordination', true),
('Butterfly Network', 'butterfly-network', 'HealthTech', 'AI-powered ultrasound', true),
('Caption Health', 'caption-health', 'HealthTech', 'AI-guided ultrasound', true),
('Arterys', 'arterys', 'HealthTech', 'Medical imaging AI', true),
('Aidoc', 'aidoc', 'HealthTech', 'Radiology AI platform', true),
('Rad AI', 'rad-ai', 'HealthTech', 'Radiology workflow AI', true),
('Qure.ai', 'qure-ai', 'HealthTech', 'AI for medical imaging', true),
('Paige', 'paige-ai', 'HealthTech', 'AI for cancer diagnosis', true),
('Subtle Medical', 'subtle-medical', 'HealthTech', 'Medical imaging AI', true),
('HeartFlow', 'heartflow', 'HealthTech', 'AI heart disease analysis', true),
('Veracyte', 'veracyte', 'HealthTech', 'Genomic diagnostics AI', true),
('Olive', 'olive-ai', 'HealthTech', 'Healthcare automation AI', true),
('AKASA', 'akasa', 'HealthTech', 'Healthcare revenue cycle AI', true),
('Notable Health', 'notable-health', 'HealthTech', 'Healthcare AI automation', true)
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
