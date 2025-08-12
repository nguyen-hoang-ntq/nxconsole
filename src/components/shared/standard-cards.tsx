// Standard card layout components for consistent UI across the application
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getPillarColor, pillarTailwindClasses } from "@/lib/pillar-colors";
import { ReactNode } from "react";

interface StandardCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  pillar?: 'cost' | 'resource' | 'performance' | 'security';
  actions?: ReactNode;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
}

export function StandardCard({ 
  title, 
  description, 
  children, 
  className,
  pillar,
  actions,
  badge 
}: StandardCardProps) {
  const pillarColors = pillar ? pillarTailwindClasses[pillar] : null;
  
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className={cn(
              "text-lg font-semibold",
              pillarColors && pillarColors.text
            )}>
              {title}
              {badge && (
                <Badge variant={badge.variant || 'default'} className="ml-2">
                  {badge.text}
                </Badge>
              )}
            </CardTitle>
            {description && (
              <CardDescription className="text-sm text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: ReactNode;
  description?: string;
  pillar?: 'cost' | 'resource' | 'performance' | 'security';
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon, 
  description,
  pillar,
  className 
}: MetricCardProps) {
  const pillarColors = pillar ? pillarTailwindClasses[pillar] : null;
  
  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↙';
      case 'neutral': return '→';
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-2xl font-bold",
                pillarColors && pillarColors.text
              )}>
                {value}
              </span>
              {change && (
                <span className={cn(
                  "text-sm font-medium flex items-center",
                  getTrendColor(change.trend)
                )}>
                  {getTrendIcon(change.trend)} {change.value}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          {icon && (
            <div className={cn(
              "h-8 w-8 flex items-center justify-center rounded-md",
              pillarColors && pillarColors.bg,
              pillarColors && pillarColors.text
            )}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  pillar?: 'cost' | 'resource' | 'performance' | 'security';
  timeRange?: string;
  actions?: ReactNode;
  className?: string;
  height?: string;
}

export function ChartCard({ 
  title, 
  description, 
  children, 
  pillar,
  timeRange,
  actions,
  className,
  height = "h-[300px]"
}: ChartCardProps) {
  const pillarColors = pillar ? pillarTailwindClasses[pillar] : null;
  
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className={cn(
              "text-lg font-semibold",
              pillarColors && pillarColors.text
            )}>
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-sm text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            {timeRange && (
              <Badge variant="outline" className="text-xs">
                {timeRange}
              </Badge>
            )}
            {actions}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className={cn("w-full", height)}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

interface ListCardProps {
  title: string;
  description?: string;
  items: Array<{
    id: string;
    name: string;
    value?: string | number;
    status?: 'healthy' | 'warning' | 'error' | 'info';
    icon?: ReactNode;
    action?: ReactNode;
  }>;
  pillar?: 'cost' | 'resource' | 'performance' | 'security';
  className?: string;
  maxHeight?: string;
}

export function ListCard({ 
  title, 
  description, 
  items, 
  pillar,
  className,
  maxHeight = "max-h-[400px]"
}: ListCardProps) {
  const pillarColors = pillar ? pillarTailwindClasses[pillar] : null;
  
  const getStatusColor = (status: 'healthy' | 'warning' | 'error' | 'info') => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
    }
  };
  
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className={cn(
          "text-lg font-semibold",
          pillarColors && pillarColors.text
        )}>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className={cn("overflow-y-auto", maxHeight)}>
          <div className="space-y-2">
            {items.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <div className="h-8 w-8 flex items-center justify-center">
                      {item.icon}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    {item.value && (
                      <p className="text-xs text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.status && (
                    <Badge 
                      variant="secondary"
                      className={cn("text-xs", getStatusColor(item.status))}
                    >
                      {item.status}
                    </Badge>
                  )}
                  {item.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
