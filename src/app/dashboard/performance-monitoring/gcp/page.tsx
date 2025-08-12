'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricCard } from '@/components/dashboard/metric-card';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Network,
  Server,
  Database,
  Zap,
  Clock,
  AlertTriangle,
  TrendingUp,
  Cloud
} from 'lucide-react';
import { 
  HeatmapComponent,
  LineChartComponent,
  AreaChartComponent,
  BarChartComponent 
} from '@/components/charts';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';

// Mock GCP performance data
const computeEngineMetrics = [
  { time: '00:00', cpu: 38, memory: 62, disk: 45, network: 95 },
  { time: '00:05', cpu: 42, memory: 64, disk: 48, network: 108 },
  { time: '00:10', cpu: 45, memory: 66, disk: 52, network: 115 },
  { time: '00:15', cpu: 40, memory: 63, disk: 47, network: 102 },
  { time: '00:20', cpu: 43, memory: 65, disk: 50, network: 112 },
  { time: '00:25', cpu: 41, memory: 64, disk: 49, network: 106 }
];

const cloudSqlMetrics = [
  { time: '00:00', cpu: 35, memory: 58, connections: 22, qps: 145 },
  { time: '00:05', cpu: 38, memory: 61, connections: 25, qps: 162 },
  { time: '00:10', cpu: 42, memory: 64, connections: 28, qps: 178 },
  { time: '00:15', cpu: 36, memory: 59, connections: 24, qps: 155 },
  { time: '00:20', cpu: 40, memory: 62, connections: 27, qps: 168 },
  { time: '00:25', cpu: 39, memory: 61, connections: 26, qps: 160 }
];

const cloudFunctionMetrics = [
  { service: 'auth-handler', invocations: 1150, duration: 320, memory: 256, errors: 5 },
  { service: 'data-processor', invocations: 850, duration: 850, memory: 512, errors: 2 },
  { service: 'pubsub-handler', invocations: 640, duration: 180, memory: 128, errors: 8 },
  { service: 'image-transform', invocations: 380, duration: 650, memory: 1024, errors: 1 }
];

const gcpServices = [
  { name: 'Compute Engine', instances: 28, healthy: 27, status: 'healthy', utilization: 63 },
  { name: 'Cloud SQL', instances: 5, healthy: 5, status: 'healthy', utilization: 58 },
  { name: 'Cloud Functions', functions: 20, healthy: 19, status: 'warning', utilization: 45 },
  { name: 'Cloud Storage', buckets: 15, healthy: 15, status: 'healthy', utilization: 32 },
  { name: 'Cloud Run', services: 9, healthy: 9, status: 'healthy', utilization: 51 }
];

const performanceAlerts = [
  {
    severity: 'medium',
    service: 'Cloud Functions',
    message: 'Cold start latency increased',
    resource: 'auth-handler-function',
    timestamp: '5 minutes ago'
  },
  {
    severity: 'low',
    service: 'Compute Engine',
    message: 'Instance CPU utilization spike',
    resource: 'web-server-instance-2',
    timestamp: '14 minutes ago'
  },
  {
    severity: 'medium',
    service: 'Cloud SQL',
    message: 'Query performance degradation',
    resource: 'prod-mysql-instance',
    timestamp: '22 minutes ago'
  }
];

// GCP Performance heatmap data - Resource utilization across services and time
const gcpPerformanceHeatmapData = [
  // Compute Engine instances
  { x: '00:00', y: 'CE-web-01', value: 38, label: 'Web Instance 1' },
  { x: '00:05', y: 'CE-web-01', value: 44, label: 'Web Instance 1' },
  { x: '00:10', y: 'CE-web-01', value: 61, label: 'Web Instance 1' },
  { x: '00:15', y: 'CE-web-01', value: 67, label: 'Web Instance 1' },
  { x: '00:20', y: 'CE-web-01', value: 54, label: 'Web Instance 1' },
  { x: '00:25', y: 'CE-web-01', value: 51, label: 'Web Instance 1' },
  
  { x: '00:00', y: 'CE-app-01', value: 32, label: 'App Instance 1' },
  { x: '00:05', y: 'CE-app-01', value: 38, label: 'App Instance 1' },
  { x: '00:10', y: 'CE-app-01', value: 48, label: 'App Instance 1' },
  { x: '00:15', y: 'CE-app-01', value: 62, label: 'App Instance 1' },
  { x: '00:20', y: 'CE-app-01', value: 58, label: 'App Instance 1' },
  { x: '00:25', y: 'CE-app-01', value: 43, label: 'App Instance 1' },
  
  // Cloud SQL
  { x: '00:00', y: 'CloudSQL-prod', value: 35, label: 'Production CloudSQL' },
  { x: '00:05', y: 'CloudSQL-prod', value: 42, label: 'Production CloudSQL' },
  { x: '00:10', y: 'CloudSQL-prod', value: 58, label: 'Production CloudSQL' },
  { x: '00:15', y: 'CloudSQL-prod', value: 71, label: 'Production CloudSQL' },
  { x: '00:20', y: 'CloudSQL-prod', value: 63, label: 'Production CloudSQL' },
  { x: '00:25', y: 'CloudSQL-prod', value: 55, label: 'Production CloudSQL' },
  
  // Cloud Functions
  { x: '00:00', y: 'CF-auth', value: 22, label: 'Auth Function' },
  { x: '00:05', y: 'CF-auth', value: 28, label: 'Auth Function' },
  { x: '00:10', y: 'CF-auth', value: 35, label: 'Auth Function' },
  { x: '00:15', y: 'CF-auth', value: 31, label: 'Auth Function' },
  { x: '00:20', y: 'CF-auth', value: 38, label: 'Auth Function' },
  { x: '00:25', y: 'CF-auth', value: 33, label: 'Auth Function' },
  
  { x: '00:00', y: 'CF-data', value: 45, label: 'Data Processing' },
  { x: '00:05', y: 'CF-data', value: 52, label: 'Data Processing' },
  { x: '00:10', y: 'CF-data', value: 68, label: 'Data Processing' },
  { x: '00:15', y: 'CF-data', value: 75, label: 'Data Processing' },
  { x: '00:20', y: 'CF-data', value: 61, label: 'Data Processing' },
  { x: '00:25', y: 'CF-data', value: 57, label: 'Data Processing' },
  
  // Cloud Run
  { x: '00:00', y: 'CloudRun-api', value: 41, label: 'API Service' },
  { x: '00:05', y: 'CloudRun-api', value: 48, label: 'API Service' },
  { x: '00:10', y: 'CloudRun-api', value: 64, label: 'API Service' },
  { x: '00:15', y: 'CloudRun-api', value: 59, label: 'API Service' },
  { x: '00:20', y: 'CloudRun-api', value: 53, label: 'API Service' },
  { x: '00:25', y: 'CloudRun-api', value: 49, label: 'API Service' }
];

const stackdriverMetrics = [
  { metric: 'Request Rate', current: '2.8K/min', change: '+6.4%', trend: 'up' },
  { metric: 'Error Rate', current: '0.12%', change: '-23.1%', trend: 'down' },
  { metric: 'P95 Latency', current: '165ms', change: '-8.7%', trend: 'down' },
  { metric: 'Throughput', current: '1.2GB/s', change: '+14.3%', trend: 'up' }
];

const cloudRunMetrics = [
  { service: 'api-gateway', requests: 2800, latency: 145, memory: 256 },
  { service: 'user-service', requests: 1950, latency: 95, memory: 512 },
  { service: 'notification-api', requests: 1200, latency: 78, memory: 128 },
  { service: 'file-processor', requests: 680, latency: 320, memory: 1024 }
];

export default function GCPPerformancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudIcon provider="google" service="gcp" size={32} />
          <div>
            <h1 className="text-3xl font-bold">GCP Performance Monitoring</h1>
            <p className="text-muted-foreground">
              Monitor Compute Engine, Cloud SQL, Cloud Functions, and Cloud Run
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Cloud className="h-4 w-4 mr-2" />
            Cloud Monitoring
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Set Alerts
          </Button>
        </div>
      </div>

      {/* GCP Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Healthy Resources"
          value="75/77"
          change={{
            value: 2.6,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Server}
        />
        <MetricCard
          title="Average CPU"
          value="41%"
          change={{
            value: 1.8,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Cpu}
        />
        <MetricCard
          title="P95 Latency"
          value="165ms"
          change={{
            value: 8.7,
            type: 'decrease',
            period: 'last hour'
          }}
          trend="down"
          icon={Clock}
        />
        <MetricCard
          title="Function Invocations"
          value="3.0K"
          change={{
            value: 11.2,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Zap}
        />
      </div>

      {/* Compute Engine Performance & AI Insights */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Compute Engine Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartComponent
              data={computeEngineMetrics}
              xDataKey="time"
              lines={[
                { dataKey: 'cpu', name: 'CPU %', color: '#4285f4' },
                { dataKey: 'memory', name: 'Memory %', color: '#34a853' },
                { dataKey: 'disk', name: 'Disk %', color: '#fbbc04' },
                { dataKey: 'network', name: 'Network MB/s', color: '#ea4335' }
              ]}
              height={250}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Cloud SQL Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChartComponent
              data={cloudSqlMetrics}
              xDataKey="time"
              areas={[
                { dataKey: 'cpu', name: 'CPU %', color: '#4285f4', stackId: '1' },
                { dataKey: 'memory', name: 'Memory %', color: '#34a853', stackId: '2' },
                { dataKey: 'connections', name: 'Connections', color: '#ea4335', stackId: '3' }
              ]}
              height={250}
              fillOpacity={0.6}
            />
          </CardContent>
        </Card>

        {/* AI Insights Widget */}
        <AIInsightsWidget 
          pillar="performance-monitoring"
          maxInsights={3}
          showRefresh={true}
        />
      </div>

      {/* GCP Services Overview */}
      <Card>
        <CardHeader>
          <CardTitle>GCP Services Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {gcpServices.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <CloudIcon provider="google" service={service.name.toLowerCase().replace(' ', '-')} size={32} />
                </div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-2xl font-bold">{service.healthy}/{service.instances}</p>
                <p className="text-sm text-muted-foreground">Healthy/Total</p>
                <Badge 
                  variant={service.status === 'healthy' ? 'default' : 'secondary'}
                  className="mt-2"
                >
                  {service.utilization}% Utilization
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cloud Functions and Cloud Run Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Cloud Functions Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={cloudFunctionMetrics}
              xDataKey="service"
              bars={[
                { dataKey: 'invocations', name: 'Invocations', color: '#4285f4' },
                { dataKey: 'duration', name: 'Duration (ms)', color: '#34a853' },
                { dataKey: 'errors', name: 'Errors', color: '#ea4335' }
              ]}
              height={280}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Cloud Run Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={cloudRunMetrics}
              xDataKey="service"
              bars={[
                { dataKey: 'requests', name: 'Requests/min', color: '#4285f4' },
                { dataKey: 'latency', name: 'Latency (ms)', color: '#34a853' },
                { dataKey: 'memory', name: 'Memory (MB)', color: '#fbbc04' }
              ]}
              height={280}
            />
          </CardContent>
        </Card>
      </div>

      {/* Cloud Monitoring Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Cloud Monitoring Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {stackdriverMetrics.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <h3 className="font-medium text-sm text-muted-foreground">{item.metric}</h3>
                <p className="text-2xl font-bold">{item.current}</p>
                <div className={`flex items-center justify-center gap-1 mt-2 ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${
                    item.trend === 'down' ? 'rotate-180' : ''
                  }`} />
                  <span className="font-medium text-sm">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* GCP Services Resource Utilization Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            GCP Services Resource Utilization Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <HeatmapComponent
            data={gcpPerformanceHeatmapData}
            height={380}
            colorScheme="green"
            showTooltip={true}
            formatTooltip={(value, x, y) => `${value}% utilization at ${x}`}
            formatValue={(value) => `${value}%`}
            cellSize={50}
            gap={1}
          />
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>Time Period: Last 30 minutes</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 rounded" />
                <span>Low (0-40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded" />
                <span>Medium (40-70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-700 rounded" />
                <span>High (70-100%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            GCP Performance Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CloudIcon provider="google" service={alert.service.toLowerCase().replace(' ', '-')} size={24} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{alert.message}</h3>
                      <Badge 
                        variant={
                          alert.severity === 'high' ? 'destructive' : 
                          alert.severity === 'medium' ? 'default' : 'secondary'
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alert.resource} • {alert.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Cloud Monitoring</Button>
                  <Button size="sm">Investigate</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
