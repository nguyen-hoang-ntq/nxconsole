'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  Database,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Zap,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { 
  AreaChartComponent, 
  BarChartComponent, 
  LineChartComponent, 
  GaugeChartComponent 
} from '@/components/charts';

// Mock data for performance overview
const performanceOverview = {
  totalResources: 1247,
  healthyResources: 1089,
  warningResources: 128,
  criticalResources: 30,
  avgResponseTime: 145,
  uptime: 99.7,
  throughput: 2847
};

const cloudProviders = [
  {
    name: 'AWS',
    icon: '🟧',
    resources: 520,
    health: 97.2,
    alerts: 12,
    href: '/dashboard/performance-monitoring/aws'
  },
  {
    name: 'Azure',
    icon: '🔵',
    resources: 384,
    health: 98.1,
    alerts: 8,
    href: '/dashboard/performance-monitoring/azure'
  },
  {
    name: 'GCP',
    icon: '🔴',
    resources: 343,
    health: 99.1,
    alerts: 5,
    href: '/dashboard/performance-monitoring/gcp'
  }
];

const performanceMetrics = [
  { name: 'CPU Usage', value: 72, status: 'warning', change: '+5%' },
  { name: 'Memory Usage', value: 68, status: 'normal', change: '-2%' },
  { name: 'Disk I/O', value: 45, status: 'normal', change: '+1%' },
  { name: 'Network Latency', value: 23, status: 'good', change: '-8%' },
  { name: 'Database Response', value: 156, status: 'warning', change: '+12%' },
  { name: 'API Response Time', value: 89, status: 'normal', change: '-3%' }
];

// Mock chart data
const responseTimeData = [
  { name: '00:00', aws: 120, azure: 110, gcp: 95 },
  { name: '04:00', aws: 135, azure: 125, gcp: 108 },
  { name: '08:00', aws: 180, azure: 165, gcp: 142 },
  { name: '12:00', aws: 220, azure: 195, gcp: 178 },
  { name: '16:00', aws: 190, azure: 175, gcp: 158 },
  { name: '20:00', aws: 155, azure: 140, gcp: 125 }
];

const throughputData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 2210 },
  { name: 'Mar', value: 2290 },
  { name: 'Apr', value: 2000 },
  { name: 'May', value: 2181 },
  { name: 'Jun', value: 2500 },
  { name: 'Jul', value: 2847 }
];

const resourceUtilizationData = [
  { name: 'Compute', aws: 65, azure: 72, gcp: 58 },
  { name: 'Storage', aws: 78, azure: 81, gcp: 69 },
  { name: 'Database', aws: 82, azure: 75, gcp: 88 },
  { name: 'Network', aws: 45, azure: 52, gcp: 41 }
];

export default function PerformanceMonitoringPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 98) return 'text-green-600';
    if (health >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Monitoring</h1>
          <p className="text-muted-foreground">
            Monitor and analyze performance across all cloud platforms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Last 24h
          </Button>
          <Button size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Live View
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceOverview.totalResources}</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceOverview.uptime}%</div>
            <p className="text-xs text-muted-foreground">
              Overall uptime
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceOverview.avgResponseTime}ms</div>
            <p className="text-xs text-green-600">
              -8% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceOverview.throughput}</div>
            <p className="text-xs text-green-600">
              req/sec +12%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cloud Provider Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Cloud Platforms Overview
          </CardTitle>
          <CardDescription>
            Performance summary across AWS, Azure, and Google Cloud Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cloudProviders.map((provider) => (
              <Link 
                key={provider.name} 
                href={provider.href}
                className="block transition-transform hover:scale-105"
              >
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{provider.icon}</span>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                      </div>
                      <Badge variant={provider.alerts > 10 ? 'destructive' : provider.alerts > 5 ? 'secondary' : 'default'}>
                        {provider.alerts} alerts
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Resources</span>
                        <span className="font-medium">{provider.resources}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Health Score</span>
                        <span className={`font-medium ${getHealthColor(provider.health)}`}>
                          {provider.health}%
                        </span>
                      </div>
                      <Progress value={provider.health} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Trends</CardTitle>
            <CardDescription>Average response time across platforms (ms)</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChartComponent
              data={responseTimeData}
              xDataKey="name"
              lines={[
                { dataKey: 'aws', name: 'AWS', color: '#FF9500' },
                { dataKey: 'azure', name: 'Azure', color: '#0078D4' },
                { dataKey: 'gcp', name: 'GCP', color: '#4285F4' }
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        {/* System Health Gauge */}
        <Card>
          <CardHeader>
            <CardTitle>Overall System Health</CardTitle>
            <CardDescription>Real-time health score across all platforms</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <GaugeChartComponent
              value={performanceOverview.uptime}
              max={100}
              title="Uptime %"
              size="lg"
            />
          </CardContent>
        </Card>

        {/* Throughput Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Throughput Trends</CardTitle>
            <CardDescription>Requests per second over time</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartComponent
              data={throughputData}
              xDataKey="name"
              areas={[
                { dataKey: 'value', name: 'Throughput', color: '#3b82f6' }
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Resource Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
            <CardDescription>Current utilization across resource types</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={resourceUtilizationData}
              xDataKey="name"
              bars={[
                { dataKey: 'aws', name: 'AWS', color: '#FF9500' },
                { dataKey: 'azure', name: 'Azure', color: '#0078D4' },
                { dataKey: 'gcp', name: 'GCP', color: '#4285F4' }
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Metrics</CardTitle>
          <CardDescription>Real-time performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceMetrics.map((metric) => (
              <Card key={metric.name} className={`border ${getStatusColor(metric.status)}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <Badge variant="outline" className={getStatusColor(metric.status)}>
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">{metric.value}{metric.name.includes('Time') ? 'ms' : '%'}</div>
                  <Progress 
                    value={metric.value} 
                    className="h-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage and configure performance monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="w-6 h-6 mb-2" />
              Create Alert
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              Custom Dashboard
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Database className="w-6 h-6 mb-2" />
              Export Metrics
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <AlertTriangle className="w-6 h-6 mb-2" />
              View Incidents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
