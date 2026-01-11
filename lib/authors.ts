export interface Author {
  id: string;
  name: string;
  role: string;
  credentials: string[];
  bio: string;
  avatar: string;
  linkedIn?: string;
  reddit?: string;
}

export const authors: Record<string, Author> = {
  raphael: {
    id: 'raphael',
    name: 'Raphael N',
    role: 'Head of Compliance Strategy',
    credentials: ['CPA', 'CISA', 'ISO 27001 Lead Auditor'],
    bio: 'Raphael leads go-to-market compliance strategy for high-growth SaaS and AI teams. With over a decade of experience across Big Four firms and fintech startups, he specializes in translating complex SOC 2 requirements into automated, engineering-friendly workflows.',
    avatar: 'RN',
    linkedIn: 'https://linkedin.com/in/raphael-ngare',
    reddit: 'https://www.reddit.com/user/raphael-risclens',
  },
  kevin: {
    id: 'kevin',
    name: 'Kevin A',
    role: 'Principal Security & GRC Engineer',
    credentials: ['CISSP', 'CISM', 'CCSP', 'AWS Security Specialist'],
    bio: 'Kevin is a security engineer turned GRC specialist. He focuses on mapping cloud-native infrastructure (AWS/Azure/GCP) to modern compliance frameworks, ensuring that security controls are both robust and auditor-ready without slowing down development cycles.',
    avatar: 'KA',
    linkedIn: 'https://linkedin.com/in/kevin-risclens',
    reddit: 'https://www.reddit.com/user/kevin-risclens',
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah L',
    role: 'Privacy & Data Protection Advisor',
    credentials: ['CIPP/US', 'CIPP/E', 'JD'],
    bio: 'Sarah is a privacy attorney and data protection specialist. She advises RiscLens on the intersection of SOC 2 Privacy criteria with GDPR, CCPA, and HIPAA, ensuring our readiness tools account for the evolving global regulatory landscape.',
    avatar: 'SL',
    linkedIn: 'https://linkedin.com/in/sarah-risclens',
  },
};
