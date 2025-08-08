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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Users, 
  Shield, 
  Edit,
  Trash2,
  UserPlus,
  Key,
  Activity,
  Clock,
  Download,
  Upload,
  Settings,
  Eye,
  Ban,
  CheckCircle
} from 'lucide-react';

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin',
    department: 'IT',
    status: 'active',
    lastLogin: '2 hours ago',
    created: '2023-01-15',
    permissions: ['read', 'write', 'admin']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'Manager',
    department: 'HR',
    status: 'active',
    lastLogin: '1 day ago',
    created: '2023-02-20',
    permissions: ['read', 'write']
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.j@company.com',
    role: 'User',
    department: 'Sales',
    status: 'inactive',
    lastLogin: '2 weeks ago',
    created: '2023-03-10',
    permissions: ['read']
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.w@company.com',
    role: 'Manager',
    department: 'Marketing',
    status: 'active',
    lastLogin: '30 minutes ago',
    created: '2023-01-25',
    permissions: ['read', 'write']
  }
];

const mockRoles = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access with all permissions',
    users: 2,
    permissions: ['read', 'write', 'admin', 'user-management', 'system-config']
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Department-level access with write permissions',
    users: 3,
    permissions: ['read', 'write', 'team-management']
  },
  {
    id: '3',
    name: 'User',
    description: 'Basic read-only access to assigned resources',
    users: 15,
    permissions: ['read']
  },
  {
    id: '4',
    name: 'Auditor',
    description: 'Read-only access for compliance and auditing',
    users: 1,
    permissions: ['read', 'audit-logs']
  }
];

const mockAuditLogs = [
  {
    id: '1',
    user: 'John Doe',
    action: 'User Created',
    target: 'sarah.w@company.com',
    timestamp: '2024-08-08 14:30:25',
    ip: '192.168.1.100',
    status: 'success'
  },
  {
    id: '2',
    user: 'Jane Smith',
    action: 'Role Modified',
    target: 'mike.j@company.com',
    timestamp: '2024-08-08 13:15:42',
    ip: '192.168.1.102',
    status: 'success'
  },
  {
    id: '3',
    user: 'System',
    action: 'Failed Login',
    target: 'unknown@company.com',
    timestamp: '2024-08-08 12:45:18',
    ip: '203.0.113.15',
    status: 'failed'
  }
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('users');
  const [showCreateUser, setShowCreateUser] = useState(false);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;
  const admins = mockUsers.filter(u => u.role === 'Admin').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage users, roles, and permissions</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="Enter email address" type="email" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option value="it">IT</option>
                      <option value="hr">HR</option>
                      <option value="sales">Sales</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateUser(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowCreateUser(false)}>
                    Create User
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalUsers}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{activeUsers}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{admins}</p>
                <p className="text-xs text-muted-foreground">Administrators</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-xs text-muted-foreground">Actions Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Directory
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'destructive' : user.role === 'Manager' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Roles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRoles.map((role) => (
                    <div key={role.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{role.name}</h3>
                        <Badge variant="outline">{role.users} users</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Key className="h-3 w-3 mr-1" />
                          Permissions
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Permission Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2 text-xs font-medium">
                    <div>Permission</div>
                    <div className="text-center">Admin</div>
                    <div className="text-center">Manager</div>
                    <div className="text-center">User</div>
                    <div className="text-center">Auditor</div>
                  </div>
                  
                  {['Read', 'Write', 'Admin', 'User Mgmt', 'System Config'].map((permission) => (
                    <div key={permission} className="grid grid-cols-5 gap-2 text-sm py-2 border-b">
                      <div>{permission}</div>
                      <div className="text-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                      </div>
                      <div className="text-center">
                        {permission === 'Read' || permission === 'Write' ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <div className="h-4 w-4 bg-gray-200 rounded mx-auto"></div>
                        )}
                      </div>
                      <div className="text-center">
                        {permission === 'Read' ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <div className="h-4 w-4 bg-gray-200 rounded mx-auto"></div>
                        )}
                      </div>
                      <div className="text-center">
                        {permission === 'Read' ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <div className="h-4 w-4 bg-gray-200 rounded mx-auto"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                User Activity Audit Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAuditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="text-muted-foreground">{log.target}</TableCell>
                      <TableCell className="text-sm">{log.timestamp}</TableCell>
                      <TableCell className="text-sm font-mono">{log.ip}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                          {log.status}
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
