'use client';

import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { ChartContainer } from './chart-container';
import { useTheme } from '@/hooks/use-theme';

interface GaugeChartComponentProps {
  value: number;
  min?: number;
  max?: number;
  title?: string;
  subtitle?: string;
  height?: number;
  showValue?: boolean;
  showPercentage?: boolean;
  showExport?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  backgroundColor?: string;
  strokeWidth?: number;
  animationDuration?: number;
  thresholds?: {
    value: number;
    color: string;
    label?: string;
  }[];
  formatValue?: (value: number) => string;
}

export function GaugeChartComponent({
  value,
  min = 0,
  max = 100,
  title,
  subtitle,
  height = 300,
  showValue = true,
  showPercentage = false,
  showExport = false,
  size = 'md',
  color = '#3b82f6',
  backgroundColor,
  strokeWidth = 8,
  animationDuration = 1000,
  thresholds,
  formatValue
}: GaugeChartComponentProps) {
  const { isDarkMode } = useTheme();
  
  // Use CSS variables for dark mode compatible background color
  const defaultBackgroundColor = isDarkMode 
    ? 'hsl(var(--muted))' 
    : backgroundColor || '#e5e7eb';
  
  // Calculate percentage
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  
  // Determine size dimensions
  const sizeMap = {
    sm: { radius: 60, centerRadius: 45 },
    md: { radius: 80, centerRadius: 60 },
    lg: { radius: 100, centerRadius: 75 }
  };
  
  const { radius, centerRadius } = sizeMap[size];
  const circumference = 2 * Math.PI * centerRadius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color based on thresholds
  const getColor = () => {
    if (!thresholds) return color;
    
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (value >= thresholds[i].value) {
        return thresholds[i].color;
      }
    }
    return color;
  };

  const currentColor = getColor();

  const content = (
    <ResponsiveContainer width="100%" height={height}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative">
          <svg
            width={radius * 2}
            height={radius * 2}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={radius}
              cy={radius}
              r={centerRadius}
              fill="none"
              stroke={defaultBackgroundColor}
              strokeWidth={strokeWidth}
              className="opacity-20"
            />
            
            {/* Progress circle */}
            <circle
              cx={radius}
              cy={radius}
              r={centerRadius}
              fill="none"
              stroke={currentColor}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                animationDuration: `${animationDuration}ms`
              }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {showValue && (
              <div className="text-2xl font-bold" style={{ color: currentColor }}>
                {formatValue ? formatValue(value) : value}
              </div>
            )}
            {showPercentage && (
              <div className="text-sm text-muted-foreground">
                {percentage.toFixed(1)}%
              </div>
            )}
          </div>
        </div>

        {/* Title and subtitle */}
        {(title || subtitle) && (
          <div className="text-center mt-4">
            {title && (
              <div className="font-semibold text-lg">{title}</div>
            )}
            {subtitle && (
              <div className="text-sm text-muted-foreground">{subtitle}</div>
            )}
          </div>
        )}

        {/* Thresholds legend */}
        {thresholds && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {thresholds.map((threshold, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: threshold.color }}
                />
                <span className="text-muted-foreground">
                  {threshold.label || `≥${threshold.value}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ResponsiveContainer>
  );

  if (title && !showExport) {
    return content;
  }

  if (showExport && title) {
    return <ChartContainer title={title} showExport={showExport}>{content}</ChartContainer>;
  }

  return content;
}
