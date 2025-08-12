'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Home, 
  BarChart3, 
  DollarSign, 
  Cloud, 
  Brain, 
  Shield, 
  Users, 
  Bell,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    children: [
      { title: 'Overview', href: '/analytics/overview', icon: BarChart3 },
      { title: 'Reports', href: '/analytics/reports', icon: BarChart3 },
      { title: 'Charts Demo', href: '/charts-demo', icon: BarChart3 },
      { title: 'Advanced Charts', href: '/advanced-charts', icon: BarChart3 }
    ]
  },
  {
    title: 'Cost Management',
    href: '/dashboard/cost-management',
    icon: DollarSign,
    children: [
      { title: 'Overview', href: '/dashboard/cost-management', icon: DollarSign },
      { title: 'AWS', href: '/dashboard/cost-management/aws', icon: DollarSign },
      { title: 'Azure', href: '/dashboard/cost-management/azure', icon: DollarSign },
      { title: 'GCP', href: '/dashboard/cost-management/gcp', icon: DollarSign },
      { title: 'M365', href: '/dashboard/cost-management/m365', icon: DollarSign }
    ]
  },
  {
    title: 'Resources',
    href: '/resources',
    icon: Cloud,
    children: [
      { title: 'Compute', href: '/resources/compute', icon: Cloud },
      { title: 'Storage', href: '/resources/storage', icon: Cloud },
      { title: 'Network', href: '/resources/network', icon: Cloud }
    ]
  },
  {
    title: 'AI Insights',
    href: '/ai-insights',
    icon: Brain,
    badge: 'Beta'
  },
  {
    title: 'Security',
    href: '/security',
    icon: Shield,
    badge: '12',
    children: [
      { title: 'Overview', href: '/security/overview', icon: Shield },
      { title: 'Compliance', href: '/security/compliance', icon: Shield },
      { title: 'Audit Trail', href: '/security/audit', icon: Shield }
    ]
  },
  {
    title: 'M365 Management',
    href: '/m365',
    icon: Users,
    children: [
      { title: 'Users', href: '/m365/users', icon: Users },
      { title: 'Licenses', href: '/m365/licenses', icon: Users },
      { title: 'Teams', href: '/m365/teams', icon: Users }
    ]
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
    badge: '3'
  }
];

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  const toggleExpanded = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const NavItem = ({ item, depth = 0 }: { item: NavigationItem; depth?: number }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.title);
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
    const Icon = item.icon;

    return (
      <div>
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
            isActive && 'bg-accent text-accent-foreground font-medium',
            depth > 0 && 'ml-6'
          )}
        >
          {hasChildren ? (
            <button
              className="flex flex-1 items-center gap-3"
              onClick={() => toggleExpanded(item.title)}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <Link
              href={item.href}
              className="flex flex-1 items-center gap-3"
              onClick={() => setOpen(false)}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Link>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <NavItem key={child.title} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('md:hidden', className)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Items */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2 py-4">
              {navigationItems.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground text-center">
              NXConsole v1.0.0
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
