'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Settings,
  Plus,
  Edit,
  Trash2,
  Bell,
  Mail,
  MessageSquare,
  Slack,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Save,
  Copy,
  Download
} from 'lucide-react';

interface AlertRule {
  id: string;
  name: string;
  description: string;
  type: 'cost' | 'security' | 'performance' | 'system' | 'compliance';
  enabled: boolean;
  severity: 'info' | 'warning' | 'error' | 'critical';
  conditions: {
    metric: string;
    operator: '>' | '<' | '=' | '>=' | '<=' | 'contains';
    value: string | number;
  }[];
  channels: ('email' | 'teams' | 'slack' | 'webhook')[];
  recipients: string[];
  cooldown: number; // minutes
  escalation: {
    enabled: boolean;
    levels: {
      delay: number; // minutes
      recipients: string[];
      channels: ('email' | 'teams' | 'slack')[];
    }[];
  };
  createdAt: Date;
  lastTriggered?: Date;
}

interface AlertHistory {
  id: string;
  ruleId: string;
  ruleName: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  status: 'sent' | 'failed' | 'acknowledged' | 'resolved';
  timestamp: Date;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolvedBy?: string;
  resolvedAt?: Date;
  channels: string[];
  recipients: string[];
}

const mockAlertRules: AlertRule[] = [
  {
    id: 'rule-001',
    name: 'High Cost Alert',
    description: 'Alert when monthly cost exceeds $10,000',
    type: 'cost',
    enabled: true,
    severity: 'warning',
    conditions: [
      { metric: 'monthly_cost', operator: '>', value: 10000 }
    ],
    channels: ['email', 'teams'],
    recipients: ['finops@company.com', 'admin@company.com'],
    cooldown: 60,
    escalation: {
      enabled: true,
      levels: [
        {
          delay: 30,
          recipients: ['manager@company.com'],
          channels: ['email']
        }
      ]
    },
    createdAt: new Date('2024-01-01'),
    lastTriggered: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: 'rule-002',
    name: 'Security Critical Alert',
    description: 'Alert on critical security findings',
    type: 'security',
    enabled: true,
    severity: 'critical',
    conditions: [
      { metric: 'security_severity', operator: '=', value: 'critical' }
    ],
    channels: ['email', 'teams', 'slack'],
    recipients: ['security@company.com', 'admin@company.com'],
    cooldown: 5,
    escalation: {
      enabled: true,
      levels: [
        {
          delay: 15,
          recipients: ['ciso@company.com'],
          channels: ['email', 'teams']
        }
      ]
    },
    createdAt: new Date('2024-01-01'),
    lastTriggered: new Date('2024-01-15T08:45:00Z')
  }
];

const mockAlertHistory: AlertHistory[] = [
  {
    id: 'alert-001',
    ruleId: 'rule-001',
    ruleName: 'High Cost Alert',
    message: 'Monthly cost has exceeded $10,000 threshold',
    severity: 'warning',
    status: 'acknowledged',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    acknowledgedBy: 'finops@company.com',
    acknowledgedAt: new Date('2024-01-15T10:45:00Z'),
    channels: ['email', 'teams'],
    recipients: ['finops@company.com', 'admin@company.com']
  },
  {
    id: 'alert-002',
    ruleId: 'rule-002',
    ruleName: 'Security Critical Alert',
    message: 'Critical security vulnerability detected in production',
    severity: 'critical',
    status: 'resolved',
    timestamp: new Date('2024-01-15T08:45:00Z'),
    acknowledgedBy: 'security@company.com',
    acknowledgedAt: new Date('2024-01-15T08:50:00Z'),
    resolvedBy: 'security@company.com',
    resolvedAt: new Date('2024-01-15T12:30:00Z'),
    channels: ['email', 'teams', 'slack'],
    recipients: ['security@company.com', 'admin@company.com']
  }
];

export function AlertManagement() {
  const [activeTab, setActiveTab] = useState('rules');
  const [alertRules, setAlertRules] = useState<AlertRule[]>(mockAlertRules);
  const [alertHistory, setAlertHistory] = useState<AlertHistory[]>(mockAlertHistory);
  const [editingRule, setEditingRule] = useState<AlertRule | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getSeverityIcon = (severity: AlertRule['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: AlertRule['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'error':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'warning':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getStatusIcon = (status: AlertHistory['status']) => {
    switch (status) {
      case 'sent':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'acknowledged':
        return <CheckCircle className="h-4 w-4 text-orange-600" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'teams':
        return <MessageSquare className="h-4 w-4" />;
      case 'slack':
        return <Slack className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const toggleRuleStatus = (ruleId: string) => {
    setAlertRules(prev => 
      prev.map(rule => 
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const duplicateRule = (rule: AlertRule) => {
    const newRule: AlertRule = {
      ...rule,
      id: `rule-${Date.now()}`,
      name: `${rule.name} (Copy)`,
      createdAt: new Date(),
      lastTriggered: undefined
    };
    setAlertRules(prev => [...prev, newRule]);
  };

  const deleteRule = (ruleId: string) => {
    setAlertRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlertHistory(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { 
              ...alert, 
              status: 'acknowledged',
              acknowledgedBy: 'current.user@company.com',
              acknowledgedAt: new Date()
            } 
          : alert
      )
    );
  };

  const resolveAlert = (alertId: string) => {
    setAlertHistory(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { 
              ...alert, 
              status: 'resolved',
              resolvedBy: 'current.user@company.com',
              resolvedAt: new Date()
            } 
          : alert
      )
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-8 w-8 text-blue-600" />
            Alert Management
          </h1>
          <p className="text-muted-foreground">
            Configure and manage notification rules and alert history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bell className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">{alertRules.filter(r => r.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Pending Alerts</p>
                <p className="text-2xl font-bold text-orange-600">
                  {alertHistory.filter(a => a.status === 'sent').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {alertHistory.filter(a => 
                    a.status === 'resolved' && 
                    a.resolvedAt && 
                    new Date(a.resolvedAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-purple-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Recipients</p>
                <p className="text-2xl font-bold">
                  {new Set(alertRules.flatMap(r => r.recipients)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rules">Alert Rules</TabsTrigger>
              <TabsTrigger value="history">Alert History</TabsTrigger>
              <TabsTrigger value="channels">Delivery Channels</TabsTrigger>
            </TabsList>

            <TabsContent value="rules" className="space-y-4">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {alertRules.map((rule) => (
                    <Card key={rule.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={rule.enabled}
                                  onCheckedChange={() => toggleRuleStatus(rule.id)}
                                />
                                <span className="font-semibold">{rule.name}</span>
                              </div>
                              <Badge className={getSeverityColor(rule.severity)}>
                                {getSeverityIcon(rule.severity)}
                                <span className="ml-1 capitalize">{rule.severity}</span>
                              </Badge>
                              <Badge variant="outline" className="capitalize">
                                {rule.type}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">
                              {rule.description}
                            </p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Channels:</span>
                                <div className="flex gap-1 mt-1">
                                  {rule.channels.map(channel => (
                                    <div key={channel} className="flex items-center gap-1">
                                      {getChannelIcon(channel)}
                                      <span className="capitalize">{channel}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="font-medium">Recipients:</span>
                                <p className="text-muted-foreground">
                                  {rule.recipients.length} users
                                </p>
                              </div>
                              <div>
                                <span className="font-medium">Cooldown:</span>
                                <p className="text-muted-foreground">
                                  {rule.cooldown} minutes
                                </p>
                              </div>
                              <div>
                                <span className="font-medium">Last Triggered:</span>
                                <p className="text-muted-foreground">
                                  {rule.lastTriggered 
                                    ? new Date(rule.lastTriggered).toLocaleDateString()
                                    : 'Never'
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline" onClick={() => setEditingRule(rule)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => duplicateRule(rule)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteRule(rule.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Channels</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertHistory.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{alert.ruleName}</p>
                            <p className="text-sm text-muted-foreground">
                              {alert.message}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {getSeverityIcon(alert.severity)}
                            <span className="ml-1 capitalize">{alert.severity}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(alert.status)}
                            <span className="capitalize">{alert.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(alert.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {alert.channels.map(channel => (
                              <div key={channel} className="flex items-center gap-1">
                                {getChannelIcon(channel)}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {alert.status === 'sent' && (
                              <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(alert.id)}>
                                Acknowledge
                              </Button>
                            )}
                            {alert.status === 'acknowledged' && (
                              <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                                Resolve
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="channels" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Email Notifications</Label>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label>SMTP Server</Label>
                      <Input defaultValue="smtp.company.com" />
                    </div>
                    <div>
                      <Label>From Address</Label>
                      <Input defaultValue="alerts@company.com" />
                    </div>
                    <Button>Test Connection</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Microsoft Teams
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Teams Integration</Label>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label>Webhook URL</Label>
                      <Input placeholder="https://outlook.office.com/webhook/..." />
                    </div>
                    <div>
                      <Label>Default Channel</Label>
                      <Input defaultValue="#alerts" />
                    </div>
                    <Button>Test Integration</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
