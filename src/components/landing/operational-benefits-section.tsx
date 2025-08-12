'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TrendingDown, Shield, Target, BarChart3, Clock } from 'lucide-react';

const operationalBenefits = [
  {
    title: "70% Operational Complexity Reduction",
    description: "Unify disparate cloud operations into a single, intelligent platform",
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    metrics: [
      "Single pane of glass for all cloud operations",
      "Unified workflows across all 4 pillars",
      "Streamlined team collaboration"
    ]
  },
  {
    title: "30% Average Cost Optimization",
    description: "Cross-pillar intelligence identifies optimization opportunities others miss",
    icon: <TrendingDown className="h-8 w-8 text-green-600" />,
    metrics: [
      "AI-powered cost optimization across all pillars",
      "Resource right-sizing recommendations",
      "Performance-cost correlation analysis"
    ]
  },
  {
    title: "90% Security Compliance Score",
    description: "Comprehensive security posture management across all cloud environments",
    icon: <Shield className="h-8 w-8 text-purple-600" />,
    metrics: [
      "Multi-cloud security posture monitoring",
      "Automated compliance reporting",
      "Unified threat detection and response"
    ]
  },
  {
    title: "99.8% Performance Reliability",
    description: "Proactive monitoring and intelligent alerting prevent operational issues",
    icon: <Target className="h-8 w-8 text-red-600" />,
    metrics: [
      "Real-time performance monitoring",
      "Predictive analytics for issues prevention",
      "Automated remediation workflows"
    ]
  }
];

const transformationMetrics = [
  {
    icon: BarChart3,
    title: "Operational Intelligence",
    before: "Fragmented insights across multiple tools",
    after: "Unified intelligence across all cloud operations",
    improvement: "Cross-pillar correlations and predictive insights"
  },
  {
    icon: Clock,
    title: "Time to Resolution",
    before: "Hours spent on manual analysis and coordination",
    after: "Minutes with automated detection and unified workflows",
    improvement: "85% faster incident response times"
  },
  {
    icon: Shield,
    title: "Risk Management",
    before: "Inconsistent security across platforms",
    after: "Unified security posture and compliance",
    improvement: "90% reduction in security blind spots"
  }
];

export function OperationalBenefitsSection() {
  return (
    <section id="benefits" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Operational Excellence Through
            <br />
            <span className="text-primary">Unified Cloud Intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform your cloud operations with our 4-pillar architecture. See immediate improvements 
            in efficiency, cost optimization, security, and performance across all cloud environments.
          </p>
        </div>

        {/* Operational Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {operationalBenefits.map((benefit, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-background">
              <CardHeader>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {benefit.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {benefit.metrics.map((metric, metricIndex) => (
                    <li key={metricIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">{metric}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transformation Comparison */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-12">
            Before vs. After Platform Implementation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transformationMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card key={index} className="bg-background">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{metric.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Before */}
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">BEFORE</div>
                      <div className="text-sm text-red-900 dark:text-red-100">{metric.before}</div>
                    </div>
                    
                    {/* After */}
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">AFTER</div>
                      <div className="text-sm text-green-900 dark:text-green-100">{metric.after}</div>
                    </div>
                    
                    {/* Improvement */}
                    <div className="text-center">
                      <div className="text-sm font-semibold text-primary">{metric.improvement}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* ROI Calculator for Operations */}
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Operational Transformation ROI
              </h3>
              <p className="text-muted-foreground">
                Typical enterprise results within 90 days of platform implementation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">70%</span>
                </div>
                <div className="font-semibold">Complexity Reduction</div>
                <div className="text-sm text-muted-foreground">
                  Unified operations
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">30%</span>
                </div>
                <div className="font-semibold">Cost Optimization</div>
                <div className="text-sm text-muted-foreground">
                  Cross-pillar savings
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-600">85%</span>
                </div>
                <div className="font-semibold">Faster Resolution</div>
                <div className="text-sm text-muted-foreground">
                  Incident response
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-red-600">99.8%</span>
                </div>
                <div className="font-semibold">Performance SLA</div>
                <div className="text-sm text-muted-foreground">
                  System reliability
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-background rounded-lg border text-center">
              <div className="text-sm text-muted-foreground mb-2">
                Average enterprise value delivery:
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                $2.4M+ Annual Value
              </div>
              <div className="text-sm text-green-600 font-medium">
                Through operational efficiency gains and cost optimization
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
