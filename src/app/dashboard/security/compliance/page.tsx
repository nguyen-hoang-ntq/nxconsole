'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  Award,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  Eye,
  Target,
  BookOpen
} from 'lucide-react';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function ComplianceReportsPage() {
  // Mock compliance data
  const frameworkCompliance = [
    { framework: 'SOC 2 Type II', score: 98, status: 'Compliant', lastAudit: '2024-07-15' },
    { framework: 'ISO 27001', score: 96, status: 'Compliant', lastAudit: '2024-06-20' },
    { framework: 'GDPR', score: 94, status: 'Minor Issues', lastAudit: '2024-08-01' },
    { framework: 'HIPAA', score: 92, status: 'Minor Issues', lastAudit: '2024-07-30' },
    { framework: 'PCI DSS', score: 89, status: 'Action Required', lastAudit: '2024-08-05' },
    { framework: 'NIST CSF', score: 91, status: 'Minor Issues', lastAudit: '2024-07-25' }
  ];

  const complianceRadarData = [
    { subject: 'Identity & Access', A: 95, B: 98, fullMark: 100 },
    { subject: 'Data Protection', A: 88, B: 92, fullMark: 100 },
    { subject: 'Network Security', A: 92, B: 89, fullMark: 100 },
    { subject: 'Incident Response', A: 85, B: 94, fullMark: 100 },
    { subject: 'Risk Management', A: 90, B: 87, fullMark: 100 },
    { subject: 'Governance', A: 94, B: 96, fullMark: 100 }
  ];

  const controlsStatusData = [
    { name: 'Implemented', value: 342, color: '#22c55e' },
    { name: 'Partially Implemented', value: 45, color: '#eab308' },
    { name: 'Not Implemented', value: 18, color: '#ef4444' },
    { name: 'Not Applicable', value: 23, color: '#6b7280' }
  ];

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Compliant':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case 'Minor Issues':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
      case 'Action Required':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compliance Reports</h1>
          <p className="text-muted-foreground">
            Monitor compliance status across frameworks and generate audit reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            Overall Score: 93/100
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Compliance Overview Cards & AI Insights */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Active Frameworks</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Compliant</p>
                <p className="text-2xl font-bold text-green-600">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Minor Issues</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-4 w-4 text-purple-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Control Coverage</p>
                <p className="text-2xl font-bold">84%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Compliance Insights */}
        <div className="lg:col-span-1">
          <AIInsightsWidget 
            pillar="security-compliance"
            maxInsights={2}
            showRefresh={true}
          />
        </div>
      </div>

      {/* Compliance Framework Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Compliance Framework Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {frameworkCompliance.map((item) => (
              <div key={item.framework} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{item.framework}</p>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(item.status)}
                      <span className={`text-lg font-bold ${getComplianceColor(item.score)}`}>
                        {item.score}%
                      </span>
                    </div>
                  </div>
                  <Progress value={item.score} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Last audit: {new Date(item.lastAudit).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Compliance Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Security Control Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={complianceRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Current" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Target" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Controls Implementation Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Controls Implementation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={controlsStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {controlsStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Audit Findings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Recent Audit Findings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="h-2 w-2 bg-red-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Incomplete data retention policy documentation</p>
                <p className="text-xs text-muted-foreground">GDPR Article 5 • Identified during Q3 audit</p>
              </div>
              <Badge variant="destructive">High Priority</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="h-2 w-2 bg-yellow-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Missing encryption evidence for certain data flows</p>
                <p className="text-xs text-muted-foreground">SOC 2 CC6.1 • Requires additional documentation</p>
              </div>
              <Badge variant="secondary">Medium Priority</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Access review cycle needs formal documentation</p>
                <p className="text-xs text-muted-foreground">ISO 27001 A.9.2.5 • Process improvement opportunity</p>
              </div>
              <Badge variant="outline">Low Priority</Badge>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Incident response plan updated and tested</p>
                <p className="text-xs text-muted-foreground">NIST CSF RS.RP-1 • Successfully validated</p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Generate Compliance Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Award className="mr-2 h-4 w-4" />
              Schedule Audit Assessment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              Review Control Mappings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Compliance Trends
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div>
                  <p className="font-medium">SOC 2 Type II Annual</p>
                  <p className="text-sm text-muted-foreground">External auditor assessment</p>
                </div>
                <Badge variant="outline">Sep 15, 2024</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div>
                  <p className="font-medium">ISO 27001 Surveillance</p>
                  <p className="text-sm text-muted-foreground">6-month review cycle</p>
                </div>
                <Badge variant="outline">Oct 20, 2024</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div>
                  <p className="font-medium">PCI DSS Assessment</p>
                  <p className="text-sm text-muted-foreground">Annual compliance validation</p>
                </div>
                <Badge variant="outline">Nov 30, 2024</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
