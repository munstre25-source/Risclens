# EEAT Implementation Guidelines (Google 2026 Standards)

RiscLens adheres to the highest standards of Expertise, Experience, Authoritativeness, and Trustworthiness (E-E-A-T) to ensure long-term search visibility and user trust.

## 1. Expertise & Experience
- **Certified Reviewers**: All content is mapped to specific subject matter experts (SMEs) in `lib/authors.ts`.
  - **Financial/Audit**: Raphael N. (CPA, CISA)
  - **Legal/Privacy**: Sarah L. (JD, CIPP/E)
  - **Technical/Security**: Kevin A. (CISSP)
- **First-Hand Insights**: We prioritize experience-based content, such as "Negotiation Strategies" in pricing guides and "Common Auditor Pitfalls" in checklists.
- **Author Bios**: Every page must include the `AuthorBio` component, which displays credentials and links to professional verification (LinkedIn).

## 2. Authoritativeness
- **Schema.org Integration**: We use structured data to explicitly define entities.
  - `Person`: Linked to the author of the content.
  - `Organization`: RiscLens as the publisher.
  - `Review`: Technical verification of tools/pricing.
- **SME Sourcing**: We do not use generalist copywriters for technical compliance content. All drafts are audited by the SME before publication.

## 3. Trustworthiness
- **Editorial Independence**: We maintain a strict boundary between our data and vendor referral programs. Our scoring is deterministic, not paid.
- **Transparency Pages**:
  - `/editorial-policy`: Explains our fact-checking and review process.
  - `/methodology`: Explains the logic behind our calculators and scores.
- **Data Freshness**:
  - Quarterly technical audits of all pSEO pages.
  - "Last Verified" dates prominently displayed.
- **Security & Privacy**: We maintain our own Trust Center at `/security` to demonstrate we "walk the talk."

## 4. Technical Checklist for New Pages
1. [ ] Assign an appropriate SME from `lib/authors.ts`.
2. [ ] Include `AuthorBio` component.
3. [ ] Inject `Person` and `Review` JSON-LD.
4. [ ] Link to `/editorial-policy` or `/methodology` in the footer/body.
5. [ ] Update "Last Verified" date to the current quarter.
6. [ ] Ensure no "thin content" (all programmatic sections must provide unique value).
