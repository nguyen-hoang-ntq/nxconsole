'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Send, 
  Bot, 
  User, 
  MessageSquare,
  Lightbulb,
  TrendingUp,
  Shield,
  DollarSign,
  Server,
  Sparkles,
  AlertTriangle,
  Database,
  Globe,
  CheckCircle
} from 'lucide-react';
import { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';
import { ServiceIcon } from '@/components/icons/service-icons';

interface ChatBotProps {
  className?: string;
}

const suggestedQueries = [
  {
    icon: DollarSign,
    text: "Show me cost optimization opportunities",
    category: "FinOps"
  },
  {
    icon: Shield,
    text: "What are the top security risks in my environment?",
    category: "Security"
  },
  {
    icon: Server,
    text: "Which resources are underutilized?",
    category: "Resources"
  },
  {
    icon: TrendingUp,
    text: "Predict next month's cloud spend",
    category: "Analytics"
  }
];

const aiResponses = {
  cost: [
    "Based on your usage patterns, I've identified several cost optimization opportunities:",
    "• 3 EC2 instances are running idle with <5% CPU utilization - potential savings: $450/month",
    "• Consider Reserved Instances for your production workloads - potential savings: $1,200/month", 
    "• 2 EBS volumes are unattached and can be safely deleted - savings: $80/month",
    "• Your development environment could benefit from scheduled start/stop - savings: $300/month"
  ],
  security: [
    "I've analyzed your security posture and found these priority items:",
    "• Critical: 2 S3 buckets have public read access - immediate action required",
    "• High: 5 EC2 instances missing security patches",
    "• Medium: MFA not enabled for 3 IAM users",
    "• Low: 2 unused security groups can be cleaned up",
    "Would you like me to provide remediation steps for any of these issues?"
  ],
  resources: [
    "Here's what I found regarding underutilized resources:",
    "• Compute: 4 instances with avg CPU <10% over last 30 days",
    "• Storage: 250GB of unused EBS storage across 6 volumes", 
    "• Network: 2 load balancers with minimal traffic",
    "• Recommendation: Consider rightsizing or scheduling these resources",
    "I can help you create an optimization plan if you'd like."
  ],
  prediction: [
    "Based on current trends and usage patterns, here's my forecast:",
    "• Next Month Projection: $48,200 (+5.5% from current)",
    "• Key Drivers: Increased EC2 usage in development environment",
    "• Budget Alert: You're on track to exceed budget by 8%",
    "• Recommendations: Consider implementing auto-scaling policies",
    "Would you like me to suggest specific optimization strategies?"
  ],
  default: [
    "I'm here to help you with cloud management insights! I can assist with:",
    "• Cost optimization and budget management",
    "• Security posture and compliance monitoring", 
    "• Resource utilization and performance analysis",
    "• Predictive analytics and forecasting",
    "What would you like to explore today?"
  ]
};

export function ChatBot({ className }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI assistant for cloud management. I can help you with cost optimization, security insights, resource analysis, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getAIResponse = (userMessage: string): string[] => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('cost') || message.includes('optimization') || message.includes('spend')) {
      return aiResponses.cost;
    } else if (message.includes('security') || message.includes('risk') || message.includes('threat')) {
      return aiResponses.security;
    } else if (message.includes('resource') || message.includes('utiliz') || message.includes('performance')) {
      return aiResponses.resources;
    } else if (message.includes('predict') || message.includes('forecast') || message.includes('trend')) {
      return aiResponses.prediction;
    } else {
      return aiResponses.default;
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Add AI response
    const responseContent = getAIResponse(text);
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseContent.join('\n\n'),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSuggestedQuery = (query: string) => {
    handleSendMessage(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={cn("flex flex-col h-full max-h-[calc(100vh-12rem)]", className)}>
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <div className="relative">
            <Bot className="h-5 w-5" />
            <Sparkles className="h-2 w-2 absolute -top-1 -right-1 text-blue-500" />
          </div>
          AI Assistant
          <Badge variant="secondary" className="ml-auto">
            Online
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        {/* Suggested Queries - Show when conversation is new */}
        {messages.length === 1 && (
          <div className="p-4 border-b flex-shrink-0">
            <p className="text-sm text-muted-foreground mb-3">Try asking me about:</p>
            <div className="grid gap-2">
              {suggestedQueries.map((query, index) => {
                const Icon = query.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto p-3"
                    onClick={() => handleSuggestedQuery(query.text)}
                  >
                    <Icon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-left">
                      <div className="text-sm">{query.text}</div>
                      <div className="text-xs text-muted-foreground">{query.category}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-blue-100">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3 text-sm",
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-12'
                        : 'bg-muted'
                    )}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div
                      className={cn(
                        "text-xs mt-1 opacity-70",
                        message.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-blue-100">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about costs, security, resources, or anything else..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={() => handleSendMessage()} 
              disabled={!inputValue.trim() || isTyping}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestedQuery("Show me my biggest cost drivers")}
              disabled={isTyping}
            >
              <DollarSign className="h-3 w-3 mr-1" />
              Costs
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestedQuery("Check my security posture")}
              disabled={isTyping}
            >
              <Shield className="h-3 w-3 mr-1" />
              Security
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestedQuery("Show resource recommendations")}
              disabled={isTyping}
            >
              <Lightbulb className="h-3 w-3 mr-1" />
              Tips
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
