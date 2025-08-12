'use client';

import React from 'react';
import { ServiceStatus } from '@/contexts/service-health-context';
import { cn } from '@/lib/utils';

interface ServiceHealthIndicatorProps {
  status: ServiceStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ServiceHealthIndicator: React.FC<ServiceHealthIndicatorProps> = ({ 
  status, 
  size = 'sm',
  className 
}) => {
  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-gray-400';
      case 'error': return 'bg-red-500';
      case 'loading': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getSize = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm': return 'w-2 h-2';
      case 'md': return 'w-3 h-3';
      case 'lg': return 'w-4 h-4';
      default: return 'w-2 h-2';
    }
  };

  const getPulseAnimation = (status: ServiceStatus) => {
    return status === 'loading' ? 'animate-pulse' : '';
  };

  return (
    <div 
      className={cn(
        'rounded-full',
        getStatusColor(status),
        getSize(size),
        getPulseAnimation(status),
        className
      )}
      title={`Status: ${status}`}
    />
  );
};

interface ServiceHealthBadgeProps {
  status: ServiceStatus;
  serviceName: string;
  showLabel?: boolean;
  className?: string;
}

export const ServiceHealthBadge: React.FC<ServiceHealthBadgeProps> = ({
  status,
  serviceName,
  showLabel = false,
  className
}) => {
  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'disconnected': return 'Disconnected';
      case 'error': return 'Error';
      case 'loading': return 'Checking...';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-50 border-green-200';
      case 'disconnected': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'loading': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (!showLabel) {
    return <ServiceHealthIndicator status={status} className={className} />;
  }

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-2 py-1 rounded-md border text-xs font-medium',
      getStatusColor(status),
      className
    )}>
      <ServiceHealthIndicator status={status} size="sm" />
      <span>{serviceName}: {getStatusText(status)}</span>
    </div>
  );
};
