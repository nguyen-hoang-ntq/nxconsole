'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MoreVertical, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { MetricWidget, ProgressWidget, StatusWidget } from './dashboard-widgets';

interface CloudMetricWidgetProps {
  provider: 'microsoft' | 'amazon' | 'google';
  service: string;
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendPercentage?: number;
  status?: 'success' | 'warning' | 'error' | 'info';
  showTrend?: boolean;
  showActions?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onClick?: () => void;
  className?: string;
}

interface CloudServiceStatusProps {
  provider: 'microsoft' | 'amazon' | 'google';
  services: {
    name: string;
    service: string;
    status: 'online' | 'offline' | 'warning' | 'maintenance';
    region?: string;
    lastUpdated?: Date;
  }[];
  showLastUpdated?: boolean;
  className?: string;
}

interface CloudUsageWidgetProps {
  provider: 'microsoft' | 'amazon' | 'google';
  service: string;
  title: string;
  current: number;
  limit: number;
  unit: string;
  status?: 'success' | 'warning' | 'error';
  segments?: {
    label: string;
    value: number;
    color: string;
  }[];
  className?: string;
}

// Cloud-specific Metric Widget
export function CloudMetricWidget({
  provider,
  service,
  title,
  value,
  unit = '',
  trend,
  trendPercentage,
  status,
  showTrend = true,
  showActions = false,
  isLoading = false,
  onRefresh,
  onClick,
  className = ''
}: CloudMetricWidgetProps) {
  return (
    <MetricWidget
      title={title}
      value={value}
      unit={unit}
      trend={trend}
      trendPercentage={trendPercentage}
      status={status}
      icon={() => <CloudIcon provider={provider} service={service} size={16} />}
      showTrend={showTrend}
      showActions={showActions}
      isLoading={isLoading}
      onRefresh={onRefresh}
      onClick={onClick}
      className={className}
    />
  );
}

// Cloud Service Status Widget
export function CloudServiceStatusWidget({
  provider,
  services,
  showLastUpdated = true,
  className = ''
}: CloudServiceStatusProps) {
  const title = `${provider.charAt(0).toUpperCase() + provider.slice(1)} Services`;
  
  const statusItems = services.map(service => ({
    label: `${service.name}${service.region ? ` (${service.region})` : ''}`,
    status: service.status,
    value: service.region,
    lastUpdated: service.lastUpdated
  }));

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
          <CloudIcon provider={provider} service={provider} size={16} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <CloudIcon provider={provider} service={service.service} size={14} />
                <span className="text-sm font-medium">{service.name}</span>
              </div>
              <Badge 
                variant={
                  service.status === 'online' ? 'default' : 
                  service.status === 'warning' ? 'secondary' : 
                  service.status === 'maintenance' ? 'outline' : 'destructive'
                } 
                className="text-xs"
              >
                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
              </Badge>
            </div>
            <div className="text-right">
              {service.region && (
                <div className="text-sm font-medium">{service.region}</div>
              )}
              {showLastUpdated && service.lastUpdated && (
                <div className="text-xs text-muted-foreground">
                  {service.lastUpdated.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Cloud Usage Widget (for quotas, limits, etc.)
export function CloudUsageWidget({
  provider,
  service,
  title,
  current,
  limit,
  unit,
  status = 'success',
  segments,
  className = ''
}: CloudUsageWidgetProps) {
  const percentage = Math.min((current / limit) * 100, 100);
  
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
          <CloudIcon provider={provider} service={service} size={16} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{current}{unit}</div>
          <div className={`text-sm font-medium ${
            status === 'success' ? 'text-green-600' :
            status === 'warning' ? 'text-yellow-600' :
            status === 'error' ? 'text-red-600' : 'text-blue-600'
          }`}>
            {percentage.toFixed(1)}%
          </div>
        </div>
        
        <div className="space-y-2">
          <Progress value={percentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {current} of {limit} {unit} used
          </p>
        </div>

        {segments && (
          <div className="space-y-1">
            {segments.map((segment, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: segment.color }}
                  ></div>
                  <span>{segment.label}</span>
                </div>
                <span className="font-medium">{segment.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Pre-configured Cloud Widgets Factory
export const CloudDashboardWidgets = {
  // Generic cloud widgets
  CloudMetricWidget,
  CloudServiceStatusWidget,
  CloudUsageWidget,
  
  // AWS specific widgets
  AWSCostWidget: (props: Omit<CloudMetricWidgetProps, 'provider' | 'service'>) => (
    <CloudMetricWidget {...props} provider="amazon" service="billing" />
  ),
  
  EC2Widget: (props: Omit<CloudMetricWidgetProps, 'provider' | 'service'>) => (
    <CloudMetricWidget {...props} provider="amazon" service="ec2" />
  ),
  
  S3Widget: (props: Omit<CloudMetricWidgetProps, 'provider' | 'service'>) => (
    <CloudMetricWidget {...props} provider="amazon" service="s3" />
  ),
  
  // Azure specific widgets
  AzureCostWidget: (props: Omit<CloudMetricWidgetProps, 'provider' | 'service'>) => (
    <CloudMetricWidget {...props} provider="microsoft" service="billing" />
  ),
  
  VirtualMachinesWidget: (props: Omit<CloudMetricWidgetProps, 'provider' | 'service'>) => (
    <CloudMetricWidget {...props} provider="microsoft" service="vm" />
  ),
  
  BlobStorageWidget: (props: Omit<CloudMetricWidgetProps, 'provider' | 'service'>) => (
    <CloudMetricWidget {...props} provider="microsoft" service="storage" />
  ),
  
  // Google Cloud specific widgets
  GCPCostWidget: (props: Omit<CloudMetricWidgetProps, 'provider' | 'service'>) => (
    <CloudMetricWidget {...props} provider="google" service="billing" />
  ),
  
  ComputeEngineWidget: (props: Omit<CloudMetricWidgetProps, 'provider' | 'service'>) => (
    <CloudMetricWidget {...props} provider="google" service="compute" />
  ),
  
  CloudStorageWidget: (props: Omit<CloudMetricWidgetProps, 'provider' | 'service'>) => (
    <CloudMetricWidget {...props} provider="google" service="storage" />
  ),
  
  // Service status widgets
  AWSServicesStatus: (services: CloudServiceStatusProps['services']) => (
    <CloudServiceStatusWidget provider="amazon" services={services} />
  ),
  
  AzureServicesStatus: (services: CloudServiceStatusProps['services']) => (
    <CloudServiceStatusWidget provider="microsoft" services={services} />
  ),
  
  GCPServicesStatus: (services: CloudServiceStatusProps['services']) => (
    <CloudServiceStatusWidget provider="google" services={services} />
  ),

  GoogleWorkspaceLicenseWidget: (props: Omit<CloudMetricWidgetProps, 'provider' | 'service'>) => (
    <CloudMetricWidget 
      {...props} 
      provider="google" 
      service="workspace"
    />
  )
};

export default CloudDashboardWidgets;
