'use client';

import React, { useState, useMemo } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Server,
  Database,
  HardDrive,
  Cpu,
  Globe,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Resource } from '@/types';
import { cn } from '@/lib/utils';

interface ResourceInventoryProps {
  resources: Resource[];
  loading?: boolean;
}

const platformIcons = {
  aws: '🟠',
  azure: '🔵', 
  gcp: '🟡',
  'm365': '🟣'
};

const resourceTypeIcons = {
  'EC2 Instance': Cpu,
  'Virtual Machine': Server,
  'Storage': HardDrive,
  'Database': Database,
  'Load Balancer': Globe,
  'default': Server
};

const statusConfig = {
  running: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', text: 'Running' },
  stopped: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', text: 'Stopped' },
  pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'Pending' },
  error: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', text: 'Error' }
};

export function ResourceInventory({ resources, loading = false }: ResourceInventoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Get unique values for filters
  const platforms = useMemo(() => 
    Array.from(new Set(resources.map(r => r.platform))), 
    [resources]
  );
  const types = useMemo(() => 
    Array.from(new Set(resources.map(r => r.type))), 
    [resources]
  );
  const statuses = useMemo(() => 
    Array.from(new Set(resources.map(r => r.status))), 
    [resources]
  );

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = searchQuery === '' || 
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.region?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPlatform = platformFilter === 'all' || resource.platform === platformFilter;
      const matchesStatus = statusFilter === 'all' || resource.status === statusFilter;
      const matchesType = typeFilter === 'all' || resource.type === typeFilter;

      return matchesSearch && matchesPlatform && matchesStatus && matchesType;
    });
  }, [resources, searchQuery, platformFilter, statusFilter, typeFilter]);

  const getStatusIcon = (status: keyof typeof statusConfig) => {
    const config = statusConfig[status] || statusConfig.error;
    const Icon = config.icon;
    return <Icon className={cn('h-4 w-4', config.color)} />;
  };

  const getResourceTypeIcon = (type: string) => {
    const Icon = resourceTypeIcons[type as keyof typeof resourceTypeIcons] || resourceTypeIcons.default;
    return <Icon className="h-4 w-4 text-muted-foreground" />;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resource Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Inventory</h1>
          <p className="text-muted-foreground">
            Manage and monitor your multi-cloud resources
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Resource
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources by name, ID, or region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Platform Filter */}
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platforms.map(platform => (
                  <SelectItem key={platform} value={platform}>
                    <span className="flex items-center gap-2">
                      <span>{platformIcons[platform as keyof typeof platformIcons]}</span>
                      {platform.toUpperCase()}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    <span className="flex items-center gap-2">
                      {getStatusIcon(status as keyof typeof statusConfig)}
                      {statusConfig[status as keyof typeof statusConfig]?.text || status}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filter Button */}
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredResources.length} of {resources.length} resources
          </div>
        </CardContent>
      </Card>

      {/* Resource Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getResourceTypeIcon(resource.type)}
                      <div>
                        <div className="font-medium">{resource.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {resource.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{platformIcons[resource.platform as keyof typeof platformIcons]}</span>
                      <span className="font-medium">
                        {resource.platform.toUpperCase()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{resource.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(resource.status as keyof typeof statusConfig)}
                      <span className="capitalize">{resource.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{resource.region || 'N/A'}</TableCell>
                  <TableCell>
                    {resource.tags && Object.keys(resource.tags).length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(resource.tags).slice(0, 2).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key}: {value}
                          </Badge>
                        ))}
                        {Object.keys(resource.tags).length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{Object.keys(resource.tags).length - 2}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
