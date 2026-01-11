import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

interface AdvancedSchemaProps {
  faq?: FAQItem[];
  softwareApp?: {
    name: string;
    description: string;
    applicationCategory: string;
    operatingSystem: string;
    offers?: {
      price: string;
      priceCurrency: string;
    };
  };
}

export function AdvancedSchema({ faq, softwareApp }: AdvancedSchemaProps) {
  const schemas: any[] = [];

  if (faq && faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  if (softwareApp) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: softwareApp.name,
      description: softwareApp.description,
      applicationCategory: softwareApp.applicationCategory,
      operatingSystem: softwareApp.operatingSystem,
      offers: softwareApp.offers && {
        '@type': 'Offer',
        price: softwareApp.offers.price,
        priceCurrency: softwareApp.offers.priceCurrency,
      },
    });
  }

  if (schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`schema-${index}`}
          id={`advanced-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
