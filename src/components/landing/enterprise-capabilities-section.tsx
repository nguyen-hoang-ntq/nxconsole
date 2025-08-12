'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Scale, 
  Zap, 
  Users, 
  Shield, 
  Headphones, 
  Globe, 
  Award,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export function EnterpriseCapabilitiesSection() {
  const capabilities = [
    {
      icon: Scale,
      title: 'Enterprise Scalability',
      description: 'Built to handle enterprise-scale cloud operations with unlimited growth potential',
      features: [
        'Support for 1000+ concurrent users',
        'Multi-tenant architecture',
        'Global deployment capabilities',
        'Auto-scaling infrastructure'
      ],
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Advanced Automation',
      description: 'Intelligent automation workflows that reduce manual operations by 80%',
      features: [
        'AI-powered workflow automation',
        'Policy-based governance',
        'Automated remediation',
        'Custom workflow builder'
      ],
      color: 'green'
    },
    {
      icon: Users,
      title: 'Professional Services',
      description: 'Expert guidance and support from NTQ\'s 14+ years of cloud expertise',
      features: [
        'Dedicated customer success manager',
        'Cloud architecture consulting',
        'Migration planning and execution',
        'Best practices training'
      ],
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with comprehensive compliance and governance features',
      features: [
        'SOC 2 Type II certified',
        'End-to-end encryption',
        'RBAC and SSO integration',
        'Compliance reporting'
      ],
      color: 'red'
    }
  ];

  const serviceLevel = [
    {
      icon: Headphones,
      title: '24/7 Expert Support',
      description: 'Round-the-clock support from certified cloud professionals',
      metrics: '< 15 min response time'
    },
    {
      icon: Globe,
      title: 'Global Infrastructure',
      description: 'Deployed across 5 regions with 99.99% uptime SLA',
      metrics: '99.99% uptime'
    },
    {
      icon: Award,
      title: 'Proven Expertise',
      description: '760+ successful cloud projects across 30+ industries',
      metrics: '350+ enterprise clients'
    },
    {
      icon: Clock,
      title: 'Rapid Deployment',
      description: 'Get started in days, not months, with our proven methodology',
      metrics: '< 7 days to value'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        border: 'border-blue-200 dark:border-blue-800',
        icon: 'text-blue-600',
        title: 'text-blue-900 dark:text-blue-100'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-950/20',
        border: 'border-green-200 dark:border-green-800',
        icon: 'text-green-600',
        title: 'text-green-900 dark:text-green-100'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-950/20',
        border: 'border-purple-200 dark:border-purple-800',
        icon: 'text-purple-600',
        title: 'text-purple-900 dark:text-purple-100'
      },
      red: {
        bg: 'bg-red-50 dark:bg-red-950/20',
        border: 'border-red-200 dark:border-red-800',
        icon: 'text-red-600',
        title: 'text-red-900 dark:text-red-100'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="capabilities" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Enterprise-Grade
            <br />
            <span className="text-primary">Platform Capabilities</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            Built for enterprise requirements with the scalability, security, and support 
            that large organizations demand for mission-critical cloud operations.
          </p>
        </div>

        {/* Core Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {capabilities.map((capability) => {
            const IconComponent = capability.icon;
            const colors = getColorClasses(capability.color);
            
            return (
              <div
                key={capability.title}
                className={`
                  ${colors.bg} ${colors.border}
                  border rounded-xl p-6 hover:shadow-lg transition-all duration-300
                  group cursor-pointer
                `}
              >
                {/* Capability Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                    <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${colors.title}`}>
                      {capability.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>

                {/* Capability Features */}
                <ul className="space-y-2 ml-16">
                  {capability.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className={`h-4 w-4 mt-0.5 ${colors.icon} flex-shrink-0`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Service Level Commitments */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-12">
            Service Level Commitments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceLevel.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="text-center p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.description}
                  </p>
                  <div className="text-lg font-bold text-primary">
                    {service.metrics}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enterprise CTA Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl p-8 border border-primary/20 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready for Enterprise-Scale Cloud Operations?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Join 350+ enterprise clients who trust NTQ&apos;s platform for their mission-critical 
              cloud operations. Get started with a customized demo and implementation plan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/login">
                  Schedule Enterprise Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Contact Sales Team
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-primary/20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Custom enterprise pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>30-day pilot program</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
