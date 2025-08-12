'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  User,
  Key,
  Database,
  Network,
  RefreshCw,
  ExternalLink,
  Eye,
  Lock
} from 'lucide-react';
import { AIInsightsWidget } from '@/components/ai/ai-insights-widget';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function GCPSecurityPage() {
  // Mock GCP security data
  const securityEvents = [
    { time: '00:00', threats: 1, warnings: 4, info: 8 },
    { time: '04:00', threats: 0, warnings: 6, info: 12 },
    { time: '08:00', threats: 2, warnings: 9, info: 16 },
    { time: '12:00', threats: 1, warnings: 5, info: 14 },
    { time: '16:00', threats: 3, warnings: 11, info: 18 },
    { time: '20:00', threats: 0, warnings: 3, info: 9 }
  ];

  const complianceData = [
    { framework: 'CIS GCP Benchmark', compliance: 97, status: 'Compliant' },
    { framework: 'SOC 2 Type II', compliance: 95, status: 'Compliant' },
    { framework: 'FedRAMP', compliance: 93, status: 'Minor Issues' },
    { framework: 'PCI DSS', compliance: 90, status: 'Action Required' }
  ];

  const vulnerabilityData = [
    { name: 'Critical', value: 1, color: '#ef4444' },
    { name: 'High', value: 6, color: '#f97316' },
    { name: 'Medium', value: 18, color: '#eab308' },
    { name: 'Low', value: 32, color: '#22c55e' }
  ];

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return 'text-green-600';
    if (compliance >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GCP Security</h1>
          <p className="text-muted-foreground">
            Monitor GCP security posture, compliance, and threat detection
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Security Score: 93/100
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Security Overview Cards & AI Insights */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Critical Threats</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Protected Resources</p>
                <p className="text-2xl font-bold">98</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Key className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">IAM Members</p>
                <p className="text-2xl font-bold">52</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Network className="h-4 w-4 text-purple-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Firewall Rules</p>
                <p className="text-2xl font-bold">28</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Security Insights */}
        <div className="lg:col-span-1">
          <AIInsightsWidget 
            pillar="security-compliance"
            maxInsights={2}
            showRefresh={true}
          />
        </div>
      </div>

      {/* Security Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Security Events Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Security Events (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={securityEvents}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="threats" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Threats" />
                <Area type="monotone" dataKey="warnings" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} name="Warnings" />
                <Area type="monotone" dataKey="info" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Info" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vulnerability Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Vulnerability Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vulnerabilityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {vulnerabilityData.map((entry, index) => (
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

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Compliance Frameworks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceData.map((item) => (
              <div key={item.framework} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="space-y-1">
                  <p className="font-medium">{item.framework}</p>
                  <p className="text-sm text-muted-foreground">{item.status}</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getComplianceColor(item.compliance)}`}>
                    {item.compliance}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Security Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="h-2 w-2 bg-red-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Cloud Storage bucket publicly accessible</p>
                <p className="text-xs text-muted-foreground">prod-backup-bucket • 20 minutes ago</p>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="h-2 w-2 bg-yellow-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Service account with broad permissions</p>
                <p className="text-xs text-muted-foreground">compute-sa@project.iam • 1 hour ago</p>
              </div>
              <Badge variant="secondary">High</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Firewall rule allowing wide access</p>
                <p className="text-xs text-muted-foreground">allow-ssh-from-anywhere • 2.5 hours ago</p>
              </div>
              <Badge variant="outline">Medium</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
