// Core Types for NxConsole Prototype

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  department?: string;
  lastLogin?: Date;
}

export interface CloudAccount {
  id: string;
  name: string;
  platform: 'aws' | 'azure' | 'm365';
  status: 'active' | 'inactive' | 'error';
  region?: string;
  accountId?: string;
  tenantId?: string;
}

export interface ServiceCost {
  serviceType: string;
  amount: number;
  currency: string;
  percentage: number;
}

export interface CostData {
  period: string;
  total: number;
  currency: string;
  breakdown: {
    platform: string;
    amount: number;
    services: ServiceCost[];
  }[];
  previousPeriod?: {
    total: number;
    changePercent: number;
  };
}

export interface CostDataItem {
  id: string;
  date: string;
  provider: string;
  service: string;
  cost: number;
  currency: string;
  region?: string;
  resourceId?: string;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  currency: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  threshold: number; // Alert threshold percentage
  status: 'on-track' | 'warning' | 'over-budget';
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  platform: 'aws' | 'azure' | 'm365';
  region?: string;
  status: 'running' | 'stopped' | 'error' | 'pending';
  tags: Record<string, string>;
  metadata: Record<string, string | number | boolean>;
  cost?: {
    monthly: number;
    currency: string;
  };
  createdDate: Date;
  lastModified: Date;
}

export interface SecurityFinding {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  platform: string;
  resource: string;
  resourceType: string;
  description: string;
  remediation: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  discoveredDate: Date;
  category: 'misconfiguration' | 'vulnerability' | 'policy-violation' | 'access-control';
}

export interface AuditEvent {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  resource: string;
  resourceType: string;
  platform: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'success' | 'failed' | 'warning';
  description: string;
  ipAddress: string;
  userAgent?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface ComplianceCheck {
  id: string;
  name: string;
  standard: string; // e.g., 'ISO27001', 'SOC2', 'GDPR'
  status: 'compliant' | 'non-compliant' | 'warning';
  lastChecked: Date;
  description: string;
}

export interface License {
  id: string;
  type: string;
  sku: string;
  assigned: boolean;
  user?: string;
  lastActivity?: Date;
  cost: number;
  currency: string;
  status: 'active' | 'inactive' | 'expired';
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  privacy: 'public' | 'private';
  memberCount: number;
  ownerId: string;
  createdDate: Date;
  lastActivity?: Date;
  archived: boolean;
  template?: string;
  channels: number;
  guestCount?: number;
  apps: string[];
  tags?: string[];
}

export interface M365Service {
  id: string;
  name: string;
  type: 'teams' | 'sharepoint' | 'exchange' | 'onedrive';
  status: 'active' | 'inactive';
  users: number;
  storage?: {
    used: number;
    total: number;
    unit: 'GB' | 'TB';
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'cost' | 'security' | 'performance' | 'system' | 'compliance';
  severity: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
  link?: string;
}

export interface AIInsight {
  id: string;
  title: string;
  type: 'cost-optimization' | 'security-alert' | 'security-risk' | 'performance-prediction' | 'performance-optimization' | 'anomaly-detection' | 'capacity-planning' | 'license-optimization';
  category: 'cost' | 'security' | 'performance' | 'optimization';
  description: string;
  confidence: number; // 0-100
  impact: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high';
  recommendation?: string;
  recommendations: string[];
  data?: Record<string, string | number | boolean>;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    suggestions?: string[];
    charts?: Array<Record<string, string | number>>;
    actions?: string[];
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string | number | boolean>;
}

// Component Props Types
export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ComponentType<{ className?: string }>;
  loading?: boolean;
}

export interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }> | (() => React.ReactNode);
  children?: NavigationItem[];
  badge?: {
    text: string;
    variant: 'default' | 'destructive' | 'outline' | 'secondary';
  } | {
    type: 'warning' | 'new' | 'alert' | 'info' | 'success' | 'error';
    count?: number;
  };
}

// Filter and Search Types
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface SearchFilters {
  platforms?: string[];
  types?: string[];
  regions?: string[];
  statuses?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Authentication Types
export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}
