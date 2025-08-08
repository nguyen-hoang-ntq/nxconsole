'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  DollarSign, 
  Server, 
  Brain, 
  Shield, 
  Building2,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Settings,
  HelpCircle,
  Users,
  FileText,
  Cloud,
  Database
} from 'lucide-react';
import Image from 'next/image';
import { NavigationItem } from '@/types';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { IconBadge } from '@/components/ui/icon-badge';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'finops',
    label: 'FinOps & Cost',
    href: '/dashboard/finops',
    icon: DollarSign,
    badge: { type: 'warning' }
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/dashboard/resources',
    icon: Server
  },
  {
    id: 'ai-insights',
    label: 'AI Insights',
    href: '/dashboard/ai-insights',
    icon: Brain,
    badge: { type: 'new' }
  },
  {
    id: 'security',
    label: 'Security',
    href: '/dashboard/security',
    icon: Shield,
    badge: { type: 'alert', count: 3 }
  },
  {
    id: 'cloud-management',
    label: 'Cloud Management',
    href: '#',
    icon: Cloud,
    children: [
      {
        id: 'microsoft',
        label: 'Microsoft',
        href: '/dashboard/cloud-management/microsoft',
        icon: () => <CloudIcon provider="microsoft" size={16} />,
        children: [
          {
            id: 'azure',
            label: 'Azure',
            href: '/dashboard/cloud-management/microsoft/azure',
            icon: () => <CloudIcon provider="microsoft" service="azure" size={16} />
          },
          {
            id: 'm365',
            label: 'Microsoft 365',
            href: '/dashboard/cloud-management/microsoft/m365',
            icon: Building2,
            children: [
              {
                id: 'teams',
                label: 'Teams',
                href: '/dashboard/cloud-management/microsoft/m365/teams',
                icon: () => <CloudIcon provider="microsoft" service="teams" size={16} />
              },
              {
                id: 'sharepoint',
                label: 'SharePoint',
                href: '/dashboard/cloud-management/microsoft/m365/sharepoint',
                icon: () => <CloudIcon provider="microsoft" service="sharepoint" size={16} />
              },
              {
                id: 'exchange',
                label: 'Exchange',
                href: '/dashboard/cloud-management/microsoft/m365/exchange',
                icon: () => <CloudIcon provider="microsoft" service="exchange" size={16} />
              },
              {
                id: 'onedrive',
                label: 'OneDrive',
                href: '/dashboard/cloud-management/microsoft/m365/onedrive',
                icon: () => <CloudIcon provider="microsoft" service="onedrive" size={16} />
              }
            ]
          }
        ]
      },
      {
        id: 'amazon',
        label: 'Amazon',
        href: '/dashboard/cloud-management/amazon',
        icon: () => <CloudIcon provider="amazon" size={16} />,
        children: [
          {
            id: 'aws',
            label: 'AWS',
            href: '/dashboard/cloud-management/amazon/aws',
            icon: () => <CloudIcon provider="amazon" service="aws" size={16} />,
            children: [
              {
                id: 'ec2',
                label: 'EC2',
                href: '/dashboard/cloud-management/amazon/aws/ec2',
                icon: () => <CloudIcon provider="amazon" service="ec2" size={16} />
              },
              {
                id: 's3',
                label: 'S3',
                href: '/dashboard/cloud-management/amazon/aws/s3',
                icon: () => <CloudIcon provider="amazon" service="s3" size={16} />
              },
              {
                id: 'lambda',
                label: 'Lambda',
                href: '/dashboard/cloud-management/amazon/aws/lambda',
                icon: () => <CloudIcon provider="amazon" service="lambda" size={16} />
              },
              {
                id: 'rds',
                label: 'RDS',
                href: '/dashboard/cloud-management/amazon/aws/rds',
                icon: () => <CloudIcon provider="amazon" service="rds" size={16} />
              }
            ]
          }
        ]
      },
      {
        id: 'google',
        label: 'Google',
        href: '/dashboard/cloud-management/google',
        icon: () => <CloudIcon provider="google" size={16} />,
        children: [
          {
            id: 'gcp',
            label: 'Google Cloud Platform',
            href: '/dashboard/cloud-management/google/gcp',
            icon: () => <CloudIcon provider="google" service="gcp" size={16} />,
            children: [
              {
                id: 'compute',
                label: 'Compute Engine',
                href: '/dashboard/cloud-management/google/gcp/compute',
                icon: () => <CloudIcon provider="google" service="compute" size={16} />
              },
              {
                id: 'storage',
                label: 'Cloud Storage',
                href: '/dashboard/cloud-management/google/gcp/storage',
                icon: () => <CloudIcon provider="google" service="storage" size={16} />
              }
            ]
          },
          {
            id: 'admin',
            label: 'Google Admin',
            href: '/dashboard/cloud-management/google/admin',
            icon: () => <CloudIcon provider="google" service="admin" size={16} />
          }
        ]
      }
    ]
  },
  {
    id: 'notifications',
    label: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
    badge: { type: 'info', count: 5 }
  },
  {
    id: 'logs',
    label: 'System Logs',
    href: '/dashboard/logs',
    icon: FileText
  }
];

const secondaryItems: NavigationItem[] = [
  {
    id: 'users',
    label: 'User Management',
    href: '/dashboard/users',
    icon: Users
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  },
  {
    id: 'help',
    label: 'Help & Support',
    href: '/dashboard/help',
    icon: HelpCircle
  }
];

export function AppSidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['cloud-management']);
  
  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };
  
  const NavItem = ({ item, level = 0 }: { item: NavigationItem; level?: number }) => {
    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const paddingLeft = level * 16 + 12; // 12px base + 16px per level
    
    if (collapsed && level > 0) {
      return null; // Don't show nested items when sidebar is collapsed
    }
    
    const IconComponent = item.icon;
    
    return (
      <li>
        {hasChildren && item.href === '#' ? (
          // Expandable parent item
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-3 px-3 min-h-[40px]',
              collapsed && 'px-2 justify-center'
            )}
            onClick={() => !collapsed && toggleExpanded(item.id)}
            style={{ paddingLeft: collapsed ? undefined : `${paddingLeft}px` }}
          >
            {typeof IconComponent === 'function' && IconComponent.length === 0 ? (
              <IconComponent />
            ) : (
              <IconComponent className={cn('h-4 w-4', collapsed && 'h-5 w-5')} />
            )}
            {!collapsed && (
              <>
                <span className="flex-1 min-w-0 text-left truncate">{item.label}</span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {hasChildren && (
                    <ChevronDown className={cn(
                      'h-4 w-4 transition-transform',
                      isExpanded && 'rotate-180'
                    )} />
                  )}
                  {item.badge && (
                    'type' in item.badge ? (
                      <IconBadge 
                        type={item.badge.type} 
                        count={item.badge.count}
                        size="md"
                      />
                    ) : (
                      <span className={cn(
                        'px-2.5 py-1 text-xs rounded-full font-medium shadow-sm whitespace-nowrap min-w-[32px] text-center',
                        item.badge.variant === 'default' && 'bg-blue-600 text-white',
                        item.badge.variant === 'secondary' && 'bg-green-600 text-white',
                        item.badge.variant === 'destructive' && 'bg-red-600 text-white',
                        item.badge.variant === 'outline' && 'border-2 border-gray-400 bg-white text-gray-700 font-semibold'
                      )}>
                        {item.badge.text}
                      </span>
                    )
                  )}
                </div>
              </>
            )}
          </Button>
        ) : (
          // Regular navigation link
          <Button
            variant={isActive ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start gap-3 px-3 min-h-[40px]',
              collapsed && 'px-2 justify-center',
              isActive && 'bg-secondary text-secondary-foreground font-medium'
            )}
            asChild
            style={{ paddingLeft: collapsed ? undefined : `${paddingLeft}px` }}
          >
            <Link href={item.href}>
              {typeof IconComponent === 'function' && IconComponent.length === 0 ? (
                <IconComponent />
              ) : (
                <IconComponent className={cn('h-4 w-4', collapsed && 'h-5 w-5')} />
              )}
              {!collapsed && (
                <>
                  <span className="flex-1 min-w-0 text-left truncate">{item.label}</span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {hasChildren && (
                      <ChevronDown className={cn(
                        'h-4 w-4 transition-transform',
                        isExpanded && 'rotate-180'
                      )} />
                    )}
                    {item.badge && (
                      'type' in item.badge ? (
                        <IconBadge 
                          type={item.badge.type} 
                          count={item.badge.count}
                          size="md"
                        />
                      ) : (
                        <span className={cn(
                          'px-2.5 py-1 text-xs rounded-full font-medium shadow-sm whitespace-nowrap min-w-[32px] text-center',
                          item.badge.variant === 'default' && 'bg-blue-600 text-white',
                          item.badge.variant === 'secondary' && 'bg-green-600 text-white',
                          item.badge.variant === 'destructive' && 'bg-red-600 text-white',
                          item.badge.variant === 'outline' && 'border-2 border-gray-400 bg-white text-gray-700 font-semibold'
                        )}>
                          {item.badge.text}
                        </span>
                      )
                    )}
                  </div>
                </>
              )}
            </Link>
          </Button>
        )}
        
        {/* Render children if expanded and not collapsed */}
        {hasChildren && isExpanded && !collapsed && (
          <ul className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <NavItem key={child.id} item={child} level={level + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };
  
  return (
    <div className={cn(
      'flex flex-col h-full bg-card border-r border-border',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex items-center gap-3 h-16 px-4 border-b border-border">
        <div className="rounded-lg p-2 flex items-center justify-center w-10 h-10">
          <Image 
            src="/logo.png" 
            alt="NTQ Logo" 
            width={24} 
            height={24} 
            className="rounded-sm object-contain"
          />
        </div>
        {!collapsed && (
          <>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">NxConsole</h2>
              <p className="text-xs text-muted-foreground">Cloud Management</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        )}
        {collapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 absolute top-4 -right-3 bg-background border border-border shadow-sm"
          >
            <ChevronLeft className="h-4 w-4 rotate-180" />
          </Button>
        )}
      </div>
      
      {/* Navigation */}
      <div className="flex-1 p-3 space-y-1">
        <nav>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Secondary Navigation */}
      <div className="p-3 border-t border-border">
        <nav>
          <ul className="space-y-1">
            {secondaryItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
