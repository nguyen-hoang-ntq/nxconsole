'use client';

import React from 'react';
import { CloudIcon } from '@/components/icons/cloud-icons';

const services = [
  {
    name: 'Cost Analytics',
    description: 'Real-time cost tracking',
    provider: 'amazon' as const,
    service: 'aws'
  },
  {
    name: 'Resource Optimization',
    description: 'AI-powered suggestions',
    provider: 'microsoft' as const,
    service: 'azure'
  },
  {
    name: 'Budget Management',
    description: 'Smart budget controls',
    provider: 'google' as const,
    service: 'gcp'
  },
  {
    name: 'License Optimization',
    description: 'M365 cost reduction',
    provider: 'microsoft' as const,
    service: 'teams'
  },
  {
    name: 'Multi-Cloud Visibility',
    description: 'Unified dashboard',
    provider: 'amazon' as const,
    service: 'ec2'
  },
  {
    name: 'Automated Alerts',
    description: 'Proactive monitoring',
    provider: 'microsoft' as const,
    service: 'azure'
  }
];

export function CloudAnimationSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Comprehensive Multi-Cloud Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            NxConsole provides end-to-end visibility and control across your entire 
            multi-cloud infrastructure with intelligent automation and insights.
          </p>
        </div>

        {/* Clean Grid Layout */}
        <div className="max-w-6xl mx-auto">
          {/* Central Hub */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full shadow-lg mb-4 animate-pulse">
              <span className="text-white font-bold text-xl">Nx</span>
            </div>
            <div className="text-sm font-semibold text-primary">NxConsole Hub</div>
            <div className="text-xs text-muted-foreground">Central Management Platform</div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg group-hover:scale-110 transition-transform">
                    <CloudIcon 
                      provider={service.provider} 
                      service={service.service}
                      size={32}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                {/* Connection indicator */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-primary mx-3"></div>
                    <div className="text-xs text-muted-foreground">Connected</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">360°</span>
            </div>
            <h3 className="font-semibold mb-2">Complete Visibility</h3>
            <p className="text-sm text-muted-foreground">
              Monitor costs, usage, and performance across all cloud platforms from one unified dashboard.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-xl">AI</span>
            </div>
            <h3 className="font-semibold mb-2">Intelligent Automation</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered recommendations and automated optimization to reduce costs without manual effort.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">24/7</span>
            </div>
            <h3 className="font-semibold mb-2">Continuous Monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Real-time alerts and proactive monitoring ensure you never miss cost anomalies or optimization opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
