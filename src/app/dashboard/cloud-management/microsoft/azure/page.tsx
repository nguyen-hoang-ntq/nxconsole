'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ChartContainer } from '@/components/charts/chart-container';
import { CloudIcon } from '@/components/ui/cloud-icon';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Server, 
  Database, 
  Cloud, 
  Activity, 
  DollarSign, 
  Users, 
  Shield, 
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Settings,
  TrendingUp,
  TrendingDown,
  Play,
  Square,
  RotateCcw
} from 'lucide-react';

// Mock data for Azure services
const mockAzureData = {
  subscriptions: [
    { id: 'sub-001', name: 'Production Environment', status: 'Active', resources: 87, cost: 2840.50 },
    { id: 'sub-002', name: 'Development Environment', status: 'Active', resources: 45, cost: 980.25 },
    { id: 'sub-003', name: 'Testing Environment', status: 'Active', resources: 28, cost: 645.80 }
  ],
  resourceGroups: [
    { name: 'prod-web-app-rg', location: 'East US', resources: 12, status: 'Healthy' },
    { name: 'prod-database-rg', location: 'East US', resources: 8, status: 'Healthy' },
    { name: 'dev-environment-rg', location: 'West US 2', resources: 15, status: 'Warning' },
    { name: 'test-automation-rg', location: 'Central US', resources: 6, status: 'Healthy' }
  ],
  services: [
    { name: 'App Services', count: 8, status: 'Healthy', cost: 450.30 },
    { name: 'SQL Databases', count: 5, status: 'Healthy', cost: 890.75 },
    { name: 'Storage Accounts', count: 12, status: 'Healthy', cost: 180.45 },
    { name: 'Virtual Machines', count: 6, status: 'Warning', cost: 1250.80 },
    { name: 'Key Vault', count: 3, status: 'Healthy', cost: 25.60 },
    { name: 'Application Insights', count: 4, status: 'Healthy', cost: 68.90 }
  ],
  costTrends: [
    { month: 'Jul', cost: 4200, budget: 5000 },
    { month: 'Aug', cost: 4350, budget: 5000 },
    { month: 'Sep', cost: 4466, budget: 5000 },
    { month: 'Oct', cost: 4650, budget: 5000 },
    { month: 'Nov', cost: 4832, budget: 5000 },
    { month: 'Dec', cost: 4890, budget: 5000 }
  ],
  resourceDistribution: [
    { name: 'Compute', value: 45, color: '#0078d4' },
    { name: 'Storage', value: 25, color: '#00bcf2' },
    { name: 'Database', value: 20, color: '#40e0d0' },
    { name: 'Network', value: 10, color: '#1ba1e2' }
  ]
};

export default function AzurePage() {
  const [loading, setLoading] = useState(true);
  const [selectedSubscription, setSelectedSubscription] = useState(mockAzureData.subscriptions[0]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
      setLastRefresh(new Date());
    };
    
    loadData();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
    setLastRefresh(new Date());
  };

  const totalCost = mockAzureData.subscriptions.reduce((sum, sub) => sum + sub.cost, 0);
  const totalResources = mockAzureData.subscriptions.reduce((sum, sub) => sum + sub.resources, 0);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudIcon provider="microsoft-azure" size="lg" />
          <div>
            <h1 className="text-3xl font-bold">Microsoft Azure</h1>
            <p className="text-muted-foreground">
              Comprehensive Azure cloud infrastructure management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Azure Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Monthly Cost"
          value={`$${totalCost.toLocaleString()}`}
          change={{ value: 8.5, type: "increase", period: "vs last month" }}
          trend="up"
          icon={DollarSign}
          loading={loading}
        />
        
        <MetricCard
          title="Active Resources"
          value={totalResources.toString()}
          change={{ value: 12, type: "increase", period: "vs last month" }}
          trend="up"
          icon={Server}
          loading={loading}
        />
        
        <MetricCard
          title="Subscriptions"
          value={mockAzureData.subscriptions.length.toString()}
          change={{ value: 0, type: "increase", period: "this month" }}
          trend="neutral"
          icon={Cloud}
          loading={loading}
        />
        
        <MetricCard
          title="Resource Groups"
          value={mockAzureData.resourceGroups.length.toString()}
          change={{ value: 1, type: "increase", period: "vs last month" }}
          trend="up"
          icon={Shield}
          loading={loading}
        />
      </div>

      {/* Azure Cost Analysis and Resource Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Azure Cost Trends & Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer title="Monthly Azure spending vs budget">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockAzureData.costTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#0078d4" 
                    strokeWidth={2}
                    name="Actual Cost"
                    dot={{ fill: '#0078d4', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="budget" 
                    stroke="#ff7300" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Budget Limit"
                    dot={{ fill: '#ff7300', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Resource Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Resource Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer title="Azure resources by category">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockAzureData.resourceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockAzureData.resourceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Azure Subscriptions Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Azure Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAzureData.subscriptions.map((subscription) => (
              <div 
                key={subscription.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedSubscription(subscription)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={subscription.status === 'Active' ? 'default' : 'secondary'}>
                      {subscription.status}
                    </Badge>
                    <div>
                      <h3 className="font-medium">{subscription.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {subscription.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${subscription.cost.toLocaleString()}/month</p>
                    <p className="text-sm text-muted-foreground">{subscription.resources} resources</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Groups and Azure Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Resource Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAzureData.resourceGroups.map((rg) => (
                <div key={rg.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{rg.name}</h4>
                    <p className="text-sm text-muted-foreground">{rg.location} • {rg.resources} resources</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={rg.status === 'Healthy' ? 'default' : 'destructive'}>
                      {rg.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Azure Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Azure Services Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAzureData.services.map((service) => (
                <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.count} instances</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">${service.cost}</span>
                    <Badge variant={service.status === 'Healthy' ? 'default' : 'destructive'}>
                      {service.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Azure Management Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Play className="h-6 w-6 mb-2" />
              Deploy Resource
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              Manage Subscriptions
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              Cost Management
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              Security Center
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
