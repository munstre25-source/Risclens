export interface Author {
  id: string;
  name: string;
  role: string;
  credentials: string[];
  bio: string;
  avatar: string;
  linkedIn?: string;
}

export const authors: Record<string, Author> = {
  raphael: {
    id: 'raphael',
    name: 'RiscLens',
    role: 'Compliance Infrastructure Platform',
    credentials: ['SOC 2', 'ISO 27001'],
    bio: 'Built on over 15 years of cybersecurity expertise and 200+ SOC 2 audits, RiscLens provides deterministic guidance to help startups navigate complex compliance requirements.',
    avatar: 'RL',
  },
};
