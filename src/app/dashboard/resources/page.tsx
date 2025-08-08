'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Server, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import { ResourceInventory } from '@/components/resources/resource-inventory';
import { mockResources } from '@/lib/mock-data';
import { AWSIcon, AzureIcon, GCPIcon } from '@/components/icons/platform-icons';

export default function ResourcesPage() {
  const [loading, setLoading] = useState(false);

  // Calculate summary stats
  const totalResources = mockResources.length;
  const runningResources = mockResources.filter(r => r.status === 'running').length;
  const stoppedResources = mockResources.filter(r => r.status === 'stopped').length;
  const errorResources = mockResources.filter(r => r.status === 'error').length;

  const platformStats = mockResources.reduce((acc, resource) => {
    acc[resource.platform] = (acc[resource.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage your multi-cloud infrastructure
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Provision Resource
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Server className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
                <p className="text-2xl font-bold">{totalResources}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Running</p>
                <p className="text-2xl font-bold text-green-600">{runningResources}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-red-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Stopped</p>
                <p className="text-2xl font-bold text-red-600">{stoppedResources}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Issues</p>
                <p className="text-2xl font-bold text-yellow-600">{errorResources}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Distribution */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(platformStats).map(([platform, count]) => {
                const percentage = (count / totalResources) * 100;
                const PlatformIcon = platform === 'aws' ? AWSIcon : 
                                   platform === 'azure' ? AzureIcon : 
                                   platform === 'gcp' ? GCPIcon : null;
                return (
                  <div key={platform} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {PlatformIcon && <PlatformIcon size="sm" />}
                        <Badge variant="secondary">{platform.toUpperCase()}</Badge>
                        <span className="text-sm font-medium">{count} resources</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          platform === 'aws' ? 'bg-orange-500' :
                          platform === 'azure' ? 'bg-blue-500' :
                          platform === 'gcp' ? 'bg-green-500' : 'bg-primary'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Create VM Instance
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Server className="h-4 w-4 mr-2" />
              Launch Database
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Activity className="h-4 w-4 mr-2" />
              Setup Load Balancer
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Resource Inventory */}
      <ResourceInventory resources={mockResources} loading={loading} />
    </div>
  );
}
