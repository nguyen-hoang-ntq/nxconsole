'use client';

import { redirect } from 'next/navigation';

export default function FinopsPage() {
  // Redirect to cost management as FinOps is handled there
  redirect('/dashboard/cost-management');
}