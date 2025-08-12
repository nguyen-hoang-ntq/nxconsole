'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudIcon } from '@/components/icons/cloud-icons';
import Link from 'next/link';
import { ArrowRight, Server, Database, Code, DollarSign, Activity, Monitor, HardDrive, Network } from 'lucide-react';

const awsServices = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    description: 'Virtual servers in the cloud',
    href: '/dashboard/cloud-management/amazon/aws/ec2',
    icon: <CloudIcon provider="amazon" service="ec2" size={24} />,
    stats: {
      instances: 45,
      running: 38,
      cost: '$4,230'
    }
  },
  {
    id: 's3',
    name: 'Amazon S3',
    description: 'Object storage service',
    href: '/dashboard/cloud-management/amazon/aws/s3',
    icon: <CloudIcon provider="amazon" service="s3" size={24} />,
    stats: {
      buckets: 23,
      objects: '145k',
      cost: '$1,890'
    }
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    description: 'Serverless compute service',
    href: '/dashboard/cloud-management/amazon/aws/lambda',
    icon: <CloudIcon provider="amazon" service="lambda" size={24} />,
    stats: {
      functions: 67,
      executions: '2.3M',
      cost: '$456'
    }
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    description: 'Managed relational database service',
    href: '/dashboard/cloud-management/amazon/aws/rds',
    icon: <CloudIcon provider="amazon" service="rds" size={24} />,
    stats: {
      instances: 12,
      databases: 8,
      cost: '$2,340'
    }
  }
];

export default function AmazonPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CloudIcon provider="amazon" size={40} />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Amazon Web Services</h1>
          <p className="text-muted-foreground">
            Manage your AWS infrastructure and services
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">289</div>
            <p className="text-xs text-muted-foreground">
              Across 6 regions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running Instances</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">
              EC2 instances active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,750</div>
            <p className="text-xs text-muted-foreground">
              +8.5% from last month
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

      {/* AWS Services */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Core AWS Services</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {awsServices.map((service) => (
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
                <Server className="h-8 w-8 text-orange-500" />
                <div>
                  <CardTitle className="text-lg">Compute</CardTitle>
                  <CardDescription>Virtual servers and containers</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>EC2 Instances:</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Lambda Functions:</span>
                  <span className="font-medium">67</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Cost:</span>
                  <span className="font-medium">$4,686</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard/cloud-management/amazon/aws">
                  View Compute Services
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Database className="h-8 w-8 text-orange-500" />
                <div>
                  <CardTitle className="text-lg">Storage & Databases</CardTitle>
                  <CardDescription>Data storage and database services</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>S3 Buckets:</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span>RDS Instances:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Cost:</span>
                  <span className="font-medium">$4,230</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard/cloud-management/amazon/aws">
                  View Storage Services
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code className="h-8 w-8 text-orange-500" />
                <div>
                  <CardTitle className="text-lg">Developer Tools</CardTitle>
                  <CardDescription>DevOps and development services</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>CodePipelines:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span>CloudFormation:</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Cost:</span>
                  <span className="font-medium">$834</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard/cloud-management/amazon/aws">
                  View Developer Tools
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
                <span className="font-medium">Launch Instance</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Create new EC2 instance
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <span className="font-medium">Create Bucket</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                New S3 storage bucket
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-medium">Cost Explorer</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Analyze AWS spending
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <span className="font-medium">CloudWatch</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor and alerts
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
            <CardDescription>Monitor and manage your AWS resources</CardDescription>
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
              <Link href="/dashboard/performance-monitoring/aws">
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
