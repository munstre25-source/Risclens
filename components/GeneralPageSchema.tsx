interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface GeneralPageSchemaProps {
  type?: 'Article' | 'WebPage' | 'FAQPage';
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
}

export function GeneralPageSchema({
  type = 'Article',
  title,
  description,
  url,
  datePublished = '2024-01-01T08:00:00+00:00',
  dateModified = new Date().toISOString(),
  authorName = 'Raphael N',
  authorUrl = 'https://risclens.com/about',
  faqs,
  breadcrumbs,
  image = 'https://risclens.com/logo/risclens-og.png',
}: GeneralPageSchemaProps) {
  const schemas: any[] = [];

  // Main Entity Schema
  const mainSchema: any = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description: description,
    url: url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: image,
    datePublished: datePublished,
    dateModified: dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'RiscLens',
      logo: {
        '@type': 'ImageObject',
        url: 'https://risclens.com/logo/logo.png',
      },
    },
  };

  if (type === 'Article') {
    mainSchema.author = {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    };
  }

  schemas.push(mainSchema);

  // FAQ Schema
  if (faqs && faqs.length > 0) {
    schemas.push({
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
    });
  }

  // Breadcrumb Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    });
  }

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={`schema-${idx}`}
          id={`schema-${idx}-${title.toLowerCase().replace(/\\s+/g, '-')}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
