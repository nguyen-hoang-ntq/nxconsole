# NxConsole - Enterprise Cloud Management Platform

A comprehensive Next.js-based cloud management platform for enterprise infrastructure, built with TypeScript and modern UI components.

## Features

### 🏠 Dashboard & Overview
- Real-time infrastructure monitoring
- Cost analysis and optimization insights
- Security status and compliance tracking
- Multi-cloud resource management (AWS, Azure, GCP, Microsoft 365)

### 💰 FinOps & Cost Management
- Detailed cost breakdowns by service, region, and department
- Budget monitoring with alerts and forecasting
- Resource optimization recommendations
- Cost allocation and chargeback reports

### 🔐 Security & Compliance
- Security posture dashboard with compliance scores
- Vulnerability management and remediation tracking
- Access control and audit logging
- Policy enforcement and drift detection

### 🤖 AI-Powered Insights
- Intelligent cost optimization recommendations
- Automated security threat detection
- Performance optimization suggestions
- Predictive analytics for capacity planning

### 👥 User Management & RBAC
- Comprehensive user directory with role-based access control
- Permission matrix management
- Audit logging with IP tracking and activity monitoring
- User creation and status management

### ⚙️ System Administration
- **Settings Management**: Cloud connector configurations, notification preferences, theme selection
- **Help & Support**: Knowledge base with searchable articles, video tutorials, support ticketing system
- **System Logs**: Multi-level logging (System/Application/Audit) with filtering and search capabilities
- **Profile Management**: User preferences, account settings, activity tracking

### 🤖 AI Assistant
- Interactive chatbot for infrastructure guidance with independent scrolling
- Contextual help and troubleshooting
- Code generation for infrastructure automation
- Quick actions and intelligent suggestions

### 📋 Legal & Compliance Framework
- **Privacy Policy**: Comprehensive data handling and privacy protection guidelines
- **Terms of Service**: Service usage terms and user responsibilities
- **Privacy Rights**: GDPR compliance and user data rights information
- **Footer Integration**: Easy access to legal documents via footer navigation

### 🎨 Enhanced User Experience
- **Logo System**: Professional PNG-based logo implementation with proper aspect ratios
- **Dark Mode Support**: Complete dark theme integration including login page
- **Responsive Design**: Optimized layouts for all screen sizes
- **Accessibility**: WCAG compliant interface design

## Technology Stack

- **Frontend**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Font**: Geist Mono
- **Development**: Turbopack for fast builds

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── ai-assistant/     # AI chatbot interface
│   │   ├── ai-insights/      # AI-powered recommendations
│   │   ├── finops/          # Cost management
│   │   ├── help/            # Help & support system
│   │   ├── logs/            # System logging
│   │   ├── m365/            # Microsoft 365 management
│   │   ├── notifications/    # Notification center
│   │   ├── profile/         # User profile management
│   │   ├── resources/       # Resource management
│   │   ├── security/        # Security dashboard
│   │   ├── settings/        # System settings
│   │   └── users/           # User management
│   └── layout.tsx
├── components/
│   ├── navigation/          # Sidebar and navigation
│   ├── ui/                  # Reusable UI components
│   └── dashboard/           # Dashboard-specific components
└── lib/
    └── utils.ts             # Utility functions
```

## Key Pages

- **Dashboard**: Main overview with KPIs and status widgets
- **FinOps**: Cost analysis, budgets, and optimization recommendations
- **Resources**: Multi-cloud resource inventory and management
- **Security**: Security posture, vulnerabilities, and compliance
- **AI Assistant**: Interactive chatbot with independent scrolling sections
- **Profile**: User account management and preferences
- **Users**: RBAC user management with permissions matrix
- **Settings**: Cloud configurations and system preferences
- **Help**: Knowledge base, tutorials, and support ticketing
- **Logs**: System monitoring with comprehensive audit trails
- **Legal Pages**: Privacy policy, terms of service, and privacy rights documentation

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nxconsole-prototype
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Component Development

All UI components are built using shadcn/ui and follow consistent patterns:
- Responsive design with mobile-first approach
- Dark/light theme support
- Accessibility-compliant (WCAG 2.1)
- TypeScript strict mode compliance

### Adding New Features

1. Create page components in `src/app/dashboard/[feature]/`
2. Add UI components to `src/components/ui/` if reusable
3. Update navigation in `src/components/navigation/app-sidebar.tsx`
4. Follow existing patterns for consistency

## Architecture Highlights

### Design System
- Consistent color palette with improved badge contrast
- Platform-specific icons for AWS, Azure, GCP, and Microsoft 365
- Geist Mono font for better readability
- Responsive grid layouts with mobile optimization

### State Management
- React Context API for global state
- Form state management with controlled components
- Mock data integration for demonstration purposes

### UI Patterns
- Tabbed interfaces for complex features
- Card-based layouts for content organization
- Table components with sorting and filtering
- Modal dialogs for user interactions
- Badge system for status indicators

### Administrative Features
- Comprehensive settings management
- Multi-level system logging
- Role-based access control (RBAC)
- Help system with knowledge base
- Support ticketing integration

## Deployment

The application can be deployed on any platform that supports Next.js:

### Vercel (Recommended)
```bash
vercel --prod
```

### Docker
```bash
docker build -t nxconsole .
docker run -p 3000:3000 nxconsole
```

### Static Export
```bash
npm run build
npm run export
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software developed for enterprise cloud management.

## Support

For support and questions:
- Check the Help & Support section in the application
- Review the knowledge base articles
- Submit support tickets through the integrated ticketing system
- Contact the development team for technical assistance
