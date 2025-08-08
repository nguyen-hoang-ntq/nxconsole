'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ChartContainer } from '@/components/charts/chart-container';
import { CloudDashboardWidgets } from '@/components/charts/cloud-dashboard-widgets';
import { LoadingState } from '@/components/shared/loading-state';
import { useToastSuccess, useToastError, useToastWarning, useToastInfo } from '@/components/notifications/toast-provider';
import { 
  DollarSign, 
  Server, 
  Shield, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Activity,
  Clock,
  ExternalLink,
  RefreshCw,
  Bell,
  Settings,
  Gauge,
  BarChart3,
  Monitor,
  Zap,
  Cloud,
  Lock
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart
} from 'recharts';
import { mockData, generateMockMetrics, generateMockCostHistory } from '@/lib/mock-data';
import Link from 'next/link';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [costHistory, setCostHistory] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [uptimeData, setUptimeData] = useState<any[]>([]);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [dashboardConfig, setDashboardConfig] = useState({
    showMetrics: true,
    showCostTrends: true,
    showPerformance: true,
    showUptime: true,
    showForecasting: true,
    showCloudWidgets: true,
    showSystemHealth: true
  });
  
  // Toast hooks
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const toastWarning = useToastWarning();
  const toastInfo = useToastInfo();
  
  const handleConfigChange = (key: string, value: boolean) => {
    setDashboardConfig(prev => ({
      ...prev,
      [key]: value
    }));
    toastInfo('Dashboard configuration updated');
  };
  
  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics(generateMockMetrics());
      setCostHistory(generateMockCostHistory(6));
      
      // Generate performance data
      setPerformanceData([
        { time: '00:00', cpu: 65, memory: 45, network: 20 },
        { time: '04:00', cpu: 72, memory: 52, network: 28 },
        { time: '08:00', cpu: 85, memory: 68, network: 45 },
        { time: '12:00', cpu: 78, memory: 61, network: 38 },
        { time: '16:00', cpu: 82, memory: 71, network: 42 },
        { time: '20:00', cpu: 69, memory: 48, network: 25 }
      ]);
      
      // Generate uptime data
      setUptimeData([
        { service: 'API Gateway', uptime: 99.9 },
        { service: 'Auth Service', uptime: 99.8 },
        { service: 'Database', uptime: 99.7 },
        { service: 'File Storage', uptime: 99.9 },
        { service: 'Analytics', uptime: 99.5 },
        { service: 'Notifications', uptime: 99.6 }
      ]);
      
      // Generate forecast data
      setForecastData([
        { month: 'Sep 24', actual: 12500, predicted: null },
        { month: 'Oct 24', actual: 13200, predicted: null },
        { month: 'Nov 24', actual: 11800, predicted: null },
        { month: 'Dec 24', actual: null, predicted: 14500 },
        { month: 'Jan 25', actual: null, predicted: 15200 },
        { month: 'Feb 25', actual: null, predicted: 15800 }
      ]);
      
      setLoading(false);
      setLastRefresh(new Date());
    };
    
    loadData();
  }, []);
  
  const handleRefresh = async () => {
    setLoading(true);
    toastInfo('Refreshing dashboard data...');
    await new Promise(resolve => setTimeout(resolve, 500));
    setMetrics(generateMockMetrics());
    setCostHistory(generateMockCostHistory(6));
    
    // Refresh performance data with slight variations
    setPerformanceData([
      { time: '00:00', cpu: 63 + Math.random() * 10, memory: 43 + Math.random() * 10, network: 18 + Math.random() * 10 },
      { time: '04:00', cpu: 70 + Math.random() * 10, memory: 50 + Math.random() * 10, network: 26 + Math.random() * 10 },
      { time: '08:00', cpu: 83 + Math.random() * 10, memory: 66 + Math.random() * 10, network: 43 + Math.random() * 10 },
      { time: '12:00', cpu: 76 + Math.random() * 10, memory: 59 + Math.random() * 10, network: 36 + Math.random() * 10 },
      { time: '16:00', cpu: 80 + Math.random() * 10, memory: 69 + Math.random() * 10, network: 40 + Math.random() * 10 },
      { time: '20:00', cpu: 67 + Math.random() * 10, memory: 46 + Math.random() * 10, network: 23 + Math.random() * 10 }
    ]);
    
    setLoading(false);
    setLastRefresh(new Date());
    toastSuccess('Dashboard data updated successfully');
  };
  
  // Demo toast notifications
  const showDemoNotifications = () => {
    toastSuccess('System Update', 'All services are running normally');
    setTimeout(() => {
      toastWarning('Budget Alert', 'AWS costs are approaching budget limit');
    }, 1000);
    setTimeout(() => {
      toastError('Security Alert', 'Critical vulnerability detected', {
        label: 'View Details',
        onClick: () => window.location.href = '/dashboard/security'
      });
    }, 2000);
  };
  
  const unreadNotifications = mockData.notifications.filter(n => !n.read);
  const criticalAlerts = mockData.securityFindings.filter(f => f.severity === 'critical');
  
  if (loading && !metrics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <LoadingState type="page" message="Loading dashboard data..." />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your cloud infrastructure.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </div>
          <Button onClick={showDemoNotifications} size="sm" variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Test
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configure Dashboard
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Dashboard Configuration
                </DialogTitle>
                <DialogDescription>
                  Customize which widgets and sections are displayed on your dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Core Widgets Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Core Widgets (Required)
                  </h4>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <Label htmlFor="metrics" className="flex items-center gap-3">
                      <Gauge className="h-4 w-4 text-blue-600" />
                      <div className="flex flex-col">
                        <span className="font-medium">Key Metrics</span>
                        <span className="text-sm text-muted-foreground">Cost, resources, security overview</span>
                      </div>
                    </Label>
                    <div className="flex items-center gap-2">
                      <Lock className="h-3 w-3 text-muted-foreground" />
                      <Switch
                        id="metrics"
                        checked={true}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Analytics & Charts Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Analytics & Charts
                  </h4>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                    <Label htmlFor="cost-trends" className="flex items-center gap-3 cursor-pointer">
                      <BarChart3 className="h-4 w-4 text-green-600" />
                      <div className="flex flex-col">
                        <span className="font-medium">Resource Utilization</span>
                        <span className="text-sm text-muted-foreground">Cloud resource usage across providers</span>
                      </div>
                    </Label>
                    <Switch
                      id="cost-trends"
                      checked={dashboardConfig.showCostTrends}
                      onCheckedChange={(checked) => handleConfigChange('showCostTrends', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                    <Label htmlFor="forecasting" className="flex items-center gap-3 cursor-pointer">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <div className="flex flex-col">
                        <span className="font-medium">Cost Forecasting</span>
                        <span className="text-sm text-muted-foreground">Future cost predictions</span>
                      </div>
                    </Label>
                    <Switch
                      id="forecasting"
                      checked={dashboardConfig.showForecasting}
                      onCheckedChange={(checked) => handleConfigChange('showForecasting', checked)}
                    />
                  </div>
                </div>

                {/* System Monitoring Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    System Monitoring
                  </h4>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                    <Label htmlFor="performance" className="flex items-center gap-3 cursor-pointer">
                      <Monitor className="h-4 w-4 text-orange-600" />
                      <div className="flex flex-col">
                        <span className="font-medium">System Performance</span>
                        <span className="text-sm text-muted-foreground">CPU, memory, network monitoring</span>
                      </div>
                    </Label>
                    <Switch
                      id="performance"
                      checked={dashboardConfig.showPerformance}
                      onCheckedChange={(checked) => handleConfigChange('showPerformance', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                    <Label htmlFor="uptime" className="flex items-center gap-3 cursor-pointer">
                      <Zap className="h-4 w-4 text-yellow-600" />
                      <div className="flex flex-col">
                        <span className="font-medium">Service Uptime</span>
                        <span className="text-sm text-muted-foreground">Service availability metrics</span>
                      </div>
                    </Label>
                    <Switch
                      id="uptime"
                      checked={dashboardConfig.showUptime}
                      onCheckedChange={(checked) => handleConfigChange('showUptime', checked)}
                    />
                  </div>
                </div>

                {/* Cloud Provider Widgets Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Cloud Provider Widgets
                  </h4>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                    <Label htmlFor="cloud-widgets" className="flex items-center gap-3 cursor-pointer">
                      <Cloud className="h-4 w-4 text-cyan-600" />
                      <div className="flex flex-col">
                        <span className="font-medium">Cloud Provider Dashboards</span>
                        <span className="text-sm text-muted-foreground">AWS, Azure, GCP, M365 widgets</span>
                      </div>
                    </Label>
                    <Switch
                      id="cloud-widgets"
                      checked={dashboardConfig.showCloudWidgets}
                      onCheckedChange={(checked) => handleConfigChange('showCloudWidgets', checked)}
                    />
                  </div>
                </div>

                {/* Quick Actions Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Quick Actions & Alerts
                  </h4>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <Label htmlFor="quick-actions" className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-red-600" />
                      <div className="flex flex-col">
                        <span className="font-medium">Quick Actions & Recent Alerts</span>
                        <span className="text-sm text-muted-foreground">Navigation shortcuts and notifications</span>
                      </div>
                    </Label>
                    <div className="flex items-center gap-2">
                      <Lock className="h-3 w-3 text-muted-foreground" />
                      <Switch
                        id="quick-actions"
                        checked={true}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleRefresh} disabled={loading} size="sm" variant="outline">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Key Metrics */}
      {dashboardConfig.showMetrics && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Monthly Cost"
          value={`$${mockData.costData.total.toLocaleString()}`}
          change={{
            value: mockData.costData.previousPeriod?.changePercent || 0,
            type: 'increase',
            period: 'last month'
          }}
          trend={mockData.costData.previousPeriod?.changePercent! > 0 ? 'down' : 'up'}
          icon={DollarSign}
          loading={loading}
        />
        
        <MetricCard
          title="Active Resources"
          value={metrics?.totalResources || 0}
          change={{
            value: 5.2,
            type: 'increase',
            period: 'last week'
          }}
          trend="up"
          icon={Server}
          loading={loading}
        />
        
        <MetricCard
          title="Security Score"
          value={`${metrics?.complianceScore || 0}%`}
          change={{
            value: 2.1,
            type: 'increase',
            period: 'last week'
          }}
          trend="up"
          icon={Shield}
          loading={loading}
        />
        
        <MetricCard
          title="Total Users"
          value={metrics?.totalUsers || 0}
          change={{
            value: 1.2,
            type: 'increase',
            period: 'last month'
          }}
          trend="up"
          icon={Users}
          loading={loading}
        />
        </div>
      )}
      
      {/* Cloud Provider Widgets */}
      {dashboardConfig.showCloudWidgets && (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Cloud Providers Overview</h2>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <CloudDashboardWidgets.AWSCostWidget
            title="AWS Monthly Cost"
            value={2847}
            unit="$"
            trend="up"
            trendPercentage={12}
            status="warning"
            showTrend={true}
            showActions={true}
            onRefresh={() => console.log('Refresh AWS cost data')}
            onClick={() => console.log('Navigate to AWS cost details')}
          />
          
          <CloudDashboardWidgets.AzureCostWidget
            title="Azure Monthly Cost"
            value={1653}
            unit="$"
            trend="down"
            trendPercentage={8}
            status="success"
            showTrend={true}
            showActions={true}
            onRefresh={() => console.log('Refresh Azure cost data')}
            onClick={() => console.log('Navigate to Azure cost details')}
          />
          
          <CloudDashboardWidgets.GCPCostWidget
            title="GCP Monthly Cost"
            value={934}
            unit="$"
            trend="neutral"
            trendPercentage={2}
            status="success"
            showTrend={true}
            showActions={true}
            onRefresh={() => console.log('Refresh GCP cost data')}
            onClick={() => console.log('Navigate to GCP cost details')}
          />
          
          <CloudDashboardWidgets.GoogleWorkspaceLicenseWidget
            title="Google Workspace Licenses"
            value={245}
            unit=" users"
            trend="up"
            trendPercentage={5}
            status="success"
            showTrend={true}
            showActions={true}
            onRefresh={() => console.log('Refresh Google Workspace data')}
            onClick={() => console.log('Navigate to Google Workspace details')}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CloudDashboardWidgets.CloudUsageWidget
            provider="amazon"
            service="ec2"
            title="EC2 Instance Usage"
            current={42}
            limit={100}
            unit=" instances"
            status="success"
          />
          
          <CloudDashboardWidgets.CloudUsageWidget
            provider="microsoft"
            service="vm"
            title="Azure VM Usage"
            current={28}
            limit={50}
            unit=" VMs"
            status="success"
          />
          
          <CloudDashboardWidgets.CloudUsageWidget
            provider="google"
            service="compute"
            title="Compute Engine Usage"
            current={35}
            limit={40}
            unit=" instances"
            status="warning"
          />
          
          <CloudDashboardWidgets.CloudUsageWidget
            provider="google"
            service="storage"
            title="Cloud Storage Usage"
            current={245}
            limit={500}
            unit=" GB"
            status="success"
          />
          
          <CloudDashboardWidgets.CloudUsageWidget
            provider="microsoft"
            service="office365"
            title="Microsoft 365 Licenses"
            current={156}
            limit={200}
            unit=" licenses"
            status="success"
          />
          
          <CloudDashboardWidgets.CloudUsageWidget
            provider="google"
            service="admin"
            title="Google Workspace Users"
            current={89}
            limit={100}
            unit=" users"
            status="warning"
          />
        </div>
        
        {/* System Health and Monitoring */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">System Health & Monitoring</h2>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="System Uptime"
              value="99.8%"
              change={{ value: 0.2, type: "increase", period: "vs last month" }}
              trend="up"
              icon={Server}
              loading={loading}
            />
            
            <MetricCard
              title="Average Response Time"
              value="124ms"
              change={{ value: 32, type: "decrease", period: "vs last month" }}
              trend="down"
              icon={Activity}
              loading={loading}
            />
            
            <MetricCard
              title="Active Connections"
              value="1,247"
              change={{ value: 58, type: "increase", period: "vs last month" }}
              trend="up"
              icon={Users}
              loading={loading}
            />
            
            <MetricCard
              title="Error Rate"
              value="0.02%"
              change={{ value: 0.03, type: "decrease", period: "vs last month" }}
              trend="down"
              icon={AlertTriangle}
              loading={loading}
            />
          </div>
        </div>
        </div>
      )}
      
      {/* Cost Analysis and Operational Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Cost Analysis & Operational Status</h2>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Resource Utilization Chart */}
          {dashboardConfig.showCostTrends && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Resource Utilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer title="Cloud resource utilization across providers">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={[
                    { provider: 'AWS', cpu: 75, memory: 68, storage: 82, cost: 2500 },
                    { provider: 'Azure', cpu: 62, memory: 74, storage: 59, cost: 1800 },
                    { provider: 'GCP', cpu: 58, memory: 61, storage: 73, cost: 1200 },
                    { provider: 'M365', cpu: 45, memory: 52, storage: 48, cost: 800 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="provider" 
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'Cloud Providers', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 } }}
                    />
                    <YAxis 
                      yAxisId="left"
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                      label={{ value: 'Utilization (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 } }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'Cost (USD)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 } }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                        backdropFilter: 'none'
                      }}
                      labelStyle={{ color: 'hsl(var(--popover-foreground))', fontWeight: 600 }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                      formatter={(value, name) => {
                        if (name === 'cost') return [`$${value}`, 'Monthly Cost'];
                        return [`${value}%`, name === 'cpu' ? 'CPU' : name === 'memory' ? 'Memory' : 'Storage'];
                      }}
                    />
                    <Bar yAxisId="left" dataKey="cpu" fill="#3b82f6" name="cpu" />
                    <Bar yAxisId="left" dataKey="memory" fill="#10b981" name="memory" />
                    <Bar yAxisId="left" dataKey="storage" fill="#f59e0b" name="storage" />
                    <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={3} name="cost" />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          )}
          
          {/* System Performance Chart */}
          {dashboardConfig.showPerformance && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer title="Real-time system performance metrics">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'Time', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 } }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'Performance (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 } }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                        backdropFilter: 'none'
                      }}
                      labelStyle={{ color: 'hsl(var(--popover-foreground))', fontWeight: 600 }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cpu" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6}
                      name="CPU Usage (%)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="memory" 
                      stackId="2"
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.6}
                      name="Memory Usage (%)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="network" 
                      stackId="3"
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.6}
                      name="Network Usage (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          )}
        </div>

        {/* Additional Operational Monitoring Charts */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {/* Service Uptime Chart */}
          {dashboardConfig.showUptime && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Service Uptime & Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer title="Service availability over the past 30 days">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={uptimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="service" 
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={false}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      label={{ value: 'Services', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 } }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={false}
                      domain={[95, 100]}
                      label={{ value: 'Uptime (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 } }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                        backdropFilter: 'none'
                      }}
                      labelStyle={{ color: 'hsl(var(--popover-foreground))', fontWeight: 600 }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                      formatter={(value) => [`${value}%`, 'Uptime']}
                    />
                    <Bar 
                      dataKey="uptime" 
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          )}

          {/* Predictive Analytics Chart */}
          {dashboardConfig.showForecasting && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Cost Forecasting & Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer title="Predicted costs for next 6 months">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                      tickLine={false}
                      label={{ value: 'Month', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 } }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'Cost (USD)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 } }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                        backdropFilter: 'none'
                      }}
                      labelStyle={{ color: 'hsl(var(--popover-foreground))', fontWeight: 600 }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                    />
                    <Bar 
                      dataKey="actual" 
                      fill="#3b82f6" 
                      name="Actual Cost"
                      radius={[2, 2, 0, 0]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Predicted Cost"
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          )}
        </div>
      </div>
      
      {/* Quick Actions & Alerts (existing) */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <Button asChild variant="outline" className="justify-start">
                <Link href="/dashboard/finops">
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Cost Analysis
                  <ExternalLink className="ml-auto h-3 w-3" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="justify-start">
                <Link href="/dashboard/resources">
                  <Server className="mr-2 h-4 w-4" />
                  Manage Resources
                  <ExternalLink className="ml-auto h-3 w-3" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="justify-start">
                <Link href="/dashboard/security">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Review
                  {criticalAlerts.length > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {criticalAlerts.length}
                    </Badge>
                  )}
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="justify-start">
                <Link href="/dashboard/ai-insights">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  AI Insights
                  <Badge variant="secondary" className="ml-auto">
                    New
                  </Badge>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
              {unreadNotifications.length > 0 && (
                <Badge variant="destructive">{unreadNotifications.length}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unreadNotifications.slice(0, 4).map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0">
                    {notification.severity === 'error' && (
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2" />
                    )}
                    {notification.severity === 'warning' && (
                      <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2" />
                    )}
                    {notification.severity === 'info' && (
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {notification.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {unreadNotifications.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">No recent alerts</p>
                </div>
              )}
              
              {unreadNotifications.length > 0 && (
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/notifications">
                    View all notifications
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">New EC2 instance launched</p>
                <p className="text-xs text-muted-foreground">web-server-prod-03 • 2 hours ago</p>
              </div>
              <Badge variant="outline">AWS</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="h-2 w-2 bg-yellow-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">Budget threshold exceeded</p>
                <p className="text-xs text-muted-foreground">AWS Production budget at 94% • 3 hours ago</p>
              </div>
              <Badge variant="destructive">Alert</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">Security scan completed</p>
                <p className="text-xs text-muted-foreground">3 new findings identified • 5 hours ago</p>
              </div>
              <Badge variant="outline">Security</Badge>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button asChild variant="ghost" className="w-full">
              <Link href="/notifications">
                View all activity
                <ExternalLink className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
