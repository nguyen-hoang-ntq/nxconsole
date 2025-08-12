'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Server, 
  Activity, 
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface PillarMetric {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  status?: 'success' | 'warning' | 'error' | 'neutral';
}

interface PillarSummaryCardProps {
  pillar: 'cost-management' | 'resource-management' | 'performance-monitoring' | 'security-compliance';
  title: string;
  description: string;
  icon: React.ElementType;
  metrics: PillarMetric[];
  alerts?: number;
  href: string;
  loading?: boolean;
}

const PillarSummaryCard: React.FC<PillarSummaryCardProps> = ({
  pillar,
  title,
  description,
  icon: Icon,
  metrics,
  alerts = 0,
  href,
  loading = false
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-600" />;
      default: return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getPillarColor = () => {
    switch (pillar) {
      case 'cost-management': return 'border-l-green-500';
      case 'resource-management': return 'border-l-blue-500';
      case 'performance-monitoring': return 'border-l-orange-500';
      case 'security-compliance': return 'border-l-red-500';
      default: return 'border-l-gray-500';
    }
  };

  if (loading) {
    return (
      <Card className={`border-l-4 ${getPillarColor()} animate-pulse`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-muted rounded-lg" />
              <div>
                <div className="h-5 w-32 bg-muted rounded" />
                <div className="h-4 w-48 bg-muted rounded mt-1" />
              </div>
            </div>
            <div className="h-6 w-16 bg-muted rounded" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-5 w-12 bg-muted rounded" />
              </div>
            ))}
          </div>
          <div className="h-9 w-full bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-l-4 ${getPillarColor()} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          {alerts > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {alerts}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">{metric.label}</p>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </span>
                {metric.trend && metric.trendValue && (
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className="text-xs text-muted-foreground">
                      {metric.trendValue}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Action Button */}
        <Button asChild variant="outline" className="w-full">
          <Link href={href} className="flex items-center justify-center gap-2">
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

interface PillarSummaryCardsProps {
  loading?: boolean;
}

export const PillarSummaryCards: React.FC<PillarSummaryCardsProps> = ({ loading = false }) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cloud Management Pillars</h2>
          <p className="text-muted-foreground">
            Overview of your cloud infrastructure across all management pillars
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-sm text-green-600 font-medium">All systems operational</span>
        </div>
      </div>

      {/* Pillar Summary Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Cost Management Pillar */}
        <PillarSummaryCard
          pillar="cost-management"
          title="Cost Management"
          description="Monitor spending across AWS, Azure, GCP, and M365"
          icon={DollarSign}
          metrics={[
            { 
              label: 'Monthly Total', 
              value: '$5,434', 
              trend: 'up', 
              trendValue: 8.2, 
              status: 'warning' 
            },
            { 
              label: 'AWS Cost', 
              value: '$2,847', 
              trend: 'up', 
              trendValue: 12.1, 
              status: 'warning' 
            },
            { 
              label: 'Azure Cost', 
              value: '$1,653', 
              trend: 'down', 
              trendValue: 4.3, 
              status: 'success' 
            },
            { 
              label: 'Budget Usage', 
              value: '89%', 
              trend: 'up', 
              trendValue: 5.2, 
              status: 'warning' 
            }
          ]}
          alerts={2}
          href="/dashboard/cost-management"
          loading={loading}
        />

        {/* Resource Management Pillar */}
        <PillarSummaryCard
          pillar="resource-management"
          title="Resource Management"
          description="Manage compute, networking, storage across clouds"
          icon={Server}
          metrics={[
            { 
              label: 'Total Resources', 
              value: '247', 
              trend: 'up', 
              trendValue: 3.1, 
              status: 'success' 
            },
            { 
              label: 'Active VMs', 
              value: '89', 
              trend: 'neutral', 
              trendValue: 0.5, 
              status: 'success' 
            },
            { 
              label: 'Utilization', 
              value: '74%', 
              trend: 'up', 
              trendValue: 2.8, 
              status: 'success' 
            },
            { 
              label: 'Optimization Score', 
              value: '82%', 
              trend: 'up', 
              trendValue: 1.4, 
              status: 'success' 
            }
          ]}
          alerts={0}
          href="/dashboard/resource-management"
          loading={loading}
        />

        {/* Performance Monitoring Pillar */}
        <PillarSummaryCard
          pillar="performance-monitoring"
          title="Performance Monitoring"
          description="Real-time performance metrics and alerts"
          icon={Activity}
          metrics={[
            { 
              label: 'System Uptime', 
              value: '99.8%', 
              trend: 'up', 
              trendValue: 0.2, 
              status: 'success' 
            },
            { 
              label: 'Avg Response', 
              value: '124ms', 
              trend: 'down', 
              trendValue: 8.5, 
              status: 'success' 
            },
            { 
              label: 'Error Rate', 
              value: '0.02%', 
              trend: 'down', 
              trendValue: 15.2, 
              status: 'success' 
            },
            { 
              label: 'Active Alerts', 
              value: '3', 
              trend: 'down', 
              trendValue: 25.0, 
              status: 'warning' 
            }
          ]}
          alerts={1}
          href="/dashboard/performance-monitoring"
          loading={loading}
        />

        {/* Security & Compliance Pillar */}
        <PillarSummaryCard
          pillar="security-compliance"
          title="Security & Compliance"
          description="Security posture and compliance monitoring"
          icon={Shield}
          metrics={[
            { 
              label: 'Security Score', 
              value: '85/100', 
              trend: 'up', 
              trendValue: 2.1, 
              status: 'success' 
            },
            { 
              label: 'Critical Issues', 
              value: '3', 
              trend: 'down', 
              trendValue: 40.0, 
              status: 'error' 
            },
            { 
              label: 'Compliance', 
              value: '94%', 
              trend: 'up', 
              trendValue: 1.8, 
              status: 'success' 
            },
            { 
              label: 'Audit Events', 
              value: '247', 
              trend: 'up', 
              trendValue: 12.3, 
              status: 'neutral' 
            }
          ]}
          alerts={3}
          href="/dashboard/security"
          loading={loading}
        />
      </div>

      {/* Executive Summary Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <TrendingUp className="h-5 w-5" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Cost Optimization</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Monthly spending is trending up 8.2%. Consider reviewing AWS resource usage to optimize costs.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Infrastructure Health</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Systems are performing well with 99.8% uptime. Resource utilization is optimal at 74%.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Security Posture</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Good security posture with 85/100 score. Address 3 critical security issues for improved protection.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PillarSummaryCards;
