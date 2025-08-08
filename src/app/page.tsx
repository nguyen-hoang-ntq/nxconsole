'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { state } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!state.loading) {
      if (state.isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [state.loading, state.isAuthenticated, router]);
  
  // Show loading while determining auth state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading NxConsole...</p>
      </div>
    </div>
  );
}
