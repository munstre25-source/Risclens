# Route Counts by Category (Sitemap-aligned)

Source: `app/sitemap.ts` and `src/seo/routes.ts`.

## Core Architectural Routes — 151 URLs
These are the static and programmatic routes that form the structural core of RiscLens.

### 1. SOC 2 & Compliance Cost — 45 URLs
- **Main Hub**: `/soc-2-cost`
- **Cost Breakdown**: `/soc-2-cost-breakdown`
- **Industry Variants**: `/soc-2-cost/{saas,fintech,healthcare,ecommerce,startups,enterprise,ai-data,devtools,edtech,payments,marketplaces,b2b-saas,cloud-infrastructure}`
- **Specific Ranges**: `/soc-2-cost/{5-10-employees,10-50-employees,50-200-employees}`
- **Topic-Specific**: `/soc-2-cost/{auditor-fees,automation-tools-vanta-drata,evidence-collection,hidden-costs,internal-time-and-headcount,legal-and-grc-support,penetration-testing,policies-and-documentation,security-tooling,type-1-vs-type-2-cost,vendor-management}`

### 2. SOC 2 Readiness & Timeline — 41 URLs
- **Readiness Hub**: `/soc-2-readiness-calculator`
- **Timeline Hub**: `/soc-2-timeline`, `/soc-2-timeline/estimator`
- **Timeline Variants**: `/soc-2-timeline/{5-10-employees,10-50-employees,50-200-employees,fintech,saas,startups}`
- **Readiness Guides (Learn)**: `/learn/soc-2-readiness/{access-control,user-access-reviews,mfa-and-authentication,change-management,secure-sdlc,logging-and-monitoring,incident-response,vulnerability-management,patch-management,vendor-management,asset-inventory,data-encryption,backup-and-recovery,business-continuity,security-awareness-training,risk-assessment,audit-logging-evidence,least-privilege,endpoint-security,policies-and-procedures}`

### 3. Penetration Testing — 21 URLs
- **Main Hub**: `/penetration-testing`
- **Estimator**: `/penetration-testing/cost-estimator`
- **Topic Pages**: `/penetration-testing/{api,cloud,mobile,web-application,pricing,report,vs-vulnerability-scan,sow,retesting-remediation,compliance-buyers,saas,fintech,for-soc-2,scoping}`

### 4. Vendor Risk Assessment (VRA) — 23 URLs
- **Main Hub**: `/vendor-risk-assessment`
- **Tools**: `/vendor-risk-assessment/{questionnaire,triage,checklist,scoring-model,roi-calculator,tiering,automation-vs-manual}`
- **Topic Pages**: `/vendor-risk-assessment/{common-mistakes,contract-clauses,evidence-by-tier,monitoring-cadence,subprocessors-vs-vendors,soc-2-compliance-requirements}`
- **Industry Variants**: `/vendor-risk-assessment/industries/{saas,fintech,healthcare}`

### 5. Sales & Strategy — 10 URLs
- **Main Hub**: `/soc-2-sales`
- **Topic Pages**: `/soc-2-sales/{bridge-letters,security-questionnaires,trust-centers,subservice-organizations,qualified-opinions,multi-framework-mapping}`

### 6. Evidence & Comparisons — 11 URLs
- **Evidence Vault**: `/soc-2-evidence/vault`
- **Evidence Guides**: `/soc-2-evidence/{access-control,change-management,logging-monitoring,incident-response,vendor-management,business-continuity}`
- **Comparisons**: `/soc-2-vs-iso-27001`, `/soc-2-type-i-vs-type-ii`

## Dynamic Profiles — 101+ URLs
- **Company Directory**: `/compliance/directory/[slug]`
- These pages are generated dynamically from the `company_signals` table in Supabase. They are included in the sitemap for SEO but are not counted as "Core Routes".

## Totals (Summary)
- **Core Routes**: 151
- **Dynamic Profiles**: 101
- **Total Indexable URLs**: 252

> **Note**: The architectural core has grown from 145 to 151 with the addition of ISO 42001 and enhanced VRA tools.
