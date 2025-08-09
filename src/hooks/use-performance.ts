import { useCallback, useEffect, useRef, useState } from 'react';

// Performance monitoring utilities
export interface PerformanceMetrics {
  renderTime: number;
  lastRenderTime: number;
  mountTime: number;
  updateCount: number;
  slowRenders: number;
}

export function usePerformanceMonitor(componentName: string, threshold = 16) {
  const metrics = useRef<PerformanceMetrics>({
    renderTime: 0,
    lastRenderTime: 0,
    mountTime: 0,
    updateCount: 0,
    slowRenders: 0
  });
  
  const renderStartTime = useRef<number>(0);
  const mountStartTime = useRef<number>(performance.now());

  useEffect(() => {
    // Component mounted
    metrics.current.mountTime = performance.now() - mountStartTime.current;
    
    console.log(`[Performance] ${componentName} mounted in ${metrics.current.mountTime.toFixed(2)}ms`);
  }, [componentName]);

  useEffect(() => {
    // Track render performance
    renderStartTime.current = performance.now();
    
    return () => {
      const renderTime = performance.now() - renderStartTime.current;
      metrics.current.lastRenderTime = renderTime;
      metrics.current.renderTime += renderTime;
      metrics.current.updateCount++;
      
      if (renderTime > threshold) {
        metrics.current.slowRenders++;
        console.warn(`[Performance] ${componentName} slow render: ${renderTime.toFixed(2)}ms (threshold: ${threshold}ms)`);
      }
    };
  });

  const getMetrics = useCallback(() => ({
    ...metrics.current,
    averageRenderTime: metrics.current.updateCount > 0 
      ? metrics.current.renderTime / metrics.current.updateCount 
      : 0
  }), []);

  return { getMetrics };
}

// Memory usage monitoring
export function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        setMemoryInfo((performance as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory);
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
}

// Debounced function hook
export function useDebounce<T extends (...args: Array<string | number | boolean>) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }) as T,
    [delay]
  );
}

// Throttled function hook
export function useThrottle<T extends (...args: Array<string | number | boolean>) => void>(
  callback: T,
  delay: number
): T {
  const lastExecuted = useRef<number>(0);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastExecuted.current >= delay) {
        lastExecuted.current = now;
        callbackRef.current(...args);
      }
    }) as T,
    [delay]
  );
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        
        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, options, hasIntersected]);

  return { isIntersecting, hasIntersected };
}

// Virtual scrolling hook
export function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan = 5
) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex,
    endIndex,
    handleScroll
  };
}

// Image lazy loading with placeholder
export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { hasIntersected } = useIntersectionObserver(imgRef as React.RefObject<Element>);

  useEffect(() => {
    if (!hasIntersected) return;

    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      setError('Failed to load image');
      setIsLoading(false);
    };
    img.src = src;
  }, [src, hasIntersected]);

  return { imgRef, imageSrc, isLoading, error };
}

// Bundle size monitoring
export function getBundleSize() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      transferSize: navigation.transferSize,
      encodedBodySize: navigation.encodedBodySize,
      decodedBodySize: navigation.decodedBodySize,
      compressionRatio: navigation.encodedBodySize / navigation.decodedBodySize
    };
  }
  return null;
}

// Component size tracking
export function useElementSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { elementRef, size };
}

// Performance budget monitoring
export interface PerformanceBudget {
  maxRenderTime: number;
  maxMemoryUsage: number;
  maxBundleSize: number;
}

export function usePerformanceBudget(budget: PerformanceBudget) {
  const [violations, setViolations] = useState<string[]>([]);

  const checkBudget = useCallback(() => {
    const newViolations: string[] = [];
    
    // Check memory usage
    if ('memory' in performance) {
      const memory = (performance as { memory: { usedJSHeapSize: number } }).memory;
      if (memory.usedJSHeapSize > budget.maxMemoryUsage) {
        newViolations.push(`Memory usage exceeded: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB > ${(budget.maxMemoryUsage / 1024 / 1024).toFixed(2)}MB`);
      }
    }

    // Check bundle size
    const bundleInfo = getBundleSize();
    if (bundleInfo && bundleInfo.transferSize > budget.maxBundleSize) {
      newViolations.push(`Bundle size exceeded: ${(bundleInfo.transferSize / 1024).toFixed(2)}KB > ${(budget.maxBundleSize / 1024).toFixed(2)}KB`);
    }

    setViolations(newViolations);
  }, [budget]);

  useEffect(() => {
    checkBudget();
    const interval = setInterval(checkBudget, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [checkBudget]);

  return { violations, checkBudget };
}
