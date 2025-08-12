'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  BarChart3,
  TrendingUp,
  Download,
  Search,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { 
  PieChartComponent, 
  BarChartComponent, 
  LineChartComponent 
} from '@/components/charts';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';

// Mock compliance data across all frameworks
const complianceOverview = {
  overallScore: 88.2,
  totalFrameworks: 8,
  compliantFrameworks: 6,
  partialCompliance: 2,
  totalControls: 524,
  passedControls: 462,
  failedControls: 62,
  lastAssessment: '3 days ago'
};

const complianceFrameworks = [
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    category: 'Industry Standard',
    score: 95,
    status: 'compliant',
    totalControls: 64,
    passedControls: 61,
    failedControls: 3,
    lastAudit: '2023-12-15',
    nextAudit: '2024-12-15',
    auditor: 'KPMG',
    description: 'Service Organization Control 2 - Security, Availability, Processing Integrity'
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    category: 'International Standard',
    score: 89,
    status: 'compliant',
    totalControls: 114,
    passedControls: 101,
    failedControls: 13,
    lastAudit: '2023-10-20',
    nextAudit: '2024-10-20',
    auditor: 'BSI Group',
    description: 'Information Security Management System standard'
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    category: 'Data Protection',
    score: 93,
    status: 'compliant',
    totalControls: 28,
    passedControls: 26,
    failedControls: 2,
    lastAudit: '2024-01-10',
    nextAudit: '2024-07-10',
    auditor: 'Internal',
    description: 'General Data Protection Regulation compliance'
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    category: 'Healthcare',
    score: 85,
    status: 'partial',
    totalControls: 45,
    passedControls: 38,
    failedControls: 7,
    lastAudit: '2023-11-05',
    nextAudit: '2024-05-05',
    auditor: 'Deloitte',
    description: 'Health Insurance Portability and Accountability Act'
  },
  {
    id: 'pcidss',
    name: 'PCI DSS',
    category: 'Payment Security',
    score: 78,
    status: 'partial',
    totalControls: 12,
    passedControls: 9,
    failedControls: 3,
    lastAudit: '2024-02-01',
    nextAudit: '2024-08-01',
    auditor: 'Trustwave',
    description: 'Payment Card Industry Data Security Standard'
  },
  {
    id: 'nist',
    name: 'NIST Cybersecurity Framework',
    category: 'Government',
    score: 91,
    status: 'compliant',
    totalControls: 98,
    passedControls: 89,
    failedControls: 9,
    lastAudit: '2023-09-15',
    nextAudit: '2024-03-15',
    auditor: 'Internal',
    description: 'National Institute of Standards and Technology framework'
  },
  {
    id: 'cis',
    name: 'CIS Controls',
    category: 'Security Benchmark',
    score: 87,
    status: 'compliant',
    totalControls: 153,
    passedControls: 133,
    failedControls: 20,
    lastAudit: '2024-01-20',
    nextAudit: '2024-07-20',
    auditor: 'Internal',
    description: 'Center for Internet Security Critical Security Controls'
  },
  {
    id: 'fedramp',
    name: 'FedRAMP',
    category: 'Government',
    score: 82,
    status: 'compliant',
    totalControls: 325,
    passedControls: 266,
    failedControls: 59,
    lastAudit: '2023-08-10',
    nextAudit: '2024-02-10',
    auditor: '3PAO Provider',
    description: 'Federal Risk and Authorization Management Program'
  }
];

const complianceTrends = [
  { month: 'Jan', score: 85.2, frameworks: 6 },
  { month: 'Feb', score: 86.1, frameworks: 6 },
  { month: 'Mar', score: 86.8, frameworks: 7 },
  { month: 'Apr', score: 87.5, frameworks: 7 },
  { month: 'May', score: 87.1, frameworks: 7 },
  { month: 'Jun', score: 88.2, frameworks: 8 },
  { month: 'Jul', score: 88.2, frameworks: 8 }
];

const controlsByCategory = [
  { name: 'Access Control', total: 98, passed: 85, failed: 13 },
  { name: 'Data Protection', total: 76, passed: 68, failed: 8 },
  { name: 'Network Security', total: 64, passed: 58, failed: 6 },
  { name: 'Incident Response', total: 52, passed: 47, failed: 5 },
  { name: 'Risk Management', total: 48, passed: 42, failed: 6 },
  { name: 'Business Continuity', total: 42, passed: 38, failed: 4 },
  { name: 'Asset Management', total: 38, passed: 34, failed: 4 },
  { name: 'Vendor Management', total: 32, passed: 28, failed: 4 }
];

const complianceGaps = [
  {
    id: 1,
    framework: 'PCI DSS',
    requirement: 'Regular vulnerability scanning',
    description: 'Automated vulnerability scanning not implemented for all payment processing systems',
    impact: 'High',
    effort: 'Medium',
    dueDate: '2024-03-15',
    owner: 'Security Team',
    status: 'in-progress'
  },
  {
    id: 2,
    framework: 'HIPAA',
    requirement: 'Encryption of PHI in transit',
    description: 'Some API endpoints do not enforce TLS 1.3 for PHI transmission',
    impact: 'High',
    effort: 'Low',
    dueDate: '2024-02-28',
    owner: 'Platform Team',
    status: 'planned'
  },
  {
    id: 3,
    framework: 'SOC 2',
    requirement: 'Backup testing procedures',
    description: 'Backup restoration testing not performed quarterly as required',
    impact: 'Medium',
    effort: 'Low',
    dueDate: '2024-04-01',
    owner: 'Infrastructure Team',
    status: 'open'
  },
  {
    id: 4,
    framework: 'ISO 27001',
    requirement: 'Information classification policy',
    description: 'Data classification labels not consistently applied across all systems',
    impact: 'Medium',
    effort: 'High',
    dueDate: '2024-05-15',
    owner: 'Data Governance Team',
    status: 'open'
  }
];

const upcomingAudits = [
  {
    framework: 'FedRAMP',
    auditor: '3PAO Provider',
    date: '2024-02-10',
    type: 'Annual Assessment',
    daysUntil: 15,
    status: 'scheduled'
  },
  {
    framework: 'NIST CSF',
    auditor: 'Internal',
    date: '2024-03-15',
    type: 'Self Assessment',
    daysUntil: 48,
    status: 'preparing'
  },
  {
    framework: 'HIPAA',
    auditor: 'Deloitte',
    date: '2024-05-05',
    type: 'Compliance Review',
    daysUntil: 99,
    status: 'scheduled'
  }
];

export default function CompliancePage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compliance Management</h1>
          <p className="text-muted-foreground">
            Comprehensive compliance monitoring across all regulatory frameworks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Schedule Audit
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceOverview.overallScore}%</div>
            <p className="text-xs text-green-600">
              +2.1% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant Frameworks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {complianceOverview.compliantFrameworks}/{complianceOverview.totalFrameworks}
            </div>
            <p className="text-xs text-muted-foreground">
              Fully compliant frameworks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Control Coverage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {complianceOverview.passedControls}/{complianceOverview.totalControls}
            </div>
            <p className="text-xs text-muted-foreground">
              Controls passed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Gaps</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceOverview.failedControls}</div>
            <p className="text-xs text-yellow-600">
              Require remediation
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="frameworks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="frameworks">Compliance Frameworks</TabsTrigger>
          <TabsTrigger value="controls">Control Categories</TabsTrigger>
          <TabsTrigger value="gaps">Compliance Gaps</TabsTrigger>
          <TabsTrigger value="audits">Upcoming Audits</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="space-y-6">
          {/* Compliance Trends & AI Insights */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Score Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChartComponent
                  data={complianceTrends}
                  xDataKey="month"
                  lines={[
                    { dataKey: 'score', name: 'Compliance Score', color: '#10b981' }
                  ]}
                  height={250}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Framework Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChartComponent
                  data={[
                    { name: 'Compliant', value: 6, color: '#10b981' },
                    { name: 'Partial', value: 2, color: '#f59e0b' },
                    { name: 'Non-Compliant', value: 0, color: '#ef4444' }
                  ]}
                  nameKey="name"
                  dataKey="value"
                  colors={['#10b981', '#f59e0b', '#ef4444']}
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

          {/* Compliance Frameworks Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Frameworks Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {complianceFrameworks.map((framework) => (
                  <Card key={framework.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-sm">{framework.name}</h3>
                          <p className="text-xs text-muted-foreground">{framework.category}</p>
                        </div>
                        <Badge className={getStatusColor(framework.status)}>
                          {framework.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Score</span>
                          <span className={`font-bold ${getScoreColor(framework.score)}`}>
                            {framework.score}%
                          </span>
                        </div>
                        <Progress value={framework.score} className="h-2" />
                        
                        <div className="text-xs text-muted-foreground">
                          {framework.passedControls}/{framework.totalControls} controls passed
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Next audit: {new Date(framework.nextAudit).toLocaleDateString()}
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Auditor: {framework.auditor}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="controls" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Control Categories Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartComponent
                data={controlsByCategory}
                xDataKey="name"
                bars={[
                  { dataKey: 'passed', name: 'Passed', color: '#10b981' },
                  { dataKey: 'failed', name: 'Failed', color: '#ef4444' }
                ]}
                height={400}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Gaps Requiring Attention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceGaps.map((gap) => (
                  <div key={gap.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{gap.requirement}</h3>
                          <Badge variant="outline">{gap.framework}</Badge>
                          <Badge className={getImpactColor(gap.impact)}>
                            {gap.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {gap.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Owner: {gap.owner}</span>
                          <span>Due: {new Date(gap.dueDate).toLocaleDateString()}</span>
                          <span>Effort: {gap.effort}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Badge variant="outline">{gap.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Audits Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAudits.map((audit, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{audit.daysUntil}</div>
                        <div className="text-xs text-muted-foreground">days</div>
                      </div>
                      <div>
                        <h3 className="font-medium">{audit.framework}</h3>
                        <p className="text-sm text-muted-foreground">
                          {audit.type} • {audit.auditor}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(audit.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{audit.status}</Badge>
                      <Button variant="outline" size="sm">
                        Prepare
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
