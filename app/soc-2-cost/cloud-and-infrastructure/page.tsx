'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function LegacyCloudAndInfrastructureRedirect() {
  useEffect(() => {
    redirect('/soc-2-cost/cloud-infrastructure');
  }, []);

  redirect('/soc-2-cost/cloud-infrastructure');
}
