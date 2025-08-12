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
  Network,
  Cloud
} from 'lucide-react';
import { 
  BarChartComponent, 
  LineChartComponent,
  PieChartComponent,
  GaugeChartComponent 
} from '@/components/charts';

// GCP-specific security data
const gcpSecurityOverview = {
  securityScore: 89,
  securityCommandCenter: 'Active',
  totalAssets: 892,
  findings: 23,
  criticalFindings: 5,
  complianceScore: 94,
  lastScan: '1 hour ago'
};

const gcpServices = [
  {
    name: 'Compute Engine',
    icon: <Server className="w-5 h-5" />,
    securityScore: 92,
    resources: 89,
    findings: 8,
    recommendations: 3
  },
  {
    name: 'Cloud Storage',
    icon: <Database className="w-5 h-5" />,
    securityScore: 88,
    resources: 156,
    findings: 12,
    recommendations: 7
  },
  {
    name: 'Cloud Functions',
    icon: <Activity className="w-5 h-5" />,
    securityScore: 94,
    resources: 45,
    findings: 2,
    recommendations: 1
  },
  {
    name: 'VPC Network',
    icon: <Network className="w-5 h-5" />,
    securityScore: 86,
    resources: 34,
    findings: 5,
    recommendations: 4
  },
  {
    name: 'Cloud SQL',
    icon: <Database className="w-5 h-5" />,
    securityScore: 91,
    resources: 23,
    findings: 3,
    recommendations: 2
  },
  {
    name: 'Kubernetes Engine',
    icon: <Cloud className="w-5 h-5" />,
    securityScore: 87,
    resources: 18,
    findings: 6,
    recommendations: 5
  }
];

const complianceStandards = [
  { name: 'CIS Google Cloud Platform', score: 94, controls: 89, passed: 84 },
  { name: 'ISO/IEC 27001', score: 92, controls: 67, passed: 62 },
  { name: 'SOC 2 Type II', score: 96, controls: 45, passed: 43 },
  { name: 'NIST Cybersecurity Framework', score: 88, controls: 123, passed: 108 },
  { name: 'GDPR', score: 91, controls: 78, passed: 71 }
];

const securityTrends = [
  { name: 'Jan', score: 85, findings: 32 },
  { name: 'Feb', score: 87, findings: 28 },
  { name: 'Mar', score: 86, findings: 31 },
  { name: 'Apr', score: 90, findings: 24 },
  { name: 'May', score: 88, findings: 27 },
  { name: 'Jun', score: 91, findings: 21 },
  { name: 'Jul', score: 89, findings: 23 }
];

const findingsByCategory = [
  { name: 'Access Control', value: 35, color: '#ef4444' },
  { name: 'Data Protection', value: 28, color: '#f59e0b' },
  { name: 'Network Security', value: 22, color: '#3b82f6' },
  { name: 'Identity & IAM', value: 18, color: '#8b5cf6' },
  { name: 'Logging & Monitoring', value: 12, color: '#10b981' },
  { name: 'Encryption', value: 8, color: '#06b6d4' }
];

const recentFindings = [
  {
    id: 1,
    category: 'OPEN_FIREWALL',
    severity: 'high',
    title: 'Firewall rule allows unrestricted access',
    resource: 'vpc-network-production',
    project: 'production-project',
    time: '30 minutes ago',
    status: 'active'
  },
  {
    id: 2,
    category: 'PUBLIC_BUCKET_ACL',
    severity: 'critical',
    title: 'Cloud Storage bucket is publicly accessible',
    resource: 'backup-storage-bucket',
    project: 'backup-project',
    time: '2 hours ago',
    status: 'investigating'
  },
  {
    id: 3,
    category: 'WEAK_SSL_POLICY',
    severity: 'medium',
    title: 'Load balancer using weak SSL policy',
    resource: 'app-load-balancer',
    project: 'web-project',
    time: '4 hours ago',
    status: 'resolved'
  }
];

const securityRecommendations = [
  {
    title: 'Enable Security Command Center Premium',
    description: 'Get advanced threat detection and continuous monitoring',
    impact: 'High',
    effort: 'Low',
    category: 'Security Command Center',
    saving: '$2,400/month'
  },
  {
    title: 'Implement Binary Authorization',
    description: 'Ensure only trusted container images are deployed',
    impact: 'High',
    effort: 'Medium',
    category: 'Container Security',
    saving: null
  },
  {
    title: 'Configure VPC Flow Logs',
    description: 'Monitor network traffic for security analysis',
    impact: 'Medium',
    effort: 'Low',
    category: 'Network Security',
    saving: '$800/month'
  }
];

const iamInsights = [
  { type: 'Over-privileged Service Accounts', count: 12, trend: 'down' },
  { type: 'Unused Service Account Keys', count: 8, trend: 'stable' },
  { type: 'Members with Admin Roles', count: 5, trend: 'up' },
  { type: 'External Members', count: 23, trend: 'down' }
];

export default function GCPSecurityCompliancePage() {
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white font-semibold text-sm">G</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">GCP Security & Compliance</h1>
            <p className="text-muted-foreground">
              Google Cloud Platform security posture and compliance monitoring
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
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gcpSecurityOverview.securityScore}%</div>
            <p className="text-xs text-green-600">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gcpSecurityOverview.totalAssets}</div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Findings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gcpSecurityOverview.findings}</div>
            <p className="text-xs text-yellow-600">
              -7 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Findings</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gcpSecurityOverview.criticalFindings}</div>
            <p className="text-xs text-red-600">
              Needs immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="iam">IAM & Access</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* GCP Services Security Status */}
          <Card>
            <CardHeader>
              <CardTitle>GCP Services Security Status</CardTitle>
              <CardDescription>Security posture by Google Cloud service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gcpServices.map((service) => (
                  <Card key={service.name} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {service.icon}
                          <span className="font-medium text-sm">{service.name}</span>
                        </div>
                        <Badge className={`${getScoreColor(service.securityScore)} bg-transparent border`}>
                          {service.securityScore}%
                        </Badge>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Resources</span>
                          <span>{service.resources}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Findings</span>
                          <span className="text-yellow-600">{service.findings}</span>
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
                <CardDescription>Security posture over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChartComponent
                  data={securityTrends}
                  xDataKey="name"
                  lines={[
                    { dataKey: 'score', name: 'Security Score', color: '#4285f4' }
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
                  value={gcpSecurityOverview.securityScore}
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
              <CardTitle>Compliance Standards</CardTitle>
              <CardDescription>Compliance status against industry standards and frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceStandards.map((standard) => (
                  <div key={standard.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{standard.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {standard.passed} of {standard.controls} controls compliant
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(standard.score)}`}>
                          {standard.score}%
                        </div>
                      </div>
                      <Progress value={standard.score} className="w-32 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="findings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Findings by Category</CardTitle>
                <CardDescription>Security findings distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartComponent
                  data={findingsByCategory}
                  nameKey="name"
                  dataKey="value"
                  colors={['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#06b6d4']}
                  height={300}
                  showLegend={true}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Security Findings</CardTitle>
                <CardDescription>Latest security findings from Security Command Center</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentFindings.map((finding) => (
                    <div key={finding.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getSeverityColor(finding.severity)}>
                          {finding.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{finding.time}</span>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{finding.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {finding.resource} • {finding.project}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{finding.category}</Badge>
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

        <TabsContent value="iam" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>IAM Security Insights</CardTitle>
              <CardDescription>Identity and Access Management security overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {iamInsights.map((insight) => (
                  <Card key={insight.type} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{insight.type}</span>
                        <span className="text-lg">{getTrendIcon(insight.trend)}</span>
                      </div>
                      <div className="text-2xl font-bold">{insight.count}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Trend: {insight.trend}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Recommendations</CardTitle>
              <CardDescription>Actionable security improvements for your GCP environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{rec.title}</h4>
                      <div className="flex gap-2">
                        <Badge className={getImpactColor(rec.impact)}>
                          {rec.impact} Impact
                        </Badge>
                        <Badge variant="outline">{rec.effort} Effort</Badge>
                        {rec.saving && (
                          <Badge className="bg-green-100 text-green-800">
                            Save {rec.saving}
                          </Badge>
                        )}
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
