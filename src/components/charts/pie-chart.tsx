'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer } from './chart-container';
import { getChartConfig } from '@/lib/chart-colors';
import { useTheme } from '@/hooks/use-theme';

interface PieChartComponentProps {
  data: Array<Record<string, string | number>>;
  dataKey: string;
  nameKey: string;
  colors: string[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  showExport?: boolean;
  showLabels?: boolean;
  innerRadius?: number;
  outerRadius?: number | string;
  formatTooltip?: (value: string | number, name: string) => [string, string];
  formatLabel?: (entry: Record<string, string | number>) => string;
  onSegmentClick?: (data: Record<string, string | number>) => void;
}

export function PieChartComponent({
  data,
  dataKey,
  nameKey,
  colors,
  title,
  height = 400,
  showLegend = true,
  showTooltip = true,
  showExport = false,
  showLabels = false,
  innerRadius = 0,
  outerRadius = '80%',
  formatTooltip,
  formatLabel,
  onSegmentClick
}: PieChartComponentProps) {
  const { isDarkMode } = useTheme();
  const chartConfig = getChartConfig(isDarkMode);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string; payload?: { total: number } }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div style={chartConfig.tooltip.contentStyle}>
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-sm" style={{ color: data.color }}>
            {formatTooltip 
              ? formatTooltip(data.value, data.name)[1] + ': ' + formatTooltip(data.value, data.name)[0]
              : `Value: ${data.value}`
            }
          </p>
          <p className="text-xs text-muted-foreground">
            {data.payload ? ((data.value / data.payload.total) * 100).toFixed(1) : '0'}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = (entry: { value: number; payload?: { total: number }; name: string; percent: number }) => {
    if (!showLabels) return null;
    
    const percent = entry.payload ? ((entry.value / entry.payload.total) * 100).toFixed(1) : '0';
    
    if (formatLabel) {
      return formatLabel({ name: entry.name, value: entry.value, percent: entry.percent });
    }
    
    return `${percent}%`;
  };

  // Calculate total for percentage calculations
  const dataWithTotal = data.map(item => ({
    ...item,
    total: data.reduce((sum, d) => sum + (typeof d[dataKey] === 'number' ? d[dataKey] : 0), 0)
  }));

  const content = (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={dataWithTotal}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={showLabels}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
          onClick={onSegmentClick}
        >
          {dataWithTotal.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && (
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: entry.color }}>{value}</span>
            )}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );

  if (title) {
    return <ChartContainer title={title} showExport={showExport}>{content}</ChartContainer>;
  }

  return content;
}
