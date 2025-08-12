'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  FileText,
  Settings,
  RefreshCw,
  Lock,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Server,
  Database,
  Network
} from 'lucide-react';
import { 
  BarChartComponent, 
  LineChartComponent,
  PieChartComponent,
  GaugeChartComponent 
} from '@/components/charts';

// Azure-specific security data
const azureSecurityOverview = {
  securityScore: 82,
  secureScore: 1089,
  totalResources: 1328,
  recommendations: 45,
  criticalAlerts: 8,
  complianceScore: 88,
  lastAssessment: '4 hours ago'
};

const azureServices = [
  {
    name: 'Virtual Machines',
    icon: <Server className="w-5 h-5" />,
    securityScore: 85,
    resources: 142,
    vulnerabilities: 12,
    recommendations: 8
  },
  {
    name: 'Storage Accounts',
    icon: <Database className="w-5 h-5" />,
    securityScore: 78,
    resources: 89,
    vulnerabilities: 18,
    recommendations: 15
  },
  {
    name: 'App Services',
    icon: <Activity className="w-5 h-5" />,
    securityScore: 91,
    resources: 67,
    vulnerabilities: 5,
    recommendations: 3
  },
  {
    name: 'Virtual Networks',
    icon: <Network className="w-5 h-5" />,
    securityScore: 88,
    resources: 23,
    vulnerabilities: 7,
    recommendations: 5
  }
];

const complianceFrameworks = [
  { name: 'Azure Security Benchmark', score: 88, total: 235, passed: 207 },
  { name: 'CIS Microsoft Azure', score: 82, total: 156, passed: 128 },
  { name: 'ISO 27001', score: 91, total: 89, passed: 81 },
  { name: 'NIST Cybersecurity', score: 85, total: 167, passed: 142 },
  { name: 'PCI DSS', score: 78, total: 45, passed: 35 }
];

const securityTrends = [
  { name: 'Jan', score: 78, alerts: 45 },
  { name: 'Feb', score: 80, alerts: 38 },
  { name: 'Mar', score: 79, alerts: 42 },
  { name: 'Apr', score: 83, alerts: 31 },
  { name: 'May', score: 81, alerts: 36 },
  { name: 'Jun', score: 85, alerts: 28 },
  { name: 'Jul', score: 82, alerts: 33 }
];

const threatsByCategory = [
  { name: 'Malware', value: 28, color: '#ef4444' },
  { name: 'Phishing', value: 22, color: '#f59e0b' },
  { name: 'DDoS', value: 18, color: '#3b82f6' },
  { name: 'Data Breach', value: 15, color: '#8b5cf6' },
  { name: 'Insider Threat', value: 12, color: '#10b981' },
  { name: 'Other', value: 5, color: '#6b7280' }
];

const recentSecurityAlerts = [
  {
    id: 1,
    severity: 'high',
    title: 'Suspicious login activity detected',
    resource: 'VM-WebServer-01',
    resourceGroup: 'production-rg',
    subscription: 'Production Subscription',
    time: '15 minutes ago',
    status: 'investigating'
  },
  {
    id: 2,
    severity: 'medium',
    title: 'Storage account public access enabled',
    resource: 'storageaccount001',
    resourceGroup: 'storage-rg',
    subscription: 'Development Subscription',
    time: '2 hours ago',
    status: 'resolved'
  },
  {
    id: 3,
    severity: 'critical',
    title: 'Unencrypted database connection',
    resource: 'sql-database-prod',
    resourceGroup: 'database-rg',
    subscription: 'Production Subscription',
    time: '4 hours ago',
    status: 'open'
  }
];

const recommendations = [
  {
    title: 'Enable Azure Defender for all subscriptions',
    description: 'Protect your Azure resources with advanced threat protection',
    impact: 'High',
    effort: 'Low',
    category: 'Security Center'
  },
  {
    title: 'Configure network security groups',
    description: 'Restrict network access to essential ports and protocols',
    impact: 'Medium',
    effort: 'Medium',
    category: 'Network Security'
  },
  {
    title: 'Enable encryption at rest for storage accounts',
    description: 'Protect data stored in Azure Storage with encryption',
    impact: 'High',
    effort: 'Low',
    category: 'Data Protection'
  }
];

export default function AzureSecurityCompliancePage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-semibold text-sm">Az</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Azure Security & Compliance</h1>
            <p className="text-muted-foreground">
              Microsoft Azure security posture and compliance monitoring
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Azure Secure Score</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{azureSecurityOverview.securityScore}%</div>
            <p className="text-xs text-green-600">
              +2% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{azureSecurityOverview.totalResources}</div>
            <p className="text-xs text-muted-foreground">
              Across all subscriptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{azureSecurityOverview.recommendations}</div>
            <p className="text-xs text-yellow-600">
              Active recommendations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{azureSecurityOverview.criticalAlerts}</div>
            <p className="text-xs text-red-600">
              Require immediate action
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="threats">Threat Detection</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Azure Services Security Status */}
          <Card>
            <CardHeader>
              <CardTitle>Azure Services Security Status</CardTitle>
              <CardDescription>Security posture by Azure service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {azureServices.map((service) => (
                  <Card key={service.name} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {service.icon}
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <Badge className={`${getScoreColor(service.securityScore)} bg-transparent border`}>
                          {service.securityScore}%
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Resources</span>
                          <span>{service.resources}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Vulnerabilities</span>
                          <span className="text-yellow-600">{service.vulnerabilities}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recommendations</span>
                          <span className="text-blue-600">{service.recommendations}</span>
                        </div>
                      </div>
                      <Progress value={service.securityScore} className="h-2 mt-3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Score Trends</CardTitle>
                <CardDescription>Azure Secure Score over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChartComponent
                  data={securityTrends}
                  xDataKey="name"
                  lines={[
                    { dataKey: 'score', name: 'Security Score', color: '#0078d4' }
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Security Health</CardTitle>
                <CardDescription>Current security posture</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <GaugeChartComponent
                  value={azureSecurityOverview.securityScore}
                  max={100}
                  title="Security Score"
                  size="lg"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Frameworks</CardTitle>
              <CardDescription>Compliance status against industry standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceFrameworks.map((framework) => (
                  <div key={framework.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{framework.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {framework.passed} of {framework.total} controls passed
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(framework.score)}`}>
                          {framework.score}%
                        </div>
                      </div>
                      <Progress value={framework.score} className="w-32 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Distribution</CardTitle>
                <CardDescription>Security threats by category</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartComponent
                  data={threatsByCategory}
                  nameKey="name"
                  dataKey="value"
                  colors={['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#6b7280']}
                  height={300}
                  showLegend={true}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Security Alerts</CardTitle>
                <CardDescription>Latest security incidents and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSecurityAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {alert.resource} • {alert.resourceGroup}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{alert.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Recommendations</CardTitle>
              <CardDescription>Actionable security improvements for your Azure environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{rec.title}</h4>
                      <div className="flex gap-2">
                        <Badge className={getImpactColor(rec.impact)}>
                          {rec.impact} Impact
                        </Badge>
                        <Badge variant="outline">{rec.effort} Effort</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{rec.category}</Badge>
                      <Button size="sm">
                        Implement
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
