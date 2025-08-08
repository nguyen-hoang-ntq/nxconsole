'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MetricCardProps } from '@/types';

export function MetricCard({
  title,
  value,
  change,
  trend = 'neutral',
  icon: Icon,
  loading = false
}: MetricCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Skeleton className="h-4 w-24" />
          </CardTitle>
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>
    );
  }
  
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      // Format large numbers
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  const getTrendColor = () => {
    if (!change) return 'text-muted-foreground';
    
    switch (change.type) {
      case 'increase':
        return trend === 'up' ? 'text-green-600' : 'text-red-600';
      case 'decrease':
        return trend === 'down' ? 'text-red-600' : 'text-green-600';
      default:
        return 'text-muted-foreground';
    }
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">
          {formatValue(value)}
        </div>
        {change && (
          <div className={cn(
            "flex items-center text-xs",
            getTrendColor()
          )}>
            {getTrendIcon()}
            <span className="ml-1">
              {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
            </span>
            <span className="text-muted-foreground ml-1">
              from {change.period}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
