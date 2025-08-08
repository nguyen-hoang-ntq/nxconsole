'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Zap, 
  TrendingDown, 
  DollarSign,
  Search,
  Filter,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Settings
} from 'lucide-react';
import { License } from '@/types';

interface LicenseDashboardProps {
  licenses: License[];
  loading?: boolean;
}

export function LicenseDashboard({ licenses, loading = false }: LicenseDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Calculate license metrics
  const totalLicenses = licenses.length;
  const assignedLicenses = licenses.filter(l => l.assigned).length;
  const unassignedLicenses = totalLicenses - assignedLicenses;
  const inactiveLicenses = licenses.filter(l => l.assigned && l.lastActivity !== undefined && 
    (new Date().getTime() - new Date(l.lastActivity).getTime()) > 30 * 24 * 60 * 60 * 1000
  ).length;
  
  // Calculate cost metrics
  const totalCost = licenses.reduce((sum, l) => sum + l.cost, 0);
  const assignedCost = licenses.filter(l => l.assigned).reduce((sum, l) => sum + l.cost, 0);
  const wastedCost = licenses.filter(l => !l.assigned || 
    (l.lastActivity !== undefined && (new Date().getTime() - new Date(l.lastActivity).getTime()) > 30 * 24 * 60 * 60 * 1000)
  ).reduce((sum, l) => sum + l.cost, 0);

  // License utilization percentage
  const utilizationRate = Math.round((assignedLicenses / totalLicenses) * 100);

  // Get unique license types
  const uniqueTypes = Array.from(new Set(licenses.map(l => l.type)));

  // Filter licenses
  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = searchTerm === '' || 
      license.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (license.user && license.user.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || license.type === selectedType;
    
    let matchesStatus = true;
    if (selectedStatus === 'assigned') matchesStatus = license.assigned;
    else if (selectedStatus === 'unassigned') matchesStatus = !license.assigned;
    else if (selectedStatus === 'inactive') {
      matchesStatus = license.assigned && license.lastActivity !== undefined && 
        (new Date().getTime() - new Date(license.lastActivity).getTime()) > 30 * 24 * 60 * 60 * 1000;
    }
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getLicenseStatusIcon = (license: License) => {
    if (!license.assigned) return <AlertCircle className="h-4 w-4 text-orange-600" />;
    if (license.lastActivity !== undefined && (new Date().getTime() - new Date(license.lastActivity).getTime()) > 30 * 24 * 60 * 60 * 1000) {
      return <Clock className="h-4 w-4 text-red-600" />;
    }
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  };

  const getLicenseStatusText = (license: License) => {
    if (!license.assigned) return 'Unassigned';
    if (license.lastActivity !== undefined && (new Date().getTime() - new Date(license.lastActivity).getTime()) > 30 * 24 * 60 * 60 * 1000) {
      return 'Inactive (30+ days)';
    }
    return 'Active';
  };

  const getLicenseStatusColor = (license: License) => {
    if (!license.assigned) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (license.lastActivity !== undefined && (new Date().getTime() - new Date(license.lastActivity).getTime()) > 30 * 24 * 60 * 60 * 1000) {
      return 'bg-red-50 text-red-700 border-red-200';
    }
    return 'bg-green-50 text-green-700 border-green-200';
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
      {/* License Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Licenses</p>
                <p className="text-2xl font-bold">{totalLicenses}</p>
              </div>
            </div>
            <Progress value={utilizationRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{utilizationRate}% utilization</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Assigned</p>
                <p className="text-2xl font-bold text-green-600">{assignedLicenses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Unassigned</p>
                <p className="text-2xl font-bold text-orange-600">{unassignedLicenses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-red-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold text-red-600">{inactiveLicenses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Analysis Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Total Monthly Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalCost.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">All licenses combined</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-orange-600" />
              Potential Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">${wastedCost.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">From unused licenses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Active Spend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">${assignedCost.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Currently utilized</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              License Management
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Bulk Actions
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search licenses or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="License Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="w-full">
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* License List */}
      <Card>
        <CardHeader>
          <CardTitle>License Details ({filteredLicenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLicenses.map((license) => (
              <div key={license.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getLicenseStatusIcon(license)}
                      <span className="font-semibold">{license.type}</span>
                      <Badge className={getLicenseStatusColor(license)}>
                        {getLicenseStatusText(license)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Assigned to:</span><br />
                        <span>{license.user || 'Unassigned'}</span>
                      </div>
                      <div>
                        <span className="font-medium">Last Activity:</span><br />
                        <span>
                          {license.lastActivity 
                            ? new Date(license.lastActivity).toLocaleDateString()
                            : 'Never'
                          }
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Monthly Cost:</span><br />
                        <span className="font-semibold">${license.cost}</span>
                      </div>
                      <div>
                        <span className="font-medium">License ID:</span><br />
                        <span className="font-mono text-xs">{license.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    {license.assigned ? (
                      <Button size="sm" variant="destructive">
                        Revoke
                      </Button>
                    ) : (
                      <Button size="sm">
                        Assign
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredLicenses.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Licenses Found</h3>
                <p className="text-muted-foreground">
                  No licenses match your current filters.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
