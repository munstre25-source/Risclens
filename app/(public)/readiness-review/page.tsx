import { LeadForm } from '@/components/LeadForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Review | Risclens',
  description: 'Get a focused readiness review to identify gaps before you commit to an audit timeline.',
};

export default function ReadinessReviewPage() {
  return (
    <div className="container-narrow py-16">
      <LeadForm
        title="Get a SOC 2 Readiness Review"
        description="Identify gaps early and avoid surprises during your audit. Our team will review your inputs and provide a summary of where auditors commonly challenge readiness."
        ctaLabel="Request Readiness Review"
        successMessage="Thanks! We've received your request. One of our specialists will review your inputs and reach out within 24 hours."
        endpoint="/api/lead/submit"
        analyticsEvent="soc2_readiness_review"
        disclaimer="No sales calls unless requested. One-time review of your current state."
        fields={[
          { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Jane Doe' },
          { name: 'email', label: 'Work Email', type: 'email', required: true, placeholder: 'jane@company.com' },
          { name: 'company', label: 'Company Name', type: 'text', required: true, placeholder: 'Acme Inc.' },
          { name: 'role', label: 'Your Role', type: 'text', required: true, placeholder: 'CTO, Head of Engineering, etc.' },
          {
            name: 'timeline',
            label: 'Desired Audit Start',
            type: 'select',
            required: true,
            options: [
              { value: 'immediate', label: 'As soon as possible' },
              { value: '3_months', label: 'Within 3 months' },
              { value: '6_months', label: '3-6 months' },
              { value: 'unclear', label: 'Not sure yet' },
            ],
          },
          { name: 'lead_type', label: '', type: 'text', required: false }, // Hidden field via initialData
        ]}
        initialData={{ lead_type: 'soc2_readiness_review' }}
      />
    </div>
  );
}
