'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VendorRiskRelatedLinks } from '@/components/vendor-risk/VendorRiskRelatedLinks';
import VendorRiskLeadMagnet from '@/components/vendor-risk/VendorRiskLeadMagnet';
import { FAQSection } from '@/components/FAQSection';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface FAQItem {
  question: string;
  answer: string;
}

interface VendorRiskTopicPageProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category?: string;
  children: React.ReactNode;
  faqs?: FAQItem[];
  leadMagnet?: {
    title: string;
    description: string;
    buttonText: string;
    templateId: string;
    resourceName: string;
  };
}

export function VendorRiskTopicPage({
  id,
  title,
  subtitle,
  description,
  category = "Vendor Risk Assessment",
  children,
  faqs,
  leadMagnet
}: VendorRiskTopicPageProps) {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Vendor Risk', href: '/vendor-risk-assessment' },
              { label: title }
            ]} 
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-14 lg:pb-18 pt-4 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{category}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{title}</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          {children}

          {faqs && faqs.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <FAQSection id={id} faqs={faqs} />
            </div>
          )}

          {leadMagnet && (
            <VendorRiskLeadMagnet
              title={leadMagnet.title}
              description={leadMagnet.description}
              buttonText={leadMagnet.buttonText}
              templateId={leadMagnet.templateId}
              resourceName={leadMagnet.resourceName}
            />
          )}

          <VendorRiskRelatedLinks />
        </div>
      </section>
      <Footer />
    </main>
  );
}
