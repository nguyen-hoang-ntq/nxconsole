'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MoreVertical, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Server,
  Database
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MetricWidgetProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendPercentage?: number;
  status?: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ComponentType<{ className?: string }>;
  showTrend?: boolean;
  showActions?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onClick?: () => void;
  className?: string;
}

interface ProgressWidgetProps {
  title: string;
  value: number;
  max?: number;
  label?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  showPercentage?: boolean;
  segments?: {
    label: string;
    value: number;
    color: string;
  }[];
  className?: string;
}

interface StatusWidgetProps {
  title: string;
  items: {
    label: string;
    status: 'online' | 'offline' | 'warning' | 'maintenance';
    value?: string;
    lastUpdated?: Date;
  }[];
  showLastUpdated?: boolean;
  className?: string;
}

const TREND_ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus
};

const TREND_COLORS = {
  up: 'text-green-600 dark:text-green-400',
  down: 'text-red-600 dark:text-red-400',
  neutral: 'text-gray-600 dark:text-gray-400'
};

const STATUS_COLORS = {
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
  info: 'text-blue-600 dark:text-blue-400'
};

const STATUS_INDICATORS = {
  online: { color: 'bg-green-500', label: 'Online' },
  offline: { color: 'bg-red-500', label: 'Offline' },
  warning: { color: 'bg-yellow-500', label: 'Warning' },
  maintenance: { color: 'bg-blue-500', label: 'Maintenance' }
};

// Metric Widget Component
export function MetricWidget({
  title,
  value,
  previousValue,
  unit = '',
  trend,
  trendPercentage,
  status,
  icon: Icon = DollarSign,
  showTrend = true,
  showActions = false,
  isLoading = false,
  onRefresh,
  onClick,
  className = ''
}: MetricWidgetProps) {
  const TrendIcon = trend ? TREND_ICONS[trend] : null;
  const trendColor = trend ? TREND_COLORS[trend] : '';
  const statusColor = status ? STATUS_COLORS[status] : '';

  return (
    <Card 
      className={`hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${statusColor || 'text-muted-foreground'}`} />
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onRefresh && (
                  <DropdownMenuItem onClick={onRefresh}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  View Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="animate-pulse bg-muted h-8 w-20 rounded"></div>
              ) : (
                `${value}${unit}`
              )}
            </div>
            {showTrend && trend && trendPercentage !== undefined && TrendIcon && (
              <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
                <TrendIcon className="h-3 w-3" />
                <span>{Math.abs(trendPercentage)}%</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Progress Widget Component
export function ProgressWidget({
  title,
  value,
  max = 100,
  label,
  status = 'info',
  showPercentage = true,
  segments,
  className = ''
}: ProgressWidgetProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const statusColor = STATUS_COLORS[status];

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          {showPercentage && (
            <div className={`text-sm font-medium ${statusColor}`}>
              {percentage.toFixed(1)}%
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Progress value={percentage} className="h-2" />
          {label && (
            <p className="text-xs text-muted-foreground">{label}</p>
          )}
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

// Status Widget Component
export function StatusWidget({
  title,
  items,
  showLastUpdated = true,
  className = ''
}: StatusWidgetProps) {
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div 
                  className={`w-2 h-2 rounded-full ${STATUS_INDICATORS[item.status].color}`}
                ></div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {STATUS_INDICATORS[item.status].label}
              </Badge>
            </div>
            <div className="text-right">
              {item.value && (
                <div className="text-sm font-medium">{item.value}</div>
              )}
              {showLastUpdated && item.lastUpdated && (
                <div className="text-xs text-muted-foreground">
                  {item.lastUpdated.toLocaleTimeString([], { 
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

// Widget factory for common dashboard widgets
export const DashboardWidgets = {
  MetricWidget,
  ProgressWidget,
  StatusWidget,
  
  // Pre-configured common widgets
  RevenueWidget: (props: Omit<MetricWidgetProps, 'icon' | 'unit'>) => (
    <MetricWidget {...props} icon={DollarSign} unit="$" />
  ),
  
  UsersWidget: (props: Omit<MetricWidgetProps, 'icon'>) => (
    <MetricWidget {...props} icon={Users} />
  ),
  
  ServerWidget: (props: Omit<MetricWidgetProps, 'icon'>) => (
    <MetricWidget {...props} icon={Server} />
  ),
  
  DatabaseWidget: (props: Omit<MetricWidgetProps, 'icon'>) => (
    <MetricWidget {...props} icon={Database} />
  )
};
