'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Layers, AlertTriangle } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Management</h1>
          <p className="text-muted-foreground">
            Unified view and management of resources across AWS, Azure, and Microsoft 365.
          </p>
        </div>
        <Badge variant="secondary">1,247 Resources</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Layers className="h-16 w-16 text-muted-foreground" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Resource Management Under Development</h3>
              <p className="text-muted-foreground max-w-md">
                This module will provide unified resource inventory, provisioning workflows, 
                and lifecycle management across all cloud platforms.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span>Implementation in progress according to Task 6</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
