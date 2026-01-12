import { Metadata } from 'next';

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'https://risclens.com';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  keywords?: string[];
  category?: string;
  author?: string;
}

/**
 * Centrally managed SEO metadata generator
 */
export function constructMetadata({
  title,
  description,
  path,
  image = '/og.png',
  type = 'website',
  noindex = false,
  keywords = [],
  category,
}: SEOProps): Metadata {
  const url = `${DOMAIN}${path.startsWith('/') ? path : `/${path}`}`;
  
  // Standardize title with brand if not already present
  const fullTitle = title.includes('RiscLens') ? title : `${title} | RiscLens`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'SOC 2', 
      'ISO 27001', 
      'AI Governance', 
      'Compliance Automation', 
      'Security readiness', 
      ...keywords
    ],
    category,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type,
      siteName: 'RiscLens',
      images: [
        {
          url: image.startsWith('http') ? image : `${DOMAIN}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${DOMAIN}${image}`],
      creator: '@risclens',
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generates metadata for industry-specific readiness pages
 */
export function generateIndustryMetadata(industryName: string, category: string = 'Compliance'): Metadata {
  const slug = industryName.toLowerCase().split(' ')[0];
  return constructMetadata({
    title: `${industryName} SOC 2 Readiness Guide`,
    description: `Comprehensive SOC 2 readiness guide for ${industryName}. Learn about specific challenges, required controls, and how to accelerate your compliance journey.`,
    path: `/soc-2-readiness/${slug}`,
    category,
  });
}

/**
 * Generates metadata for topic-specific pages
 */
export function generateTopicMetadata(
  title: string,
  description: string,
  path: string,
  category: string = 'Compliance'
): Metadata {
  return constructMetadata({
    title,
    description,
    path,
    category,
  });
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith('http') ? item.item : `${DOMAIN}${item.item}`
    }))
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
