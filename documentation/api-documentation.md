# NxConsole API Documentation

## Overview

NxConsole provides RESTful APIs for all four management pillars. All APIs follow consistent patterns and support standard HTTP methods.

## Base Configuration

**Base URL**: `https://your-domain.com/api`

**Authentication**: Bearer token required for all endpoints

**Rate Limiting**: 1000 requests per hour per user

## Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

**Response**:
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "admin",
    "permissions": ["*"]
  }
}
```

## Cost Management APIs

### Get Cost Overview
```http
GET /api/cost-management/overview
Authorization: Bearer {token}
```

**Response**:
```json
{
  "totalCost": 15420.50,
  "monthlyTrend": "up",
  "providers": {
    "aws": 8500.25,
    "azure": 4200.15,
    "gcp": 2100.10,
    "m365": 620.00
  },
  "currency": "USD"
}
```

### Get Provider-Specific Costs
```http
GET /api/cost-management/{provider}
Authorization: Bearer {token}

# Examples:
GET /api/cost-management/aws
GET /api/cost-management/azure
GET /api/cost-management/gcp
GET /api/cost-management/m365
```

**Response**:
```json
{
  "provider": "aws",
  "totalCost": 8500.25,
  "services": [
    {
      "service": "EC2",
      "cost": 4200.50,
      "usage": "2,450 hours"
    }
  ],
  "trends": [
    {
      "date": "2025-08-01",
      "cost": 275.50
    }
  ]
}
```

### Cost Forecasting
```http
POST /api/cost-management/forecast
Authorization: Bearer {token}
Content-Type: application/json

{
  "provider": "aws",
  "timeframe": "3months",
  "services": ["EC2", "S3", "Lambda"]
}
```

## Resource Management APIs

### Get Resource Inventory
```http
GET /api/resource-management/inventory
Authorization: Bearer {token}
```

**Response**:
```json
{
  "totalResources": 1245,
  "categories": {
    "compute": 156,
    "networking": 89,
    "storage": 234,
    "other": 766
  },
  "providers": {
    "aws": 645,
    "azure": 378,
    "gcp": 222
  }
}
```

### Get Resources by Category
```http
GET /api/resource-management/{category}
Authorization: Bearer {token}

# Examples:
GET /api/resource-management/compute
GET /api/resource-management/networking
GET /api/resource-management/storage
GET /api/resource-management/other-services
```

**Response**:
```json
{
  "category": "compute",
  "resources": [
    {
      "id": "i-1234567890abcdef0",
      "name": "web-server-01",
      "type": "EC2 Instance",
      "provider": "aws",
      "region": "us-east-1",
      "status": "running",
      "cost": 125.50,
      "tags": {
        "Environment": "production",
        "Team": "backend"
      }
    }
  ]
}
```

### Resource Optimization
```http
POST /api/resource-management/optimize
Authorization: Bearer {token}
Content-Type: application/json

{
  "resourceIds": ["i-1234567890abcdef0"],
  "optimizationType": "cost|performance|security"
}
```

## Performance Monitoring APIs

### Get Performance Overview
```http
GET /api/performance-monitoring/overview
Authorization: Bearer {token}
```

**Response**:
```json
{
  "systemHealth": "healthy",
  "overallScore": 87,
  "metrics": {
    "uptime": 99.95,
    "responseTime": 245,
    "errorRate": 0.02,
    "throughput": 1250
  },
  "providers": {
    "aws": { "score": 89, "status": "healthy" },
    "azure": { "score": 85, "status": "healthy" },
    "gcp": { "score": 87, "status": "healthy" }
  }
}
```

### Get Provider Performance
```http
GET /api/performance-monitoring/{provider}
Authorization: Bearer {token}

# Examples:
GET /api/performance-monitoring/aws
GET /api/performance-monitoring/azure
GET /api/performance-monitoring/gcp
```

**Response**:
```json
{
  "provider": "aws",
  "score": 89,
  "metrics": [
    {
      "timestamp": "2025-08-12T10:00:00Z",
      "cpu": 45.2,
      "memory": 67.8,
      "network": 125.5,
      "storage": 23.1
    }
  ],
  "alerts": [
    {
      "severity": "warning",
      "message": "High CPU usage on i-1234567890abcdef0",
      "timestamp": "2025-08-12T10:15:00Z"
    }
  ]
}
```

### Performance Alerts
```http
POST /api/performance-monitoring/alerts
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "cpu|memory|network|storage",
  "threshold": 80,
  "resource": "i-1234567890abcdef0",
  "notification": {
    "email": true,
    "webhook": "https://your-webhook.com"
  }
}
```

## Security & Compliance APIs

### Get Security Overview
```http
GET /api/security-compliance/overview
Authorization: Bearer {token}
```

**Response**:
```json
{
  "securityScore": 87,
  "complianceRate": 94,
  "findings": {
    "critical": 2,
    "high": 8,
    "medium": 15,
    "low": 23
  },
  "frameworks": {
    "soc2": 95,
    "iso27001": 89,
    "gdpr": 93,
    "hipaa": 85
  }
}
```

### Get Security Findings
```http
GET /api/security-compliance/findings
Authorization: Bearer {token}
Query Parameters:
- severity: critical|high|medium|low
- status: open|investigating|resolved
- provider: aws|azure|gcp
```

**Response**:
```json
{
  "findings": [
    {
      "id": "sec-001",
      "severity": "critical",
      "title": "Unencrypted S3 bucket detected",
      "provider": "aws",
      "resource": "backup-data-bucket",
      "status": "open",
      "remediation": "Enable encryption at rest",
      "discovered": "2025-08-10T14:30:00Z"
    }
  ]
}
```

### Compliance Reports
```http
GET /api/security-compliance/reports/{framework}
Authorization: Bearer {token}

# Examples:
GET /api/security-compliance/reports/soc2
GET /api/security-compliance/reports/iso27001
GET /api/security-compliance/reports/gdpr
```

## AI Insights APIs

### Get AI Insights
```http
GET /api/ai-insights
Authorization: Bearer {token}
Query Parameters:
- pillar: cost-management|resource-management|performance-monitoring|security-compliance
- type: optimization|prediction|anomaly|recommendation
```

**Response**:
```json
{
  "insights": [
    {
      "id": "ai-001",
      "type": "cost-optimization",
      "pillar": "cost-management",
      "title": "EC2 Instance Right-sizing Opportunity",
      "description": "Instance i-1234567890abcdef0 is underutilized",
      "potential_savings": 125.50,
      "confidence": 0.87,
      "created": "2025-08-12T10:00:00Z"
    }
  ]
}
```

### Generate AI Report
```http
POST /api/ai-insights/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "pillars": ["cost-management", "security-compliance"],
  "timeframe": "30days",
  "format": "summary|detailed"
}
```

## Cloud Management APIs

### Get Service Status
```http
GET /api/cloud-management/status
Authorization: Bearer {token}
```

**Response**:
```json
{
  "providers": {
    "aws": {
      "status": "connected",
      "services": {
        "ec2": "healthy",
        "s3": "healthy",
        "lambda": "degraded"
      }
    },
    "azure": {
      "status": "connected",
      "services": {
        "vm": "healthy",
        "storage": "healthy"
      }
    }
  }
}
```

### Service Configuration
```http
POST /api/cloud-management/configure
Authorization: Bearer {token}
Content-Type: application/json

{
  "provider": "aws",
  "credentials": {
    "access_key": "AKIA...",
    "secret_key": "secret...",
    "region": "us-east-1"
  },
  "services": ["ec2", "s3", "lambda"]
}
```

## Webhook Events

### Event Types

- `cost.threshold.exceeded`
- `performance.alert.created`
- `security.finding.detected`
- `resource.created`
- `resource.deleted`
- `compliance.violation.detected`

### Webhook Payload
```json
{
  "event": "cost.threshold.exceeded",
  "data": {
    "provider": "aws",
    "service": "EC2",
    "threshold": 1000.00,
    "current": 1250.50,
    "timestamp": "2025-08-12T10:00:00Z"
  },
  "metadata": {
    "source": "nxconsole",
    "version": "1.0.0"
  }
}
```

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is missing required parameters",
    "details": {
      "missing_fields": ["provider", "timeframe"]
    }
  }
}
```

### Error Codes

- `UNAUTHORIZED` (401): Invalid or missing authentication
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `INVALID_REQUEST` (400): Invalid request parameters
- `RATE_LIMITED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error

## SDK Examples

### JavaScript/TypeScript
```typescript
import { NxConsoleAPI } from '@nxconsole/sdk';

const api = new NxConsoleAPI({
  baseURL: 'https://your-domain.com/api',
  token: 'your-jwt-token'
});

// Get cost overview
const costs = await api.costManagement.getOverview();

// Get AWS resources
const resources = await api.resourceManagement.getByCategory('compute');

// Get performance metrics
const performance = await api.performanceMonitoring.getProvider('aws');
```

### Python
```python
from nxconsole import NxConsoleAPI

api = NxConsoleAPI(
    base_url='https://your-domain.com/api',
    token='your-jwt-token'
)

# Get security findings
findings = api.security_compliance.get_findings(severity='critical')

# Generate AI insights
insights = api.ai_insights.generate(
    pillars=['cost-management'],
    timeframe='30days'
)
```

## Rate Limits

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1,000 requests/hour
- **Enterprise**: 10,000 requests/hour

Rate limit headers:
- `X-RateLimit-Limit`: Request limit per hour
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset time (Unix timestamp)

## Versioning

API versions are specified in the URL:
- Current: `/api/v1/`
- Deprecated: `/api/v0/` (supported until 2026-01-01)

## Support

For API support:
- Documentation: https://docs.nxconsole.com
- Support: api-support@nxconsole.com
- Status Page: https://status.nxconsole.com
