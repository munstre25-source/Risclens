import { redirect } from 'next/navigation';

// Redirect old URL to new cost calculator page
export default function OldCalculatorRedirect() {
  redirect('/compliance-roi-calculator');
}
