import { 
  User, 
  CloudAccount, 
  CostData,
  CostDataItem, 
  Budget, 
  Resource, 
  SecurityFinding, 
  License, 
  Notification, 
  AIInsight, 
  ChatMessage,
  ComplianceCheck,
  M365Service,
  AuditEvent,
  Team
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@nxconsole.com',
    role: 'Administrator',
    avatar: '/avatars/admin.jpg',
    department: 'IT Operations',
    lastLogin: new Date('2024-01-15T08:30:00Z')
  },
  {
    id: '2',
    name: 'FinOps Manager',
    email: 'finops@nxconsole.com',
    role: 'FinOps Manager',
    department: 'Finance',
    lastLogin: new Date('2024-01-15T09:15:00Z')
  }
];

// Mock Cloud Accounts
export const mockCloudAccounts: CloudAccount[] = [
  {
    id: '1',
    name: 'Production AWS',
    platform: 'aws',
    status: 'active',
    region: 'us-east-1',
    accountId: '123456789012'
  },
  {
    id: '2',
    name: 'Development Azure',
    platform: 'azure',
    status: 'active',
    region: 'East US',
    tenantId: 'abcd-1234-efgh-5678'
  },
  {
    id: '3',
    name: 'Corporate M365',
    platform: 'm365',
    status: 'active',
    tenantId: 'corp-tenant-id'
  }
];

// Mock Cost Data
export const mockCostData: CostData = {
  period: '2024-01',
  total: 45678.90,
  currency: 'USD',
  breakdown: [
    {
      platform: 'AWS',
      amount: 23456.78,
      services: [
        { serviceType: 'EC2', amount: 12345.67, currency: 'USD', percentage: 52.6 },
        { serviceType: 'S3', amount: 5678.90, currency: 'USD', percentage: 24.2 },
        { serviceType: 'RDS', amount: 3456.78, currency: 'USD', percentage: 14.7 },
        { serviceType: 'Lambda', amount: 1975.43, currency: 'USD', percentage: 8.4 }
      ]
    },
    {
      platform: 'Azure',
      amount: 15432.10,
      services: [
        { serviceType: 'Virtual Machines', amount: 8765.43, currency: 'USD', percentage: 56.8 },
        { serviceType: 'Storage', amount: 3210.98, currency: 'USD', percentage: 20.8 },
        { serviceType: 'SQL Database', amount: 2456.78, currency: 'USD', percentage: 15.9 },
        { serviceType: 'App Service', amount: 998.91, currency: 'USD', percentage: 6.5 }
      ]
    },
    {
      platform: 'M365',
      amount: 6790.02,
      services: [
        { serviceType: 'Office 365 E3', amount: 4234.56, currency: 'USD', percentage: 62.4 },
        { serviceType: 'Teams', amount: 1555.46, currency: 'USD', percentage: 22.9 },
        { serviceType: 'SharePoint', amount: 1000.00, currency: 'USD', percentage: 14.7 }
      ]
    }
  ],
  previousPeriod: {
    total: 42345.67,
    changePercent: 7.9
  }
};

// Mock Cost Data Items for detailed analysis
export const mockCostDataItems: CostDataItem[] = [
  // AWS Data
  { id: '1', date: '2024-01-01', provider: 'AWS', service: 'EC2', cost: 1200.50, currency: 'USD', region: 'us-east-1' },
  { id: '2', date: '2024-01-01', provider: 'AWS', service: 'S3', cost: 580.25, currency: 'USD', region: 'us-east-1' },
  { id: '3', date: '2024-01-01', provider: 'AWS', service: 'RDS', cost: 450.80, currency: 'USD', region: 'us-east-1' },
  { id: '4', date: '2024-01-01', provider: 'AWS', service: 'Lambda', cost: 120.45, currency: 'USD', region: 'us-east-1' },
  
  // Azure Data
  { id: '5', date: '2024-01-01', provider: 'Azure', service: 'Virtual Machines', cost: 800.75, currency: 'USD', region: 'East US' },
  { id: '6', date: '2024-01-01', provider: 'Azure', service: 'Storage', cost: 320.40, currency: 'USD', region: 'East US' },
  { id: '7', date: '2024-01-01', provider: 'Azure', service: 'SQL Database', cost: 280.60, currency: 'USD', region: 'East US' },
  
  // GCP Data
  { id: '8', date: '2024-01-01', provider: 'GCP', service: 'Compute Engine', cost: 650.30, currency: 'USD', region: 'us-central1' },
  { id: '9', date: '2024-01-01', provider: 'GCP', service: 'Cloud Storage', cost: 180.90, currency: 'USD', region: 'us-central1' },
  
  // Previous days data (last 30 days)
  ...Array.from({ length: 29 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (i + 1));
    const dateStr = date.toISOString().split('T')[0];
    
    return [
      { id: `aws-${i}-1`, date: dateStr, provider: 'AWS', service: 'EC2', cost: 1100 + Math.random() * 200, currency: 'USD' },
      { id: `aws-${i}-2`, date: dateStr, provider: 'AWS', service: 'S3', cost: 500 + Math.random() * 100, currency: 'USD' },
      { id: `azure-${i}-1`, date: dateStr, provider: 'Azure', service: 'Virtual Machines', cost: 700 + Math.random() * 150, currency: 'USD' },
      { id: `gcp-${i}-1`, date: dateStr, provider: 'GCP', service: 'Compute Engine', cost: 600 + Math.random() * 100, currency: 'USD' },
    ];
  }).flat()
];

// Mock Budgets
export const mockBudgets: Budget[] = [
  {
    id: '1',
    name: 'AWS Production',
    amount: 25000,
    spent: 23456.78,
    currency: 'USD',
    period: 'monthly',
    threshold: 80,
    status: 'warning'
  },
  {
    id: '2',
    name: 'Azure Development',
    amount: 18000,
    spent: 15432.10,
    currency: 'USD',
    period: 'monthly',
    threshold: 85,
    status: 'warning'
  },
  {
    id: '3',
    name: 'M365 Corporate',
    amount: 8000,
    spent: 6790.02,
    currency: 'USD',
    period: 'monthly',
    threshold: 90,
    status: 'on-track'
  }
];

// Mock Resources
export const mockResources: Resource[] = [
  {
    id: 'i-0123456789abcdef0',
    name: 'web-server-prod-01',
    type: 'EC2 Instance',
    platform: 'aws',
    region: 'us-east-1',
    status: 'running',
    tags: {
      Environment: 'Production',
      Owner: 'WebTeam',
      Project: 'MainWebsite'
    },
    metadata: {
      instanceType: 't3.large',
      ami: 'ami-0abcdef1234567890',
      vpc: 'vpc-12345678'
    },
    cost: {
      monthly: 156.78,
      currency: 'USD'
    },
    createdDate: new Date('2023-12-01T10:00:00Z'),
    lastModified: new Date('2024-01-10T14:30:00Z')
  },
  {
    id: 'vm-webapp-dev-02',
    name: 'webapp-development',
    type: 'Virtual Machine',
    platform: 'azure',
    region: 'East US',
    status: 'running',
    tags: {
      Environment: 'Development',
      Owner: 'DevTeam',
      CostCenter: 'IT-001'
    },
    metadata: {
      vmSize: 'Standard_B2s',
      osType: 'Linux',
      resourceGroup: 'dev-resources'
    },
    cost: {
      monthly: 89.50,
      currency: 'USD'
    },
    createdDate: new Date('2024-01-05T09:15:00Z'),
    lastModified: new Date('2024-01-12T11:45:00Z')
  }
];

// Mock Security Findings
export const mockSecurityFindings: SecurityFinding[] = [
  {
    id: 'sf-001',
    title: 'S3 Bucket with Public Read Access',
    severity: 'high',
    platform: 'AWS',
    resource: 'my-public-bucket',
    resourceType: 'S3 Bucket',
    description: 'S3 bucket configured with public read access allowing anyone to download objects.',
    remediation: 'Remove public read permissions and configure appropriate IAM policies.',
    status: 'open',
    discoveredDate: new Date('2024-01-14T10:30:00Z'),
    category: 'misconfiguration'
  },
  {
    id: 'sf-002',
    title: 'Virtual Machine with Open SSH Access',
    severity: 'critical',
    platform: 'Azure',
    resource: 'vm-webapp-dev-02',
    resourceType: 'Virtual Machine',
    description: 'SSH port 22 is open to the internet (0.0.0.0/0) allowing potential brute force attacks.',
    remediation: 'Restrict SSH access to specific IP ranges or use Azure Bastion for secure access.',
    status: 'investigating',
    discoveredDate: new Date('2024-01-13T15:45:00Z'),
    category: 'access-control'
  }
];

// Mock Compliance Checks
export const mockComplianceChecks: ComplianceCheck[] = [
  {
    id: 'cc-001',
    name: 'Encryption at Rest',
    standard: 'SOC2',
    status: 'compliant',
    lastChecked: new Date('2024-01-15T00:00:00Z'),
    description: 'All storage volumes are encrypted at rest'
  },
  {
    id: 'cc-002',
    name: 'Access Control Review',
    standard: 'ISO27001',
    status: 'warning',
    lastChecked: new Date('2024-01-15T00:00:00Z'),
    description: 'Some users have not had access reviewed in 90+ days'
  }
];

// Mock Licenses
export const mockLicenses: License[] = [
  {
    id: 'lic-001',
    type: 'Office 365 E3',
    sku: 'SPE_E3',
    assigned: true,
    user: 'john.doe@company.com',
    lastActivity: new Date('2024-01-14T16:30:00Z'),
    cost: 22.00,
    currency: 'USD',
    status: 'active'
  },
  {
    id: 'lic-002',
    type: 'Office 365 E3',
    sku: 'SPE_E3',
    assigned: false,
    lastActivity: new Date('2023-12-01T08:00:00Z'),
    cost: 22.00,
    currency: 'USD',
    status: 'inactive'
  }
];

// Mock M365 Services
export const mockM365Services: M365Service[] = [
  {
    id: 'teams-001',
    name: 'Engineering Team',
    type: 'teams',
    status: 'active',
    users: 45,
  },
  {
    id: 'sp-001',
    name: 'Project Documentation',
    type: 'sharepoint',
    status: 'active',
    users: 120,
    storage: {
      used: 256,
      total: 1024,
      unit: 'GB'
    }
  }
];

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: 'team-001',
    name: 'Engineering Team',
    description: 'Main engineering team for product development',
    privacy: 'private',
    memberCount: 45,
    ownerId: 'john.doe@company.com',
    createdDate: new Date('2023-03-15T10:00:00Z'),
    lastActivity: new Date('2024-01-15T16:30:00Z'),
    archived: false,
    template: 'standard',
    channels: 8,
    guestCount: 2,
    apps: ['Planner', 'OneNote', 'SharePoint'],
    tags: ['development', 'core-team']
  },
  {
    id: 'team-002',
    name: 'Marketing Campaign Q1',
    description: 'Q1 2024 marketing campaign coordination',
    privacy: 'public',
    memberCount: 12,
    ownerId: 'jane.smith@company.com',
    createdDate: new Date('2024-01-01T09:00:00Z'),
    lastActivity: new Date('2024-01-15T14:20:00Z'),
    archived: false,
    template: 'marketing',
    channels: 5,
    guestCount: 0,
    apps: ['Planner', 'Forms'],
    tags: ['marketing', 'campaign']
  },
  {
    id: 'team-003',
    name: 'HR Onboarding',
    description: 'Human resources and employee onboarding',
    privacy: 'private',
    memberCount: 8,
    ownerId: 'hr@company.com',
    createdDate: new Date('2023-09-20T08:00:00Z'),
    lastActivity: new Date('2024-01-14T11:45:00Z'),
    archived: false,
    template: 'hr',
    channels: 4,
    guestCount: 0,
    apps: ['Forms', 'OneNote'],
    tags: ['hr', 'onboarding']
  },
  {
    id: 'team-004',
    name: 'Project Alpha Archive',
    description: 'Archived project team for Alpha initiative',
    privacy: 'private',
    memberCount: 25,
    ownerId: 'project.lead@company.com',
    createdDate: new Date('2023-01-10T10:00:00Z'),
    lastActivity: new Date('2023-11-30T17:00:00Z'),
    archived: true,
    template: 'project',
    channels: 12,
    guestCount: 3,
    apps: ['Planner', 'OneNote', 'SharePoint', 'Power BI'],
    tags: ['project', 'archived', 'alpha']
  },
  {
    id: 'team-005',
    name: 'Customer Support',
    description: 'Customer support and service team',
    privacy: 'public',
    memberCount: 32,
    ownerId: 'support.manager@company.com',
    createdDate: new Date('2023-06-01T08:00:00Z'),
    lastActivity: new Date('2024-01-15T18:00:00Z'),
    archived: false,
    template: 'support',
    channels: 6,
    guestCount: 1,
    apps: ['Forms', 'Power BI'],
    tags: ['support', 'customer-service']
  },
  {
    id: 'team-006',
    name: 'Finance & Accounting',
    description: 'Financial planning and accounting operations',
    privacy: 'private',
    memberCount: 15,
    ownerId: 'finance@company.com',
    createdDate: new Date('2023-04-12T09:00:00Z'),
    lastActivity: new Date('2024-01-15T12:30:00Z'),
    archived: false,
    template: 'finance',
    channels: 7,
    guestCount: 0,
    apps: ['Excel', 'Power BI', 'SharePoint'],
    tags: ['finance', 'accounting']
  },
  {
    id: 'team-007',
    name: 'Sales Team West',
    description: 'Western region sales team',
    privacy: 'public',
    memberCount: 18,
    ownerId: 'sales.west@company.com',
    createdDate: new Date('2023-08-15T10:00:00Z'),
    lastActivity: new Date('2024-01-12T16:45:00Z'),
    archived: false,
    template: 'sales',
    channels: 5,
    guestCount: 2,
    apps: ['Planner', 'Power BI'],
    tags: ['sales', 'west-region']
  },
  {
    id: 'team-008',
    name: 'IT Operations',
    description: 'IT infrastructure and operations',
    privacy: 'private',
    memberCount: 22,
    ownerId: 'it.ops@company.com',
    createdDate: new Date('2023-02-28T08:00:00Z'),
    lastActivity: new Date('2024-01-15T19:15:00Z'),
    archived: false,
    template: 'it',
    channels: 9,
    guestCount: 0,
    apps: ['OneNote', 'SharePoint', 'Forms'],
    tags: ['it', 'operations', 'infrastructure']
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'not-001',
    title: 'Budget Alert',
    message: 'AWS Production budget is at 94% utilization',
    type: 'cost',
    severity: 'warning',
    timestamp: new Date('2024-01-15T09:30:00Z'),
    read: false,
    actionRequired: true,
    link: '/dashboard/cost-management'
  },
  {
    id: 'not-002',
    title: 'Security Alert',
    message: 'New critical security finding detected',
    type: 'security',
    severity: 'error',
    timestamp: new Date('2024-01-15T08:45:00Z'),
    read: false,
    actionRequired: true,
    link: '/security'
  },
  {
    id: 'not-003',
    title: 'System Update',
    message: 'Monthly cost report is now available',
    type: 'system',
    severity: 'info',
    timestamp: new Date('2024-01-15T07:00:00Z'),
    read: true,
    actionRequired: false
  },
  {
    id: 'not-004',
    title: 'Performance Alert',
    message: 'High CPU usage detected on production servers',
    type: 'performance',
    severity: 'warning',
    timestamp: new Date('2024-01-15T06:30:00Z'),
    read: false,
    actionRequired: true,
    link: '/dashboard/resources'
  },
  {
    id: 'not-005',
    title: 'Compliance Check',
    message: 'SOC2 compliance audit completed successfully',
    type: 'compliance',
    severity: 'success',
    timestamp: new Date('2024-01-15T05:15:00Z'),
    read: true,
    actionRequired: false
  },
  {
    id: 'not-006',
    title: 'License Expiration',
    message: '15 Microsoft 365 licenses expire in 30 days',
    type: 'system',
    severity: 'warning',
    timestamp: new Date('2024-01-15T04:00:00Z'),
    read: false,
    actionRequired: true,
    link: '/dashboard/m365'
  },
  {
    id: 'not-007',
    title: 'Cost Optimization',
    message: 'AI identified $2,400 in potential monthly savings',
    type: 'cost',
    severity: 'info',
    timestamp: new Date('2024-01-15T03:20:00Z'),
    read: true,
    actionRequired: false,
    link: '/dashboard/ai-insights'
  },
  {
    id: 'not-008',
    title: 'Security Scan Complete',
    message: 'Weekly security scan completed with 2 new findings',
    type: 'security',
    severity: 'info',
    timestamp: new Date('2024-01-15T02:00:00Z'),
    read: false,
    actionRequired: false,
    link: '/dashboard/security'
  }
];

// Mock AI Insights
export const mockAIInsights: AIInsight[] = [
  {
    id: 'ai-001',
    title: 'Cost Optimization Opportunity',
    type: 'cost-optimization',
    description: 'Detected underutilized EC2 instances that could be rightsized to save 30% on compute costs.',
    confidence: 87,
    impact: 'high',
    category: 'cost',
    priority: 'high',
    recommendation: 'Implement rightsizing for development workloads to reduce costs by up to $1,200/month',
    recommendations: [
      'Resize t3.large instances to t3.medium for development workloads',
      'Consider spot instances for batch processing jobs',
      'Implement auto-scaling for variable workloads'
    ],
    timestamp: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: 'ai-002',
    title: 'Security Vulnerability Detected',
    type: 'security-risk',
    description: 'Multiple S3 buckets found with public read access enabled.',
    confidence: 95,
    impact: 'high',
    category: 'security',
    priority: 'high',
    recommendation: 'Immediately review and secure exposed S3 buckets to prevent data breaches',
    recommendations: [
      'Review S3 bucket policies and remove public access',
      'Enable S3 bucket encryption',
      'Implement least privilege access controls'
    ],
    timestamp: new Date('2024-01-15T11:30:00Z')
  },
  {
    id: 'ai-003',
    title: 'Anomaly Detected',
    type: 'anomaly-detection',
    description: 'Unusual spike in data transfer costs detected in Azure East US region.',
    confidence: 92,
    impact: 'medium',
    category: 'cost',
    priority: 'medium',
    recommendation: 'Investigate recent data migration activities to identify cause of cost spike',
    recommendations: [
      'Review recent data migration activities',
      'Check for misconfigured applications causing excessive data transfer',
      'Consider using Azure CDN to reduce egress costs'
    ],
    timestamp: new Date('2024-01-15T09:15:00Z')
  },
  {
    id: 'ai-004',
    title: 'Performance Optimization',
    type: 'performance-optimization',
    description: 'Database query performance has degraded by 25% in the last week.',
    confidence: 89,
    impact: 'medium',
    category: 'performance',
    priority: 'medium',
    recommendation: 'Optimize database queries and consider read replicas for improved performance',
    recommendations: [
      'Review and optimize slow database queries',
      'Consider implementing read replicas',
      'Add database indexing for frequently accessed data'
    ],
    timestamp: new Date('2024-01-15T08:45:00Z')
  },
  {
    id: 'ai-005',
    title: 'Capacity Planning Alert',
    type: 'capacity-planning',
    description: 'Projected to reach 85% CPU utilization on production servers within 2 weeks.',
    confidence: 78,
    impact: 'medium',
    category: 'performance',
    priority: 'medium',
    recommendation: 'Plan capacity expansion or implement auto-scaling to handle increased load',
    recommendations: [
      'Configure auto-scaling policies',
      'Plan additional server capacity',
      'Optimize application performance to reduce CPU usage'
    ],
    timestamp: new Date('2024-01-15T07:20:00Z')
  },
  {
    id: 'ai-006',
    title: 'License Optimization',
    type: 'license-optimization',
    description: 'Unused Microsoft 365 licenses detected across multiple departments.',
    confidence: 91,
    impact: 'low',
    category: 'cost',
    priority: 'low',
    recommendation: 'Reclaim unused licenses to save approximately $2,400 annually',
    recommendations: [
      'Audit unused Microsoft 365 licenses',
      'Reallocate licenses to new employees',
      'Consider downgrading license tiers for light users'
    ],
    timestamp: new Date('2024-01-15T06:10:00Z')
  }
];

// Mock Chat Messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    role: 'user',
    content: 'What are our top 3 cost drivers this month?',
    timestamp: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: 'msg-002',
    role: 'assistant',
    content: 'Based on the current month data, your top 3 cost drivers are:\n\n1. **AWS EC2 Instances** - $12,345.67 (27% of total)\n2. **Azure Virtual Machines** - $8,765.43 (19% of total)\n3. **AWS S3 Storage** - $5,678.90 (12% of total)\n\nEC2 instances show a 15% increase from last month. Would you like me to analyze the specific instances driving this cost increase?',
    timestamp: new Date('2024-01-15T10:30:15Z'),
    metadata: {
      suggestions: [
        'Show me EC2 cost breakdown',
        'Compare with last month',
        'Suggest cost optimizations'
      ]
    }
  }
];

// Utility functions for generating more mock data
export const generateMockCostHistory = (months: number) => {
  const history = [];
  const baseAmount = 40000;
  
  for (let i = months; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
    const amount = baseAmount * (1 + variation);
    
    history.push({
      period: date.toISOString().slice(0, 7), // YYYY-MM format
      total: Math.round(amount * 100) / 100,
      aws: Math.round(amount * 0.5 * 100) / 100,
      azure: Math.round(amount * 0.35 * 100) / 100,
      m365: Math.round(amount * 0.15 * 100) / 100
    });
  }
  
  return history;
};

// Mock Audit Events
export const mockAuditEvents: AuditEvent[] = [
  {
    id: 'audit-001',
    timestamp: new Date('2024-01-15T14:35:00Z'),
    user: 'john.doe@company.com',
    action: 'EC2:TerminateInstance',
    resource: 'i-0123456789abcdef0',
    resourceType: 'EC2 Instance',
    platform: 'AWS',
    severity: 'medium',
    status: 'success',
    description: 'EC2 instance terminated in production environment',
    ipAddress: '192.168.1.100',
    userAgent: 'aws-cli/2.0.0',
    metadata: {
      region: 'us-east-1',
      instanceType: 't3.large'
    }
  },
  {
    id: 'audit-002',
    timestamp: new Date('2024-01-15T14:20:00Z'),
    user: 'jane.smith@company.com',
    action: 'S3:DeleteBucket',
    resource: 'temp-storage-bucket',
    resourceType: 'S3 Bucket',
    platform: 'AWS',
    severity: 'high',
    status: 'success',
    description: 'S3 bucket permanently deleted',
    ipAddress: '10.0.1.50',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    metadata: {
      region: 'us-west-2',
      objectCount: 0
    }
  },
  {
    id: 'audit-003',
    timestamp: new Date('2024-01-15T13:45:00Z'),
    user: 'security-service@company.com',
    action: 'IAM:CreateRole',
    resource: 'backup-service-role',
    resourceType: 'IAM Role',
    platform: 'AWS',
    severity: 'low',
    status: 'success',
    description: 'New IAM role created for backup service',
    ipAddress: '172.16.0.10',
    userAgent: 'aws-sdk-js/3.0.0',
    metadata: {
      policies: 'AmazonS3ReadOnlyAccess,CloudWatchLogsFullAccess'
    }
  },
  {
    id: 'audit-004',
    timestamp: new Date('2024-01-15T13:30:00Z'),
    user: 'admin@company.com',
    action: 'SecurityGroup:AuthorizeIngress',
    resource: 'sg-web-servers',
    resourceType: 'Security Group',
    platform: 'AWS',
    severity: 'critical',
    status: 'warning',
    description: 'Security group rule added allowing inbound traffic from 0.0.0.0/0',
    ipAddress: '203.0.113.100',
    userAgent: 'aws-cli/2.1.0',
    metadata: {
      protocol: 'tcp',
      port: 22,
      cidr: '0.0.0.0/0'
    }
  },
  {
    id: 'audit-005',
    timestamp: new Date('2024-01-15T12:15:00Z'),
    user: 'azure-admin@company.com',
    action: 'VirtualMachine:Deallocate',
    resource: 'vm-web-01',
    resourceType: 'Virtual Machine',
    platform: 'Azure',
    severity: 'medium',
    status: 'success',
    description: 'Virtual machine deallocated to save costs',
    ipAddress: '198.51.100.25',
    userAgent: 'Azure CLI/2.0.0',
    metadata: {
      resourceGroup: 'rg-production',
      location: 'East US',
      vmSize: 'Standard_D2s_v3'
    }
  },
  {
    id: 'audit-006',
    timestamp: new Date('2024-01-15T11:50:00Z'),
    user: 'system@company.com',
    action: 'Login:Failed',
    resource: 'management-portal',
    resourceType: 'Application',
    platform: 'Azure',
    severity: 'medium',
    status: 'failed',
    description: 'Failed login attempt detected from suspicious IP address',
    ipAddress: '185.199.108.153',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
    metadata: {
      attemptCount: 5,
      blocked: true
    }
  },
  {
    id: 'audit-007',
    timestamp: new Date('2024-01-15T11:30:00Z'),
    user: 'backup-service@company.com',
    action: 'StorageAccount:CreateContainer',
    resource: 'backup-container-2024-01',
    resourceType: 'Storage Container',
    platform: 'Azure',
    severity: 'low',
    status: 'success',
    description: 'New storage container created for monthly backups',
    ipAddress: '10.0.2.100',
    userAgent: 'azure-storage-sdk/12.0.0',
    metadata: {
      storageAccount: 'companybackups',
      tier: 'Cool'
    }
  },
  {
    id: 'audit-008',
    timestamp: new Date('2024-01-15T10:15:00Z'),
    user: 'developer@company.com',
    action: 'RDS:CreateDBInstance',
    resource: 'dev-database-v2',
    resourceType: 'RDS Instance',
    platform: 'AWS',
    severity: 'low',
    status: 'success',
    description: 'New RDS instance created for development environment',
    ipAddress: '192.168.2.75',
    userAgent: 'aws-sdk-python/1.26.0',
    metadata: {
      engine: 'mysql',
      engineVersion: '8.0.35',
      instanceClass: 'db.t3.micro'
    }
  }
];

export const generateMockMetrics = () => ({
  totalResources: mockResources.length + Math.floor(Math.random() * 1000),
  activeAlerts: mockNotifications.filter(n => !n.read).length,
  totalUsers: 450 + Math.floor(Math.random() * 100),
  complianceScore: 85 + Math.floor(Math.random() * 10),
  lastUpdated: new Date()
});

// Export default data sets
export const mockData = {
  users: mockUsers,
  cloudAccounts: mockCloudAccounts,
  costData: mockCostData,
  budgets: mockBudgets,
  resources: mockResources,
  securityFindings: mockSecurityFindings,
  complianceChecks: mockComplianceChecks,
  licenses: mockLicenses,
  teams: mockTeams,
  m365Services: mockM365Services,
  notifications: mockNotifications,
  aiInsights: mockAIInsights,
  chatMessages: mockChatMessages
};
