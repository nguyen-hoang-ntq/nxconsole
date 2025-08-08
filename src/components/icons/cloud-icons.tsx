import React from 'react';
import {
  // Amazon/AWS icons
  SiAmazon,
  SiAmazonec2,
  SiAmazons3,
  SiAwslambda,
  SiAmazondynamodb,
  SiAmazonecs,
  
  // Google/GCP icons
  SiGoogle,
  SiGooglecloud,
  SiGooglebigquery,
  
  // General cloud icons
  SiCloudflare,
} from 'react-icons/si';

import {
  // Microsoft and additional icons
  FaCloud,
  FaServer,
  FaDatabase,
  FaCode,
  FaCogs,
  FaMicrosoft,
  FaEnvelope,
  FaShareAlt,
  FaUsers,
  FaFolder,
} from 'react-icons/fa';

import { VscAzure } from "react-icons/vsc";

export interface CloudIconProps {
  provider: 'microsoft' | 'amazon' | 'google';
  service?: string;
  size?: number;
  className?: string;
}

export const CloudIcon: React.FC<CloudIconProps> = ({
  provider,
  service,
  size = 20,
  className = ''
}) => {
  const iconProps = {
    size,
    className
  };

  switch (provider) {
    case 'microsoft':
      switch (service) {
        case 'azure':
          return <VscAzure {...iconProps} style={{ color: '#0078d4' }} />;
        case 'teams':
          return <FaUsers {...iconProps} style={{ color: '#6264a7' }} />;
        case 'sharepoint':
          return <FaShareAlt {...iconProps} style={{ color: '#0078d4' }} />;
        case 'exchange':
        case 'outlook':
          return <FaEnvelope {...iconProps} style={{ color: '#0078d4' }} />;
        case 'onedrive':
          return <FaFolder {...iconProps} style={{ color: '#0078d4' }} />;
        default:
          return <FaMicrosoft {...iconProps} style={{ color: '#00bcf2' }} />;
      }
    
    case 'amazon':
      switch (service) {
        case 'aws':
          return <SiAmazon {...iconProps} style={{ color: '#ff9900' }} />;
        case 'ec2':
          return <SiAmazonec2 {...iconProps} style={{ color: '#ff9900' }} />;
        case 's3':
          return <SiAmazons3 {...iconProps} style={{ color: '#ff9900' }} />;
        case 'lambda':
          return <SiAwslambda {...iconProps} style={{ color: '#ff9900' }} />;
        case 'rds':
        case 'dynamodb':
          return <SiAmazondynamodb {...iconProps} style={{ color: '#ff9900' }} />;
        case 'ecs':
          return <SiAmazonecs {...iconProps} style={{ color: '#ff9900' }} />;
        case 'cloudformation':
          return <FaCogs {...iconProps} style={{ color: '#ff9900' }} />;
        default:
          return <SiAmazon {...iconProps} style={{ color: '#ff9900' }} />;
      }
    
    case 'google':
      switch (service) {
        case 'gcp':
        case 'cloud':
          return <SiGooglecloud {...iconProps} style={{ color: '#4285f4' }} />;
        case 'compute':
          return <FaServer {...iconProps} style={{ color: '#4285f4' }} />;
        case 'storage':
        case 'bigquery':
          return <SiGooglebigquery {...iconProps} style={{ color: '#4285f4' }} />;
        case 'admin':
          return <FaCogs {...iconProps} style={{ color: '#4285f4' }} />;
        default:
          return <SiGoogle {...iconProps} style={{ color: '#4285f4' }} />;
      }
    
    default:
      return <FaCloud {...iconProps} />;
  }
};

// Preset icon components for easy usage
export const MicrosoftIcon = (props: Omit<CloudIconProps, 'provider'>) => (
  <CloudIcon provider="microsoft" {...props} />
);

export const AzureIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="microsoft" service="azure" {...props} />
);

export const TeamsIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="microsoft" service="teams" {...props} />
);

export const SharePointIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="microsoft" service="sharepoint" {...props} />
);

export const ExchangeIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="microsoft" service="exchange" {...props} />
);

export const OneDriveIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="microsoft" service="onedrive" {...props} />
);

export const AmazonIcon = (props: Omit<CloudIconProps, 'provider'>) => (
  <CloudIcon provider="amazon" {...props} />
);

export const AWSIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="amazon" service="aws" {...props} />
);

export const EC2Icon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="amazon" service="ec2" {...props} />
);

export const S3Icon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="amazon" service="s3" {...props} />
);

export const LambdaIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="amazon" service="lambda" {...props} />
);

export const RDSIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="amazon" service="rds" {...props} />
);

export const CloudFormationIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="amazon" service="cloudformation" {...props} />
);

export const GoogleIcon = (props: Omit<CloudIconProps, 'provider'>) => (
  <CloudIcon provider="google" {...props} />
);

export const GCPIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="google" service="gcp" {...props} />
);

export const ComputeEngineIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="google" service="compute" {...props} />
);

export const CloudStorageIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="google" service="storage" {...props} />
);

export const GoogleAdminIcon = (props: Omit<CloudIconProps, 'provider' | 'service'>) => (
  <CloudIcon provider="google" service="admin" {...props} />
);
