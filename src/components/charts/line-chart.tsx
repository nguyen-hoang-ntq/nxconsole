'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './chart-container';

interface LineChartComponentProps {
  data: any[];
  xDataKey: string;
  lines: {
    dataKey: string;
    name: string;
    color: string;
    strokeWidth?: number;
    strokeDasharray?: string;
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
  onPointClick?: (data: any) => void;
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
  formatTooltip,
  formatXAxis,
  formatYAxis,
  onPointClick
}: LineChartComponentProps) {
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
      <LineChart
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
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.color}
            strokeWidth={line.strokeWidth || 2}
            strokeDasharray={line.strokeDasharray}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
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
