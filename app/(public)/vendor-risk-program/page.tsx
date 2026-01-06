import { LeadForm } from '@/components/LeadForm';
import { Metadata } from 'next';
import { messaging } from '@/src/content/messaging';

export const metadata: Metadata = {
  title: 'Set Up Vendor Risk Program | Risclens',
  description: 'Implement a lightweight scoring model, review cadence, and evidence flow that auditors accept.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function VendorRiskProgramPage() {
  return (
    <div className="container-narrow py-16">
      <LeadForm
        title={messaging.vendorRisk.hero.headline}
        description={messaging.vendorRisk.hero.subhead}
        ctaLabel={messaging.vendorRisk.hero.cta}
        successMessage="Thanks! We've received your request. We'll send over the program overview and template links shortly, and reach out to discuss your specific needs."
        endpoint="/api/lead/submit"
        analyticsEvent="vendor_risk_program"
        disclaimer="Designed for early-stage teams. No sales pressure, just practical advice."
        fields={[
          { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Jane Doe' },
          { name: 'email', label: 'Work Email', type: 'email', required: true, placeholder: 'jane@company.com' },
          { name: 'company', label: 'Company Name', type: 'text', required: true, placeholder: 'Acme Inc.' },
          {
            name: 'vendor_count',
            label: 'Estimated Number of Vendors',
            type: 'select',
            required: true,
            options: [
              { value: '1-10', label: '1-10' },
              { value: '11-50', label: '11-50' },
              { value: '51-100', label: '51-100' },
              { value: '100+', label: '100+' },
            ],
          },
          {
            name: 'customer_demand',
            label: 'Do customers demand SOC 2 or similar?',
            type: 'select',
            required: true,
            options: [
              { value: 'yes', label: 'Yes, frequently' },
              { value: 'sometimes', label: 'Occasionally' },
              { value: 'no', label: 'Not yet' },
            ],
          },
          {
            name: 'timeline',
            label: 'Timeline to implement',
            type: 'select',
            required: true,
            options: [
              { value: 'immediate', label: 'ASAP' },
              { value: '30_days', label: 'Within 30 days' },
              { value: 'not_sure', label: 'Just researching' },
            ],
          },
          { name: 'lead_type', label: '', type: 'text', required: false },
        ]}
        initialData={{ lead_type: 'vendor_risk_program' }}
      />
    </div>
  );
}
