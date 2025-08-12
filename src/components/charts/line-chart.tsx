'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './chart-container';
import { getChartConfig, getChartColors } from '@/lib/chart-colors';
import { useTheme } from '@/hooks/use-theme';

interface LineChartComponentProps {
  data: Array<Record<string, string | number>>;
  xDataKey: string;
  lines: {
    dataKey: string;
    name: string;
    color?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
  }[];
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showExport?: boolean;
  colorScheme?: keyof typeof import('@/lib/chart-colors').chartColorSchemes;
  formatTooltip?: (value: string | number, name: string) => [string, string];
  formatXAxis?: (value: string | number) => string;
  formatYAxis?: (value: string | number) => string;
  onPointClick?: (data: Record<string, string | number>) => void;
}

export function LineChartComponent({
  data,
  xDataKey,
  lines,
  title,
  height = 400,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showExport = false,
  colorScheme = 'primary',
  formatTooltip,
  formatXAxis,
  formatYAxis,
  onPointClick
}: LineChartComponentProps) {
  const { isDarkMode } = useTheme();
  const chartConfig = getChartConfig(isDarkMode);

  // Auto-assign colors if not provided
  const colors = getChartColors(colorScheme);
  const colorArray = Array.isArray(colors) ? colors : Object.values(colors);
  const linesWithColors = lines.map((line, index) => ({
    ...line,
    color: line.color || colorArray[index % colorArray.length]
  }));
  
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
      <LineChart
        data={data}
        margin={chartConfig.margin}
      >
        {showGrid && <CartesianGrid strokeDasharray={chartConfig.grid.strokeDasharray} stroke={chartConfig.grid.stroke} />}
        <XAxis 
          dataKey={xDataKey}
          tickFormatter={formatXAxis}
          tick={chartConfig.xAxis.tick}
          axisLine={chartConfig.xAxis.axisLine}
          tickLine={chartConfig.xAxis.tickLine}
        />
        <YAxis 
          tickFormatter={formatYAxis}
          tick={chartConfig.yAxis.tick}
          axisLine={chartConfig.yAxis.axisLine}
          tickLine={chartConfig.yAxis.tickLine}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        {linesWithColors.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.color}
            strokeWidth={line.strokeWidth || chartConfig.strokeWidth}
            strokeDasharray={line.strokeDasharray}
            dot={chartConfig.dot}
            activeDot={chartConfig.activeDot}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  if (title) {
    return <ChartContainer title={title} showExport={showExport}>{content}</ChartContainer>;
  }

  return content;
}
