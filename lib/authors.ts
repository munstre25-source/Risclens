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
    credentials: ['CPA', 'CISA', 'ISO Lead Auditor'],
    bio: 'Raphael leads go-to-market compliance strategy and audits for SaaS and AI teams, with a focus on automation-friendly evidence and sales-ready reports.',
    avatar: 'RN',
    linkedIn: 'https://linkedin.com/in/raphael-ngare',
    reddit: 'https://www.reddit.com/user/raphael-risclens',
  },
  kevin: {
    id: 'kevin',
    name: 'Kevin A',
    role: 'Principal Security & GRC Engineer',
    credentials: ['CISSP', 'CISM', 'CCSP'],
    bio: 'Kevin builds and reviews controls for cloud-native stacks, mapping security engineering practices to SOC 2 and ISO requirements.',
    avatar: 'KA',
    linkedIn: 'https://linkedin.com/in/kevin-risclens',
    reddit: 'https://www.reddit.com/user/kevin-risclens',
  },
};
