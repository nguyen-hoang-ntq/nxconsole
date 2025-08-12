'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CloudIcon } from '@/components/icons/cloud-icons';
import Link from 'next/link';
import { 
  ArrowRight, 
  Server, 
  Database, 
  Shield, 
  DollarSign, 
  Users, 
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Cloud provider data
const cloudProviders = {
  azure: {
    id: 'azure',
    name: 'Microsoft Azure',
    shortName: 'Azure',
    color: 'bg-blue-50 border-blue-200',
    accentColor: 'text-blue-600',
    href: '/dashboard/cloud-providers/microsoft',
    icon: <CloudIcon provider="microsoft" size={24} />,
    status: 'active',
    services: [
      { name: 'Virtual Machines', count: 45, status: 'healthy' },
      { name: 'App Services', count: 12, status: 'healthy' },
      { name: 'SQL Database', count: 8, status: 'warning' },
      { name: 'Storage Accounts', count: 23, status: 'healthy' },
      { name: 'Key Vault', count: 5, status: 'healthy' },
      { name: 'Logic Apps', count: 15, status: 'healthy' }
    ],
    stats: {
      resources: 156,
      activeUsers: 1247,
      monthlyCost: 12340,
      utilizationRate: 78,
      healthScore: 92
    },
    recentActivity: [
      { action: 'VM Scaled Up', resource: 'webapp-prod-vm', time: '2 hours ago' },
      { action: 'Database Backup', resource: 'main-sql-db', time: '4 hours ago' },
      { action: 'SSL Certificate Renewed', resource: 'api.company.com', time: '1 day ago' }
    ],
    alerts: [
      { type: 'warning', message: 'SQL Database DTU usage above 80%', severity: 'medium' },
      { type: 'info', message: '3 VMs scheduled for maintenance', severity: 'low' }
    ]
  },
  aws: {
    id: 'aws',
    name: 'Amazon Web Services',
    shortName: 'AWS',
    color: 'bg-orange-50 border-orange-200',
    accentColor: 'text-orange-600',
    href: '/dashboard/cloud-providers/amazon',
    icon: <CloudIcon provider="amazon" size={24} />,
    status: 'active',
    services: [
      { name: 'EC2 Instances', count: 67, status: 'healthy' },
      { name: 'S3 Buckets', count: 34, status: 'healthy' },
      { name: 'RDS Instances', count: 12, status: 'healthy' },
      { name: 'Lambda Functions', count: 89, status: 'warning' },
      { name: 'CloudFormation', count: 15, status: 'healthy' },
      { name: 'ELB', count: 8, status: 'healthy' }
    ],
    stats: {
      resources: 289,
      activeUsers: 45,
      monthlyCost: 18750,
      utilizationRate: 65,
      healthScore: 88
    },
    recentActivity: [
      { action: 'Auto Scaling Triggered', resource: 'web-tier-asg', time: '1 hour ago' },
      { action: 'Lambda Function Updated', resource: 'data-processor', time: '3 hours ago' },
      { action: 'S3 Bucket Policy Modified', resource: 'backup-storage', time: '6 hours ago' }
    ],
    alerts: [
      { type: 'warning', message: 'Lambda function error rate increased', severity: 'medium' },
      { type: 'error', message: 'EC2 instance i-1234567 unreachable', severity: 'high' }
    ]
  },
  gcp: {
    id: 'gcp',
    name: 'Google Cloud Platform',
    shortName: 'GCP',
    color: 'bg-green-50 border-green-200',
    accentColor: 'text-green-600',
    href: '/dashboard/cloud-providers/google',
    icon: <CloudIcon provider="google" size={24} />,
    status: 'active',
    services: [
      { name: 'Compute Engine', count: 28, status: 'healthy' },
      { name: 'Cloud Storage', count: 19, status: 'healthy' },
      { name: 'Cloud SQL', count: 6, status: 'healthy' },
      { name: 'Cloud Functions', count: 42, status: 'healthy' },
      { name: 'BigQuery', count: 8, status: 'warning' },
      { name: 'Cloud Run', count: 14, status: 'healthy' }
    ],
    stats: {
      resources: 127,
      activeUsers: 234,
      monthlyCost: 9420,
      utilizationRate: 73,
      healthScore: 95
    },
    recentActivity: [
      { action: 'BigQuery Job Completed', resource: 'analytics-dataset', time: '30 minutes ago' },
      { action: 'Cloud Function Deployed', resource: 'image-processor', time: '2 hours ago' },
      { action: 'VM Instance Stopped', resource: 'dev-environment', time: '5 hours ago' }
    ],
    alerts: [
      { type: 'info', message: 'BigQuery slot usage optimization available', severity: 'low' },
      { type: 'success', message: 'All systems operational', severity: 'low' }
    ]
  }
};

// Calculate totals
const totalStats = {
  resources: Object.values(cloudProviders).reduce((sum, provider) => sum + provider.stats.resources, 0),
  activeUsers: Object.values(cloudProviders).reduce((sum, provider) => sum + provider.stats.activeUsers, 0),
  monthlyCost: Object.values(cloudProviders).reduce((sum, provider) => sum + provider.stats.monthlyCost, 0),
  avgUtilization: Math.round(Object.values(cloudProviders).reduce((sum, provider) => sum + provider.stats.utilizationRate, 0) / 3),
  avgHealthScore: Math.round(Object.values(cloudProviders).reduce((sum, provider) => sum + provider.stats.healthScore, 0) / 3)
};

function getStatusColor(status: string) {
  switch (status) {
    case 'healthy': return 'text-green-600';
    case 'warning': return 'text-yellow-600';
    case 'error': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

function getAlertIcon(type: string) {
  switch (type) {
    case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
    default: return <Activity className="h-4 w-4 text-blue-500" />;
  }
}

export default function CloudProvidersPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cloud Providers Overview</h1>
        <p className="text-muted-foreground">
          Manage and monitor your cloud infrastructure across Azure, AWS, and Google Cloud Platform
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.resources.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all providers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Licensed users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalStats.monthlyCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Combined spend
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.avgUtilization}%</div>
            <p className="text-xs text-muted-foreground">
              Resource efficiency
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.avgHealthScore}%</div>
            <p className="text-xs text-muted-foreground">
              Overall health
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Provider Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="azure" className="flex items-center gap-2">
            <CloudIcon provider="microsoft" size={16} />
            Azure
          </TabsTrigger>
          <TabsTrigger value="aws" className="flex items-center gap-2">
            <CloudIcon provider="amazon" size={16} />
            AWS
          </TabsTrigger>
          <TabsTrigger value="gcp" className="flex items-center gap-2">
            <CloudIcon provider="google" size={16} />
            GCP
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.values(cloudProviders).map((provider) => (
              <Card key={provider.id} className={`transition-all hover:shadow-lg ${provider.color}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {provider.icon}
                      <div>
                        <CardTitle className="text-lg">{provider.shortName}</CardTitle>
                        <CardDescription>{provider.name}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={provider.status === 'active' ? 'default' : 'secondary'}>
                      {provider.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold">{provider.stats.resources}</div>
                      <div className="text-xs text-muted-foreground">Resources</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">${provider.stats.monthlyCost.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Monthly</div>
                    </div>
                  </div>

                  {/* Health Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health Score</span>
                      <span className="font-medium">{provider.stats.healthScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          provider.stats.healthScore >= 90 ? 'bg-green-500' :
                          provider.stats.healthScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${provider.stats.healthScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Top Services */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Top Services</h4>
                    <div className="space-y-1">
                      {provider.services.slice(0, 3).map((service) => (
                        <div key={service.name} className="flex items-center justify-between text-sm">
                          <span>{service.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{service.count}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              service.status === 'healthy' ? 'bg-green-500' :
                              service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={provider.href}>
                      Manage {provider.shortName}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Individual Provider Tabs */}
        {Object.entries(cloudProviders).map(([key, provider]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resources</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{provider.stats.resources}</div>
                  <p className="text-xs text-muted-foreground">
                    Active resources
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${provider.stats.monthlyCost.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Current billing
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilization</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{provider.stats.utilizationRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Resource efficiency
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{provider.stats.healthScore}%</div>
                  <p className="text-xs text-muted-foreground">
                    System health
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Services & Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {provider.services.map((service) => (
                      <div key={service.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            service.status === 'healthy' ? 'bg-green-500' :
                            service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{service.count}</Badge>
                          <span className={`text-sm ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full mt-4" variant="outline">
                    <Link href={provider.href}>
                      View All Services
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity & Alerts */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {provider.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{activity.action}</div>
                            <div className="text-sm text-muted-foreground">{activity.resource}</div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Alerts & Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {provider.alerts.map((alert, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <div className="text-sm font-medium">{alert.message}</div>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {alert.severity}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
