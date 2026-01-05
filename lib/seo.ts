import { Metadata } from 'next';

export function generateIndustryMetadata(
  industry: string,
  type: 'readiness' | 'cost',
  description?: string
): Metadata {
  const isReadiness = type === 'readiness';
  const title = isReadiness
    ? `SOC 2 Readiness Assessment for ${industry} | RiscLens`
    : `SOC 2 Audit Cost Guide for ${industry} | RiscLens`;
  
  const defaultDesc = isReadiness
    ? `Understand your SOC 2 readiness for ${industry}: security controls, access, change management, and vendor risk. Get a score and next steps in under 2 minutes.`
    : `Complete breakdown of SOC 2 audit costs for ${industry} companies. Learn about auditor fees, compliance software, and hidden internal costs.`;

  const finalDescription = description || defaultDesc;

  return {
    title,
    description: finalDescription,
    openGraph: {
      title,
      description: finalDescription,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: finalDescription,
      images: ['/og.png'],
    },
  };
}

export function generateTopicMetadata(
  title: string,
  description: string,
  path: string,
  category: string
): Metadata {
  const fullTitle = `${title} | ${category} | RiscLens`;
  
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: `https://risclens.com${path}`,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/og.png'],
    },
  };
}
