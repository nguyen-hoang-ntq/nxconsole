'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Award, 
  TrendingUp,
  Shield,
  Globe,
  Clock,
  CheckCircle,
  Mail,
  ArrowRight
} from 'lucide-react';

const achievements = [
  {
    title: "14+ Years",
    description: "Enterprise Technology Expertise",
    icon: <Clock className="h-8 w-8 text-primary" />
  },
  {
    title: "350+ Clients",
    description: "Trusted Worldwide",
    icon: <Users className="h-8 w-8 text-primary" />
  },
  {
    title: "30+ Industries",
    description: "Diverse Experience",
    icon: <Building2 className="h-8 w-8 text-primary" />
  },
  {
    title: "99.9% Uptime",
    description: "Enterprise-Grade Reliability",
    icon: <Shield className="h-8 w-8 text-primary" />
  }
];

const coreValues = [
  {
    title: "Innovation-First",
    description: "We&apos;re constantly pushing the boundaries of what&apos;s possible in cloud cost management.",
    icon: <TrendingUp className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Customer-Centric",
    description: "Your success is our priority. We build solutions that directly address your challenges.",
    icon: <Users className="h-6 w-6 text-green-600" />
  },
  {
    title: "Enterprise Security",
    description: "Bank-level security standards with compliance across SOC 2, GDPR, and industry regulations.",
    icon: <Shield className="h-6 w-6 text-purple-600" />
  },
  {
    title: "Global Excellence",
    description: "Serving clients across 6 continents with 24/7 support and local expertise.",
    icon: <Globe className="h-6 w-6 text-orange-600" />
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Powered by NTQ Solution&apos;s Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            NxConsole is built on 14+ years of enterprise cloud expertise from NTQ Solution, 
            a global technology leader trusted by 350+ clients across 30 industries worldwide.
          </p>
        </div>

        {/* Company Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-2">
                  {achievement.icon}
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              From Enterprise Consulting to Cloud Innovation
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2009, NTQ Solution began as a technology consulting firm focused on 
                helping enterprises navigate digital transformation. Over the years, we&apos;ve evolved 
                into a comprehensive technology partner, specializing in cloud architecture, 
                digital solutions, and cost optimization.
              </p>
              <p>
                As cloud adoption accelerated, we recognized a critical gap: organizations were 
                struggling with multi-cloud cost management and visibility. Traditional tools 
                were fragmented, complex, and failed to provide the unified insights that 
                modern enterprises needed.
              </p>
              <p>
                Today, we&apos;re proud to help organizations worldwide optimize their cloud spending, 
                improve operational efficiency, and make data-driven decisions about their 
                cloud infrastructure investments.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="px-3 py-1">ISO 27001 Certified</Badge>
              <Badge variant="secondary" className="px-3 py-1">SOC 2 Type II</Badge>
              <Badge variant="secondary" className="px-3 py-1">GDPR Compliant</Badge>
              <Badge variant="secondary" className="px-3 py-1">AWS Advanced Partner</Badge>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Our Mission & Vision</h3>
            
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
                <CardDescription className="text-base">
                  We&apos;re dedicated to delivering world-class cloud cost management solutions 
                  that empower organizations to optimize their multi-cloud investments, 
                  reduce waste, and accelerate innovation.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Our Vision
                </CardTitle>
                <CardDescription className="text-base">
                  To become the global standard for intelligent cloud cost management, 
                  enabling enterprises to achieve maximum value from their cloud investments 
                  while maintaining operational excellence.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Our Commitment
                </CardTitle>
                <CardDescription className="text-base">
                  Your success is our success. We&apos;re committed to helping you 
                  achieve measurable ROI through intelligent automation, 
                  proactive insights, and continuous optimization.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Drives Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      {value.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                  <CardDescription className="text-sm">{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Cloud Costs?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join hundreds of organizations that trust NTQ Solution&apos;s expertise. 
              Let&apos;s discuss how NxConsole can optimize your multi-cloud environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/login">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Contact Sales Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
