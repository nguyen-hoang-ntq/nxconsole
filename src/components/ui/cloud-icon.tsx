import React from 'react';
import { cn } from '@/lib/utils';

interface CloudIconProps {
  provider: 'aws' | 'azure' | 'google-cloud' | 'microsoft-azure' | 'microsoft-365' | 'google-workspace';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const providerConfigs = {
  'aws': {
    color: '#FF9900',
    symbol: '☁️',
    label: 'AWS'
  },
  'azure': {
    color: '#0078D4',
    symbol: '☁️',
    label: 'Azure'
  },
  'microsoft-azure': {
    color: '#0078D4',
    symbol: '☁️',
    label: 'Azure'
  },
  'google-cloud': {
    color: '#4285F4',
    symbol: '☁️',
    label: 'GCP'
  },
  'microsoft-365': {
    color: '#D83B01',
    symbol: '📊',
    label: 'M365'
  },
  'google-workspace': {
    color: '#34A853',
    symbol: '📧',
    label: 'Workspace'
  }
};

const sizeConfigs = {
  sm: 'h-4 w-4 text-sm',
  md: 'h-6 w-6 text-base',
  lg: 'h-8 w-8 text-lg',
  xl: 'h-12 w-12 text-2xl'
};

export function CloudIcon({ provider, size = 'md', className }: CloudIconProps) {
  const config = providerConfigs[provider];
  const sizeClass = sizeConfigs[size];
  
  return (
    <div 
      className={cn(
        'flex items-center justify-center rounded-md font-semibold',
        sizeClass,
        className
      )}
      style={{ color: config.color }}
      title={config.label}
    >
      {config.symbol}
    </div>
  );
}
