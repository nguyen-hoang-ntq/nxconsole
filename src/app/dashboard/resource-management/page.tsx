'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricCard } from '@/components/dashboard/metric-card';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { ServiceCategoryIcon } from '@/components/icons/service-category-icons';
import { pillarTailwindClasses } from '@/lib/pillar-colors';
import { 
  Plus, 
  Server, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  Cpu,
  Network,
  HardDrive,
  Layers,
  ArrowRight,
  Settings,
  Zap
} from 'lucide-react';
import { ResourceInventory } from '@/components/resources/resource-inventory';
import { mockResources } from '@/lib/mock-data';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';
import Link from 'next/link';

// Mock data for service categories
const serviceCategories = [
  {
    id: 'compute',
    name: 'Compute',
    icon: Cpu,
    description: 'Virtual machines, containers, and serverless functions',
    resourceCount: 142,
    runningCount: 128,
    href: '/dashboard/resource-management/compute',
    services: ['EC2', 'Virtual Machines', 'Compute Engine', 'App Service', 'Functions', 'Containers']
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: Network,
    description: 'Load balancers, VPCs, CDNs, and DNS services',
    resourceCount: 89,
    runningCount: 86,
    href: '/dashboard/resource-management/networking',
    services: ['VPC', 'Load Balancers', 'CDN', 'DNS', 'API Gateway', 'VPN']
  },
  {
    id: 'storage',
    name: 'Storage',
    icon: HardDrive,
    description: 'Object storage, databases, and file systems',
    resourceCount: 67,
    runningCount: 64,
    href: '/dashboard/resource-management/storage',
    services: ['S3', 'Blob Storage', 'Cloud SQL', 'CosmosDB', 'RDS', 'BigQuery']
  },
  {
    id: 'otherServices',
    name: 'Other Services',
    icon: Layers,
    description: 'Queues, notifications, analytics, and specialized services',
    resourceCount: 45,
    runningCount: 43,
    href: '/dashboard/resource-management/other-services',
    services: ['SQS', 'Service Bus', 'Pub/Sub', 'Analytics', 'IoT', 'AI/ML']
  }
];

const resourceHealthMetrics = [
  { platform: 'aws', healthy: 67, total: 72, utilization: 78 },
  { platform: 'azure', healthy: 45, total: 48, utilization: 65 },
  { platform: 'gcp', healthy: 28, total: 30, utilization: 82 }
];

const recentActivities = [
  {
    type: 'created',
    resource: 'web-server-prod-03',
    service: 'EC2 Instance',
    platform: 'aws',
    timestamp: '2 minutes ago'
  },
  {
    type: 'updated',
    resource: 'database-cluster-primary',
    service: 'RDS',
    platform: 'aws',
    timestamp: '8 minutes ago'
  },
  {
    type: 'scaled',
    resource: 'app-service-backend',
    service: 'App Service',
    platform: 'azure',
    timestamp: '15 minutes ago'
  },
  {
    type: 'deleted',
    resource: 'test-vm-instance',
    service: 'Compute Engine',
    platform: 'gcp',
    timestamp: '23 minutes ago'
  }
];

export default function ResourceManagementPage() {
  const [loading, setLoading] = useState(false);

  // Calculate summary stats
  const totalResources = mockResources.length;
  const runningResources = mockResources.filter(r => r.status === 'running').length;
  const stoppedResources = mockResources.filter(r => r.status === 'stopped').length;
  const errorResources = mockResources.filter(r => r.status === 'error').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Resource Management</h1>
          <p className="text-muted-foreground">
            Unified view and management of your multi-cloud infrastructure resources
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Optimize
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Provision Resource
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Resources"
          value={totalResources.toString()}
          change={{
            value: 8.2,
            type: 'increase',
            period: 'last 24h'
          }}
          trend="up"
          icon={Server}
        />
        <MetricCard
          title="Healthy Resources"
          value={runningResources.toString()}
          change={{
            value: 2.1,
            type: 'increase',
            period: 'last 24h'
          }}
          trend="up"
          icon={Activity}
        />
        <MetricCard
          title="Average Utilization"
          value="75%"
          change={{
            value: 3.4,
            type: 'increase',
            period: 'last 24h'
          }}
          trend="up"
          icon={TrendingUp}
        />
        <MetricCard
          title="Cost This Month"
          value="$12,847"
          change={{
            value: 5.7,
            type: 'decrease',
            period: 'vs last month'
          }}
          trend="down"
          icon={BarChart3}
        />
      </div>

      {/* Service Categories & AI Insights */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ServiceCategoryIcon 
                    category={category.id as "compute" | "networking" | "storage" | "otherServices"} 
                    size={24} 
                    variant="outlined"
                  />
                  <span className="text-blue-700">{category.name}</span>
                </div>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  {category.resourceCount} resources
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{category.runningCount}</p>
                    <p className="text-xs text-muted-foreground">Healthy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{category.resourceCount}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {((category.runningCount / category.resourceCount) * 100).toFixed(1)}% Healthy
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-xs font-medium text-muted-foreground">Common Services:</p>
                <div className="flex flex-wrap gap-1">
                  {category.services.slice(0, 4).map((service, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {category.services.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.services.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              <Link href={category.href}>
                <Button variant="outline" className="w-full">
                  Manage {category.name}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}

        {/* AI Resource Optimization Insights */}
        <AIInsightsWidget 
          pillar="resource-management"
          maxInsights={4}
          showRefresh={true}
        />
      </div>

      {/* Multi-Cloud Resource Health */}
      <Card>
        <CardHeader>
          <CardTitle>Multi-Cloud Resource Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {resourceHealthMetrics.map((platform, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="flex items-center justify-center mb-3">
                  <CloudIcon 
                    provider={platform.platform as 'amazon' | 'microsoft' | 'google'} 
                    service="overview" 
                    size={40} 
                  />
                </div>
                <h3 className="font-medium mb-2 capitalize">{platform.platform.toUpperCase()}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{platform.healthy}</p>
                    <p className="text-muted-foreground">Healthy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{platform.total}</p>
                    <p className="text-muted-foreground">Total</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${(platform.healthy / platform.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {platform.utilization}% Average Utilization
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CloudIcon 
                      provider={activity.platform as 'amazon' | 'microsoft' | 'google'} 
                      service={activity.service.toLowerCase()} 
                      size={24} 
                    />
                    <div>
                      <p className="font-medium text-sm">{activity.resource}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.type} • {activity.service}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={
                        activity.type === 'created' ? 'default' :
                        activity.type === 'updated' ? 'secondary' :
                        activity.type === 'scaled' ? 'outline' : 'destructive'
                      }
                      className="mb-1"
                    >
                      {activity.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Create VM Instance
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Server className="h-4 w-4 mr-2" />
              Launch Database
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Network className="h-4 w-4 mr-2" />
              Setup Load Balancer
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <HardDrive className="h-4 w-4 mr-2" />
              Create Storage Bucket
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Resource Analytics
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Optimization Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Simplified Resource Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResourceInventory resources={mockResources.slice(0, 10)} loading={loading} />
          <div className="mt-4 text-center">
            <Link href="/dashboard/resources">
              <Button variant="outline">
                View All Resources
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
