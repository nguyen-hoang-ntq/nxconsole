// Responsive design utilities for consistent breakpoints and grid patterns

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Standard grid patterns for different screen sizes
export const gridPatterns = {
  // Metric cards grid
  metrics: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-2',
    desktop: 'grid-cols-4',
    combined: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  },
  
  // Dashboard cards grid
  dashboard: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-1 md:grid-cols-2',
    desktop: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    combined: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  },
  
  // Chart cards grid
  charts: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-1 md:grid-cols-2',
    desktop: 'grid-cols-1 md:grid-cols-2',
    combined: 'grid-cols-1 md:grid-cols-2'
  },
  
  // Provider cards grid
  providers: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-1 md:grid-cols-2',
    desktop: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3',
    combined: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
  },
  
  // List items grid
  list: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-1 md:grid-cols-2',
    desktop: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    combined: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }
} as const;

// Standard spacing patterns
export const spacing = {
  // Container padding
  container: {
    mobile: 'px-4',
    tablet: 'px-6',
    desktop: 'px-8',
    combined: 'px-4 md:px-6 lg:px-8'
  },
  
  // Section spacing
  section: {
    mobile: 'space-y-4',
    tablet: 'space-y-6',
    desktop: 'space-y-8',
    combined: 'space-y-4 md:space-y-6 lg:space-y-8'
  },
  
  // Card spacing
  card: {
    mobile: 'gap-4',
    tablet: 'gap-6',
    desktop: 'gap-6',
    combined: 'gap-4 md:gap-6'
  }
} as const;

// Typography scales for responsive design
export const typography = {
  // Page titles
  pageTitle: {
    mobile: 'text-2xl',
    tablet: 'text-3xl',
    desktop: 'text-3xl',
    combined: 'text-2xl md:text-3xl'
  },
  
  // Section titles
  sectionTitle: {
    mobile: 'text-xl',
    tablet: 'text-xl',
    desktop: 'text-2xl',
    combined: 'text-xl lg:text-2xl'
  },
  
  // Card titles
  cardTitle: {
    mobile: 'text-lg',
    tablet: 'text-lg',
    desktop: 'text-xl',
    combined: 'text-lg lg:text-xl'
  },
  
  // Metric values
  metricValue: {
    mobile: 'text-xl',
    tablet: 'text-2xl',
    desktop: 'text-2xl',
    combined: 'text-xl md:text-2xl'
  }
} as const;

// Navigation patterns
export const navigation = {
  // Sidebar visibility
  sidebar: {
    mobile: 'hidden',
    tablet: 'hidden',
    desktop: 'block',
    combined: 'hidden lg:block'
  },
  
  // Mobile menu
  mobileMenu: {
    mobile: 'block',
    tablet: 'block', 
    desktop: 'hidden',
    combined: 'block lg:hidden'
  },
  
  // Breadcrumb visibility
  breadcrumb: {
    mobile: 'hidden',
    tablet: 'block',
    desktop: 'block',
    combined: 'hidden md:block'
  }
} as const;

// Helper function to get responsive classes
export function getResponsiveClasses(
  pattern: keyof typeof gridPatterns | keyof typeof spacing | keyof typeof typography | keyof typeof navigation,
  type?: string
): string {
  if (pattern in gridPatterns) {
    return gridPatterns[pattern as keyof typeof gridPatterns].combined;
  }
  
  if (pattern in spacing) {
    return spacing[pattern as keyof typeof spacing].combined;
  }
  
  if (pattern in typography) {
    return typography[pattern as keyof typeof typography].combined;
  }
  
  if (pattern in navigation) {
    return navigation[pattern as keyof typeof navigation].combined;
  }
  
  return '';
}

// Responsive chart heights
export const chartHeights = {
  mobile: 'h-[200px]',
  tablet: 'h-[250px]',
  desktop: 'h-[300px]',
  combined: 'h-[200px] md:h-[250px] lg:h-[300px]'
} as const;

// Responsive button sizes
export const buttonSizes = {
  mobile: 'text-sm px-3 py-2',
  tablet: 'text-base px-4 py-2',
  desktop: 'text-base px-4 py-2',
  combined: 'text-sm md:text-base px-3 md:px-4 py-2'
} as const;

// Standard responsive patterns for common layouts
export const layoutPatterns = {
  // Header with actions
  header: 'flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0',
  
  // Card grid with consistent gaps
  cardGrid: 'grid gap-4 md:gap-6',
  
  // Metric grid
  metricGrid: `grid gap-4 ${gridPatterns.metrics.combined}`,
  
  // Dashboard grid
  dashboardGrid: `grid gap-6 ${gridPatterns.dashboard.combined}`,
  
  // Chart grid
  chartGrid: `grid gap-6 ${gridPatterns.charts.combined}`,
  
  // Button group
  buttonGroup: 'flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2',
  
  // Content container
  contentContainer: `mx-auto max-w-7xl ${spacing.container.combined}`,
  
  // Page layout
  pageLayout: `min-h-screen ${spacing.section.combined}`,
} as const;
