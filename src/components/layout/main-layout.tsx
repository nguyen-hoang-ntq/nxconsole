'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { ToastProvider } from '@/components/notifications/toast-provider';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  
  // Pages that should not have the main layout (login, etc.)
  const publicPages = ['/login', '/register', '/forgot-password'];
  const isPublicPage = publicPages.includes(pathname);
  
  // Root page should also not have layout (it redirects)
  const isRootPage = pathname === '/';
  
  // Auth pages (in (auth) group) should not have layout
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/forgot-password');
  
  if (isPublicPage || isRootPage || isAuthPage) {
    return <ToastProvider>{children}</ToastProvider>;
  }
  
  // All other pages should have the layout
  return (
    <ToastProvider>
      <AppLayout>{children}</AppLayout>
    </ToastProvider>
  );
}
