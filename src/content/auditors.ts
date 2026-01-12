export interface AuditorFirm {
  id: string;
  name: string;
  slug: string;
  specialty: string;
  location: string;
  description: string;
  website: string;
  isNew?: boolean;
  isVetted?: boolean;
  specialties: string[];
  industries: string[];
  teamSize: string[];
  frameworks: string[];
  highlights: string[];
  reviewCount: number;
  rating: number;
}

export const auditors: AuditorFirm[] = [
  {
    id: 'guardian-assurance',
    name: 'Guardian Assurance',
    slug: 'guardian-assurance',
    specialty: 'ISO 42001 & AI Governance',
    location: 'Global / Remote',
    description: 'Leading auditor for AI Management Systems (AIMS). Specializes in helping AI startups achieve ISO 42001 and SOC 2 simultaneously.',
    website: 'https://www.guardianassurance.com',
    isNew: true,
    isVetted: true,
    specialties: ['ISO 42001', 'SOC 2', 'AI Risk Assessment'],
    industries: ['AI/ML', 'SaaS', 'Fintech'],
    teamSize: ['Startup', 'Mid-Market'],
    frameworks: ['ISO 42001', 'SOC 2', 'ISO 27001'],
    highlights: ['AI Specialization', 'Combined Audits', 'Tech-Forward Approach'],
    reviewCount: 48,
    rating: 4.9
  },
  {
    id: 'prescient-security',
    name: 'Prescient Security',
    slug: 'prescient-security',
    specialty: 'Startups & High-Growth SaaS',
    location: 'Global / Remote',
    description: 'Specializes in tech-forward audits with a focus on automation-friendly evidence collection for SOC 2 and ISO 27001.',
    website: 'https://www.prescientsecurity.com',
    isVetted: true,
    specialties: ['SOC 2 Type II', 'ISO 27001', 'Pentesting'],
    industries: ['SaaS', 'DevTools', 'Cloud Infrastructure'],
    teamSize: ['Early Stage', 'Growth'],
    frameworks: ['SOC 2', 'ISO 27001', 'PCI DSS'],
    highlights: ['Automation Friendly', 'Fast Turnaround', 'Global Reach'],
    reviewCount: 156,
    rating: 4.8
  },
  {
    id: 'johanson-group',
    name: 'Johanson Group',
    slug: 'johanson-group',
    specialty: 'SaaS & Fintech',
    location: 'USA / Remote',
    description: 'A boutique CPA firm known for personalized service and deep expertise in compliance automation platforms.',
    website: 'https://johansongroup.net',
    isVetted: true,
    specialties: ['SOC 2', 'HIPAA', 'GDPR'],
    industries: ['Fintech', 'Healthcare', 'Marketplaces'],
    teamSize: ['Small Business', 'Mid-Market'],
    frameworks: ['SOC 2', 'HIPAA', 'ISO 27001'],
    highlights: ['Personalized Service', 'Automation Platform Experts', 'Boutique Experience'],
    reviewCount: 92,
    rating: 4.9
  },
  {
    id: 'sensiba',
    name: 'Sensiba LLP',
    slug: 'sensiba',
    specialty: 'Enterprise & Mid-Market',
    location: 'USA',
    description: 'Provides comprehensive SOC 2, SOC 3, and ISO 27001 services for established organizations.',
    website: 'https://sensiba.com',
    isVetted: true,
    specialties: ['SOC 2', 'ISO 27001', 'Sustainability Reporting'],
    industries: ['Enterprise SaaS', 'Manufacturing', 'Professional Services'],
    teamSize: ['Mid-Market', 'Enterprise'],
    frameworks: ['SOC 2', 'ISO 27001', 'SOC 3'],
    highlights: ['Enterprise Ready', 'Comprehensive Audits', 'Long-standing Reputation'],
    reviewCount: 112,
    rating: 4.7
  },
  {
    id: 'coalfire',
    name: 'Coalfire',
    slug: 'coalfire',
    specialty: 'Cloud Security & Enterprise',
    location: 'Global',
    description: 'One of the largest providers of cybersecurity advisory and assessment services.',
    website: 'https://www.coalfire.com',
    isVetted: true,
    specialties: ['FedRAMP', 'PCI DSS', 'SOC 2'],
    industries: ['Government', 'Enterprise', 'Cloud Providers'],
    teamSize: ['Enterprise'],
    frameworks: ['FedRAMP', 'PCI DSS', 'SOC 2', 'ISO 27001'],
    highlights: ['FedRAMP Leader', 'Global Scale', 'Deep Technical Expertise'],
    reviewCount: 320,
    rating: 4.6
  },
  {
    id: 'barr-advisory',
    name: 'BARR Advisory',
    slug: 'barr-advisory',
    specialty: 'Mid-Market & Cloud-Native',
    location: 'USA / Remote',
    description: 'Offers a collaborative approach to SOC 2, ISO, and HITRUST compliance.',
    website: 'https://www.barradvisory.com',
    isVetted: true,
    specialties: ['SOC 2', 'HITRUST', 'ISO 27001'],
    industries: ['Cloud-Native SaaS', 'Healthcare IT', 'Cybersecurity'],
    teamSize: ['Mid-Market', 'Growth Startups'],
    frameworks: ['SOC 2', 'HITRUST', 'ISO 27001', 'SOC 1'],
    highlights: ['Collaborative Process', 'Cloud-Native Focus', 'Transparent Pricing'],
    reviewCount: 84,
    rating: 4.8
  },
  {
    id: 'a-lign',
    name: 'A-LIGN',
    slug: 'a-lign',
    specialty: 'High-Volume Compliance',
    location: 'Global',
    description: 'A global security and compliance professional services firm that specializes in helping organizations navigate the complexities of certifications.',
    website: 'https://a-lign.com',
    isVetted: true,
    specialties: ['SOC 2', 'ISO 27001', 'SOC 1', 'PCI'],
    industries: ['Technology', 'Financial Services', 'Healthcare'],
    teamSize: ['Mid-Market', 'Enterprise'],
    frameworks: ['SOC 2', 'ISO 27001', 'PCI DSS', 'FedRAMP'],
    highlights: ['Strategic Compliance', 'Global Delivery', 'Proprietary Software'],
    reviewCount: 450,
    rating: 4.5
  },
  {
    id: 'schellman',
    name: 'Schellman',
    slug: 'schellman',
    specialty: 'Premium Enterprise Audits',
    location: 'USA / Global',
    description: 'A leading provider of attestation and compliance services, known for high-quality, rigorous audits.',
    website: 'https://www.schellman.com',
    isVetted: true,
    specialties: ['SOC 2', 'ISO 27001', 'FedRAMP', 'CMMC'],
    industries: ['Enterprise', 'Public Sector', 'Critical Infrastructure'],
    teamSize: ['Large Enterprise', 'Global 2000'],
    frameworks: ['SOC 2', 'ISO 27001', 'FedRAMP', 'PCI'],
    highlights: ['Gold Standard Audits', 'Rigorous Methodology', 'Executive Reporting'],
    reviewCount: 280,
    rating: 4.9
  },
  {
    id: 'armanino',
    name: 'Armanino',
    slug: 'armanino',
    specialty: 'CPA & Technology Consulting',
    location: 'USA',
    description: 'One of the top 20 largest CPA and consulting firms in the US, providing specialized SOC audit services.',
    website: 'https://www.armaninollp.com',
    isVetted: true,
    specialties: ['SOC 1', 'SOC 2', 'SOC 3', 'SOX'],
    industries: ['High Tech', 'BioTech', 'Fintech'],
    teamSize: ['Growth', 'Enterprise'],
    frameworks: ['SOC 2', 'ISO 27001', 'HIPAA'],
    highlights: ['Integrated Services', 'Financial Reporting Expertise', 'Growth Focused'],
    reviewCount: 65,
    rating: 4.6
  },
  {
    id: 'aprio',
    name: 'Aprio',
    slug: 'aprio',
    specialty: 'Strategic Compliance for Growth',
    location: 'USA',
    description: 'Provides a holistic approach to compliance, ensuring audits align with broader business goals.',
    website: 'https://www.aprio.com',
    isVetted: true,
    specialties: ['SOC 2', 'ISO 27001', 'Privacy'],
    industries: ['SaaS', 'Digital Health', 'Professional Services'],
    teamSize: ['Startups', 'Mid-Market'],
    frameworks: ['SOC 2', 'ISO 27001', 'GDPR', 'CCPA'],
    highlights: ['Strategic Alignment', 'Privacy Experts', 'Fixed-Fee Options'],
    reviewCount: 42,
    rating: 4.7
  }
];

export const SPECIALTIES = [
  { name: 'AI & Machine Learning', slug: 'ai-ml', icon: 'Sparkles' },
  { name: 'Fintech & Payments', slug: 'fintech', icon: 'CreditCard' },
  { name: 'Healthcare & HIPAA', slug: 'healthcare', icon: 'Stethoscope' },
  { name: 'Enterprise SaaS', slug: 'enterprise-saas', icon: 'Building2' },
  { name: 'Startups', slug: 'startups', icon: 'Rocket' }
];
