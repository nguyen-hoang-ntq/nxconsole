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
  BarChart3
} from 'lucide-react';
import { 
  HeatmapComponent,
  LineChartComponent,
  AreaChartComponent,
  BarChartComponent 
} from '@/components/charts';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';

// Mock Azure performance data
const vmMetrics = [
  { time: '00:00', cpu: 42, memory: 65, disk: 75, network: 110 },
  { time: '00:05', cpu: 45, memory: 67, disk: 78, network: 125 },
  { time: '00:10', cpu: 49, memory: 69, disk: 72, network: 132 },
  { time: '00:15', cpu: 44, memory: 66, disk: 76, network: 118 },
  { time: '00:20', cpu: 47, memory: 68, disk: 74, network: 128 },
  { time: '00:25', cpu: 46, memory: 67, disk: 77, network: 123 }
];

const sqlMetrics = [
  { time: '00:00', dtu: 65, storage: 45, connections: 28 },
  { time: '00:05', dtu: 72, storage: 47, connections: 32 },
  { time: '00:10', dtu: 68, storage: 49, connections: 35 },
  { time: '00:15', dtu: 70, storage: 46, connections: 29 },
  { time: '00:20', dtu: 75, storage: 48, connections: 33 },
  { time: '00:25', dtu: 71, storage: 47, connections: 31 }
];

const functionMetrics = [
  { service: 'user-auth', executions: 980, duration: 380, memory: 256 },
  { service: 'data-processor', executions: 720, duration: 950, memory: 512 },
  { service: 'notification-sender', executions: 550, duration: 220, memory: 128 },
  { service: 'image-processor', executions: 340, duration: 720, memory: 1024 }
];

const azureServices = [
  { name: 'Virtual Machines', instances: 32, healthy: 30, status: 'warning', utilization: 72 },
  { name: 'SQL Database', instances: 6, healthy: 6, status: 'healthy', utilization: 68 },
  { name: 'Functions', functions: 18, healthy: 17, status: 'healthy', utilization: 42 },
  { name: 'Storage', accounts: 8, healthy: 8, status: 'healthy', utilization: 38 },
  { name: 'App Service', apps: 12, healthy: 11, status: 'warning', utilization: 65 }
];

const performanceAlerts = [
  {
    severity: 'high',
    service: 'Virtual Machines',
    message: 'VM disk space critically low',
    resource: 'prod-vm-webserver-01',
    timestamp: '3 minutes ago'
  },
  {
    severity: 'medium',
    service: 'SQL Database',
    message: 'DTU consumption above threshold',
    resource: 'prod-sql-main',
    timestamp: '12 minutes ago'
  },
  {
    severity: 'medium',
    service: 'App Service',
    message: 'Response time degradation',
    resource: 'api-service-prod',
    timestamp: '18 minutes ago'
  }
];

// Azure Performance heatmap data - Resource utilization across services and time
const azurePerformanceHeatmapData = [
  // Virtual Machines
  { x: '00:00', y: 'VM-web-01', value: 42, label: 'Web Server VM' },
  { x: '00:05', y: 'VM-web-01', value: 48, label: 'Web Server VM' },
  { x: '00:10', y: 'VM-web-01', value: 65, label: 'Web Server VM' },
  { x: '00:15', y: 'VM-web-01', value: 71, label: 'Web Server VM' },
  { x: '00:20', y: 'VM-web-01', value: 58, label: 'Web Server VM' },
  { x: '00:25', y: 'VM-web-01', value: 55, label: 'Web Server VM' },
  
  { x: '00:00', y: 'VM-app-01', value: 35, label: 'App Server VM' },
  { x: '00:05', y: 'VM-app-01', value: 41, label: 'App Server VM' },
  { x: '00:10', y: 'VM-app-01', value: 52, label: 'App Server VM' },
  { x: '00:15', y: 'VM-app-01', value: 68, label: 'App Server VM' },
  { x: '00:20', y: 'VM-app-01', value: 61, label: 'App Server VM' },
  { x: '00:25', y: 'VM-app-01', value: 47, label: 'App Server VM' },
  
  // SQL Database
  { x: '00:00', y: 'SQL-prod', value: 38, label: 'Production SQL DB' },
  { x: '00:05', y: 'SQL-prod', value: 45, label: 'Production SQL DB' },
  { x: '00:10', y: 'SQL-prod', value: 62, label: 'Production SQL DB' },
  { x: '00:15', y: 'SQL-prod', value: 74, label: 'Production SQL DB' },
  { x: '00:20', y: 'SQL-prod', value: 66, label: 'Production SQL DB' },
  { x: '00:25', y: 'SQL-prod', value: 58, label: 'Production SQL DB' },
  
  // Azure Functions
  { x: '00:00', y: 'Function-auth', value: 18, label: 'Auth Function' },
  { x: '00:05', y: 'Function-auth', value: 25, label: 'Auth Function' },
  { x: '00:10', y: 'Function-auth', value: 32, label: 'Auth Function' },
  { x: '00:15', y: 'Function-auth', value: 28, label: 'Auth Function' },
  { x: '00:20', y: 'Function-auth', value: 35, label: 'Auth Function' },
  { x: '00:25', y: 'Function-auth', value: 30, label: 'Auth Function' },
  
  { x: '00:00', y: 'Function-api', value: 48, label: 'API Function' },
  { x: '00:05', y: 'Function-api', value: 55, label: 'API Function' },
  { x: '00:10', y: 'Function-api', value: 72, label: 'API Function' },
  { x: '00:15', y: 'Function-api', value: 81, label: 'API Function' },
  { x: '00:20', y: 'Function-api', value: 68, label: 'API Function' },
  { x: '00:25', y: 'Function-api', value: 63, label: 'API Function' },
  
  // App Service
  { x: '00:00', y: 'AppService-web', value: 52, label: 'Web App Service' },
  { x: '00:05', y: 'AppService-web', value: 59, label: 'Web App Service' },
  { x: '00:10', y: 'AppService-web', value: 75, label: 'Web App Service' },
  { x: '00:15', y: 'AppService-web', value: 68, label: 'Web App Service' },
  { x: '00:20', y: 'AppService-web', value: 62, label: 'Web App Service' },
  { x: '00:25', y: 'AppService-web', value: 57, label: 'Web App Service' }
];

const appInsightsData = [
  { metric: 'Page Views', current: '125K', change: '+8.2%', trend: 'up' },
  { metric: 'Unique Users', current: '8.9K', change: '+12.1%', trend: 'up' },
  { metric: 'Server Response', current: '180ms', change: '-5.8%', trend: 'down' },
  { metric: 'Exceptions', current: '23', change: '-15.2%', trend: 'down' }
];

export default function AzurePerformancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudIcon provider="microsoft" service="azure" size={32} />
          <div>
            <h1 className="text-3xl font-bold">Azure Performance Monitoring</h1>
            <p className="text-muted-foreground">
              Monitor Virtual Machines, SQL Database, Functions, and App Services
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Azure Monitor
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Set Alerts
          </Button>
        </div>
      </div>

      {/* Azure Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Healthy Resources"
          value="72/77"
          change={{
            value: 1.8,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Server}
        />
        <MetricCard
          title="Average DTU"
          value="70%"
          change={{
            value: 5.2,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Database}
        />
        <MetricCard
          title="Response Time"
          value="180ms"
          change={{
            value: 5.8,
            type: 'decrease',
            period: 'last hour'
          }}
          trend="down"
          icon={Clock}
        />
        <MetricCard
          title="Function Executions"
          value="2.6K"
          change={{
            value: 9.3,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Zap}
        />
      </div>

      {/* Virtual Machine Performance & AI Insights */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Virtual Machine Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartComponent
              data={vmMetrics}
              xDataKey="time"
              lines={[
                { dataKey: 'cpu', name: 'CPU %', color: '#0078d4' },
                { dataKey: 'memory', name: 'Memory %', color: '#107c10' },
                { dataKey: 'disk', name: 'Disk %', color: '#ff8c00' },
                { dataKey: 'network', name: 'Network MB/s', color: '#5c2d91' }
              ]}
              height={250}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              SQL Database Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChartComponent
              data={sqlMetrics}
              xDataKey="time"
              areas={[
                { dataKey: 'dtu', name: 'DTU %', color: '#0078d4', stackId: '1' },
                { dataKey: 'storage', name: 'Storage %', color: '#107c10', stackId: '2' },
                { dataKey: 'connections', name: 'Connections', color: '#d13438', stackId: '3' }
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

      {/* Azure Services Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Azure Services Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {azureServices.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <CloudIcon provider="microsoft" service={service.name.toLowerCase().replace(' ', '-')} size={32} />
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

      {/* Application Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Application Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appInsightsData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{item.metric}</h3>
                    <p className="text-2xl font-bold">{item.current}</p>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${
                      item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`h-4 w-4 ${
                        item.trend === 'down' ? 'rotate-180' : ''
                      }`} />
                      <span className="font-medium">{item.change}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">vs last hour</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Azure Functions Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={functionMetrics}
              xDataKey="service"
              bars={[
                { dataKey: 'executions', name: 'Executions', color: '#0078d4' },
                { dataKey: 'duration', name: 'Duration (ms)', color: '#107c10' },
                { dataKey: 'memory', name: 'Memory (MB)', color: '#5c2d91' }
              ]}
              height={280}
            />
          </CardContent>
        </Card>
      </div>

      {/* Azure Services CPU Utilization Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Azure Services Resource Utilization Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <HeatmapComponent
            data={azurePerformanceHeatmapData}
            height={400}
            colorScheme="blue"
            showTooltip={true}
            formatTooltip={(value, x, y) => `${value}% utilization at ${x}`}
            formatValue={(value) => `${value}%`}
            cellSize={55}
            gap={2}
          />
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>Time Period: Last 30 minutes</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-200 rounded" />
                <span>Low (0-40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded" />
                <span>Medium (40-70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-700 rounded" />
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
            Azure Performance Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CloudIcon provider="microsoft" service={alert.service.toLowerCase().replace(' ', '-')} size={24} />
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
                  <Button variant="outline" size="sm">Azure Monitor</Button>
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
