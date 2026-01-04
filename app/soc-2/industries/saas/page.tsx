import { redirect } from 'next/navigation';

// Alias path for SaaS industry to reuse the B2B SaaS guide
export default function SaasIndustryAliasPage() {
  redirect('/soc-2/industries/b2b-saas');
}
