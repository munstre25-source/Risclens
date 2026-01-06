import { LeadForm } from '@/components/LeadForm';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Review | Risclens',
  description: 'Get a focused readiness review to identify gaps before you commit to an audit timeline.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReadinessReviewPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'SOC 2', href: '/soc-2' },
              { label: 'Readiness Review' }
            ]} 
          />
        </div>
        <div className="container-narrow py-12">
          <LeadForm
            title="Get a SOC 2 Readiness Review"
            description="Identify gaps early and avoid surprises during your audit. Our team will review your inputs and provide a summary of where auditors commonly challenge readiness."
            ctaLabel="Request Readiness Review"
            successMessage="Thanks! We've received your request. One of our specialists will review your inputs and reach out within 24 hours."
            endpoint="/api/lead/submit"
            analyticsEvent="soc2_readiness_review"
            pdfTemplate="readiness"
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
            postSubmitNode={
              <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-6 text-left">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs">TIP</span>
                  While you wait...
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Many teams find it helpful to benchmark their expected costs before the review. Check out our cost calculator.
                </p>
                <a 
                  href="/soc-2-cost-calculator"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md font-semibold hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Bookmark the SOC 2 Cost Calculator →
                </a>
              </div>
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
