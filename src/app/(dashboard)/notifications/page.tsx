'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, MessageCircle, AlertTriangle } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage alerts and notifications from all cloud platforms.
          </p>
        </div>
        <Badge variant="default">5 Unread</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <MessageCircle className="h-16 w-16 text-muted-foreground" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Notification Center Under Development</h3>
              <p className="text-muted-foreground max-w-md">
                This module will include notification management, alert configuration, 
                and real-time notification delivery.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span>Implementation in progress according to Task 10</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
