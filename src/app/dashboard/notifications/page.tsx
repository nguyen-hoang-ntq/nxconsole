'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NotificationCenter } from '@/components/notifications/notification-center';
import { AlertManagement } from '@/components/notifications/alert-management';
import { Bell, Settings } from 'lucide-react';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('notifications');

  return (
    <div className="container mx-auto p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="management" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Alert Management
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications">
          <NotificationCenter />
        </TabsContent>
        
        <TabsContent value="management">
          <AlertManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
