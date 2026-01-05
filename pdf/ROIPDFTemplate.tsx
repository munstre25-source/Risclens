import React from 'react';

export interface ROIPDFData {
  id: string;
  company_name: string;
  industry: string;
  num_employees: number;
  email: string;
  manualCost: number;
  automationCost: number;
  allInOneCost: number;
  savings: number;
  recommendation: string;
  breakdown: any;
  frameworks: string[];
}

interface ROIPDFTemplateProps {
  data: ROIPDFData;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ROIPDFTemplate({ data }: ROIPDFTemplateProps) {
  const logoUrl = 'https://risclens.com/logo/logo-wordmark.png';

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>Compliance ROI & Procurement Roadmap - {data.company_name}</title>
        <style>{`
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; padding: 40px; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px; }
          .title { font-size: 24pt; font-weight: bold; color: #0f172a; }
          .subtitle { font-size: 14pt; color: #64748b; }
          .roi-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 30px; }
          .savings { font-size: 32pt; font-weight: bold; color: #16a34a; }
          .section-title { font-size: 16pt; font-weight: bold; color: #0f172a; margin: 25px 0 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #f1f5f9; padding: 12px; text-align: left; border: 1px solid #e2e8f0; }
          td { padding: 12px; border: 1px solid #e2e8f0; }
          .recommendation { background: #eff6ff; border-left: 5px solid #3b82f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { margin-top: 50px; font-size: 9pt; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        `}</style>
      </head>
      <body>
        <div className="header">
          <img src={logoUrl} alt="RiscLens" style={{ height: '40px', marginBottom: '10px' }} />
          <div className="title">Compliance ROI & Procurement Roadmap</div>
          <div className="subtitle">Prepared for {data.company_name} | January 2026</div>
        </div>

        <div className="roi-box">
          <div style={{ fontSize: '12pt', color: '#64748b', marginBottom: '5px' }}>Estimated Annual Savings Opportunity</div>
          <div className="savings">{formatCurrency(data.savings)}</div>
          <div style={{ marginTop: '10px', fontSize: '11pt' }}>
            Based on your organization of {data.num_employees} employees and {data.frameworks.join(', ')} requirements.
          </div>
        </div>

        <div className="recommendation">
          <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>Strategic Recommendation</h3>
          <p style={{ margin: 0 }}>
            Our analysis suggests the <strong>{data.recommendation.replace(/_/g, ' ').toUpperCase()}</strong> approach 
            is the most cost-effective path for {data.company_name}. This model optimizes for speed-to-audit while 
            minimizing internal security lead overhead.
          </p>
        </div>

        <div className="section">
          <div className="section-title">Cost Comparison Matrix</div>
          <table>
            <thead>
              <tr>
                <th>Cost Component</th>
                <th>Manual Route</th>
                <th>Automation Platform</th>
                <th>All-in-One</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Platform Fee</td>
                <td>$0</td>
                <td>{formatCurrency(data.breakdown.automation.platform)}</td>
                <td>{formatCurrency(data.breakdown.all_in_one?.platform || data.breakdown.allInOne.platform)}</td>
              </tr>
              <tr>
                <td>Auditor Fees</td>
                <td>{formatCurrency(data.breakdown.manual.auditor)}</td>
                <td>{formatCurrency(data.breakdown.automation.auditor)}</td>
                <td>Included</td>
              </tr>
              <tr>
                <td>Internal Effort (Est.)</td>
                <td>{formatCurrency(data.breakdown.manual.internal)}</td>
                <td>{formatCurrency(data.breakdown.automation.internal)}</td>
                <td>{formatCurrency(data.breakdown.all_in_one?.internal || data.breakdown.allInOne.internal)}</td>
              </tr>
              <tr style={{ fontWeight: 'bold', background: '#f8fafc' }}>
                <td>TOTAL ESTIMATE</td>
                <td>{formatCurrency(data.manualCost)}</td>
                <td>{formatCurrency(data.automationCost)}</td>
                <td>{formatCurrency(data.allInOneCost)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section">
          <div className="section-title">2026 Procurement Roadmap</div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Phase 1: Tool Selection (Month 1)</strong><br />
            Evaluate Vanta vs Drata (Automation) or Thoropass (All-in-One) based on your framework list.
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Phase 2: Implementation (Month 2-3)</strong><br />
            Connect cloud infrastructure and HRIS. Map controls to selected frameworks.
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Phase 3: Observation Period (Month 4-6)</strong><br />
            Collect evidence and remediate gaps identified by the platform.
          </div>
          <div>
            <strong>Phase 4: Audit (Month 7)</strong><br />
            Engagement with AICPA-certified auditor for SOC 2 Type 1 or Type 2.
          </div>
        </div>

        <div className="footer">
          Confidential Procurement Report | ID: {data.id}<br />
          Generated by RiscLens ROI Engine. Not an official audit opinion.
        </div>
      </body>
    </html>
  );
}
