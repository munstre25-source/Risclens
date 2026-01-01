# RiscLens AI Governance Rules

## Purpose

This document defines strict rules for AI behavior within the RiscLens codebase.
These rules ensure that compliance scoring, recommendations, and PDF generation
remain **deterministic, inspectable, and non-hallucinatory**.

---

## Core Principles

### 1. Deterministic Compliance Logic

All compliance-related logic MUST be:

- **Deterministic**: Same inputs always produce same outputs
- **Inspectable**: Every score/recommendation can be traced to explicit rules
- **Rules-based**: Derived from configuration files, not AI reasoning

### 2. AI Role Boundaries

#### AI MAY:
- Explain deterministic outputs in natural language
- Rewrite predefined content for clarity and readability
- Format data for display
- Summarize deterministic results
- Improve tone and formatting of templated text
- Answer questions about the codebase structure

#### AI MAY NOT:
- Decide readiness scores
- Invent compliance gaps or vulnerabilities
- Generate unbounded compliance advice
- Create new recommendations not in the library
- Claim audit outcomes or certification status
- Modify scoring weights or formulas
- Override deterministic logic with AI reasoning

---

## Scoring Rules

### Source of Truth

All scoring logic is defined in:
- `lib/scoring-config.ts` - Scoring weights and bands
- `lib/scoring.ts` - Score calculation functions
- `lib/recommendations-library.ts` - Predefined recommendations

### Scoring Formula

```
readiness_score = normalize(
  company_size_points +
  timeline_points +
  data_type_points +
  requester_points +
  role_points +
  industry_points
)
```

### Readiness Bands

| Score Range | Band Label | Meaning |
|------------|------------|---------|
| 0-30 | Pre-audit | Foundational work required |
| 31-60 | Early-stage readiness | Gaps exist, assessment needed |
| 61-80 | Near-ready | Minor refinements needed |
| 81-100 | Audit-ready | Ready to engage auditor |

### Cost Estimate Formula

```
cost = (base + employee_cost + data_type_cost) × urgency_multiplier × industry_multiplier
```

---

## Recommendation Rules

### Source of Truth

All recommendations MUST come from:
- `lib/recommendations-library.ts` - RECOMMENDATION_LIBRARY array

### Trigger Conditions

Each recommendation has explicit trigger conditions:
- `audit_timeline`: Months until audit date
- `data_type`: Presence of specific data type
- `company_size`: Employee count ranges
- `industry`: Industry classification
- `requester`: SOC 2 requester types
- `readiness_band`: Current readiness band
- `always`: Universal recommendations

### AI Text Rewriting

AI MAY rewrite recommendation text for clarity, but:
- Must preserve the core message
- Must not change the trigger condition
- Must not add new compliance claims
- Must not remove SOC 2 control category references

---

## PDF Generation Rules

### Template Structure

PDFs are assembled from templated sections in `pdf/PDFTemplate.tsx`:

1. **Header** - Company name, date (templated)
2. **Executive Summary** - Readiness band description (templated per band)
3. **Score Display** - Numeric score (from calculation)
4. **Cost Breakdown** - Templated explanation
5. **Control Areas** - Conditional based on data types
6. **Timeline** - Calculated from audit date
7. **Evidence Examples** - Templated list
8. **Next Steps** - Templated checklist
9. **Disclaimer** - MANDATORY, cannot be removed

### Disclaimer Requirement

Every PDF MUST include this disclaimer:

> "This report provides a readiness estimate based on provided inputs and does not 
> constitute an audit opinion. RiscLens does not provide legal advice, audit services, 
> or SOC 2 certification."

### AI Content in PDFs

AI MAY:
- Fill templated sections with formatted data
- Adjust section ordering for readability
- Summarize deterministic outputs

AI MAY NOT:
- Add free-form compliance advice
- Claim audit outcomes
- Identify gaps not derived from inputs
- Remove or modify the disclaimer

---

## Code Change Rules

### Before Modifying Scoring Logic

1. Review `lib/scoring-config.ts` for weight definitions
2. Understand the scoring formula in `lib/scoring.ts`
3. Ensure changes maintain determinism
4. Update this rules file if bands/weights change

### Before Modifying Recommendations

1. Review `lib/recommendations-library.ts`
2. Each new recommendation MUST have:
   - Unique ID
   - SOC 2 control category (CC1-CC9, A1, C1, PI1, P1)
   - Explicit trigger condition
   - Priority level
3. Do not create recommendations via AI reasoning

### Before Modifying PDF Template

1. Review `pdf/PDFTemplate.tsx` structure
2. Maintain all required sections
3. Never remove the disclaimer
4. Keep templated structure

---

## Prohibited Patterns

### ❌ AI-Decided Scores

```typescript
// WRONG - AI reasoning for scores
const score = await ai.analyze("What should the readiness score be?");

// CORRECT - Deterministic calculation
const score = calculateDetailedScore(input);
```

### ❌ AI-Generated Recommendations

```typescript
// WRONG - AI creating recommendations
const recs = await ai.generate("What should this company do for SOC 2?");

// CORRECT - Rules-based selection
const recs = selectRecommendations(input);
```

### ❌ AI-Identified Gaps

```typescript
// WRONG - AI finding gaps
const gaps = await ai.analyze("What compliance gaps does this company have?");

// CORRECT - Gaps derived from input data
const gaps = input.data_types.filter(dt => CONTROL_AREAS[dt]);
```

### ❌ Probabilistic Scores

```typescript
// WRONG - Confidence or probability scores
const score = { value: 65, confidence: 0.8 };

// CORRECT - Deterministic score only
const score = { value: 65, isFullyDeterministic: true };
```

---

## Audit Trail

All scoring results include:

```typescript
{
  isFullyDeterministic: true,
  calculatedAt: "2025-01-01T00:00:00.000Z",
  breakdown: [
    { input: "Company Size", value: 25, points: 15, rationale: "..." },
    // ... full breakdown
  ]
}
```

This enables:
- Full auditability of every score
- Traceability from input to output
- Reproducibility of results

---

## Enforcement

1. Code reviews MUST verify scoring changes maintain determinism
2. Tests MUST verify same inputs produce same outputs
3. AI-generated code MUST be reviewed for compliance logic
4. Cursor/AI assistants MUST follow these rules

---

## Version

- Last Updated: 2025-01-01
- Version: 1.0.0
- Maintainer: RiscLens Engineering
