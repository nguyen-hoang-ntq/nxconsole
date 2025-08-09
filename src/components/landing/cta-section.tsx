'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your
            <br />
            Multi-Cloud Costs?
          </h2>
          
          <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 350+ organizations that have transformed their cloud cost management 
            with NxConsole. Start seeing savings within 30 days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6"
              asChild
            >
              <Link href="/login">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white bg-transparent hover:bg-white hover:text-primary text-lg px-8 py-6"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Setup in under 15 minutes</span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-blue-400/30">
            <h3 className="text-xl font-semibold text-white mb-4">
              Need Help Getting Started?
            </h3>
            <p className="text-blue-100 mb-6">
              Our cloud cost optimization experts are here to help you design the perfect solution for your organization.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="mailto:support@ntq-solution.com.vn"
                className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                support@ntq-solution.com.vn
              </a>
              <a 
                href="tel:+84-24-3200-8754"
                className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                (+84)24 3200 8754
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
