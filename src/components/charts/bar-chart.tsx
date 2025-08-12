'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './chart-container';
import { getChartConfig } from '@/lib/chart-colors';
import { useTheme } from '@/hooks/use-theme';

interface BarChartComponentProps {
  data: Array<Record<string, string | number>>;
  xDataKey: string;
  bars: {
    dataKey: string;
    name: string;
    color: string;
    stackId?: string;
  }[];
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showExport?: boolean;
  formatTooltip?: (value: string | number, name: string) => [string, string];
  formatXAxis?: (value: string | number) => string;
  formatYAxis?: (value: string | number) => string;
  layout?: 'horizontal' | 'vertical';
}

export function BarChartComponent({
  data,
  xDataKey,
  bars,
  title,
  height = 400,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showExport = false,
  formatTooltip,
  formatXAxis,
  formatYAxis,
  layout = 'vertical'
}: BarChartComponentProps) {
  const { isDarkMode } = useTheme();
  const chartConfig = getChartConfig(isDarkMode);

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ dataKey: string; value: string | number; color: string; name?: string }>;
    label?: string | number;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div style={chartConfig.tooltip.contentStyle}>
          <p className="font-medium text-sm">{formatXAxis ? formatXAxis(label!) : label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {formatTooltip 
                ? formatTooltip(entry.value, entry.name || '')[1] + ': ' + formatTooltip(entry.value, entry.name || '')[0]
                : `${entry.name || 'Value'}: ${entry.value}`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const content = (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={layout}
        margin={chartConfig.margin}
      >
        {showGrid && <CartesianGrid strokeDasharray={chartConfig.grid.strokeDasharray} stroke={chartConfig.grid.stroke} />}
        <XAxis 
          dataKey={layout === 'vertical' ? xDataKey : undefined}
          type={layout === 'vertical' ? 'category' : 'number'}
          tickFormatter={formatXAxis}
          tick={chartConfig.xAxis.tick}
          axisLine={chartConfig.xAxis.axisLine}
          tickLine={chartConfig.xAxis.tickLine}
        />
        <YAxis 
          dataKey={layout === 'horizontal' ? xDataKey : undefined}
          type={layout === 'vertical' ? 'number' : 'category'}
          tickFormatter={formatYAxis}
          tick={chartConfig.yAxis.tick}
          axisLine={chartConfig.yAxis.axisLine}
          tickLine={chartConfig.yAxis.tickLine}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={bar.color}
            stackId={bar.stackId}
            radius={[2, 2, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );

  if (title) {
    return <ChartContainer title={title} showExport={showExport}>{content}</ChartContainer>;
  }

  return content;
}
