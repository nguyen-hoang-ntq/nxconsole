'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, DollarSign, Server, Activity, Shield, Eye, AlertCircle, TrendingDown } from 'lucide-react';
import { CloudIcon } from '@/components/icons/cloud-icons';

export function HeroSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span>Unified Multi-Cloud Operations • 4-Pillar Architecture</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Comprehensive
            <br />
            <span className="text-primary">Multi-Cloud Management</span>
            <br />
            Platform
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Unify your cloud operations across Cost Management, Resource Management, 
            Performance Monitoring, and Security & Compliance. Complete control over 
            AWS, Azure, Google Cloud & Microsoft 365 from one intelligent platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/login">
                Explore Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Request Demo
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-lg border bg-background/50 backdrop-blur-sm p-4 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 rounded-md p-6">
                <div className="h-full flex flex-col">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Nx</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary">
                        Unified Multi-Cloud Operations Dashboard
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Live Data</span>
                    </div>
                  </div>

                  {/* 4-Pillar Overview Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Cost Management Pillar */}
                    <div className="bg-background rounded-lg p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-950/20 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                        <span className="font-semibold text-sm text-blue-900 dark:text-blue-100">Cost Management</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">$42,650</div>
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingDown className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">↓ 14%</span>
                        <span className="text-muted-foreground">optimized</span>
                      </div>
                    </div>
                    
                    {/* Resource Management Pillar */}
                    <div className="bg-background rounded-lg p-4 border-l-4 border-green-600 bg-green-50 dark:bg-green-950/20 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <Server className="h-6 w-6 text-green-600" />
                        <span className="font-semibold text-sm text-green-900 dark:text-green-100">Resource Mgmt</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-1">1,247</div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-green-600">↑ 98%</span>
                        <span className="text-muted-foreground">healthy</span>
                      </div>
                    </div>
                    
                    {/* Performance Monitoring Pillar */}
                    <div className="bg-background rounded-lg p-4 border-l-4 border-red-600 bg-red-50 dark:bg-red-950/20 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <Activity className="h-6 w-6 text-red-600" />
                        <span className="font-semibold text-sm text-red-900 dark:text-red-100">Performance</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600 mb-1">99.8%</div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-green-600">↑ uptime</span>
                        <span className="text-muted-foreground">optimal</span>
                      </div>
                    </div>
                    
                    {/* Security & Compliance Pillar */}
                    <div className="bg-background rounded-lg p-4 border-l-4 border-purple-600 bg-purple-50 dark:bg-purple-950/20 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-6 w-6 text-purple-600" />
                        <span className="font-semibold text-sm text-purple-900 dark:text-purple-100">Security</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600 mb-1">94%</div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-green-600">↑ compliant</span>
                        <span className="text-muted-foreground">secure</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>Unified operations across all 4 pillars</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-amber-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>5 optimization insights</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-background border rounded-lg px-6 py-3 shadow-lg">
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-green-600">↓ 70%</div>
                    <div className="text-muted-foreground">Complexity</div>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600">4 Pillars</div>
                    <div className="text-muted-foreground">Unified</div>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center">
                    <div className="font-bold text-purple-600">Live</div>
                    <div className="text-muted-foreground">Intelligence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
