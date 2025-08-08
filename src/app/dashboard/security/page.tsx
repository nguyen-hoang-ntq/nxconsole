'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  FileText,
  Settings,
  RefreshCw
} from 'lucide-react';
import { SecurityDashboard } from '@/components/security/security-dashboard';
import { AuditTrail } from '@/components/security/audit-trail';
import { mockSecurityFindings, mockAuditEvents } from '@/lib/mock-data';

export default function SecurityPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleRefreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-red-600" />
            Security & Compliance
          </h1>
          <p className="text-muted-foreground">
            Monitor security posture, compliance status, and audit activities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold">85/100</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Compliance Frameworks</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-purple-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Audit Events (24h)</p>
                <p className="text-2xl font-bold">247</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Dashboard
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Audit Trail
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <SecurityDashboard findings={mockSecurityFindings} loading={loading} />
        </TabsContent>
        
        <TabsContent value="audit" className="space-y-4">
          <AuditTrail events={mockAuditEvents} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
