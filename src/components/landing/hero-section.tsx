'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, TrendingDown, Eye, AlertCircle } from 'lucide-react';
import { CloudIcon } from '@/components/icons/cloud-icons';

export function HeroSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span>Optimize Cloud Costs with Intelligence & Efficiency</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Unified Multi-Cloud
            <br />
            <span className="text-primary">Cost Management</span>
            <br />
            Platform
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Control costs, optimize spending, and manage AWS, Azure, Google Cloud & Microsoft 365 
            from one powerful dashboard. Reduce cloud costs by up to 40% with intelligent automation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/login">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
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
                        Multi-Cloud Cost Dashboard
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Live Data</span>
                    </div>
                  </div>

                  {/* Platform Cost Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-background rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <CloudIcon provider="amazon" service="aws" size={24} />
                        <span className="font-semibold text-sm">AWS</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600 mb-1">$18,750</div>
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingDown className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">↓ 8%</span>
                        <span className="text-muted-foreground">vs last month</span>
                      </div>
                    </div>
                    
                    <div className="bg-background rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <CloudIcon provider="microsoft" service="azure" size={24} />
                        <span className="font-semibold text-sm">Azure</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">$12,340</div>
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingDown className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">↓ 15%</span>
                        <span className="text-muted-foreground">vs last month</span>
                      </div>
                    </div>
                    
                    <div className="bg-background rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <CloudIcon provider="google" service="gcp" size={24} />
                        <span className="font-semibold text-sm">GCP</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-1">$7,650</div>
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingDown className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">↓ 22%</span>
                        <span className="text-muted-foreground">vs last month</span>
                      </div>
                    </div>
                    
                    <div className="bg-background rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <CloudIcon provider="microsoft" service="teams" size={24} />
                        <span className="font-semibold text-sm">M365</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600 mb-1">$3,910</div>
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingDown className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">↓ 12%</span>
                        <span className="text-muted-foreground">vs last month</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>Real-time monitoring across all platforms</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-amber-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>3 optimization alerts</span>
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
                    <div className="font-bold text-green-600">↓ 14%</div>
                    <div className="text-muted-foreground">Avg Savings</div>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600">$42,650</div>
                    <div className="text-muted-foreground">Total Managed</div>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center">
                    <div className="font-bold text-purple-600">Live</div>
                    <div className="text-muted-foreground">Data Sync</div>
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
