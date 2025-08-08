'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Sparkles,
  BarChart3,
  Zap,
  RefreshCw
} from 'lucide-react';
import { ChatBot } from '@/components/ai/chat-bot';
import { InsightsPanel } from '@/components/ai/insights-panel';
import { mockAIInsights } from '@/lib/mock-data';

export default function AIInsightsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  const handleRefreshInsights = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            AI-Powered Insights
          </h1>
          <p className="text-muted-foreground">
            Get intelligent recommendations and insights powered by AI
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshInsights} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Insights
          </Button>
          <Button size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Configure AI
          </Button>
        </div>
      </div>

      {/* AI Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">AI Conversations</p>
                <p className="text-2xl font-bold">127</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Active Insights</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Zap className="h-4 w-4 text-yellow-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Recommendations</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Accuracy Score</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="flex-1 flex flex-col min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics & Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 min-h-0">
            <div className="grid gap-6 lg:grid-cols-3 h-full">
              {/* Chat Interface */}
              <div className="lg:col-span-2 h-full">
                <ChatBot className="h-full" />
              </div>
              
              {/* Quick Insights Sidebar */}
              <div className="space-y-4 overflow-y-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 text-sm">Cost Optimization</h4>
                      <p className="text-sm text-blue-700">3 idle resources detected</p>
                      <p className="text-xs text-blue-600">Potential savings: $450/month</p>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h4 className="font-medium text-yellow-800 text-sm">Security Alert</h4>
                      <p className="text-sm text-yellow-700">2 S3 buckets misconfigured</p>
                      <p className="text-xs text-yellow-600">Action required</p>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 text-sm">Performance</h4>
                      <p className="text-sm text-green-700">System performance optimal</p>
                      <p className="text-xs text-green-600">All systems green</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trending Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm h-8">
                      💰 Cost optimization strategies
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm h-8">
                      🔒 Security best practices
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm h-8">
                      📊 Performance monitoring
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm h-8">
                      ⚡ Auto-scaling tips
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm h-8">
                      🔮 Capacity planning
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="flex-1 min-h-0">
            <InsightsPanel insights={mockAIInsights} loading={loading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
