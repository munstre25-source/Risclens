import { redirect } from 'next/navigation';

// Root page redirects to the calculator
export default function Home() {
  redirect('/soc-2-cost-calculator');
}

