import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Server,
  Network,
  Database,
  Settings,
  type LucideIcon
} from 'lucide-react';
import { serviceTailwindClasses } from '@/lib/pillar-colors';

export interface ServiceCategoryIconProps {
  category: 'compute' | 'networking' | 'storage' | 'otherServices';
  size?: number;
  className?: string;
  variant?: 'default' | 'outlined' | 'filled';
}

const categoryIcons: Record<ServiceCategoryIconProps['category'], LucideIcon> = {
  compute: Server,
  networking: Network,
  storage: Database,
  otherServices: Settings,
};

const categoryLabels: Record<ServiceCategoryIconProps['category'], string> = {
  compute: 'Compute',
  networking: 'Networking',
  storage: 'Storage',
  otherServices: 'Other Services',
};

export function ServiceCategoryIcon({ 
  category, 
  size = 20, 
  className, 
  variant = 'default' 
}: ServiceCategoryIconProps) {
  const IconComponent = categoryIcons[category];
  const colorClasses = serviceTailwindClasses[category];
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'outlined':
        return `p-2 rounded-lg border-2 ${colorClasses.border} ${colorClasses.bg}`;
      case 'filled':
        return `p-2 rounded-lg ${colorClasses.bg} ${colorClasses.border}`;
      default:
        return '';
    }
  };

  return (
    <div 
      className={cn(getVariantClasses(), className)} 
      title={categoryLabels[category]}
    >
      <IconComponent
        size={size}
        className={cn('flex-shrink-0', colorClasses.icon)}
      />
    </div>
  );
}

// Helper function to get category icon directly
export function getCategoryIcon(category: ServiceCategoryIconProps['category']): LucideIcon {
  return categoryIcons[category];
}

// Helper function to get category color classes
export function getCategoryColorClasses(category: ServiceCategoryIconProps['category']) {
  return serviceTailwindClasses[category];
}

// Preset components for easy usage
export const ComputeIcon = (props: Omit<ServiceCategoryIconProps, 'category'>) => (
  <ServiceCategoryIcon category="compute" {...props} />
);

export const NetworkingIcon = (props: Omit<ServiceCategoryIconProps, 'category'>) => (
  <ServiceCategoryIcon category="networking" {...props} />
);

export const StorageIcon = (props: Omit<ServiceCategoryIconProps, 'category'>) => (
  <ServiceCategoryIcon category="storage" {...props} />
);

export const OtherServicesIcon = (props: Omit<ServiceCategoryIconProps, 'category'>) => (
  <ServiceCategoryIcon category="otherServices" {...props} />
);
