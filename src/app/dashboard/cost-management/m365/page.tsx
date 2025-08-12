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
  Users,
  Building
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock M365 cost data
const m365CostTrends = [
  { date: '2024-08-01', licenses: 2400, storage: 480, telephony: 320, security: 280, other: 220 },
  { date: '2024-08-08', licenses: 2450, storage: 510, telephony: 340, security: 300, other: 240 },
  { date: '2024-08-15', licenses: 2380, storage: 490, telephony: 310, security: 290, other: 230 },
  { date: '2024-08-22', licenses: 2520, storage: 530, telephony: 360, security: 320, other: 270 },
  { date: '2024-08-29', licenses: 2580, storage: 540, telephony: 380, security: 340, other: 280 }
];

const m365ServiceCosts = [
  { name: 'Microsoft 365 E3', cost: 1890, percentage: 38.4, change: 5.2, users: 189 },
  { name: 'Microsoft 365 E5', cost: 690, percentage: 14.0, change: 8.1, users: 46 },
  { name: 'OneDrive Storage', cost: 540, percentage: 11.0, change: 12.5, users: null },
  { name: 'Teams Phone', cost: 380, percentage: 7.7, change: 18.8, users: 95 },
  { name: 'Defender for Office 365', cost: 340, percentage: 6.9, change: 15.3, users: 235 },
  { name: 'Power BI Pro', cost: 280, percentage: 5.7, change: -2.1, users: 56 },
  { name: 'Exchange Online Plan 2', cost: 220, percentage: 4.5, change: 0.8, users: 44 },
  { name: 'SharePoint Online', cost: 180, percentage: 3.7, change: 6.4, users: null },
  { name: 'Microsoft Intune', cost: 160, percentage: 3.3, change: 22.1, users: 80 },
  { name: 'Other Services', cost: 430, percentage: 8.7, change: 7.8, users: null }
];

const licenseUtilization = [
  { 
    plan: 'Microsoft 365 E3', 
    purchased: 200, 
    assigned: 189, 
    active_users: 165, 
    utilization: 82.5, 
    cost_per_user: 10.0,
    inactive_cost: 350
  },
  { 
    plan: 'Microsoft 365 E5', 
    purchased: 50, 
    assigned: 46, 
    active_users: 41, 
    utilization: 82.0, 
    cost_per_user: 15.0,
    inactive_cost: 135
  },
  { 
    plan: 'Teams Phone', 
    purchased: 100, 
    assigned: 95, 
    active_users: 78, 
    utilization: 78.0, 
    cost_per_user: 4.0,
    inactive_cost: 88
  },
  { 
    plan: 'Power BI Pro', 
    purchased: 60, 
    assigned: 56, 
    active_users: 48, 
    utilization: 80.0, 
    cost_per_user: 5.0,
    inactive_cost: 60
  }
];

const departmentCosts = [
  { department: 'Engineering', cost: 1680, users: 84, avg_cost: 20.0, growth: 8.2 },
  { department: 'Sales', cost: 1240, users: 62, avg_cost: 20.0, growth: 12.5 },
  { department: 'Marketing', cost: 820, users: 41, avg_cost: 20.0, growth: 5.8 },
  { department: 'HR', cost: 480, users: 24, avg_cost: 20.0, growth: -2.1 },
  { department: 'Finance', cost: 360, users: 18, avg_cost: 20.0, growth: 3.4 },
  { department: 'Support', cost: 540, users: 27, avg_cost: 20.0, growth: 15.7 }
];

const m365Optimizations = [
  {
    category: 'Unused License Assignments',
    potential_savings: 633,
    resources: 27,
    severity: 'high',
    description: 'Licensed users who haven\'t signed in for 30+ days',
    recommendation: 'Unassign licenses from inactive users',
    service: 'Licensing'
  },
  {
    category: 'Downgrade Opportunities',
    potential_savings: 420,
    resources: 14,
    severity: 'medium',
    description: 'E5 users not utilizing advanced features',
    recommendation: 'Downgrade to E3 or Business Premium licenses',
    service: 'Licensing'
  },
  {
    category: 'Duplicate License Assignments',
    potential_savings: 280,
    resources: 8,
    severity: 'medium',
    description: 'Users with overlapping license capabilities',
    recommendation: 'Consolidate to single comprehensive license',
    service: 'Licensing'
  },
  {
    category: 'OneDrive Storage Optimization',
    potential_savings: 180,
    resources: 45,
    severity: 'low',
    description: 'Users consuming minimal OneDrive storage',
    recommendation: 'Move to lower storage tier or optimize allocation',
    service: 'Storage'
  },
  {
    category: 'Teams Phone Usage Review',
    potential_savings: 220,
    resources: 22,
    severity: 'medium',
    description: 'Phone licenses with minimal calling activity',
    recommendation: 'Remove phone licenses for low-usage users',
    service: 'Communication'
  }
];

const budgetAlerts = [
  {
    name: 'Engineering Department',
    budget: 1800,
    spent: 1680,
    percentage: 93.3,
    status: 'critical',
    forecast: 1750,
    daysLeft: 3
  },
  {
    name: 'Sales Department',
    budget: 1400,
    spent: 1240,
    percentage: 88.6,
    status: 'warning',
    forecast: 1320,
    daysLeft: 3
  },
  {
    name: 'Enterprise Mobility',
    budget: 800,
    spent: 520,
    percentage: 65.0,
    status: 'good',
    forecast: 650,
    daysLeft: 3
  }
];

const licenseComplianceIssues = [
  {
    issue: 'Over-assigned E5 licenses',
    severity: 'high',
    affected_users: 4,
    cost_impact: 240,
    description: 'More licenses assigned than purchased',
    action_required: 'Purchase additional licenses or reassign users'
  },
  {
    issue: 'Expired guest user licenses',
    severity: 'medium',
    affected_users: 12,
    cost_impact: 0,
    description: 'Guest users with expired access consuming licenses',
    action_required: 'Remove or renew guest user access'
  },
  {
    issue: 'Inactive admin accounts',
    severity: 'low',
    affected_users: 3,
    cost_impact: 135,
    description: 'Admin accounts not used in 90+ days',
    action_required: 'Review and deactivate unused admin accounts'
  }
];

const usageAnalytics = [
  {
    service: 'Teams',
    active_users: 235,
    total_users: 280,
    utilization: 83.9,
    trend: 'up',
    key_metric: '4.2 hrs avg daily usage'
  },
  {
    service: 'SharePoint',
    active_users: 198,
    total_users: 280,
    utilization: 70.7,
    trend: 'stable',
    key_metric: '1.2 GB avg storage per user'
  },
  {
    service: 'OneDrive',
    active_users: 256,
    total_users: 280,
    utilization: 91.4,
    trend: 'up',
    key_metric: '2.8 GB avg storage per user'
  },
  {
    service: 'Exchange',
    active_users: 275,
    total_users: 280,
    utilization: 98.2,
    trend: 'stable',
    key_metric: '127 emails avg per day'
  }
];

export default function M365CostPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [loading, setLoading] = useState(false);

  const totalM365Cost = m365ServiceCosts.reduce((sum, service) => sum + service.cost, 0);
  const monthlyGrowth = 7.8;
  const totalOptimizationSavings = m365Optimizations.reduce((sum, opt) => sum + opt.potential_savings, 0);
  const totalUsers = licenseUtilization.reduce((sum, license) => sum + license.purchased, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudIcon provider="microsoft" service="office365" size={32} />
          <div>
            <h1 className="text-3xl font-bold">Microsoft 365 Cost Management</h1>
            <p className="text-muted-foreground">
              Monitor and optimize your Microsoft 365 license spending
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            License Report
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Admin Center
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Licenses
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total M365 Spend"
          value={`$${totalM365Cost.toLocaleString()}`}
          change={{
            value: monthlyGrowth,
            type: 'increase',
            period: 'vs last month'
          }}
          trend="up"
          icon={DollarSign}
        />
        <MetricCard
          title="License Optimization"
          value={`$${totalOptimizationSavings.toLocaleString()}`}
          change={{
            value: 18.4,
            type: 'increase',
            period: 'potential savings'
          }}
          trend="up"
          icon={TrendingDown}
        />
        <MetricCard
          title="Total Licensed Users"
          value={totalUsers.toString()}
          change={{
            value: 4.2,
            type: 'increase',
            period: 'last 30 days'
          }}
          trend="up"
          icon={Users}
        />
        <MetricCard
          title="Average Cost per User"
          value="$18.75"
          change={{
            value: 2.3,
            type: 'increase',
            period: 'per month'
          }}
          trend="up"
          icon={CreditCard}
        />
      </div>

      {/* Cost Trends and Service Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              M365 Cost Trends by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={m365CostTrends}>
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
                <Area type="monotone" dataKey="licenses" stackId="1" stroke="#0078d4" fill="#0078d4" fillOpacity={0.8} name="Licenses" />
                <Area type="monotone" dataKey="storage" stackId="1" stroke="#00bcf2" fill="#00bcf2" fillOpacity={0.8} name="Storage" />
                <Area type="monotone" dataKey="telephony" stackId="1" stroke="#40e0d0" fill="#40e0d0" fillOpacity={0.8} name="Telephony" />
                <Area type="monotone" dataKey="security" stackId="1" stroke="#7b68ee" fill="#7b68ee" fillOpacity={0.8} name="Security" />
                <Area type="monotone" dataKey="other" stackId="1" stroke="#da70d6" fill="#da70d6" fillOpacity={0.8} name="Other" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top M365 Services by Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {m365ServiceCosts.slice(0, 8).map((service, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CloudIcon provider="microsoft" service={service.name.toLowerCase().replace(/ /g, '-')} size={20} />
                      <div>
                        <span className="font-medium text-sm">{service.name}</span>
                        {service.users && (
                          <p className="text-xs text-muted-foreground">{service.users} users</p>
                        )}
                      </div>
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
      </div>

      {/* License Utilization and Department Costs */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              License Utilization Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {licenseUtilization.map((license, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{license.plan}</span>
                    <div className="text-right">
                      <p className="font-bold">{license.utilization.toFixed(1)}%</p>
                      <p className="text-sm text-red-600">${license.inactive_cost} waste</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Active: {license.active_users}</span>
                    <span>Assigned: {license.assigned}</span>
                    <span>Purchased: {license.purchased}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        license.utilization > 85 ? 'bg-green-500' :
                        license.utilization > 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${license.utilization}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ${license.cost_per_user}/user/month • {license.purchased - license.active_users} inactive
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Cost by Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentCosts.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{dept.department}</p>
                    <p className="text-sm text-muted-foreground">{dept.users} users</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${dept.cost.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">
                        ${dept.avg_cost}/user
                      </span>
                      <div className={`flex items-center gap-1 ${
                        dept.growth > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {dept.growth > 0 ? 
                          <TrendingUp className="h-3 w-3" /> : 
                          <TrendingDown className="h-3 w-3" />
                        }
                        <span className="text-xs">{Math.abs(dept.growth)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            M365 Service Usage Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {usageAnalytics.map((usage, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CloudIcon provider="microsoft" service={usage.service.toLowerCase()} size={20} />
                    <span className="font-medium text-sm">{usage.service}</span>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${
                    usage.trend === 'up' ? 'bg-green-500' :
                    usage.trend === 'down' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">{usage.utilization.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">
                    {usage.active_users}/{usage.total_users} active users
                  </p>
                  <p className="text-xs text-blue-600">{usage.key_metric}</p>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div 
                    className={`h-1.5 rounded-full ${
                      usage.utilization > 85 ? 'bg-green-500' :
                      usage.utilization > 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${usage.utilization}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Alerts and Compliance Issues */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              M365 Budget Alerts
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
              <Shield className="h-5 w-5" />
              License Compliance Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {licenseComplianceIssues.map((issue, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{issue.issue}</h3>
                    <Badge 
                      variant={issue.severity === 'high' ? 'destructive' : 
                              issue.severity === 'medium' ? 'default' : 'secondary'}
                    >
                      {issue.severity}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">{issue.description}</p>
                    <p className="text-xs font-medium text-blue-600">{issue.action_required}</p>
                    <div className="flex justify-between text-xs">
                      <span>{issue.affected_users} users affected</span>
                      {issue.cost_impact > 0 && (
                        <span className="text-red-600">${issue.cost_impact} monthly impact</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* License Optimization Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            M365 License Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {m365Optimizations.map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
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
                      {opportunity.resources} {opportunity.service === 'Licensing' ? 'users' : 'resources'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
