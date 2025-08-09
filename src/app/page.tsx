'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { 
  LandingLayout,
  HeroSection,
  FeaturesSection,
  BenefitsSection,
  SocialProofSection,
  PricingSection,
  AboutSection,
  CtaSection
} from '@/components/landing';
import { CloudAnimationSection } from '@/components/landing/cloud-animation-section';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { state } = useAuth();
  const router = useRouter();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!state.loading && state.isAuthenticated) {
      router.push('/dashboard');
    }
  }, [state.loading, state.isAuthenticated, router]);
  
  // Show loading while checking auth state
  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">Nx</span>
          </div>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading NxConsole...</p>
        </div>
      </div>
    );
  }
  
  // Show landing page for unauthenticated users
  if (!state.isAuthenticated) {
    return (
      <LandingLayout>
        <HeroSection />
        <FeaturesSection />
        <CloudAnimationSection />
        <BenefitsSection />
        <SocialProofSection />
        <PricingSection />
        <AboutSection />
        <CtaSection />
      </LandingLayout>
    );
  }
  
  // This should not be reached due to useEffect redirect, but return null as fallback
  return null;
}
