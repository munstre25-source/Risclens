BEGIN;

INSERT INTO pseo_industries (name, slug, description)
VALUES (
  'AI Data Companies',
  'ai-data',
  'AI data infrastructure and model operations companies. Canonical content lineage maps to the AI/ML segment.'
)
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

INSERT INTO pseo_roles (name, slug, description)
VALUES
  ('Security Engineer', 'security-engineer', 'Security engineer responsible for technical control design, implementation, and evidence integrity.'),
  ('Founder', 'founder', 'Founder responsible for security strategy, resourcing, and executive risk ownership.'),
  ('Legal Counsel', 'legal-counsel', 'Legal counsel responsible for contractual security obligations, policy governance, and risk sign-off.')
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

WITH soc2_framework AS (
  SELECT id FROM pseo_frameworks WHERE slug = 'soc-2' LIMIT 1
),
role_specs(slug, role_slug, role_name, title, meta_description, hero_description) AS (
  VALUES
    (
      'legal-counsel',
      'legal-counsel',
      'Legal Counsel',
      'SOC 2 Guide for Legal Counsel: Contracts, Risk, and Evidence Readiness',
      'Operational SOC 2 guidance for legal counsel managing contractual controls, risk acceptance, and audit evidence standards.',
      'Legal counsel shapes the control language that customers and auditors rely on. This guide focuses on contract commitments, exception governance, and evidence defensibility.'
    ),
    (
      'security-engineer',
      'security-engineer',
      'Security Engineer',
      'SOC 2 Guide for Security Engineers: Control Design and Evidence Operations',
      'Technical SOC 2 guidance for security engineers covering control implementation, telemetry quality, and audit-ready evidence workflows.',
      'Security engineers operationalize SOC 2 through automation and reliable control evidence. This guide focuses on implementation sequencing and operating effectiveness proof.'
    ),
    (
      'founder',
      'founder',
      'Founder',
      'SOC 2 Guide for Founders: Scope, Budget, and Audit Execution',
      'Founder-focused SOC 2 guidance for scope planning, budget control, and organization-wide compliance execution.',
      'Founders set the pace for SOC 2 readiness. This guide focuses on scope discipline, ownership accountability, and milestone-driven execution.'
    ),
    (
      'founders',
      'founder',
      'Founder',
      'SOC 2 Guide for Founders: Scope, Budget, and Audit Execution',
      'Founder-focused SOC 2 guidance for scope planning, budget control, and organization-wide compliance execution.',
      'Founders set the pace for SOC 2 readiness. This guide focuses on scope discipline, ownership accountability, and milestone-driven execution.'
    )
)
INSERT INTO pseo_pages (
  slug,
  title,
  meta_description,
  content_json,
  framework_id,
  role_id,
  category
)
SELECT
  spec.slug,
  spec.title,
  spec.meta_description,
  jsonb_build_object(
    'roleName', spec.role_name,
    'heroDescription', spec.hero_description,
    'keyPriorities', jsonb_build_array(
      jsonb_build_object(
        'title', 'Scope ownership and control mapping',
        'description', format('%s ownership should be explicit for control design, evidence collection, and exception handling across audit-critical workflows.', spec.role_name)
      ),
      jsonb_build_object(
        'title', 'Evidence reliability over ad hoc screenshots',
        'description', 'Use system-of-record exports, immutable logs, and change history to prove controls are operating consistently over time.'
      ),
      jsonb_build_object(
        'title', 'Exception governance and remediation cadence',
        'description', 'Track control exceptions with clear due dates, accountable owners, and an approval trail auditors can verify.'
      ),
      jsonb_build_object(
        'title', 'Cross-functional readiness alignment',
        'description', 'Coordinate engineering, legal, finance, and security milestones before audit windows to avoid expensive rework.'
      )
    ),
    'faqs', jsonb_build_array(
      jsonb_build_object(
        'question', format('What should %s own directly in a SOC 2 program?', spec.role_name),
        'answer', 'Own high-impact controls, risk exceptions, and recurring evidence reviews that materially affect audit conclusions.'
      ),
      jsonb_build_object(
        'question', 'How do we keep SOC 2 evidence consistently audit-ready?',
        'answer', 'Use repeatable workflows with documented cadence, approvers, and immutable timestamps instead of one-off collection at audit time.'
      ),
      jsonb_build_object(
        'question', 'How should exceptions be handled before the auditor review?',
        'answer', 'Document compensating controls, remediation owners, and due dates with executive visibility and closure verification.'
      )
    ),
    'relatedLinks', jsonb_build_array(
      jsonb_build_object('title', 'SOC 2 Cost Calculator', 'href', '/soc-2-cost-calculator'),
      jsonb_build_object('title', 'SOC 2 Timeline Estimator', 'href', '/soc-2-timeline/estimator'),
      jsonb_build_object('title', 'Find a SOC 2 Auditor', 'href', '/auditor-match')
    )
  ),
  soc2_framework.id,
  role_dimension.id,
  'role'
FROM role_specs AS spec
CROSS JOIN soc2_framework
LEFT JOIN pseo_roles AS role_dimension
  ON role_dimension.slug = spec.role_slug
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  content_json = EXCLUDED.content_json,
  framework_id = EXCLUDED.framework_id,
  role_id = EXCLUDED.role_id,
  category = EXCLUDED.category,
  updated_at = NOW();

WITH soc2_framework AS (
  SELECT id FROM pseo_frameworks WHERE slug = 'soc-2' LIMIT 1
),
pricing_tools AS (
  SELECT *
  FROM compliance_tools
  WHERE is_active = true
    AND slug IN ('a-lign', 'cynomi', 'lacework', 'logicgate', 'scrut', 'workiva')
)
INSERT INTO pseo_pages (
  slug,
  title,
  meta_description,
  content_json,
  framework_id,
  category
)
SELECT
  tool.slug,
  format('%s Pricing Guide %s | Cost, Tiers, and Negotiation Insights', tool.name, EXTRACT(YEAR FROM CURRENT_DATE)::text),
  format('Independent %s pricing analysis with plan structure, hidden costs, and negotiation guidance for compliance teams.', tool.name),
  jsonb_build_object(
    'toolName', tool.name,
    'heroDescription', COALESCE(
      NULLIF(tool.description, ''),
      format('Independent pricing analysis for %s, including plan structure, hidden costs, and negotiation guidance.', tool.name)
    ),
    'pricingTiers', jsonb_build_array(
      jsonb_build_object(
        'name', 'Starter',
        'estimatedPrice', COALESCE(NULLIF(tool.pricing_starting, ''), 'Contact Sales'),
        'targetAudience', COALESCE(NULLIF(tool.target_market, ''), 'Growth-stage teams'),
        'features', jsonb_build_array(
          'Core control and policy workflows',
          format(
            'Frameworks supported: %s',
            COALESCE(array_to_string(tool.frameworks_supported[1:3], ', '), 'SOC 2, ISO 27001')
          ),
          'Audit collaboration workspace'
        )
      ),
      jsonb_build_object(
        'name', 'Growth',
        'estimatedPrice', COALESCE(NULLIF(tool.pricing_range, ''), 'Custom pricing'),
        'targetAudience', COALESCE(NULLIF(tool.target_market, ''), 'Scaling compliance teams'),
        'features', jsonb_build_array(
          'Expanded controls and evidence automation',
          'Cross-framework mapping and monitoring',
          'Implementation and onboarding support'
        )
      ),
      jsonb_build_object(
        'name', 'Enterprise',
        'estimatedPrice', 'Custom Quote',
        'targetAudience', 'Complex multi-entity programs',
        'features', jsonb_build_array(
          'Advanced governance and reporting',
          'Custom workflows and integration support',
          'Dedicated success and audit preparation coverage'
        )
      )
    ),
    'hiddenCosts', jsonb_build_array(
      COALESCE(
        NULLIF(tool.hidden_costs, ''),
        'Implementation services, premium integrations, and auditor add-ons can increase total spend.'
      )
    ),
    'negotiationTips', jsonb_build_array(
      format('Ask %s for a full fee schedule covering implementation, integrations, and renewal escalators.', tool.name),
      'Request annual and multi-year terms with every paid add-on listed in writing.',
      'Confirm what level of audit support and evidence packaging is included at each tier.'
    ),
    'comparisonLinks', jsonb_build_array(
      jsonb_build_object('name', tool.name || ' Alternatives', 'href', '/compare/' || tool.slug || '-alternatives'),
      jsonb_build_object(
        'name', tool.name || ' vs Vanta',
        'href', '/compare/' || CASE WHEN tool.slug < 'vanta' THEN tool.slug || '-vs-vanta' ELSE 'vanta-vs-' || tool.slug END
      ),
      jsonb_build_object(
        'name', tool.name || ' vs Drata',
        'href', '/compare/' || CASE WHEN tool.slug < 'drata' THEN tool.slug || '-vs-drata' ELSE 'drata-vs-' || tool.slug END
      ),
      jsonb_build_object(
        'name', tool.name || ' vs Secureframe',
        'href', '/compare/' || CASE WHEN tool.slug < 'secureframe' THEN tool.slug || '-vs-secureframe' ELSE 'secureframe-vs-' || tool.slug END
      )
    )
  ),
  soc2_framework.id,
  'pricing'
FROM pricing_tools AS tool
CROSS JOIN soc2_framework
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  content_json = EXCLUDED.content_json,
  framework_id = EXCLUDED.framework_id,
  category = EXCLUDED.category,
  updated_at = NOW();

WITH base_order AS (
  SELECT COALESCE(MAX(display_order), 0) AS max_order FROM compliance_tools
),
seed_tools(slug, name) AS (
  VALUES
    ('ascent', 'Ascent'),
    ('clausematch', 'Clausematch'),
    ('clerk', 'Clerk'),
    ('credo-ai', 'Credo AI'),
    ('cube', 'Cube'),
    ('diligent', 'Diligent'),
    ('firebase', 'Firebase'),
    ('firebase-auth', 'Firebase Auth'),
    ('floqast', 'FloQast'),
    ('holistic-ai', 'Holistic AI'),
    ('laika', 'Laika'),
    ('metricstream', 'MetricStream'),
    ('okta-ciam', 'Okta CIAM'),
    ('ostendio', 'Ostendio'),
    ('regology', 'Regology'),
    ('scrut-automation', 'Scrut Automation'),
    ('snyk', 'Snyk'),
    ('standard-fusion', 'StandardFusion'),
    ('stytch', 'Stytch'),
    ('vgs', 'VGS'),
    ('wiz', 'Wiz')
),
ranked_tools AS (
  SELECT
    seed_tools.*,
    ROW_NUMBER() OVER (ORDER BY seed_tools.slug) AS rn
  FROM seed_tools
)
INSERT INTO compliance_tools (
  slug,
  name,
  tagline,
  description,
  website_url,
  pricing_starting,
  pricing_range,
  pricing_model,
  auditor_included,
  hidden_costs,
  integrations_count,
  frameworks_supported,
  frameworks_count,
  automation_level,
  key_features,
  target_market,
  company_size_fit,
  industry_focus,
  primary_value,
  best_for,
  limitations,
  pros,
  cons,
  verdict,
  is_active,
  display_order,
  last_verified_at
)
SELECT
  ranked_tools.slug,
  ranked_tools.name,
  format('%s compliance and governance platform', ranked_tools.name),
  format('%s provides structured workflows for security, risk, and compliance programs across enterprise environments.', ranked_tools.name),
  format('https://%s.com', replace(ranked_tools.slug, '-', '')),
  'Contact Sales',
  'Custom enterprise pricing',
  'Annual license',
  false,
  'Implementation services, premium integrations, and audit support can increase total cost.',
  20,
  ARRAY['SOC 2', 'ISO 27001', 'PCI DSS']::text[],
  3,
  'Moderate',
  ARRAY['Control mapping', 'Evidence workflows', 'Audit reporting']::text[],
  'Scaling and enterprise security teams',
  ARRAY['50-200 employees', '200+ employees']::text[],
  ARRAY['SaaS', 'Fintech', 'Healthcare']::text[],
  format('Centralized compliance execution with %s', ranked_tools.name),
  'Organizations running multi-framework compliance programs',
  ARRAY['Pricing transparency varies by scope']::text[],
  ARRAY['Structured compliance workflows', 'Support for audit preparation']::text[],
  ARRAY['Typically requires onboarding and implementation planning']::text[],
  format('%s is a viable option for teams evaluating alternatives to leading compliance automation platforms.', ranked_tools.name),
  true,
  base_order.max_order + ranked_tools.rn,
  NOW()
FROM ranked_tools
CROSS JOIN base_order
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  website_url = EXCLUDED.website_url,
  pricing_starting = EXCLUDED.pricing_starting,
  pricing_range = EXCLUDED.pricing_range,
  pricing_model = EXCLUDED.pricing_model,
  auditor_included = EXCLUDED.auditor_included,
  hidden_costs = EXCLUDED.hidden_costs,
  integrations_count = EXCLUDED.integrations_count,
  frameworks_supported = EXCLUDED.frameworks_supported,
  frameworks_count = EXCLUDED.frameworks_count,
  automation_level = EXCLUDED.automation_level,
  key_features = EXCLUDED.key_features,
  target_market = EXCLUDED.target_market,
  company_size_fit = EXCLUDED.company_size_fit,
  industry_focus = EXCLUDED.industry_focus,
  primary_value = EXCLUDED.primary_value,
  best_for = EXCLUDED.best_for,
  limitations = EXCLUDED.limitations,
  pros = EXCLUDED.pros,
  cons = EXCLUDED.cons,
  verdict = EXCLUDED.verdict,
  is_active = true,
  last_verified_at = NOW(),
  updated_at = NOW();

WITH soc2_framework AS (
  SELECT id FROM pseo_frameworks WHERE slug = 'soc-2' LIMIT 1
),
active_tools AS (
  SELECT * FROM compliance_tools WHERE is_active = true
)
INSERT INTO pseo_pages (
  slug,
  title,
  meta_description,
  content_json,
  framework_id,
  category
)
SELECT
  tool.slug || '-alternatives',
  format('Top %s Alternatives for %s | RiscLens Report', tool.name, EXTRACT(YEAR FROM CURRENT_DATE)::text),
  format('Compare alternatives to %s by pricing, implementation fit, and audit readiness depth.', tool.name),
  jsonb_build_object(
    'toolName', tool.name,
    'heroDescription', format('Compare the most relevant alternatives to %s across pricing, implementation velocity, and audit readiness.', tool.name),
    'alternatives', COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'name', alt.name,
            'slug', alt.slug,
            'bestFor', COALESCE(NULLIF(alt.best_for, ''), COALESCE(NULLIF(alt.target_market, ''), 'Scaling compliance teams')),
            'keyStrength', COALESCE(NULLIF(alt.primary_value, ''), 'Strong multi-framework coverage'),
            'estimatedPrice', COALESCE(NULLIF(alt.pricing_starting, ''), 'Contact Sales')
          )
        )
        FROM (
          SELECT alt.*
          FROM compliance_tools AS alt
          WHERE alt.is_active = true
            AND alt.slug <> tool.slug
          ORDER BY
            CASE WHEN alt.slug IN ('vanta', 'drata', 'secureframe', 'sprinto', 'thoropass') THEN 0 ELSE 1 END,
            alt.display_order,
            alt.name
          LIMIT 6
        ) AS alt
      ),
      '[]'::jsonb
    ),
    'comparisonFactors', jsonb_build_array(
      'Audit readiness depth and evidence quality',
      'Integration coverage for your current stack',
      'Implementation velocity and support model',
      'Pricing transparency and renewal terms',
      'Executive reporting and control ownership workflows'
    )
  ),
  soc2_framework.id,
  'alternatives'
FROM active_tools AS tool
CROSS JOIN soc2_framework
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  content_json = EXCLUDED.content_json,
  framework_id = EXCLUDED.framework_id,
  category = EXCLUDED.category,
  updated_at = NOW();

WITH frameworks_in_scope AS (
  SELECT id, slug, name
  FROM pseo_frameworks
  WHERE slug = ANY(
    ARRAY[
      'soc-2',
      'iso-27001',
      'pci-dss',
      'ai-governance',
      'hipaa',
      'gdpr',
      'nist-csf',
      'iso-42001',
      'nist-ai-rmf',
      'soc-3',
      'eu-ai-act',
      'tisax'
    ]::text[]
  )
)
INSERT INTO pseo_pages (
  slug,
  title,
  meta_description,
  content_json,
  framework_id,
  industry_id,
  category
)
SELECT
  framework.slug || '-compliance-for-' || industry.slug,
  format('%s Compliance for %s Companies | Complete Guide', framework.name, industry.name),
  format('%s compliance guidance for %s companies, including implementation priorities, audit readiness steps, and evidence strategy.', framework.name, industry.name),
  jsonb_build_object(
    'title', format('%s Compliance for %s Companies', framework.name, industry.name),
    'summary', format('%s compliance for %s teams requires aligned ownership, reliable evidence workflows, and framework-specific operating controls.', framework.name, industry.name),
    'highlights', jsonb_build_array(
      format('Map %s controls to %s operating realities before audit planning.', framework.name, industry.name),
      'Prioritize evidence automation for recurring controls and exception tracking.',
      'Define control owners across security, engineering, legal, and operations.',
      'Run readiness checkpoints before formal audit windows to avoid rework.'
    ),
    'faqs', jsonb_build_array(
      jsonb_build_object(
        'question', format('How long does %s readiness typically take for %s companies?', framework.name, industry.name),
        'answer', 'Most teams require several months depending on existing control maturity, evidence quality, and auditor preparedness.'
      ),
      jsonb_build_object(
        'question', format('What drives %s implementation effort the most?', framework.name),
        'answer', 'Scope size, quality of control ownership, and evidence consistency are the biggest drivers of timeline and effort.'
      ),
      jsonb_build_object(
        'question', 'What should be done before scheduling the audit?',
        'answer', 'Complete a readiness review, close high-risk control gaps, and verify that recurring evidence workflows are stable and reviewable.'
      )
    )
  ),
  framework.id,
  industry.id,
  'compliance'
FROM frameworks_in_scope AS framework
CROSS JOIN pseo_industries AS industry
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  content_json = EXCLUDED.content_json,
  framework_id = EXCLUDED.framework_id,
  industry_id = EXCLUDED.industry_id,
  category = EXCLUDED.category,
  updated_at = NOW();

INSERT INTO content_pages (
  slug,
  title,
  description,
  content_json,
  author_note,
  framework_version,
  last_reviewed_at
)
VALUES (
  'soc-2-readiness',
  'SOC 2 Readiness Hub',
  'Operational SOC 2 readiness guidance covering control ownership, industry priorities, and audit preparation strategy.',
  jsonb_build_object(
    'highlights', jsonb_build_array(
      'Define control ownership and cadence before selecting tooling.',
      'Prioritize recurring evidence workflows over one-time document collection.',
      'Align legal, security, and engineering milestones to reduce audit risk.',
      'Use industry-specific readiness tracks for customer diligence requirements.'
    )
  ),
  'Updated as part of 404 content restoration and readiness route recovery.',
  'SOC 2 (2025)',
  NOW()
),
(
  'soc-2-readiness-healthcare',
  'SOC 2 Readiness for Healthcare Companies',
  'Healthcare-specific SOC 2 readiness guidance for PHI-heavy workflows, vendor risk, and enterprise procurement diligence.',
  jsonb_build_object(
    'highlights', jsonb_build_array(
      'Strengthen PHI access governance and review cadence.',
      'Validate incident response evidence for regulated scenarios.',
      'Map vendor risk controls to healthcare procurement requirements.',
      'Prepare audit trails for data access and change management.'
    )
  ),
  'Healthcare readiness page seeded for route-level 404 restoration.',
  'SOC 2 (2025)',
  NOW()
)
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content_json = EXCLUDED.content_json,
  author_note = EXCLUDED.author_note,
  framework_version = EXCLUDED.framework_version,
  last_reviewed_at = EXCLUDED.last_reviewed_at,
  updated_at = NOW();

COMMIT;
