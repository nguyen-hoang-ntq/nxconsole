'use client';

import React from 'react';
import { 
  LineChartComponent, 
  BarChartComponent, 
  PieChartComponent, 
  AreaChartComponent,
  CHART_COLORS 
} from '@/components/charts';

const lineData = [
  { month: 'Jan', revenue: 45000, costs: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, costs: 35000, profit: 17000 },
  { month: 'Mar', revenue: 48000, costs: 33000, profit: 15000 },
  { month: 'Apr', revenue: 61000, costs: 38000, profit: 23000 },
  { month: 'May', revenue: 55000, costs: 36000, profit: 19000 },
  { month: 'Jun', revenue: 67000, costs: 41000, profit: 26000 }
];

const barData = [
  { category: 'Compute', current: 85, previous: 78 },
  { category: 'Storage', current: 92, previous: 89 },
  { category: 'Network', current: 76, previous: 82 },
  { category: 'Database', current: 88, previous: 85 },
  { category: 'Security', current: 94, previous: 91 }
];

const pieData = [
  { name: 'Azure', value: 40, color: '#0078d4' },
  { name: 'AWS', value: 35, color: '#ff9900' },
  { name: 'Google Cloud', value: 15, color: '#4285f4' },
  { name: 'On-Premises', value: 10, color: '#00c851' }
];

const areaData = [
  { time: '00:00', cpu: 45, memory: 62, network: 23 },
  { time: '04:00', cpu: 52, memory: 58, network: 31 },
  { time: '08:00', cpu: 78, memory: 85, network: 67 },
  { time: '12:00', cpu: 89, memory: 92, network: 84 },
  { time: '16:00', cpu: 76, memory: 78, network: 59 },
  { time: '20:00', cpu: 65, memory: 71, network: 43 }
];

export default function ChartsDemo() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Charts & Data Visualization</h1>
        <p className="text-muted-foreground">
          Comprehensive chart components library with interactive features and export capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <LineChartComponent
          title="Financial Performance"
          data={lineData}
          xDataKey="month"
          lines={[
            { dataKey: 'revenue', name: 'Revenue', color: CHART_COLORS.primary[0] },
            { dataKey: 'costs', name: 'Costs', color: CHART_COLORS.error[0] },
            { dataKey: 'profit', name: 'Profit', color: CHART_COLORS.success[0] }
          ]}
          showExport={true}
          formatTooltip={(value, name) => [`$${value.toLocaleString()}`, name]}
        />

        {/* Bar Chart */}
        <BarChartComponent
          title="Performance Metrics"
          data={barData}
          xDataKey="category"
          bars={[
            { dataKey: 'current', name: 'Current', color: CHART_COLORS.primary[0] },
            { dataKey: 'previous', name: 'Previous', color: CHART_COLORS.secondary[0] }
          ]}
          showExport={true}
          formatTooltip={(value, name) => [`${value}%`, name]}
        />

        {/* Pie Chart */}
        <PieChartComponent
          title="Cloud Provider Distribution"
          data={pieData}
          dataKey="value"
          nameKey="name"
          colors={['#0078d4', '#ff9900', '#4285f4', '#00c851']}
          showExport={true}
          showLabels={true}
          innerRadius={60}
        />

        {/* Area Chart */}
        <AreaChartComponent
          title="System Resource Usage"
          data={areaData}
          xDataKey="time"
          areas={[
            { dataKey: 'cpu', name: 'CPU', color: CHART_COLORS.primary[0], stackId: '1' },
            { dataKey: 'memory', name: 'Memory', color: CHART_COLORS.warning[0], stackId: '1' },
            { dataKey: 'network', name: 'Network', color: CHART_COLORS.success[0], stackId: '1' }
          ]}
          showExport={true}
          formatTooltip={(value, name) => [`${value}%`, name]}
        />
      </div>

      {/* Large Dashboard Chart */}
      <div className="mt-8">
        <LineChartComponent
          title="Comprehensive Dashboard Overview"
          data={lineData}
          xDataKey="month"
          lines={[
            { dataKey: 'revenue', name: 'Revenue', color: CHART_COLORS.primary[0] },
            { dataKey: 'costs', name: 'Costs', color: CHART_COLORS.error[0] },
            { dataKey: 'profit', name: 'Profit', color: CHART_COLORS.success[0] }
          ]}
          height={500}
          showExport={true}
          formatTooltip={(value, name) => [`$${value.toLocaleString()}`, name]}
          formatYAxis={(value) => `$${(Number(value) / 1000).toFixed(0)}K`}
        />
      </div>

      {/* Chart Features Overview */}
      <div className="bg-muted/50 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Chart Library Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-medium mb-2">Interactive Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Custom tooltips</li>
              <li>• Responsive containers</li>
              <li>• Click handlers</li>
              <li>• Hover effects</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Export Options</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• PNG format</li>
              <li>• SVG format</li>
              <li>• PDF format</li>
              <li>• Custom titles</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Customization</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Color schemes</li>
              <li>• Data formatting</li>
              <li>• Layout options</li>
              <li>• Preset configurations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
