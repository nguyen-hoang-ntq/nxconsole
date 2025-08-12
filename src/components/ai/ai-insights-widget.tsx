'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  ExternalLink,
  RefreshCw,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { AIInsight } from '@/types';
import { aiInsightService, PillarType } from '@/lib/ai-insight-service';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AIInsightsWidgetProps {
  pillar: PillarType;
  maxInsights?: number;
  showRefresh?: boolean;
  className?: string;
}

const severityConfig = {
  low: { 
    color: 'text-blue-600', 
    bg: 'bg-blue-50', 
    border: 'border-blue-200',
    icon: Lightbulb
  },
  medium: { 
    color: 'text-yellow-600', 
    bg: 'bg-yellow-50', 
    border: 'border-yellow-200',
    icon: TrendingUp
  },
  high: { 
    color: 'text-red-600', 
    bg: 'bg-red-50', 
    border: 'border-red-200',
    icon: AlertTriangle
  }
};

const typeConfig = {
  'cost-optimization': { label: 'Cost Optimization', color: 'bg-green-100 text-green-800' },
  'security-alert': { label: 'Security Alert', color: 'bg-red-100 text-red-800' },
  'security-risk': { label: 'Security Risk', color: 'bg-orange-100 text-orange-800' },
  'performance-prediction': { label: 'Performance Prediction', color: 'bg-blue-100 text-blue-800' },
  'performance-optimization': { label: 'Performance Optimization', color: 'bg-purple-100 text-purple-800' },
  'anomaly-detection': { label: 'Anomaly Detection', color: 'bg-yellow-100 text-yellow-800' },
  'capacity-planning': { label: 'Capacity Planning', color: 'bg-indigo-100 text-indigo-800' },
  'license-optimization': { label: 'License Optimization', color: 'bg-cyan-100 text-cyan-800' }
};

export const AIInsightsWidget: React.FC<AIInsightsWidgetProps> = ({
  pillar,
  maxInsights = 3,
  showRefresh = true,
  className
}) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInsights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await aiInsightService.getInsightsForPillar(pillar);
      setInsights(data.slice(0, maxInsights));
    } catch (err) {
      setError('Failed to load AI insights');
      console.error('Error loading insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, [pillar, maxInsights]);

  const getInsightIcon = (insight: AIInsight) => {
    const config = severityConfig[insight.priority] || severityConfig.medium;
    const IconComponent = config.icon;
    return <IconComponent className={cn('h-4 w-4', config.color)} />;
  };

  const getActionUrl = (insight: AIInsight): string => {
    return insight.data?.actionUrl as string || '#';
  };

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <AlertTriangle className="h-6 w-6 mr-2" />
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Insights
          </CardTitle>
          {showRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={loadInsights}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-muted-foreground">Loading insights...</span>
          </div>
        ) : insights.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Lightbulb className="h-6 w-6 mr-2" />
            No insights available
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={insight.id}>
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {getInsightIcon(insight)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm truncate">{insight.title}</h4>
                          <Badge 
                            variant="secondary" 
                            className={cn('text-xs', typeConfig[insight.type]?.color)}
                          >
                            {typeConfig[insight.type]?.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-muted-foreground">
                        {insight.confidence}% confidence
                      </div>
                      <Badge 
                        variant="outline"
                        className={cn(
                          'text-xs mt-1',
                          severityConfig[insight.priority]?.color
                        )}
                      >
                        {insight.priority} priority
                      </Badge>
                    </div>
                  </div>

                  {/* Recommendations */}
                  {insight.recommendations.length > 0 && (
                    <div className="ml-7">
                      <div className="text-xs font-medium text-muted-foreground mb-2">
                        Recommendations:
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {insight.recommendations.slice(0, 2).map((rec, recIndex) => (
                          <li key={recIndex} className="flex items-start gap-1">
                            <span className="text-muted-foreground">•</span>
                            <span className="line-clamp-1">{rec}</span>
                          </li>
                        ))}
                        {insight.recommendations.length > 2 && (
                          <li className="text-xs text-muted-foreground italic">
                            +{insight.recommendations.length - 2} more recommendations
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Action */}
                  <div className="ml-7">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      asChild
                    >
                      <Link href={getActionUrl(insight)}>
                        Take Action
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {index < insights.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}

            {/* View All Link */}
            <div className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-8 text-xs"
                asChild
              >
                <Link href="/dashboard/ai-insights">
                  View All AI Insights
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
