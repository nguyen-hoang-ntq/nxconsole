// Standard chart color schemes for consistent visualization across the application

export const chartColorSchemes = {
  // Primary color scheme (for main metrics)
  primary: [
    '#3B82F6', // blue-500
    '#10B981', // green-500
    '#F59E0B', // amber-500
    '#EF4444', // red-500
    '#8B5CF6', // purple-500
    '#06B6D4', // cyan-500
  ],
  
  // Cloud providers
  cloudProviders: {
    aws: '#FF9900',
    azure: '#0078D4', 
    gcp: '#4285F4',
    microsoft: '#00BCF2',
  },
  
  // Pillars
  pillars: {
    cost: '#10B981',      // green
    resource: '#3B82F6',  // blue
    performance: '#F59E0B', // amber
    security: '#EF4444',  // red
  },
  
  // Service categories
  services: {
    compute: '#8B5CF6',     // purple
    networking: '#06B6D4',  // cyan
    storage: '#84CC16',     // lime
    otherServices: '#6B7280', // gray
  },
  
  // Status indicators
  status: {
    healthy: '#10B981',   // green
    warning: '#F59E0B',   // amber
    error: '#EF4444',     // red
    info: '#3B82F6',      // blue
    disabled: '#6B7280',  // gray
  },
  
  // Performance metrics
  performance: {
    cpu: '#F59E0B',       // amber
    memory: '#EF4444',    // red
    network: '#06B6D4',   // cyan
    storage: '#84CC16',   // lime
    uptime: '#10B981',    // green
  },
  
  // Cost trends
  cost: {
    spend: '#EF4444',     // red (increasing cost)
    savings: '#10B981',   // green (savings)
    budget: '#3B82F6',    // blue (budget line)
    forecast: '#F59E0B',  // amber (projected)
  },
  
  // Gradient schemes for area charts
  gradients: {
    blue: ['#3B82F6', '#DBEAFE'],
    green: ['#10B981', '#D1FAE5'],
    amber: ['#F59E0B', '#FEF3C7'],
    red: ['#EF4444', '#FEE2E2'],
    purple: ['#8B5CF6', '#EDE9FE'],
    cyan: ['#06B6D4', '#CFFAFE'],
  },
} as const;

// Helper function to get chart colors by context
export function getChartColors(context: keyof typeof chartColorSchemes) {
  return chartColorSchemes[context];
}

// Helper function to get color for specific cloud provider
export function getCloudProviderChartColor(provider: 'aws' | 'azure' | 'gcp' | 'microsoft') {
  return chartColorSchemes.cloudProviders[provider];
}

// Helper function to get color for specific pillar
export function getPillarChartColor(pillar: 'cost' | 'resource' | 'performance' | 'security') {
  return chartColorSchemes.pillars[pillar];
}

// Helper function to get color for specific service
export function getServiceChartColor(service: 'compute' | 'networking' | 'storage' | 'otherServices') {
  return chartColorSchemes.services[service];
}

// Helper function to get color for specific status
export function getStatusChartColor(status: 'healthy' | 'warning' | 'error' | 'info' | 'disabled') {
  return chartColorSchemes.status[status];
}

// Standard Recharts configuration
export const standardChartConfig = {
  margin: { top: 5, right: 30, left: 20, bottom: 5 },
  strokeWidth: 2,
  dot: { fill: '#fff', strokeWidth: 2, r: 4 },
  activeDot: { r: 6, strokeWidth: 0 },
  grid: { 
    strokeDasharray: '3 3', 
    stroke: 'hsl(var(--border))'
  },
  tooltip: {
    contentStyle: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '6px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      color: 'hsl(var(--foreground))'
    },
  },
  xAxis: {
    axisLine: false,
    tickLine: false,
    tick: { 
      fontSize: 12, 
      fill: 'hsl(var(--muted-foreground))' 
    },
  },
  yAxis: {
    axisLine: false,
    tickLine: false,
    tick: { 
      fontSize: 12, 
      fill: 'hsl(var(--muted-foreground))' 
    },
  },
} as const;

// Dark mode specific chart configuration
export const darkModeChartConfig = {
  ...standardChartConfig,
  tooltip: {
    contentStyle: {
      backgroundColor: 'hsl(var(--popover))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '6px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      color: 'hsl(var(--popover-foreground))'
    },
  },
} as const;

// Helper function to get chart config based on theme
export function getChartConfig(isDarkMode: boolean = false) {
  return isDarkMode ? darkModeChartConfig : standardChartConfig;
}
