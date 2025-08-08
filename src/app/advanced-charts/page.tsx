'use client';

import React from 'react';
import { 
  HeatmapComponent,
  GaugeChartComponent,
  TimelineComponent,
  MetricWidget,
  ProgressWidget,
  StatusWidget,
  DashboardWidgets,
  CHART_COLORS 
} from '@/components/charts';

// Sample data for demonstrations
const heatmapData = [
  { x: 'Mon', y: 'CPU', value: 75 },
  { x: 'Mon', y: 'Memory', value: 82 },
  { x: 'Mon', y: 'Disk', value: 45 },
  { x: 'Tue', y: 'CPU', value: 68 },
  { x: 'Tue', y: 'Memory', value: 78 },
  { x: 'Tue', y: 'Disk', value: 52 },
  { x: 'Wed', y: 'CPU', value: 89 },
  { x: 'Wed', y: 'Memory', value: 95 },
  { x: 'Wed', y: 'Disk', value: 67 },
  { x: 'Thu', y: 'CPU', value: 76 },
  { x: 'Thu', y: 'Memory', value: 84 },
  { x: 'Thu', y: 'Disk', value: 58 },
  { x: 'Fri', y: 'CPU', value: 92 },
  { x: 'Fri', y: 'Memory', value: 88 },
  { x: 'Fri', y: 'Disk', value: 73 }
];

const timelineEvents = [
  {
    id: '1',
    title: 'System Maintenance Completed',
    description: 'Successfully completed scheduled maintenance for all production servers',
    timestamp: new Date(2024, 11, 8, 14, 30),
    type: 'success' as const,
    user: 'Admin',
    status: 'completed' as const,
    duration: 120
  },
  {
    id: '2',
    title: 'High CPU Usage Alert',
    description: 'CPU usage exceeded 90% threshold on web server cluster',
    timestamp: new Date(2024, 11, 8, 12, 15),
    type: 'warning' as const,
    user: 'System',
    status: 'in-progress' as const,
    metadata: { server: 'web-01', threshold: '90%' }
  },
  {
    id: '3',
    title: 'Database Backup Failed',
    description: 'Automated backup process failed due to insufficient storage space',
    timestamp: new Date(2024, 11, 8, 10, 45),
    type: 'error' as const,
    user: 'System',
    status: 'failed' as const,
    metadata: { database: 'prod-db', error: 'Disk full' }
  },
  {
    id: '4',
    title: 'New User Registration',
    description: 'User john.doe@company.com successfully registered',
    timestamp: new Date(2024, 11, 8, 9, 20),
    type: 'info' as const,
    user: 'Registration System',
    status: 'completed' as const
  }
];

const serverStatuses = [
  { label: 'Web Server 01', status: 'online' as const, value: '99.9%', lastUpdated: new Date() },
  { label: 'Web Server 02', status: 'online' as const, value: '99.8%', lastUpdated: new Date() },
  { label: 'Database Server', status: 'warning' as const, value: '95.2%', lastUpdated: new Date() },
  { label: 'API Gateway', status: 'maintenance' as const, value: 'Offline', lastUpdated: new Date() }
];

export default function AdvancedChartsDemo() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Advanced Charts & Visualizations</h1>
        <p className="text-muted-foreground">
          Advanced visualization components including heatmaps, gauges, timelines, and dashboard widgets
        </p>
      </div>

      {/* Dashboard Widgets Row */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Dashboard Widgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardWidgets.RevenueWidget
            title="Monthly Revenue"
            value="124,567"
            trend="up"
            trendPercentage={12.5}
            status="success"
            showTrend={true}
            showActions={true}
          />
          
          <DashboardWidgets.UsersWidget
            title="Active Users"
            value="8,542"
            trend="up"
            trendPercentage={5.2}
            status="info"
            showTrend={true}
          />
          
          <DashboardWidgets.ServerWidget
            title="Server Load"
            value="76"
            unit="%"
            trend="down"
            trendPercentage={3.1}
            status="warning"
            showTrend={true}
          />
          
          <MetricWidget
            title="Response Time"
            value="245"
            unit="ms"
            trend="neutral"
            trendPercentage={0.5}
            status="success"
            showTrend={true}
          />
        </div>
      </div>

      {/* Progress Widgets */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Progress Widgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProgressWidget
            title="Storage Usage"
            value={756}
            max={1024}
            label="756 GB of 1 TB used"
            status="warning"
            showPercentage={true}
          />
          
          <ProgressWidget
            title="Project Progress"
            value={85}
            max={100}
            label="17 of 20 tasks completed"
            status="success"
            segments={[
              { label: 'Completed', value: 17, color: '#10b981' },
              { label: 'In Progress', value: 2, color: '#f59e0b' },
              { label: 'Pending', value: 1, color: '#6b7280' }
            ]}
          />
          
          <StatusWidget
            title="System Health"
            items={serverStatuses}
            showLastUpdated={true}
          />
        </div>
      </div>

      {/* Advanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heatmap */}
        <HeatmapComponent
          title="Resource Usage Heatmap"
          data={heatmapData}
          showExport={true}
          colorScheme="blue"
          cellSize={50}
          gap={2}
          formatTooltip={(value, x, y) => `${y} on ${x}: ${value}%`}
          formatValue={(value) => `${value}%`}
        />

        {/* Gauge Chart */}
        <div className="space-y-4">
          <GaugeChartComponent
            title="System Performance"
            value={82}
            showExport={true}
            size="lg"
            color="#3b82f6"
            thresholds={[
              { value: 0, color: '#ef4444', label: 'Critical' },
              { value: 40, color: '#f59e0b', label: 'Warning' },
              { value: 70, color: '#10b981', label: 'Good' },
              { value: 90, color: '#059669', label: 'Excellent' }
            ]}
            showValue={true}
            showPercentage={true}
          />
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-xl font-semibold mb-4">System Timeline</h2>
        <TimelineComponent
          title="Recent System Events"
          events={timelineEvents}
          showExport={true}
          maxHeight={500}
          showTime={true}
          showUser={true}
          showDuration={true}
          showMetadata={true}
          groupByDate={false}
        />
      </div>

      {/* Multiple Gauges */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GaugeChartComponent
            title="CPU Usage"
            subtitle="Server 01"
            value={76}
            size="md"
            color="#ef4444"
            showValue={true}
            showPercentage={true}
          />
          
          <GaugeChartComponent
            title="Memory Usage"
            subtitle="Server 01"
            value={84}
            size="md"
            color="#f59e0b"
            showValue={true}
            showPercentage={true}
          />
          
          <GaugeChartComponent
            title="Disk Usage"
            subtitle="Server 01"
            value={45}
            size="md"
            color="#10b981"
            showValue={true}
            showPercentage={true}
          />
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-muted/50 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Advanced Features Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="font-medium mb-2">Heatmaps</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Custom color schemes</li>
              <li>• Interactive tooltips</li>
              <li>• Configurable cell sizes</li>
              <li>• Click handlers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Gauge Charts</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Threshold colors</li>
              <li>• Multiple sizes</li>
              <li>• Animated transitions</li>
              <li>• Custom formatting</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Timeline</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Event categorization</li>
              <li>• Status tracking</li>
              <li>• Metadata display</li>
              <li>• Date grouping</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Dashboard Widgets</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Metric widgets</li>
              <li>• Progress indicators</li>
              <li>• Status displays</li>
              <li>• Trend analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
