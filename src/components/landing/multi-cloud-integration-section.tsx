'use client';

import React from 'react';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { DollarSign, Server, Activity, Shield, CheckCircle } from 'lucide-react';

export function MultiCloudIntegrationSection() {
  const platforms = [
    {
      name: 'Amazon Web Services',
      shortName: 'AWS',
      provider: 'amazon',
      service: 'aws',
      color: 'orange',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      textColor: 'text-orange-900 dark:text-orange-100',
      accentColor: 'text-orange-600',
      capabilities: [
        'Complete EC2, S3, RDS, Lambda management',
        'CloudWatch performance monitoring',
        'Cost and billing optimization',
        'IAM security and compliance'
      ],
      services: ['ec2', 's3', 'rds', 'lambda']
    },
    {
      name: 'Microsoft Azure',
      shortName: 'Azure',
      provider: 'microsoft',
      service: 'azure',
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-900 dark:text-blue-100',
      accentColor: 'text-blue-600',
      capabilities: [
        'Virtual Machines and App Services',
        'Azure Monitor and Application Insights',
        'Cost Management and optimization',
        'Security Center and compliance'
      ],
      services: ['compute', 'storage', 'monitor', 'security']
    },
    {
      name: 'Google Cloud Platform',
      shortName: 'GCP',
      provider: 'google',
      service: 'gcp',
      color: 'emerald',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      textColor: 'text-emerald-900 dark:text-emerald-100',
      accentColor: 'text-emerald-600',
      capabilities: [
        'Compute Engine and Cloud Functions',
        'Operations Suite monitoring',
        'Cloud Billing and optimization',
        'Security Command Center'
      ],
      services: ['compute', 'storage', 'functions', 'security']
    },
    {
      name: 'Microsoft 365',
      shortName: 'M365',
      provider: 'microsoft',
      service: 'teams',
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-900 dark:text-red-100',
      accentColor: 'text-red-600',
      capabilities: [
        'Teams, SharePoint, OneDrive management',
        'Usage and performance monitoring',
        'License cost optimization',
        'Security and compliance tracking'
      ],
      services: ['teams', 'sharepoint', 'onedrive', 'security']
    }
  ];

  const pillars = [
    { icon: DollarSign, name: 'Cost', color: 'text-blue-600' },
    { icon: Server, name: 'Resource', color: 'text-green-600' },
    { icon: Activity, name: 'Performance', color: 'text-red-600' },
    { icon: Shield, name: 'Security', color: 'text-purple-600' }
  ];

  return (
    <section id="cloud-integration" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Complete Multi-Cloud
            <br />
            <span className="text-primary">Platform Integration</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            Deep, native integration with all major cloud providers. Manage your entire 
            cloud infrastructure through our unified 4-pillar approach.
          </p>
        </div>

        {/* Platform Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {platforms.map((platform) => (
            <div
              key={platform.shortName}
              className={`
                ${platform.bgColor} ${platform.borderColor}
                border rounded-xl p-6 hover:shadow-lg transition-all duration-300
                group cursor-pointer
              `}
            >
              {/* Platform Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                  <CloudIcon provider={platform.provider as 'microsoft' | 'amazon' | 'google'} service={platform.service} size={32} />
                </div>
                <div>
                  <h3 className={`font-bold ${platform.textColor}`}>{platform.shortName}</h3>
                  <p className="text-xs text-muted-foreground">{platform.name}</p>
                </div>
              </div>

              {/* 4-Pillar Support Indicators */}
              <div className="flex items-center justify-between mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                {pillars.map((pillar) => {
                  const IconComponent = pillar.icon;
                  return (
                    <div key={pillar.name} className="flex flex-col items-center gap-1">
                      <IconComponent className={`h-4 w-4 ${pillar.color}`} />
                      <span className="text-xs text-muted-foreground">{pillar.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Platform Capabilities */}
              <ul className="space-y-2">
                {platform.capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle className={`h-3 w-3 mt-0.5 ${platform.accentColor} flex-shrink-0`} />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>

              {/* Integration Depth Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Integration Depth</span>
                  <span className={`font-semibold ${platform.accentColor}`}>Native API</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full bg-gradient-to-r ${platform.accentColor.replace('text-', 'from-')} to-primary w-full`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Unified Management Benefits */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-background to-muted border rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Unified Operations</h3>
                <p className="text-sm text-muted-foreground">
                  Manage all cloud platforms through a single, consistent interface
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Pillar Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Complete operational coverage across all critical domains
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">∞</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Cross-Platform Insights</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered intelligence that spans all your cloud environments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
