'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ChartContainer } from '@/components/charts/chart-container';
import { LoadingState } from '@/components/shared/loading-state';
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
  RefreshCw
} from 'lucide-react';
import { mockData, generateMockMetrics, generateMockCostHistory } from '@/lib/mock-data';
import Link from 'next/link';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [costHistory, setCostHistory] = useState<any[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  
  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics(generateMockMetrics());
      setCostHistory(generateMockCostHistory(6));
      setLoading(false);
      setLastRefresh(new Date());
    };
    
    loadData();
  }, []);
  
  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setMetrics(generateMockMetrics());
    setCostHistory(generateMockCostHistory(6));
    setLoading(false);
    setLastRefresh(new Date());
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
          <Button onClick={handleRefresh} disabled={loading} size="sm" variant="outline">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Key Metrics */}
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
      
      {/* Quick Actions & Alerts */}
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
                <Link href="/finops">
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Cost Analysis
                  <ExternalLink className="ml-auto h-3 w-3" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="justify-start">
                <Link href="/resources">
                  <Server className="mr-2 h-4 w-4" />
                  Manage Resources
                  <ExternalLink className="ml-auto h-3 w-3" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="justify-start">
                <Link href="/security">
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
                <Link href="/ai-insights">
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
                <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg border">
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
                    <p className="text-sm font-medium text-foreground">
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
      
      {/* Platform Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        {mockData.costData.breakdown.map((platform) => (
          <Card key={platform.platform}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {platform.platform}
              </CardTitle>
              <div className={`h-2 w-2 rounded-full ${
                platform.platform === 'AWS' ? 'bg-orange-500' :
                platform.platform === 'Azure' ? 'bg-blue-500' : 'bg-green-500'
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${platform.amount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {((platform.amount / mockData.costData.total) * 100).toFixed(1)}% of total spend
              </p>
              <div className="mt-3 space-y-1">
                {platform.services.slice(0, 2).map((service) => (
                  <div key={service.serviceType} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{service.serviceType}</span>
                    <span className="font-medium">${service.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">New EC2 instance launched</p>
                <p className="text-xs text-muted-foreground">web-server-prod-03 • 2 hours ago</p>
              </div>
              <Badge variant="outline">AWS</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg border">
              <div className="h-2 w-2 bg-yellow-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Budget threshold exceeded</p>
                <p className="text-xs text-muted-foreground">AWS Production budget at 94% • 3 hours ago</p>
              </div>
              <Badge variant="destructive">Alert</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg border">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Security scan completed</p>
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
