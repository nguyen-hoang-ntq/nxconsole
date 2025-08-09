'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
  Server,
  Settings,
  Shield,
  DollarSign,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProvisioningFormProps {
  onClose?: () => void;
}

const steps = [
  { id: 'basic', title: 'Basic Configuration', icon: Server },
  { id: 'advanced', title: 'Advanced Settings', icon: Settings },
  { id: 'security', title: 'Security & Access', icon: Shield },
  { id: 'review', title: 'Review & Deploy', icon: Check }
];

const platforms = [
  { id: 'aws', name: 'Amazon Web Services', regions: ['us-east-1', 'us-west-2', 'eu-west-1'] },
  { id: 'azure', name: 'Microsoft Azure', regions: ['East US', 'West US 2', 'West Europe'] },
  { id: 'gcp', name: 'Google Cloud Platform', regions: ['us-central1', 'us-west1', 'europe-west1'] }
];

const instanceTypes = {
  aws: ['t3.micro', 't3.small', 't3.medium', 'm5.large', 'm5.xlarge'],
  azure: ['Standard_B1s', 'Standard_B2s', 'Standard_D2s_v3', 'Standard_D4s_v3'],
  gcp: ['e2-micro', 'e2-small', 'e2-medium', 'n1-standard-1', 'n1-standard-2']
};

export function ProvisioningForm({ onClose }: ProvisioningFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Configuration
    name: '',
    platform: '',
    region: '',
    instanceType: '',
    osImage: '',
    storage: '20',
    
    // Advanced Settings
    autoScaling: false,
    monitoring: true,
    backup: true,
    tags: [] as Array<{ key: string; value: string }>,
    
    // Security & Access
    securityGroup: '',
    keyPair: '',
    publicAccess: false,
    
    // Approval
    approvalRequired: true,
    priority: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const updateFormData = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, { key: '', value: '' }]
    }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const updateTag = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => 
        i === index ? { ...tag, [field]: value } : tag
      )
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const selectedPlatform = platforms.find(p => p.id === formData.platform);
  const availableInstanceTypes = formData.platform ? instanceTypes[formData.platform as keyof typeof instanceTypes] || [] : [];

  if (isComplete) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Resource Provisioning Submitted</h3>
          <p className="text-muted-foreground mb-6">
            Your resource &quot;{formData.name}&quot; has been submitted for {formData.approvalRequired ? 'approval' : 'deployment'}.
            You will receive a notification when the process is complete.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Request ID:</span>
              <span className="font-mono">REQ-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated completion:</span>
              <span>15-20 minutes</span>
            </div>
          </div>
          <Button onClick={onClose} className="mt-6">
            Close
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Provision New Resource
        </CardTitle>
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mt-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2',
                  isActive && 'border-primary bg-primary text-primary-foreground',
                  isCompleted && 'border-green-500 bg-green-500 text-white',
                  !isActive && !isCompleted && 'border-muted bg-background text-muted-foreground'
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    'h-0.5 w-20 mx-2',
                    isCompleted ? 'bg-green-500' : 'bg-muted'
                  )} />
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-4">
          <h3 className="font-medium">{steps[currentStep].title}</h3>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Step 1: Basic Configuration */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Resource Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., web-server-prod"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform">Platform *</Label>
                <Select value={formData.platform} onValueChange={(value) => updateFormData('platform', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map(platform => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Select 
                  value={formData.region} 
                  onValueChange={(value) => updateFormData('region', value)}
                  disabled={!formData.platform}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedPlatform?.regions.map(region => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instanceType">Instance Type *</Label>
                <Select 
                  value={formData.instanceType} 
                  onValueChange={(value) => updateFormData('instanceType', value)}
                  disabled={!formData.platform}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select instance type" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableInstanceTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="osImage">Operating System *</Label>
                <Select value={formData.osImage} onValueChange={(value) => updateFormData('osImage', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select OS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ubuntu-22.04">Ubuntu 22.04 LTS</SelectItem>
                    <SelectItem value="ubuntu-20.04">Ubuntu 20.04 LTS</SelectItem>
                    <SelectItem value="windows-2022">Windows Server 2022</SelectItem>
                    <SelectItem value="centos-8">CentOS 8</SelectItem>
                    <SelectItem value="amazon-linux-2">Amazon Linux 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storage">Storage (GB) *</Label>
                <Input
                  id="storage"
                  type="number"
                  placeholder="20"
                  value={formData.storage}
                  onChange={(e) => updateFormData('storage', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Advanced Settings */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Scaling</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically scale based on demand
                  </p>
                </div>
                <Switch
                  checked={formData.autoScaling}
                  onCheckedChange={(checked: boolean) => updateFormData('autoScaling', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Monitoring</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed monitoring and alerting
                  </p>
                </div>
                <Switch
                  checked={formData.monitoring}
                  onCheckedChange={(checked: boolean) => updateFormData('monitoring', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automated Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily automated backups with 7-day retention
                  </p>
                </div>
                <Switch
                  checked={formData.backup}
                  onCheckedChange={(checked: boolean) => updateFormData('backup', checked)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Tags</Label>
                <Button type="button" variant="outline" size="sm" onClick={addTag}>
                  Add Tag
                </Button>
              </div>
              
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Key"
                    value={tag.key}
                    onChange={(e) => updateTag(index, 'key', e.target.value)}
                  />
                  <Input
                    placeholder="Value"
                    value={tag.value}
                    onChange={(e) => updateTag(index, 'value', e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeTag(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Security & Access */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="securityGroup">Security Group</Label>
                <Select 
                  value={formData.securityGroup} 
                  onValueChange={(value) => updateFormData('securityGroup', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select or create new" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Security Group</SelectItem>
                    <SelectItem value="web-servers">Web Servers Group</SelectItem>
                    <SelectItem value="database">Database Group</SelectItem>
                    <SelectItem value="create-new">Create New Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keyPair">Key Pair</Label>
                <Select 
                  value={formData.keyPair} 
                  onValueChange={(value) => updateFormData('keyPair', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select key pair" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="my-keypair">my-keypair</SelectItem>
                    <SelectItem value="prod-keypair">prod-keypair</SelectItem>
                    <SelectItem value="dev-keypair">dev-keypair</SelectItem>
                    <SelectItem value="create-new">Create New Key Pair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Public Internet Access</Label>
                <p className="text-sm text-muted-foreground">
                  Allow access from the internet (assign public IP)
                </p>
              </div>
              <Switch
                checked={formData.publicAccess}
                onCheckedChange={(checked: boolean) => updateFormData('publicAccess', checked)}
              />
            </div>

            {formData.publicAccess && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">Security Warning</p>
                    <p className="text-yellow-700">
                      Enabling public access will make this resource accessible from the internet. 
                      Ensure proper security groups and access controls are configured.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review & Deploy */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium">Configuration Summary</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Resource Name:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform:</span>
                  <span className="font-medium">{formData.platform?.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Region:</span>
                  <span className="font-medium">{formData.region}</span>
                </div>
                <div className="flex justify-between">
                  <span>Instance Type:</span>
                  <span className="font-medium">{formData.instanceType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage:</span>
                  <span className="font-medium">{formData.storage} GB</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Submit for manager approval before deployment
                  </p>
                </div>
                <Switch
                  checked={formData.approvalRequired}
                  onCheckedChange={(checked: boolean) => updateFormData('approvalRequired', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value) => updateFormData('priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="normal">Normal Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <DollarSign className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Estimated Cost</p>
                  <p className="text-blue-700">
                    Monthly cost: ~$45.60 (based on selected configuration)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Deployment Time</p>
                  <p className="text-yellow-700">
                    Estimated deployment time: 15-20 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <Check className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
