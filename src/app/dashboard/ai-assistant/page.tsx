'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Clock,
  Zap,
  BookOpen,
  Code,
  Cloud,
  DollarSign,
  Settings,
  User,
  Paperclip,
  Trash2,
  Download
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface Suggestion {
  id: string;
  text: string;
  icon: React.ReactNode;
  category: string;
}

const quickSuggestions: Suggestion[] = [
  {
    id: '1',
    text: 'Show me AWS cost optimization recommendations',
    icon: <DollarSign className="h-4 w-4" />,
    category: 'Cost Management'
  },
  {
    id: '2',
    text: 'How to configure Azure Active Directory SSO?',
    icon: <Settings className="h-4 w-4" />,
    category: 'Configuration'
  },
  {
    id: '3',
    text: 'Generate Terraform code for multi-region deployment',
    icon: <Code className="h-4 w-4" />,
    category: 'Infrastructure'
  },
  {
    id: '4',
    text: 'List all users with admin permissions',
    icon: <User className="h-4 w-4" />,
    category: 'User Management'
  },
  {
    id: '5',
    text: 'Explain the latest security vulnerabilities',
    icon: <BookOpen className="h-4 w-4" />,
    category: 'Security'
  },
  {
    id: '6',
    text: 'Create a backup strategy for production workloads',
    icon: <Cloud className="h-4 w-4" />,
    category: 'Backup & Recovery'
  }
];

const mockResponses = {
  'cost': 'Based on your current AWS usage, here are the top cost optimization opportunities:\n\n1. **Reserved Instances**: You can save ~40% on EC2 costs by purchasing RIs for your stable workloads\n2. **Rightsizing**: 15 instances are over-provisioned and could be downsized\n3. **Storage Optimization**: Move infrequently accessed data to IA storage class\n\nEstimated monthly savings: $2,847',
  'azure': 'To configure Azure Active Directory SSO:\n\n1. Navigate to Azure AD > Enterprise Applications\n2. Click "New Application" > "Create your own application"\n3. Configure SAML-based sign-on:\n   - Identifier: https://your-app.com\n   - Reply URL: https://your-app.com/sso/callback\n4. Download the certificate and configure your application\n5. Test the SSO connection\n\nWould you like me to generate the specific configuration for your environment?',
  'terraform': '```hcl\n# Multi-region Terraform deployment\nterraform {\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"\n      version = "~> 5.0"\n    }\n  }\n}\n\nprovider "aws" {\n  alias  = "primary"\n  region = "us-east-1"\n}\n\nprovider "aws" {\n  alias  = "secondary"\n  region = "us-west-2"\n}\n\nmodule "primary_infrastructure" {\n  source = "./modules/infrastructure"\n  providers = {\n    aws = aws.primary\n  }\n  region = "us-east-1"\n}\n\nmodule "secondary_infrastructure" {\n  source = "./modules/infrastructure"\n  providers = {\n    aws = aws.secondary\n  }\n  region = "us-west-2"\n}\n```',
  'users': 'Here are all users with admin permissions:\n\n**System Administrators (5 users)**\n• John Doe (john.doe@company.com) - Super Admin\n• Sarah Wilson (sarah.wilson@company.com) - Admin\n• Mike Chen (mike.chen@company.com) - Admin\n• Lisa Rodriguez (lisa.rodriguez@company.com) - Admin\n• David Kim (david.kim@company.com) - Admin\n\n**Security Note**: All admin users have MFA enabled and last accessed within 24 hours. Would you like to review their specific permissions or audit their recent activities?',
  'security': 'Latest security vulnerabilities affecting your infrastructure:\n\n🔴 **Critical (2)**\n• CVE-2024-12345: OpenSSL remote code execution (affects 12 servers)\n• CVE-2024-12346: Docker runtime privilege escalation\n\n🟡 **High (5)**\n• CVE-2024-12347: Kubernetes API server DoS\n• CVE-2024-12348: PostgreSQL authentication bypass\n\n**Recommended Actions:**\n1. Apply OpenSSL patches immediately\n2. Update Docker runtime to v24.0.7\n3. Schedule maintenance window for Kubernetes updates\n\nWould you like me to generate remediation scripts?',
  'backup': 'Here\'s a comprehensive backup strategy for your production workloads:\n\n**RTO/RPO Requirements**\n• Critical: RTO 1 hour, RPO 15 minutes\n• Important: RTO 4 hours, RPO 1 hour\n• Standard: RTO 24 hours, RPO 4 hours\n\n**Backup Strategy**\n1. **Database Backups**: Automated daily backups + transaction log backups every 15 minutes\n2. **Application Data**: Incremental backups every 4 hours\n3. **System Images**: Weekly AMI snapshots\n4. **Cross-region Replication**: Sync to secondary region every hour\n\n**Cost**: ~$1,200/month for full protection\n\nWould you like me to create the implementation plan?'
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI Assistant for cloud infrastructure management. I can help you with cost optimization, security analysis, configuration guidance, and much more. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('optimization') || lowerMessage.includes('aws')) {
      return mockResponses.cost;
    } else if (lowerMessage.includes('azure') || lowerMessage.includes('sso') || lowerMessage.includes('active directory')) {
      return mockResponses.azure;
    } else if (lowerMessage.includes('terraform') || lowerMessage.includes('infrastructure') || lowerMessage.includes('deployment')) {
      return mockResponses.terraform;
    } else if (lowerMessage.includes('user') || lowerMessage.includes('admin') || lowerMessage.includes('permission')) {
      return mockResponses.users;
    } else if (lowerMessage.includes('security') || lowerMessage.includes('vulnerability') || lowerMessage.includes('cve')) {
      return mockResponses.security;
    } else if (lowerMessage.includes('backup') || lowerMessage.includes('recovery') || lowerMessage.includes('strategy')) {
      return mockResponses.backup;
    }
    
    return `I understand you're asking about "${userMessage}". Let me analyze your infrastructure and provide specific recommendations. This might include:\n\n• Configuration best practices\n• Cost optimization opportunities\n• Security compliance checks\n• Performance improvements\n\nWould you like me to focus on any specific area?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.text);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: 'Hello! I\'m your AI Assistant for cloud infrastructure management. I can help you with cost optimization, security analysis, configuration guidance, and much more. How can I assist you today?',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-6 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
            <Bot className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">Your intelligent cloud infrastructure companion</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearChat}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content Area - Fixed height with scrolling */}
      <div className="flex-1 min-h-0 p-6">
        <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Suggestions - Fixed height with scroll */}
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader className="flex-shrink-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 p-0">
              <ScrollArea className="h-[calc(100vh-20rem)] px-6">
                <div className="space-y-3 pb-6">
                  {quickSuggestions.map((suggestion) => (
                    <Button
                      key={suggestion.id}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3 text-left whitespace-normal"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex flex-col items-start gap-2 w-full">
                        <div className="flex items-center gap-2">
                          {suggestion.icon}
                          <Badge variant="outline" className="text-xs">
                            {suggestion.category}
                          </Badge>
                        </div>
                        <span className="text-sm leading-relaxed break-words">{suggestion.text}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
        </Card>

        {/* Chat Interface - Fixed height with scroll */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader className="flex-shrink-0 pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>Chat with AI Assistant</span>
              <Badge variant="outline" className="text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </CardTitle>
          </CardHeader>
          
          {/* Messages - Fixed height with scroll */}
          <CardContent className="flex-1 min-h-0 flex flex-col p-0">
            <div className="flex-1 min-h-0 px-6">
              <ScrollArea className="h-[calc(100vh-26rem)]">
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'assistant' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
                          <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 dark:bg-blue-700 text-white ml-auto'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        
                        {message.type === 'assistant' && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {message.type === 'user' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
                        <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              </ScrollArea>
            </div>
            
            {/* Input Area - Fixed at bottom */}
            <div className="border-t pt-4 mt-4 px-6 pb-6 flex-shrink-0">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about your infrastructure, costs, security, or anything else..."
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={toggleVoiceInput}
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4 text-red-500" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Response time: ~2s
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
