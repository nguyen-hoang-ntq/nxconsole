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
  Mail, 
  Users, 
  Shield,
  Settings,
  BarChart3,
  Inbox,
  Archive,
  AlertTriangle
} from 'lucide-react';
import { M365Icon } from '@/components/icons/platform-icons';

const mockMailboxes = [
  {
    id: '1',
    email: 'john.doe@company.com',
    displayName: 'John Doe',
    department: 'IT',
    mailboxSize: '2.3 GB',
    quota: '50 GB',
    itemCount: 8532,
    lastLogin: '2 hours ago',
    status: 'active',
    hasArchive: true
  },
  {
    id: '2',
    email: 'jane.smith@company.com',
    displayName: 'Jane Smith',
    department: 'HR',
    mailboxSize: '1.8 GB',
    quota: '50 GB',
    itemCount: 6421,
    lastLogin: '30 minutes ago',
    status: 'active',
    hasArchive: true
  },
  {
    id: '3',
    email: 'marketing@company.com',
    displayName: 'Marketing Team',
    department: 'Marketing',
    mailboxSize: '12.4 GB',
    quota: '100 GB',
    itemCount: 25847,
    lastLogin: '1 hour ago',
    status: 'active',
    hasArchive: false
  },
  {
    id: '4',
    email: 'former.employee@company.com',
    displayName: 'Former Employee',
    department: 'Sales',
    mailboxSize: '890 MB',
    quota: '50 GB',
    itemCount: 2156,
    lastLogin: '30 days ago',
    status: 'disabled',
    hasArchive: true
  }
];

const mockDistributionGroups = [
  { id: '1', name: 'All Company', email: 'all@company.com', members: 247 },
  { id: '2', name: 'IT Team', email: 'it@company.com', members: 12 },
  { id: '3', name: 'HR Team', email: 'hr@company.com', members: 8 },
  { id: '4', name: 'Marketing', email: 'marketing-list@company.com', members: 15 }
];

export default function ExchangePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredMailboxes = mockMailboxes.filter(mailbox =>
    mailbox.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mailbox.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mailbox.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMailboxes = mockMailboxes.length;
  const activeMailboxes = mockMailboxes.filter(m => m.status === 'active').length;
  const totalStorage = mockMailboxes.reduce((sum, mailbox) => {
    const size = parseFloat(mailbox.mailboxSize.replace(/[^\d.]/g, ''));
    return sum + size;
  }, 0);
  const totalItems = mockMailboxes.reduce((sum, mailbox) => sum + mailbox.itemCount, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Exchange Management</h1>
            <p className="text-muted-foreground">Manage mailboxes, distribution groups, and email policies</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Policies
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Mailbox
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Inbox className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalMailboxes}</p>
                <p className="text-xs text-muted-foreground">Total Mailboxes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{activeMailboxes}</p>
                <p className="text-xs text-muted-foreground">Active Mailboxes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Archive className="h-8 w-8 text-orange-600" />
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
              <Mail className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{totalItems.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mailboxes Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="h-5 w-5" />
                  Mailboxes
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search mailboxes..."
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
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMailboxes.map((mailbox) => (
                    <TableRow key={mailbox.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{mailbox.displayName}</div>
                          <div className="text-sm text-muted-foreground">{mailbox.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{mailbox.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {mailbox.mailboxSize} / {mailbox.quota}
                          </div>
                          <div className="w-16 bg-muted rounded-full h-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full" 
                              style={{ 
                                width: `${(parseFloat(mailbox.mailboxSize) / parseFloat(mailbox.quota)) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {mailbox.itemCount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={mailbox.status === 'active' ? 'default' : 'secondary'}>
                          {mailbox.status}
                        </Badge>
                        {mailbox.hasArchive && (
                          <Badge variant="outline" className="ml-1">
                            <Archive className="h-3 w-3 mr-1" />
                            Archive
                          </Badge>
                        )}
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

        {/* Distribution Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Distribution Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDistributionGroups.map((group) => (
                <div key={group.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{group.name}</div>
                    <div className="text-sm text-muted-foreground">{group.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{group.members}</div>
                    <div className="text-xs text-muted-foreground">members</div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Group
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
