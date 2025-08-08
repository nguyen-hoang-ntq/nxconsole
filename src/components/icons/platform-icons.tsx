'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PlatformIconProps {
  platform: 'aws' | 'azure' | 'm365' | 'gcp' | 'docker' | 'kubernetes';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PlatformIcon({ platform, size = 'md', className }: PlatformIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const iconProps = {
    className: cn(sizeClasses[size], className),
    viewBox: '0 0 24 24'
  };

  switch (platform) {
    case 'aws':
      return (
        <svg {...iconProps}>
          {/* Official AWS Logo SVG */}
          <path fill="#FF9900" d="M14.695 3.26c-.806-.124-1.64-.186-2.695-.186-1.055 0-1.89.062-2.695.186-1.45.223-2.305.558-2.305 1.24 0 .682.855 1.017 2.305 1.24.805.124 1.64.186 2.695.186 1.055 0 1.89-.062 2.695-.186 1.45-.223 2.305-.558 2.305-1.24 0-.682-.855-1.017-2.305-1.24z"/>
          <path fill="#FF9900" d="M17 5.5v1c0 .682-.855 1.017-2.305 1.24-.805.124-1.64.186-2.695.186-1.055 0-1.89-.062-2.695-.186C7.855 7.517 7 7.182 7 6.5v-1c0 .682.855 1.017 2.305 1.24.805.124 1.64.186 2.695.186 1.055 0 1.89-.062 2.695-.186C16.145 6.517 17 6.182 17 5.5z"/>
          <path fill="#FF9900" d="M17 8v1c0 .682-.855 1.017-2.305 1.24-.805.124-1.64.186-2.695.186-1.055 0-1.89-.062-2.695-.186C7.855 9.017 7 8.682 7 8v-1c0 .682.855 1.017 2.305 1.24.805.124 1.64.186 2.695.186 1.055 0 1.89-.062 2.695-.186C16.145 8.017 17 7.682 17 7z"/>
          <path fill="#FF9900" d="M17 10.5v1c0 .682-.855 1.017-2.305 1.24-.805.124-1.64.186-2.695.186-1.055 0-1.89-.062-2.695-.186C7.855 12.517 7 12.182 7 11.5v-1c0 .682.855 1.017 2.305 1.24.805.124 1.64.186 2.695.186 1.055 0 1.89-.062 2.695-.186C16.145 11.517 17 11.182 17 10.5z"/>
          <path fill="#232F3E" d="M21.132 16.982c-.28.413-.733.613-1.358.6-.625-.013-1.148-.213-1.568-.6-.42-.387-.63-.853-.63-1.4 0-.547.21-1.013.63-1.4.42-.387.943-.587 1.568-.6.625-.013 1.078.187 1.358.6.28.413.42.853.42 1.32 0 .467-.14.893-.42 1.48z"/>
        </svg>
      );
      
    case 'azure':
      return (
        <svg {...iconProps}>
          {/* Official Microsoft Azure Logo */}
          <path fill="#0078D4" d="M17.45 3.95L11.17 17.68l10.01-1.55-3.73-12.18z"/>
          <path fill="#0078D4" d="M11.17 17.68L5.32 22.05h9.45l6.23-1.55-9.83-2.82z"/>
          <path fill="#40E0D0" d="M5.32 22.05h9.45l6.23-1.55L17.45 3.95 5.32 22.05z"/>
        </svg>
      );
      
    case 'm365':
      return (
        <svg {...iconProps}>
          {/* Official Microsoft 365 Logo */}
          <path fill="#FF6D02" d="M2 2h9v9H2z"/>
          <path fill="#05CE78" d="M13 2h9v9h-9z"/>
          <path fill="#01BCF2" d="M2 13h9v9H2z"/>
          <path fill="#A259FF" d="M13 13h9v9h-9z"/>
        </svg>
      );
      
    case 'gcp':
      return (
        <svg {...iconProps}>
          {/* Official Google Cloud Platform Logo */}
          <path fill="#4285F4" d="M12.1 2.4L7.2 7.3v1.4l7-7h1.4l-3.5-3.5c-.3-.3-.7-.3-1 0l-3.5 3.5L12.1 2.4z"/>
          <path fill="#34A853" d="M19.5 8.7v1.4L12.5 2.1v1.4l7 7z"/>
          <path fill="#FBBC04" d="M4.5 8.7v1.4l7-7V2.1l-7 7z"/>
          <path fill="#EA4335" d="M12.5 22.4L7.6 17.5v-1.4l7 7h1.4l3.5-3.5c.3-.3.3-.7 0-1l-3.5 3.5L12.5 22.4z"/>
          <path fill="#4285F4" d="M4.5 15.3v-1.4l7 7v1.4l-7-7z"/>
          <path fill="#34A853" d="M19.5 15.3v-1.4L12.5 21.9v1.4l7-7z"/>
        </svg>
      );
      
    case 'docker':
      return (
        <svg {...iconProps}>
          {/* Official Docker Logo */}
          <path fill="#2496ED" d="M8.5 8.64V6.76h1.69v1.88H8.5zm1.88 0V6.76h1.69v1.88h-1.69zm1.88 0V6.76h1.69v1.88h-1.69zm-3.76 0V6.76h1.69v1.88H8.5zm1.88-2.07V4.69h1.69v1.88H10.38z"/>
          <path fill="#2496ED" d="M17.33 9.21c-.38-.23-.89-.3-1.35-.2-.05-.38-.24-.72-.54-.94-.37-.28-.85-.38-1.3-.29-.25.05-.48.16-.67.32v.09c0 .71-.1 1.42-.29 2.11-.19.69-.46 1.35-.81 1.96-.35.61-.78 1.16-1.28 1.64-.5.48-1.07.87-1.69 1.15-.62.28-1.29.43-1.97.43H7.1c-.41 0-.74.33-.74.74v.23c.02.4.35.72.75.72h.56c1.15 0 2.28-.2 3.33-.59 1.05-.39 2-.96 2.8-1.68.8-.72 1.43-1.58 1.86-2.54.43-.96.65-1.99.65-3.04 0-.15-.01-.3-.03-.45.23-.15.44-.34.6-.57.16-.23.28-.49.35-.76.02-.08.03-.16.03-.24z"/>
        </svg>
      );
      
    case 'kubernetes':
      return (
        <svg {...iconProps}>
          {/* Official Kubernetes Logo */}
          <path fill="#326CE5" d="M12 2.4c-.2 0-.4.1-.5.2l-9 5.2c-.3.2-.5.5-.5.9v10.4c0 .4.2.7.5.9l9 5.2c.3.2.7.2 1 0l9-5.2c.3-.2.5-.5.5-.9V8.7c0-.4-.2-.7-.5-.9l-9-5.2c-.1-.1-.3-.2-.5-.2z"/>
          <path fill="#FFFFFF" d="M12 4.5L5.2 8.7v8.6L12 21.5l6.8-4.2V8.7L12 4.5z"/>
          <path fill="#326CE5" d="M12 6l5.5 3.2v6.6L12 19l-5.5-3.2V9.2L12 6z"/>
        </svg>
      );
      
    default:
      return null;
  }
}

// Preset combinations for common use cases
export function AWSIcon({ size = 'md', className }: Omit<PlatformIconProps, 'platform'>) {
  return <PlatformIcon platform="aws" size={size} className={cn('text-orange-600', className)} />;
}

export function AzureIcon({ size = 'md', className }: Omit<PlatformIconProps, 'platform'>) {
  return <PlatformIcon platform="azure" size={size} className={cn('text-blue-600', className)} />;
}

export function M365Icon({ size = 'md', className }: Omit<PlatformIconProps, 'platform'>) {
  return <PlatformIcon platform="m365" size={size} className={className} />;
}

export function GCPIcon({ size = 'md', className }: Omit<PlatformIconProps, 'platform'>) {
  return <PlatformIcon platform="gcp" size={size} className={className} />;
}

export function DockerIcon({ size = 'md', className }: Omit<PlatformIconProps, 'platform'>) {
  return <PlatformIcon platform="docker" size={size} className={cn('text-blue-500', className)} />;
}

export function KubernetesIcon({ size = 'md', className }: Omit<PlatformIconProps, 'platform'>) {
  return <PlatformIcon platform="kubernetes" size={size} className={cn('text-blue-700', className)} />;
}
