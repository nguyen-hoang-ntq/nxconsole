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
import { 
  Search, 
  Plus, 
  Cloud, 
  Users, 
  Shield,
    TrendingUp, 
    TrendingDown,
  Settings,
  BarChart3,
  FolderOpen,
  Download,
  Upload,
  Share2,
  AlertTriangle
} from 'lucide-react';
import { M365Icon } from '@/components/icons/platform-icons';

const mockOneDriveAccounts = [
  {
    id: '1',
    user: 'John Doe',
    email: 'john.doe@company.com',
    department: 'IT',
    storageUsed: '8.7 GB',
    storageQuota: '1 TB',
    fileCount: 2843,
    sharedFiles: 45,
    lastSync: '5 minutes ago',
    status: 'synced',
    externalSharing: true
  },
  {
    id: '2',
    user: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'HR',
    storageUsed: '3.2 GB',
    storageQuota: '1 TB',
    fileCount: 1267,
    sharedFiles: 23,
    lastSync: '1 hour ago',
    status: 'synced',
    externalSharing: false
  },
  {
    id: '3',
    user: 'Marketing Team',
    email: 'marketing@company.com',
    department: 'Marketing',
    storageUsed: '156.8 GB',
    storageQuota: '5 TB',
    fileCount: 8932,
    sharedFiles: 127,
    lastSync: '2 minutes ago',
    status: 'synced',
    externalSharing: true
  },
  {
    id: '4',
    user: 'Alex Johnson',
    email: 'alex.j@company.com',
    department: 'Sales',
    storageUsed: '445 MB',
    storageQuota: '1 TB',
    fileCount: 156,
    sharedFiles: 8,
    lastSync: '3 days ago',
    status: 'error',
    externalSharing: false
  }
];

const mockActivityData = [
  { type: 'upload', count: 234, trend: 'up' },
  { type: 'download', count: 567, trend: 'up' },
  { type: 'share', count: 89, trend: 'down' },
  { type: 'delete', count: 12, trend: 'down' }
];

export default function OneDrivePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredAccounts = mockOneDriveAccounts.filter(account =>
    account.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAccounts = mockOneDriveAccounts.length;
  const syncedAccounts = mockOneDriveAccounts.filter(a => a.status === 'synced').length;
  const totalStorage = mockOneDriveAccounts.reduce((sum, account) => {
    const size = parseFloat(account.storageUsed.replace(/[^\d.]/g, ''));
    const unit = account.storageUsed.includes('TB') ? 1024 : account.storageUsed.includes('MB') ? 0.001 : 1;
    return sum + (size * unit);
  }, 0);
  const totalFiles = mockOneDriveAccounts.reduce((sum, account) => sum + account.fileCount, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Cloud className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">OneDrive Management</h1>
            <p className="text-muted-foreground">Manage OneDrive storage, sharing, and policies</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Policies
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Provision
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalAccounts}</p>
                <p className="text-xs text-muted-foreground">OneDrive Accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{syncedAccounts}</p>
                <p className="text-xs text-muted-foreground">Synced Accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Cloud className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{totalStorage.toFixed(1)} GB</p>
                <p className="text-xs text-muted-foreground">Storage Used</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{totalFiles.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Files</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OneDrive Accounts Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  OneDrive Accounts
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search accounts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Storage</TableHead>
                    <TableHead>Files</TableHead>
                    <TableHead>Shared</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{account.user}</div>
                          <div className="text-sm text-muted-foreground">{account.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{account.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {account.storageUsed} / {account.storageQuota}
                          </div>
                          <div className="w-16 bg-muted rounded-full h-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full" 
                              style={{ 
                                width: `${Math.min((parseFloat(account.storageUsed) / (account.storageQuota.includes('TB') ? parseFloat(account.storageQuota) * 1024 : parseFloat(account.storageQuota))) * 100, 100)}%` 
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {account.fileCount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-4 w-4 text-muted-foreground" />
                          {account.sharedFiles}
                          {account.externalSharing && (
                            <Badge variant="outline" className="ml-1">External</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant={account.status === 'synced' ? 'default' : 'destructive'}>
                            {account.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {account.lastSync}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Activity Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Activity (Last 7 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivityData.map((activity, index) => {
                  const icons = {
                    upload: Upload,
                    download: Download,
                    share: Share2,
                    delete: AlertTriangle
                  };
                  const Icon = icons[activity.type as keyof typeof icons];
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium capitalize">{activity.type}s</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.trend === 'up' ? <TrendingUp className="inline w-4 h-4 text-green-600" /> : <TrendingDown className="inline w-4 h-4 text-red-600" />} 
                            {activity.trend === 'up' ? '+12%' : '-8%'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">{activity.count}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div className="text-sm">
                    <div className="font-medium">External sharing detected</div>
                    <div className="text-muted-foreground">3 files shared externally</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 border-l-4 border-red-400 rounded">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <div className="text-sm">
                    <div className="font-medium">Sync error</div>
                    <div className="text-muted-foreground">1 account needs attention</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
