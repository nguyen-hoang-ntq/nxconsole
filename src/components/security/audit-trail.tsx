'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  FileText
} from 'lucide-react';

interface AuditEvent {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  resource: string;
  resourceType: string;
  platform: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'success' | 'failed' | 'warning';
  description: string;
  ipAddress: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

interface AuditTrailProps {
  events: AuditEvent[];
  loading?: boolean;
}

export function AuditTrail({ events, loading = false }: AuditTrailProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('7d');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  // Get unique values for filters
  const uniqueUsers = Array.from(new Set(events.map(e => e.user)));
  const uniqueActions = Array.from(new Set(events.map(e => e.action)));

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchTerm === '' || 
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUser = selectedUser === 'all' || event.user === selectedUser;
    const matchesAction = selectedAction === 'all' || event.action === selectedAction;
    const matchesSeverity = selectedSeverity === 'all' || event.severity === selectedSeverity;
    
    // Time range filtering (simplified)
    const now = new Date();
    const eventDate = new Date(event.timestamp);
    let matchesTimeRange = true;
    
    switch (selectedTimeRange) {
      case '1d':
        matchesTimeRange = (now.getTime() - eventDate.getTime()) <= 24 * 60 * 60 * 1000;
        break;
      case '7d':
        matchesTimeRange = (now.getTime() - eventDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
        break;
      case '30d':
        matchesTimeRange = (now.getTime() - eventDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
        break;
    }
    
    return matchesSearch && matchesUser && matchesAction && matchesSeverity && matchesTimeRange;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-50 text-green-700 border-green-200';
      case 'failed': return 'bg-red-50 text-red-700 border-red-200';
      case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
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

  // Activity statistics
  const totalEvents = filteredEvents.length;
  const successfulEvents = filteredEvents.filter(e => e.status === 'success').length;
  const failedEvents = filteredEvents.filter(e => e.status === 'failed').length;
  const warningEvents = filteredEvents.filter(e => e.status === 'warning').length;

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
      {/* Activity Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{totalEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold text-green-600">{successfulEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{failedEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">{warningEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events, users, resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {uniqueUsers.map(user => (
                  <SelectItem key={user} value={user}>{user}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger>
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {uniqueActions.map(action => (
                  <SelectItem key={action} value={action}>{action}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Events List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Audit Events ({filteredEvents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(event.status)}
                      <span className="font-semibold">{event.action}</span>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status.toUpperCase()}
                      </Badge>
                      <Badge className={getSeverityColor(event.severity)}>
                        {event.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{event.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        <span>{event.platform}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{event.resource}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-muted-foreground">
                      IP: {event.ipAddress}
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
                <p className="text-muted-foreground">
                  No audit events match your current filters.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
