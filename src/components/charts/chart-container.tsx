'use client';

import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChartContainerProps } from '@/types';
import { ChartExport } from './chart-export';

interface ExtendedChartContainerProps extends ChartContainerProps {
  showExport?: boolean;
  exportTitle?: string;
}

export function ChartContainer({
  title,
  children,
  actions,
  className,
  showExport = false,
  exportTitle
}: ExtendedChartContainerProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)} ref={chartRef}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          {actions}
          {showExport && (
            <ChartExport 
              chartRef={chartRef} 
              title={exportTitle || title || 'chart'} 
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}
