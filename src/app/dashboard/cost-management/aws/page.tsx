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

// Mock AWS cost data
const awsCostTrends = [
  { date: '2024-08-01', compute: 4200, storage: 1200, database: 1800, networking: 600, other: 1047 },
  { date: '2024-08-08', compute: 4350, storage: 1180, database: 1920, networking: 640, other: 1110 },
  { date: '2024-08-15', compute: 4100, storage: 1250, database: 1750, networking: 580, other: 1020 },
  { date: '2024-08-22', compute: 4500, storage: 1300, database: 2100, networking: 720, other: 1180 },
  { date: '2024-08-29', compute: 4680, storage: 1280, database: 2050, networking: 690, other: 1200 }
];

const awsServiceCosts = [
  { name: 'EC2', cost: 4680, percentage: 36.4, change: 8.2 },
  { name: 'RDS', cost: 2050, percentage: 15.9, change: -3.1 },
  { name: 'S3', cost: 1280, percentage: 9.9, change: 2.4 },
  { name: 'Lambda', cost: 890, percentage: 6.9, change: 12.5 },
  { name: 'VPC/Networking', cost: 690, percentage: 5.4, change: 5.8 },
  { name: 'CloudWatch', cost: 420, percentage: 3.3, change: 18.3 },
  { name: 'EBS', cost: 380, percentage: 3.0, change: -1.2 },
  { name: 'CloudFront', cost: 340, percentage: 2.6, change: 15.7 },
  { name: 'Route 53', cost: 180, percentage: 1.4, change: 0.8 },
  { name: 'Other Services', cost: 1990, percentage: 15.5, change: 4.6 }
];

const awsRegionalCosts = [
  { region: 'us-east-1', cost: 5200, percentage: 40.4, instances: 28 },
  { region: 'us-west-2', cost: 3100, percentage: 24.1, instances: 18 },
  { region: 'eu-west-1', cost: 2400, percentage: 18.6, instances: 14 },
  { region: 'ap-southeast-1', cost: 1300, percentage: 10.1, instances: 8 },
  { region: 'other', cost: 878, percentage: 6.8, instances: 5 }
];

const ec2InstanceCosts = [
  { type: 't3.medium', count: 12, cost: 1260, utilization: 45 },
  { type: 'm5.large', count: 8, cost: 1680, utilization: 72 },
  { type: 't3.large', count: 6, cost: 840, utilization: 38 },
  { type: 'c5.xlarge', count: 4, cost: 960, utilization: 85 },
  { type: 'r5.large', count: 3, cost: 720, utilization: 91 },
  { type: 'other', count: 15, cost: 1540, utilization: 62 }
];

const costOptimizations = [
  {
    category: 'Unused EC2 Instances',
    potential_savings: 1245,
    resources: 8,
    severity: 'high',
    description: 'EC2 instances with <5% CPU utilization for 7+ days',
    recommendation: 'Stop or terminate unused instances',
    service: 'EC2'
  },
  {
    category: 'Unattached EBS Volumes',
    potential_savings: 380,
    resources: 15,
    severity: 'medium',
    description: 'EBS volumes not attached to any instances',
    recommendation: 'Delete unused volumes or create snapshots',
    service: 'EBS'
  },
  {
    category: 'Reserved Instance Opportunities',
    potential_savings: 2100,
    resources: 12,
    severity: 'high',
    description: 'On-demand instances suitable for RI conversion',
    recommendation: 'Purchase Reserved Instances for steady workloads',
    service: 'EC2'
  },
  {
    category: 'S3 Storage Class Optimization',
    potential_savings: 560,
    resources: 45,
    severity: 'medium',
    description: 'Objects not accessed for 30+ days in Standard storage',
    recommendation: 'Move to IA or Glacier storage classes',
    service: 'S3'
  },
  {
    category: 'Lambda Function Optimization',
    potential_savings: 220,
    resources: 28,
    severity: 'low',
    description: 'Over-provisioned Lambda functions',
    recommendation: 'Optimize memory allocation and timeout settings',
    service: 'Lambda'
  }
];

const budgetAlerts = [
  {
    name: 'Production Environment',
    budget: 8000,
    spent: 7200,
    percentage: 90.0,
    status: 'critical',
    forecast: 7800,
    daysLeft: 3
  },
  {
    name: 'Development Environment',
    budget: 3000,
    spent: 2100,
    percentage: 70.0,
    status: 'warning',
    forecast: 2600,
    daysLeft: 3
  },
  {
    name: 'Data Analytics',
    budget: 2500,
    spent: 1400,
    percentage: 56.0,
    status: 'good',
    forecast: 1800,
    daysLeft: 3
  }
];

const riUtilization = [
  { type: 'Standard', purchased: 24, used: 22, utilization: 91.7, savings: 2400 },
  { type: 'Convertible', purchased: 12, used: 10, utilization: 83.3, savings: 1200 },
  { type: 'Scheduled', purchased: 6, used: 6, utilization: 100.0, savings: 720 }
];

const costAnomalies = [
  {
    service: 'EC2',
    anomaly: 'Sudden spike in t3.large instances',
    cost_impact: 450,
    detected_at: '2 hours ago',
    severity: 'medium'
  },
  {
    service: 'S3',
    anomaly: 'Unusual data transfer out charges',
    cost_impact: 280,
    detected_at: '6 hours ago',
    severity: 'low'
  },
  {
    service: 'RDS',
    anomaly: 'Database backup storage increase',
    cost_impact: 120,
    detected_at: '1 day ago',
    severity: 'low'
  }
];

export default function AWSCostPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [loading, setLoading] = useState(false);

  const totalAWSCost = awsServiceCosts.reduce((sum, service) => sum + service.cost, 0);
  const monthlyGrowth = 8.4;
  const totalOptimizationSavings = costOptimizations.reduce((sum, opt) => sum + opt.potential_savings, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudIcon provider="amazon" service="aws" size={32} />
          <div>
            <h1 className="text-3xl font-bold">AWS Cost Management</h1>
            <p className="text-muted-foreground">
              Monitor and optimize your Amazon Web Services spending
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Cost Report
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Billing Settings
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
          title="Total AWS Spend"
          value={`$${totalAWSCost.toLocaleString()}`}
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
            value: 23.5,
            type: 'increase',
            period: 'potential'
          }}
          trend="up"
          icon={TrendingDown}
        />
        <MetricCard
          title="Reserved Instance Savings"
          value="$4,320"
          change={{
            value: 12.8,
            type: 'increase',
            period: 'this month'
          }}
          trend="up"
          icon={Target}
        />
        <MetricCard
          title="Active Resources"
          value="127"
          change={{
            value: 5.2,
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
              AWS Cost Trends by Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={awsCostTrends}>
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
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value) => [`$${value}`, '']}
                />
                <Area type="monotone" dataKey="compute" stackId="1" stroke="#ff9900" fill="#ff9900" fillOpacity={0.8} name="Compute" />
                <Area type="monotone" dataKey="database" stackId="1" stroke="#ff7300" fill="#ff7300" fillOpacity={0.8} name="Database" />
                <Area type="monotone" dataKey="storage" stackId="1" stroke="#ff5722" fill="#ff5722" fillOpacity={0.8} name="Storage" />
                <Area type="monotone" dataKey="networking" stackId="1" stroke="#ff4081" fill="#ff4081" fillOpacity={0.8} name="Networking" />
                <Area type="monotone" dataKey="other" stackId="1" stroke="#9c27b0" fill="#9c27b0" fillOpacity={0.8} name="Other" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top AWS Services by Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {awsServiceCosts.slice(0, 8).map((service, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CloudIcon provider="amazon" service={service.name.toLowerCase()} size={20} />
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
                      className="h-1.5 rounded-full bg-orange-500"
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

      {/* Regional Costs and EC2 Instance Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Cost by AWS Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {awsRegionalCosts.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{region.region}</span>
                    <div className="text-right">
                      <p className="font-bold">${region.cost.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{region.instances} resources</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-orange-500"
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
              EC2 Instance Cost Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ec2InstanceCosts.map((instance, index) => (
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

      {/* Budget Alerts and Reserved Instance Utilization */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              AWS Budget Alerts
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
              Reserved Instance Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riUtilization.map((ri, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{ri.type} RI</span>
                    <div className="text-right">
                      <p className="font-bold">{ri.utilization.toFixed(1)}%</p>
                      <p className="text-sm text-green-600">${ri.savings} saved</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Used: {ri.used}</span>
                    <span>Purchased: {ri.purchased}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        ri.utilization > 90 ? 'bg-green-500' :
                        ri.utilization > 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${ri.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Optimization Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            AWS Cost Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costOptimizations.map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CloudIcon provider="amazon" service={opportunity.service.toLowerCase()} size={32} />
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
                  <CloudIcon provider="amazon" service={anomaly.service.toLowerCase()} size={24} />
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
