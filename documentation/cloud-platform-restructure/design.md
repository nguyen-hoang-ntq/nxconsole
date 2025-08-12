# NxConsole Cloud Platform Management - Technical Design Specification

## Architecture Overview

Hệ thống NxConsole sẽ được tổ chức lại theo architecture 4-pillars với structure rõ ràng, streamlined navigation và AI-powered insights xuyên suốt.

## 1. System Architecture Design

### 1.1 Four Pillars Structure

**Cost Management Pillar**
- Components: CostDashboard, BudgetTracker, CostOptimizer, ForecastingEngine
- Routes: `/dashboard/cost-management/*`
- Sub-modules: Overview, AWS Cost, Azure Cost, GCP Cost, M365 Cost
- AI Integration: Cost optimization recommendations, spending anomaly detection

**Resource Management Pillar**
- Components: ResourceInventory, ProvisioningWorkflow, ResourceOptimizer, LifecycleManager
- Routes: `/dashboard/resource-management/*`
- Sub-modules: Overview, Compute, Networking, Storage, Other Services
- Grouping: Service categories với platform-specific implementations

**Performance Monitoring Pillar** (NEW)
- Components: PerformanceDashboard, MetricsCollector, AlertManager, CapacityPlanner
- Routes: `/dashboard/performance-monitoring/*`
- Scope: AWS, Azure, GCP (exclude M365, Google Workspace)
- Features: Real-time monitoring, historical trends, predictive analytics

**Security & Compliance Pillar**
- Components: SecurityPosture, ComplianceTracker, ThreatDetector, AuditManager
- Routes: `/dashboard/security-compliance/*`
- Sub-modules: Overview, AWS Security, Azure Security, GCP Security, Compliance Reports

### 1.2 Navigation Structure Redesign

```typescript
const navigationStructure = {
  dashboard: "/dashboard",
  costManagement: {
    overview: "/dashboard/cost-management",
    aws: "/dashboard/cost-management/aws",
    azure: "/dashboard/cost-management/azure", 
    gcp: "/dashboard/cost-management/gcp",
    m365: "/dashboard/cost-management/m365"
  },
  resourceManagement: {
    overview: "/dashboard/resource-management",
    compute: "/dashboard/resource-management/compute",
    networking: "/dashboard/resource-management/networking",
    storage: "/dashboard/resource-management/storage",
    otherServices: "/dashboard/resource-management/other-services"
  },
  performanceMonitoring: {
    overview: "/dashboard/performance-monitoring",
    aws: "/dashboard/performance-monitoring/aws",
    azure: "/dashboard/performance-monitoring/azure",
    gcp: "/dashboard/performance-monitoring/gcp"
  },
  securityCompliance: {
    overview: "/dashboard/security-compliance",
    aws: "/dashboard/security-compliance/aws",
    azure: "/dashboard/security-compliance/azure",
    gcp: "/dashboard/security-compliance/gcp",
    compliance: "/dashboard/security-compliance/compliance"
  },
  cloudManagement: {
    // Existing structure maintained for service-specific management
  }
}
```

## 2. Component Architecture

### 2.1 Shared Components Enhancement

**PillarDashboard Component**
```typescript
interface PillarDashboardProps {
  pillar: 'cost' | 'resource' | 'performance' | 'security';
  cloudProviders: CloudProvider[];
  enabledServices: string[];
}
```

**CloudProviderTabs Component**
```typescript
interface CloudProviderTabsProps {
  providers: CloudProvider[];
  activeProvider: string;
  onProviderChange: (provider: string) => void;
  pillarContext: PillarType;
}
```

**ServiceGrouping Component**
```typescript
interface ServiceGroupProps {
  category: 'compute' | 'networking' | 'storage' | 'other';
  services: Service[];
  cloudProvider: CloudProvider;
}
```

### 2.2 Performance Monitoring Components (NEW)

**PerformanceDashboard**
- Real-time metrics widgets (CPU, Memory, Network, Storage)
- Service uptime tracking
- Response time monitoring
- Error rate visualization

**MetricsCollector**
- Multi-cloud metrics aggregation
- Data normalization across platforms
- Historical data management
- Real-time data streaming

**AlertManager**
- Threshold-based alerting
- Escalation workflows
- Multi-channel notifications
- Alert correlation engine

**CapacityPlanner**
- Resource utilization forecasting
- Scaling recommendations
- Cost impact analysis
- Performance optimization suggestions

### 2.3 Resource Management Enhancement

**ResourceGrouping Logic**
```typescript
const serviceCategories = {
  compute: {
    aws: ['EC2', 'Lambda', 'ECS', 'EKS', 'Batch'],
    azure: ['Virtual Machines', 'Functions', 'Container Instances', 'AKS'],
    gcp: ['Compute Engine', 'Cloud Functions', 'GKE', 'Cloud Run']
  },
  networking: {
    aws: ['VPC', 'CloudFront', 'Route 53', 'Load Balancer'],
    azure: ['Virtual Network', 'CDN', 'DNS', 'Load Balancer'],
    gcp: ['VPC', 'Cloud CDN', 'Cloud DNS', 'Load Balancing']
  },
  storage: {
    aws: ['S3', 'EBS', 'EFS', 'Glacier'],
    azure: ['Blob Storage', 'Disk Storage', 'Files', 'Archive'],
    gcp: ['Cloud Storage', 'Persistent Disk', 'Filestore', 'Nearline']
  },
  otherServices: {
    aws: ['RDS', 'DynamoDB', 'SQS', 'SNS'],
    azure: ['SQL Database', 'Cosmos DB', 'Service Bus', 'Event Hub'],
    gcp: ['Cloud SQL', 'Firestore', 'Pub/Sub', 'BigQuery']
  }
};
```

## 3. Settings and Configuration Design

### 3.1 Cloud Provider Configuration

**Service Discovery Interface**
```typescript
interface ServiceConfiguration {
  providerId: string;
  providerName: string;
  enabled: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'error';
  services: {
    serviceId: string;
    serviceName: string;
    enabled: boolean;
    configured: boolean;
    lastSync: Date;
  }[];
  credentials: {
    type: 'api_key' | 'service_principal' | 'oauth';
    configured: boolean;
    testConnection: () => Promise<boolean>;
  };
}
```

**Dynamic Navigation Logic**
```typescript
const generateNavigationItems = (enabledServices: ServiceConfiguration[]) => {
  return enabledServices
    .filter(service => service.enabled && service.connectionStatus === 'connected')
    .map(service => generateServiceNavigation(service));
};
```

### 3.2 Settings UI Enhancement

**Provider Configuration Panels**
- AWS: IAM role setup, API key configuration, region selection
- Azure: Service principal creation, subscription management, resource group access
- GCP: Service account setup, project configuration, API enablement
- M365: App registration, admin consent, scope configuration
- Google Workspace: OAuth setup, domain verification, API access

**Connection Testing Framework**
```typescript
interface ConnectionTest {
  providerId: string;
  testType: 'authentication' | 'permissions' | 'api_access';
  execute: () => Promise<TestResult>;
  troubleshooting: TroubleshootingGuide;
}
```

## 4. AI Integration Architecture

### 4.1 Cross-Pillar AI Engine

**AI Context Manager**
```typescript
interface AIContext {
  currentPillar: PillarType;
  cloudProvider: CloudProvider;
  userRole: UserRole;
  recentActivity: Activity[];
  systemState: SystemMetrics;
}
```

**Insight Generation Pipeline**
- Cost anomaly detection algorithms
- Performance pattern recognition
- Security threat correlation
- Resource optimization recommendations

### 4.2 Module-Specific AI Features

**Cost Management AI**
- Spending trend analysis
- Budget optimization suggestions
- Cost allocation recommendations
- Reserved instance optimization

**Resource Management AI**
- Resource utilization optimization
- Rightsizing recommendations
- Lifecycle automation suggestions
- Capacity planning assistance

**Performance Monitoring AI**
- Anomaly detection for performance metrics
- Predictive scaling recommendations
- Bottleneck identification
- Performance optimization suggestions

**Security & Compliance AI**
- Threat detection and analysis
- Compliance gap identification
- Security posture recommendations
- Risk assessment automation

## 5. Data Architecture

### 5.1 Unified Data Model

**Multi-Cloud Resource Schema**
```typescript
interface UnifiedResource {
  id: string;
  cloudProvider: CloudProvider;
  serviceCategory: ServiceCategory;
  resourceType: string;
  name: string;
  region: string;
  tags: Record<string, string>;
  metrics: {
    cost: CostMetrics;
    performance: PerformanceMetrics;
    security: SecurityMetrics;
  };
  relationships: ResourceRelationship[];
}
```

**Performance Metrics Schema**
```typescript
interface PerformanceMetrics {
  cpu: MetricValue[];
  memory: MetricValue[];
  network: NetworkMetrics;
  storage: StorageMetrics;
  availability: AvailabilityMetrics;
  responseTime: ResponseTimeMetrics;
}
```

### 5.2 Real-Time Data Pipeline

**Data Collection Strategy**
- API polling for near-real-time updates
- Webhook integration for immediate notifications
- Batch processing for historical data
- Edge caching for performance optimization

## 6. UI/UX Design Standards

### 6.1 Visual Design System

**Icon Usage Standards**
```typescript
// Correct: React icons with consistent sizing
<Server className="h-4 w-4" />
<Database className="h-4 w-4" />
<Shield className="h-4 w-4" />

// Service Category Icons
const categoryIcons = {
  compute: Server,
  networking: Network,
  storage: Database,
  otherServices: Grid3x3
};
```

**Pillar Color Scheme**
```typescript
const pillarColors = {
  cost: 'text-green-600 bg-green-50',
  resource: 'text-blue-600 bg-blue-50',
  performance: 'text-purple-600 bg-purple-50',
  security: 'text-red-600 bg-red-50'
};
```

### 6.2 Responsive Design Framework

**Navigation Responsive Behavior**
- Mobile: Collapsible sidebar with overlay
- Tablet: Compact navigation with icons + labels
- Desktop: Full navigation with 3-level hierarchy

**Chart Responsive Design**
- Mobile: Simplified charts with key metrics
- Tablet: Responsive charts with touch interactions
- Desktop: Full-featured charts with hover details

## 7. Performance Optimization Strategy

### 7.1 Component Optimization

**Lazy Loading Implementation**
```typescript
const PerformanceMonitoring = lazy(() => import('./performance-monitoring'));
const CostManagement = lazy(() => import('./cost-management'));
```

**Memoization Strategy**
```typescript
const PillarDashboard = memo(({ pillar, data }) => {
  const processedData = useMemo(() => processData(data), [data]);
  return <Dashboard data={processedData} />;
});
```

### 7.2 Data Loading Optimization

**Progressive Data Loading**
- Critical metrics load first
- Secondary data loads on demand
- Background refresh for updated information
- Optimistic updates for user interactions

## 8. Testing Strategy

### 8.1 Component Testing

**Pillar-Specific Test Suites**
- Cost management calculation accuracy
- Performance monitoring real-time updates
- Resource management CRUD operations
- Security compliance reporting

### 8.2 Integration Testing

**Cross-Pillar Integration Tests**
- Navigation between pillars
- Data consistency across modules
- AI insights correlation
- Settings impact on pillar display

## 9. Migration Strategy

### 9.1 Gradual Migration Approach

**Phase 1: Navigation Restructure**
- Update navigation structure
- Create pillar overview pages
- Migrate existing pages to new structure

**Phase 2: Performance Monitoring Implementation**
- Develop performance monitoring components
- Integrate with existing infrastructure
- Add performance metrics to dashboard

**Phase 3: Resource Management Enhancement**
- Implement service grouping logic
- Enhance resource management features
- Add cross-cloud resource relationships

**Phase 4: AI Integration Enhancement**
- Implement cross-pillar AI insights
- Enhance existing AI features
- Add predictive analytics capabilities
