'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, AlertTriangle } from 'lucide-react';

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">
            Intelligent analytics and recommendations powered by AI.
          </p>
        </div>
        <Badge variant="secondary">New</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Sparkles className="h-16 w-16 text-muted-foreground" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">AI Insights Under Development</h3>
              <p className="text-muted-foreground max-w-md">
                This module will feature an AI chatbot, cost optimization suggestions, 
                anomaly detection, and performance predictions.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span>Implementation in progress according to Task 7</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
