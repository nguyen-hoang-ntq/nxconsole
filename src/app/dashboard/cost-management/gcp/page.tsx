'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricCard } from '@/components/dashboard/metric-card';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { 
  Plus, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Download,
  Settings,
  BarChart3,
  Target,
  Calendar,
  CreditCard,
  Server,
  Database,
  Network,
  Shield,
  Zap,
  HardDrive
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';

// Mock GCP cost data
const gcpCostTrends = [
  { date: '2024-08-01', compute: 3200, storage: 980, database: 1400, networking: 480, other: 840 },
  { date: '2024-08-08', compute: 3350, storage: 920, database: 1520, networking: 510, other: 900 },
  { date: '2024-08-15', compute: 3100, storage: 1020, database: 1380, networking: 450, other: 820 },
  { date: '2024-08-22', compute: 3480, storage: 1080, database: 1680, networking: 580, other: 950 },
  { date: '2024-08-29', compute: 3620, storage: 1040, database: 1620, networking: 540, other: 980 }
];

const gcpServiceCosts = [
  { name: 'Compute Engine', cost: 3620, percentage: 40.3, change: 8.9 },
  { name: 'Cloud SQL', cost: 1620, percentage: 18.0, change: -1.8 },
  { name: 'Cloud Storage', cost: 1040, percentage: 11.6, change: 4.2 },
  { name: 'BigQuery', cost: 780, percentage: 8.7, change: 18.6 },
  { name: 'VPC/Networking', cost: 540, percentage: 6.0, change: 6.7 },
  { name: 'Cloud Functions', cost: 420, percentage: 4.7, change: 24.1 },
  { name: 'Cloud Run', cost: 380, percentage: 4.2, change: 16.8 },
  { name: 'Kubernetes Engine', cost: 320, percentage: 3.6, change: 11.2 },
  { name: 'Cloud CDN', cost: 180, percentage: 2.0, change: 8.4 },
  { name: 'Other Services', cost: 890, percentage: 9.9, change: 7.3 }
];

const gcpRegionalCosts = [
  { region: 'us-central1', cost: 3800, percentage: 42.2, resources: 28 },
  { region: 'europe-west1', cost: 2200, percentage: 24.4, resources: 16 },
  { region: 'asia-southeast1', cost: 1600, percentage: 17.8, resources: 11 },
  { region: 'us-west1', cost: 900, percentage: 10.0, resources: 6 },
  { region: 'other', cost: 500, percentage: 5.6, resources: 4 }
];

const computeInstanceCosts = [
  { type: 'e2-standard-2', count: 18, cost: 1260, utilization: 65 },
  { type: 'n1-standard-4', count: 12, cost: 1440, utilization: 78 },
  { type: 'e2-medium', count: 10, cost: 720, utilization: 42 },
  { type: 'n2-standard-2', count: 8, cost: 960, utilization: 82 },
  { type: 'c2-standard-4', count: 6, cost: 1080, utilization: 91 },
  { type: 'other', count: 15, cost: 1540, utilization: 58 }
];

const gcpOptimizations = [
  {
    category: 'Idle Compute Engine Instances',
    potential_savings: 980,
    resources: 7,
    severity: 'high',
    description: 'VM instances with <5% CPU utilization for 7+ days',
    recommendation: 'Stop or delete unused compute instances',
    service: 'Compute Engine'
  },
  {
    category: 'Unattached Persistent Disks',
    potential_savings: 290,
    resources: 14,
    severity: 'medium',
    description: 'Persistent disks not attached to any instances',
    recommendation: 'Delete unused disks or create snapshots',
    service: 'Storage'
  },
  {
    category: 'Committed Use Discounts',
    potential_savings: 1680,
    resources: 12,
    severity: 'high',
    description: 'Stable workloads eligible for CUD pricing',
    recommendation: 'Purchase 1-year or 3-year committed use discounts',
    service: 'Compute Engine'
  },
  {
    category: 'Cloud Storage Class Optimization',
    potential_savings: 420,
    resources: 42,
    severity: 'medium',
    description: 'Objects not accessed for 30+ days in Standard storage',
    recommendation: 'Move to Nearline or Coldline storage classes',
    service: 'Storage'
  },
  {
    category: 'Right-sizing Recommendations',
    potential_savings: 640,
    resources: 15,
    severity: 'medium',
    description: 'Over-provisioned compute instances',
    recommendation: 'Resize instances to match actual usage patterns',
    service: 'Compute Engine'
  }
];

const budgetAlerts = [
  {
    name: 'Production Project',
    budget: 6500,
    spent: 5850,
    percentage: 90.0,
    status: 'critical',
    forecast: 6300,
    daysLeft: 3
  },
  {
    name: 'Development Project',
    budget: 2500,
    spent: 1750,
    percentage: 70.0,
    status: 'warning',
    forecast: 2200,
    daysLeft: 3
  },
  {
    name: 'Data Analytics',
    budget: 2000,
    spent: 1100,
    percentage: 55.0,
    status: 'good',
    forecast: 1400,
    daysLeft: 3
  }
];

const cudUtilization = [
  { type: 'General Purpose (N1)', purchased: 16, used: 15, utilization: 93.8, savings: 1200 },
  { type: 'Compute Optimized (C2)', purchased: 8, used: 7, utilization: 87.5, savings: 840 },
  { type: 'Memory Optimized (M2)', purchased: 4, used: 4, utilization: 100.0, savings: 480 }
];

const costAnomalies = [
  {
    service: 'BigQuery',
    anomaly: 'Unexpected query processing surge',
    cost_impact: 320,
    detected_at: '2 hours ago',
    severity: 'medium'
  },
  {
    service: 'Cloud Storage',
    anomaly: 'Unusual egress traffic in asia-southeast1',
    cost_impact: 150,
    detected_at: '4 hours ago',
    severity: 'low'
  },
  {
    service: 'Compute Engine',
    anomaly: 'N2 instance family usage spike',
    cost_impact: 85,
    detected_at: '8 hours ago',
    severity: 'low'
  }
];

const gcpRecommendations = [
  {
    category: 'Cost',
    title: 'Stop or delete idle Compute Engine instances',
    impact: 'High',
    savings: '$980/month',
    resources: 7,
    description: 'VM instances with consistently low utilization'
  },
  {
    category: 'Cost',
    title: 'Purchase committed use discounts',
    impact: 'High', 
    savings: '$1,680/month',
    resources: 12,
    description: 'Stable workloads suitable for 1-year or 3-year commitments'
  },
  {
    category: 'Performance',
    title: 'Right-size your Compute Engine instances',
    impact: 'Medium',
    savings: '$640/month',
    resources: 15,
    description: 'Instances that are over-provisioned for current workloads'
  },
  {
    category: 'Cost',
    title: 'Optimize Cloud Storage classes',
    impact: 'Medium',
    savings: '$420/month',
    resources: 42,
    description: 'Objects that can be moved to cheaper storage classes'
  }
];

const sustainabilityMetrics = [
  {
    metric: 'Carbon Footprint',
    value: '2.4 tons CO2e',
    change: -12.3,
    description: 'Monthly carbon emissions from GCP usage'
  },
  {
    metric: 'Renewable Energy',
    value: '67%',
    change: 5.8,
    description: 'Percentage of usage powered by renewable energy'
  },
  {
    metric: 'Carbon Efficiency',
    value: '0.08 kg CO2e/$',
    change: -18.7,
    description: 'Carbon emissions per dollar spent'
  }
];

export default function GCPCostPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [loading, setLoading] = useState(false);

  const totalGCPCost = gcpServiceCosts.reduce((sum, service) => sum + service.cost, 0);
  const monthlyGrowth = 6.8;
  const totalOptimizationSavings = gcpOptimizations.reduce((sum, opt) => sum + opt.potential_savings, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudIcon provider="google" service="gcp" size={32} />
          <div>
            <h1 className="text-3xl font-bold">Google Cloud Cost Management</h1>
            <p className="text-muted-foreground">
              Monitor and optimize your Google Cloud Platform spending
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Billing Export
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Billing Console
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Budget
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total GCP Spend"
          value={`$${totalGCPCost.toLocaleString()}`}
          change={{
            value: monthlyGrowth,
            type: 'increase',
            period: 'vs last month'
          }}
          trend="up"
          icon={DollarSign}
        />
        <MetricCard
          title="Optimization Savings"
          value={`$${totalOptimizationSavings.toLocaleString()}`}
          change={{
            value: 31.2,
            type: 'increase',
            period: 'potential'
          }}
          trend="up"
          icon={TrendingDown}
        />
        <MetricCard
          title="CUD Savings"
          value="$2,520"
          change={{
            value: 18.6,
            type: 'increase',
            period: 'this month'
          }}
          trend="up"
          icon={Target}
        />
        <MetricCard
          title="Active Resources"
          value="83"
          change={{
            value: 4.7,
            type: 'increase',
            period: 'last 7 days'
          }}
          trend="up"
          icon={Server}
        />
      </div>

      {/* Cost Trends, Service Breakdown & AI Insights */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              GCP Cost Trends by Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={gcpCostTrends}>
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
                  formatter={(value) => [`$${value}`, '']}
                />
                <Area type="monotone" dataKey="compute" stackId="1" stroke="#4285f4" fill="#4285f4" fillOpacity={0.8} name="Compute" />
                <Area type="monotone" dataKey="database" stackId="1" stroke="#34a853" fill="#34a853" fillOpacity={0.8} name="Database" />
                <Area type="monotone" dataKey="storage" stackId="1" stroke="#fbbc04" fill="#fbbc04" fillOpacity={0.8} name="Storage" />
                <Area type="monotone" dataKey="networking" stackId="1" stroke="#ea4335" fill="#ea4335" fillOpacity={0.8} name="Networking" />
                <Area type="monotone" dataKey="other" stackId="1" stroke="#9aa0a6" fill="#9aa0a6" fillOpacity={0.8} name="Other" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top GCP Services by Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {gcpServiceCosts.slice(0, 8).map((service, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CloudIcon provider="google" service={service.name.toLowerCase().replace(/ /g, '-')} size={20} />
                      <span className="font-medium text-sm">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">${service.cost.toLocaleString()}</span>
                      <div className={`flex items-center gap-1 ${
                        service.change > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {service.change > 0 ? 
                          <TrendingUp className="h-3 w-3" /> : 
                          <TrendingDown className="h-3 w-3" />
                        }
                        <span className="text-xs">{Math.abs(service.change)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-blue-500"
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Cost Optimization Insights */}
        <AIInsightsWidget 
          pillar="cost-management"
          maxInsights={4}
          showRefresh={true}
        />
      </div>

      {/* Regional Costs and Compute Instance Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Cost by GCP Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gcpRegionalCosts.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{region.region}</span>
                    <div className="text-right">
                      <p className="font-bold">${region.cost.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{region.resources} resources</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Compute Engine Cost Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {computeInstanceCosts.map((instance, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{instance.type}</p>
                    <p className="text-sm text-muted-foreground">{instance.count} instances</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${instance.cost.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">
                        {instance.utilization}% util
                      </span>
                      <div className={`h-2 w-2 rounded-full ${
                        instance.utilization > 80 ? 'bg-green-500' :
                        instance.utilization > 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Alerts and CUD Utilization */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              GCP Budget Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetAlerts.map((budget, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{budget.name}</h3>
                    <Badge 
                      variant={
                        budget.status === 'critical' ? 'destructive' : 
                        budget.status === 'warning' ? 'default' : 'secondary'
                      }
                    >
                      {budget.percentage.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Spent: ${budget.spent.toLocaleString()}</span>
                      <span>Budget: ${budget.budget.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          budget.percentage > 85 ? 'bg-red-500' : 
                          budget.percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${budget.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Forecast: ${budget.forecast.toLocaleString()} ({budget.daysLeft} days left)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Committed Use Discount Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cudUtilization.map((cud, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{cud.type}</span>
                    <div className="text-right">
                      <p className="font-bold">{cud.utilization.toFixed(1)}%</p>
                      <p className="text-sm text-green-600">${cud.savings} saved</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Used: {cud.used}</span>
                    <span>Purchased: {cud.purchased}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        cud.utilization > 90 ? 'bg-green-500' :
                        cud.utilization > 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${cud.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sustainability Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sustainability & Carbon Footprint
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {sustainabilityMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{metric.metric}</h3>
                  <div className={`flex items-center gap-1 ${
                    metric.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change > 0 ? 
                      <TrendingUp className="h-3 w-3" /> : 
                      <TrendingDown className="h-3 w-3" />
                    }
                    <span className="text-xs">{Math.abs(metric.change)}%</span>
                  </div>
                </div>
                <p className="text-lg font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* GCP Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            GCP Cost Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gcpRecommendations.map((recommendation, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{recommendation.title}</h3>
                    <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{recommendation.savings}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge 
                      variant={recommendation.impact === 'High' ? 'destructive' : 
                              recommendation.impact === 'Medium' ? 'default' : 'secondary'}
                    >
                      {recommendation.impact}
                    </Badge>
                    <Badge variant="outline">
                      {recommendation.resources} resources
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Optimization Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            GCP Cost Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gcpOptimizations.map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CloudIcon provider="google" service={opportunity.service.toLowerCase().replace(/ /g, '-')} size={32} />
                  <div>
                    <h3 className="font-medium">{opportunity.category}</h3>
                    <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                    <p className="text-sm font-medium text-blue-600">{opportunity.recommendation}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    ${opportunity.potential_savings.toLocaleString()}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <Badge 
                      variant={opportunity.severity === 'high' ? 'destructive' : 
                              opportunity.severity === 'medium' ? 'default' : 'secondary'}
                    >
                      {opportunity.severity}
                    </Badge>
                    <Badge variant="outline">
                      {opportunity.resources} resources
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Anomalies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Cost Anomalies Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {costAnomalies.map((anomaly, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CloudIcon provider="google" service={anomaly.service.toLowerCase().replace(/ /g, '-')} size={24} />
                  <div>
                    <p className="font-medium text-sm">{anomaly.anomaly}</p>
                    <p className="text-xs text-muted-foreground">
                      {anomaly.service} • Detected {anomaly.detected_at}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">+${anomaly.cost_impact}</p>
                  <Badge 
                    variant={anomaly.severity === 'high' ? 'destructive' : 
                            anomaly.severity === 'medium' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {anomaly.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
