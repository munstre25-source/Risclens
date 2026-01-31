/**
 * Enhanced Schema Component for RiscLens pSEO Pages
 * 
 * Provides comprehensive structured data for:
 * - Product (compliance tools)
 * - SoftwareApplication
 * - FAQPage
 * - BreadcrumbList
 * - Organization (company profiles)
 * - ComparisonPage (tool comparisons)
 */

import Script from 'next/script';
import {
  generateProductSchema,
  generateSoftwareApplicationSchema,
  generateEnhancedFAQSchema,
  generateOrganizationSchema,
  CURRENT_YEAR,
} from '@/lib/seo-enhancements';

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface ProductSchemaProps {
  name: string;
  slug: string;
  description?: string | null;
  pricing_starting?: string | null;
  g2_rating?: number | null;
  g2_reviews_count?: number | null;
  website_url?: string | null;
}

interface CompanySchemaProps {
  name: string;
  slug: string;
  domain: string;
  signal_score: number;
  updated_at: string;
}

interface ComparisonSchemaProps {
  toolA: {
    name: string;
    slug: string;
    pricing_starting?: string | null;
    g2_rating?: number | null;
  };
  toolB: {
    name: string;
    slug: string;
    pricing_starting?: string | null;
    g2_rating?: number | null;
  };
  url: string;
}

interface EnhancedSchemaProps {
  // Page basics
  pageType: 'pricing' | 'comparison' | 'alternatives' | 'directory' | 'guide' | 'article';
  title: string;
  description: string;
  url: string;
  
  // Optional schemas
  product?: ProductSchemaProps;
  company?: CompanySchemaProps;
  comparison?: ComparisonSchemaProps;
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  
  // Author info
  authorName?: string;
  authorUrl?: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Generate WebPage schema
 */
function generateWebPageSchema(props: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": props.url,
    "name": props.title,
    "description": props.description,
    "url": props.url,
    "datePublished": props.datePublished || "2024-01-01T08:00:00+00:00",
    "dateModified": props.dateModified || new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "RiscLens",
      "url": "https://risclens.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://risclens.com/logo/logo.png"
      }
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "RiscLens",
      "url": "https://risclens.com"
    }
  };
}

/**
 * Generate BreadcrumbList schema
 */
function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith('http') ? item.item : `https://risclens.com${item.item}`
    }))
  };
}

/**
 * Generate Comparison/Article schema for vs pages
 */
function generateComparisonArticleSchema(props: ComparisonSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${props.toolA.name} vs ${props.toolB.name} ${CURRENT_YEAR}: Complete Comparison`,
    "description": `Compare ${props.toolA.name} and ${props.toolB.name} side by side. See pricing, features, and expert recommendations.`,
    "url": props.url,
    "datePublished": "2024-01-01T08:00:00+00:00",
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": "Raphael N",
      "url": "https://risclens.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RiscLens",
      "logo": {
        "@type": "ImageObject",
        "url": "https://risclens.com/logo/logo.png"
      }
    },
    "about": [
      {
        "@type": "SoftwareApplication",
        "name": props.toolA.name,
        "applicationCategory": "BusinessApplication"
      },
      {
        "@type": "SoftwareApplication", 
        "name": props.toolB.name,
        "applicationCategory": "BusinessApplication"
      }
    ]
  };
}

/**
 * Generate ItemList schema for alternatives pages
 */
function generateItemListSchema(items: ProductSchemaProps[], forTool: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Best ${forTool} Alternatives ${CURRENT_YEAR}`,
    "description": `Top alternatives to ${forTool} for compliance automation`,
    "numberOfItems": items.length,
    "itemListElement": items.slice(0, 10).map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": item.name,
        "applicationCategory": "BusinessApplication",
        "url": `https://risclens.com/pricing/${item.slug}`,
        ...(item.pricing_starting && {
          "offers": {
            "@type": "Offer",
            "price": item.pricing_starting.match(/\$?([\d,]+)/)?.[1]?.replace(',', '') || '0',
            "priceCurrency": "USD"
          }
        }),
        ...(item.g2_rating && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": item.g2_rating.toString(),
            "bestRating": "5",
            "ratingCount": (item.g2_reviews_count || 10).toString()
          }
        })
      }
    }))
  };
}

export function EnhancedSchema({
  pageType,
  title,
  description,
  url,
  product,
  company,
  comparison,
  faqs,
  breadcrumbs,
  authorName = 'Raphael N',
  authorUrl = 'https://risclens.com/about',
  datePublished,
  dateModified,
}: EnhancedSchemaProps) {
  const schemas: any[] = [];

  // Always add WebPage schema
  schemas.push(generateWebPageSchema({
    title,
    description,
    url,
    datePublished,
    dateModified,
  }));

  // Add breadcrumb schema if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  // Add Product/SoftwareApplication schema for pricing pages
  if (pageType === 'pricing' && product) {
    schemas.push(generateProductSchema(product));
    schemas.push(generateSoftwareApplicationSchema(product));
  }

  // Add comparison schemas
  if (pageType === 'comparison' && comparison) {
    schemas.push(generateComparisonArticleSchema(comparison));
    // Add individual product schemas for each tool
    schemas.push(generateProductSchema({
      name: comparison.toolA.name,
      slug: comparison.toolA.slug,
      pricing_starting: comparison.toolA.pricing_starting,
      g2_rating: comparison.toolA.g2_rating,
    }));
    schemas.push(generateProductSchema({
      name: comparison.toolB.name,
      slug: comparison.toolB.slug,
      pricing_starting: comparison.toolB.pricing_starting,
      g2_rating: comparison.toolB.g2_rating,
    }));
  }

  // Add Organization schema for directory pages
  if (pageType === 'directory' && company) {
    schemas.push(generateOrganizationSchema(company));
  }

  // Add FAQ schema if provided
  if (faqs && faqs.length > 0) {
    schemas.push(generateEnhancedFAQSchema(faqs));
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`enhanced-schema-${index}`}
          id={`enhanced-schema-${index}-${pageType}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

/**
 * Standalone FAQ Schema component
 */
export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  if (!faqs || faqs.length === 0) return null;
  
  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateEnhancedFAQSchema(faqs)) }}
    />
  );
}

/**
 * Standalone Product Schema component
 */
export function ProductSchema({ product }: { product: ProductSchemaProps }) {
  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema(product)) }}
    />
  );
}

/**
 * Standalone Breadcrumb Schema component
 */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;
  
  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(items)) }}
    />
  );
}

/**
 * ItemList Schema for alternatives pages
 */
export function AlternativesListSchema({ 
  alternatives, 
  forTool 
}: { 
  alternatives: ProductSchemaProps[];
  forTool: string;
}) {
  return (
    <Script
      id="alternatives-list-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateItemListSchema(alternatives, forTool)) }}
    />
  );
}

export default EnhancedSchema;
