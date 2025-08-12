'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricCard } from '@/components/dashboard/metric-card';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { 
  Plus, 
  Server, 
  Activity, 
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Play,
  Pause,
  Square,
  RotateCcw,
  Settings,
  BarChart3,
  Zap,
  Container,
  Globe
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';

// Mock compute resources data
const computeResources = [
  {
    id: 'i-1234567890abcdef0',
    name: 'web-server-prod-01',
    type: 'EC2 Instance',
    platform: 'amazon',
    instance_type: 't3.large',
    status: 'running',
    cpu_usage: 65,
    memory_usage: 78,
    disk_usage: 45,
    network_io: 125,
    uptime: '15 days',
    cost_monthly: 89.50,
    region: 'us-east-1'
  },
  {
    id: 'vm-8765432109fedcba0',
    name: 'app-server-staging',
    type: 'Virtual Machine',
    platform: 'microsoft',
    instance_type: 'Standard_D2s_v3',
    status: 'running',
    cpu_usage: 42,
    memory_usage: 56,
    disk_usage: 67,
    network_io: 89,
    uptime: '8 days',
    cost_monthly: 125.30,
    region: 'East US'
  },
  {
    id: 'gce-instance-123456',
    name: 'api-backend-prod',
    type: 'Compute Engine',
    platform: 'google',
    instance_type: 'n2-standard-2',
    status: 'running',
    cpu_usage: 38,
    memory_usage: 62,
    disk_usage: 23,
    network_io: 167,
    uptime: '22 days',
    cost_monthly: 95.75,
    region: 'us-central1'
  },
  {
    id: 'func-azure-handler',
    name: 'payment-processor',
    type: 'Azure Functions',
    platform: 'microsoft',
    instance_type: 'Consumption Plan',
    status: 'running',
    cpu_usage: 15,
    memory_usage: 32,
    disk_usage: 8,
    network_io: 45,
    uptime: '30 days',
    cost_monthly: 12.45,
    region: 'West Europe'
  },
  {
    id: 'lambda-aws-process',
    name: 'image-resizer',
    type: 'AWS Lambda',
    platform: 'amazon',
    instance_type: '512MB',
    status: 'running',
    cpu_usage: 8,
    memory_usage: 24,
    disk_usage: 5,
    network_io: 23,
    uptime: '45 days',
    cost_monthly: 8.75,
    region: 'us-west-2'
  },
  {
    id: 'container-app-prod',
    name: 'microservice-api',
    type: 'Container App',
    platform: 'microsoft',
    instance_type: '1 vCPU, 2GB',
    status: 'running',
    cpu_usage: 55,
    memory_usage: 68,
    disk_usage: 34,
    network_io: 198,
    uptime: '12 days',
    cost_monthly: 67.20,
    region: 'North Europe'
  }
];

const cpuUsageChart = [
  { time: '00:00', aws: 65, azure: 42, gcp: 38 },
  { time: '04:00', aws: 68, azure: 45, gcp: 41 },
  { time: '08:00', aws: 72, azure: 52, gcp: 45 },
  { time: '12:00', aws: 78, azure: 58, gcp: 52 },
  { time: '16:00', aws: 71, azure: 48, gcp: 47 },
  { time: '20:00', aws: 66, azure: 44, gcp: 40 }
];

const computeTypeDistribution = [
  { type: 'Virtual Machines', count: 45, cost: 4250 },
  { type: 'Functions', count: 28, cost: 890 },
  { type: 'Containers', count: 32, cost: 2340 },
  { type: 'App Services', count: 18, cost: 1680 }
];

const performanceMetrics = [
  { metric: 'Average CPU', value: '52%', change: '+3.2%', trend: 'up' },
  { metric: 'Average Memory', value: '64%', change: '-1.8%', trend: 'down' },
  { metric: 'Network I/O', value: '125 MB/s', change: '+8.4%', trend: 'up' },
  { metric: 'Response Time', value: '145ms', change: '-12.3%', trend: 'down' }
];

export default function ComputePage() {
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const runningInstances = computeResources.filter(r => r.status === 'running').length;
  const totalCost = computeResources.reduce((sum, r) => sum + r.cost_monthly, 0);
  const avgCpuUsage = Math.round(computeResources.reduce((sum, r) => sum + r.cpu_usage, 0) / computeResources.length);

  const handleResourceSelect = (resourceId: string) => {
    setSelectedResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleBulkAction = (action: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSelectedResources([]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compute Services</h1>
          <p className="text-muted-foreground">
            Manage virtual machines, containers, and serverless functions across all cloud providers
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
            Create Instance
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Running Instances"
          value={runningInstances.toString()}
          change={{
            value: 4.2,
            type: 'increase',
            period: 'last 24h'
          }}
          trend="up"
          icon={Server}
        />
        <MetricCard
          title="Total Monthly Cost"
          value={`$${totalCost.toFixed(0)}`}
          change={{
            value: 8.7,
            type: 'decrease',
            period: 'vs last month'
          }}
          trend="down"
          icon={BarChart3}
        />
        <MetricCard
          title="Average CPU Usage"
          value={`${avgCpuUsage}%`}
          change={{
            value: 2.1,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Cpu}
        />
        <MetricCard
          title="Health Score"
          value="94%"
          change={{
            value: 1.5,
            type: 'increase',
            period: 'last 24h'
          }}
          trend="up"
          icon={Activity}
        />
      </div>

      {/* CPU Usage Trends, Compute Distribution & AI Insights */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              CPU Usage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cpuUsageChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
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
                <Line type="monotone" dataKey="aws" stroke="#ff9900" strokeWidth={2} name="AWS" />
                <Line type="monotone" dataKey="azure" stroke="#0078d4" strokeWidth={2} name="Azure" />
                <Line type="monotone" dataKey="gcp" stroke="#4285f4" strokeWidth={2} name="GCP" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Container className="h-5 w-5" />
              Compute Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={computeTypeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="type" 
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
                <Bar dataKey="count" fill="#8884d8" name="Count" />
                <Bar dataKey="cost" fill="#82ca9d" name="Cost ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Compute Optimization Insights */}
        <AIInsightsWidget 
          pillar="resource-management"
          maxInsights={3}
          showRefresh={true}
        />
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground">{metric.metric}</h3>
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className={`flex items-center justify-center gap-1 mt-2 ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="font-medium text-sm">{metric.change}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedResources.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">
                {selectedResources.length} resource(s) selected
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('start')}
                  disabled={loading}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('stop')}
                  disabled={loading}
                >
                  <Pause className="h-4 w-4 mr-1" />
                  Stop
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('restart')}
                  disabled={loading}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Restart
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleBulkAction('terminate')}
                  disabled={loading}
                >
                  <Square className="h-4 w-4 mr-1" />
                  Terminate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compute Resources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Compute Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {computeResources.map((resource, index) => (
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
                        {resource.type} • {resource.instance_type} • {resource.region}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge 
                      variant={resource.status === 'running' ? 'default' : 'secondary'}
                    >
                      {resource.status}
                    </Badge>
                    <div className="text-right">
                      <p className="font-medium">${resource.cost_monthly}/mo</p>
                      <p className="text-sm text-muted-foreground">Uptime: {resource.uptime}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">CPU: {resource.cpu_usage}%</span>
                    <div className="flex-1 bg-muted rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-blue-500"
                        style={{ width: `${resource.cpu_usage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MemoryStick className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">RAM: {resource.memory_usage}%</span>
                    <div className="flex-1 bg-muted rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-green-500"
                        style={{ width: `${resource.memory_usage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Disk: {resource.disk_usage}%</span>
                    <div className="flex-1 bg-muted rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-yellow-500"
                        style={{ width: `${resource.disk_usage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Network className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">I/O: {resource.network_io} MB/s</span>
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
          <CardTitle>Compute Management</CardTitle>
          <CardDescription>Manage and provision compute resources across cloud platforms</CardDescription>
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
              <span className="text-xs">New Instance</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightsWidget pillar="resource-management" />
    </div>
  );
}
