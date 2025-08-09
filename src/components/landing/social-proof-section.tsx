'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "NxConsole helped us reduce our multi-cloud costs by 38% within the first quarter. The unified dashboard gives us complete visibility across AWS, Azure, and Google Cloud.",
    author: "Sarah Johnson",
    title: "FinOps Director",
    company: "Global Manufacturing Corp",
    avatar: "/avatars/sarah-j.jpg",
    rating: 5,
    savings: "$2.4M annually"
  },
  {
    quote: "The AI-powered cost optimization suggestions have been game-changing. We&apos;ve automated 80% of our cost management tasks and improved our cloud ROI significantly.",
    author: "Michael Chen",
    title: "Cloud Infrastructure Manager",
    company: "TechFlow Solutions",
    avatar: "/avatars/michael-c.jpg",
    rating: 5,
    savings: "$1.8M annually"
  },
  {
    quote: "Finally, a solution that speaks our language. NxConsole&apos;s forecasting helped us plan our cloud budget more accurately and avoid surprise costs.",
    author: "Elena Rodriguez",
    title: "VP of Engineering",
    company: "InnovateTech",
    avatar: "/avatars/elena-r.jpg",
    rating: 5,
    savings: "$950K annually"
  }
];

const trustIndicators = [
  {
    metric: "99.9%",
    label: "Uptime SLA",
    description: "Enterprise-grade reliability"
  },
  {
    metric: "350+",
    label: "Global Clients",
    description: "Trusted worldwide"
  },
  {
    metric: "30+",
    label: "Industries",
    description: "Diverse expertise"
  },
  {
    metric: "24/7",
    label: "Support",
    description: "Always available"
  }
];

const complianceBadges = [
  "SOC 2 Type II",
  "ISO 27001",
  "GDPR Compliant", 
  "HIPAA Ready",
  "AWS Advanced Partner",
  "Microsoft Gold Partner"
];

export function SocialProofSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Trusted by Leading Organizations Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join 350+ companies that have transformed their cloud cost management 
            with NxConsole. See why enterprises choose us for their multi-cloud optimization.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustIndicators.map((indicator, index) => (
            <Card key={index} className="text-center transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {indicator.metric}
                </div>
                <div className="font-semibold text-gray-900 mb-1">
                  {indicator.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {indicator.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <div className="relative">
                    <Quote className="h-6 w-6 text-primary/20 absolute -top-2 -left-1" />
                    <p className="text-gray-600 italic pl-4">
                      {testimonial.quote}
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Saved {testimonial.savings}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Compliance & Certifications */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6">
            Enterprise-Grade Security & Compliance
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {complianceBadges.map((badge, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm font-medium">
                {badge}
              </Badge>
            ))}
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your data security is our priority. NxConsole meets the highest standards 
            for enterprise security, compliance, and data protection across all major 
            regulatory frameworks.
          </p>
        </div>

        {/* Case Study Preview */}
        <Card className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Real Results from Real Customers
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">38%</span>
                    </div>
                    <div>
                      <div className="font-semibold">Average Cost Reduction</div>
                      <div className="text-sm text-muted-foreground">
                        Within first 90 days of implementation
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">6x</span>
                    </div>
                    <div>
                      <div className="font-semibold">Faster Decision Making</div>
                      <div className="text-sm text-muted-foreground">
                        Real-time insights and automated reporting
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-lg">90%</span>
                    </div>
                    <div>
                      <div className="font-semibold">Operational Efficiency</div>
                      <div className="text-sm text-muted-foreground">
                        Automated cost optimization and monitoring
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="text-4xl font-bold text-primary mb-2">$5.2M+</div>
                  <div className="text-lg font-semibold mb-1">Total Savings</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Achieved by our customers in 2024
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    ROI within 30 days
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
