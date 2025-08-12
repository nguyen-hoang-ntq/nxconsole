'use client';

import React from 'react';
import { DollarSign, Server, Activity, Shield, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PillarShowcaseSection() {
  const pillars = [
    {
      icon: DollarSign,
      title: 'Cost Management',
      description: 'Comprehensive financial control and optimization across all cloud platforms',
      color: 'blue',
      features: [
        'Unified cost dashboard across AWS, Azure, GCP, M365',
        'AI-powered cost optimization recommendations',
        'Budget management with predictive alerts',
        'Financial reporting and allocation'
      ],
      bgGradient: 'from-blue-50 to-blue-100',
      darkBgGradient: 'dark:from-blue-950/20 dark:to-blue-900/10',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900 dark:text-blue-100',
      borderColor: 'border-blue-200 dark:border-blue-800',
      hoverShadow: 'hover:shadow-blue-200/50 dark:hover:shadow-blue-900/20'
    },
    {
      icon: Server,
      title: 'Resource Management',
      description: 'Complete asset lifecycle management and optimization across cloud environments',
      color: 'green',
      features: [
        'Multi-cloud resource inventory and tracking',
        'Resource lifecycle management and automation',
        'Capacity planning with predictive analytics',
        'Resource governance and policy enforcement'
      ],
      bgGradient: 'from-green-50 to-green-100',
      darkBgGradient: 'dark:from-green-950/20 dark:to-green-900/10',
      iconColor: 'text-green-600',
      titleColor: 'text-green-900 dark:text-green-100',
      borderColor: 'border-green-200 dark:border-green-800',
      hoverShadow: 'hover:shadow-green-200/50 dark:hover:shadow-green-900/20'
    },
    {
      icon: Activity,
      title: 'Performance Monitoring',
      description: 'Real-time operational intelligence and system health monitoring',
      color: 'red',
      features: [
        'Real-time performance metrics and alerting',
        'Application and infrastructure monitoring',
        'Performance analytics and trend analysis',
        'Proactive optimization recommendations'
      ],
      bgGradient: 'from-red-50 to-red-100',
      darkBgGradient: 'dark:from-red-950/20 dark:to-red-900/10',
      iconColor: 'text-red-600',
      titleColor: 'text-red-900 dark:text-red-100',
      borderColor: 'border-red-200 dark:border-red-800',
      hoverShadow: 'hover:shadow-red-200/50 dark:hover:shadow-red-900/20'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Comprehensive protection and governance across all operational domains',
      color: 'purple',
      features: [
        'Multi-cloud security posture management',
        'Compliance monitoring and reporting',
        'Threat detection and response',
        'Identity and access management'
      ],
      bgGradient: 'from-purple-50 to-purple-100',
      darkBgGradient: 'dark:from-purple-950/20 dark:to-purple-900/10',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-900 dark:text-purple-100',
      borderColor: 'border-purple-200 dark:border-purple-800',
      hoverShadow: 'hover:shadow-purple-200/50 dark:hover:shadow-purple-900/20'
    }
  ];

  return (
    <section id="pillars" className="py-16 lg:py-24 bg-background">{/* Added id="pillars" */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Four-Pillar Architecture for
            <br />
            <span className="text-primary">Complete Cloud Operations</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            Unify your entire cloud operations through our innovative pillar-based architecture. 
            Each pillar works seamlessly together to provide comprehensive management and intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`
                  relative group bg-gradient-to-br ${pillar.bgGradient} ${pillar.darkBgGradient}
                  border ${pillar.borderColor} rounded-xl p-6 
                  transition-all duration-300 hover:scale-105 hover:shadow-xl ${pillar.hoverShadow}
                  cursor-pointer
                `}
              >
                {/* Pillar Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-white dark:bg-gray-800 shadow-sm mb-4">
                  <IconComponent className={`h-8 w-8 ${pillar.iconColor}`} />
                </div>

                {/* Pillar Title */}
                <h3 className={`text-xl font-bold mb-3 ${pillar.titleColor}`}>
                  {pillar.title}
                </h3>

                {/* Pillar Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Key Features */}
                <ul className="space-y-2 mb-6">
                  {pillar.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <ChevronRight className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Explore Link */}
                <div className="group-hover:translate-x-1 transition-transform duration-200">
                  <span className={`text-sm font-medium ${pillar.iconColor} flex items-center gap-1`}>
                    Explore Pillar
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Cross-Pillar Intelligence Section */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Cross-Pillar Intelligence</h3>
            <p className="text-muted-foreground mb-6">
              Our AI-powered insights engine analyzes correlations across all four pillars, 
              providing you with actionable intelligence that goes beyond traditional point solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/login">
                  Explore Full Platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/login">
                  View Architecture Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
