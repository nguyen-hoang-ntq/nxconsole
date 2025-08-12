import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Cloud, 
  CloudRain, 
  Zap, 
  Search, 
  Mail, 
  Building,
  Database,
  Server,
  Shield
} from 'lucide-react';

interface CloudIconProps {
  provider: 'aws' | 'azure' | 'google-cloud' | 'microsoft-azure' | 'microsoft-365' | 'google-workspace' | 'amazon' | 'microsoft' | 'google';
  service?: string;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const providerConfigs = {
  'aws': {
    color: '#FF9900',
    icon: Zap,
    label: 'AWS'
  },
  'amazon': {
    color: '#FF9900',
    icon: Zap,
    label: 'AWS'
  },
  'azure': {
    color: '#0078D4',
    icon: Cloud,
    label: 'Azure'
  },
  'microsoft-azure': {
    color: '#0078D4',
    icon: Cloud,
    label: 'Azure'
  },
  'microsoft': {
    color: '#0078D4',
    icon: Building,
    label: 'Microsoft'
  },
  'google-cloud': {
    color: '#4285F4',
    icon: CloudRain,
    label: 'GCP'
  },
  'google': {
    color: '#4285F4',
    icon: Search,
    label: 'Google'
  },
  'microsoft-365': {
    color: '#D83B01',
    icon: Building,
    label: 'M365'
  },
  'google-workspace': {
    color: '#34A853',
    icon: Mail,
    label: 'Workspace'
  }
};

const sizeConfigs = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48
};

export function CloudIcon({ provider, service, size = 'md', className }: CloudIconProps) {
  const config = providerConfigs[provider];
  const iconSize = typeof size === 'number' ? size : sizeConfigs[size];
  const IconComponent = config.icon;
  
  return (
    <div className={cn('inline-flex', className)} title={config.label}>
      <IconComponent
        size={iconSize}
        className="flex-shrink-0"
        style={{ color: config.color }}
      />
    </div>
  );
}
