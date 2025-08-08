'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer } from './chart-container';

interface PieChartComponentProps {
  data: any[];
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
  formatTooltip?: (value: any, name: string) => [string, string];
  formatLabel?: (entry: any) => string;
  onSegmentClick?: (data: any) => void;
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
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-sm" style={{ color: data.color }}>
            {formatTooltip 
              ? formatTooltip(data.value, data.name)[1] + ': ' + formatTooltip(data.value, data.name)[0]
              : `Value: ${data.value}`
            }
          </p>
          <p className="text-xs text-muted-foreground">
            {((data.value / data.payload.total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = (entry: any) => {
    if (!showLabels) return null;
    
    const percent = ((entry.value / entry.payload.total) * 100).toFixed(1);
    
    if (formatLabel) {
      return formatLabel(entry);
    }
    
    return `${percent}%`;
  };

  // Calculate total for percentage calculations
  const dataWithTotal = data.map(item => ({
    ...item,
    total: data.reduce((sum, d) => sum + d[dataKey], 0)
  }));

  const content = (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={dataWithTotal}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={showLabels ? CustomLabel : false}
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
