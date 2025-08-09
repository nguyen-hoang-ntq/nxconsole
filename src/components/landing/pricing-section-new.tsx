'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Mail, Phone } from 'lucide-react';

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small to medium businesses getting started with cloud cost optimization",
    price: "Contact Sales",
    features: [
      "Up to 5 cloud accounts",
      "Basic cost analytics dashboard",
      "Monthly cost reports",
      "Email support",
      "Standard security features",
      "API access (basic)"
    ],
    highlighted: false,
    ctaText: "Contact Sales",
    idealFor: "SMB (Up to $50K monthly cloud spend)"
  },
  {
    name: "Professional",
    description: "Advanced features for growing enterprises with complex multi-cloud environments",
    price: "Contact Sales", 
    features: [
      "Up to 25 cloud accounts",
      "Advanced AI-powered insights",
      "Real-time cost monitoring",
      "Custom alerting & notifications",
      "Advanced reporting & analytics",
      "Priority support (24/5)",
      "SSO integration",
      "Full API access",
      "Custom dashboards"
    ],
    highlighted: true,
    ctaText: "Contact Sales",
    idealFor: "Enterprise ($50K-$500K monthly cloud spend)"
  },
  {
    name: "Enterprise",
    description: "Complete solution for large enterprises with extensive cloud infrastructure",
    price: "Contact Sales",
    features: [
      "Unlimited cloud accounts",
      "Advanced AI & ML optimization",
      "Predictive cost forecasting",
      "Multi-tenant architecture",
      "White-label capabilities",
      "Dedicated customer success manager",
      "24/7 premium support",
      "Custom integrations",
      "Advanced compliance features",
      "On-premise deployment options"
    ],
    highlighted: false,
    ctaText: "Contact Sales",
    idealFor: "Large Enterprise ($500K+ monthly cloud spend)"
  }
];

const pricingFeatures = [
  "No hidden fees or surprise charges",
  "30-day free trial with full feature access",
  "Flexible pricing based on your cloud spend",
  "Cancel anytime with 30-day notice",
  "Volume discounts available",
  "Custom enterprise agreements"
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your organization&apos;s needs. All plans include our 
            core cost optimization features with no setup fees or long-term commitments.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative transition-all duration-300 hover:shadow-lg ${
                plan.highlighted 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm mt-2 min-h-[3rem] flex items-center">
                  {plan.description}
                </CardDescription>
                
                <div className="mt-4">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {plan.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {plan.idealFor}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  size="lg"
                >
                  {plan.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Included Features:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Features */}
        <Card className="bg-white border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-center mb-6">
              What&apos;s Included in Every Plan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {pricingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                Need a custom solution? Our team will work with you to create 
                a plan that perfectly fits your organization&apos;s unique requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Sales Team
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ROI Guarantee */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-4">
              ROI Guarantee
            </h3>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              We&apos;re so confident in NxConsole&apos;s ability to optimize your cloud costs 
              that we guarantee measurable ROI within 30 days, or we&apos;ll work with you 
              until you achieve your cost optimization goals.
            </p>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              30-Day ROI Guarantee
            </Badge>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
