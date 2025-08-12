'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricCard } from '@/components/dashboard/metric-card';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';
import { 
  Plus, 
  Layers, 
  Activity, 
  MessageSquare,
  Bell,
  Zap,
  BarChart3,
  Settings,
  Bot,
  Brain,
  Cpu,
  Radio,
  TrendingUp,
  AlertTriangle,
  Clock,
  Users,
  Lock
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock other services data
const otherServices = [
  {
    id: 'sqs-queue-orders',
    name: 'order-processing-queue',
    type: 'SQS Queue',
    platform: 'amazon',
    status: 'active',
    region: 'us-east-1',
    messages_per_hour: 15420,
    queue_depth: 245,
    max_queue_depth: 1000,
    cost_monthly: 12.45,
    dlq_enabled: true,
    encryption: true
  },
  {
    id: 'servicebus-events',
    name: 'event-notification-bus',
    type: 'Service Bus',
    platform: 'microsoft',
    status: 'active',
    region: 'East US',
    messages_per_hour: 8750,
    queue_depth: 156,
    max_queue_depth: 500,
    cost_monthly: 28.90,
    dlq_enabled: true,
    encryption: true
  },
  {
    id: 'pubsub-analytics',
    name: 'analytics-topic',
    type: 'Pub/Sub',
    platform: 'google',
    status: 'active',
    region: 'us-central1',
    messages_per_hour: 12650,
    queue_depth: 89,
    max_queue_depth: 800,
    cost_monthly: 18.75,
    dlq_enabled: true,
    encryption: true
  },
  {
    id: 'sns-notifications',
    name: 'user-notifications',
    type: 'SNS Topic',
    platform: 'amazon',
    status: 'active',
    region: 'us-west-2',
    messages_per_hour: 5280,
    queue_depth: 0,
    max_queue_depth: 0,
    cost_monthly: 8.50,
    dlq_enabled: false,
    encryption: true
  },
  {
    id: 'iot-core-devices',
    name: 'device-telemetry-hub',
    type: 'IoT Core',
    platform: 'amazon',
    status: 'active',
    region: 'us-east-1',
    messages_per_hour: 45000,
    queue_depth: 0,
    max_queue_depth: 0,
    cost_monthly: 125.80,
    dlq_enabled: false,
    encryption: true
  },
  {
    id: 'ml-model-endpoint',
    name: 'fraud-detection-model',
    type: 'SageMaker',
    platform: 'amazon',
    status: 'active',
    region: 'us-east-1',
    messages_per_hour: 1200,
    queue_depth: 0,
    max_queue_depth: 0,
    cost_monthly: 189.45,
    dlq_enabled: false,
    encryption: true
  }
];

const messageVolumeData = [
  { time: '00:00', sqs: 15420, servicebus: 8750, pubsub: 12650, sns: 5280 },
  { time: '06:00', sqs: 18200, servicebus: 9800, pubsub: 14200, sns: 6100 },
  { time: '12:00', sqs: 22500, servicebus: 12400, pubsub: 16800, sns: 7800 },
  { time: '18:00', sqs: 19800, servicebus: 10600, pubsub: 15200, sns: 6900 },
  { time: '24:00', sqs: 16500, servicebus: 9200, pubsub: 13400, sns: 5800 }
];

const serviceTypeMetrics = [
  { type: 'Messaging', count: 15, cost: 68, utilization: 78 },
  { type: 'Analytics', count: 8, cost: 234, utilization: 65 },
  { type: 'AI/ML', count: 6, cost: 456, utilization: 82 },
  { type: 'IoT', count: 4, cost: 189, utilization: 71 },
  { type: 'Monitoring', count: 12, cost: 125, utilization: 89 }
];

const alertsAndNotifications = [
  {
    service: 'order-processing-queue',
    type: 'Queue Depth Alert',
    severity: 'medium',
    message: 'Queue depth approaching threshold',
    timestamp: '5 minutes ago',
    platform: 'amazon'
  },
  {
    service: 'fraud-detection-model',
    type: 'Model Performance',
    severity: 'low',
    message: 'Inference latency increased',
    timestamp: '12 minutes ago',
    platform: 'amazon'
  },
  {
    service: 'analytics-topic',
    type: 'Subscription Error',
    severity: 'high',
    message: 'Failed message delivery detected',
    timestamp: '18 minutes ago',
    platform: 'google'
  },
  {
    service: 'event-notification-bus',
    type: 'Connection Issue',
    severity: 'medium',
    message: 'Temporary connection timeout',
    timestamp: '25 minutes ago',
    platform: 'microsoft'
  }
];

const usageInsights = [
  { metric: 'Total Messages/Hour', value: '67.3K', change: '+12.5%', trend: 'up' },
  { metric: 'Processing Latency', value: '125ms', change: '-8.2%', trend: 'down' },
  { metric: 'Error Rate', value: '0.08%', change: '-24.1%', trend: 'down' },
  { metric: 'Throughput', value: '2.4K/sec', change: '+15.7%', trend: 'up' }
];

export default function OtherServicesPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const activeServices = otherServices.filter(s => s.status === 'active').length;
  const totalMessages = otherServices.reduce((sum, s) => sum + s.messages_per_hour, 0);
  const totalCost = otherServices.reduce((sum, s) => sum + s.cost_monthly, 0);
  const queueDepthTotal = otherServices.reduce((sum, s) => sum + s.queue_depth, 0);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Other Services</h1>
          <p className="text-muted-foreground">
            Manage messaging, analytics, AI/ML, IoT, and specialized cloud services
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Services"
          value={activeServices.toString()}
          change={{
            value: 3.2,
            type: 'increase',
            period: 'last 24h'
          }}
          trend="up"
          icon={Layers}
        />
        <MetricCard
          title="Messages/Hour"
          value={`${(totalMessages / 1000).toFixed(1)}K`}
          change={{
            value: 12.5,
            type: 'increase',
            period: 'last hour'
          }}
          trend="up"
          icon={MessageSquare}
        />
        <MetricCard
          title="Queue Depth"
          value={queueDepthTotal.toString()}
          change={{
            value: 5.8,
            type: 'decrease',
            period: 'last hour'
          }}
          trend="down"
          icon={Activity}
        />
        <MetricCard
          title="Monthly Cost"
          value={`$${totalCost.toFixed(0)}`}
          change={{
            value: 8.7,
            type: 'decrease',
            period: 'vs last month'
          }}
          trend="down"
          icon={BarChart3}
        />
      </div>

      {/* Message Volume and Service Type Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Volume Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={messageVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
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
                />
                <Line type="monotone" dataKey="sqs" stroke="#ff9900" strokeWidth={2} name="SQS" />
                <Line type="monotone" dataKey="servicebus" stroke="#0078d4" strokeWidth={2} name="Service Bus" />
                <Line type="monotone" dataKey="pubsub" stroke="#4285f4" strokeWidth={2} name="Pub/Sub" />
                <Line type="monotone" dataKey="sns" stroke="#82ca9d" strokeWidth={2} name="SNS" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Service Type Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={serviceTypeMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="type" 
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
                />
                <Bar dataKey="count" fill="#8884d8" name="Service Count" />
                <Bar dataKey="cost" fill="#82ca9d" name="Cost ($)" />
                <Bar dataKey="utilization" fill="#ffc658" name="Utilization %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Usage Insights and Alerts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Usage Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {usageInsights.map((insight, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-muted-foreground">{insight.metric}</h3>
                  <p className="text-2xl font-bold">{insight.value}</p>
                  <div className={`flex items-center justify-center gap-1 mt-2 ${
                    insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${
                      insight.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    <span className="font-medium text-sm">{insight.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertsAndNotifications.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CloudIcon 
                      provider={alert.platform as 'amazon' | 'microsoft' | 'google'} 
                      service={alert.service} 
                      size={24} 
                    />
                    <div>
                      <p className="font-medium text-sm">{alert.type}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={
                        alert.severity === 'high' ? 'destructive' : 
                        alert.severity === 'medium' ? 'default' : 'secondary'
                      }
                      className="mb-1"
                    >
                      {alert.severity}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Other Services List */}
      <Card>
        <CardHeader>
          <CardTitle>Other Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {otherServices.map((service, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg transition-colors ${
                  selectedServices.includes(service.id) ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceSelect(service.id)}
                      className="h-4 w-4"
                    />
                    <CloudIcon 
                      provider={service.platform as 'amazon' | 'microsoft' | 'google'} 
                      service={service.type.toLowerCase().replace(' ', '-')} 
                      size={32} 
                    />
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.type} • {service.region}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex gap-2">
                      <Badge 
                        variant={service.status === 'active' ? 'default' : 'secondary'}
                      >
                        {service.status}
                      </Badge>
                      {service.encryption && (
                        <Badge variant="outline">
                          <Lock className="w-4 h-4 mr-1 inline-block" />Encrypted
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${service.cost_monthly.toFixed(2)}/mo</p>
                      <p className="text-sm text-muted-foreground">
                        {service.messages_per_hour.toLocaleString()}/hr
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-4 mt-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {service.messages_per_hour.toLocaleString()} msg/hr
                    </span>
                  </div>
                  
                  {service.queue_depth > 0 && (
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Queue: {service.queue_depth}/{service.max_queue_depth}
                      </span>
                      <div className="flex-1 bg-muted rounded-full h-1.5 max-w-16">
                        <div 
                          className={`h-1.5 rounded-full ${
                            (service.queue_depth / service.max_queue_depth) > 0.8 ? 'bg-red-500' :
                            (service.queue_depth / service.max_queue_depth) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(service.queue_depth / service.max_queue_depth) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {service.dlq_enabled && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        DLQ Enabled
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">24/7 Active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Bridges */}
      <Card>
        <CardHeader>
          <CardTitle>Other Services Management</CardTitle>
          <CardDescription>Manage and provision other cloud services across platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/cloud-management/amazon">
              <Button variant="outline" className="h-16 flex-col w-full">
                <CloudIcon provider="amazon" service="aws" size={20} />
                <span className="text-xs mt-1">Manage AWS</span>
              </Button>
            </Link>
            <Link href="/dashboard/cloud-management/microsoft">
              <Button variant="outline" className="h-16 flex-col w-full">
                <CloudIcon provider="microsoft" service="azure" size={20} />
                <span className="text-xs mt-1">Manage Azure</span>
              </Button>
            </Link>
            <Link href="/dashboard/cloud-management/google">
              <Button variant="outline" className="h-16 flex-col w-full">
                <CloudIcon provider="google" service="gcp" size={20} />
                <span className="text-xs mt-1">Manage GCP</span>
              </Button>
            </Link>
            <Button variant="outline" className="h-16 flex-col">
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-xs">New Service</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightsWidget pillar="resource-management" />
    </div>
  );
}
