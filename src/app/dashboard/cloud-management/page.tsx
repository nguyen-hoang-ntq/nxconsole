'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudIcon } from '@/components/icons/cloud-icons';
import Link from 'next/link';
import { ArrowRight, Settings, Users, BarChart3 } from 'lucide-react';

const cloudProviders = [
  {
    id: 'microsoft',
    name: 'Microsoft',
    description: 'Manage Azure services and Microsoft 365 workloads',
    services: ['Azure', 'Microsoft 365', 'Teams', 'SharePoint', 'Exchange', 'OneDrive'],
    href: '/dashboard/cloud-management/microsoft',
    icon: <CloudIcon provider="microsoft" size={32} />,
    color: 'bg-blue-50 border-blue-200',
    stats: {
      resources: 156,
      users: 1247,
      cost: '$12,340'
    }
  },
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'Manage AWS services and infrastructure',
    services: ['AWS', 'EC2', 'S3', 'Lambda', 'RDS', 'CloudFormation'],
    href: '/dashboard/cloud-management/amazon',
    icon: <CloudIcon provider="amazon" size={32} />,
    color: 'bg-orange-50 border-orange-200',
    stats: {
      resources: 289,
      users: 45,
      cost: '$18,750'
    }
  },
  {
    id: 'google',
    name: 'Google',
    description: 'Manage Google Cloud Platform and Google Workspace',
    services: ['GCP', 'Compute Engine', 'Cloud Storage', 'BigQuery', 'Google Admin'],
    href: '/dashboard/cloud-management/google',
    icon: <CloudIcon provider="google" size={32} />,
    color: 'bg-green-50 border-green-200',
    stats: {
      resources: 127,
      users: 234,
      cost: '$9,420'
    }
  }
];

export default function CloudManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cloud Management</h1>
        <p className="text-muted-foreground">
          Unified management interface for all your cloud providers and services
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">572</div>
            <p className="text-xs text-muted-foreground">
              Across all cloud providers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,526</div>
            <p className="text-xs text-muted-foreground">
              Licensed across all platforms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$40,510</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cloud Providers */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Cloud Providers</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cloudProviders.map((provider) => (
            <Card key={provider.id} className={`transition-all hover:shadow-lg ${provider.color}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {provider.icon}
                  <div>
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <CardDescription>{provider.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Services */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Services</h4>
                  <div className="flex flex-wrap gap-1">
                    {provider.services.slice(0, 4).map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 text-xs bg-background/50 rounded-md"
                      >
                        {service}
                      </span>
                    ))}
                    {provider.services.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-background/50 rounded-md">
                        +{provider.services.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-semibold">{provider.stats.resources}</div>
                    <div className="text-xs text-muted-foreground">Resources</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{provider.stats.users}</div>
                    <div className="text-xs text-muted-foreground">Users</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{provider.stats.cost}</div>
                    <div className="text-xs text-muted-foreground">Monthly</div>
                  </div>
                </div>

                {/* Action Button */}
                <Button asChild className="w-full">
                  <Link href={provider.href}>
                    Manage {provider.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
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
                <Settings className="h-5 w-5" />
                <span className="font-medium">Global Settings</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Configure cross-cloud policies
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">User Management</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Manage users across platforms
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">Cost Analytics</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Cross-cloud cost analysis
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Automation</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Automated cloud operations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
