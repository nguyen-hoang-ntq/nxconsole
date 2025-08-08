# Design Document - NxConsole Prototype Website

## Overview

NxConsole Prototype là một ứng dụng web được xây dựng bằng Next.js 14+ với App Router, sử dụng shadcn/ui component library và Tailwind CSS. Ứng dụng mô phỏng một hệ thống quản lý cloud tập trung với giao diện hiện đại, responsive và các tính năng tương tác thông qua mock data.

## Architecture

### Technology Stack
- **Frontend Framework**: Next.js 14+ với App Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Context API + useState/useReducer
- **Data Fetching**: Next.js built-in fetch với mock APIs
- **Charts & Visualization**: Recharts
- **Icons**: Lucide React, react-icons, @cloud-diagrams/core
- **Authentication**: Mock authentication với session simulation

### Project Structure
```
nxconsole-prototype/
├── app/
│   ├── (auth)/
│   │   └── login/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx (main dashboard)
│   │   ├── finops/
│   │   ├── resources/
│   │   ├── ai-insights/
│   │   ├── security/
│   │   ├── cloud-management/
│   │   │   ├── microsoft/
│   │   │   │   ├── azure/
│   │   │   │   └── m365/
│   │   │   │       ├── sharepoint/
│   │   │   │       ├── exchange/
│   │   │   │       └── onedrive/
│   │   │   ├── amazon/
│   │   │   │   ├── aws/
│   │   │   │   │   ├── ec2/
│   │   │   │   │   ├── s3/
│   │   │   │   │   └── lambda/
│   │   │   └── google/
│   │   │       ├── gcp/
│   │   │       │   ├── compute/
│   │   │       │   └── storage/
│   │   │       └── admin/
│   │   ├── notifications/
│   │   ├── settings/
│   │   ├── users/
│   │   ├── logs/
│   │   ├── profile/
│   │   └── help/
│   ├── api/
│   │   └── mock/ (mock API endpoints)
│   ├── globals.css
│   ├── layout.tsx (root layout with MainLayout)
│   └── page.tsx (root redirect page)
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── auth/
│   │   └── auth-provider.tsx
│   ├── layout/
│   │   ├── main-layout.tsx (conditional layout wrapper)
│   │   └── app-layout.tsx (authenticated pages layout)
│   ├── navigation/
│   │   ├── app-header.tsx (top header with search, notifications, user menu)
│   │   ├── app-sidebar.tsx (left navigation sidebar)
│   │   └── breadcrumb.tsx (navigation breadcrumb)
│   ├── finops/
│   │   ├── cost-charts.tsx
│   │   └── budget-tracker.tsx
│   ├── charts/
│   ├── dashboard/
│   ├── ai-assistant/
│   │   ├── chat-widget.tsx
│   │   └── ai-helper.tsx
│   ├── users/
│   │   ├── user-management.tsx
│   │   └── role-management.tsx
│   ├── system/
│   │   ├── health-monitor.tsx
│   │   ├── logs-viewer.tsx
│   │   └── performance-dashboard.tsx
│   └── shared/
├── lib/
│   ├── utils.ts
│   ├── mock-data.ts
│   ├── auth.ts
│   └── icons.ts (platform-specific icons)
└── types/
    └── index.ts
```

## Components and Interfaces

### Core Layout Components

## Layout Architecture

### Global Layout System
NxConsole sử dụng hệ thống layout phân cấp với consistency trên toàn bộ ứng dụng:

#### 1. MainLayout (Root Layout Wrapper)
- **Purpose**: Conditional layout wrapper cho toàn bộ ứng dụng
- **Location**: `components/layout/main-layout.tsx`
- **Features**: 
  - Điều khiển conditional rendering dựa trên pathname
  - Áp dụng AppLayout cho authenticated pages
  - Bypass layout cho public pages (login, register)
  - Bypass layout cho root redirect page
- **Logic**: 
  ```typescript
  if (isPublicPage || isRootPage || isAuthPage) {
    return <>{children}</>;
  }
  return <AppLayout>{children}</AppLayout>;
  ```

#### 2. AppLayout (Authenticated Pages Layout)
- **Purpose**: Main layout wrapper cho authenticated pages
- **Location**: `components/layout/app-layout.tsx`
- **Features**: 
  - Left sidebar navigation với collapsible function
  - Top header bar với search, notifications, user menu
  - Responsive design với mobile overlay
  - Authentication checking và redirect logic
  - Main content area với consistent spacing
- **Props**: `children: ReactNode`

#### 3. Enhanced Header System
- **Purpose**: Comprehensive top navigation với dual-level design
- **Location**: `components/navigation/app-header.tsx`
- **Features**:
  - **Top Header Bar**:
    - Global search bar (desktop) / search icon (mobile)
    - AI Assistant icon for quick access to chat
    - Notification dropdown với unread count badges
    - Language selector (EN/JP/KR) với flag icons
    - Theme toggle button với dark/light mode
    - User profile dropdown với role information
    - Mobile menu toggle button
  - **Breadcrumb Bar**:
    - Integrated breadcrumb navigation
    - Muted background với border separation
    - Context-aware navigation path
- **Responsive**: 
  - Mobile: Collapsed search, hamburger menu
  - Desktop: Full search bar, extended navigation
- **Typography**: All text uses Geist Mono font family

#### 4. Enhanced Sidebar Navigation
- **Purpose**: Primary navigation với comprehensive feature set
- **Location**: `components/navigation/app-sidebar.tsx`
- **Features**:
  - **Header Section**:
    - NxConsole logo với Home icon
    - Brand name và subtitle
    - Collapse/expand toggle button với proper expand functionality
  - **System Health Card**:
    - Real-time system status display
    - Performance indicators
    - Quick access to system monitoring
  - **Navigation Items**:
    - Dashboard (tổng quan) với LayoutDashboard icon
    - FinOps & Cost Management với DollarSign icon (warning badge)
    - Resource Management với Server icon + platform-specific sub-icons (AWS, Azure, GCP)
    - AI Insights với Brain icon (new badge)
    - Security & Compliance với Shield icon (alert count badge)
    - Cloud Management với Cloud icon + hierarchical provider structure:
      - Microsoft với sub-items: Azure services, Microsoft 365 (Teams, SharePoint, Exchange, OneDrive)
      - Amazon với sub-items: AWS services (EC2, S3, Lambda, RDS, CloudFormation)
      - Google với sub-items: GCP services (Compute Engine, Cloud Storage), Google Admin
    - Notifications với Bell icon (unread count)
    - User Management với Users icon
    - System Logs với FileText icon
  - **Secondary Navigation**:
    - Profile với User icon
    - Settings với Settings icon
    - Help & Support với HelpCircle icon
  - **Badge Improvements**:
    - Proper contrast for light mode (white text on colored background)
    - Consistent color scheme across light/dark modes
  - **States**:
    - Active page highlighting
    - Collapsed state với icon-only view và expand button
    - Mobile overlay với backdrop blur
  - **Icons**: react-icons và @cloud-diagrams/core cho cloud service icons
- **Typography**: All text uses Geist Mono font family
- **Platform Icons**: Official cloud service icons từ react-icons package

### URL Structure
```
/ → redirects to /dashboard (authenticated) or /login (guest)
/login → public auth page (no layout)
/dashboard → main dashboard with full layout
/dashboard/finops → FinOps module with full layout
/dashboard/resources → Resource module with full layout
/dashboard/ai-insights → AI module with full layout
/dashboard/security → Security module with full layout
/dashboard/cloud-management → Cloud Management main page
/dashboard/cloud-management/microsoft → Microsoft services overview
/dashboard/cloud-management/microsoft/azure → Azure services management
/dashboard/cloud-management/microsoft/m365 → Microsoft 365 management
/dashboard/cloud-management/microsoft/m365/sharepoint → SharePoint Online management
/dashboard/cloud-management/microsoft/m365/exchange → Exchange Online management
/dashboard/cloud-management/microsoft/m365/onedrive → OneDrive for Business management
/dashboard/cloud-management/amazon → Amazon services overview
/dashboard/cloud-management/amazon/aws → AWS services management
/dashboard/cloud-management/google → Google services overview
/dashboard/cloud-management/google/gcp → Google Cloud Platform management
/dashboard/cloud-management/google/admin → Google Admin management
/dashboard/notifications → Notifications with full layout
/dashboard/users → User management with full layout
/dashboard/logs → System logs with full layout
/dashboard/profile → User profile with full layout
/dashboard/settings → Settings with full layout
/dashboard/help → Help & Support with full layout
```

### Component Hierarchy

#### Layout Components

#### 1. Root Layout (`app/layout.tsx`)
- **Responsibilities**: 
  - Global styles và fonts
  - AuthProvider wrapper
  - MainLayout wrapper
- **No direct UI**: Chỉ là wrapper logic

#### 2. MainLayout Component
- **Responsibilities**: 
  - Route-based layout decisions
  - Public vs authenticated page handling
- **Conditional Rendering**: Based trên pathname analysis

#### 3. AppLayout Component
- **Responsibilities**: 
  - Sidebar positioning và responsive behavior
  - Header placement và mobile handling
  - Content area container với scrolling
  - Authentication state management
- **Layout Structure**:
  ```jsx
  <div className="flex h-screen bg-background">
    <aside className="sidebar">
      <AppSidebar />
    </aside>
    <div className="flex-1 flex flex-col">
      <AppHeader />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  </div>
  ```

#### Dashboard Components

#### 1. MetricCard
- **Purpose**: Display key metrics với visual indicators
- **Props**: `title, value, change, trend, icon`
- **Features**: Color-coded trends, percentage changes

#### 2. ChartContainer
- **Purpose**: Wrapper cho các charts với consistent styling
- **Props**: `title, children, actions?`
- **Features**: Chart title, optional action buttons

### FinOps Module Components

#### 1. CostDashboard
- **Purpose**: Main cost overview dashboard
- **Features**:
  - Multi-cloud cost summary
  - Cost breakdown charts
  - Period comparisons
  - Top spenders list

#### 2. BudgetTracker
- **Purpose**: Budget vs actual spending visualization
- **Features**:
  - Progress bars cho budget utilization
  - Alert indicators cho budget overruns
  - Forecast projections

#### 3. CostAnalyticsCharts
- **Purpose**: Interactive cost analysis charts
- **Chart Types**:
  - Line charts cho trends
  - Pie charts cho breakdowns
  - Bar charts cho comparisons

### Resource Management Components

#### 1. ResourceInventory
- **Purpose**: Unified resource listing và management
- **Features**:
  - Searchable và filterable table
  - Multi-platform resource display
  - Bulk actions support

#### 2. ResourceCard
- **Purpose**: Individual resource display card
- **Props**: `resource: Resource`
- **Features**: Status indicators, quick actions, metadata display

#### 3. ProvisioningForm
- **Purpose**: Resource creation forms
- **Features**:
  - Multi-step wizard
  - Validation
  - Approval workflow simulation

### AI Insights Components

#### 1. ChatBot
- **Purpose**: AI assistant interface
- **Features**:
  - Chat message history
  - Typing indicators
  - Sample query suggestions
  - Mock intelligent responses

#### 2. InsightsPanel
- **Purpose**: AI-generated insights display
- **Features**:
  - Anomaly detection alerts
  - Trend analysis
  - Recommendation cards

### Security Module Components

#### 1. SecurityDashboard
- **Purpose**: Security posture overview
- **Features**:
  - Security score visualization
  - Compliance status indicators
  - Recent alerts feed

#### 2. ComplianceMatrix
- **Purpose**: Compliance status across different standards
- **Features**:
  - Grid layout cho compliance checks
  - Status indicators
  - Drill-down capabilities

### Microsoft 365 Components

#### 1. LicenseDashboard
- **Purpose**: M365 license management overview
- **Features**:
  - License utilization charts
  - Inactive license identification
  - Cost optimization recommendations

#### 2. TeamsManagement
- **Purpose**: Microsoft Teams administration
- **Features**:
  - Team listing và search
  - Member management
  - Lifecycle controls

#### 3. SharePointManagement
- **Purpose**: SharePoint Online administration
- **Features**:
  - Site collection management
  - Storage utilization tracking
  - Permission management
  - Site templates and provisioning

#### 4. ExchangeManagement
- **Purpose**: Exchange Online administration
- **Features**:
  - Mailbox management
  - Mail flow monitoring
  - Distribution list management
  - Compliance policies

#### 5. OneDriveManagement
- **Purpose**: OneDrive for Business administration
- **Features**:
  - Storage management
  - Sharing policy administration
  - Sync health monitoring
  - Data governance

### User Management Components

#### 1. UserManagement
- **Purpose**: Comprehensive user administration
- **Features**:
  - User CRUD operations
  - Role assignment
  - Activity monitoring
  - Bulk operations

#### 2. RoleManagement
- **Purpose**: Role-based access control system
- **Features**:
  - Custom role creation
  - Permission assignment
  - Access review workflows
  - Privilege escalation

### System Components

#### 1. SystemHealthMonitor
- **Purpose**: NxConsole system health tracking
- **Features**:
  - Performance metrics
  - Uptime monitoring
  - Resource utilization
  - Alert thresholds

#### 2. SystemLogsViewer
- **Purpose**: Centralized logging for NxConsole
- **Features**:
  - Log filtering and search
  - Real-time log streaming
  - Export functionality
  - Retention policies

#### 3. SettingsManager
- **Purpose**: System configuration management
- **Features**:
  - Cloud connector settings
  - Notification preferences
  - Theme management
  - User preferences

#### 4. HelpCenter
- **Purpose**: Comprehensive help and support
- **Features**:
  - Searchable documentation
  - Contextual help
  - Support tickets
  - Knowledge base

### AI Assistant Components

#### 1. ChatWidget
- **Purpose**: Floating AI assistant interface
- **Features**:
  - Natural language processing
  - Contextual help
  - Conversation history
  - Quick access from any page

#### 2. AIHelper
- **Purpose**: Intelligent system assistance
- **Features**:
  - Query processing
  - Task automation suggestions
  - Performance insights
  - Troubleshooting guidance

## Data Models

### Core Types
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: string[];
  lastActivity: Date;
  status: 'active' | 'inactive' | 'suspended';
}

interface CloudAccount {
  id: string;
  name: string;
  platform: 'aws' | 'azure' | 'm365';
  status: 'active' | 'inactive' | 'error';
  region?: string;
  credentials: Record<string, any>;
}

interface CostData {
  period: string;
  total: number;
  breakdown: {
    platform: string;
    amount: number;
    services: ServiceCost[];
  }[];
  forecast?: number;
  trend: 'up' | 'down' | 'stable';
}

interface Resource {
  id: string;
  name: string;
  type: string;
  platform: 'aws' | 'azure' | 'm365';
  region?: string;
  status: string;
  tags: Record<string, string>;
  metadata: Record<string, any>;
  healthScore?: number;
  lastModified: Date;
}

interface SecurityFinding {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  platform: string;
  resource: string;
  description: string;
  remediation: string;
  status: 'open' | 'in_progress' | 'resolved' | 'false_positive';
  assignee?: string;
}

interface License {
  id: string;
  type: string;
  assigned: boolean;
  user?: string;
  lastActivity?: Date;
  cost: number;
  features: string[];
  expirationDate?: Date;
}

interface SystemLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  module: string;
  user?: string;
  action: string;
  details: Record<string, any>;
  ipAddress?: string;
}

interface SystemHealth {
  component: string;
  status: 'healthy' | 'warning' | 'critical';
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    uptime: number;
  };
  lastCheck: Date;
}

interface M365Service {
  name: string;
  type: 'sharepoint' | 'exchange' | 'onedrive' | 'teams';
  status: 'active' | 'degraded' | 'outage';
  users: number;
  storage: {
    used: number;
    total: number;
  };
}

interface PlatformIcon {
  platform: 'aws' | 'azure' | 'gcp' | 'm365';
  service?: string;
  icon: string;
  color: string;
}
```

## Error Handling

### Client-Side Error Handling
- **Error Boundaries**: Wrap major components để catch React errors
- **API Error Handling**: Consistent error response format
- **User Feedback**: Toast notifications cho success/error states
- **Fallback UI**: Loading states và error states cho tất cả components

### Mock API Error Simulation
- **Network Errors**: Simulate connection issues
- **Authentication Errors**: Handle expired sessions
- **Permission Errors**: Simulate access denied scenarios
- **Data Errors**: Handle missing or invalid data

## Testing Strategy

### Component Testing
- **Unit Tests**: Jest + React Testing Library cho individual components
- **Integration Tests**: Test component interactions
- **Visual Tests**: Storybook cho component documentation và testing

### Mock Data Testing
- **Data Consistency**: Ensure mock data matches TypeScript interfaces
- **Edge Cases**: Test với empty states, error states
- **Performance**: Test với large datasets

### User Experience Testing
- **Responsive Design**: Test trên multiple screen sizes
- **Accessibility**: WCAG compliance testing
- **Performance**: Lighthouse audits
- **Cross-browser**: Test trên major browsers

## Implementation Phases

### Phase 1: Core Setup
- Next.js project initialization
- shadcn/ui setup và configuration
- Basic layout components
- Authentication flow simulation

### Phase 2: Dashboard Foundation
- Main dashboard layout
- Navigation system
- Basic metric cards
- Mock data structure

### Phase 3: FinOps Module
- Cost dashboard implementation
- Chart components với Recharts
- Budget tracking features
- Cost analytics

### Phase 4: Resource Management
- Resource inventory table
- Search và filtering
- Resource detail views
- Provisioning forms

### Phase 5: AI & Security Features
- Chatbot interface
- AI insights panels
- Security dashboard
- Compliance tracking

### Phase 6: Microsoft 365 Integration
- License management
- Teams administration
- SharePoint management
- Exchange controls

### Phase 7: Polish & Optimization
- Performance optimization
- Accessibility improvements
- Mobile responsiveness
- Error handling refinement

### Phase 8: Enhanced User Interface and Experience
- Icon-based navigation badges implementation
- Extended search bar với full placeholder visibility
- User Management reorganization to Settings area
- Top navigation bar height alignment với sidebar header
- Language selector implementation (EN/JP/KR)

### Phase 9: Dashboard Enhancement and Monitoring
- Cloud provider widget icons (AWS, Azure, M365, Google)
- System health monitoring charts implementation
- Cost analysis và operational status dashboards
- Google services widgets expansion
- Microsoft Azure dedicated page implementation

### Phase 10: Error Handling and User Experience
- Custom 404 error pages với friendly messaging
- Custom 403 forbidden pages với help information
- Custom 500 server error pages với support contacts
- Consistent error page design với main application

### Phase 11: FinOps Advanced Features
- Multi-level budget management (AWS accounts, GCP projects, Azure subscriptions)
- Primary button functionality implementation
- Cost optimization recommendations
- Budget alerts và threshold management

### Phase 12: Footer and Legal Framework
- NxConsole footer với NTQ branding và copyright 2025
- NTQ logo integration từ public/ntq-logo.svg
- Privacy Policy page implementation
- Terms of Service page implementation
- Privacy Terms page implementation

## Enhanced Component Design

### Icon-Based Navigation Badges
**Design Principle**: Replace text badges với visual icons để improve readability
- **Warning Badge**: ⚠️ icon với amber color
- **New Badge**: ✨ icon với green color
- **Alert Count Badge**: 🔴 icon với number overlay
- **Status Badge**: ⚡ icon với appropriate status color

### Extended Search Bar Design
**Design Principle**: Ensure full placeholder text visibility
- **Desktop**: Minimum width 300px để accommodate "Search resources, users, logs..."
- **Mobile**: Expandable search với tap-to-expand functionality
- **Placeholder**: "Search across all NxConsole services and resources..."

### Language Selector Design
**Design Principle**: Visual flag icons với dropdown menu
- **Position**: Top navigation bar, right side
- **Icons**: 🇺🇸 EN | 🇯🇵 JP | 🇰🇷 KR
- **Dropdown**: Elegant dropdown với country names
- **Persistence**: User preference stored in localStorage

### Enhanced Dashboard Widgets
**Design Principle**: Provider-specific icons với consistent styling
- **AWS Widgets**: Orange AWS icon với service-specific variations
- **Azure Widgets**: Blue Microsoft icon với Azure branding
- **M365 Widgets**: Microsoft 365 icon với service-specific colors
- **Google Widgets**: Multi-color Google icon với service variations

### Custom Error Pages Design
**Design Principle**: Maintain application branding với helpful messaging
- **Layout**: Same header/sidebar structure như main app
- **Illustration**: Custom SVG illustrations cho each error type
- **Actions**: Clear call-to-action buttons để help users proceed
- **Contact**: Support information và helpful links

### Footer Design
**Design Principle**: Professional corporate footer với complete information
- **Logo**: NTQ logo (SVG) với proper sizing
- **Copyright**: "© 2025 NTQ Solution. All rights reserved."
- **Links**: Legal pages, support, documentation
- **Social**: Professional social media links
- **Contact**: Support email và contact information

## 21. Enhanced User Experience and Visual Improvements Design

### 21.1 AI Assistant Page Layout Optimization

**Container Architecture:**
- Main container: `h-screen flex flex-col` để control full viewport height
- Header section: `flex-shrink-0` để maintain fixed height
- Content area: `flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6` 
- Chat section: `flex flex-col h-full` với scrollable message area
- Quick actions: `flex flex-col h-full` với scrollable action list

**Scrolling Behavior:**
- Chat messages: `overflow-y-auto flex-1` trong chat container
- Quick actions: `overflow-y-auto flex-1` trong actions container
- Global scroll: Disabled bằng container height constraints

### 21.2 Logo System Enhancement

**Asset Management:**
- Light mode: `/public/ntq-logo.png` (standard color version)
- Dark mode: `/public/ntq-logow.png` (white/inverted version)
- Format: PNG với transparent background
- Size: Consistent dimensions across usage contexts

**Theme Integration:**
```tsx
const LogoComponent = ({ className }: { className?: string }) => {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/ntq-logow.png' : '/ntq-logo.png';
  return <Image src={logoSrc} alt="NTQ Logo" className={className} />;
};
```

### 21.3 Dashboard Widget Cloud Provider Integration

**Enhanced CloudIcon Component:**
- Support cho Google Cloud Platform icons
- Support cho Google Workspace service icons
- Consistent sizing và styling across providers
- Service-specific icon mapping

**Widget Architecture:**
```tsx
interface CloudProviderWidget {
  provider: 'aws' | 'azure' | 'microsoft365' | 'gcp' | 'google-workspace';
  service?: string;
  icon: ReactElement;
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
}
```

**Provider Coverage:**
- AWS: EC2, S3, Lambda, RDS services
- Azure: Virtual Machines, Storage, Functions
- Microsoft 365: Teams, SharePoint, Exchange, OneDrive
- GCP: Compute Engine, Cloud Storage, Cloud Functions
- Google Workspace: Gmail, Drive, Meet, Calendar

### 21.4 Navigation Badge Layout Fixes

**Flexbox Structure Enhancement:**
```tsx
// Navigation item container
<div className="flex items-center gap-3 w-full">
  <Icon className="flex-shrink-0" />
  <span className="flex-1 min-w-0 truncate">{label}</span>
  <div className="flex items-center gap-1 flex-shrink-0">
    {badge && <IconBadge {...badge} />}
    {hasChildren && <ChevronIcon />}
  </div>
</div>
```

**Badge Sizing:**
- Small badges: `text-xs px-1.5 py-0.5`
- Icon badges: `h-5 w-5` với proper centering
- Minimum width constraints để prevent cutting

### 21.5 Settings Page Service Configuration

**Service Connection Interface:**
```tsx
interface ServiceConfig {
  id: string;
  name: string;
  provider: CloudProvider;
  status: 'connected' | 'disconnected' | 'error' | 'testing';
  endpoint?: string;
  credentials: CredentialConfig;
  testConnection: () => Promise<ConnectionResult>;
}
```

**Configuration UI Components:**
- Service card với status indicator
- Test connection button với loading states
- Configuration wizard với step-by-step guidance
- Validation feedback với specific error messages
- Documentation links cho setup instructions

## Footer Enhancement and Legal Pages Design

### Footer Legal Navigation Component
```typescript
interface FooterLegalProps {
  className?: string;
}

const FooterLegal: React.FC<FooterLegalProps> = ({ className }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="flex items-center space-x-4">
        <Image 
          src="/ntq-logo.png" 
          alt="NTQ Logo" 
          width={24} 
          height={24} 
          className="h-6 w-6 dark:hidden"
          style={{ objectFit: 'contain' }}
        />
        <Image 
          src="/ntq-logow.png" 
          alt="NTQ Logo" 
          width={24} 
          height={24} 
          className="h-6 w-6 hidden dark:block"
          style={{ objectFit: 'contain' }}
        />
        <span className="text-sm text-muted-foreground">
          © 2025 NTQ Solution. All rights reserved.
        </span>
      </div>
      <div className="flex space-x-6 text-sm">
        <Link href="/legal/privacy-policy" className="text-muted-foreground hover:text-primary">
          Privacy Policy
        </Link>
        <Link href="/legal/terms-of-service" className="text-muted-foreground hover:text-primary">
          Terms of Service
        </Link>
        <Link href="/legal/privacy-rights" className="text-muted-foreground hover:text-primary">
          Privacy Rights
        </Link>
      </div>
    </div>
  );
};
```

### Legal Pages Layout Structure
```typescript
interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  lastUpdated,
  children
}) => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
};
```

## Logo Implementation Architecture

### Logo Component Structure
```typescript
interface LogoProps {
  variant: 'main' | 'footer' | 'header';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',      // 24x24 for footer
    md: 'h-8 w-8',      // 32x32 for sidebar
    lg: 'h-16 w-16'     // 64x64 for login
  };

  if (variant === 'main') {
    return (
      <Image
        src="/logo.png"
        alt="NxConsole Logo"
        width={variant === 'footer' ? 24 : 64}
        height={variant === 'footer' ? 24 : 64}
        className={cn(sizeClasses[size], className)}
        style={{ objectFit: 'contain' }}
      />
    );
  }

  return (
    <>
      <Image
        src="/ntq-logo.png"
        alt="NTQ Logo"
        width={24}
        height={24}
        className={cn(sizeClasses[size], "dark:hidden", className)}
        style={{ objectFit: 'contain' }}
      />
      <Image
        src="/ntq-logow.png"
        alt="NTQ Logo"
        width={24}
        height={24}
        className={cn(sizeClasses[size], "hidden dark:block", className)}
        style={{ objectFit: 'contain' }}
      />
    </>
  );
};
```

## AI Assistant Scrolling Architecture

### Container Structure Enhancement
```typescript
const AIAssistantPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 min-h-0">
        {/* Chat Section - 2/3 width */}
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Chat with AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {/* Chat messages */}
                </div>
              </ScrollArea>
              <div className="flex-shrink-0 mt-4">
                {/* Input area */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section - 1/3 width */}
        <div className="flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-3">
                  {/* Quick action buttons */}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
```

## Microsoft Teams Management Enhancement

### Teams-Focused Management Interface
```typescript
// Microsoft 365 Teams Management Design
const TeamsManagementInterface = {
  // Icon System - Use proper Microsoft Teams icons
  icon: "microsoft-teams", // From react-icons/si or lucide-react
  
  // Teams-Specific Management Features
  features: [
    {
      category: "Teams Administration",
      items: [
        { name: "Teams Creation & Settings", icon: "users-plus", path: "/teams/creation" },
        { name: "Team Policies", icon: "shield-check", path: "/teams/policies" },
        { name: "Guest Access Management", icon: "user-plus", path: "/teams/guests" }
      ]
    },
    {
      category: "Channels & Communication",
      items: [
        { name: "Channel Management", icon: "hash", path: "/teams/channels" },
        { name: "Meeting Policies", icon: "video", path: "/teams/meetings" },
        { name: "Messaging Policies", icon: "message-circle", path: "/teams/messaging" }
      ]
    },
    {
      category: "Apps & Integration",
      items: [
        { name: "Teams Apps Governance", icon: "grid", path: "/teams/apps" },
        { name: "Custom App Management", icon: "package", path: "/teams/custom-apps" },
        { name: "Bot Framework", icon: "bot", path: "/teams/bots" }
      ]
    }
  ]
};
```

## Dark Mode UI Improvements

### Notification Components Dark Mode Enhancement
```scss
// Recent Activity & Alerts Dark Mode Styles
.notification-card-dark {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--card-foreground));
  
  .notification-text {
    color: hsl(var(--foreground)); // High contrast text
    opacity: 1; // Remove any opacity that causes wash-out
  }
  
  .notification-meta {
    color: hsl(var(--muted-foreground)); // Proper muted text contrast
  }
}

// Alert Badge Dark Mode
.alert-badge-dark {
  background: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
  border: 1px solid hsl(var(--destructive));
}
```

### Chart Enhancement for Dark Mode
```typescript
// Resource Utilization Chart Dark Mode Optimization
const ResourceUtilizationChart = {
  theme: {
    axis: {
      tick: { 
        fontSize: 12, 
        fill: 'hsl(var(--foreground))', // Dynamic color for both modes
        fontWeight: 500 // Better readability
      },
      label: {
        fill: 'hsl(var(--foreground))',
        fontSize: 11,
        fontWeight: 600
      }
    },
    tooltip: {
      contentStyle: {
        backgroundColor: 'hsl(var(--popover))', // Solid background
        border: '1px solid hsl(var(--border))',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
        backdropFilter: 'none' // Remove transparency
      },
      labelStyle: { 
        color: 'hsl(var(--popover-foreground))',
        fontWeight: 600
      },
      itemStyle: { 
        color: 'hsl(var(--popover-foreground))' 
      }
    }
  }
};

// Cost Forecasting Chart Dark Mode Optimization
const CostForecastingChart = {
  axisLabels: {
    xAxis: {
      label: "Month",
      style: { 
        textAnchor: 'middle', 
        fill: 'hsl(var(--foreground))',
        fontSize: 12,
        fontWeight: 600
      }
    },
    yAxis: {
      label: "Cost (USD)",
      style: { 
        textAnchor: 'middle', 
        fill: 'hsl(var(--foreground))',
        fontSize: 12,
        fontWeight: 600
      }
    }
  }
};
```

### Microsoft 365 Services Navigation Design
```typescript
// Service Navigation Button Component
const ServiceNavigationButton = {
  sharepoint: {
    label: "Manage Sites",
    icon: "folder-tree",
    route: "/dashboard/cloud-management/microsoft/m365/sharepoint",
    description: "SharePoint site administration"
  },
  exchange: {
    label: "Manage Mailboxes", 
    icon: "mail",
    route: "/dashboard/cloud-management/microsoft/m365/exchange",
    description: "Exchange mailbox management"
  },
  onedrive: {
    label: "Manage Storage",
    icon: "cloud-storage",
    route: "/dashboard/cloud-management/microsoft/m365/onedrive", 
    description: "OneDrive storage management"
  }
};

// Button Implementation
const ServiceButton = ({ service, onClick }) => (
  <Button 
    onClick={() => router.push(service.route)}
    className="h-12 bg-slate-800 hover:bg-slate-700 border border-slate-600"
  >
    <Icon name={service.icon} className="mr-2 h-4 w-4" />
    {service.label}
  </Button>
);
```

## Enhanced Chart Styling Consistency

### Reference Chart Standards (System Performance & Service Uptime)
```typescript
// Optimized Chart Configuration Template
const OptimizedChartStyle = {
  cartesianGrid: {
    strokeDasharray: "3 3",
    stroke: "hsl(var(--border))"
  },
  xAxis: {
    tick: { 
      fontSize: 12, 
      fill: 'hsl(var(--foreground))',
      fontWeight: 500
    },
    tickLine: false,
    axisLine: false,
    label: {
      value: "Axis Label",
      position: 'insideBottom',
      offset: -5,
      style: { 
        textAnchor: 'middle', 
        fill: 'hsl(var(--foreground))',
        fontSize: 12,
        fontWeight: 600
      }
    }
  },
  yAxis: {
    tick: { 
      fontSize: 12, 
      fill: 'hsl(var(--foreground))',
      fontWeight: 500
    },
    tickLine: false,
    axisLine: false,
    label: {
      value: "Value Label",
      angle: -90,
      position: 'insideLeft',
      style: { 
        textAnchor: 'middle', 
        fill: 'hsl(var(--foreground))',
        fontSize: 12,
        fontWeight: 600
      }
    }
  },
  tooltip: {
    contentStyle: {
      backgroundColor: 'hsl(var(--popover))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
      backdropFilter: 'none'
    },
    labelStyle: { 
      color: 'hsl(var(--popover-foreground))', 
      fontWeight: 600 
    },
    itemStyle: { 
      color: 'hsl(var(--popover-foreground))' 
    }
  }
};
```

### Resource Utilization Chart Enhancement
```typescript
const ResourceUtilizationChart = {
  styling: {
    xAxis: {
      label: "Cloud Providers",
      optimized: true
    },
    yAxisLeft: {
      label: "Utilization (%)",
      domain: [0, 100]
    },
    yAxisRight: {
      label: "Cost (USD)",
      orientation: "right"
    }
  },
  applyOptimizedStyle: OptimizedChartStyle
};
```

### Cost Forecasting Chart Enhancement  
```typescript
const CostForecastingChart = {
  styling: {
    xAxis: {
      label: "Month",
      dataKey: "month"
    },
    yAxis: {
      label: "Cost (USD)",
      formatters: ["$", "K", "M"]
    }
  },
  applyOptimizedStyle: OptimizedChartStyle
};
```

## Microsoft Teams Premium Management Design

### Teams Premium Integration Architecture
```typescript
// Teams Premium Management Component Structure
const TeamsPremiumManagement = {
  sections: [
    {
      id: "premium-overview",
      title: "Teams Premium Overview",
      features: [
        "Advanced Meeting Features",
        "Intelligent Recap",
        "Custom Backgrounds",
        "Advanced Webinars",
        "Virtual Appointments"
      ]
    },
    {
      id: "premium-licensing",
      title: "Premium Licensing",
      metrics: [
        "Total Premium Licenses",
        "Assigned Premium Licenses", 
        "Premium License Utilization",
        "Premium Features Usage"
      ]
    },
    {
      id: "premium-governance",
      title: "Premium Governance",
      controls: [
        "Meeting Templates",
        "Branded Meeting Experience",
        "Advanced Security Controls",
        "Compliance Recording"
      ]
    }
  ]
};

// Teams Premium Analytics
const TeamsPremiumAnalytics = {
  meetingMetrics: {
    "AI-Generated Recaps": "usage_count",
    "Custom Backgrounds Used": "percentage",
    "Advanced Webinars": "monthly_count",
    "Virtual Appointments": "booking_rate"
  },
  licenseOptimization: {
    "Underutilized Premium Features": "list",
    "Cost per Active Premium User": "currency",
    "ROI on Premium Features": "percentage"
  }
};
```

### Teams Premium Tab Integration
```typescript
// Add to existing Teams Management component
const TeamsManagementTabs = {
  existing: ["teams", "governance", "analytics"],
  new: "premium", // Add Teams Premium tab
  
  premiumTab: {
    label: "Teams Premium",
    icon: "crown", // Premium indicator
    content: "TeamsPremiumManagement"
  }
};
```

## Login Page Simplification Design

### Static Background Implementation
```typescript
// Remove animations from login background
const LoginPageBackground = {
  // Remove: animate-pulse, animate-bounce
  staticElements: {
    cloudIcons: {
      position: "absolute",
      opacity: 0.1,
      // Remove all animation classes
      static: true
    },
    backgroundText: {
      position: "absolute", 
      opacity: 0.05,
      rotation: "fixed", // No dynamic rotation
      static: true
    }
  },
  
  // Keep professional gradient backgrounds
  gradients: {
    light: "from-slate-50 via-blue-50 to-indigo-100",
    dark: "dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
  }
};

// Updated LoginBackground Component
const StaticLoginBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Static Cloud Icons */}
    <Cloud className="absolute top-20 left-20 h-16 w-16 text-blue-200 dark:text-blue-800 opacity-30" />
    <Server className="absolute top-40 right-32 h-12 w-12 text-indigo-200 dark:text-indigo-700 opacity-25" />
    <Database className="absolute top-60 left-40 h-14 w-14 text-purple-200 dark:text-purple-800 opacity-20" />
    
    {/* Static Background Text */}
    <div className="absolute top-16 left-1/4 text-6xl font-bold text-blue-100 dark:text-blue-900 opacity-10 rotate-12 select-none">
      COMPUTE
    </div>
    <div className="absolute top-1/3 right-1/4 text-4xl font-bold text-indigo-100 dark:text-indigo-900 opacity-10 -rotate-12 select-none">
      STORAGE
    </div>
  </div>
);
```

## Chart Tooltip Enhancement Design

### Theme-Aware Background Design
```typescript
const LoginPageBackground = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Theme-aware Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Floating Cloud Service Icons with Dark Mode */}
        <div className="absolute inset-0 overflow-hidden">
          <Cloud className="absolute top-20 left-20 h-16 w-16 text-blue-200 dark:text-blue-800 opacity-30 animate-pulse" />
          <Server className="absolute top-40 right-32 h-12 w-12 text-indigo-200 dark:text-indigo-700 opacity-25 animate-bounce" />
          <Database className="absolute top-60 left-40 h-14 w-14 text-purple-200 dark:text-purple-800 opacity-20 animate-pulse" />
        </div>
        
        {/* Background Service Text with Dark Mode */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-1/4 text-6xl font-bold text-blue-100 dark:text-blue-900 opacity-10 rotate-12 select-none">
            COMPUTE
          </div>
          <div className="absolute top-1/3 right-1/4 text-4xl font-bold text-indigo-100 dark:text-indigo-900 opacity-10 -rotate-12 select-none">
            STORAGE
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Logo Card Dark Mode Enhancement
```typescript
const LoginLogo = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg dark:shadow-slate-700/50">
        <Image
          src="/logo.png"
          alt="NxConsole Logo"
          width={64}
          height={64}
          className="h-16 w-16"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};
```

**Service Coverage:**
- AWS: Access keys, IAM roles, region configuration
- Azure: Subscription ID, tenant ID, service principal
- Microsoft 365: App registration, permissions, tenant setup
- GCP: Service account keys, project ID
- Google Workspace: OAuth setup, domain verification