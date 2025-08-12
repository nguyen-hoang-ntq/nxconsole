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
  TrendingUp
} from 'lucide-react';
import { 
  HeatmapComponent,
  LineChartComponent,
  AreaChartComponent,
  BarChartComponent 
} from '@/components/charts';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';

// Mock AWS performance data
const ec2Metrics = [
  { time: '00:00', cpu: 45, memory: 68, network: 120 },
  { time: '00:05', cpu: 48, memory: 70, network: 135 },
  { time: '00:10', cpu: 52, memory: 72, network: 142 },
  { time: '00:15', cpu: 47, memory: 69, network: 128 },
  { time: '00:20', cpu: 51, memory: 71, network: 138 },
  { time: '00:25', cpu: 49, memory: 70, network: 133 }
];

const rdsMetrics = [
  { time: '00:00', connections: 25, iops: 1200, latency: 15 },
  { time: '00:05', connections: 28, iops: 1350, latency: 18 },
  { time: '00:10', connections: 32, iops: 1420, latency: 22 },
  { time: '00:15', connections: 29, iops: 1280, latency: 16 },
  { time: '00:20', connections: 31, iops: 1380, latency: 19 },
  { time: '00:25', connections: 30, iops: 1330, latency: 17 }
];

const lambdaMetrics = [
  { service: 'user-auth', invocations: 1250, duration: 450, errors: 8 },
  { service: 'data-processor', invocations: 890, duration: 1200, errors: 3 },
  { service: 'email-sender', invocations: 650, duration: 280, errors: 12 },
  { service: 'image-resizer', invocations: 420, duration: 850, errors: 2 }
];

const awsServices = [
  { name: 'EC2', instances: 45, healthy: 42, status: 'healthy', utilization: 68 },
  { name: 'RDS', instances: 8, healthy: 7, status: 'warning', utilization: 82 },
  { name: 'Lambda', functions: 23, healthy: 22, status: 'healthy', utilization: 45 },
  { name: 'S3', buckets: 12, healthy: 12, status: 'healthy', utilization: 35 },
  { name: 'ELB', balancers: 6, healthy: 6, status: 'healthy', utilization: 55 }
];

const performanceAlerts = [
  {
    severity: 'high',
    service: 'RDS',
    message: 'Database connection pool exhaustion',
    resource: 'prod-mysql-cluster',
    timestamp: '2 minutes ago'
  },
  {
    severity: 'medium',
    service: 'EC2',
    message: 'High CPU utilization sustained',
    resource: 'web-server-instance-1',
    timestamp: '8 minutes ago'
  },
  {
    severity: 'low',
    service: 'Lambda',
    message: 'Function timeout increase',
    resource: 'email-sender-function',
    timestamp: '15 minutes ago'
  }
];

// Performance heatmap data - CPU utilization across services and time
const performanceHeatmapData = [
  // EC2 instances
  { x: '00:00', y: 'EC2-web-01', value: 45, label: 'Web Server 1' },
  { x: '00:05', y: 'EC2-web-01', value: 52, label: 'Web Server 1' },
  { x: '00:10', y: 'EC2-web-01', value: 68, label: 'Web Server 1' },
  { x: '00:15', y: 'EC2-web-01', value: 74, label: 'Web Server 1' },
  { x: '00:20', y: 'EC2-web-01', value: 61, label: 'Web Server 1' },
  { x: '00:25', y: 'EC2-web-01', value: 58, label: 'Web Server 1' },
  
  { x: '00:00', y: 'EC2-app-01', value: 38, label: 'App Server 1' },
  { x: '00:05', y: 'EC2-app-01', value: 42, label: 'App Server 1' },
  { x: '00:10', y: 'EC2-app-01', value: 55, label: 'App Server 1' },
  { x: '00:15', y: 'EC2-app-01', value: 63, label: 'App Server 1' },
  { x: '00:20', y: 'EC2-app-01', value: 47, label: 'App Server 1' },
  { x: '00:25', y: 'EC2-app-01', value: 51, label: 'App Server 1' },
  
  { x: '00:00', y: 'EC2-db-01', value: 28, label: 'DB Server 1' },
  { x: '00:05', y: 'EC2-db-01', value: 35, label: 'DB Server 1' },
  { x: '00:10', y: 'EC2-db-01', value: 82, label: 'DB Server 1' },
  { x: '00:15', y: 'EC2-db-01', value: 89, label: 'DB Server 1' },
  { x: '00:20', y: 'EC2-db-01', value: 76, label: 'DB Server 1' },
  { x: '00:25', y: 'EC2-db-01', value: 71, label: 'DB Server 1' },
  
  // RDS instances
  { x: '00:00', y: 'RDS-prod', value: 42, label: 'Production DB' },
  { x: '00:05', y: 'RDS-prod', value: 48, label: 'Production DB' },
  { x: '00:10', y: 'RDS-prod', value: 65, label: 'Production DB' },
  { x: '00:15', y: 'RDS-prod', value: 78, label: 'Production DB' },
  { x: '00:20', y: 'RDS-prod', value: 69, label: 'Production DB' },
  { x: '00:25', y: 'RDS-prod', value: 62, label: 'Production DB' },
  
  // Lambda functions
  { x: '00:00', y: 'Lambda-auth', value: 15, label: 'Auth Function' },
  { x: '00:05', y: 'Lambda-auth', value: 22, label: 'Auth Function' },
  { x: '00:10', y: 'Lambda-auth', value: 18, label: 'Auth Function' },
  { x: '00:15', y: 'Lambda-auth', value: 25, label: 'Auth Function' },
  { x: '00:20', y: 'Lambda-auth', value: 31, label: 'Auth Function' },
  { x: '00:25', y: 'Lambda-auth', value: 28, label: 'Auth Function' },
  
  { x: '00:00', y: 'Lambda-data', value: 65, label: 'Data Processor' },
  { x: '00:05', y: 'Lambda-data', value: 72, label: 'Data Processor' },
  { x: '00:10', y: 'Lambda-data', value: 88, label: 'Data Processor' },
  { x: '00:15', y: 'Lambda-data', value: 92, label: 'Data Processor' },
  { x: '00:20', y: 'Lambda-data', value: 84, label: 'Data Processor' },
  { x: '00:25', y: 'Lambda-data', value: 79, label: 'Data Processor' }
];

export default function AWSPerformancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudIcon provider="amazon" service="aws" size={32} />
          <div>
            <h1 className="text-3xl font-bold">AWS Performance Monitoring</h1>
            <p className="text-muted-foreground">
              Monitor EC2, RDS, Lambda, and other AWS services performance
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            CloudWatch
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Set Alerts
          </Button>
        </div>
      </div>

      {/* AWS Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Healthy Instances"
          value="42/45"
          change={{
            value: 2.1,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Server}
        />
        <MetricCard
          title="Average CPU"
          value="49%"
          change={{
            value: 3.2,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Cpu}
        />
        <MetricCard
          title="Response Time"
          value="145ms"
          change={{
            value: 8.1,
            type: 'decrease',
            period: 'last hour'
          }}
          trend="down"
          icon={Clock}
        />
        <MetricCard
          title="Lambda Invocations"
          value="3.2K"
          change={{
            value: 12.5,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={Zap}
        />
      </div>

      {/* EC2 Performance Charts & AI Insights */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              EC2 Instance Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartComponent
              data={ec2Metrics}
              xDataKey="time"
              lines={[
                { dataKey: 'cpu', name: 'CPU %', color: '#3b82f6' },
                { dataKey: 'memory', name: 'Memory %', color: '#10b981' },
                { dataKey: 'network', name: 'Network MB/s', color: '#f59e0b' }
              ]}
              height={250}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              RDS Database Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChartComponent
              data={rdsMetrics}
              xDataKey="time"
              areas={[
                { dataKey: 'connections', name: 'Connections', color: '#8b5cf6', stackId: '1' },
                { dataKey: 'iops', name: 'IOPS', color: '#ef4444', stackId: '2' },
                { dataKey: 'latency', name: 'Latency ms', color: '#06b6d4', stackId: '3' }
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

      {/* AWS Services Overview */}
      <Card>
        <CardHeader>
          <CardTitle>AWS Services Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {awsServices.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <CloudIcon provider="amazon" service={service.name.toLowerCase()} size={32} />
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

      {/* Lambda Functions Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Lambda Functions Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BarChartComponent
            data={lambdaMetrics}
            xDataKey="service"
            bars={[
              { dataKey: 'invocations', name: 'Invocations', color: '#3b82f6' },
              { dataKey: 'duration', name: 'Duration (ms)', color: '#10b981' },
              { dataKey: 'errors', name: 'Errors', color: '#ef4444' }
            ]}
            height={300}
          />
        </CardContent>
      </Card>

      {/* CPU Utilization Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            AWS Services CPU Utilization Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <HeatmapComponent
            data={performanceHeatmapData}
            height={350}
            colorScheme="red"
            showTooltip={true}
            formatTooltip={(value, x, y) => `${value}% CPU at ${x}`}
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
                <div className="w-3 h-3 bg-yellow-400 rounded" />
                <span>Medium (40-70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded" />
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
            AWS Performance Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CloudIcon provider="amazon" service={alert.service.toLowerCase()} size={24} />
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
                  <Button variant="outline" size="sm">CloudWatch</Button>
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
