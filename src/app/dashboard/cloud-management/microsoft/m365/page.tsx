'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Video, 
  MessageSquare,
  Calendar, 
  FileText,
  Settings,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Mail,
  Cloud,
  FolderOpen
} from 'lucide-react';
import { LicenseDashboard } from '@/components/m365/license-dashboard';
import { TeamsManagement } from '@/components/m365/teams-management';
import { mockLicenses, mockTeams } from '@/lib/mock-data';

export default function M365Page() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  const handleRefreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  // Calculate overview metrics
  const totalLicenses = mockLicenses.length;
  const assignedLicenses = mockLicenses.filter(l => l.assigned).length;
  const totalTeams = mockTeams.length;
  const activeTeams = mockTeams.filter((t: any) => !t.archived).length;
  const totalMembers = mockTeams.reduce((sum: number, t: any) => sum + t.memberCount, 0);
  const monthlyCost = mockLicenses.reduce((sum, l) => sum + l.cost, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            Microsoft 365 Management
          </h1>
          <p className="text-muted-foreground">
            Manage licenses, Teams, and Microsoft 365 services
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            M365 Settings
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="licenses" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            License Management
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Microsoft Teams
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Services
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Overview Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-blue-600" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Licenses</p>
                    <p className="text-2xl font-bold">{totalLicenses}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {assignedLicenses} assigned ({Math.round((assignedLicenses/totalLicenses)*100)}%)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-muted-foreground">Teams</p>
                    <p className="text-2xl font-bold">{totalTeams}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeTeams} active, {totalTeams - activeTeams} archived
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-purple-600" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{totalMembers.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all teams
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-orange-600" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
                    <p className="text-2xl font-bold">${monthlyCost.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  All M365 licenses
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Alerts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New team created</p>
                    <p className="text-xs text-muted-foreground">Marketing Campaign Q1 - 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Users className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Licenses assigned</p>
                    <p className="text-xs text-muted-foreground">5 E3 licenses to new employees - 4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <FileText className="h-4 w-4 text-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Policy updated</p>
                    <p className="text-xs text-muted-foreground">Guest access policy modified - 6 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alerts & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Unused licenses detected</p>
                    <p className="text-xs text-muted-foreground">12 E3 licenses unused for 30+ days</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <MessageSquare className="h-4 w-4 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Inactive teams found</p>
                    <p className="text-xs text-muted-foreground">3 teams with no activity for 60+ days</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">License optimization</p>
                    <p className="text-xs text-muted-foreground">Potential savings: $2,400/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                  <Link href="/dashboard/cloud-management/microsoft/m365/sharepoint">
                    <FolderOpen className="h-6 w-6" />
                    <span>SharePoint Sites</span>
                  </Link>
                </Button>
                
                <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                  <Link href="/dashboard/cloud-management/microsoft/m365/exchange">
                    <Mail className="h-6 w-6" />
                    <span>Exchange Management</span>
                  </Link>
                </Button>
                
                <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                  <Link href="/dashboard/cloud-management/microsoft/m365/onedrive">
                    <Cloud className="h-6 w-6" />
                    <span>OneDrive Management</span>
                  </Link>
                </Button>
                
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Usage Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="licenses" className="space-y-4">
          <LicenseDashboard licenses={mockLicenses} loading={loading} />
        </TabsContent>
        
        <TabsContent value="teams" className="space-y-4">
          <TeamsManagement teams={mockTeams} loading={loading} />
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Microsoft 365 Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {/* SharePoint */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      SharePoint
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Storage Used</span>
                      <span className="text-sm font-semibold">2.4TB / 25TB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Sites</span>
                      <span className="text-sm font-semibold">127</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => router.push('/dashboard/cloud-management/microsoft/m365/sharepoint')}
                    >
                      Manage Sites
                    </Button>
                  </CardContent>
                </Card>

                {/* Exchange */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      Exchange
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mailboxes</span>
                      <span className="text-sm font-semibold">487</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Storage</span>
                      <span className="text-sm font-semibold">890GB</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => router.push('/dashboard/cloud-management/microsoft/m365/exchange')}
                    >
                      Manage Mailboxes
                    </Button>
                  </CardContent>
                </Card>

                {/* OneDrive */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      OneDrive
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Users</span>
                      <span className="text-sm font-semibold">453</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Storage Used</span>
                      <span className="text-sm font-semibold">5.2TB</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => router.push('/dashboard/cloud-management/microsoft/m365/onedrive')}
                    >
                      Manage Storage
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
