'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './chart-container';

interface AreaChartComponentProps {
  data: any[];
  xDataKey: string;
  areas: {
    dataKey: string;
    name: string;
    color: string;
    stackId?: string;
    strokeWidth?: number;
  }[];
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showExport?: boolean;
  formatTooltip?: (value: any, name: string) => [string, string];
  formatXAxis?: (value: any) => string;
  formatYAxis?: (value: any) => string;
  fillOpacity?: number;
}

export function AreaChartComponent({
  data,
  xDataKey,
  areas,
  title,
  height = 400,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showExport = false,
  formatTooltip,
  formatXAxis,
  formatYAxis,
  fillOpacity = 0.6
}: AreaChartComponentProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-sm">{formatXAxis ? formatXAxis(label) : label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {formatTooltip 
                ? formatTooltip(entry.value, entry.name)[1] + ': ' + formatTooltip(entry.value, entry.name)[0]
                : `${entry.name}: ${entry.value}`
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
      <AreaChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
        <XAxis 
          dataKey={xDataKey}
          tickFormatter={formatXAxis}
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={{ stroke: '#e2e8f0' }}
        />
        <YAxis 
          tickFormatter={formatYAxis}
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={{ stroke: '#e2e8f0' }}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        {areas.map((area, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={area.dataKey}
            name={area.name}
            stackId={area.stackId}
            stroke={area.color}
            fill={area.color}
            fillOpacity={fillOpacity}
            strokeWidth={area.strokeWidth || 2}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );

  if (title) {
    return <ChartContainer title={title} showExport={showExport}>{content}</ChartContainer>;
  }

  return content;
}
