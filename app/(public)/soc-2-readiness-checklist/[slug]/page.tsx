import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IndustryChecklistPage from '@/components/IndustryChecklistPage';
import { industryGuides, getIndustryGuide } from '@/lib/soc2Industries';
import { industryCostLinks } from '@/lib/industryCostLinks';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  // Combine slugs from both sources to ensure coverage
  const industrySlugs = industryCostLinks.map((i) => i.slug);
  const guideSlugs = industryGuides.map((g) => g.slug);
  
  const allUniqueSlugs = Array.from(new Set([...industrySlugs, ...guideSlugs]));
  return allUniqueSlugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = getIndustryGuide(params.slug);
  const costLink = industryCostLinks.find(i => i.slug === params.slug);
  
  const name = guide?.name || costLink?.label || params.slug;
  
  return {
    title: `SOC 2 Checklist for ${name} | RiscLens`,
    description: guide?.description || `The definitive SOC 2 readiness checklist for ${name} companies. Learn how to secure your architecture and pass your audit.`,
    alternates: {
      canonical: `https://risclens.com/soc-2-readiness-checklist/${params.slug}`,
    },
  };
}

export default function DynamicIndustryChecklistPage({ params }: PageProps) {
  const guide = getIndustryGuide(params.slug);
  const costLink = industryCostLinks.find(i => i.slug === params.slug);

  if (!guide && !costLink) {
    notFound();
  }

  // Fallback data if guide is missing but costLink exists
  const industryName = guide?.name || costLink?.label || params.slug;
  const heroDescription = guide?.description || costLink?.blurb || `Tailored SOC 2 readiness requirements for ${industryName} organizations.`;
  
  // Default controls if not specified
  const criticalControls = guide?.criticalControls || guide?.trustThemes.slice(0, 6) || [
    'Access Control & MFA',
    'Encryption at Rest',
    'Vulnerability Scanning',
    'Incident Response Plan',
    'Change Management',
    'Vendor Risk Management'
  ];

  // Default checklist grouping if not specified
  const checklistData = guide?.checklistData || [
    {
      category: 'Core Infrastructure & Security',
      items: guide?.checklist.slice(0, 4) || [
        'Document production data flows and system boundaries.',
        'Enable MFA for all administrative and employee accounts.',
        'Implement automated vulnerability scanning for all public assets.',
        'Enforce encryption for all databases and sensitive data at rest.'
      ]
    },
    {
      category: 'Operational Controls',
      items: guide?.checklist.slice(4, 8) || [
        'Establish a formal incident response and communication plan.',
        'Implement a standardized change management process with peer reviews.',
        'Conduct regular access reviews for all production-impacting systems.',
        'Maintain a current inventory of all third-party vendors and risk ratings.'
      ]
    }
  ];

  const commonPitfalls = guide?.bottlenecks || [
    'Lack of documented evidence for manual control reviews.',
    'Informal change management without explicit approval records.',
    'Delayed vendor risk assessments for critical subprocessors.',
    'Inconsistent logging across different cloud services or regions.'
  ];

  return (
    <IndustryChecklistPage
      industryName={industryName}
      industrySlug={params.slug}
      heroDescription={heroDescription}
      criticalControls={criticalControls}
      checklistData={checklistData}
      commonPitfalls={commonPitfalls}
    />
  );
}
