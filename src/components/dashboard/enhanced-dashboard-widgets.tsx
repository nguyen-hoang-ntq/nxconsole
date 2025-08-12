'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  Server, 
  Activity, 
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
  RefreshCw,
  ExternalLink,
  Cloud,
  Zap,
  Eye
} from 'lucide-react';
import Link from 'next/link';

// Cost Summary Widget across all providers
export const CostSummaryWidget = () => {
  const costData = [
    { provider: 'AWS', cost: 2847, budget: 3000, utilization: 95, status: 'warning' },
    { provider: 'Azure', cost: 1653, budget: 2000, utilization: 83, status: 'success' },
    { provider: 'GCP', cost: 934, budget: 1500, utilization: 62, status: 'success' },
    { provider: 'M365', cost: 456, budget: 600, utilization: 76, status: 'success' }
  ];

  const totalCost = costData.reduce((sum, item) => sum + item.cost, 0);
  const totalBudget = costData.reduce((sum, item) => sum + item.budget, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Cost Summary
          </CardTitle>
          <Badge variant="outline">${totalCost.toLocaleString()} / ${totalBudget.toLocaleString()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {costData.map((item) => (
          <div key={item.provider} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.provider}</span>
              <div className="flex items-center gap-2">
                <span>${item.cost}</span>
                <Badge 
                  variant={item.status === 'warning' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {item.utilization}%
                </Badge>
              </div>
            </div>
            <Progress 
              value={item.utilization} 
              className="h-2"
            />
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/dashboard/cost-management">
              View Cost Details
              <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Resource Utilization Overview Widget
export const ResourceUtilizationWidget = () => {
  const resourceData = [
    { category: 'Compute', used: 89, total: 120, utilization: 74, trend: 'up' },
    { category: 'Storage', used: 2.4, total: 5.0, utilization: 48, trend: 'up', unit: 'TB' },
    { category: 'Network', used: 145, total: 200, utilization: 73, trend: 'neutral', unit: 'Mbps' },
    { category: 'Databases', used: 12, total: 20, utilization: 60, trend: 'down' }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5 text-blue-600" />
          Resource Utilization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resourceData.map((item) => (
          <div key={item.category} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.category}</span>
              <div className="flex items-center gap-2">
                <span>
                  {item.used}{item.unit || ''} / {item.total}{item.unit || ''}
                </span>
                {item.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-600" />}
                {item.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-600" />}
                {item.trend === 'neutral' && <div className="h-3 w-3" />}
              </div>
            </div>
            <Progress 
              value={item.utilization} 
              className="h-2"
            />
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/dashboard/resource-management">
              Manage Resources
              <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Performance Health Indicator Widget
export const PerformanceHealthWidget = () => {
  const performanceMetrics = [
    { metric: 'System Uptime', value: '99.8%', status: 'success', target: '99.5%' },
    { metric: 'Response Time', value: '124ms', status: 'success', target: '<200ms' },
    { metric: 'Error Rate', value: '0.02%', status: 'success', target: '<0.1%' },
    { metric: 'Throughput', value: '1.2K/s', status: 'warning', target: '>1K/s' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-600" />
          Performance Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {performanceMetrics.map((item) => (
          <div key={item.metric} className="flex items-center justify-between p-3 rounded-lg border bg-card">
            <div className="space-y-1">
              <p className="text-sm font-medium">{item.metric}</p>
              <p className="text-xs text-muted-foreground">Target: {item.target}</p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-bold ${getStatusColor(item.status)}`}>
                {item.value}
              </p>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/dashboard/performance-monitoring">
              View Performance
              <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Security Posture Summary Widget
export const SecurityPostureWidget = () => {
  const securityData = {
    overallScore: 85,
    criticalIssues: 3,
    warnings: 12,
    compliant: 94,
    frameworks: ['SOC 2', 'GDPR', 'HIPAA', 'PCI DSS']
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            Security Posture
          </CardTitle>
          {securityData.criticalIssues > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {securityData.criticalIssues}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Security Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Security Score</span>
            <span className="text-lg font-bold text-green-600">{securityData.overallScore}/100</span>
          </div>
          <Progress value={securityData.overallScore} className="h-2" />
        </div>

        {/* Compliance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Compliance</span>
            <span className="text-lg font-bold text-blue-600">{securityData.compliant}%</span>
          </div>
          <Progress value={securityData.compliant} className="h-2" />
        </div>

        {/* Issues Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 rounded-lg border bg-card">
            <p className="text-lg font-bold text-red-600">{securityData.criticalIssues}</p>
            <p className="text-xs text-muted-foreground">Critical</p>
          </div>
          <div className="text-center p-2 rounded-lg border bg-card">
            <p className="text-lg font-bold text-yellow-600">{securityData.warnings}</p>
            <p className="text-xs text-muted-foreground">Warnings</p>
          </div>
        </div>

        {/* Compliance Frameworks */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Compliance Frameworks</p>
          <div className="flex flex-wrap gap-1">
            {securityData.frameworks.map((framework) => (
              <Badge key={framework} variant="outline" className="text-xs">
                {framework}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/dashboard/security">
              Security Review
              <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// AI-Generated Insights Widget
export const AIInsightsWidget = () => {
  const insights = [
    {
      type: 'cost-optimization',
      title: 'Cost Optimization',
      message: 'Consider resizing 3 underutilized EC2 instances to save $340/month',
      confidence: 92,
      urgency: 'medium'
    },
    {
      type: 'performance',
      title: 'Performance Alert',
      message: 'Database response time increased 15% - review query optimization',
      confidence: 87,
      urgency: 'high'
    },
    {
      type: 'security',
      title: 'Security Recommendation',
      message: 'Enable MFA for 5 administrative accounts to improve security posture',
      confidence: 95,
      urgency: 'high'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Insights
          </CardTitle>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className={`p-3 rounded-lg border-l-4 bg-card ${getUrgencyColor(insight.urgency)}`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{insight.title}</p>
                <Badge variant="outline" className="text-xs">
                  {insight.confidence}% confident
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{insight.message}</p>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/dashboard/ai-insights">
              View All Insights
              <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Dashboard Widgets Container
interface EnhancedDashboardWidgetsProps {
  loading?: boolean;
}

export const EnhancedDashboardWidgets: React.FC<EnhancedDashboardWidgetsProps> = ({ loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Enhanced Dashboard</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 w-32 bg-muted rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-8 w-full bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Enhanced Dashboard Widgets</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive overview with AI-powered insights across all pillars
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            AI-Enhanced
          </Badge>
        </div>
      </div>

      {/* Enhanced Widgets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CostSummaryWidget />
        <ResourceUtilizationWidget />
        <PerformanceHealthWidget />
        <SecurityPostureWidget />
        <AIInsightsWidget />
        
        {/* System Health Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-cyan-600" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg border bg-card">
                <p className="text-2xl font-bold text-green-600">99.8%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center p-3 rounded-lg border bg-card">
                <p className="text-2xl font-bold text-blue-600">247</p>
                <p className="text-xs text-muted-foreground">Resources</p>
              </div>
              <div className="text-center p-3 rounded-lg border bg-card">
                <p className="text-2xl font-bold text-orange-600">124ms</p>
                <p className="text-xs text-muted-foreground">Response</p>
              </div>
              <div className="text-center p-3 rounded-lg border bg-card">
                <p className="text-2xl font-bold text-purple-600">1.2K</p>
                <p className="text-xs text-muted-foreground">Req/sec</p>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/dashboard/overview">
                  System Overview
                  <Eye className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboardWidgets;
