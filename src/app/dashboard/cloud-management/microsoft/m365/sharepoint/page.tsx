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
  FolderOpen, 
  Users, 
  Shield,
  Settings,
  BarChart3,
  FileText,
  Share2,
  ExternalLink
} from 'lucide-react';
import { M365Icon } from '@/components/icons/platform-icons';

const mockSharePointSites = [
  {
    id: '1',
    title: 'HR Portal',
    url: 'https://company.sharepoint.com/sites/hr',
    template: 'Team Site',
    storageUsed: '2.1 GB',
    storageQuota: '25 GB',
    members: 45,
    lastActivity: '2 hours ago',
    isActive: true
  },
  {
    id: '2',
    title: 'Project Alpha',
    url: 'https://company.sharepoint.com/sites/project-alpha',
    template: 'Project Site',
    storageUsed: '856 MB',
    storageQuota: '10 GB',
    members: 12,
    lastActivity: '30 minutes ago',
    isActive: true
  },
  {
    id: '3',
    title: 'Finance Hub',
    url: 'https://company.sharepoint.com/sites/finance',
    template: 'Communication Site',
    storageUsed: '3.7 GB',
    storageQuota: '50 GB',
    members: 28,
    lastActivity: '1 day ago',
    isActive: true
  },
  {
    id: '4',
    title: 'Marketing Assets',
    url: 'https://company.sharepoint.com/sites/marketing',
    template: 'Team Site',
    storageUsed: '15.2 GB',
    storageQuota: '100 GB',
    members: 35,
    lastActivity: '4 hours ago',
    isActive: false
  }
];

export default function SharePointPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredSites = mockSharePointSites.filter(site =>
    site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSites = mockSharePointSites.length;
  const activeSites = mockSharePointSites.filter(site => site.isActive).length;
  const totalStorage = mockSharePointSites.reduce((sum, site) => {
    const used = parseFloat(site.storageUsed.replace(/[^\d.]/g, ''));
    return sum + used;
  }, 0);
  const totalQuota = mockSharePointSites.reduce((sum, site) => {
    const quota = parseFloat(site.storageQuota.replace(/[^\d.]/g, ''));
    return sum + quota;
  }, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <M365Icon size="md" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">SharePoint Management</h1>
            <p className="text-muted-foreground">Manage SharePoint sites, libraries, and permissions</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Site
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalSites}</p>
                <p className="text-xs text-muted-foreground">Total Sites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{activeSites}</p>
                <p className="text-xs text-muted-foreground">Active Sites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-orange-600" />
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
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockSharePointSites.reduce((sum, site) => sum + site.members, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sites Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              SharePoint Sites
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{site.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        {site.url}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{site.template}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {site.storageUsed} / {site.storageQuota}
                      </div>
                      <div className="w-16 bg-muted rounded-full h-1">
                        <div 
                          className="bg-blue-500 h-1 rounded-full" 
                          style={{ 
                            width: `${(parseFloat(site.storageUsed) / parseFloat(site.storageQuota)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {site.members}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {site.lastActivity}
                  </TableCell>
                  <TableCell>
                    <Badge variant={site.isActive ? 'default' : 'secondary'}>
                      {site.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
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
  );
}
