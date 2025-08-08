import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  lastUpdated,
  children
}) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 NTQ Solution. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <Link href="/legal/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/legal/terms-of-service" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/legal/privacy-rights" className="hover:text-primary">
                Privacy Rights
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
