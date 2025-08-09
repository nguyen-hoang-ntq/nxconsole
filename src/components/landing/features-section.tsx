'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudIcon } from '@/components/icons/cloud-icons';
import { DollarSign, TrendingDown, BarChart3, PieChart, Target, Zap } from 'lucide-react';

const features = [
  {
    icon: <CloudIcon provider="amazon" size={48} />,
    title: "AWS Cost Management",
    description: "Complete visibility and control over your Amazon Web Services spending with real-time monitoring and optimization recommendations.",
    color: "border-orange-200 bg-orange-50"
  },
  {
    icon: <CloudIcon provider="microsoft" service="azure" size={48} />,
    title: "Azure Cost Control",
    description: "Unified Microsoft Azure cost tracking with advanced analytics and automated budget alerts for better financial governance.",
    color: "border-blue-200 bg-blue-50"
  },
  {
    icon: <CloudIcon provider="google" service="gcp" size={48} />,
    title: "Google Cloud Optimization",
    description: "Smart Google Cloud Platform cost management with predictive analytics and resource rightsizing recommendations.",
    color: "border-green-200 bg-green-50"
  },
  {
    icon: <CloudIcon provider="microsoft" size={48} />,
    title: "Microsoft 365 Insights",
    description: "Comprehensive Microsoft 365 cost visibility including Teams, SharePoint, Exchange, and OneDrive usage analytics.",
    color: "border-purple-200 bg-purple-50"
  },
  {
    icon: <DollarSign className="h-12 w-12 text-primary" />,
    title: "Real-Time Cost Tracking",
    description: "Live cost monitoring across all platforms with customizable dashboards and instant notifications for budget overruns.",
    color: "border-primary/20 bg-primary/5"
  },
  {
    icon: <TrendingDown className="h-12 w-12 text-green-600" />,
    title: "Cost Optimization Engine",
    description: "AI-powered recommendations to reduce costs by identifying unused resources, rightsizing opportunities, and better pricing options.",
    color: "border-green-200 bg-green-50"
  },
  {
    icon: <BarChart3 className="h-12 w-12 text-blue-600" />,
    title: "Advanced Analytics",
    description: "Deep cost analytics with trend analysis, forecasting, and custom reporting to make data-driven financial decisions.",
    color: "border-blue-200 bg-blue-50"
  },
  {
    icon: <Target className="h-12 w-12 text-purple-600" />,
    title: "Budget Management",
    description: "Set and track budgets across teams, projects, and cloud platforms with automated alerts and spending controls.",
    color: "border-purple-200 bg-purple-50"
  },
  {
    icon: <Zap className="h-12 w-12 text-yellow-600" />,
    title: "Automated Optimization",
    description: "Intelligent automation for cost savings including auto-scaling, scheduling, and resource lifecycle management.",
    color: "border-yellow-200 bg-yellow-50"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Unified Multi-Cloud Cost Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get complete control over your cloud spending with our comprehensive platform that manages costs across 
            AWS, Azure, Google Cloud, and Microsoft 365 from a single, powerful dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className={`transition-all duration-300 hover:shadow-lg ${feature.color}`}>
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-center text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Integration Showcase */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Seamlessly Integrates With Your Cloud Stack</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            <div className="flex flex-col items-center">
              <CloudIcon provider="amazon" size={64} />
              <span className="mt-2 text-sm font-medium">Amazon Web Services</span>
            </div>
            <div className="flex flex-col items-center">
              <CloudIcon provider="microsoft" service="azure" size={64} />
              <span className="mt-2 text-sm font-medium">Microsoft Azure</span>
            </div>
            <div className="flex flex-col items-center">
              <CloudIcon provider="google" service="gcp" size={64} />
              <span className="mt-2 text-sm font-medium">Google Cloud Platform</span>
            </div>
            <div className="flex flex-col items-center">
              <CloudIcon provider="microsoft" size={64} />
              <span className="mt-2 text-sm font-medium">Microsoft 365</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
