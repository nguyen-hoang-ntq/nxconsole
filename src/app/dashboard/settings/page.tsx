'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Cloud, 
  Bell, 
  Palette, 
  User, 
  Shield,
  Database,
  Globe,
  Moon,
  Sun,
  Monitor,
  Wifi,
  Save,
  RefreshCw
} from 'lucide-react';
import { AWSIcon, AzureIcon, GCPIcon, MicrosoftIcon, GoogleIcon } from '@/components/icons/cloud-icons';

// Types for connection status
type ConnectionStatus = 'connected' | 'disconnected' | 'testing' | 'error';

interface CloudSettings {
  accessKey: string;
  secretKey: string;
  region: string;
  autoSync: boolean;
}

interface Settings {
  aws: CloudSettings;
  azure: CloudSettings & { tenantId: string; subscriptionId: string; };
  gcp: CloudSettings & { projectId: string; };
  microsoft365: { tenantId: string; clientId: string; clientSecret: string; autoSync: boolean; };
  googleWorkspace: { customerId: string; serviceAccountKey: string; adminEmail: string; autoSync: boolean; };
  notifications: {
    email: boolean;
    desktop: boolean;
    slack: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  
  // Connection status state
  const [connectionStatus, setConnectionStatus] = useState<Record<string, ConnectionStatus>>({
    aws: 'disconnected',
    azure: 'disconnected',
    gcp: 'disconnected',
    microsoft365: 'disconnected',
    googleWorkspace: 'disconnected'
  });

  // Settings state
  const [settings, setSettings] = useState<Settings>({
    aws: {
      accessKey: '',
      secretKey: '',
      region: 'us-east-1',
      autoSync: true
    },
    azure: {
      accessKey: '',
      secretKey: '',
      region: 'East US',
      tenantId: '',
      subscriptionId: '',
      autoSync: true
    },
    gcp: {
      accessKey: '',
      secretKey: '',
      region: 'us-central1',
      projectId: '',
      autoSync: true
    },
    microsoft365: {
      tenantId: '',
      clientId: '',
      clientSecret: '',
      autoSync: true
    },
    googleWorkspace: {
      customerId: '',
      serviceAccountKey: '',
      adminEmail: '',
      autoSync: true
    },
    notifications: {
      email: true,
      desktop: true,
      slack: false
    },
    theme: 'system',
    language: 'en'
  });

  // Connection testing function
  const testConnection = async (provider: string) => {
    setConnectionStatus(prev => ({ ...prev, [provider]: 'testing' }));
    
    try {
      // Simulate API call - replace with actual connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;
      
      setConnectionStatus(prev => ({ 
        ...prev, 
        [provider]: success ? 'connected' : 'error' 
      }));
    } catch (error) {
      setConnectionStatus(prev => ({ ...prev, [provider]: 'error' }));
    }
  };

  // Helper functions for connection status display
  const getConnectionStatusColor = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'disconnected': return 'text-gray-500';
      case 'testing': return 'text-blue-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  const getConnectionStatusText = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'disconnected': return 'Not connected';
      case 'testing': return 'Testing...';
      case 'error': return 'Connection failed';
      default: return 'Unknown';
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings saved:', settings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your cloud provider connections and application preferences.
          </p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="cloud" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="cloud" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            Cloud Providers
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Cloud Providers Tab */}
        <TabsContent value="cloud" className="space-y-6">
          {/* AWS Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AWSIcon size={20} />
                Amazon Web Services (AWS)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aws-access-key">Access Key ID</Label>
                  <Input 
                    id="aws-access-key"
                    type="password"
                    value={settings.aws.accessKey}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, aws: {...prev.aws, accessKey: e.target.value}}))
                    }
                    placeholder="Enter AWS Access Key ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aws-secret-key">Secret Access Key</Label>
                  <Input 
                    id="aws-secret-key"
                    type="password"
                    value={settings.aws.secretKey}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, aws: {...prev.aws, secretKey: e.target.value}}))
                    }
                    placeholder="Enter AWS Secret Access Key"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="aws-region">Default Region</Label>
                <Input 
                  id="aws-region"
                  value={settings.aws.region}
                  onChange={(e) => 
                    setSettings(prev => ({...prev, aws: {...prev.aws, region: e.target.value}}))
                  }
                  placeholder="us-east-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="aws-auto-sync"
                  checked={settings.aws.autoSync}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({...prev, aws: {...prev.aws, autoSync: checked}}))
                  }
                />
                <Label htmlFor="aws-auto-sync">Enable automatic synchronization</Label>
              </div>
              
              {/* Connection Test */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Wifi className={`h-4 w-4 ${getConnectionStatusColor(connectionStatus.aws)}`} />
                  <span className={`text-sm ${getConnectionStatusColor(connectionStatus.aws)}`}>
                    {getConnectionStatusText(connectionStatus.aws)}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => testConnection('aws')}
                  disabled={connectionStatus.aws === 'testing'}
                >
                  {connectionStatus.aws === 'testing' ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Wifi className="h-4 w-4 mr-2" />
                  )}
                  Test Connection
                </Button>
              </div>
              
              {/* Configuration Guidance */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium text-blue-900">Configuration Guide:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Create IAM user with programmatic access</li>
                  <li>• Attach necessary policies (ReadOnlyAccess, CloudFormationReadOnlyAccess)</li>
                  <li>• Generate Access Key ID and Secret Access Key</li>
                  <li>• Ensure MFA is not required for programmatic access</li>
                </ul>
                <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                  View detailed setup guide →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Azure Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AzureIcon size={20} />
                Microsoft Azure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="azure-tenant-id">Tenant ID</Label>
                  <Input 
                    id="azure-tenant-id"
                    value={settings.azure.tenantId}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, azure: {...prev.azure, tenantId: e.target.value}}))
                    }
                    placeholder="Enter Azure Tenant ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="azure-subscription-id">Subscription ID</Label>
                  <Input 
                    id="azure-subscription-id"
                    value={settings.azure.subscriptionId}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, azure: {...prev.azure, subscriptionId: e.target.value}}))
                    }
                    placeholder="Enter Azure Subscription ID"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="azure-client-id">Client ID</Label>
                  <Input 
                    id="azure-client-id"
                    type="password"
                    value={settings.azure.accessKey}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, azure: {...prev.azure, accessKey: e.target.value}}))
                    }
                    placeholder="Enter Azure Client ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="azure-client-secret">Client Secret</Label>
                  <Input 
                    id="azure-client-secret"
                    type="password"
                    value={settings.azure.secretKey}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, azure: {...prev.azure, secretKey: e.target.value}}))
                    }
                    placeholder="Enter Azure Client Secret"
                  />
                </div>
              </div>
              
              {/* Connection Test */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Wifi className={`h-4 w-4 ${getConnectionStatusColor(connectionStatus.azure)}`} />
                  <span className={`text-sm ${getConnectionStatusColor(connectionStatus.azure)}`}>
                    {getConnectionStatusText(connectionStatus.azure)}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => testConnection('azure')}
                  disabled={connectionStatus.azure === 'testing'}
                >
                  {connectionStatus.azure === 'testing' ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Wifi className="h-4 w-4 mr-2" />
                  )}
                  Test Connection
                </Button>
              </div>
              
              {/* Configuration Guidance */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium text-blue-900">Configuration Guide:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Register application in Azure Active Directory</li>
                  <li>• Assign appropriate roles (Reader, Contributor as needed)</li>
                  <li>• Generate client secret with appropriate expiration</li>
                  <li>• Note down Tenant ID and Subscription ID</li>
                </ul>
                <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                  View detailed setup guide →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Google Cloud Platform Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GCPIcon size={20} />
                Google Cloud Platform
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gcp-project-id">Project ID</Label>
                  <Input 
                    id="gcp-project-id"
                    value={settings.gcp.projectId}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, gcp: {...prev.gcp, projectId: e.target.value}}))
                    }
                    placeholder="Enter GCP Project ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gcp-region">Default Region</Label>
                  <Input 
                    id="gcp-region"
                    value={settings.gcp.region}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, gcp: {...prev.gcp, region: e.target.value}}))
                    }
                    placeholder="us-central1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gcp-service-account">Service Account Key</Label>
                <Input 
                  id="gcp-service-account"
                  type="password"
                  value={settings.gcp.accessKey}
                  onChange={(e) => 
                    setSettings(prev => ({...prev, gcp: {...prev.gcp, accessKey: e.target.value}}))
                  }
                  placeholder="Enter Service Account JSON Key"
                />
              </div>
              
              {/* Connection Test */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Wifi className={`h-4 w-4 ${getConnectionStatusColor(connectionStatus.gcp)}`} />
                  <span className={`text-sm ${getConnectionStatusColor(connectionStatus.gcp)}`}>
                    {getConnectionStatusText(connectionStatus.gcp)}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => testConnection('gcp')}
                  disabled={connectionStatus.gcp === 'testing'}
                >
                  {connectionStatus.gcp === 'testing' ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Wifi className="h-4 w-4 mr-2" />
                  )}
                  Test Connection
                </Button>
              </div>
              
              {/* Configuration Guidance */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium text-blue-900">Configuration Guide:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Create service account in IAM & Admin</li>
                  <li>• Assign necessary roles (Viewer, Security Reviewer)</li>
                  <li>• Generate and download JSON key file</li>
                  <li>• Enable required APIs (Cloud Resource Manager, Compute Engine)</li>
                </ul>
                <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                  View detailed setup guide →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Microsoft 365 Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MicrosoftIcon size={20} />
                Microsoft 365
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="m365-tenant-id">Tenant ID</Label>
                  <Input 
                    id="m365-tenant-id"
                    value={settings.microsoft365.tenantId}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, microsoft365: {...prev.microsoft365, tenantId: e.target.value}}))
                    }
                    placeholder="Enter Microsoft 365 Tenant ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="m365-client-id">Client ID</Label>
                  <Input 
                    id="m365-client-id"
                    value={settings.microsoft365.clientId}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, microsoft365: {...prev.microsoft365, clientId: e.target.value}}))
                    }
                    placeholder="Enter Application Client ID"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="m365-client-secret">Client Secret</Label>
                <Input 
                  id="m365-client-secret"
                  type="password"
                  value={settings.microsoft365.clientSecret}
                  onChange={(e) => 
                    setSettings(prev => ({...prev, microsoft365: {...prev.microsoft365, clientSecret: e.target.value}}))
                  }
                  placeholder="Enter Application Client Secret"
                />
              </div>
              
              {/* Connection Test */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Wifi className={`h-4 w-4 ${getConnectionStatusColor(connectionStatus.microsoft365)}`} />
                  <span className={`text-sm ${getConnectionStatusColor(connectionStatus.microsoft365)}`}>
                    {getConnectionStatusText(connectionStatus.microsoft365)}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => testConnection('microsoft365')}
                  disabled={connectionStatus.microsoft365 === 'testing'}
                >
                  {connectionStatus.microsoft365 === 'testing' ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Wifi className="h-4 w-4 mr-2" />
                  )}
                  Test Connection
                </Button>
              </div>
              
              {/* Configuration Guidance */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium text-blue-900">Configuration Guide:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Register application in Azure Active Directory</li>
                  <li>• Grant Microsoft Graph API permissions</li>
                  <li>• Generate client secret for application</li>
                  <li>• Admin consent required for organization-wide access</li>
                </ul>
                <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                  View detailed setup guide →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Google Workspace Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GoogleIcon size={20} />
                Google Workspace
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gws-customer-id">Customer ID</Label>
                  <Input 
                    id="gws-customer-id"
                    value={settings.googleWorkspace.customerId}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, googleWorkspace: {...prev.googleWorkspace, customerId: e.target.value}}))
                    }
                    placeholder="Enter Google Workspace Customer ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gws-admin-email">Admin Email</Label>
                  <Input 
                    id="gws-admin-email"
                    type="email"
                    value={settings.googleWorkspace.adminEmail}
                    onChange={(e) => 
                      setSettings(prev => ({...prev, googleWorkspace: {...prev.googleWorkspace, adminEmail: e.target.value}}))
                    }
                    placeholder="admin@yourcompany.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gws-service-account">Service Account Key</Label>
                <Input 
                  id="gws-service-account"
                  type="password"
                  value={settings.googleWorkspace.serviceAccountKey}
                  onChange={(e) => 
                    setSettings(prev => ({...prev, googleWorkspace: {...prev.googleWorkspace, serviceAccountKey: e.target.value}}))
                  }
                  placeholder="Enter Service Account JSON Key"
                />
              </div>
              
              {/* Connection Test */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Wifi className={`h-4 w-4 ${getConnectionStatusColor(connectionStatus.googleWorkspace)}`} />
                  <span className={`text-sm ${getConnectionStatusColor(connectionStatus.googleWorkspace)}`}>
                    {getConnectionStatusText(connectionStatus.googleWorkspace)}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => testConnection('googleWorkspace')}
                  disabled={connectionStatus.googleWorkspace === 'testing'}
                >
                  {connectionStatus.googleWorkspace === 'testing' ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Wifi className="h-4 w-4 mr-2" />
                  )}
                  Test Connection
                </Button>
              </div>
              
              {/* Configuration Guidance */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium text-blue-900">Configuration Guide:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Create service account in Google Cloud Console</li>
                  <li>• Enable Admin SDK API and Directory API</li>
                  <li>• Enable domain-wide delegation for service account</li>
                  <li>• Configure OAuth scopes in Google Workspace Admin</li>
                </ul>
                <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                  View detailed setup guide →
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev, 
                      notifications: {...prev.notifications, email: checked}
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show notifications on desktop
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.desktop}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev, 
                      notifications: {...prev.notifications, desktop: checked}
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Slack Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to Slack
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.slack}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev, 
                      notifications: {...prev.notifications, slack: checked}
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div 
                  className={`cursor-pointer rounded-lg border-2 p-4 text-center ${
                    settings.theme === 'light' ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => setSettings(prev => ({...prev, theme: 'light'}))}
                >
                  <Sun className="mx-auto h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Light</span>
                </div>
                <div 
                  className={`cursor-pointer rounded-lg border-2 p-4 text-center ${
                    settings.theme === 'dark' ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => setSettings(prev => ({...prev, theme: 'dark'}))}
                >
                  <Moon className="mx-auto h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Dark</span>
                </div>
                <div 
                  className={`cursor-pointer rounded-lg border-2 p-4 text-center ${
                    settings.theme === 'system' ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => setSettings(prev => ({...prev, theme: 'system'}))}
                >
                  <Monitor className="mx-auto h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">System</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input 
                  id="language"
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({...prev, language: e.target.value}))}
                  placeholder="English"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Security settings will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
