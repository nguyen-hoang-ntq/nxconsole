'use client';

import React from 'react';
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
  BarChart3,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { 
  BarChartComponent, 
  PieChartComponent, 
  LineChartComponent 
} from '@/components/charts';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';

// Mock security data
const securityOverview = {
  totalAssets: 1247,
  secureAssets: 1089,
  vulnerabilities: 128,
  criticalIssues: 30,
  complianceScore: 87.3,
  lastScan: '2 hours ago'
};

const cloudProviders = [
  {
    name: 'AWS',
    icon: '🟧',
    securityScore: 87,
    compliance: 92,
    vulnerabilities: 45,
    criticalIssues: 12,
    href: '/dashboard/security-compliance/aws'
  },
  {
    name: 'Azure',
    icon: '🔵',
    securityScore: 82,
    compliance: 88,
    vulnerabilities: 38,
    criticalIssues: 8,
    href: '/dashboard/security-compliance/azure'
  },
  {
    name: 'GCP',
    icon: '🔴',
    securityScore: 89,
    compliance: 94,
    vulnerabilities: 25,
    criticalIssues: 5,
    href: '/dashboard/security-compliance/gcp'
  }
];

const complianceFrameworks = [
  { name: 'SOC 2', score: 95, status: 'compliant', color: '#10b981' },
  { name: 'ISO 27001', score: 89, status: 'compliant', color: '#3b82f6' },
  { name: 'GDPR', score: 93, status: 'compliant', color: '#8b5cf6' },
  { name: 'HIPAA', score: 85, status: 'partial', color: '#f59e0b' },
  { name: 'PCI DSS', score: 78, status: 'non-compliant', color: '#ef4444' }
];

const securityTrends = [
  { name: 'Jan', score: 82, vulnerabilities: 156 },
  { name: 'Feb', score: 84, vulnerabilities: 142 },
  { name: 'Mar', score: 83, vulnerabilities: 159 },
  { name: 'Apr', score: 86, vulnerabilities: 134 },
  { name: 'May', score: 85, vulnerabilities: 147 },
  { name: 'Jun', score: 88, vulnerabilities: 128 },
  { name: 'Jul', score: 87, vulnerabilities: 135 }
];

const vulnerabilityByType = [
  { name: 'Configuration', value: 45, color: '#ef4444' },
  { name: 'Access Control', value: 32, color: '#f59e0b' },
  { name: 'Encryption', value: 28, color: '#3b82f6' },
  { name: 'Network Security', value: 23, color: '#8b5cf6' },
  { name: 'Data Protection', value: 18, color: '#10b981' }
];

const recentFindings = [
  {
    id: 1,
    severity: 'critical',
    title: 'Unencrypted S3 bucket detected',
    provider: 'AWS',
    service: 'S3',
    age: '2 days',
    status: 'open'
  },
  {
    id: 2,
    severity: 'high',
    title: 'Public RDP access enabled',
    provider: 'Azure',
    service: 'Virtual Machine',
    age: '1 day',
    status: 'investigating'
  },
  {
    id: 3,
    severity: 'medium',
    title: 'Weak IAM policy detected',
    provider: 'GCP',
    service: 'IAM',
    age: '3 days',
    status: 'resolved'
  }
];

export default function SecurityCompliancePage() {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security & Compliance</h1>
          <p className="text-muted-foreground">
            Monitor security posture and compliance across all cloud platforms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Scan
          </Button>
          <Button size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
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
            <div className="text-2xl font-bold">{securityOverview.complianceScore}%</div>
            <p className="text-xs text-green-600">
              +3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityOverview.totalAssets}</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityOverview.vulnerabilities}</div>
            <p className="text-xs text-yellow-600">
              -12 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityOverview.criticalIssues}</div>
            <p className="text-xs text-red-600">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cloud Provider Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Cloud Platform Security Overview
          </CardTitle>
          <CardDescription>
            Security scores and compliance status across AWS, Azure, and GCP
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
                      <Badge 
                        variant={provider.criticalIssues > 10 ? 'destructive' : 'default'}
                        className={provider.criticalIssues > 10 ? 'bg-red-100 text-red-800' : ''}
                      >
                        {provider.criticalIssues} critical
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Security Score</span>
                        <span className={`font-medium ${getScoreColor(provider.securityScore)}`}>
                          {provider.securityScore}%
                        </span>
                      </div>
                      <Progress value={provider.securityScore} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Compliance</span>
                        <span className={`font-medium ${getScoreColor(provider.compliance)}`}>
                          {provider.compliance}%
                        </span>
                      </div>
                      <Progress value={provider.compliance} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Vulnerabilities</span>
                        <span className="font-medium text-yellow-600">{provider.vulnerabilities}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Trends */}
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
                { dataKey: 'score', name: 'Security Score', color: '#10b981' }
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Vulnerability Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Types</CardTitle>
            <CardDescription>Distribution of vulnerabilities by category</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChartComponent
              data={vulnerabilityByType}
              nameKey="name"
              dataKey="value"
              colors={['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981']}
              height={300}
              showLegend={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Compliance Frameworks */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Frameworks</CardTitle>
          <CardDescription>Current compliance status across industry standards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceFrameworks.map((framework) => (
              <Card key={framework.name} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{framework.name}</span>
                    <Badge className={getStatusColor(framework.status)}>
                      {framework.status}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-2">{framework.score}%</div>
                  <Progress 
                    value={framework.score} 
                    className="h-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Security Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Findings</CardTitle>
          <CardDescription>Latest security vulnerabilities and findings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFindings.map((finding) => (
              <div key={finding.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className={getSeverityColor(finding.severity)}>
                    {finding.severity}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{finding.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {finding.provider} • {finding.service} • {finding.age}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{finding.status}</Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Security Actions</CardTitle>
          <CardDescription>Manage security and compliance settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="w-6 h-6 mb-2" />
              Run Security Scan
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Compliance Report
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="w-6 h-6 mb-2" />
              Security Policies
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <AlertTriangle className="w-6 h-6 mb-2" />
              Incident Response
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Security Insights */}
      <AIInsightsWidget pillar="security-compliance" />
    </div>
  );
}
