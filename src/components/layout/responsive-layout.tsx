'use client';

import React from 'react';
import { useBreakpoint, useIsMobile, getResponsiveGridCols, getResponsiveSpacing } from '@/hooks/use-responsive';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  centered?: boolean;
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  minItemWidth?: string;
  gap?: 'sm' | 'md' | 'lg';
  equalHeight?: boolean;
}

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'compact' | 'spacious';
}

const MAX_WIDTH_CLASSES = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full'
};

const GAP_CLASSES = {
  sm: 'gap-2 md:gap-4',
  md: 'gap-4 md:gap-6',
  lg: 'gap-6 md:gap-8'
};

// Main responsive layout component
export function ResponsiveLayout({
  children,
  className,
  maxWidth = 'full',
  padding = true,
  centered = true
}: ResponsiveLayoutProps) {
  const breakpoint = useBreakpoint();
  const spacing = getResponsiveSpacing(breakpoint);

  return (
    <div
      className={cn(
        'w-full',
        MAX_WIDTH_CLASSES[maxWidth],
        centered && 'mx-auto',
        padding && spacing.padding,
        className
      )}
    >
      {children}
    </div>
  );
}

// Responsive grid component
export function ResponsiveGrid({
  children,
  className,
  minItemWidth = '280px',
  gap = 'md',
  equalHeight = false
}: ResponsiveGridProps) {
  const breakpoint = useBreakpoint();
  const gridCols = getResponsiveGridCols(breakpoint);

  return (
    <div
      className={cn(
        'grid',
        gridCols,
        GAP_CLASSES[gap],
        equalHeight && 'items-stretch',
        className
      )}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
      }}
    >
      {children}
    </div>
  );
}

// Responsive container with predefined variants
export function ResponsiveContainer({
  children,
  className,
  variant = 'default'
}: ResponsiveContainerProps) {
  const breakpoint = useBreakpoint();
  const isMobile = useIsMobile();

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return isMobile 
          ? 'p-3 space-y-3' 
          : 'p-4 space-y-4';
      case 'spacious':
        return isMobile 
          ? 'p-6 space-y-6' 
          : 'p-8 space-y-8';
      default:
        return isMobile 
          ? 'p-4 space-y-4' 
          : 'p-6 space-y-6';
    }
  };

  return (
    <div className={cn(getVariantClasses(), className)}>
      {children}
    </div>
  );
}

// Responsive stack component for vertical layouts
interface ResponsiveStackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
}

const STACK_SPACING = {
  xs: 'space-y-1',
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8'
};

const STACK_ALIGN = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch'
};

export function ResponsiveStack({
  children,
  className,
  spacing = 'md',
  align = 'stretch'
}: ResponsiveStackProps) {
  return (
    <div
      className={cn(
        'flex flex-col',
        STACK_SPACING[spacing],
        STACK_ALIGN[align],
        className
      )}
    >
      {children}
    </div>
  );
}

// Responsive flex component for horizontal layouts
interface ResponsiveFlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  wrap?: boolean;
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const FLEX_DIRECTION = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse'
};

const FLEX_JUSTIFY = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
};

const FLEX_ALIGN = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch'
};

const FLEX_GAP = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8'
};

export function ResponsiveFlex({
  children,
  className,
  direction = 'row',
  wrap = false,
  justify = 'start',
  align = 'start',
  gap = 'md',
  responsive = false
}: ResponsiveFlexProps) {
  const isMobile = useIsMobile();
  
  // On mobile, automatically switch to column layout if responsive is true
  const actualDirection = responsive && isMobile && direction === 'row' ? 'col' : direction;

  return (
    <div
      className={cn(
        'flex',
        FLEX_DIRECTION[actualDirection],
        wrap && 'flex-wrap',
        FLEX_JUSTIFY[justify],
        FLEX_ALIGN[align],
        FLEX_GAP[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

// Hook to get responsive component props
export function useResponsiveLayout() {
  const breakpoint = useBreakpoint();
  const isMobile = useIsMobile();
  const spacing = getResponsiveSpacing(breakpoint);

  return {
    breakpoint,
    isMobile,
    spacing,
    gridCols: getResponsiveGridCols(breakpoint),
    
    // Helper functions
    getSpacing: () => spacing,
    getGridCols: () => getResponsiveGridCols(breakpoint),
    isMobileOrTablet: () => ['sm', 'md'].includes(breakpoint),
    isDesktop: () => ['lg', 'xl', '2xl'].includes(breakpoint)
  };
}
