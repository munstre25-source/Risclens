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
  alex: {
    id: 'alex',
    name: 'Alex Rivers',
    role: 'Founder & Principal Advisor',
    credentials: ['CISO', 'CISA'],
    bio: 'With over 15 years in cybersecurity and 200+ SOC 2 audits under his belt at Big Four firms, Alex founded RiscLens to democratize compliance knowledge.',
    avatar: 'AR',
    linkedIn: 'https://linkedin.com/in/alexrivers',
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Head of Compliance Strategy',
    credentials: ['CPA'],
    bio: 'A former SOC 2 auditor, Sarah specializes in mapping technical controls to Trust Service Criteria, ensuring RiscLens remains perfectly aligned with auditor expectations.',
    avatar: 'SC',
    linkedIn: 'https://linkedin.com/in/sarahchen',
  },
};
