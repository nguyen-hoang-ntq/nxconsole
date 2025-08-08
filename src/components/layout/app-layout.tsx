'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/navigation/app-sidebar';
import { AppHeader } from '@/components/navigation/app-header';
import { Footer } from '@/components/layout/footer';
import { useAuth } from '@/components/auth/auth-provider';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { state } = useAuth();
  const router = useRouter();
  
  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!state.loading && !state.isAuthenticated) {
      router.push('/login');
    }
  }, [state.loading, state.isAuthenticated, router]);
  
  // Show loading spinner while checking auth
  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Don't render if not authenticated (will redirect)
  if (!state.isAuthenticated) {
    return null;
  }
  
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col border-r border-border',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}>
        <AppSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={handleSidebarToggle}
        />
      </aside>
      
      {/* Mobile Sidebar Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarCollapsed(true)}
          />
          <aside className="relative w-64 h-full">
            <AppSidebar 
              collapsed={false} 
              onToggle={() => setSidebarCollapsed(true)}
            />
          </aside>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <AppHeader 
          onMenuToggle={handleSidebarToggle}
          showMenuButton={isMobile}
        />
        
        {/* Content Area */}
        <main className="flex-1 min-h-0 overflow-auto">
          <div className="container mx-auto p-6 space-y-6 min-h-[calc(100vh-8rem)]">
            {/* Page Content */}
            {children}
          </div>
        </main>
        
        {/* Footer - Always at bottom */}
        <Footer />
      </div>
    </div>
  );
}
