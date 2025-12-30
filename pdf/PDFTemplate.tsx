import React from 'react';

// Lead data interface for PDF generation
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

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper to format date
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Generate timeline months based on audit date
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

// Generate checklist based on data types
const generateChecklist = (dataTypes: string[]) => {
  const baseItems = [
    { item: 'Define security policies and procedures', priority: 'High' },
    { item: 'Implement access control management', priority: 'High' },
    { item: 'Set up security monitoring and logging', priority: 'High' },
    { item: 'Establish incident response procedures', priority: 'Medium' },
    { item: 'Configure network security controls', priority: 'Medium' },
    { item: 'Implement change management process', priority: 'Medium' },
    { item: 'Create employee security training program', priority: 'Medium' },
    { item: 'Set up vendor management process', priority: 'Low' },
  ];

  const additionalItems: { item: string; priority: string }[] = [];

  if (dataTypes.includes('pii')) {
    additionalItems.push(
      { item: 'Implement data classification for PII', priority: 'High' },
      { item: 'Set up data encryption at rest and in transit', priority: 'High' }
    );
  }

  if (dataTypes.includes('financial')) {
    additionalItems.push(
      { item: 'Implement financial data access controls', priority: 'High' },
      { item: 'Set up transaction logging and monitoring', priority: 'High' }
    );
  }

  if (dataTypes.includes('health')) {
    additionalItems.push(
      { item: 'Review HIPAA compliance requirements', priority: 'High' },
      { item: 'Implement PHI-specific access controls', priority: 'High' }
    );
  }

  return [...additionalItems, ...baseItems].slice(0, 10);
};

// Evidence examples
const EVIDENCE_EXAMPLES = [
  { category: 'Access Control', examples: ['User access reviews', 'Role-based access matrix', 'Termination checklists'] },
  { category: 'Security Monitoring', examples: ['Security event logs', 'Vulnerability scan reports', 'Penetration test results'] },
  { category: 'Change Management', examples: ['Change request tickets', 'Code review documentation', 'Deployment logs'] },
  { category: 'Incident Response', examples: ['Incident response plan', 'Incident tickets', 'Post-mortem reports'] },
];

/**
 * PDFTemplate - React component for rendering PDF content
 * This component is designed to be rendered server-side to HTML,
 * then converted to PDF using Playwright or fallback HTML-PDF library.
 */
export default function PDFTemplate({ lead }: PDFTemplateProps) {
  const timeline = generateTimeline(lead.audit_date);
  const checklist = generateChecklist(lead.data_types);

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
            font-size: 12pt;
            opacity: 0.9;
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
          .priority-high { color: #dc2626; }
          .priority-medium { color: #d97706; }
          .priority-low { color: #059669; }
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
          .evidence-list {
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
          .footer {
            margin-top: 30px;
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
        {/* Header */}
        <div className="header">
          <h1>SOC 2 Readiness Report</h1>
          <div className="subtitle">
            Prepared for {lead.company_name} | {formatDate(new Date().toISOString())}
          </div>
        </div>

        {/* Executive Summary - Score */}
        <div className="score-box">
          <div className="score">{lead.readiness_score}</div>
          <div className="label">Readiness Score (out of 100)</div>
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

        {/* Scope Definition */}
        <div className="section">
          <h2 className="section-title">Scope Definition</h2>
          <p style={{ marginBottom: '10px' }}>
            Based on your inputs, your SOC 2 Type II audit should cover the following:
          </p>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>Industry:</strong> {lead.industry.charAt(0).toUpperCase() + lead.industry.slice(1)}</li>
            <li><strong>Data Types:</strong> {lead.data_types.map(d => d.toUpperCase()).join(', ')}</li>
            <li><strong>Trust Service Criteria:</strong> Security (required), plus Availability and Confidentiality based on your data types</li>
          </ul>
        </div>

        {/* Compliance Checklist */}
        <div className="section">
          <h2 className="section-title">Compliance Checklist</h2>
          <table>
            <thead>
              <tr>
                <th style={{ width: '60%' }}>Action Item</th>
                <th style={{ width: '20%' }}>Priority</th>
                <th style={{ width: '20%' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {checklist.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td className={`priority-${item.priority.toLowerCase()}`}>{item.priority}</td>
                  <td>☐ Not Started</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Timeline */}
        <div className="section">
          <h2 className="section-title">Recommended Timeline</h2>
          {timeline.map((phase, index) => (
            <div key={index} className="timeline-item">
              <div className="phase">{phase.name}</div>
              <div className="months">
                Month {phase.startMonth} - Month {phase.endMonth}
              </div>
            </div>
          ))}
        </div>

        {/* Evidence Examples */}
        <div className="section">
          <h2 className="section-title">Evidence Examples & Templates</h2>
          <div className="evidence-list">
            {EVIDENCE_EXAMPLES.map((cat, index) => (
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

        {/* Next Steps */}
        <div className="section">
          <div className="next-steps">
            <h3>Recommended Next Steps</h3>
            <ol>
              <li>Review this report and share with your compliance team</li>
              <li>Conduct a detailed gap assessment using the checklist above</li>
              <li>Prioritize high-priority items and assign ownership</li>
              <li>Begin policy documentation if not already in place</li>
              <li>Consider engaging a SOC 2 readiness consultant for guidance</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>This report was generated by RiscLens SOC 2 Calculator</p>
          <p>Report ID: {lead.id} | Generated: {formatDate(new Date().toISOString())}</p>
          <p>For questions, contact support@risclens.com</p>
        </div>
      </body>
    </html>
  );
}

