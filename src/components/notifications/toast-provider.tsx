'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000
    };

    setToasts(current => {
      const updated = [newToast, ...current];
      return updated.slice(0, maxToasts);
    });

    // Auto remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAllToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
}

function ToastItem({ toast }: ToastItemProps) {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => removeToast(toast.id), 200);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getColorClasses = () => {
    switch (toast.type) {
      case 'success':
        return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100';
      case 'error':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100';
      case 'warning':
        return 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950 text-orange-900 dark:text-orange-100';
      case 'info':
        return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100';
    }
  };

  return (
    <div
      className={cn(
        'transform transition-all duration-200 ease-out',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        'border rounded-lg p-4 shadow-lg backdrop-blur-sm',
        getColorClasses()
      )}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm">{toast.title}</h4>
          {toast.message && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{toast.message}</p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-sm font-medium underline mt-2 hover:no-underline text-current"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Convenience hooks for different toast types
export function useToastSuccess() {
  const { addToast } = useToast();
  return useCallback((title: string, message?: string, action?: Toast['action']) => {
    return addToast({ type: 'success', title, message, action });
  }, [addToast]);
}

export function useToastError() {
  const { addToast } = useToast();
  return useCallback((title: string, message?: string, action?: Toast['action']) => {
    return addToast({ type: 'error', title, message, action });
  }, [addToast]);
}

export function useToastWarning() {
  const { addToast } = useToast();
  return useCallback((title: string, message?: string, action?: Toast['action']) => {
    return addToast({ type: 'warning', title, message, action });
  }, [addToast]);
}

export function useToastInfo() {
  const { addToast } = useToast();
  return useCallback((title: string, message?: string, action?: Toast['action']) => {
    return addToast({ type: 'info', title, message, action });
  }, [addToast]);
}
