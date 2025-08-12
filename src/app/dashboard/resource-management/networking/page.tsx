'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricCard } from '@/components/dashboard/metric-card';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';
import { 
  Plus, 
  Network, 
  Activity, 
  Globe,
  Shield,
  Zap,
  BarChart3,
  Settings,
  Router,
  Wifi,
  Link,
  ServerCog,
  TrendingUp,
  ArrowUpDown
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock networking resources data
const networkingResources = [
  {
    id: 'elb-123456789',
    name: 'production-load-balancer',
    type: 'Application Load Balancer',
    platform: 'amazon',
    status: 'active',
    health: 'healthy',
    region: 'us-east-1',
    targets: 5,
    healthy_targets: 5,
    requests_per_minute: 2850,
    data_processed_gb: 124.5,
    cost_monthly: 45.80
  },
  {
    id: 'ag-987654321',
    name: 'api-gateway-prod',
    type: 'API Gateway',
    platform: 'microsoft',
    status: 'active',
    health: 'healthy',
    region: 'East US',
    targets: 12,
    healthy_targets: 11,
    requests_per_minute: 1850,
    data_processed_gb: 89.2,
    cost_monthly: 68.90
  },
  {
    id: 'lb-gcp-456789',
    name: 'global-load-balancer',
    type: 'Cloud Load Balancing',
    platform: 'google',
    status: 'active',
    health: 'healthy',
    region: 'global',
    targets: 8,
    healthy_targets: 8,
    requests_per_minute: 3200,
    data_processed_gb: 156.8,
    cost_monthly: 52.30
  },
  {
    id: 'vpc-12345',
    name: 'production-vpc',
    type: 'VPC',
    platform: 'amazon',
    status: 'active',
    health: 'healthy',
    region: 'us-east-1',
    targets: 24,
    healthy_targets: 24,
    requests_per_minute: 0,
    data_processed_gb: 0,
    cost_monthly: 0
  },
  {
    id: 'cdn-azure-789',
    name: 'static-content-cdn',
    type: 'Azure CDN',
    platform: 'microsoft',
    status: 'active',
    health: 'healthy',
    region: 'global',
    targets: 15,
    healthy_targets: 15,
    requests_per_minute: 4500,
    data_processed_gb: 234.7,
    cost_monthly: 89.45
  },
  {
    id: 'dns-route53',
    name: 'company-dns',
    type: 'Route 53',
    platform: 'amazon',
    status: 'active',
    health: 'healthy',
    region: 'global',
    targets: 0,
    healthy_targets: 0,
    requests_per_minute: 12000,
    data_processed_gb: 0.5,
    cost_monthly: 12.50
  }
];

const networkTrafficData = [
  { time: '00:00', inbound: 125, outbound: 98, requests: 2800 },
  { time: '04:00', inbound: 89, outbound: 76, requests: 2100 },
  { time: '08:00', inbound: 156, outbound: 134, requests: 3400 },
  { time: '12:00', inbound: 178, outbound: 152, requests: 3900 },
  { time: '16:00', inbound: 145, outbound: 128, requests: 3200 },
  { time: '20:00', inbound: 167, outbound: 142, requests: 3600 }
];

const loadBalancerMetrics = [
  { name: 'production-lb', requests: 2850, latency: 45, errors: 12 },
  { name: 'api-gateway', requests: 1850, latency: 38, errors: 8 },
  { name: 'global-lb', requests: 3200, latency: 52, errors: 15 },
  { name: 'cdn-endpoint', requests: 4500, latency: 28, errors: 5 }
];

const networkSecurityData = [
  { metric: 'DDoS Attacks Blocked', value: '847', change: '+23%' },
  { metric: 'SSL/TLS Connections', value: '99.8%', change: '+0.2%' },
  { metric: 'Firewall Rules Active', value: '156', change: '+5' },
  { metric: 'WAF Requests Filtered', value: '2.3K', change: '+18%' }
];

const networkCostBreakdown = [
  { service: 'Load Balancers', cost: 167, percentage: 45 },
  { service: 'CDN', cost: 89, percentage: 24 },
  { service: 'API Gateway', cost: 69, percentage: 19 },
  { service: 'DNS', cost: 25, percentage: 7 },
  { service: 'VPN', cost: 18, percentage: 5 }
];

export default function NetworkingPage() {
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const activeServices = networkingResources.filter(r => r.status === 'active').length;
  const totalRequests = networkingResources.reduce((sum, r) => sum + r.requests_per_minute, 0);
  const totalCost = networkingResources.reduce((sum, r) => sum + r.cost_monthly, 0);
  const healthyTargets = networkingResources.reduce((sum, r) => sum + r.healthy_targets, 0);
  const totalTargets = networkingResources.reduce((sum, r) => sum + r.targets, 0);

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
          <h1 className="text-3xl font-bold">Networking Services</h1>
          <p className="text-muted-foreground">
            Manage load balancers, VPCs, CDNs, DNS, and other networking infrastructure
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Resource
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Services"
          value={activeServices.toString()}
          change={{
            value: 2.1,
            type: 'increase',
            period: 'last 24h'
          }}
          trend="up"
          icon={Network}
        />
        <MetricCard
          title="Requests/Min"
          value={`${(totalRequests / 1000).toFixed(1)}K`}
          change={{
            value: 12.5,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Activity}
        />
        <MetricCard
          title="Healthy Targets"
          value={`${healthyTargets}/${totalTargets}`}
          change={{
            value: 1.2,
            type: 'increase',
            period: 'last 24h'
          }}
          trend="up"
          icon={Shield}
        />
        <MetricCard
          title="Monthly Cost"
          value={`$${totalCost.toFixed(0)}`}
          change={{
            value: 8.3,
            type: 'decrease',
            period: 'vs last month'
          }}
          trend="down"
          icon={BarChart3}
        />
      </div>

      {/* Network Traffic and Load Balancer Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              Network Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={networkTrafficData}>
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
                <Area type="monotone" dataKey="inbound" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name="Inbound (GB)" />
                <Area type="monotone" dataKey="outbound" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} name="Outbound (GB)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Router className="h-5 w-5" />
              Load Balancer Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={loadBalancerMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
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
                <Bar dataKey="requests" fill="#8884d8" name="Requests/min" />
                <Bar dataKey="latency" fill="#82ca9d" name="Latency (ms)" />
                <Bar dataKey="errors" fill="#ffc658" name="Errors" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Network Security & Cost Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Network Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {networkSecurityData.map((item, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-muted-foreground">{item.metric}</h3>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.change}</span>
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
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {networkCostBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.service}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold">${item.cost}</span>
                      <span className="text-xs text-muted-foreground ml-2">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Networking Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Networking Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {networkingResources.map((resource, index) => (
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
                        {resource.type} • {resource.region}
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
                      <Badge 
                        variant={resource.health === 'healthy' ? 'default' : 'destructive'}
                      >
                        {resource.health}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${resource.cost_monthly.toFixed(2)}/mo</p>
                      <p className="text-sm text-muted-foreground">
                        {resource.healthy_targets}/{resource.targets} targets
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3 mt-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Requests: {resource.requests_per_minute.toLocaleString()}/min
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Network className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Data: {resource.data_processed_gb.toFixed(1)} GB
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Health: {((resource.healthy_targets / Math.max(resource.targets, 1)) * 100).toFixed(0)}%
                    </span>
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
          <CardTitle>Network Management</CardTitle>
          <CardDescription>Manage and provision networking resources across cloud platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <NextLink href="/dashboard/cloud-management/amazon">
              <Button variant="outline" className="h-16 flex-col w-full">
                <CloudIcon provider="amazon" service="aws" size={20} />
                <span className="text-xs mt-1">Manage AWS</span>
              </Button>
            </NextLink>
            <NextLink href="/dashboard/cloud-management/microsoft">
              <Button variant="outline" className="h-16 flex-col w-full">
                <CloudIcon provider="microsoft" service="azure" size={20} />
                <span className="text-xs mt-1">Manage Azure</span>
              </Button>
            </NextLink>
            <NextLink href="/dashboard/cloud-management/google">
              <Button variant="outline" className="h-16 flex-col w-full">
                <CloudIcon provider="google" service="gcp" size={20} />
                <span className="text-xs mt-1">Manage GCP</span>
              </Button>
            </NextLink>
            <Button variant="outline" className="h-16 flex-col">
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-xs">New Network</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightsWidget pillar="resource-management" />
    </div>
  );
}
