import Script from 'next/script'

interface SoftwareApplicationSchemaProps {
  name: string
  description: string
  url: string
  category?: string
}

export function SoftwareApplicationSchema({
  name,
  description,
  url,
  category = 'BusinessApplication',
}: SoftwareApplicationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  return (
    <Script
      id={`software-app-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
