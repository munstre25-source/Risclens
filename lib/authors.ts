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
    name: 'Raphael Ngare Momanyi',
    role: 'Founder & Principal Advisor',
    credentials: ['CISO', 'CISA'],
    bio: 'With over 15 years in cybersecurity and 200+ SOC 2 audits under his belt at Big Four firms, Raphael founded RiscLens to democratize compliance knowledge.',
    avatar: 'RM',
  },
};
