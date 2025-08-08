'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Settings, 
  Shield, 
  Key,
  Bell,
  Upload,
  Save,
  Edit,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Building,
  Clock,
  Activity
} from 'lucide-react';

const mockUserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@company.com',
  avatar: '/avatars/john-doe.jpg',
  title: 'Senior Cloud Architect',
  department: 'Information Technology',
  location: 'New York, NY',
  phone: '+1 (555) 123-4567',
  bio: 'Experienced cloud architect with 8+ years in enterprise infrastructure. Specializing in multi-cloud deployments and cost optimization.',
  joinDate: '2023-01-15',
  lastActive: '2024-08-08 14:30:25',
  role: 'Admin',
  permissions: ['read', 'write', 'admin', 'user-management'],
  recentActivity: [
    { action: 'Logged in', timestamp: '2024-08-08 14:30:25' },
    { action: 'Updated AWS configuration', timestamp: '2024-08-08 13:45:12' },
    { action: 'Created user: jane.smith@company.com', timestamp: '2024-08-08 10:22:33' },
    { action: 'Generated cost report', timestamp: '2024-08-07 16:15:44' }
  ]
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState(mockUserProfile);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    title: profile.title,
    department: profile.department,
    location: profile.location,
    phone: profile.phone,
    bio: profile.bio,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      ...formData
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      title: profile.title,
      department: profile.department,
      location: profile.location,
      phone: profile.phone,
      bio: profile.bio,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-lg">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.title}</p>
                <Badge variant="outline" className="mt-2">{profile.role}</Badge>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Last active: {new Date(profile.lastActive).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData(prev => ({...prev, department: e.target.value}))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Password Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={(e) => setFormData(prev => ({...prev, currentPassword: e.target.value}))}
                        disabled={!isEditing}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData(prev => ({...prev, newPassword: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({...prev, confirmPassword: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Use an app to generate verification codes</p>
                    </div>
                    <Badge variant="outline" className="text-green-600">Enabled</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Permissions Tab */}
            <TabsContent value="permissions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Role & Permissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Current Role</p>
                      <p className="text-sm text-muted-foreground">Your current system role</p>
                    </div>
                    <Badge variant="destructive">{profile.role}</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Permissions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {profile.permissions.map((permission) => (
                        <div key={permission} className="flex items-center gap-2 p-2 border rounded">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-sm capitalize">{permission.replace('-', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
