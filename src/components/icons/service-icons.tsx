import React from 'react';
import { cn } from '@/lib/utils';
import { 
  // Service Category Icons
  Server,
  Network,
  Database,
  Settings,
  
  // General Icons
  BarChart3,
  DollarSign,
  Shield,
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  Lock,
  Globe,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Star,
  Rocket,
  Palette,
  PinIcon,
  Archive,
  ChartBar,
  ChartLine,
  Monitor,
  Bell,
  Smartphone,
  Laptop,
  Wrench,
  Target,
  Package,
  
  // Trend Icons
  ArrowUp,
  ArrowDown,
  
  type LucideIcon
} from 'lucide-react';

export interface ServiceIconProps {
  name: ServiceIconName;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: string;
}

export type ServiceIconName = 
  // Service Categories
  | 'compute' | 'networking' | 'storage' | 'other-services'
  // General Business Icons  
  | 'analytics' | 'cost' | 'security' | 'performance' | 'trending-up' | 'trending-down'
  | 'users' | 'encrypted' | 'network' | 'energy' | 'warning' | 'success' | 'time'
  | 'document' | 'search' | 'star' | 'rocket' | 'design' | 'pin' | 'archive'
  | 'chart-bar' | 'chart-line' | 'monitor' | 'notification' | 'mobile' | 'laptop'
  | 'tool' | 'target' | 'package'
  // Trend arrows
  | 'arrow-up' | 'arrow-down';

const iconMap: Record<ServiceIconName, LucideIcon> = {
  // Service Categories
  'compute': Server,
  'networking': Network, 
  'storage': Database,
  'other-services': Settings,
  
  // General Icons
  'analytics': BarChart3,
  'cost': DollarSign,
  'security': Shield,
  'performance': Activity,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  'users': Users,
  'encrypted': Lock,
  'network': Globe,
  'energy': Zap,
  'warning': AlertTriangle,
  'success': CheckCircle,
  'time': Clock,
  'document': FileText,
  'search': Search,
  'star': Star,
  'rocket': Rocket,
  'design': Palette,
  'pin': PinIcon,
  'archive': Archive,
  'chart-bar': ChartBar,
  'chart-line': ChartLine,
  'monitor': Monitor,
  'notification': Bell,
  'mobile': Smartphone,
  'laptop': Laptop,
  'tool': Wrench,
  'target': Target,
  'package': Package,
  
  // Trend Icons
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
};

const sizeConfigs = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

export function ServiceIcon({ name, size = 'md', className, color }: ServiceIconProps) {
  const IconComponent = iconMap[name];
  const iconSize = typeof size === 'number' ? size : sizeConfigs[size];
  
  if (!IconComponent) {
    console.warn(`ServiceIcon: Unknown icon name "${name}"`);
    return null;
  }
  
  return (
    <IconComponent
      size={iconSize}
      className={cn('flex-shrink-0', className)}
      style={color ? { color } : undefined}
    />
  );
}

// Helper function to get icon component directly
export function getServiceIcon(name: ServiceIconName): LucideIcon | null {
  return iconMap[name] || null;
}

// Color scheme presets for different contexts
export const iconColorSchemes = {
  pillar: {
    'cost': '#10B981', // green
    'resource': '#3B82F6', // blue  
    'performance': '#F59E0B', // amber
    'security': '#EF4444', // red
  },
  service: {
    'compute': '#8B5CF6', // purple
    'networking': '#06B6D4', // cyan
    'storage': '#84CC16', // lime
    'other-services': '#6B7280', // gray
  },
  status: {
    'healthy': '#10B981', // green
    'warning': '#F59E0B', // amber
    'error': '#EF4444', // red
    'info': '#3B82F6', // blue
  }
} as const;
