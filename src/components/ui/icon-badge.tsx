'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  AlertTriangle, 
  Sparkles, 
  AlertCircle,
  Info,
  CheckCircle,
  X
} from 'lucide-react';

export interface IconBadgeProps {
  type: 'warning' | 'new' | 'alert' | 'info' | 'success' | 'error';
  count?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BADGE_CONFIGS = {
  warning: {
    icon: AlertTriangle,
    className: 'bg-amber-500 text-white',
    hoverClassName: 'hover:bg-amber-600'
  },
  new: {
    icon: Sparkles,
    className: 'bg-emerald-500 text-white',
    hoverClassName: 'hover:bg-emerald-600'
  },
  alert: {
    icon: AlertCircle,
    className: 'bg-red-500 text-white',
    hoverClassName: 'hover:bg-red-600'
  },
  info: {
    icon: Info,
    className: 'bg-blue-500 text-white',
    hoverClassName: 'hover:bg-blue-600'
  },
  success: {
    icon: CheckCircle,
    className: 'bg-green-500 text-white',
    hoverClassName: 'hover:bg-green-600'
  },
  error: {
    icon: X,
    className: 'bg-red-500 text-white',
    hoverClassName: 'hover:bg-red-600'
  }
};

const SIZE_CONFIGS = {
  sm: {
    container: 'h-5 w-5 text-xs min-w-[20px]',
    icon: 'h-3 w-3',
    text: 'text-xs'
  },
  md: {
    container: 'h-6 w-6 text-xs min-w-[24px]',
    icon: 'h-3.5 w-3.5',
    text: 'text-xs'
  },
  lg: {
    container: 'h-7 w-7 text-sm min-w-[28px]',
    icon: 'h-4 w-4',
    text: 'text-xs'
  }
};

export function IconBadge({ 
  type, 
  count, 
  className = '', 
  size = 'md' 
}: IconBadgeProps) {
  const config = BADGE_CONFIGS[type];
  const sizeConfig = SIZE_CONFIGS[size];
  const IconComponent = config.icon;

  if (count !== undefined) {
    // Number badge with background
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full font-semibold transition-colors shadow-sm',
          config.className,
          config.hoverClassName,
          sizeConfig.container,
          className
        )}
        title={`${count} ${type} notifications`}
      >
        <span className={cn('font-bold leading-none', sizeConfig.text)}>
          {count > 99 ? '99+' : count}
        </span>
      </div>
    );
  }

  // Icon badge
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full transition-colors shadow-sm',
        config.className,
        config.hoverClassName,
        sizeConfig.container,
        className
      )}
      title={`${type} indicator`}
    >
      <IconComponent className={cn(sizeConfig.icon)} />
    </div>
  );
}

export default IconBadge;
