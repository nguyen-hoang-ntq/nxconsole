'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download, Settings } from 'lucide-react';
import { CostCharts } from '@/components/finops/cost-charts';
import { BudgetTracker } from '@/components/finops/budget-tracker';
import { mockCostDataItems, mockBudgets } from '@/lib/mock-data';

export default function FinOpsPage() {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FinOps Cost Management</h1>
          <p className="text-muted-foreground">
            Monitor and optimize your multi-cloud spending
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Budget
          </Button>
        </div>
      </div>

      {/* Cost Charts */}
      <div className="space-y-6">
        <CostCharts costData={mockCostDataItems} loading={loading} />
      </div>

      {/* Budget Tracking */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BudgetTracker budgets={mockBudgets} loading={loading} />
        </div>
        
        {/* Cost Optimization Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Optimization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-medium text-sm">Unused Resources</h4>
              <p className="text-sm text-muted-foreground">
                3 EC2 instances running idle
              </p>
              <p className="text-sm font-medium text-green-600">
                Potential savings: $450/month
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-sm">Reserved Instances</h4>
              <p className="text-sm text-muted-foreground">
                Consider RIs for production workloads
              </p>
              <p className="text-sm font-medium text-green-600">
                Potential savings: $1,200/month
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium text-sm">Right-sizing</h4>
              <p className="text-sm text-muted-foreground">
                5 over-provisioned instances
              </p>
              <p className="text-sm font-medium text-green-600">
                Potential savings: $800/month
              </p>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View All Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              <span>Create Budget</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              <span>Export Data</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              <span>Cost Alerts</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <span className="text-lg mb-1">📊</span>
              <span>Custom Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
