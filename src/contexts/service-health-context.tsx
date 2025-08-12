'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ServiceStatus = 'connected' | 'disconnected' | 'error' | 'loading';

export interface ServiceHealth {
  aws: ServiceStatus;
  azure: ServiceStatus;
  gcp: ServiceStatus;
  microsoft365: ServiceStatus;
  googleWorkspace: ServiceStatus;
}

interface ServiceHealthContextType {
  serviceHealth: ServiceHealth;
  updateServiceHealth: (service: keyof ServiceHealth, status: ServiceStatus) => void;
  refreshServiceHealth: () => Promise<void>;
}

const ServiceHealthContext = createContext<ServiceHealthContextType | undefined>(undefined);

export const useServiceHealth = () => {
  const context = useContext(ServiceHealthContext);
  if (!context) {
    throw new Error('useServiceHealth must be used within a ServiceHealthProvider');
  }
  return context;
};

export const ServiceHealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [serviceHealth, setServiceHealth] = useState<ServiceHealth>({
    aws: 'disconnected',
    azure: 'disconnected',
    gcp: 'disconnected',
    microsoft365: 'disconnected',
    googleWorkspace: 'disconnected'
  });

  const updateServiceHealth = (service: keyof ServiceHealth, status: ServiceStatus) => {
    setServiceHealth(prev => ({
      ...prev,
      [service]: status
    }));
  };

  const refreshServiceHealth = async () => {
    // Set all to loading
    setServiceHealth(prev => ({
      aws: 'loading',
      azure: 'loading',
      gcp: 'loading',
      microsoft365: 'loading',
      googleWorkspace: 'loading'
    }));

    // Simulate health checks (replace with real API calls)
    const healthChecks = await Promise.allSettled([
      checkServiceHealth('aws'),
      checkServiceHealth('azure'),
      checkServiceHealth('gcp'),
      checkServiceHealth('microsoft365'),
      checkServiceHealth('googleWorkspace')
    ]);

    const newHealth: ServiceHealth = {
      aws: healthChecks[0].status === 'fulfilled' ? healthChecks[0].value : 'error',
      azure: healthChecks[1].status === 'fulfilled' ? healthChecks[1].value : 'error',
      gcp: healthChecks[2].status === 'fulfilled' ? healthChecks[2].value : 'error',
      microsoft365: healthChecks[3].status === 'fulfilled' ? healthChecks[3].value : 'error',
      googleWorkspace: healthChecks[4].status === 'fulfilled' ? healthChecks[4].value : 'error'
    };

    setServiceHealth(newHealth);
  };

  // Simulate health check function
  const checkServiceHealth = async (service: string): Promise<ServiceStatus> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate random health status for demo
        const statuses: ServiceStatus[] = ['connected', 'disconnected', 'error'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        resolve(randomStatus);
      }, 1000 + Math.random() * 2000);
    });
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    refreshServiceHealth();
    const interval = setInterval(refreshServiceHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ServiceHealthContext.Provider value={{
      serviceHealth,
      updateServiceHealth,
      refreshServiceHealth
    }}>
      {children}
    </ServiceHealthContext.Provider>
  );
};
