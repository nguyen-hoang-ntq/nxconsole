'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MetricCard } from '@/components/dashboard/metric-card';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { 
  Shield, 
  AlertTriangle, 
  Lock,
  Eye,
  FileText,
  Settings,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Server,
  Key,
  Globe
} from 'lucide-react';
import { 
  PieChartComponent, 
  BarChartComponent, 
  LineChartComponent 
} from '@/components/charts';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';

// Mock AWS security data
const awsSecurityOverview = {
  securityScore: 87,
  complianceScore: 92,
  totalAssets: 342,
  secureAssets: 298,
  vulnerabilities: 45,
  criticalIssues: 12,
  lastScan: '1 hour ago'
};

const awsServices = [
  { name: 'EC2', instances: 45, secured: 42, issues: 8, compliance: 87 },
  { name: 'S3', buckets: 28, secured: 25, issues: 12, compliance: 82 },
  { name: 'RDS', databases: 8, secured: 7, issues: 5, compliance: 91 },
  { name: 'Lambda', functions: 23, secured: 22, issues: 3, compliance: 94 },
  { name: 'IAM', policies: 156, secured: 142, issues: 17, compliance: 85 }
];

const securityFindings = [
  {
    id: 1,
    severity: 'critical',
    title: 'Public S3 bucket with sensitive data',
    service: 'S3',
    resource: 'prod-data-bucket',
    description: 'S3 bucket is publicly accessible with read permissions',
    impact: 'Data exposure risk',
    remediation: 'Remove public read access and implement bucket policy',
    age: '2 days',
    status: 'open'
  },
  {
    id: 2,
    severity: 'high',
    title: 'Overprivileged IAM role detected',
    service: 'IAM',
    resource: 'ec2-admin-role',
    description: 'IAM role has unnecessary administrative permissions',
    impact: 'Privilege escalation risk',
    remediation: 'Apply principle of least privilege',
    age: '1 day',
    status: 'investigating'
  },
  {
    id: 3,
    severity: 'medium',
    title: 'Unencrypted EBS volume',
    service: 'EC2',
    resource: 'web-server-volume',
    description: 'EBS volume is not encrypted at rest',
    impact: 'Data confidentiality risk',
    remediation: 'Enable EBS encryption',
    age: '3 days',
    status: 'planned'
  },
  {
    id: 4,
    severity: 'medium',
    title: 'Security group allows unrestricted access',
    service: 'EC2',
    resource: 'sg-web-servers',
    description: 'Security group allows 0.0.0.0/0 access on port 22',
    impact: 'Unauthorized access risk',
    remediation: 'Restrict SSH access to specific IP ranges',
    age: '5 days',
    status: 'resolved'
  }
];

const complianceFrameworks = [
  { name: 'SOC 2', score: 95, controls: 64, passed: 61, failed: 3 },
  { name: 'PCI DSS', score: 78, controls: 12, passed: 9, failed: 3 },
  { name: 'HIPAA', score: 85, controls: 18, passed: 15, failed: 3 },
  { name: 'CIS', score: 89, controls: 98, passed: 87, failed: 11 }
];

const securityTrends = [
  { month: 'Jan', score: 82, findings: 56 },
  { month: 'Feb', score: 84, findings: 48 },
  { month: 'Mar', score: 83, findings: 52 },
  { month: 'Apr', score: 86, findings: 43 },
  { month: 'May', score: 85, findings: 47 },
  { month: 'Jun', score: 88, findings: 38 },
  { month: 'Jul', score: 87, findings: 45 }
];

const findingsByService = [
  { name: 'S3', critical: 3, high: 9, medium: 8, low: 2 },
  { name: 'EC2', critical: 2, high: 4, medium: 12, low: 6 },
  { name: 'IAM', critical: 4, high: 8, medium: 5, low: 0 },
  { name: 'RDS', critical: 1, high: 2, medium: 2, low: 0 },
  { name: 'Lambda', critical: 0, high: 1, medium: 2, low: 0 }
];

const findingsByType = [
  { name: 'Access Control', value: 18, color: '#ef4444' },
  { name: 'Data Protection', value: 12, color: '#f59e0b' },
  { name: 'Network Security', value: 8, color: '#3b82f6' },
  { name: 'Configuration', value: 5, color: '#8b5cf6' },
  { name: 'Monitoring', value: 2, color: '#10b981' }
];

export default function AWSSecurityCompliancePage() {
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
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      case 'open': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudIcon provider="amazon" service="aws" size={32} />
          <div>
            <h1 className="text-3xl font-bold">AWS Security & Compliance</h1>
            <p className="text-muted-foreground">
              Security posture and compliance status for AWS resources
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Run Security Scan
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Security Score"
          value={`${awsSecurityOverview.securityScore}%`}
          change={{
            value: 2.1,
            type: 'increase',
            period: 'last week'
          }}
          trend="up"
          icon={Shield}
        />
        <MetricCard
          title="Compliance Score"
          value={`${awsSecurityOverview.complianceScore}%`}
          change={{
            value: 1.3,
            type: 'increase',
            period: 'last week'
          }}
          trend="up"
          icon={CheckCircle}
        />
        <MetricCard
          title="Security Findings"
          value={awsSecurityOverview.vulnerabilities.toString()}
          change={{
            value: 8.2,
            type: 'decrease',
            period: 'last week'
          }}
          trend="down"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Critical Issues"
          value={awsSecurityOverview.criticalIssues.toString()}
          change={{
            value: 3.1,
            type: 'decrease',
            period: 'last week'
          }}
          trend="down"
          icon={XCircle}
        />
      </div>

      {/* AWS Services Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            AWS Services Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {awsServices.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <CloudIcon provider="amazon" service={service.name.toLowerCase()} size={32} />
                </div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-2xl font-bold">{service.secured}/{service.instances}</p>
                <p className="text-sm text-muted-foreground">Secured/Total</p>
                <div className="mt-2 space-y-1">
                  <div className="text-sm">
                    <span className="text-red-600">{service.issues}</span> issues
                  </div>
                  <Progress value={service.compliance} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {service.compliance}% compliant
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Charts & AI Insights */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Security Score Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartComponent
              data={securityTrends}
              xDataKey="month"
              lines={[
                { dataKey: 'score', name: 'Security Score', color: '#10b981' },
                { dataKey: 'findings', name: 'Findings', color: '#ef4444' }
              ]}
              height={250}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Findings by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartComponent
              data={findingsByType}
              nameKey="name"
              dataKey="value"
              colors={['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981']}
              height={250}
              showLegend={true}
            />
          </CardContent>
        </Card>

        {/* AI Insights Widget */}
        <AIInsightsWidget 
          pillar="security-compliance"
          maxInsights={3}
          showRefresh={true}
        />
      </div>

      {/* Compliance Frameworks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Compliance Frameworks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {complianceFrameworks.map((framework, index) => (
              <Card key={index} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{framework.name}</span>
                    <Badge variant={framework.score >= 90 ? 'default' : framework.score >= 80 ? 'secondary' : 'destructive'}>
                      {framework.score}%
                    </Badge>
                  </div>
                  <Progress value={framework.score} className="h-2 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    {framework.passed}/{framework.controls} controls passed
                  </div>
                  {framework.failed > 0 && (
                    <div className="text-sm text-red-600">
                      {framework.failed} failed controls
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Findings by Service */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Security Findings by Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BarChartComponent
            data={findingsByService}
            xDataKey="name"
            bars={[
              { dataKey: 'critical', name: 'Critical', color: '#ef4444' },
              { dataKey: 'high', name: 'High', color: '#f59e0b' },
              { dataKey: 'medium', name: 'Medium', color: '#3b82f6' },
              { dataKey: 'low', name: 'Low', color: '#10b981' }
            ]}
            height={300}
          />
        </CardContent>
      </Card>

      {/* Security Findings Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Security Findings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityFindings.map((finding) => (
              <div key={finding.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <CloudIcon provider="amazon" service={finding.service.toLowerCase()} size={24} />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{finding.title}</h3>
                        <Badge className={getSeverityColor(finding.severity)}>
                          {finding.severity}
                        </Badge>
                        <Badge className={getStatusColor(finding.status)} variant="outline">
                          {finding.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {finding.service} • {finding.resource} • {finding.age}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    <Button size="sm">
                      Fix Issue
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Description:</span>
                    <p>{finding.description}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Impact:</span>
                    <p>{finding.impact}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Remediation:</span>
                    <p>{finding.remediation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
