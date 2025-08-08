import React, { useEffect, useRef } from 'react';

// Focus management utilities
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
}

// Keyboard navigation utilities
export function useKeyboardNavigation(
  items: HTMLElement[], 
  onSelect?: (index: number) => void
) {
  const activeIndexRef = useRef(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        activeIndexRef.current = Math.min(activeIndexRef.current + 1, items.length - 1);
        items[activeIndexRef.current]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        activeIndexRef.current = Math.max(activeIndexRef.current - 1, 0);
        items[activeIndexRef.current]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        activeIndexRef.current = 0;
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        activeIndexRef.current = items.length - 1;
        items[items.length - 1]?.focus();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect?.(activeIndexRef.current);
        break;
    }
  };

  return { handleKeyDown, activeIndex: activeIndexRef.current };
}

// Screen reader announcements
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.textContent = message;
  
  document.body.appendChild(announcer);
  
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
}

// Color contrast utilities
export const CONTRAST_RATIOS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5
};

export function getContrastRatio(color1: string, color2: string): number {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd use a proper color library
  const getLuminance = (color: string) => {
    // This is a simplified version - use a proper color library in production
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c => 
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// ARIA live region hook
export function useAriaLive() {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const announceToScreenReader = (
    message: string, 
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.setAttribute('aria-live', priority);
      liveRegionRef.current.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = '';
        }
      }, 1000);
    }
  };

  return { announceToScreenReader, liveRegionRef };
}

// Reduced motion detection
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Focus visible utilities
export function useFocusVisible() {
  const [isFocusVisible, setIsFocusVisible] = React.useState(false);

  React.useEffect(() => {
    let hadKeyboardEvent = false;

    const onPointerDown = () => {
      hadKeyboardEvent = false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'Shift') {
        hadKeyboardEvent = true;
      }
    };

    const onFocus = () => {
      setIsFocusVisible(hadKeyboardEvent);
    };

    const onBlur = () => {
      setIsFocusVisible(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('focus', onFocus, true);
    document.addEventListener('blur', onBlur, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('focus', onFocus, true);
      document.removeEventListener('blur', onBlur, true);
    };
  }, []);

  return isFocusVisible;
}
