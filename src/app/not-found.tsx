'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  BookOpen, 
  MessageCircle, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Error Illustration */}
        <div className="space-y-4">
          <div className="mx-auto w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-16 w-16 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or may be under development.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Search className="h-5 w-5" />
              What can we help you find?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/dashboard" className="block">
                <Button variant="outline" className="w-full h-16 flex-col">
                  <Home className="h-6 w-6 mb-2" />
                  Dashboard
                </Button>
              </Link>
              
              <Link href="/dashboard/cloud-management" className="block">
                <Button variant="outline" className="w-full h-16 flex-col">
                  <BookOpen className="h-6 w-6 mb-2" />
                  Cloud Management
                </Button>
              </Link>
              
              <Link href="/dashboard/users" className="block">
                <Button variant="outline" className="w-full h-16 flex-col">
                  <BookOpen className="h-6 w-6 mb-2" />
                  User Management
                </Button>
              </Link>
              
              <Link href="/dashboard/cost-management" className="block">
                <Button variant="outline" className="w-full h-16 flex-col">
                  <BookOpen className="h-6 w-6 mb-2" />
                  Cost Management
                </Button>
              </Link>
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
          
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>

        {/* Help Section */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 justify-center mb-4">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Need help?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              If you believe this is an error or need assistance accessing a specific resource, 
              please contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="link" size="sm">
                📧 support@nxconsole.com
              </Button>
              <Button variant="link" size="sm">
                📞 +1 (555) 123-4567
              </Button>
              <Button variant="link" size="sm">
                💬 Live Chat Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-xs text-muted-foreground">
          © 2024 NxConsole. All rights reserved.
        </div>
      </div>
    </div>
  );
}
