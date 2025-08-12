'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const routeMap: Record<string, string> = {
  'dashboard': 'Dashboard',
  'cost-management': 'Cost Management',
  'resources': 'Resource Management', 
  'ai-insights': 'AI Insights',
  'security': 'Security & Compliance',
  'm365': 'Microsoft 365',
  'notifications': 'Notifications',
  'settings': 'Settings',
  'help': 'Help & Support'
};

export function Breadcrumb() {
  const pathname = usePathname();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Dashboard', href: '/dashboard', icon: Home }
    ];
    
    let currentPath = '';
    
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeMap[segment] || segment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      breadcrumbs.push({
        label,
        href: currentPath
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumb on dashboard page
  if (pathname === '/dashboard') {
    return null;
  }
  
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4" />
          )}
          <div className="flex items-center">
            {item.icon && (
              <item.icon className="mr-1 h-4 w-4" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-foreground">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'hover:text-foreground transition-colors',
                  index === 0 && 'flex items-center'
                )}
              >
                {item.label}
              </Link>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
}
