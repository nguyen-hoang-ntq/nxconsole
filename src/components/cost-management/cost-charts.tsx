'use client';

import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { CostDataItem } from '@/types';

interface CostChartsProps {
  costData: CostDataItem[];
  loading?: boolean;
}

const CLOUD_COLORS = {
  AWS: '#FF9900',
  Azure: '#0078D4',
  GCP: '#4285F4',
  'On-Premise': '#6B7280'
};

export function CostCharts({ costData, loading = false }: CostChartsProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-5 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Process data for different chart types
  const cloudCostSummary = costData.reduce((acc, item) => {
    const existing = acc.find(x => x.provider === item.provider);
    if (existing) {
      existing.cost += item.cost;
    } else {
      acc.push({ provider: item.provider, cost: item.cost });
    }
    return acc;
  }, [] as Array<{ provider: string; cost: number }>);

  const serviceCostData = costData
    .reduce((acc, item) => {
      const existing = acc.find(x => x.service === item.service);
      if (existing) {
        existing.cost += item.cost;
      } else {
        acc.push({ service: item.service, cost: item.cost });
      }
      return acc;
    }, [] as Array<{ service: string; cost: number }>)
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 10);

  const dailyCostTrend = costData
    .reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString();
      const existing = acc.find(x => x.date === date);
      if (existing) {
        existing.cost += item.cost;
      } else {
        acc.push({ date, cost: item.cost });
      }
      return acc;
    }, [] as Array<{ date: string; cost: number }>)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30); // Last 30 days

  const totalCost = costData.reduce((sum, item) => sum + item.cost, 0);
  const avgDailyCost = totalCost / (dailyCostTrend.length || 1);
  
  // Calculate trend
  const recentCosts = dailyCostTrend.slice(-7);
  const previousCosts = dailyCostTrend.slice(-14, -7);
  const recentAvg = recentCosts.reduce((sum, item) => sum + item.cost, 0) / recentCosts.length;
  const previousAvg = previousCosts.reduce((sum, item) => sum + item.cost, 0) / previousCosts.length;
  const trend = ((recentAvg - previousAvg) / previousAvg) * 100;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-primary">
            Cost: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Monthly Cost</p>
                <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Daily Average</p>
                <p className="text-2xl font-bold">${avgDailyCost.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              {trend > 0 ? (
                <TrendingUp className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-500" />
              )}
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">7-Day Trend</p>
                <p className={`text-2xl font-bold ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Cloud Provider Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Cost by Cloud Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={cloudCostSummary}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ provider, percent }) => `${provider} ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="cost"
                      nameKey="provider"
                    >
                      {cloudCostSummary.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={CLOUD_COLORS[entry.provider as keyof typeof CLOUD_COLORS] || '#8884d8'} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Cost']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Services */}
            <Card>
              <CardHeader>
                <CardTitle>Top 5 Services by Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={serviceCostData.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="service" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="cost" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Services Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={serviceCostData} margin={{ bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="service" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="cost" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>30-Day Cost Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={dailyCostTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ fill: '#8884d8' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
