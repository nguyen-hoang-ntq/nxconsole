'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudIcon } from '@/components/icons/cloud-icons';
import Link from 'next/link';
import { ArrowRight, Server, Database, Users, DollarSign, Activity, Monitor, HardDrive, Network } from 'lucide-react';

const googleServices = [
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    description: 'Cloud computing and infrastructure services',
    href: '/dashboard/cloud-management/google/gcp',
    icon: <CloudIcon provider="google" service="gcp" size={32} />,
    stats: {
      projects: 12,
      resources: 127,
      cost: '$7,650'
    },
    status: 'healthy'
  },
  {
    id: 'admin',
    name: 'Google Workspace',
    description: 'Productivity and collaboration platform',
    href: '/dashboard/cloud-management/google/admin',
    icon: <CloudIcon provider="google" service="admin" size={32} />,
    stats: {
      users: 234,
      storage: '1.2TB',
      cost: '$1,770'
    },
    status: 'healthy'
  }
];

const gcpServices = [
  {
    id: 'compute',
    name: 'Compute Engine',
    description: 'Virtual machines running in Google\'s data centers',
    href: '/dashboard/cloud-management/google/gcp/compute',
    icon: <CloudIcon provider="google" service="compute" size={24} />,
    stats: {
      instances: 23,
      zones: 4,
      cost: '$3,240'
    }
  },
  {
    id: 'storage',
    name: 'Cloud Storage',
    description: 'Object storage for companies of all sizes',
    href: '/dashboard/cloud-management/google/gcp/storage',
    icon: <CloudIcon provider="google" service="storage" size={24} />,
    stats: {
      buckets: 15,
      objects: '89k',
      cost: '$1,890'
    }
  }
];

export default function GooglePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CloudIcon provider="google" size={40} />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Google Services</h1>
          <p className="text-muted-foreground">
            Manage your Google Cloud Platform and Workspace environment
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GCP Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              Across 12 projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workspace Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              Active workspace users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$9,420</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Health</CardTitle>
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
          {googleServices.map((service) => (
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

      {/* GCP Services */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Google Cloud Platform Services</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {gcpServices.map((service) => (
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

      {/* Service Categories */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Service Categories</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Server className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle className="text-lg">Compute & Storage</CardTitle>
                  <CardDescription>Virtual machines and storage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>VM Instances:</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage Buckets:</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Cost:</span>
                  <span className="font-medium">$5,130</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard/cloud-management/google/gcp">
                  View Services
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Database className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle className="text-lg">Data & Analytics</CardTitle>
                  <CardDescription>BigQuery and data services</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>BigQuery Datasets:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Processed:</span>
                  <span className="font-medium">2.1TB</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Cost:</span>
                  <span className="font-medium">$2,520</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard/cloud-management/google/gcp">
                  View Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle className="text-lg">Workspace</CardTitle>
                  <CardDescription>Productivity and collaboration</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Active Users:</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage Used:</span>
                  <span className="font-medium">1.2TB</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Cost:</span>
                  <span className="font-medium">$1,770</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard/cloud-management/google/admin">
                  View Workspace
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                <span className="font-medium">Create VM</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Launch new Compute Engine instance
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <span className="font-medium">BigQuery</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Analyze data with BigQuery
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
                Manage Workspace users
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-medium">Billing</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor costs and billing
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
            <CardDescription>Monitor and manage your GCP and Workspace resources</CardDescription>
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
              <Link href="/dashboard/performance-monitoring/gcp">
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
