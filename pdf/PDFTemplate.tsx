import React from 'react';

/**
 * ENTERPRISE-GRADE PDF TEMPLATE
 * 
 * This template is fully structured and deterministic.
 * 
 * CRITICAL RULES:
 * - All content is templated or derived from deterministic inputs
 * - No free-form AI-generated sections
 * - AI may only fill predefined sections with formatted data
 * - Disclaimer is mandatory and cannot be removed
 * 
 * STRUCTURE:
 * 1. Executive Summary (templated)
 * 2. Readiness Band Explanation (templated per band)
 * 3. Cost Range Explanation (templated)
 * 4. Control Gap Sections (conditional, from input data)
 * 5. Next-Step Checklist (templated)
 * 6. Disclaimer Footer (mandatory)
 */

// =============================================================================
// INTERFACES
// =============================================================================

export interface PDFLeadData {
  id: string;
  company_name: string;
  industry: string;
  num_employees: number;
  data_types: string[];
  audit_date: string;
  role: string;
  email: string;
  readiness_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  lead_score: number;
}

interface PDFTemplateProps {
  lead: PDFLeadData;
}

// =============================================================================
// TEMPLATED CONTENT
// =============================================================================

// Readiness band templates - deterministic text based on score ranges
const READINESS_BAND_TEMPLATES = {
  PRE_AUDIT: {
    min: 0,
    max: 30,
    label: 'Pre-audit',
    summary: 'Your organization is in the pre-audit phase.',
    detail: 'This means foundational security controls, policies, and documentation are not yet in place. Significant preparation is required before engaging an auditor. Focus on establishing baseline security practices and policy frameworks.',
    priorities: [
      'Establish basic security policies',
      'Implement access control management',
      'Create incident response procedures',
      'Document data handling practices',
    ],
  },
  EARLY_STAGE: {
    min: 31,
    max: 60,
    label: 'Early-stage readiness',
    summary: 'Your organization shows early-stage SOC 2 readiness.',
    detail: 'Some controls may be in place, but gaps exist in policy documentation, evidence collection, or control implementation. A formal gap assessment is recommended to identify specific areas requiring attention.',
    priorities: [
      'Conduct gap assessment',
      'Document existing controls',
      'Begin evidence collection process',
      'Assign control ownership',
    ],
  },
  NEAR_READY: {
    min: 61,
    max: 80,
    label: 'Near-ready',
    summary: 'Your organization is near-ready for SOC 2 audit.',
    detail: 'Most controls are implemented, but some refinement or evidence collection may be needed. Consider a pre-audit readiness review to identify any remaining gaps before auditor engagement.',
    priorities: [
      'Complete evidence collection',
      'Address remaining control gaps',
      'Conduct pre-audit review',
      'Prepare for auditor walkthrough',
    ],
  },
  AUDIT_READY: {
    min: 81,
    max: 100,
    label: 'Audit-ready',
    summary: 'Your organization appears audit-ready.',
    detail: 'Controls are in place, policies are documented, and evidence collection processes are established. You are ready to proceed with auditor selection and engagement.',
    priorities: [
      'Select and engage auditor',
      'Finalize evidence packages',
      'Schedule audit kickoff',
      'Prepare stakeholder briefings',
    ],
  },
};

// Cost explanation template
const COST_EXPLANATION_TEMPLATE = {
  intro: 'The estimated cost range is based on:',
  factors: [
    'Base auditor engagement and compliance platform fees',
    'Organization size and complexity (employee count)',
    'Data sensitivity and regulatory requirements (data types handled)',
    'Timeline urgency (audit deadline)',
    'Industry-specific compliance complexity',
  ],
  note: 'Actual costs may vary based on auditor selection, scope changes, and remediation requirements.',
  includes: 'This estimate includes: auditor fees, compliance tooling, and internal preparation effort.',
};

// Next steps checklist (templated)
const NEXT_STEPS_CHECKLIST = [
  { step: 'Review this report with your compliance or security team', priority: 1 },
  { step: 'Conduct or schedule a detailed gap assessment', priority: 2 },
  { step: 'Assign ownership for each SOC 2 control category', priority: 3 },
  { step: 'Begin policy documentation if not already in place', priority: 4 },
  { step: 'Establish evidence collection processes', priority: 5 },
  { step: 'Evaluate compliance automation tools', priority: 6 },
  { step: 'Consider engaging a SOC 2 readiness consultant', priority: 7 },
  { step: 'Select and engage auditor when ready', priority: 8 },
];

// Control areas based on data types (conditional sections)
const CONTROL_AREA_TEMPLATES: Record<string, { title: string; controls: string[] }> = {
  pii: {
    title: 'PII / Personal Data Controls',
    controls: [
      'Data classification and inventory',
      'Encryption at rest and in transit',
      'Access logging and monitoring',
      'Data retention and disposal procedures',
      'Privacy notice and consent management',
    ],
  },
  financial: {
    title: 'Financial Data Controls',
    controls: [
      'Financial data access restrictions',
      'Transaction logging and audit trails',
      'Segregation of duties',
      'Financial system access reviews',
      'Encryption for financial data at rest',
    ],
  },
  health: {
    title: 'Health / PHI Data Controls',
    controls: [
      'HIPAA-aligned access controls',
      'PHI-specific audit logging',
      'Business associate agreements (BAAs)',
      'PHI encryption requirements',
      'Minimum necessary access principle',
    ],
  },
  intellectual_property: {
    title: 'Intellectual Property Controls',
    controls: [
      'Source code access restrictions',
      'Code repository security',
      'IP classification and handling',
      'NDA management',
      'DLP controls for sensitive IP',
    ],
  },
  customer_data: {
    title: 'Customer Data Controls',
    controls: [
      'Customer data segregation',
      'Access control by customer',
      'Data confidentiality agreements',
      'Secure data sharing procedures',
      'Customer data backup and recovery',
    ],
  },
};

// Evidence categories (templated)
const EVIDENCE_TEMPLATES = [
  { category: 'Access Control', examples: ['User access reviews', 'Role-based access matrix', 'Termination checklists', 'Access request tickets'] },
  { category: 'Security Monitoring', examples: ['Security event logs', 'Vulnerability scan reports', 'Penetration test results', 'SIEM dashboards'] },
  { category: 'Change Management', examples: ['Change request tickets', 'Code review documentation', 'Deployment logs', 'Rollback procedures'] },
  { category: 'Incident Response', examples: ['Incident response plan', 'Incident tickets', 'Post-mortem reports', 'Escalation procedures'] },
  { category: 'Policy & Governance', examples: ['Security policies', 'Employee handbook', 'Training records', 'Board meeting minutes'] },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const getReadinessBand = (score: number) => {
  if (score <= 30) return READINESS_BAND_TEMPLATES.PRE_AUDIT;
  if (score <= 60) return READINESS_BAND_TEMPLATES.EARLY_STAGE;
  if (score <= 80) return READINESS_BAND_TEMPLATES.NEAR_READY;
  return READINESS_BAND_TEMPLATES.AUDIT_READY;
};

const generateTimeline = (auditDate: string) => {
  const audit = new Date(auditDate);
  const today = new Date();
  const monthsUntilAudit = Math.max(
    1,
    Math.ceil((audit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30))
  );

  const phases = [
    { name: 'Gap Assessment & Planning', percentage: 15 },
    { name: 'Policy Development', percentage: 25 },
    { name: 'Control Implementation', percentage: 35 },
    { name: 'Evidence Collection', percentage: 15 },
    { name: 'Audit Readiness Review', percentage: 10 },
  ];

  let currentMonth = 0;
  return phases.map((phase) => {
    const startMonth = currentMonth + 1;
    const duration = Math.max(1, Math.round((monthsUntilAudit * phase.percentage) / 100));
    currentMonth += duration;
    return {
      ...phase,
      startMonth,
      endMonth: Math.min(currentMonth, monthsUntilAudit),
    };
  });
};

// =============================================================================
// PDF TEMPLATE COMPONENT
// =============================================================================

export default function PDFTemplate({ lead }: PDFTemplateProps) {
  const logoUrl =
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/logo/logo-wordmark.png`
      : 'https://risclens.com/logo/logo-wordmark.png');
  const readinessBand = getReadinessBand(lead.readiness_score);
  const timeline = generateTimeline(lead.audit_date);
  const applicableControlAreas = lead.data_types
    .filter(dt => CONTROL_AREA_TEMPLATES[dt])
    .map(dt => CONTROL_AREA_TEMPLATES[dt]);

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>SOC 2 Readiness Report - {lead.company_name}</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #1f2937;
            padding: 40px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #0ea5e9;
          }
          .header h1 {
            font-size: 24pt;
            color: #0369a1;
            margin-bottom: 10px;
          }
          .header .subtitle {
            font-size: 14pt;
            color: #6b7280;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 14pt;
            font-weight: bold;
            color: #0369a1;
            margin-bottom: 12px;
            padding-bottom: 6px;
            border-bottom: 1px solid #e5e7eb;
          }
          .score-box {
            background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 25px;
          }
          .score-box .score {
            font-size: 48pt;
            font-weight: bold;
          }
          .score-box .label {
            font-size: 14pt;
            opacity: 0.9;
            margin-top: 5px;
          }
          .score-box .band {
            font-size: 12pt;
            opacity: 0.8;
            margin-top: 10px;
            padding: 5px 15px;
            background: rgba(255,255,255,0.2);
            border-radius: 20px;
            display: inline-block;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 25px;
          }
          .summary-item {
            background: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
          }
          .summary-item .value {
            font-size: 16pt;
            font-weight: bold;
            color: #0369a1;
          }
          .summary-item .label {
            font-size: 9pt;
            color: #6b7280;
            text-transform: uppercase;
          }
          .executive-summary {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #0ea5e9;
            margin-bottom: 25px;
          }
          .executive-summary h3 {
            color: #0369a1;
            margin-bottom: 10px;
          }
          .executive-summary p {
            margin-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          th, td {
            padding: 10px 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }
          th {
            background: #f9fafb;
            font-weight: 600;
            color: #374151;
          }
          .priority-list {
            list-style: none;
            padding: 0;
          }
          .priority-list li {
            padding: 8px 0 8px 25px;
            position: relative;
          }
          .priority-list li::before {
            content: "→";
            position: absolute;
            left: 0;
            color: #0ea5e9;
            font-weight: bold;
          }
          .timeline-item {
            padding: 12px 0;
            border-left: 3px solid #0ea5e9;
            padding-left: 15px;
            margin-bottom: 10px;
          }
          .timeline-item .phase {
            font-weight: 600;
            color: #1f2937;
          }
          .timeline-item .months {
            font-size: 10pt;
            color: #6b7280;
          }
          .control-area {
            background: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
          }
          .control-area h4 {
            color: #0369a1;
            margin-bottom: 10px;
          }
          .control-area ul {
            padding-left: 20px;
            font-size: 10pt;
          }
          .control-area li {
            margin-bottom: 4px;
          }
          .evidence-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          .evidence-category {
            background: #f9fafb;
            padding: 12px;
            border-radius: 8px;
          }
          .evidence-category h4 {
            font-size: 10pt;
            font-weight: 600;
            color: #0369a1;
            margin-bottom: 6px;
          }
          .evidence-category ul {
            font-size: 9pt;
            padding-left: 15px;
            color: #4b5563;
          }
          .next-steps {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #bae6fd;
          }
          .next-steps h3 {
            color: #0369a1;
            margin-bottom: 12px;
          }
          .next-steps ol {
            padding-left: 20px;
          }
          .next-steps li {
            margin-bottom: 6px;
          }
          .cost-explanation {
            background: #fefce8;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #eab308;
            margin-top: 15px;
          }
          .cost-explanation h4 {
            color: #a16207;
            margin-bottom: 8px;
          }
          .cost-explanation ul {
            padding-left: 20px;
            font-size: 10pt;
          }
          .cost-explanation li {
            margin-bottom: 3px;
          }
          .cost-explanation .note {
            font-size: 9pt;
            color: #92400e;
            margin-top: 10px;
            font-style: italic;
          }
          .disclaimer {
            margin-top: 30px;
            padding: 15px;
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            font-size: 9pt;
            color: #92400e;
          }
          .disclaimer strong {
            display: block;
            margin-bottom: 5px;
          }
          .footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 9pt;
            color: #9ca3af;
          }
          @media print {
            body { padding: 20px; }
            .section { page-break-inside: avoid; }
          }
        `}</style>
      </head>
      <body>
        {/* ============================================================= */}
        {/* HEADER */}
        {/* ============================================================= */}
        <div className="header">
          <img
            src={logoUrl}
            alt="RiscLens"
            style={{ height: '48px', width: 'auto', marginBottom: '10px' }}
          />
          <h1>SOC 2 Readiness Report</h1>
          <div className="subtitle">
            Prepared for {lead.company_name} | {formatDate(new Date().toISOString())}
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 1: EXECUTIVE SUMMARY (TEMPLATED) */}
        {/* ============================================================= */}
        <div className="score-box">
          <div className="score">{lead.readiness_score}</div>
          <div className="label">Readiness Score (out of 100)</div>
          <div className="band">{readinessBand.label}</div>
        </div>

        <div className="executive-summary">
          <h3>Executive Summary</h3>
          <p><strong>{readinessBand.summary}</strong></p>
          <p>{readinessBand.detail}</p>
        </div>

        {/* Summary Grid */}
        <div className="summary-grid">
          <div className="summary-item">
            <div className="value">{formatCurrency(lead.estimated_cost_low)} - {formatCurrency(lead.estimated_cost_high)}</div>
            <div className="label">Estimated Cost Range</div>
          </div>
          <div className="summary-item">
            <div className="value">{lead.num_employees}</div>
            <div className="label">Employees</div>
          </div>
          <div className="summary-item">
            <div className="value">{formatDate(lead.audit_date)}</div>
            <div className="label">Target Audit Date</div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 2: READINESS BAND EXPLANATION (TEMPLATED) */}
        {/* ============================================================= */}
        <div className="section">
          <h2 className="section-title">Readiness Assessment</h2>
          <p style={{ marginBottom: '15px' }}>
            Based on your inputs, your organization is at the <strong>{readinessBand.label}</strong> stage 
            (score: {readinessBand.min}–{readinessBand.max} range).
          </p>
          <h4 style={{ color: '#0369a1', marginBottom: '10px' }}>Immediate Priorities:</h4>
          <ul className="priority-list">
            {readinessBand.priorities.map((priority, index) => (
              <li key={index}>{priority}</li>
            ))}
          </ul>
        </div>

        {/* ============================================================= */}
        {/* SECTION 3: COST RANGE EXPLANATION (TEMPLATED) */}
        {/* ============================================================= */}
        <div className="section">
          <h2 className="section-title">Cost Estimate Breakdown</h2>
          <div className="summary-grid" style={{ marginBottom: '15px' }}>
            <div className="summary-item">
              <div className="value">{formatCurrency(lead.estimated_cost_low)}</div>
              <div className="label">Low Estimate</div>
            </div>
            <div className="summary-item">
              <div className="value">{formatCurrency(lead.estimated_cost_high)}</div>
              <div className="label">High Estimate</div>
            </div>
            <div className="summary-item">
              <div className="value">{formatCurrency((lead.estimated_cost_low + lead.estimated_cost_high) / 2)}</div>
              <div className="label">Midpoint</div>
            </div>
          </div>
          <div className="cost-explanation">
            <h4>{COST_EXPLANATION_TEMPLATE.intro}</h4>
            <ul>
              {COST_EXPLANATION_TEMPLATE.factors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
            <p className="note">{COST_EXPLANATION_TEMPLATE.note}</p>
            <p style={{ marginTop: '10px', fontSize: '10pt' }}><strong>{COST_EXPLANATION_TEMPLATE.includes}</strong></p>
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 4: CONTROL GAP SECTIONS (CONDITIONAL) */}
        {/* ============================================================= */}
        {applicableControlAreas.length > 0 && (
          <div className="section">
            <h2 className="section-title">Control Areas Based on Your Data Types</h2>
            <p style={{ marginBottom: '15px' }}>
              Based on the data types you handle ({lead.data_types.map(d => d.toUpperCase()).join(', ')}), 
              the following control areas require attention:
            </p>
            {applicableControlAreas.map((area, index) => (
              <div key={index} className="control-area">
                <h4>{area.title}</h4>
                <ul>
                  {area.controls.map((control, i) => (
                    <li key={i}>{control}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* ============================================================= */}
        {/* SECTION 5: RECOMMENDED TIMELINE (TEMPLATED) */}
        {/* ============================================================= */}
        <div className="section">
          <h2 className="section-title">Recommended Timeline</h2>
          <p style={{ marginBottom: '15px' }}>
            Based on your target audit date of {formatDate(lead.audit_date)}:
          </p>
          {timeline.map((phase, index) => (
            <div key={index} className="timeline-item">
              <div className="phase">{phase.name}</div>
              <div className="months">
                Month {phase.startMonth} – Month {phase.endMonth}
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================= */}
        {/* SECTION 6: EVIDENCE EXAMPLES (TEMPLATED) */}
        {/* ============================================================= */}
        <div className="section">
          <h2 className="section-title">Evidence Examples</h2>
          <p style={{ marginBottom: '15px' }}>
            Auditors will request evidence in the following categories:
          </p>
          <div className="evidence-grid">
            {EVIDENCE_TEMPLATES.map((cat, index) => (
              <div key={index} className="evidence-category">
                <h4>{cat.category}</h4>
                <ul>
                  {cat.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 7: NEXT-STEP CHECKLIST (TEMPLATED) */}
        {/* ============================================================= */}
        <div className="section">
          <div className="next-steps">
            <h3>Next Steps Checklist</h3>
            <ol>
              {NEXT_STEPS_CHECKLIST.map((item, index) => (
                <li key={index}>{item.step}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 8: DISCLAIMER (MANDATORY) */}
        {/* ============================================================= */}
        <div className="disclaimer">
          <strong>⚠️ Important Disclaimer</strong>
          This report provides a readiness estimate based on provided inputs and does not constitute 
          an audit opinion. RiscLens does not provide legal advice, audit services, or SOC 2 certification. 
          All results are based on self-reported inputs and should be used for internal planning purposes only. 
          For formal compliance guidance, please consult a qualified auditor or legal professional.
        </div>

        {/* ============================================================= */}
        {/* FOOTER */}
        {/* ============================================================= */}
        <div className="footer">
          <p>This report was generated by RiscLens SOC 2 Readiness Index</p>
          <p>Report ID: {lead.id} | Generated: {formatDate(new Date().toISOString())}</p>
          <p>Questions? Contact reports@risclens.com</p>
        </div>
      </body>
    </html>
  );
}
