'use client';

import React from 'react';
import { LandingHeader } from './landing-header';
import { LandingFooter } from './landing-footer';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        {children}
      </main>
      <LandingFooter />
    </div>
  );
}
