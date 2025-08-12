'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricCard, StandardCard, ChartCard, ListCard } from '@/components/shared/standard-cards';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { pillarTailwindClasses } from '@/lib/pillar-colors';
import { 
  Plus, 
  Download, 
  Settings, 
  BarChart3,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Calendar,
  ArrowRight,
  PieChart
} from 'lucide-react';
import { CostCharts } from '@/components/cost-management/cost-charts';
import { BudgetTracker } from '@/components/cost-management/budget-tracker';
import { mockCostDataItems, mockBudgets } from '@/lib/mock-data';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { chartColorSchemes } from '@/lib/chart-colors';
import { layoutPatterns, gridPatterns, spacing, typography } from '@/lib/responsive-utils';
import Link from 'next/link';

// Mock multi-cloud cost data
const cloudProviderCosts = [
  {
    provider: 'aws',
    name: 'Amazon Web Services',
    monthlySpend: 12847.50,
    budgetLimit: 15000,
    lastMonthSpend: 11234.20,
    services: 18,
    topService: 'EC2',
    topServiceCost: 4567.80,
    trend: 'up',
    changePercent: 14.4,
    href: '/dashboard/cost-management/aws'
  },
  {
    provider: 'azure',
    name: 'Microsoft Azure',
    monthlySpend: 8934.75,
    budgetLimit: 10000,
    lastMonthSpend: 9876.40,
    services: 14,
    topService: 'Virtual Machines',
    topServiceCost: 3456.90,
    trend: 'down',
    changePercent: -9.5,
    href: '/dashboard/cost-management/azure'
  },
  {
    provider: 'gcp',
    name: 'Google Cloud Platform',
    monthlySpend: 6789.25,
    budgetLimit: 8000,
    lastMonthSpend: 5432.10,
    services: 12,
    topService: 'Compute Engine',
    topServiceCost: 2345.60,
    trend: 'up',
    changePercent: 25.0,
    href: '/dashboard/cost-management/gcp'
  },
  {
    provider: 'microsoft',
    name: 'Microsoft 365',
    monthlySpend: 3456.00,
    budgetLimit: 4000,
    lastMonthSpend: 3456.00,
    services: 8,
    topService: 'Enterprise E5',
    topServiceCost: 2890.00,
    trend: 'stable',
    changePercent: 0.0,
    href: '/dashboard/cost-management/m365'
  }
];

const monthlyTrends = [
  { month: 'Jan', aws: 11200, azure: 8900, gcp: 5400, m365: 3456 },
  { month: 'Feb', aws: 10800, azure: 9200, gcp: 5600, m365: 3456 },
  { month: 'Mar', aws: 11500, azure: 8700, gcp: 5800, m365: 3456 },
  { month: 'Apr', aws: 11900, azure: 9400, gcp: 6100, m365: 3456 },
  { month: 'May', aws: 12100, azure: 9000, gcp: 6300, m365: 3456 },
  { month: 'Jun', aws: 11800, azure: 8600, gcp: 5900, m365: 3456 },
  { month: 'Jul', aws: 12400, azure: 9100, gcp: 6500, m365: 3456 },
  { month: 'Aug', aws: 12850, azure: 8935, gcp: 6789, m365: 3456 }
];

const costByService = [
  { service: 'Compute', aws: 4568, azure: 3457, gcp: 2346 },
  { service: 'Storage', aws: 1234, azure: 1876, gcp: 1567 },
  { service: 'Networking', aws: 987, azure: 765, gcp: 654 },
  { service: 'Databases', aws: 2345, azure: 1543, gcp: 1890 },
  { service: 'Security', aws: 876, azure: 543, gcp: 432 }
];

const costOptimizationOpportunities = [
  {
    category: 'Unused Resources',
    provider: 'aws',
    potential_savings: 1234.50,
    resources: 18,
    severity: 'high',
    description: 'Idle EC2 instances and unused EBS volumes'
  },
  {
    category: 'Right-sizing',
    provider: 'azure',
    potential_savings: 876.25,
    resources: 12,
    severity: 'medium',
    description: 'Oversized Virtual Machines and Storage accounts'
  },
  {
    category: 'Reserved Instances',
    provider: 'gcp',
    potential_savings: 2456.75,
    resources: 8,
    severity: 'high',
    description: 'Convert on-demand instances to committed use discounts'
  },
  {
    category: 'License Optimization',
    provider: 'microsoft',
    potential_savings: 456.00,
    resources: 5,
    severity: 'low',
    description: 'Unused M365 licenses and redundant subscriptions'
  }
];

const budgetAlerts = [
  {
    provider: 'gcp',
    budget: 'Development Environment',
    percentage: 92,
    amount: 7360,
    limit: 8000,
    severity: 'high',
    daysLeft: 3
  },
  {
    provider: 'azure',
    budget: 'Production Workloads',
    percentage: 89,
    amount: 8935,
    limit: 10000,
    severity: 'medium',
    daysLeft: 3
  },
  {
    provider: 'aws',
    budget: 'Infrastructure',
    percentage: 86,
    amount: 12848,
    limit: 15000,
    severity: 'medium',
    daysLeft: 3
  }
];

export default function CostManagementPage() {
  const [loading, setLoading] = useState(false);

  const totalSpend = cloudProviderCosts.reduce((sum, provider) => sum + provider.monthlySpend, 0);
  const totalBudget = cloudProviderCosts.reduce((sum, provider) => sum + provider.budgetLimit, 0);
  const totalSavings = costOptimizationOpportunities.reduce((sum, opp) => sum + opp.potential_savings, 0);
  const budgetUtilization = (totalSpend / totalBudget) * 100;

  return (
    <div className={layoutPatterns.pageLayout}>
      {/* Header */}
      <div className={layoutPatterns.header}>
        <div>
          <h1 className={`font-bold text-green-700 ${typography.pageTitle.combined}`}>Cost Management</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Monitor, analyze, and optimize your multi-cloud spending across all platforms
          </p>
        </div>
        <div className={layoutPatterns.buttonGroup}>
          <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Create Budget</span>
            <span className="sm:hidden">Budget</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={layoutPatterns.metricGrid}>
        <MetricCard
          title="Total Monthly Spend"
          value={`$${totalSpend.toLocaleString()}`}
          change={{
            value: '+8.7%',
            trend: 'up'
          }}
          pillar="cost"
          icon={<DollarSign className="h-5 w-5" />}
          description="vs last month"
        />
        <MetricCard
          title="Budget Utilization"
          value={`${budgetUtilization.toFixed(1)}%`}
          change={{
            value: '+12.3%',
            trend: 'up'
          }}
          pillar="cost"
          icon={<Target className="h-5 w-5" />}
          description="this month"
        />
        <MetricCard
          title="Optimization Savings"
          value={`$${totalSavings.toLocaleString()}`}
          change={{
            value: '+15.2%',
            trend: 'up'
          }}
          pillar="cost"
          icon={<TrendingDown className="h-5 w-5" />}
          description="potential"
        />
        <MetricCard
          title="Active Budgets"
          value={`${cloudProviderCosts.length}`}
          change={{
            value: '+1',
            trend: 'up'
          }}
          pillar="cost"
          icon={<BarChart3 className="h-5 w-5" />}
          description="this month"
        />
      </div>

      {/* Cloud Provider Cost Breakdown */}
      <div className={`${layoutPatterns.cardGrid} ${gridPatterns.providers.combined}`}>
        {cloudProviderCosts.map((provider, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CloudIcon 
                    provider={provider.provider as 'amazon' | 'microsoft' | 'google'} 
                    service="overview" 
                    size={32} 
                  />
                  <span>{provider.name}</span>
                </div>
                <Badge 
                  variant={
                    provider.trend === 'up' ? 'destructive' :
                    provider.trend === 'down' ? 'default' : 'secondary'
                  }
                >
                  {provider.trend === 'up' ? '+' : provider.trend === 'down' ? '-' : ''}
                  {Math.abs(provider.changePercent).toFixed(1)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">${provider.monthlySpend.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium">${provider.budgetLimit.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Budget</p>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (provider.monthlySpend / provider.budgetLimit) > 0.9 ? 'bg-red-500' :
                      (provider.monthlySpend / provider.budgetLimit) > 0.75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((provider.monthlySpend / provider.budgetLimit) * 100, 100)}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Top Service</p>
                    <p className="font-medium">{provider.topService}</p>
                    <p className="text-xs text-muted-foreground">${provider.topServiceCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Services</p>
                    <p className="font-medium">{provider.services} active</p>
                    <p className="text-xs text-muted-foreground">monitored</p>
                  </div>
                </div>

                <Link href={provider.href}>
                  <Button variant="outline" className="w-full">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cost Trends and Service Breakdown */}
      <div className={layoutPatterns.chartGrid}>
        <ChartCard
          title="Monthly Cost Trends"
          description="Multi-cloud spending trends over the last 8 months"
          pillar="cost"
          timeRange="Last 8 months"
          height="h-[250px]"
        >
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area type="monotone" dataKey="aws" stackId="1" stroke={chartColorSchemes.cloudProviders.aws} fill={chartColorSchemes.cloudProviders.aws} fillOpacity={0.6} name="AWS" />
              <Area type="monotone" dataKey="azure" stackId="1" stroke={chartColorSchemes.cloudProviders.azure} fill={chartColorSchemes.cloudProviders.azure} fillOpacity={0.6} name="Azure" />
              <Area type="monotone" dataKey="gcp" stackId="1" stroke={chartColorSchemes.cloudProviders.gcp} fill={chartColorSchemes.cloudProviders.gcp} fillOpacity={0.6} name="GCP" />
              <Area type="monotone" dataKey="m365" stackId="1" stroke={chartColorSchemes.cloudProviders.microsoft} fill={chartColorSchemes.cloudProviders.microsoft} fillOpacity={0.6} name="M365" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Cost by Service Category"
          description="Spend breakdown across service categories"
          pillar="cost"
          timeRange="Current month"
          height="h-[250px]"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={costByService}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="service" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="aws" fill={chartColorSchemes.cloudProviders.aws} name="AWS" />
              <Bar dataKey="azure" fill={chartColorSchemes.cloudProviders.azure} name="Azure" />
              <Bar dataKey="gcp" fill={chartColorSchemes.cloudProviders.gcp} name="GCP" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Budget Alerts and Optimization Opportunities */}
      <div className={layoutPatterns.chartGrid}>
        <ListCard
          title="Budget Alerts"
          description="Current budget status and alerts across cloud providers"
          pillar="cost"
          items={budgetAlerts.map(alert => ({
            id: `${alert.provider}-${alert.budget}`,
            name: alert.budget,
            value: `${alert.percentage}% - ${alert.daysLeft} days left`,
            status: alert.severity === 'high' ? 'error' : alert.severity === 'medium' ? 'warning' : 'info',
            icon: <CloudIcon 
              provider={alert.provider as 'amazon' | 'microsoft' | 'google'} 
              service="overview" 
              size={24} 
            />,
            action: <Badge 
              variant={
                alert.severity === 'high' ? 'destructive' : 
                alert.severity === 'medium' ? 'default' : 'secondary'
              }
            >
              ${alert.amount.toLocaleString()}
            </Badge>
          }))}
        />

        <ListCard
          title="Optimization Opportunities"
          description="Potential cost savings across your cloud infrastructure"
          pillar="cost"
          items={costOptimizationOpportunities.map(opportunity => ({
            id: `${opportunity.provider}-${opportunity.category}`,
            name: opportunity.category,
            value: opportunity.description,
            status: opportunity.severity === 'high' ? 'error' : opportunity.severity === 'medium' ? 'warning' : 'info',
            icon: <CloudIcon 
              provider={opportunity.provider as 'amazon' | 'microsoft' | 'google'} 
              service="overview" 
              size={24} 
            />,
            action: <div className="text-right">
              <p className="font-bold text-green-600">${opportunity.potential_savings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{opportunity.resources} resources</p>
            </div>
          }))}
        />
      </div>

      {/* Legacy FinOps Integration */}
      <div className={spacing.section.combined}>
        <StandardCard
          title="Detailed Cost Analysis"
          description="Comprehensive cost analysis and reporting across all cloud platforms"
          pillar="cost"
        >
          <CostCharts costData={mockCostDataItems} loading={loading} />
        </StandardCard>

        <div className={`${layoutPatterns.cardGrid} lg:grid-cols-3`}>
          <div className="lg:col-span-2">
            <BudgetTracker budgets={mockBudgets} loading={loading} />
          </div>
          
          <StandardCard
            title="Quick Actions"
            description="Common cost management tasks and shortcuts"
            pillar="cost"
          >
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Create Budget Alert
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Cost Anomaly Detection
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Generate Cost Report
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Resource Tagging
              </Button>
            </div>
          </StandardCard>
        </div>
      </div>
    </div>
  );
}
