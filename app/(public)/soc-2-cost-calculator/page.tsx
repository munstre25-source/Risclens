import { redirect } from 'next/navigation';

// Redirect old URL to new calculator page
export default function OldCalculatorRedirect() {
  redirect('/soc-2-readiness-index');
}
