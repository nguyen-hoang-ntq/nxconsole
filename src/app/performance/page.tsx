'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceDataPoint {
  time: string;
  renderTime: number;
  memoryUsage: number;
  fps: number;
  cpuUsage: number;
  networkLatency: number;
  [key: string]: string | number;
}

interface RealTimeMetrics {
  timestamp: string;
  cpu: number;
  memory: number;
  network: number;
  responseTime: number;
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
  RefreshCw,
  MonitorSpeaker,
  Cpu,
  WifiIcon
} from 'lucide-react';

// Component that intentionally throws an error for testing
function ErrorTestComponent({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error('Test error for Error Boundary demonstration');
  }
  return <div className="p-4 bg-green-50 rounded">Component working normally</div>;
}

// Real-time metrics hook
function useRealTimeMetrics() {
  const [metrics, setMetrics] = useState<RealTimeMetrics[]>([]);
  const [isCollecting, setIsCollecting] = useState(false);

  useEffect(() => {
    if (!isCollecting) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timestamp = now.toLocaleTimeString();
      
      // Simulate real-time metrics
      const newMetric: RealTimeMetrics = {
        timestamp,
        cpu: Math.random() * 100,
        memory: 40 + Math.random() * 40,
        network: 10 + Math.random() * 50,
        responseTime: 50 + Math.random() * 200
      };

      setMetrics(prev => {
        const updated = [...prev, newMetric];
        // Keep only last 20 data points
        return updated.slice(-20);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCollecting]);

  return { metrics, isCollecting, setIsCollecting };
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
      const newDataPoint: PerformanceDataPoint = {
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        renderTime: Math.random() * 20 + 5,
        memoryUsage: memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0,
        fps: 60 - Math.random() * 10,
        cpuUsage: Math.random() * 100,
        networkLatency: 10 + Math.random() * 50
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

  const { metrics: realTimeMetrics, isCollecting, setIsCollecting } = useRealTimeMetrics();

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
          <TabsTrigger value="realtime">Real-time Monitoring</TabsTrigger>
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

        <TabsContent value="realtime" className="space-y-6">
          {/* Real-time Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Real-time Performance Monitoring</h3>
              <p className="text-sm text-muted-foreground">Live metrics updated every second</p>
            </div>
            <Button
              onClick={() => setIsCollecting(!isCollecting)}
              variant={isCollecting ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              {isCollecting ? 'Stop Monitoring' : 'Start Monitoring'}
            </Button>
          </div>

          {/* Real-time Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricWidget
              title="CPU Usage"
              value={realTimeMetrics.length > 0 ? realTimeMetrics[realTimeMetrics.length - 1].cpu.toFixed(1) : '0'}
              unit="%"
              trend="neutral"
              status="info"
              icon={Cpu}
            />
            
            <MetricWidget
              title="Memory Usage"
              value={realTimeMetrics.length > 0 ? realTimeMetrics[realTimeMetrics.length - 1].memory.toFixed(1) : '0'}
              unit="MB"
              trend="neutral"
              status="info"
              icon={MemoryStick}
            />
            
            <MetricWidget
              title="Network Latency"
              value={realTimeMetrics.length > 0 ? realTimeMetrics[realTimeMetrics.length - 1].network.toFixed(0) : '0'}
              unit="ms"
              trend="neutral"
              status="info"
              icon={WifiIcon}
            />
            
            <MetricWidget
              title="Response Time"
              value={realTimeMetrics.length > 0 ? realTimeMetrics[realTimeMetrics.length - 1].responseTime.toFixed(0) : '0'}
              unit="ms"
              trend="neutral"
              status="info"
              icon={MonitorSpeaker}
            />
          </div>

          {/* Real-time Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={realTimeMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="timestamp" 
                      tick={{ fill: 'hsl(var(--foreground))' }}
                    />
                    <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cpu" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="CPU (%)"
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="memory" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Memory (MB)"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WifiIcon className="h-5 w-5" />
                  Network Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={realTimeMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="timestamp" 
                      tick={{ fill: 'hsl(var(--foreground))' }}
                    />
                    <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="network" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                      name="Network Latency (ms)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="responseTime" 
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.3}
                      name="Response Time (ms)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Status */}
          {realTimeMetrics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Real-time Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Data Points Collected</span>
                    <Badge variant="secondary">{realTimeMetrics.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Monitoring Status</span>
                    <Badge variant={isCollecting ? "default" : "secondary"}>
                      {isCollecting ? "Active" : "Stopped"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Update</span>
                    <span className="text-sm text-muted-foreground">
                      {realTimeMetrics[realTimeMetrics.length - 1].timestamp}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
