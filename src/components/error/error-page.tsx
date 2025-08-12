'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  ArrowLeft, 
  Shield, 
  AlertTriangle, 
  RefreshCw,
  MessageCircle,
  KeyRound,
  User,
  Settings,
  BookOpen,
  Phone,
  BarChart3
} from 'lucide-react';

interface ErrorPageProps {
  statusCode: 403 | 500;
  title?: string;
  description?: string;
  showReportButton?: boolean;
}

const errorConfigs = {
  403: {
    icon: Shield,
    title: 'Access Forbidden',
    description: 'You don\'t have permission to access this resource. Please contact your administrator if you believe this is an error.',
    color: 'destructive' as const,
    suggestions: [
      'Verify you are logged in with the correct account',
      'Check if your account has the necessary permissions',
      'Contact your system administrator for access',
      'Try logging out and logging back in'
    ]
  },
  500: {
    icon: AlertTriangle,
    title: 'Internal Server Error',
    description: 'Something went wrong on our end. Our team has been notified and is working to fix the issue.',
    color: 'destructive' as const,
    suggestions: [
      'Try refreshing the page',
      'Wait a few minutes and try again',
      'Check our status page for updates',
      'Contact support if the problem persists'
    ]
  }
};

export default function ErrorPage({ 
  statusCode, 
  title, 
  description, 
  showReportButton = true 
}: ErrorPageProps) {
  const config = errorConfigs[statusCode];
  const IconComponent = config.icon;
  
  const handleReportError = () => {
    // In a real app, this would open a bug reporting modal or send to an error tracking service
    window.open('mailto:support@nxconsole.com?subject=Error Report: ' + statusCode, '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Error Illustration */}
        <div className="space-y-4">
          <div className="mx-auto w-32 h-32 bg-destructive/10 rounded-full flex items-center justify-center">
            <IconComponent className="h-16 w-16 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{statusCode}</h1>
            <h2 className="text-2xl font-semibold">{title || config.title}</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              {description || config.description}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge variant={config.color} className="text-sm">
            Error Code: {statusCode}
          </Badge>
        </div>

        {/* Troubleshooting Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <BookOpen className="h-5 w-5" />
              Troubleshooting Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-left space-y-2 max-w-md mx-auto">
              {config.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Settings className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard" className="block">
                <Button variant="outline" className="w-full h-16 flex-col">
                  <Home className="h-6 w-6 mb-2" />
                  Dashboard
                </Button>
              </Link>
              
              {statusCode === 403 && (
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full h-16 flex-col">
                    <KeyRound className="h-6 w-6 mb-2" />
                    Login
                  </Button>
                </Link>
              )}
              
              <Link href="/dashboard/users" className="block">
                <Button variant="outline" className="w-full h-16 flex-col">
                  <User className="h-6 w-6 mb-2" />
                  Profile
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="w-full h-16 flex-col"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-6 w-6 mb-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => window.history.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          
          <Link href="/dashboard">
            <Button>
              <Home className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
          </Link>
          
          {showReportButton && statusCode === 500 && (
            <Button variant="outline" onClick={handleReportError}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
          )}
        </div>

        {/* Support Information */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 justify-center mb-4">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Need Additional Help?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {statusCode === 403 
                ? 'If you believe you should have access to this resource, please contact your system administrator or our support team.'
                : 'If this problem continues, please reach out to our support team with the error details.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="link" size="sm">
                📧 support@nxconsole.com
              </Button>
              <Button variant="link" size="sm">
                <Phone className="w-4 h-4 mr-1" />
                +1 (555) 123-4567
              </Button>
              <Button variant="link" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                Live Chat Support
              </Button>
              <Button variant="link" size="sm">
                <BarChart3 className="w-4 h-4 mr-1" />
                System Status
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>© 2024 NxConsole. All rights reserved.</p>
          {statusCode === 500 && (
            <p>Error ID: {Math.random().toString(36).substring(2, 15)} | {new Date().toISOString()}</p>
          )}
        </div>
      </div>
    </div>
  );
}
