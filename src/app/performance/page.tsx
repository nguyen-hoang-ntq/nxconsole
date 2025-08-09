'use client';

import React, { useEffect, useState } from 'react';

interface PerformanceDataPoint {
  time: string;
  renderTime: number;
  memoryUsage: number;
  fps: number;
  [key: string]: string | number;
}

import { 
  usePerformanceMonitor, 
  useMemoryMonitor, 
  usePerformanceBudget,
  getBundleSize 
} from '@/hooks/use-performance';
import { ErrorBoundary, ErrorLogger } from '@/components/error/error-boundary';
import { 
  MetricWidget, 
  ProgressWidget, 
  StatusWidget,
  GaugeChartComponent,
  LineChartComponent,
  CHART_COLORS 
} from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  MemoryStick, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Bug,
  RefreshCw
} from 'lucide-react';

// Component that intentionally throws an error for testing
function ErrorTestComponent({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error('Test error for Error Boundary demonstration');
  }
  return <div className="p-4 bg-green-50 rounded">Component working normally</div>;
}

// Heavy component for performance testing
function HeavyComponent() {
  const { getMetrics } = usePerformanceMonitor('HeavyComponent', 50);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // Simulate heavy computation
    const heavyTask = () => {
      const result = [];
      for (let i = 0; i < 10000; i++) {
        result.push(Math.random() * 100);
      }
      setData(result);
    };

    heavyTask();
  }, []);

  const metrics = getMetrics();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heavy Component Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Processed {data.length} items</p>
          <p>Average render time: {metrics.averageRenderTime.toFixed(2)}ms</p>
          <p>Total updates: {metrics.updateCount}</p>
          <p>Slow renders: {metrics.slowRenders}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PerformanceDashboard() {
  const [showError, setShowError] = useState(false);
  const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>([]);
  const memoryInfo = useMemoryMonitor();
  const { getMetrics } = usePerformanceMonitor('PerformanceDashboard');
  
  // Performance budget monitoring
  const { violations } = usePerformanceBudget({
    maxRenderTime: 16, // 60fps = 16ms per frame
    maxMemoryUsage: 50 * 1024 * 1024, // 50MB
    maxBundleSize: 1024 * 1024 // 1MB
  });

  // Simulate performance data collection
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newDataPoint = {
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        renderTime: Math.random() * 20 + 5,
        memoryUsage: memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0,
        fps: 60 - Math.random() * 10
      };

      setPerformanceData(prev => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-20); // Keep last 20 data points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [memoryInfo]);

  const bundleInfo = getBundleSize();
  const errorLogger = ErrorLogger.getInstance();
  const recentErrors = errorLogger.getErrors().slice(-5);

  const serverStatuses = [
    { 
      label: 'Render Performance', 
      status: violations.length === 0 ? 'online' as const : 'warning' as const, 
      value: `${getMetrics().averageRenderTime.toFixed(1)}ms`,
      lastUpdated: new Date()
    },
    { 
      label: 'Memory Usage', 
      status: memoryInfo && memoryInfo.usedJSHeapSize > 50 * 1024 * 1024 ? 'warning' as const : 'online' as const,
      value: memoryInfo ? `${(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB` : 'N/A',
      lastUpdated: new Date()
    },
    { 
      label: 'Bundle Size', 
      status: bundleInfo && bundleInfo.transferSize > 1024 * 1024 ? 'warning' as const : 'online' as const,
      value: bundleInfo ? `${(bundleInfo.transferSize / 1024).toFixed(1)}KB` : 'N/A',
      lastUpdated: new Date()
    }
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Performance & Error Monitoring</h1>
        <p className="text-muted-foreground">
          Real-time performance monitoring, error tracking, and optimization insights
        </p>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Error Handling</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricWidget
              title="Average Render Time"
              value={getMetrics().averageRenderTime.toFixed(1)}
              unit="ms"
              trend={getMetrics().averageRenderTime < 16 ? 'up' : 'down'}
              trendPercentage={5.2}
              status={getMetrics().averageRenderTime < 16 ? 'success' : 'warning'}
              icon={Activity}
              showTrend={true}
            />
            
            <MetricWidget
              title="Memory Usage"
              value={memoryInfo ? (memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(1) : '0'}
              unit="MB"
              trend="neutral"
              status="info"
              icon={MemoryStick}
            />
            
            <MetricWidget
              title="Slow Renders"
              value={getMetrics().slowRenders}
              trend={getMetrics().slowRenders === 0 ? 'up' : 'down'}
              status={getMetrics().slowRenders === 0 ? 'success' : 'warning'}
              icon={TrendingUp}
            />
            
            <MetricWidget
              title="Component Updates"
              value={getMetrics().updateCount}
              trend="up"
              status="info"
              icon={RefreshCw}
            />
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChartComponent
              title="Performance Timeline"
              data={performanceData}
              xDataKey="time"
              lines={[
                { dataKey: 'renderTime', name: 'Render Time (ms)', color: CHART_COLORS.primary[0] },
                { dataKey: 'fps', name: 'FPS', color: CHART_COLORS.success[0] }
              ]}
              height={300}
              showExport={true}
            />

            <div className="space-y-4">
              <GaugeChartComponent
                title="Memory Usage"
                subtitle={memoryInfo ? `${(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(1)} MB` : 'N/A'}
                value={memoryInfo ? (memoryInfo.usedJSHeapSize / 1024 / 1024) : 0}
                max={100}
                size="md"
                thresholds={[
                  { value: 0, color: '#10b981', label: 'Good' },
                  { value: 50, color: '#f59e0b', label: 'Warning' },
                  { value: 80, color: '#ef4444', label: 'Critical' }
                ]}
                showValue={true}
                showPercentage={false}
              />
            </div>
          </div>

          {/* Performance Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatusWidget
              title="Performance Health"
              items={serverStatuses}
              showLastUpdated={true}
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Performance Violations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {violations.length === 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>No performance violations detected</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {violations.map((violation, index) => (
                      <div key={index} className="flex items-start gap-2 text-orange-600">
                        <AlertTriangle className="h-4 w-4 mt-0.5" />
                        <span className="text-sm">{violation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Heavy Component Demo */}
          <ErrorBoundary level="component">
            <HeavyComponent />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          {/* Error Testing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5" />
                  Error Boundary Testing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowError(!showError)}
                    variant={showError ? "destructive" : "default"}
                  >
                    {showError ? 'Fix Error' : 'Trigger Error'}
                  </Button>
                  <Button 
                    onClick={() => {
                      errorLogger.log(new Error('Manual test error'), 'Manual trigger', 'warning');
                    }}
                    variant="outline"
                  >
                    Log Warning
                  </Button>
                </div>

                <ErrorBoundary level="component">
                  <ErrorTestComponent shouldError={showError} />
                </ErrorBoundary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Error Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentErrors.length === 0 ? (
                  <p className="text-muted-foreground">No recent errors</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {recentErrors.map((errorEntry, index) => (
                      <div key={index} className="border rounded p-2 text-sm">
                        <div className="flex items-center justify-between">
                          <Badge variant={
                            errorEntry.level === 'error' ? 'destructive' : 
                            errorEntry.level === 'warning' ? 'secondary' : 'default'
                          }>
                            {errorEntry.level}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {errorEntry.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="mt-1 font-mono">{errorEntry.error.message}</p>
                        {errorEntry.context && (
                          <p className="text-xs text-muted-foreground">{errorEntry.context}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProgressWidget
              title="Bundle Optimization"
              value={bundleInfo ? bundleInfo.transferSize : 0}
              max={1024 * 1024} // 1MB
              label={bundleInfo ? 
                `${(bundleInfo.transferSize / 1024).toFixed(1)}KB transferred` : 
                'Bundle size unavailable'
              }
              status={bundleInfo && bundleInfo.transferSize > 500 * 1024 ? 'warning' : 'success'}
              showPercentage={true}
            />

            <ProgressWidget
              title="Compression Ratio"
              value={bundleInfo ? bundleInfo.compressionRatio * 100 : 0}
              max={100}
              label={bundleInfo ? 
                `${(bundleInfo.compressionRatio * 100).toFixed(1)}% compression` : 
                'Compression unavailable'
              }
              status="info"
              showPercentage={false}
            />
          </div>

          {/* Optimization Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Code Splitting</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement lazy loading for route components to reduce initial bundle size
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MemoryStick className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Memory Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Use useMemo and useCallback to prevent unnecessary re-renders
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Performance Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      Continue monitoring render times and optimize components exceeding 16ms
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
