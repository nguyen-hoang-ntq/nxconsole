// Pillar-specific color schemes for consistent theming across the application

export const pillarColors = {
  // Main pillars
  cost: {
    primary: '#10B981', // green-500
    light: '#D1FAE5',   // green-100
    dark: '#047857',    // green-700
    border: '#6EE7B7',  // green-300
    text: '#065F46',    // green-800
  },
  resource: {
    primary: '#3B82F6', // blue-500
    light: '#DBEAFE',   // blue-100
    dark: '#1D4ED8',    // blue-700
    border: '#93C5FD',  // blue-300
    text: '#1E3A8A',    // blue-800
  },
  performance: {
    primary: '#F59E0B', // amber-500
    light: '#FEF3C7',   // amber-100
    dark: '#D97706',    // amber-700
    border: '#FCD34D',  // amber-300
    text: '#92400E',    // amber-800
  },
  security: {
    primary: '#EF4444', // red-500
    light: '#FEE2E2',   // red-100
    dark: '#DC2626',    // red-700
    border: '#FCA5A5',  // red-300
    text: '#991B1B',    // red-800
  },
} as const;

export const serviceColors = {
  compute: {
    primary: '#8B5CF6', // purple-500
    light: '#EDE9FE',   // purple-100
    dark: '#7C3AED',    // purple-700
    border: '#C4B5FD',  // purple-300
    text: '#5B21B6',    // purple-800
  },
  networking: {
    primary: '#06B6D4', // cyan-500
    light: '#CFFAFE',   // cyan-100
    dark: '#0891B2',    // cyan-700
    border: '#67E8F9',  // cyan-300
    text: '#164E63',    // cyan-800
  },
  storage: {
    primary: '#84CC16', // lime-500
    light: '#ECFCCB',   // lime-100
    dark: '#65A30D',    // lime-700
    border: '#BEF264',  // lime-300
    text: '#365314',    // lime-800
  },
  otherServices: {
    primary: '#6B7280', // gray-500
    light: '#F3F4F6',   // gray-100
    dark: '#4B5563',    // gray-700
    border: '#D1D5DB',  // gray-300
    text: '#374151',    // gray-800
  },
} as const;

export const statusColors = {
  healthy: {
    primary: '#10B981', // green-500
    light: '#D1FAE5',   // green-100
    dark: '#047857',    // green-700
    text: '#065F46',    // green-800
  },
  warning: {
    primary: '#F59E0B', // amber-500
    light: '#FEF3C7',   // amber-100
    dark: '#D97706',    // amber-700
    text: '#92400E',    // amber-800
  },
  error: {
    primary: '#EF4444', // red-500
    light: '#FEE2E2',   // red-100
    dark: '#DC2626',    // red-700
    text: '#991B1B',    // red-800
  },
  info: {
    primary: '#3B82F6', // blue-500
    light: '#DBEAFE',   // blue-100
    dark: '#1D4ED8',    // blue-700
    text: '#1E3A8A',    // blue-800
  },
} as const;

export const cloudProviderColors = {
  aws: {
    primary: '#FF9900',
    secondary: '#232F3E',
    light: '#FFF3E0',
    text: '#FF9900',
  },
  azure: {
    primary: '#0078D4',
    secondary: '#005A9F',
    light: '#E3F2FD',
    text: '#0078D4',
  },
  gcp: {
    primary: '#4285F4',
    secondary: '#34A853',
    light: '#E8F0FE',
    text: '#4285F4',
  },
  microsoft: {
    primary: '#00BCF2',
    secondary: '#0078D4',
    light: '#E3F2FD',
    text: '#0078D4',
  },
} as const;

// Helper functions to get colors
export function getPillarColor(pillar: keyof typeof pillarColors, shade: keyof typeof pillarColors.cost = 'primary') {
  return pillarColors[pillar][shade];
}

export function getServiceColor(service: keyof typeof serviceColors, shade: keyof typeof serviceColors.compute = 'primary') {
  return serviceColors[service][shade];
}

export function getStatusColor(status: keyof typeof statusColors, shade: keyof typeof statusColors.healthy = 'primary') {
  return statusColors[status][shade];
}

export function getCloudProviderColor(provider: keyof typeof cloudProviderColors, shade: keyof typeof cloudProviderColors.aws = 'primary') {
  return cloudProviderColors[provider][shade];
}

// CSS class mappings for Tailwind
export const pillarTailwindClasses = {
  cost: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    accent: 'text-green-700',
    icon: 'text-green-600',
  },
  resource: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    accent: 'text-blue-700',
    icon: 'text-blue-600',
  },
  performance: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-600',
    accent: 'text-amber-700',
    icon: 'text-amber-600',
  },
  security: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    accent: 'text-red-700',
    icon: 'text-red-600',
  },
} as const;

export const serviceTailwindClasses = {
  compute: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    accent: 'text-purple-700',
    icon: 'text-purple-600',
  },
  networking: {
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-600',
    accent: 'text-cyan-700',
    icon: 'text-cyan-600',
  },
  storage: {
    bg: 'bg-lime-50',
    border: 'border-lime-200',
    text: 'text-lime-600',
    accent: 'text-lime-700',
    icon: 'text-lime-600',
  },
  otherServices: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-600',
    accent: 'text-gray-700',
    icon: 'text-gray-600',
  },
} as const;
