'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, AlertTriangle } from 'lucide-react';

export default function M365Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Microsoft 365</h1>
          <p className="text-muted-foreground">
            Manage Microsoft 365 licenses, teams, and services.
          </p>
        </div>
        <Badge variant="outline">450 Licenses</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Users className="h-16 w-16 text-muted-foreground" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">M365 Management Under Development</h3>
              <p className="text-muted-foreground max-w-md">
                This module will include license management, Teams administration, 
                SharePoint management, and Exchange controls.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span>Implementation in progress according to Task 9</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
