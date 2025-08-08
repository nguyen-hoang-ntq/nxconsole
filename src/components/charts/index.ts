// Chart Components Library
export { ChartContainer } from './chart-container';
export { ChartExport } from './chart-export';
export { LineChartComponent } from './line-chart';
export { BarChartComponent } from './bar-chart';
export { PieChartComponent } from './pie-chart';
export { AreaChartComponent } from './area-chart';
export { HeatmapComponent } from './heatmap';
export { GaugeChartComponent } from './gauge-chart';
export { TimelineComponent } from './timeline';
export { MetricWidget, ProgressWidget, StatusWidget, DashboardWidgets } from './dashboard-widgets';

// Chart utility types
export interface ChartDataPoint {
  [key: string]: any;
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: any;
}

export interface ChartLegendProps {
  payload?: Array<{
    value: string;
    type: string;
    color: string;
  }>;
}

// Common chart export formats
export type ChartExportFormat = 'png' | 'svg' | 'pdf';

// Chart color schemes
export const CHART_COLORS = {
  primary: ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'],
  secondary: ['#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#84cc16'],
  muted: ['#64748b', '#71717a', '#6b7280', '#78716c', '#6b7280'],
  success: ['#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
  warning: ['#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'],
  error: ['#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d']
} as const;

// Chart configuration presets
export const CHART_PRESETS = {
  responsive: {
    height: 400,
    showGrid: true,
    showLegend: true,
    showTooltip: true
  },
  compact: {
    height: 250,
    showGrid: false,
    showLegend: false,
    showTooltip: true
  },
  detailed: {
    height: 500,
    showGrid: true,
    showLegend: true,
    showTooltip: true
  }
} as const;
