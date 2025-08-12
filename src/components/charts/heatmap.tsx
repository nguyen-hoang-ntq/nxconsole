'use client';

import React, { useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import { ChartContainer } from './chart-container';
import { getChartConfig } from '@/lib/chart-colors';
import { useTheme } from '@/hooks/use-theme';

interface HeatmapData {
  x: string | number;
  y: string | number;
  value: number;
  label?: string;
}

interface HeatmapComponentProps {
  data: HeatmapData[];
  title?: string;
  height?: number;
  width?: number;
  showTooltip?: boolean;
  showExport?: boolean;
  colorScheme?: 'blue' | 'green' | 'red' | 'purple' | 'custom';
  customColors?: string[];
  minValue?: number;
  maxValue?: number;
  cellSize?: number;
  gap?: number;
  formatTooltip?: (value: number, x: string | number, y: string | number) => string;
  formatValue?: (value: number) => string;
  onCellClick?: (data: HeatmapData) => void;
}

const COLOR_SCHEMES = {
  blue: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1'],
  green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d'],
  red: ['#fef2f2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b'],
  purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7c3aed'],
  custom: ['#ffffff', '#000000']
};

export function HeatmapComponent({
  data,
  title,
  height = 400,
  width,
  showTooltip = true,
  showExport = false,
  colorScheme = 'blue',
  customColors,
  minValue,
  maxValue,
  cellSize = 40,
  gap = 2,
  formatTooltip,
  formatValue,
  onCellClick
}: HeatmapComponentProps) {
  const { isDarkMode } = useTheme();
  const chartConfig = getChartConfig(isDarkMode);
  const [hoveredCell, setHoveredCell] = useState<HeatmapData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Calculate min/max values if not provided
  const values = data.map(d => d.value);
  const min = minValue ?? Math.min(...values);
  const max = maxValue ?? Math.max(...values);

  // Get unique x and y values
  const xValues = Array.from(new Set(data.map(d => d.x))).sort();
  const yValues = Array.from(new Set(data.map(d => d.y))).sort();

  // Use custom colors or predefined scheme
  const colors = customColors || COLOR_SCHEMES[colorScheme];

  // Calculate color for a value
  const getColor = (value: number) => {
    if (max === min) return colors[0];
    const normalized = (value - min) / (max - min);
    const colorIndex = Math.floor(normalized * (colors.length - 1));
    return colors[Math.min(colorIndex, colors.length - 1)];
  };

  // Create data lookup for quick access
  const dataLookup = new Map();
  data.forEach(item => {
    const key = `${item.x}-${item.y}`;
    dataLookup.set(key, item);
  });

  const CustomTooltip = () => {
    if (!hoveredCell || !showTooltip) return null;
    
    return (
      <div 
        className="absolute z-10 bg-background border border-border rounded-lg p-2 shadow-lg pointer-events-none"
        style={{
          left: mousePosition.x + 10,
          top: mousePosition.y - 10,
        }}
      >
        <p className="font-medium text-sm">
          {hoveredCell.label || `${hoveredCell.x}, ${hoveredCell.y}`}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatTooltip 
            ? formatTooltip(hoveredCell.value, hoveredCell.x, hoveredCell.y)
            : `Value: ${formatValue ? formatValue(hoveredCell.value) : hoveredCell.value}`
          }
        </p>
      </div>
    );
  };

  const totalWidth = xValues.length * cellSize + (xValues.length - 1) * gap + 100;
  const totalHeight = yValues.length * cellSize + (yValues.length - 1) * gap + 100;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const handleCellHover = (cellData: HeatmapData | null) => {
    setHoveredCell(cellData);
  };

  const content = (
    <ResponsiveContainer width="100%" height={height}>
      <div 
        style={{ width: '100%', height: '100%', position: 'relative' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCell(null)}
      >
        <svg 
          width={width || totalWidth} 
          height={totalHeight}
          style={{ maxWidth: '100%', height: 'auto' }}
        >
          {/* X-axis labels */}
          {xValues.map((x, xIndex) => (
            <text
              key={`x-${xIndex}`}
              x={50 + xIndex * (cellSize + gap) + cellSize / 2}
              y={40}
              textAnchor="middle"
              fontSize="12"
              fill={chartConfig.xAxis.tick.fill}
              className="text-muted-foreground"
            >
              {x}
            </text>
          ))}

          {/* Y-axis labels */}
          {yValues.map((y, yIndex) => (
            <text
              key={`y-${yIndex}`}
              x={40}
              y={50 + yIndex * (cellSize + gap) + cellSize / 2 + 4}
              textAnchor="end"
              fontSize="12"
              fill={chartConfig.yAxis.tick.fill}
              className="text-muted-foreground"
            >
              {y}
            </text>
          ))}

          {/* Heatmap cells */}
          {xValues.map((x, xIndex) =>
            yValues.map((y, yIndex) => {
              const key = `${x}-${y}`;
              const cellData = dataLookup.get(key);
              const value = cellData?.value || 0;
              const color = getColor(value);

              return (
                <rect
                  key={key}
                  x={50 + xIndex * (cellSize + gap)}
                  y={50 + yIndex * (cellSize + gap)}
                  width={cellSize}
                  height={cellSize}
                  fill={color}
                  stroke={isDarkMode ? 'hsl(var(--border))' : '#ffffff'}
                  strokeWidth={1}
                  style={{ cursor: onCellClick ? 'pointer' : 'default' }}
                  onClick={() => cellData && onCellClick?.(cellData)}
                  onMouseEnter={() => handleCellHover(cellData)}
                  className="transition-opacity hover:opacity-80"
                />
              );
            })
          )}
        </svg>
        <CustomTooltip />
      </div>
    </ResponsiveContainer>
  );

  if (title) {
    return <ChartContainer title={title} showExport={showExport}>{content}</ChartContainer>;
  }

  return content;
}
