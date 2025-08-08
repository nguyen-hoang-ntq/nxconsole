'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Server,
  Shield,
  Zap,
  Brain,
  Target,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { AIInsight } from '@/types';
import { cn } from '@/lib/utils';

interface InsightsPanelProps {
  insights: AIInsight[];
  loading?: boolean;
}

const insightIcons = {
  cost: DollarSign,
  security: Shield,
  performance: Server,
  optimization: Zap
};

const severityConfig = {
  low: { color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
  medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' },
  high: { color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' },
  critical: { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' }
};

const mockPredictions = [
  {
    title: "Cost Forecast",
    current: 45678,
    predicted: 48200,
    change: 5.5,
    confidence: 89,
    timeframe: "Next 30 days",
    trend: "up"
  },
  {
    title: "Security Score",
    current: 78,
    predicted: 82,
    change: 5.1,
    confidence: 92,
    timeframe: "After remediation",
    trend: "up"
  },
  {
    title: "Resource Utilization",
    current: 67,
    predicted: 73,
    change: 9.0,
    confidence: 85,
    timeframe: "Next quarter",
    trend: "up"
  }
];

const mockAnomalies = [
  {
    title: "Unusual Cost Spike",
    description: "EC2 spending increased 340% in us-west-2",
    severity: "high" as const,
    detectedAt: "2 hours ago",
    impact: "Budget overrun risk"
  },
  {
    title: "Performance Degradation",
    description: "Database response time increased 45%",
    severity: "medium" as const,
    detectedAt: "4 hours ago",
    impact: "User experience affected"
  },
  {
    title: "Security Pattern Change",
    description: "Unusual login patterns detected",
    severity: "critical" as const,
    detectedAt: "15 minutes ago",
    impact: "Potential security breach"
  }
];

export function InsightsPanel({ insights, loading = false }: InsightsPanelProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-5 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Analysis Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">87</div>
              <div className="text-sm text-muted-foreground">Overall Health Score</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+5 from last week</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24</div>
              <div className="text-sm text-muted-foreground">Active Insights</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Lightbulb className="h-3 w-3 text-blue-600" />
                <span className="text-xs text-blue-600">3 new today</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">$12.4K</div>
              <div className="text-sm text-muted-foreground">Potential Savings</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Target className="h-3 w-3 text-orange-600" />
                <span className="text-xs text-orange-600">Monthly</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            AI Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPredictions.map((prediction, index) => {
              const changeIcon = prediction.trend === 'up' ? TrendingUp : TrendingDown;
              const changeColor = prediction.change > 0 ? 'text-green-600' : 'text-red-600';
              
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{prediction.title}</h4>
                    <p className="text-sm text-muted-foreground">{prediction.timeframe}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm">Confidence:</span>
                      <Progress value={prediction.confidence} className="w-20 h-2" />
                      <span className="text-sm text-muted-foreground">{prediction.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {typeof prediction.current === 'number' && prediction.current > 1000 
                          ? `$${(prediction.current / 1000).toFixed(1)}K`
                          : prediction.current
                        }
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="text-2xl font-bold">
                        {typeof prediction.predicted === 'number' && prediction.predicted > 1000 
                          ? `$${(prediction.predicted / 1000).toFixed(1)}K`
                          : prediction.predicted
                        }
                      </span>
                    </div>
                    <div className={cn("flex items-center gap-1 justify-end", changeColor)}>
                      {React.createElement(changeIcon, { className: "h-3 w-3" })}
                      <span className="text-sm font-medium">+{prediction.change}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Anomaly Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Anomaly Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnomalies.map((anomaly, index) => {
              const config = severityConfig[anomaly.severity];
              
              return (
                <div key={index} className={cn("p-4 border rounded-lg", config.border, config.bg)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{anomaly.title}</h4>
                        <Badge variant={anomaly.severity === 'critical' ? 'destructive' : 'default'}>
                          {anomaly.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {anomaly.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Detected: {anomaly.detectedAt}</span>
                        <span>Impact: {anomaly.impact}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Investigate
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => {
              const Icon = insightIcons[insight.category as keyof typeof insightIcons] || Lightbulb;
              
              return (
                <div key={insight.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge variant="secondary">{insight.category}</Badge>
                        {insight.priority === 'high' && (
                          <Badge variant="destructive">High Priority</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {insight.description}
                      </p>
                      
                      {insight.recommendation && (
                        <div className="bg-muted/50 p-3 rounded-lg mb-2">
                          <p className="text-sm">
                            <strong>Recommendation:</strong> {insight.recommendation}
                          </p>
                        </div>
                      )}
                      
                      {insight.impact && (
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Impact: {insight.impact}</span>
                          <span>Confidence: {insight.confidence}%</span>
                          <span>{insight.timestamp.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      <Button size="sm">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
