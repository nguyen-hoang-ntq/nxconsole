'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'page' | 'component' | 'critical';
}

interface ErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo;
  resetError: () => void;
  errorId: string;
  level: 'page' | 'component' | 'critical';
}

// Generate unique error ID
function generateErrorId(): string {
  return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Default error fallback component
function DefaultErrorFallback({ 
  error, 
  errorInfo, 
  resetError, 
  errorId, 
  level 
}: ErrorFallbackProps) {
  const isDevMode = process.env.NODE_ENV === 'development';

  const getLevelConfig = () => {
    switch (level) {
      case 'critical':
        return {
          title: 'Critical System Error',
          description: 'A critical error has occurred that prevents the application from functioning.',
          icon: Bug,
          variant: 'destructive' as const,
          showDetails: true
        };
      case 'page':
        return {
          title: 'Page Error',
          description: 'This page encountered an error and cannot be displayed.',
          icon: AlertTriangle,
          variant: 'destructive' as const,
          showDetails: isDevMode
        };
      case 'component':
        return {
          title: 'Component Error',
          description: 'A component on this page encountered an error.',
          icon: AlertTriangle,
          variant: 'secondary' as const,
          showDetails: isDevMode
        };
      default:
        return {
          title: 'Something went wrong',
          description: 'An unexpected error occurred.',
          icon: AlertTriangle,
          variant: 'destructive' as const,
          showDetails: isDevMode
        };
    }
  };

  const config = getLevelConfig();
  const IconComponent = config.icon;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <IconComponent className="h-8 w-8 text-destructive" />
          <div>
            <CardTitle className="text-xl">{config.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Error ID: {errorId}</Badge>
          <Badge variant={config.variant}>{level.toUpperCase()}</Badge>
        </div>

        {config.showDetails && (
          <details className="bg-muted p-4 rounded-lg">
            <summary className="cursor-pointer font-medium text-sm mb-2">
              Error Details
            </summary>
            <div className="space-y-2 text-xs font-mono">
              <div>
                <strong>Message:</strong>
                <pre className="mt-1 whitespace-pre-wrap break-words">{error.message}</pre>
              </div>
              <div>
                <strong>Stack:</strong>
                <pre className="mt-1 whitespace-pre-wrap break-words text-xs">
                  {error.stack}
                </pre>
              </div>
              {errorInfo.componentStack && (
                <div>
                  <strong>Component Stack:</strong>
                  <pre className="mt-1 whitespace-pre-wrap break-words text-xs">
                    {errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          </details>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={resetError} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          
          {level === 'page' && (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          )}
          
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reload Page
          </Button>
        </div>

        {!isDevMode && (
          <p className="text-xs text-muted-foreground">
            If this error persists, please contact support with Error ID: {errorId}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Main Error Boundary Component
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: generateErrorId()
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call custom error handler
    this.props.onError?.(error, errorInfo);

    // Send to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }
  }

  reportError = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, send to error reporting service
    // Example: Sentry, LogRocket, Bugsnag, etc.
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      level: this.props.level || 'component'
    };

    console.log('Error report:', errorReport);
    // Example: sendToErrorService(errorReport);
  };

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  render() {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={this.resetError}
          errorId={this.state.errorId}
          level={this.props.level || 'component'}
        />
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WithErrorBoundaryComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = 
    `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
}

// React Hook for error handling
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { handleError, resetError };
}

// Async error handler hook
export function useAsyncError() {
  const { handleError } = useErrorHandler();

  return React.useCallback(
    (error: Error) => {
      // Handle async errors by throwing them in the next tick
      // This allows error boundaries to catch them
      setTimeout(() => {
        handleError(error);
      }, 0);
    },
    [handleError]
  );
}

// Error logging utility
export class ErrorLogger {
  private static instance: ErrorLogger;
  private errors: Array<{
    error: Error;
    timestamp: Date;
    context?: string;
    level: 'error' | 'warning' | 'info';
  }> = [];

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  log(error: Error, context?: string, level: 'error' | 'warning' | 'info' = 'error') {
    this.errors.push({
      error,
      timestamp: new Date(),
      context,
      level
    });

    // Keep only last 100 errors
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-100);
    }

    // Log to console with appropriate method
    switch (level) {
      case 'error':
        console.error(`[ERROR]`, error, context ? `Context: ${context}` : '');
        break;
      case 'warning':
        console.warn(`[WARNING]`, error, context ? `Context: ${context}` : '');
        break;
      case 'info':
        console.info(`[INFO]`, error, context ? `Context: ${context}` : '');
        break;
    }
  }

  getErrors() {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
  }
}

// Global error handler setup
export function setupGlobalErrorHandling() {
  const logger = ErrorLogger.getInstance();

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logger.log(new Error(event.reason), 'Unhandled Promise Rejection', 'error');
    console.error('Unhandled promise rejection:', event.reason);
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    logger.log(event.error || new Error(event.message), 'Global Error', 'error');
    console.error('Global error:', event.error);
  });
}
