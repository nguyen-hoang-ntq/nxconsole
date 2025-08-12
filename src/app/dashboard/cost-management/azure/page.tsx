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

// Mock Azure cost data
const azureCostTrends = [
  { date: '2024-08-01', compute: 3800, storage: 1100, database: 1600, networking: 550, other: 950 },
  { date: '2024-08-08', compute: 3950, storage: 1050, database: 1750, networking: 580, other: 1020 },
  { date: '2024-08-15', compute: 3700, storage: 1150, database: 1580, networking: 520, other: 930 },
  { date: '2024-08-22', compute: 4100, storage: 1200, database: 1900, networking: 650, other: 1080 },
  { date: '2024-08-29', compute: 4250, storage: 1180, database: 1850, networking: 620, other: 1100 }
];

const azureServiceCosts = [
  { name: 'Virtual Machines', cost: 4250, percentage: 38.6, change: 6.8 },
  { name: 'SQL Database', cost: 1850, percentage: 16.8, change: -2.4 },
  { name: 'Storage Accounts', cost: 1180, percentage: 10.7, change: 3.1 },
  { name: 'App Service', cost: 820, percentage: 7.4, change: 15.2 },
  { name: 'VNet/Networking', cost: 620, percentage: 5.6, change: 7.3 },
  { name: 'Azure Functions', cost: 480, percentage: 4.4, change: 22.8 },
  { name: 'Cosmos DB', cost: 410, percentage: 3.7, change: -5.1 },
  { name: 'Application Gateway', cost: 320, percentage: 2.9, change: 12.4 },
  { name: 'Key Vault', cost: 180, percentage: 1.6, change: 1.8 },
  { name: 'Other Services', cost: 890, percentage: 8.1, change: 5.2 }
];

const azureRegionalCosts = [
  { region: 'East US', cost: 4700, percentage: 42.7, resources: 32 },
  { region: 'West Europe', cost: 2800, percentage: 25.4, resources: 19 },
  { region: 'Southeast Asia', cost: 1900, percentage: 17.3, resources: 13 },
  { region: 'Australia East', cost: 1100, percentage: 10.0, resources: 7 },
  { region: 'other', cost: 500, percentage: 4.5, resources: 4 }
];

const vmInstanceCosts = [
  { type: 'Standard_D2s_v3', count: 15, cost: 1425, utilization: 68 },
  { type: 'Standard_B2ms', count: 12, cost: 1080, utilization: 42 },
  { type: 'Standard_F4s_v2', count: 8, cost: 960, utilization: 78 },
  { type: 'Standard_D4s_v3', count: 6, cost: 1140, utilization: 85 },
  { type: 'Standard_E2s_v3', count: 4, cost: 720, utilization: 91 },
  { type: 'other', count: 18, cost: 1925, utilization: 58 }
];

const azureOptimizations = [
  {
    category: 'Unused Virtual Machines',
    potential_savings: 1120,
    resources: 6,
    severity: 'high',
    description: 'VMs with <5% CPU utilization for 7+ days',
    recommendation: 'Deallocate or delete unused virtual machines',
    service: 'Virtual Machine'
  },
  {
    category: 'Unattached Managed Disks',
    potential_savings: 340,
    resources: 12,
    severity: 'medium',
    description: 'Managed disks not attached to any VMs',
    recommendation: 'Delete unused disks or create snapshots',
    service: 'Storage'
  },
  {
    category: 'Reserved Instance Opportunities',
    potential_savings: 1890,
    resources: 10,
    severity: 'high',
    description: 'Pay-as-you-go VMs suitable for reservation',
    recommendation: 'Purchase Azure Reserved VM Instances',
    service: 'Virtual Machine'
  },
  {
    category: 'Storage Tier Optimization',
    potential_savings: 480,
    resources: 38,
    severity: 'medium',
    description: 'Blobs not accessed for 30+ days in hot storage',
    recommendation: 'Move to cool or archive storage tiers',
    service: 'Storage'
  },
  {
    category: 'Azure Hybrid Benefit',
    potential_savings: 760,
    resources: 8,
    severity: 'high',
    description: 'Windows VMs eligible for hybrid licensing',
    recommendation: 'Apply Azure Hybrid Benefit for Windows Server',
    service: 'Virtual Machine'
  }
];

const budgetAlerts = [
  {
    name: 'Production Subscription',
    budget: 7500,
    spent: 6800,
    percentage: 90.7,
    status: 'critical',
    forecast: 7300,
    daysLeft: 3
  },
  {
    name: 'Development Subscription',
    budget: 2800,
    spent: 1950,
    percentage: 69.6,
    status: 'warning',
    forecast: 2400,
    daysLeft: 3
  },
  {
    name: 'Analytics Workloads',
    budget: 2200,
    spent: 1280,
    percentage: 58.2,
    status: 'good',
    forecast: 1650,
    daysLeft: 3
  }
];

const reservedInstanceUtilization = [
  { type: 'VM Standard_D2s_v3', purchased: 12, used: 11, utilization: 91.7, savings: 1440 },
  { type: 'VM Standard_B2ms', purchased: 8, used: 6, utilization: 75.0, savings: 720 },
  { type: 'SQL Database vCore', purchased: 16, used: 15, utilization: 93.8, savings: 960 }
];

const costAnomalies = [
  {
    service: 'Virtual Machines',
    anomaly: 'Unexpected increase in Standard_F series usage',
    cost_impact: 420,
    detected_at: '3 hours ago',
    severity: 'medium'
  },
  {
    service: 'Storage',
    anomaly: 'Unusual bandwidth usage in West Europe',
    cost_impact: 180,
    detected_at: '5 hours ago',
    severity: 'low'
  },
  {
    service: 'SQL Database',
    anomaly: 'DTU spike in production database',
    cost_impact: 95,
    detected_at: '1 day ago',
    severity: 'low'
  }
];

const azureAdvisorRecommendations = [
  {
    category: 'Cost',
    title: 'Resize or shutdown underutilized virtual machines',
    impact: 'High',
    savings: '$1,245/month',
    resources: 8,
    description: 'Virtual machines with low CPU utilization'
  },
  {
    category: 'Cost',
    title: 'Buy reserved instances to save money',
    impact: 'High', 
    savings: '$1,890/month',
    resources: 10,
    description: 'Virtual machines suitable for reservation'
  },
  {
    category: 'Cost',
    title: 'Configure autoscale to optimize costs',
    impact: 'Medium',
    savings: '$680/month',
    resources: 5,
    description: 'App Service plans that can benefit from autoscaling'
  },
  {
    category: 'Cost',
    title: 'Delete unattached managed disks',
    impact: 'Medium',
    savings: '$340/month',
    resources: 12,
    description: 'Managed disks not attached to any VM'
  }
];

export default function AzureCostPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [loading, setLoading] = useState(false);

  const totalAzureCost = azureServiceCosts.reduce((sum, service) => sum + service.cost, 0);
  const monthlyGrowth = 7.2;
  const totalOptimizationSavings = azureOptimizations.reduce((sum, opt) => sum + opt.potential_savings, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudIcon provider="microsoft" service="azure" size={32} />
          <div>
            <h1 className="text-3xl font-bold">Azure Cost Management</h1>
            <p className="text-muted-foreground">
              Monitor and optimize your Microsoft Azure spending
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Usage Report
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Cost Analysis
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
          title="Total Azure Spend"
          value={`$${totalAzureCost.toLocaleString()}`}
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
            value: 28.3,
            type: 'increase',
            period: 'potential'
          }}
          trend="up"
          icon={TrendingDown}
        />
        <MetricCard
          title="Reserved VM Savings"
          value="$3,120"
          change={{
            value: 15.4,
            type: 'increase',
            period: 'this month'
          }}
          trend="up"
          icon={Target}
        />
        <MetricCard
          title="Active Resources"
          value="95"
          change={{
            value: 3.8,
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
              Azure Cost Trends by Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={azureCostTrends}>
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
                <Area type="monotone" dataKey="compute" stackId="1" stroke="#0078d4" fill="#0078d4" fillOpacity={0.8} name="Compute" />
                <Area type="monotone" dataKey="database" stackId="1" stroke="#0066cc" fill="#0066cc" fillOpacity={0.8} name="Database" />
                <Area type="monotone" dataKey="storage" stackId="1" stroke="#0055a6" fill="#0055a6" fillOpacity={0.8} name="Storage" />
                <Area type="monotone" dataKey="networking" stackId="1" stroke="#004578" fill="#004578" fillOpacity={0.8} name="Networking" />
                <Area type="monotone" dataKey="other" stackId="1" stroke="#003366" fill="#003366" fillOpacity={0.8} name="Other" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Azure Services by Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {azureServiceCosts.slice(0, 8).map((service, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CloudIcon provider="microsoft" service={service.name.toLowerCase().replace(/ /g, '-')} size={20} />
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

      {/* Regional Costs and VM Instance Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Cost by Azure Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {azureRegionalCosts.map((region, index) => (
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
              Virtual Machine Cost Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vmInstanceCosts.map((vm, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{vm.type}</p>
                    <p className="text-sm text-muted-foreground">{vm.count} instances</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${vm.cost.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">
                        {vm.utilization}% util
                      </span>
                      <div className={`h-2 w-2 rounded-full ${
                        vm.utilization > 80 ? 'bg-green-500' :
                        vm.utilization > 60 ? 'bg-yellow-500' : 'bg-red-500'
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
              Azure Budget Alerts
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
              {reservedInstanceUtilization.map((ri, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{ri.type}</span>
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

      {/* Azure Advisor Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Azure Advisor Cost Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {azureAdvisorRecommendations.map((recommendation, index) => (
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
            Azure Cost Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {azureOptimizations.map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CloudIcon provider="microsoft" service={opportunity.service.toLowerCase().replace(/ /g, '-')} size={32} />
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
                  <CloudIcon provider="microsoft" service={anomaly.service.toLowerCase().replace(/ /g, '-')} size={24} />
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
