'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Clock,
  AlertCircle,
  Eye,
  FileText,
  RefreshCw
} from 'lucide-react';
import { SecurityFinding } from '@/types';

interface SecurityDashboardProps {
  findings: SecurityFinding[];
  loading?: boolean;
}

export function SecurityDashboard({ findings, loading = false }: SecurityDashboardProps) {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  
  // Calculate security metrics
  const totalFindings = findings.length;
  const criticalFindings = findings.filter(f => f.severity === 'critical').length;
  const highFindings = findings.filter(f => f.severity === 'high').length;
  const mediumFindings = findings.filter(f => f.severity === 'medium').length;
  const lowFindings = findings.filter(f => f.severity === 'low').length;
  
  // Calculate security score (simplified)
  const securityScore = Math.max(0, 100 - (criticalFindings * 20 + highFindings * 10 + mediumFindings * 5 + lowFindings * 2));
  
  // Compliance status (mock data)
  const complianceStatus = [
    { framework: 'SOC 2', status: 'compliant', score: 95, lastAudit: '2024-01-10' },
    { framework: 'ISO 27001', status: 'partial', score: 78, lastAudit: '2024-01-05' },
    { framework: 'PCI DSS', status: 'compliant', score: 92, lastAudit: '2023-12-20' },
    { framework: 'GDPR', status: 'non-compliant', score: 65, lastAudit: '2024-01-15' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50';
      case 'partial': return 'text-yellow-600 bg-yellow-50';
      case 'non-compliant': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'medium': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredFindings = selectedSeverity === 'all' 
    ? findings 
    : findings.filter(f => f.severity === selectedSeverity);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Score Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold">{securityScore}/100</p>
              </div>
            </div>
            <Progress value={securityScore} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-4 w-4 text-red-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                <p className="text-2xl font-bold text-red-600">{criticalFindings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-orange-600">{highFindings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Findings</p>
                <p className="text-2xl font-bold">{totalFindings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="findings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="findings">Security Findings</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="findings" className="space-y-4">
          {/* Severity Filter */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedSeverity === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedSeverity('all')}
            >
              All ({totalFindings})
            </Button>
            <Button 
              variant={selectedSeverity === 'critical' ? 'destructive' : 'outline'} 
              size="sm"
              onClick={() => setSelectedSeverity('critical')}
            >
              Critical ({criticalFindings})
            </Button>
            <Button 
              variant={selectedSeverity === 'high' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedSeverity('high')}
              className={selectedSeverity === 'high' ? 'bg-orange-600 hover:bg-orange-700' : ''}
            >
              High ({highFindings})
            </Button>
            <Button 
              variant={selectedSeverity === 'medium' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedSeverity('medium')}
              className={selectedSeverity === 'medium' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
            >
              Medium ({mediumFindings})
            </Button>
            <Button 
              variant={selectedSeverity === 'low' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedSeverity('low')}
              className={selectedSeverity === 'low' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              Low ({lowFindings})
            </Button>
          </div>

          {/* Security Findings List */}
          <div className="space-y-4">
            {filteredFindings.map((finding) => (
              <Card key={finding.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getSeverityIcon(finding.severity)}
                        <h3 className="font-semibold">{finding.title}</h3>
                        <Badge className={getSeverityColor(finding.severity)}>
                          {finding.severity.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {finding.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>Platform: {finding.platform}</span>
                        <span>Resource: {finding.resource}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(finding.discoveredDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-medium text-sm text-blue-800 mb-1">Remediation</h4>
                        <p className="text-sm text-blue-700">{finding.remediation}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm">
                        Fix Issue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredFindings.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
                  <p className="text-muted-foreground">
                    No security findings match the selected severity level.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {complianceStatus.map((framework) => (
              <Card key={framework.framework}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{framework.framework}</CardTitle>
                    <Badge className={getStatusColor(framework.status)}>
                      {framework.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Compliance Score</span>
                        <span className="text-sm font-bold">{framework.score}%</span>
                      </div>
                      <Progress value={framework.score} />
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      Last audit: {new Date(framework.lastAudit).toLocaleDateString()}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Re-audit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
