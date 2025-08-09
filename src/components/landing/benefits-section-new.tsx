'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, Clock, Shield, Target } from 'lucide-react';

const benefits = [
  {
    title: "Reduce Multi-Cloud Costs by 20-40%",
    description: "Intelligent cost optimization across AWS, Azure, Google Cloud, and Microsoft 365",
    icon: <TrendingDown className="h-8 w-8 text-green-600" />,
    metrics: [
      "Average 32% cost reduction in first quarter",
      "Up to $2.4M annual savings for enterprises",
      "Real-time cost anomaly detection"
    ]
  },
  {
    title: "Save 15+ Hours Per Week",
    description: "Automated reporting, monitoring, and optimization recommendations",
    icon: <Clock className="h-8 w-8 text-blue-600" />,
    metrics: [
      "90% reduction in manual cost analysis",
      "Automated daily/weekly/monthly reports",
      "One-click optimization implementation"
    ]
  },
  {
    title: "Enterprise-Grade Security & Compliance",
    description: "Bank-level security with SOC 2, ISO 27001, and GDPR compliance",
    icon: <Shield className="h-8 w-8 text-purple-600" />,
    metrics: [
      "99.9% uptime SLA guarantee",
      "Zero-trust security architecture", 
      "Multi-factor authentication & SSO"
    ]
  },
  {
    title: "Achieve ROI Within 30 Days",
    description: "Quick implementation with immediate cost visibility and optimization",
    icon: <Target className="h-8 w-8 text-orange-600" />,
    metrics: [
      "15-minute setup process",
      "Immediate cost insights",
      "ROI typically achieved within first month"
    ]
  }
];

const roiCalculator = {
  averageCloudSpend: 50000,
  averageSavings: 32,
  setupTime: 15,
  timeToROI: 30
};

export function BenefitsSection() {
  const monthlySavings = (roiCalculator.averageCloudSpend * roiCalculator.averageSavings) / 100;
  const annualSavings = monthlySavings * 12;

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Measurable Results from Day One
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Organizations using NxConsole see immediate improvements in cost visibility,
            operational efficiency, and cloud ROI. Here&apos;s what you can expect.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
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

        {/* ROI Calculator Preview */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Your Potential Savings with NxConsole
              </h3>
              <p className="text-muted-foreground">
                Based on average enterprise cloud spend of ${roiCalculator.averageCloudSpend.toLocaleString()}/month
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">
                    {roiCalculator.averageSavings}%
                  </span>
                </div>
                <div className="font-semibold">Average Cost Reduction</div>
                <div className="text-sm text-muted-foreground">
                  Within first quarter
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-blue-600">
                    ${(monthlySavings/1000).toFixed(0)}K
                  </span>
                </div>
                <div className="font-semibold">Monthly Savings</div>
                <div className="text-sm text-muted-foreground">
                  ${(annualSavings/1000).toFixed(0)}K annually
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-purple-600">
                    {roiCalculator.timeToROI}
                  </span>
                </div>
                <div className="font-semibold">Days to ROI</div>
                <div className="text-sm text-muted-foreground">
                  Typical payback period
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-white rounded-lg border">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Your estimated annual savings could be:
                </div>
                <div className="text-3xl font-bold text-primary">
                  ${annualSavings.toLocaleString()}
                </div>
                <div className="text-sm text-green-600 font-medium mt-1">
                  Based on industry averages for similar organizations
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
