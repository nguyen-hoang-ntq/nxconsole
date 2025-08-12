'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudIcon } from '@/components/icons/cloud-icons';
import Link from 'next/link';
import { ArrowRight, Users, Server, DollarSign, Activity, Monitor, HardDrive, Network } from 'lucide-react';

const microsoftServices = [
  {
    id: 'azure',
    name: 'Microsoft Azure',
    description: 'Cloud computing platform and infrastructure services',
    href: '/dashboard/cloud-management/microsoft/azure',
    icon: <CloudIcon provider="microsoft" service="azure" size={32} />,
    stats: {
      resources: 156,
      regions: 8,
      cost: '$8,430'
    },
    status: 'healthy'
  },
  {
    id: 'm365',
    name: 'Microsoft 365',
    description: 'Productivity and collaboration platform',
    href: '/dashboard/cloud-management/microsoft/m365',
    icon: <CloudIcon provider="microsoft" size={32} />,
    stats: {
      users: 1247,
      licenses: 1500,
      cost: '$3,910'
    },
    status: 'healthy'
  }
];

const m365Services = [
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Collaboration and communication platform',
    href: '/dashboard/cloud-management/microsoft/m365/teams',
    icon: <CloudIcon provider="microsoft" service="teams" size={24} />,
    stats: {
      teams: 89,
      users: 1247,
      meetings: '2.3k'
    }
  },
  {
    id: 'sharepoint',
    name: 'SharePoint Online',
    description: 'Document management and collaboration',
    href: '/dashboard/cloud-management/microsoft/m365/sharepoint',
    icon: <CloudIcon provider="microsoft" service="sharepoint" size={24} />,
    stats: {
      sites: 45,
      storage: '2.1TB',
      users: 892
    }
  },
  {
    id: 'exchange',
    name: 'Exchange Online',
    description: 'Email and calendar services',
    href: '/dashboard/cloud-management/microsoft/m365/exchange',
    icon: <CloudIcon provider="microsoft" service="exchange" size={24} />,
    stats: {
      mailboxes: 1247,
      storage: '890GB',
      emails: '45k'
    }
  },
  {
    id: 'onedrive',
    name: 'OneDrive for Business',
    description: 'Cloud storage and file sync',
    href: '/dashboard/cloud-management/microsoft/m365/onedrive',
    icon: <CloudIcon provider="microsoft" service="onedrive" size={24} />,
    stats: {
      users: 1198,
      storage: '1.8TB',
      files: '156k'
    }
  }
];

export default function MicrosoftPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CloudIcon provider="microsoft" size={40} />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Microsoft Services</h1>
          <p className="text-muted-foreground">
            Manage your Azure and Microsoft 365 environment
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              Active Microsoft 365 users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Azure Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Across 8 regions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,340</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground">
              All services operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Services */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Platform Services</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {microsoftServices.map((service) => (
            <Card key={service.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {service.icon}
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {service.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  {Object.entries(service.stats).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-lg font-semibold">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button asChild className="w-full">
                  <Link href={service.href}>
                    Manage {service.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Microsoft 365 Services */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Microsoft 365 Services</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {m365Services.map((service) => (
            <Card key={service.id} className="cursor-pointer hover:bg-accent transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  {service.icon}
                  <div>
                    <h3 className="font-medium text-sm">{service.name}</h3>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {Object.entries(service.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-muted-foreground capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <Button asChild size="sm" className="w-full mt-3">
                  <Link href={service.href}>
                    Manage
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">License Management</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Assign and manage licenses
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                <span className="font-medium">Azure Resources</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Provision and manage resources
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-medium">Cost Analysis</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor and optimize costs
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <span className="font-medium">Health Monitor</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Service health and alerts
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Bridges to Resource Management */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Resource Monitoring</CardTitle>
            <CardDescription>Monitor and manage your Azure and M365 resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/dashboard/resource-management/compute">
                <Button variant="outline" className="h-16 flex-col w-full">
                  <Server className="w-5 h-5 mb-1" />
                  <span className="text-xs">Compute Resources</span>
                </Button>
              </Link>
              <Link href="/dashboard/resource-management/storage">
                <Button variant="outline" className="h-16 flex-col w-full">
                  <HardDrive className="w-5 h-5 mb-1" />
                  <span className="text-xs">Storage Resources</span>
                </Button>
              </Link>
              <Link href="/dashboard/resource-management/networking">
                <Button variant="outline" className="h-16 flex-col w-full">
                  <Network className="w-5 h-5 mb-1" />
                  <span className="text-xs">Network Resources</span>
                </Button>
              </Link>
              <Link href="/dashboard/performance-monitoring/azure">
                <Button variant="outline" className="h-16 flex-col w-full">
                  <Monitor className="w-5 h-5 mb-1" />
                  <span className="text-xs">Performance Monitor</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
