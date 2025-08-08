'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Settings,
  Archive,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Calendar,
  FileText,
  Crown,
  Shield,
  Clock,
  Mail
} from 'lucide-react';

import { Team } from '@/types';

interface TeamsManagementProps {
  teams: Team[];
  loading?: boolean;
}

export function TeamsManagement({ teams, loading = false }: TeamsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrivacy, setSelectedPrivacy] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('teams');

  // Calculate team metrics
  const totalTeams = teams.length;
  const activeTeams = teams.filter(t => !t.archived).length;
  const archivedTeams = teams.filter(t => t.archived).length;
  const privateTeams = teams.filter(t => t.privacy === 'private').length;
  const publicTeams = teams.filter(t => t.privacy === 'public').length;
  const totalMembers = teams.reduce((sum, t) => sum + t.memberCount, 0);
  const totalGuests = teams.reduce((sum, t) => sum + (t.guestCount || 0), 0);

  // Filter teams
  const filteredTeams = teams.filter(team => {
    const matchesSearch = searchTerm === '' || 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (team.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.ownerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrivacy = selectedPrivacy === 'all' || team.privacy === selectedPrivacy;
    
    let matchesStatus = true;
    if (selectedStatus === 'active') matchesStatus = !team.archived;
    else if (selectedStatus === 'archived') matchesStatus = team.archived;
    
    return matchesSearch && matchesPrivacy && matchesStatus;
  });

  const getTeamActivityStatus = (lastActivity: Date) => {
    const daysSinceActivity = Math.floor((new Date().getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceActivity <= 7) return { status: 'active', color: 'text-green-600', text: 'Active' };
    if (daysSinceActivity <= 30) return { status: 'moderate', color: 'text-yellow-600', text: 'Moderate' };
    return { status: 'inactive', color: 'text-red-600', text: 'Inactive' };
  };

  const getPrivacyIcon = (privacy: string) => {
    return privacy === 'private' ? 
      <Shield className="h-4 w-4 text-orange-600" /> : 
      <Users className="h-4 w-4 text-blue-600" />;
  };

  const getPrivacyColor = (privacy: string) => {
    return privacy === 'private' ? 
      'bg-orange-50 text-orange-700 border-orange-200' : 
      'bg-blue-50 text-blue-700 border-blue-200';
  };

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
      {/* Teams Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Teams</p>
                <p className="text-2xl font-bold">{totalTeams}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeTeams} active, {archivedTeams} archived
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{totalMembers.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalGuests} guests included
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-orange-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Private Teams</p>
                <p className="text-2xl font-bold">{privateTeams}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {publicTeams} public teams
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-purple-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Avg. Activity</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Teams with recent activity
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="teams">Team Management</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="premium">Teams Premium</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teams" className="space-y-4">
          {/* Filters and Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Team Management
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Bulk Archive
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Team
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedPrivacy} onValueChange={setSelectedPrivacy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Privacy</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="w-full">
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Teams List */}
          <Card>
            <CardHeader>
              <CardTitle>Teams ({filteredTeams.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTeams.map((team) => {
                  const activityStatus = getTeamActivityStatus(team.lastActivity || new Date());
                  return (
                    <div key={team.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getPrivacyIcon(team.privacy)}
                            <span className="font-semibold text-lg">{team.name}</span>
                            <Badge className={getPrivacyColor(team.privacy)}>
                              {team.privacy.toUpperCase()}
                            </Badge>
                            {team.archived && (
                              <Badge variant="secondary">ARCHIVED</Badge>
                            )}
                            <Badge className={`${activityStatus.color}`} variant="outline">
                              {activityStatus.text}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {team.description}
                          </p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{team.memberCount} members</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Crown className="h-3 w-3" />
                              <span>1 owner</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{team.guestCount || 0} guests</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{team.channels} channels</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{team.lastActivity?.toLocaleDateString() || 'Never'}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-xs text-muted-foreground">
                            <span className="font-medium">Owner:</span> {team.ownerId} | 
                            <span className="font-medium"> Created:</span> {team.createdDate.toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Settings
                          </Button>
                          {!team.archived && (
                            <Button size="sm" variant="outline">
                              <Archive className="h-4 w-4 mr-1" />
                              Archive
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {filteredTeams.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Teams Found</h3>
                    <p className="text-muted-foreground">
                      No teams match your current filters.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="governance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Governance Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Naming Conventions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Enforce consistent naming patterns for teams
                    </p>
                    <Button size="sm" variant="outline">Configure Rules</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Guest Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Control external user access and permissions
                    </p>
                    <Button size="sm" variant="outline">Manage Access</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Retention Policies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Set data retention and deletion policies
                    </p>
                    <Button size="sm" variant="outline">Set Policies</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Classification Labels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Apply sensitivity and classification labels
                    </p>
                    <Button size="sm" variant="outline">Configure Labels</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teams Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold">2.4M</p>
                      <p className="text-sm text-muted-foreground">Messages Sent</p>
                      <p className="text-xs text-green-600">+15% from last month</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold">1,247</p>
                      <p className="text-sm text-muted-foreground">Meetings Held</p>
                      <p className="text-xs text-blue-600">+8% from last month</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold">3,892</p>
                      <p className="text-sm text-muted-foreground">Files Shared</p>
                      <p className="text-xs text-purple-600">+22% from last month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Detailed analytics charts would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="premium" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                Microsoft Teams Premium Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">124</p>
                      <p className="text-sm text-muted-foreground">Premium Licenses</p>
                      <p className="text-xs text-green-600">87% utilization</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">892</p>
                      <p className="text-sm text-muted-foreground">AI Recaps Generated</p>
                      <p className="text-xs text-purple-600">This month</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">156</p>
                      <p className="text-sm text-muted-foreground">Advanced Webinars</p>
                      <p className="text-xs text-orange-600">+23% vs last month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Premium Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">AI-Generated Meeting Recaps</p>
                        <p className="text-sm text-muted-foreground">Intelligent meeting summaries</p>
                      </div>
                      <Badge className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Custom Branded Meetings</p>
                        <p className="text-sm text-muted-foreground">Corporate branding for meetings</p>
                      </div>
                      <Badge className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Advanced Webinars</p>
                        <p className="text-sm text-muted-foreground">Up to 1000 attendees</p>
                      </div>
                      <Badge className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Virtual Appointments</p>
                        <p className="text-sm text-muted-foreground">Bookings and scheduling</p>
                      </div>
                      <Badge className="bg-yellow-50 text-yellow-700">Limited</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Premium Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">AI Recap Usage</span>
                        <span className="text-sm font-semibold">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Custom Backgrounds</span>
                        <span className="text-sm font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Webinar Features</span>
                        <span className="text-sm font-semibold">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Cost Optimization</p>
                      <p className="text-xs text-blue-600">16 unused Premium licenses detected</p>
                      <p className="text-xs text-blue-600">Potential savings: $432/month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Premium Governance & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Meeting Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Standardized meeting formats with custom branding
                    </p>
                    <Button size="sm" variant="outline">Manage Templates</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Compliance Recording</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Automatic compliance recording for regulated industries
                    </p>
                    <Button size="sm" variant="outline">Configure Policies</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Advanced Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Enhanced security controls and monitoring
                    </p>
                    <Button size="sm" variant="outline">Security Settings</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
