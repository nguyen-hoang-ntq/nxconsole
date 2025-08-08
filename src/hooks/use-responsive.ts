import { useEffect, useState } from 'react';

// Breakpoint definitions following Tailwind CSS
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// Hook to get current screen size
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= BREAKPOINTS['2xl']) {
        setBreakpoint('2xl');
      } else if (width >= BREAKPOINTS.xl) {
        setBreakpoint('xl');
      } else if (width >= BREAKPOINTS.lg) {
        setBreakpoint('lg');
      } else if (width >= BREAKPOINTS.md) {
        setBreakpoint('md');
      } else {
        setBreakpoint('sm');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}

// Hook to check if screen is mobile
export function useIsMobile() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'sm';
}

// Hook to check if screen is tablet
export function useIsTablet() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'md';
}

// Hook to check if screen is desktop
export function useIsDesktop() {
  const breakpoint = useBreakpoint();
  return ['lg', 'xl', '2xl'].includes(breakpoint);
}

// Hook for responsive values
export function useResponsiveValue<T>(values: Partial<Record<Breakpoint, T>>) {
  const breakpoint = useBreakpoint();
  
  // Find the appropriate value for current breakpoint
  const breakpointOrder: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);
  
  for (let i = currentIndex; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i];
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }
  
  return undefined;
}

// Responsive grid utilities
export const getResponsiveGridCols = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'sm':
      return 'grid-cols-1';
    case 'md':
      return 'grid-cols-2';
    case 'lg':
      return 'grid-cols-3';
    case 'xl':
      return 'grid-cols-4';
    case '2xl':
      return 'grid-cols-6';
    default:
      return 'grid-cols-1';
  }
};

// Responsive spacing utilities
export const getResponsiveSpacing = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'sm':
      return { padding: 'p-4', margin: 'm-2', gap: 'gap-2' };
    case 'md':
      return { padding: 'p-6', margin: 'm-4', gap: 'gap-4' };
    default:
      return { padding: 'p-8', margin: 'm-6', gap: 'gap-6' };
  }
};

// Responsive text utilities
export const getResponsiveText = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'sm':
      return {
        title: 'text-xl',
        subtitle: 'text-sm',
        body: 'text-sm',
        caption: 'text-xs'
      };
    case 'md':
      return {
        title: 'text-2xl',
        subtitle: 'text-base',
        body: 'text-base',
        caption: 'text-sm'
      };
    default:
      return {
        title: 'text-3xl',
        subtitle: 'text-lg',
        body: 'text-base',
        caption: 'text-sm'
      };
  }
};
