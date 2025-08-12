# NxConsole Administrator Setup Guide

## Initial Setup

### 1. System Requirements

**Server Requirements:**
- Node.js 18+ 
- Next.js 15+
- TypeScript support
- Minimum 4GB RAM
- 10GB disk space

**Browser Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd nxconsole

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### 3. Environment Configuration

Configure the following environment variables in `.env.local`:

```env
# Database Configuration
DATABASE_URL="your-database-connection-string"

# AWS Configuration
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_DEFAULT_REGION="us-east-1"

# Azure Configuration
AZURE_CLIENT_ID="your-azure-client-id"
AZURE_CLIENT_SECRET="your-azure-client-secret"
AZURE_TENANT_ID="your-azure-tenant-id"

# GCP Configuration
GOOGLE_CLOUD_PROJECT="your-gcp-project-id"
GOOGLE_CLOUD_KEYFILE="path-to-service-account-key.json"

# Microsoft 365 Configuration
M365_CLIENT_ID="your-m365-client-id"
M365_CLIENT_SECRET="your-m365-client-secret"

# AI Services
OPENAI_API_KEY="your-openai-api-key"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

## Cloud Provider Setup

### AWS Configuration

1. **Create IAM User:**
   ```bash
   # Required permissions
   - CloudWatchReadOnlyAccess
   - EC2ReadOnlyAccess
   - S3ReadOnlyAccess
   - RDSReadOnlyAccess
   - LambdaReadOnlyAccess
   - IAMReadOnlyAccess
   ```

2. **Cost and Billing:**
   - Enable Cost Explorer API
   - Set up Billing Alerts
   - Configure Cost Allocation Tags

3. **Security Configuration:**
   - Enable CloudTrail logging
   - Configure Security Hub
   - Set up Config Rules

### Azure Configuration

1. **Create Service Principal:**
   ```bash
   az ad sp create-for-rbac --name "nxconsole-sp" --role="Reader"
   ```

2. **Required Permissions:**
   - Reader (for resource access)
   - Cost Management Reader (for billing)
   - Security Reader (for security data)

3. **Enable APIs:**
   - Azure Resource Manager API
   - Azure Cost Management API
   - Azure Security Center API

### Google Cloud Configuration

1. **Create Service Account:**
   ```bash
   gcloud iam service-accounts create nxconsole-sa
   ```

2. **Assign Roles:**
   ```bash
   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:nxconsole-sa@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/viewer"
   ```

3. **Enable APIs:**
   - Cloud Resource Manager API
   - Cloud Billing API
   - Security Command Center API

### Microsoft 365 Configuration

1. **App Registration:**
   - Register app in Azure AD
   - Configure API permissions
   - Generate client secret

2. **Required Permissions:**
   - User.Read.All
   - Group.Read.All
   - Reports.Read.All
   - SecurityEvents.Read.All

## User Management

### 1. Role-Based Access Control

**Administrator:**
- Full system access
- User management
- Configuration settings
- All pillar access

**Manager:**
- Read/write access to all pillars
- Limited user management
- Report generation

**Analyst:**
- Read-only access
- Specific pillar access
- Basic reporting

**Viewer:**
- Read-only access
- Limited pillar access

### 2. Setting Up Users

```typescript
// Example user configuration
const userRoles = {
  admin: {
    permissions: ['*'],
    pillars: ['*']
  },
  manager: {
    permissions: ['read', 'write'],
    pillars: ['cost-management', 'resource-management', 'performance-monitoring', 'security-compliance']
  },
  analyst: {
    permissions: ['read'],
    pillars: ['cost-management', 'performance-monitoring']
  }
};
```

## Monitoring and Alerting

### 1. System Health Monitoring

Configure monitoring for:
- Application performance
- Database connectivity
- API response times
- Error rates
- Resource utilization

### 2. Alert Configuration

Set up alerts for:
- System downtime
- Performance degradation
- Security incidents
- Cost thresholds
- Compliance violations

### 3. Logging

Configure logging for:
- User actions
- System events
- API calls
- Security events
- Performance metrics

## Security Hardening

### 1. Authentication

- Enable multi-factor authentication
- Configure session timeouts
- Set up SSO integration
- Implement password policies

### 2. Network Security

- Configure HTTPS only
- Set up firewall rules
- Implement IP whitelisting
- Use VPN for remote access

### 3. Data Protection

- Enable encryption at rest
- Configure encryption in transit
- Set up data backup
- Implement data retention policies

## Backup and Recovery

### 1. Database Backup

```bash
# Daily automated backups
pg_dump nxconsole_db > backup_$(date +%Y%m%d).sql

# Restore procedure
psql nxconsole_db < backup_file.sql
```

### 2. Configuration Backup

- Export environment variables
- Backup configuration files
- Document custom settings
- Version control configurations

### 3. Disaster Recovery

- Document recovery procedures
- Test backup restoration
- Maintain offsite backups
- Define RTO/RPO objectives

## Performance Optimization

### 1. Database Optimization

- Configure connection pooling
- Set up query optimization
- Implement caching strategies
- Monitor query performance

### 2. Application Optimization

- Enable production builds
- Configure CDN
- Implement lazy loading
- Optimize bundle sizes

### 3. Infrastructure Scaling

- Set up load balancing
- Configure auto-scaling
- Monitor resource usage
- Plan capacity upgrades

## Maintenance Procedures

### 1. Regular Updates

- Update dependencies monthly
- Apply security patches
- Monitor for vulnerabilities
- Test updates in staging

### 2. Health Checks

- Daily system health verification
- Weekly performance reviews
- Monthly security audits
- Quarterly capacity planning

### 3. Troubleshooting

**Common Issues:**

1. **Connection Failures:**
   - Verify API keys
   - Check network connectivity
   - Validate permissions
   - Review logs

2. **Performance Issues:**
   - Monitor resource usage
   - Check database performance
   - Review API response times
   - Analyze user patterns

3. **Authentication Problems:**
   - Verify SSO configuration
   - Check user permissions
   - Review session settings
   - Validate tokens

## Support and Documentation

### 1. Internal Documentation

- Maintain runbooks
- Document customizations
- Keep configuration records
- Update procedures regularly

### 2. User Training

- Provide user onboarding
- Create training materials
- Conduct regular sessions
- Maintain help documentation

### 3. Vendor Support

- Maintain support contracts
- Document known issues
- Escalation procedures
- Regular vendor communication

## Compliance and Auditing

### 1. Audit Logging

- Enable comprehensive logging
- Regular log reviews
- Automated compliance checks
- Audit trail maintenance

### 2. Compliance Frameworks

- SOC 2 Type II
- ISO 27001
- GDPR compliance
- Industry-specific requirements

### 3. Regular Assessments

- Quarterly security reviews
- Annual compliance audits
- Penetration testing
- Vulnerability assessments
