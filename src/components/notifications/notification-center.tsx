'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell,
  Search,
  Filter,
  Settings,
  CheckCheck,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  DollarSign,
  Shield,
  Zap,
  Archive,
  Trash2,
  Download,
  RefreshCw
} from 'lucide-react';
import { Notification } from '@/types';
import { mockNotifications } from '@/lib/mock-data';

interface NotificationCenterProps {
  notifications?: Notification[];
  loading?: boolean;
}

export function NotificationCenter({ 
  notifications = mockNotifications, 
  loading = false 
}: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  // Calculate notification counts
  const unreadCount = localNotifications.filter(n => !n.read).length;
  const severityCounts = {
    error: localNotifications.filter(n => n.severity === 'error').length,
    warning: localNotifications.filter(n => n.severity === 'warning').length,
    info: localNotifications.filter(n => n.severity === 'info').length,
    success: localNotifications.filter(n => n.severity === 'success').length,
  };

  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    let filtered = localNotifications;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(n => n.type === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by severity
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(n => n.severity === selectedSeverity);
    }

    // Filter by read status
    if (showUnreadOnly) {
      filtered = filtered.filter(n => !n.read);
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const getSeverityIcon = (severity: Notification['severity']) => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const getSeverityColor = (severity: Notification['severity']) => {
    switch (severity) {
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'cost':
        return <DollarSign className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      case 'performance':
        return <Zap className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      case 'compliance':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setLocalNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setLocalNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setLocalNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    );
  };

  const archiveNotification = (notificationId: string) => {
    // In a real app, this would move to archive
    deleteNotification(notificationId);
  };

  const filteredNotifications = getFilteredNotifications();

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="h-8 w-8 text-blue-600" />
            Notification Center
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">
            Manage alerts and notifications from all your cloud services
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bell className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{localNotifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-4 w-4 text-red-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-600">{severityCounts.error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-orange-600">{severityCounts.warning}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Info className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Info</p>
                <p className="text-2xl font-bold text-blue-600">{severityCounts.info}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Notifications</CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="unread-only"
                  checked={showUnreadOnly}
                  onCheckedChange={setShowUnreadOnly}
                />
                <Label htmlFor="unread-only" className="text-sm">
                  Unread only
                </Label>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter Controls */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="error">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedSeverity('all');
              setShowUnreadOnly(false);
              setActiveTab('all');
            }}>
              <Filter className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>

          {/* Notification Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cost" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Cost
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Security
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-1">
                <Settings className="h-3 w-3" />
                System
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Compliance
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                        !notification.read ? 'bg-blue-50/50 border-blue-200' : 'bg-background'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getTypeIcon(notification.type)}
                            <span className="font-semibold">{notification.title}</span>
                            <Badge className={getSeverityColor(notification.severity)}>
                              {getSeverityIcon(notification.severity)}
                              <span className="ml-1 capitalize">{notification.severity}</span>
                            </Badge>
                            {!notification.read && (
                              <Badge variant="secondary">New</Badge>
                            )}
                            {notification.actionRequired && (
                              <Badge variant="destructive">Action Required</Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(notification.timestamp).toLocaleString()}
                            </span>
                            <span className="capitalize">Type: {notification.type}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          {!notification.read && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark Read
                            </Button>
                          )}
                          {notification.link && (
                            <Button size="sm" variant="default">
                              View Details
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => archiveNotification(notification.id)}
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Notifications Found</h3>
                      <p className="text-muted-foreground">
                        {showUnreadOnly ? 'No unread notifications match your filters.' : 'No notifications match your current filters.'}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
