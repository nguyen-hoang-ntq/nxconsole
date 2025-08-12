'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Quote,
  Building2,
  TrendingDown,
  Shield,
  Zap,
  Users,
  Award,
  Star,
  CreditCard,
  Hospital,
  Factory,
  Smartphone,
  Briefcase,
  Landmark,
  ShoppingCart,
  Truck,
  GraduationCap,
  Stethoscope
} from 'lucide-react';

const testimonials = [
  {
    quote: "NxConsole transformed our multi-cloud operations completely. The unified view across cost management, resource optimization, and security compliance has been game-changing for our enterprise infrastructure.",
    author: "Sarah Chen",
    title: "VP of Cloud Operations",
    company: "TechCorp Global",
    industry: "Financial Services",
    pillars: ["Cost Management", "Security & Compliance"],
    metrics: "65% cost reduction, 99.9% compliance score"
  },
  {
    quote: "The 4-pillar approach gives us unprecedented visibility and control. Performance monitoring integrated with resource management has helped us optimize our entire cloud ecosystem proactively.",
    author: "Michael Rodriguez",
    title: "Chief Technology Officer",
    company: "InnovateLabs",
    industry: "Healthcare Technology",
    pillars: ["Performance Monitoring", "Resource Management"],
    metrics: "40% performance improvement, 50% faster deployments"
  },
  {
    quote: "What sets NxConsole apart is the enterprise-grade automation across all operational domains. It's not just a tool—it's a complete operational transformation platform.",
    author: "Dr. Amanda Foster",
    title: "Head of Infrastructure",
    company: "MedTech Solutions",
    industry: "Healthcare",
    pillars: ["All 4 Pillars"],
    metrics: "70% operational efficiency gain, 24/7 automated compliance"
  }
];

const clientLogos = [
  { 
    name: "Global Tech Corp", 
    industry: "Financial Services", 
    icon: CreditCard,
    colors: "from-blue-500 to-blue-600",
    iconColor: "text-blue-100"
  },
  { 
    name: "Innovation Labs", 
    industry: "Healthcare Tech", 
    icon: Stethoscope,
    colors: "from-green-500 to-green-600",
    iconColor: "text-green-100"
  },
  { 
    name: "Enterprise Solutions", 
    industry: "Healthcare", 
    icon: Hospital,
    colors: "from-red-500 to-red-600",
    iconColor: "text-red-100"
  },
  { 
    name: "Cloud Systems Inc", 
    industry: "Technology", 
    icon: Smartphone,
    colors: "from-purple-500 to-purple-600",
    iconColor: "text-purple-100"
  },
  { 
    name: "Secure Banking", 
    industry: "Banking", 
    icon: Landmark,
    colors: "from-indigo-500 to-indigo-600",
    iconColor: "text-indigo-100"
  },
  { 
    name: "Manufacturing Pro", 
    industry: "Manufacturing", 
    icon: Factory,
    colors: "from-orange-500 to-orange-600",
    iconColor: "text-orange-100"
  },
  { 
    name: "Digital Finance", 
    industry: "Fintech", 
    icon: Briefcase,
    colors: "from-teal-500 to-teal-600",
    iconColor: "text-teal-100"
  },
  { 
    name: "Smart Healthcare", 
    industry: "Medical", 
    icon: Hospital,
    colors: "from-pink-500 to-pink-600",
    iconColor: "text-pink-100"
  },
  { 
    name: "Retail Innovations", 
    industry: "E-commerce", 
    icon: ShoppingCart,
    colors: "from-amber-500 to-amber-600",
    iconColor: "text-amber-100"
  },
  { 
    name: "Logistics Pro", 
    industry: "Transportation", 
    icon: Truck,
    colors: "from-cyan-500 to-cyan-600",
    iconColor: "text-cyan-100"
  },
  { 
    name: "Education Tech", 
    industry: "EdTech", 
    icon: GraduationCap,
    colors: "from-violet-500 to-violet-600",
    iconColor: "text-violet-100"
  },
  { 
    name: "Enterprise Cloud", 
    industry: "Cloud Services", 
    icon: Building2,
    colors: "from-slate-500 to-slate-600",
    iconColor: "text-slate-100"
  }
];

const caseStudyMetrics = [
  {
    metric: "65%",
    description: "Average Cost Reduction",
    pillar: "Cost Management",
    color: "text-blue-600",
    icon: <TrendingDown className="h-5 w-5" />
  },
  {
    metric: "70%",
    description: "Operational Efficiency Gain",
    pillar: "Resource Management", 
    color: "text-green-600",
    icon: <Zap className="h-5 w-5" />
  },
  {
    metric: "99.9%",
    description: "Security Compliance Score",
    pillar: "Security & Compliance",
    color: "text-purple-600", 
    icon: <Shield className="h-5 w-5" />
  },
  {
    metric: "40%",
    description: "Performance Improvement",
    pillar: "Performance Monitoring",
    color: "text-red-600",
    icon: <TrendingDown className="h-5 w-5 rotate-180" />
  }
];

const industryCompliance = [
  { name: "SOC 2 Type II", category: "Security" },
  { name: "ISO 27001", category: "Information Security" },
  { name: "GDPR", category: "Data Privacy" },
  { name: "HIPAA", category: "Healthcare" },
  { name: "PCI DSS", category: "Payment Security" },
  { name: "AWS Advanced Partner", category: "Cloud Excellence" }
];

export function SocialProofSection() {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Trusted by Enterprise Leaders Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how organizations across industries are transforming their cloud operations 
            with NxConsole&apos;s comprehensive 4-pillar platform approach.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {caseStudyMetrics.map((item, index) => (
            <Card key={index} className="text-center transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className={`flex justify-center mb-3 ${item.color}`}>
                  {item.icon}
                </div>
                <div className={`text-3xl font-bold mb-2 ${item.color}`}>
                  {item.metric}
                </div>
                <div className="text-sm font-medium mb-1">{item.description}</div>
                <div className="text-xs text-muted-foreground">{item.pillar}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  
                  <div className="mb-4">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.title}</div>
                    <div className="text-sm font-medium text-primary">{testimonial.company}</div>
                    <div className="text-xs text-gray-500">{testimonial.industry}</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(testimonial.pillars) ? 
                        testimonial.pillars.map((pillar, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {pillar}
                          </Badge>
                        )) :
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.pillars}
                        </Badge>
                      }
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      ✓ {testimonial.metrics}
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trusted Companies */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-center mb-8 text-gray-600">
            Trusted by Leading Organizations Across Industries
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-8">
              {/* First set of logos */}
              {clientLogos.map((client, index) => {
                const IconComponent = client.icon;
                return (
                  <div key={`first-${index}`} className="flex-shrink-0 w-48">
                    <div className="bg-white rounded-lg shadow-sm border p-6 text-center transition-all duration-300 hover:shadow-md group">
                      <div className={`w-16 h-16 bg-gradient-to-br ${client.colors} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-8 h-8 ${client.iconColor}`} />
                      </div>
                      <div className="text-sm font-medium text-gray-700">{client.name}</div>
                      <div className="text-xs text-gray-500">{client.industry}</div>
                    </div>
                  </div>
                );
              })}
              {/* Duplicate set for seamless loop */}
              {clientLogos.map((client, index) => {
                const IconComponent = client.icon;
                return (
                  <div key={`second-${index}`} className="flex-shrink-0 w-48">
                    <div className="bg-white rounded-lg shadow-sm border p-6 text-center transition-all duration-300 hover:shadow-md group">
                      <div className={`w-16 h-16 bg-gradient-to-br ${client.colors} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-8 h-8 ${client.iconColor}`} />
                      </div>
                      <div className="text-sm font-medium text-gray-700">{client.name}</div>
                      <div className="text-xs text-gray-500">{client.industry}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Compliance & Certifications */}
        <div>
          <h3 className="text-xl font-semibold text-center mb-8 text-gray-600">
            Enterprise-Grade Security & Compliance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industryCompliance.map((cert, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">{cert.name}</div>
                  <div className="text-xs text-gray-500">{cert.category}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Global Presence */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary mb-1">350+</div>
                  <div className="text-sm text-gray-600">Enterprise Clients</div>
                </div>
                <div className="text-center">
                  <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary mb-1">30+</div>
                  <div className="text-sm text-gray-600">Industries Served</div>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary mb-1">6</div>
                  <div className="text-sm text-gray-600">Continents</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
