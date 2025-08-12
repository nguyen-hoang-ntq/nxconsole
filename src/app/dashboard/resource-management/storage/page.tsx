'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricCard } from '@/components/dashboard/metric-card';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';
import { 
  Plus, 
  HardDrive, 
  Activity, 
  Database,
  Archive,
  FileText,
  Folder,
  BarChart3,
  Settings,
  Upload,
  Download,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock storage resources data
const storageResources = [
  {
    id: 's3-bucket-prod-data',
    name: 'production-data-bucket',
    type: 'S3 Bucket',
    platform: 'amazon',
    status: 'active',
    region: 'us-east-1',
    size_gb: 2847.5,
    objects: 458920,
    requests_monthly: 2850000,
    storage_class: 'Standard',
    cost_monthly: 89.45,
    encryption: true,
    versioning: true
  },
  {
    id: 'rds-mysql-prod',
    name: 'production-database',
    type: 'RDS MySQL',
    platform: 'amazon',
    status: 'active',
    region: 'us-east-1',
    size_gb: 500,
    objects: 0,
    requests_monthly: 0,
    storage_class: 'gp3',
    cost_monthly: 245.80,
    encryption: true,
    versioning: false
  },
  {
    id: 'azure-blob-media',
    name: 'media-storage-account',
    type: 'Blob Storage',
    platform: 'microsoft',
    status: 'active',
    region: 'East US',
    size_gb: 1234.7,
    objects: 124580,
    requests_monthly: 1450000,
    storage_class: 'Hot',
    cost_monthly: 56.75,
    encryption: true,
    versioning: true
  },
  {
    id: 'cosmosdb-docs',
    name: 'document-database',
    type: 'Cosmos DB',
    platform: 'microsoft',
    status: 'active',
    region: 'West Europe',
    size_gb: 156.8,
    objects: 0,
    requests_monthly: 0,
    storage_class: 'Standard',
    cost_monthly: 189.30,
    encryption: true,
    versioning: false
  },
  {
    id: 'gcs-backup-bucket',
    name: 'backup-storage-bucket',
    type: 'Cloud Storage',
    platform: 'google',
    status: 'active',
    region: 'us-central1',
    size_gb: 5678.9,
    objects: 892340,
    requests_monthly: 892000,
    storage_class: 'Nearline',
    cost_monthly: 125.60,
    encryption: true,
    versioning: true
  },
  {
    id: 'bigquery-analytics',
    name: 'analytics-dataset',
    type: 'BigQuery',
    platform: 'google',
    status: 'active',
    region: 'us-central1',
    size_gb: 892.3,
    objects: 0,
    requests_monthly: 0,
    storage_class: 'Standard',
    cost_monthly: 178.95,
    encryption: true,
    versioning: false
  }
];

const storageUsageTrends = [
  { date: '2024-08-01', used: 8.2, total: 12.5, objects: 1200000 },
  { date: '2024-08-08', used: 8.7, total: 12.5, objects: 1245000 },
  { date: '2024-08-15', used: 9.1, total: 15.0, objects: 1289000 },
  { date: '2024-08-22', used: 9.8, total: 15.0, objects: 1334000 },
  { date: '2024-08-29', used: 10.2, total: 15.0, objects: 1378000 },
  { date: '2024-09-05', used: 10.9, total: 15.0, objects: 1425000 }
];

const storageTypeDistribution = [
  { name: 'Object Storage', value: 4182, color: '#8884d8' },
  { name: 'Databases', value: 1549, color: '#82ca9d' },
  { name: 'File Storage', value: 892, color: '#ffc658' },
  { name: 'Archive', value: 567, color: '#ff7c7c' },
  { name: 'Block Storage', value: 234, color: '#8dd1e1' }
];

const costByProvider = [
  { provider: 'AWS', s3: 89, rds: 246, efs: 45, glacier: 23 },
  { provider: 'Azure', blob: 57, cosmosdb: 189, files: 38, archive: 15 },
  { provider: 'GCP', storage: 126, bigquery: 179, filestore: 42, archive: 18 }
];

const performanceMetrics = [
  { 
    metric: 'Read IOPS', 
    aws: 2850, 
    azure: 1950, 
    gcp: 2100,
    trend: 'up'
  },
  { 
    metric: 'Write IOPS', 
    aws: 1250, 
    azure: 980, 
    gcp: 1150,
    trend: 'up'
  },
  { 
    metric: 'Throughput (MB/s)', 
    aws: 125, 
    azure: 89, 
    gcp: 108,
    trend: 'stable'
  },
  { 
    metric: 'Latency (ms)', 
    aws: 45, 
    azure: 52, 
    gcp: 38,
    trend: 'down'
  }
];

const backupStatus = [
  { resource: 'production-database', lastBackup: '2 hours ago', status: 'completed', size: '500 GB' },
  { resource: 'media-storage-account', lastBackup: '6 hours ago', status: 'completed', size: '1.2 TB' },
  { resource: 'analytics-dataset', lastBackup: '1 hour ago', status: 'completed', size: '892 GB' },
  { resource: 'backup-storage-bucket', lastBackup: '24 hours ago', status: 'completed', size: '5.7 TB' }
];

export default function StoragePage() {
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const totalStorage = storageResources.reduce((sum, r) => sum + r.size_gb, 0);
  const totalObjects = storageResources.reduce((sum, r) => sum + r.objects, 0);
  const totalCost = storageResources.reduce((sum, r) => sum + r.cost_monthly, 0);
  const encryptedResources = storageResources.filter(r => r.encryption).length;

  const handleResourceSelect = (resourceId: string) => {
    setSelectedResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Storage Services</h1>
          <p className="text-muted-foreground">
            Manage object storage, databases, file systems, and backup solutions
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
            Create Storage
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Storage"
          value={`${(totalStorage / 1024).toFixed(1)} TB`}
          change={{
            value: 15.2,
            type: 'increase',
            period: 'last 30 days'
          }}
          trend="up"
          icon={HardDrive}
        />
        <MetricCard
          title="Total Objects"
          value={`${(totalObjects / 1000000).toFixed(1)}M`}
          change={{
            value: 8.7,
            type: 'increase',
            period: 'last 30 days'
          }}
          trend="up"
          icon={FileText}
        />
        <MetricCard
          title="Monthly Cost"
          value={`$${totalCost.toFixed(0)}`}
          change={{
            value: 5.3,
            type: 'decrease',
            period: 'vs last month'
          }}
          trend="down"
          icon={BarChart3}
        />
        <MetricCard
          title="Encrypted"
          value={`${encryptedResources}/${storageResources.length}`}
          change={{
            value: 100,
            type: 'increase',
            period: 'compliance'
          }}
          trend="up"
          icon={Shield}
        />
      </div>

      {/* Storage Usage Trends and Type Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Storage Usage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={storageUsageTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backdropFilter: 'none'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="used" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name="Used (TB)" />
                <Area type="monotone" dataKey="total" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="Total (TB)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Storage Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={storageTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {storageTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics and Cost by Provider */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <TrendingUp className={`h-4 w-4 ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 border rounded">
                      <p className="text-lg font-bold text-orange-600">{metric.aws}</p>
                      <p className="text-xs text-muted-foreground">AWS</p>
                    </div>
                    <div className="p-2 border rounded">
                      <p className="text-lg font-bold text-blue-600">{metric.azure}</p>
                      <p className="text-xs text-muted-foreground">Azure</p>
                    </div>
                    <div className="p-2 border rounded">
                      <p className="text-lg font-bold text-green-600">{metric.gcp}</p>
                      <p className="text-xs text-muted-foreground">GCP</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Cost by Provider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={costByProvider}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="provider" 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backdropFilter: 'none'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="s3" stackId="a" fill="#8884d8" name="Object Storage" />
                <Bar dataKey="rds" stackId="a" fill="#82ca9d" name="Databases" />
                <Bar dataKey="efs" stackId="a" fill="#ffc658" name="File Storage" />
                <Bar dataKey="glacier" stackId="a" fill="#ff7c7c" name="Archive" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Backup Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Backup Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {backupStatus.map((backup, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <h3 className="font-medium text-sm mb-2">{backup.resource}</h3>
                <Badge 
                  variant={backup.status === 'completed' ? 'default' : 'secondary'}
                  className="mb-2"
                >
                  {backup.status}
                </Badge>
                <p className="text-sm text-muted-foreground">{backup.lastBackup}</p>
                <p className="text-xs text-muted-foreground">{backup.size}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Storage Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {storageResources.map((resource, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg transition-colors ${
                  selectedResources.includes(resource.id) ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedResources.includes(resource.id)}
                      onChange={() => handleResourceSelect(resource.id)}
                      className="h-4 w-4"
                    />
                    <CloudIcon 
                      provider={resource.platform as 'amazon' | 'microsoft' | 'google'} 
                      service={resource.type.toLowerCase().replace(' ', '-')} 
                      size={32} 
                    />
                    <div>
                      <h3 className="font-medium">{resource.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {resource.type} • {resource.storage_class} • {resource.region}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex gap-2">
                      <Badge 
                        variant={resource.status === 'active' ? 'default' : 'secondary'}
                      >
                        {resource.status}
                      </Badge>
                      {resource.encryption && (
                        <Badge variant="outline">
                          <Shield className="h-3 w-3 mr-1" />
                          Encrypted
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${resource.cost_monthly.toFixed(2)}/mo</p>
                      <p className="text-sm text-muted-foreground">
                        {resource.size_gb.toFixed(1)} GB
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-4 mt-4">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Size: {resource.size_gb > 1024 ? 
                        `${(resource.size_gb / 1024).toFixed(1)} TB` : 
                        `${resource.size_gb.toFixed(1)} GB`
                      }
                    </span>
                  </div>
                  
                  {resource.objects > 0 && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Objects: {resource.objects.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.storage_class}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {resource.versioning && (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Versioned
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Bridges */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Management</CardTitle>
          <CardDescription>Manage and provision storage resources across cloud platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/cloud-management/amazon">
              <Button variant="outline" className="h-16 flex-col w-full">
                <CloudIcon provider="amazon" service="aws" size={20} />
                <span className="text-xs mt-1">Manage AWS</span>
              </Button>
            </Link>
            <Link href="/dashboard/cloud-management/microsoft">
              <Button variant="outline" className="h-16 flex-col w-full">
                <CloudIcon provider="microsoft" service="azure" size={20} />
                <span className="text-xs mt-1">Manage Azure</span>
              </Button>
            </Link>
            <Link href="/dashboard/cloud-management/google">
              <Button variant="outline" className="h-16 flex-col w-full">
                <CloudIcon provider="google" service="gcp" size={20} />
                <span className="text-xs mt-1">Manage GCP</span>
              </Button>
            </Link>
            <Button variant="outline" className="h-16 flex-col">
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-xs">New Storage</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightsWidget pillar="resource-management" />
    </div>
  );
}
