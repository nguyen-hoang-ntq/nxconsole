'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface ErrorStateProps {
  type?: 'network' | 'permission' | 'not-found' | 'generic';
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

export function ErrorState({
  type = 'generic',
  title,
  message,
  onRetry,
  showRetryButton = true
}: ErrorStateProps) {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: <WifiOff className="h-12 w-12 text-muted-foreground" />,
          defaultTitle: 'Connection Error',
          defaultMessage: 'Unable to connect to the server. Please check your internet connection and try again.'
        };
      case 'permission':
        return {
          icon: <AlertCircle className="h-12 w-12 text-yellow-500" />,
          defaultTitle: 'Access Denied',
          defaultMessage: 'You don\'t have permission to access this resource. Please contact your administrator.'
        };
      case 'not-found':
        return {
          icon: <AlertCircle className="h-12 w-12 text-muted-foreground" />,
          defaultTitle: 'Not Found',
          defaultMessage: 'The resource you\'re looking for could not be found.'
        };
      default:
        return {
          icon: <AlertCircle className="h-12 w-12 text-red-500" />,
          defaultTitle: 'Something went wrong',
          defaultMessage: 'An unexpected error occurred. Please try again later.'
        };
    }
  };
  
  const config = getErrorConfig();
  
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center min-h-[200px] space-y-4 p-8">
        {config.icon}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">
            {title || config.defaultTitle}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {message || config.defaultMessage}
          </p>
        </div>
        {showRetryButton && onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Inline Error State (for smaller areas)
export function InlineErrorState({
  message,
  onRetry
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-md border border-destructive/20">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-4 w-4 text-destructive" />
        <span className="text-sm text-destructive">{message}</span>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="ghost" size="sm">
          <RefreshCw className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}

// Empty State Component
export function EmptyState({
  icon: Icon = AlertCircle,
  title,
  message,
  action
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center min-h-[200px] space-y-4 p-8">
        <Icon className="h-12 w-12 text-muted-foreground" />
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-md">{message}</p>
        </div>
        {action}
      </CardContent>
    </Card>
  );
}
