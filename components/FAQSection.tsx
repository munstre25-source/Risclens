'use client';

import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  id: string;
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

export function FAQSection({ id, faqs, title = "Frequently Asked Questions", className = "" }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Script
        id={`faq-schema-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {title && <h3 className="text-xl font-bold text-slate-900 mb-6">{title}</h3>}
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
            <h4 className="font-bold text-slate-900 mb-2">{faq.question}</h4>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
