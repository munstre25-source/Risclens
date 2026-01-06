# Route Counts by Category (Sitemap-aligned)

Source: `app/sitemap.ts` output (ROUTES + noindex filtering). Duplicate sitemap entries are de-duped automatically; `/start` is excluded.

## SOC 2 — 100 URLs
- Cost hubs/industries/ranges:  
  `/soc-2-cost`, `/soc-2-cost-breakdown`, `/soc-2-cost/industries`, `/soc-2-cost/{5-10-employees,10-50-employees,50-200-employees,ai-data,auditor-fees,automation-tools-vanta-drata,b2b-saas,cloud-infrastructure,ecommerce,enterprise,evidence-collection,fintech,healthcare,hidden-costs,internal-time-and-headcount,legal-and-grc-support,marketplaces,penetration-testing,policies-and-documentation,saas,security-tooling,startups,type-1-vs-type-2-cost,vendor-management,devtools,edtech,payments}`
- Timeline hubs/ranges:  
  `/soc-2-timeline`, `/soc-2-timeline/{5-10-employees,10-50-employees,50-200-employees,fintech,saas,startups}`
- Readiness flows (Industry variants):  
  `/soc-2-readiness/{saas,fintech,startups,enterprise-sales}`
- Readiness content hub (learn):  
  `/learn/soc-2-readiness` and `/learn/soc-2-readiness/{access-control,user-access-reviews,mfa-and-authentication,change-management,secure-sdlc,logging-and-monitoring,incident-response,vulnerability-management,patch-management,vendor-management,asset-inventory,data-encryption,backup-and-recovery,business-continuity,security-awareness-training,risk-assessment,audit-logging-evidence,least-privilege,endpoint-security,policies-and-procedures}`
- Evidence guides:  
  `/soc-2-evidence/vault`, `/soc-2-evidence/{access-control,change-management,logging-monitoring,incident-response,vendor-management,business-continuity}`
- Industries:  
  `/soc-2/industries`, `/soc-2/industries/{startups,enterprise,saas,b2b-saas,fintech,healthcare,edtech,marketplaces,ai-data,devtools,cloud-infrastructure,ecommerce,payments}`
- Comparisons / guides:  
  `/soc-2/guides`, `/soc-2/auditor-selection`, `/soc-2/continuous-monitoring`, `/soc-2-type-i-vs-type-ii`, `/soc-2-vs-iso-27001`, `/soc-2-vs-iso-27001/{timeline-and-effort,cost-comparison,which-to-choose,for-startups,for-enterprise-sales,mapping-controls-overview}`
- Checklist & misc:  
  `/soc-2-readiness-checklist`, `/when-do-you-need-soc-2`, `/soc-2-readiness-calculator`, `/compliance-roi-calculator`, `/iso-27001-checklist`, `/auditor-directory`

## SOC 2 Sales — 7 URLs
/soc-2-sales, /soc-2-sales/{bridge-letters,security-questionnaires,trust-centers,subservice-organizations,qualified-opinions,multi-framework-mapping}

## Pentest — 16 URLs
/penetration-testing, /penetration-testing/{api,cloud,cost-estimator,mobile,pricing,report,vs-vulnerability-scan,web-application,sow,retesting-remediation,compliance-buyers,saas,fintech,for-soc-2,scoping}

## Vendor Risk (VAR) — 13 URLs
/vendor-risk-assessment, /vendor-risk-assessment/{checklist,common-mistakes,contract-clauses,evidence-by-tier,monitoring-cadence,scoring-model,subprocessors-vs-vendors,triage,questionnaire,roi-calculator,automation-vs-manual,tiering}

## Other (non-category) — 9 URLs
/, /about, /privacy, /terms, /glossary, /security, /auditor-match, /methodology, /compliance/directory

## Totals (Summary)
- Core Routes: 145 (Static architectural pages)
- Dynamic Profiles: 101 (Company directory pages)
- **Total Sitemap URLs**: 246

> **Architecture Note**: We track "Core Routes" (145) separately to monitor the site's structural growth. The 101 dynamic company profiles (accessible via `/compliance/directory/[slug]`) are included in the final `sitemap.xml` for SEO indexing but are not counted towards the architectural core.

