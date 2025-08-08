'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  FileText, 
  AlertTriangle, 
  Info,
  CheckCircle,
  XCircle,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Activity,
  Database,
  Shield,
  Zap,
  Clock
} from 'lucide-react';

const mockSystemLogs = [
  {
    id: '1',
    timestamp: '2024-08-08 15:23:45',
    level: 'INFO',
    service: 'Auth Service',
    message: 'User login successful: john.doe@company.com',
    source: 'auth-service-001',
    details: 'IP: 192.168.1.100, Browser: Chrome 115'
  },
  {
    id: '2',
    timestamp: '2024-08-08 15:22:12',
    level: 'WARNING',
    service: 'AWS Connector',
    message: 'Rate limit approaching for EC2 API calls',
    source: 'aws-connector-002',
    details: 'Current rate: 950/1000 per hour'
  },
  {
    id: '3',
    timestamp: '2024-08-08 15:20:33',
    level: 'ERROR',
    service: 'Azure Sync',
    message: 'Failed to sync resource group data',
    source: 'azure-sync-001',
    details: 'Timeout after 30s, subscription: sub-12345'
  },
  {
    id: '4',
    timestamp: '2024-08-08 15:18:09',
    level: 'INFO',
    service: 'Database',
    message: 'Scheduled backup completed successfully',
    source: 'db-backup-service',
    details: 'Size: 2.3GB, Duration: 45s'
  },
  {
    id: '5',
    timestamp: '2024-08-08 15:15:27',
    level: 'CRITICAL',
    service: 'Security Scanner',
    message: 'Suspicious login attempt detected',
    source: 'security-monitor',
    details: 'Multiple failed attempts from IP: 203.0.113.15'
  }
];

const mockApplicationLogs = [
  {
    id: '1',
    timestamp: '2024-08-08 15:24:12',
    level: 'INFO',
    component: 'Dashboard',
    message: 'User accessed FinOps dashboard',
    user: 'jane.smith@company.com',
    action: 'page_view'
  },
  {
    id: '2',
    timestamp: '2024-08-08 15:23:55',
    level: 'ERROR',
    component: 'Chart Renderer',
    message: 'Failed to render cost analysis chart',
    user: 'mike.j@company.com',
    action: 'chart_render_failed'
  },
  {
    id: '3',
    timestamp: '2024-08-08 15:22:38',
    level: 'INFO',
    component: 'M365 License Manager',
    message: 'License assignment updated',
    user: 'admin@company.com',
    action: 'license_update'
  }
];

const mockAuditLogs = [
  {
    id: '1',
    timestamp: '2024-08-08 15:25:01',
    user: 'admin@company.com',
    action: 'USER_CREATED',
    resource: 'users/new-employee@company.com',
    ip: '192.168.1.100',
    result: 'SUCCESS'
  },
  {
    id: '2',
    timestamp: '2024-08-08 15:20:45',
    user: 'jane.smith@company.com',
    action: 'ROLE_MODIFIED',
    resource: 'roles/manager',
    ip: '192.168.1.102',
    result: 'SUCCESS'
  },
  {
    id: '3',
    timestamp: '2024-08-08 15:15:30',
    user: 'unknown',
    action: 'LOGIN_FAILED',
    resource: 'auth/login',
    ip: '203.0.113.15',
    result: 'FAILED'
  }
];

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedTab, setSelectedTab] = useState('system');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const filteredSystemLogs = mockSystemLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || log.level.toLowerCase() === selectedLevel.toLowerCase();
    return matchesSearch && matchesLevel;
  });

  const getLevelIcon = (level: string) => {
    switch (level.toUpperCase()) {
      case 'INFO':
        return <Info className="h-4 w-4 text-blue-600" />;
      case 'WARNING':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'ERROR':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'CRITICAL':
        return <Zap className="h-4 w-4 text-purple-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLevelBadge = (level: string) => {
    const variants: Record<string, 'default' | 'destructive' | 'secondary' | 'outline'> = {
      INFO: 'default',
      WARNING: 'secondary', 
      ERROR: 'destructive',
      CRITICAL: 'destructive'
    };
    return variants[level.toUpperCase()] || 'outline';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">System Logs</h1>
            <p className="text-muted-foreground">Monitor system activity, errors, and audit trails</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">2,347</p>
                <p className="text-xs text-muted-foreground">Total Events (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-muted-foreground">Errors (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Warnings (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-muted-foreground">Security Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="system">System Logs</TabsTrigger>
          <TabsTrigger value="application">Application Logs</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        {/* System Logs Tab */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Logs
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <select 
                    className="px-3 py-2 border rounded-md"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    <option value="all">All Levels</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSystemLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getLevelBadge(log.level)} className="flex items-center gap-1 w-fit">
                          {getLevelIcon(log.level)}
                          {log.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{log.service}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>{log.message}</div>
                          {log.details && (
                            <div className="text-xs text-muted-foreground">{log.details}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground font-mono">
                        {log.source}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Application Logs Tab */}
        <TabsContent value="application" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Application Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Component</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplicationLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getLevelBadge(log.level)} className="flex items-center gap-1 w-fit">
                          {getLevelIcon(log.level)}
                          {log.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{log.component}</TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell className="text-sm">{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAuditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground font-mono">
                        {log.resource}
                      </TableCell>
                      <TableCell className="text-sm font-mono">{log.ip}</TableCell>
                      <TableCell>
                        <Badge variant={log.result === 'SUCCESS' ? 'default' : 'destructive'}>
                          {log.result === 'SUCCESS' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {log.result}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
