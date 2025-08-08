'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Budget } from '@/types';
import { cn } from '@/lib/utils';

interface BudgetTrackerProps {
  budgets: Budget[];
  loading?: boolean;
}

export function BudgetTracker({ budgets, loading = false }: BudgetTrackerProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-2 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const getStatusColor = (status: Budget['status']) => {
    switch (status) {
      case 'on-track':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'over-budget':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };
  
  const getProgressColor = (status: Budget['status']) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'over-budget':
        return 'bg-red-500';
      default:
        return 'bg-primary';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Budget Tracking
          {budgets.some(b => b.status !== 'on-track') && (
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {budgets.map((budget) => {
            const utilizationPercent = (budget.spent / budget.amount) * 100;
            const isOverThreshold = utilizationPercent >= budget.threshold;
            
            return (
              <div key={budget.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{budget.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${budget.spent.toLocaleString()} of ${budget.amount.toLocaleString()} spent
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={budget.status === 'on-track' ? 'secondary' : 'destructive'}
                      className="mb-1"
                    >
                      {budget.status.replace('-', ' ')}
                    </Badge>
                    <p className={cn('text-sm font-medium', getStatusColor(budget.status))}>
                      {utilizationPercent.toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={utilizationPercent} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span className="flex items-center gap-1">
                      Alert at {budget.threshold}%
                      {isOverThreshold && <AlertTriangle className="h-3 w-3 text-yellow-500" />}
                    </span>
                    <span>100%</span>
                  </div>
                </div>
                
                {/* Forecast */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">This month forecast:</span>
                    <div className="flex items-center gap-1">
                      {utilizationPercent > 90 ? (
                        <>
                          <TrendingUp className="h-3 w-3 text-red-500" />
                          <span className="text-red-600 font-medium">
                            ${(budget.spent * 1.1).toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-green-600 font-medium">
                            ${(budget.spent * 1.05).toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
