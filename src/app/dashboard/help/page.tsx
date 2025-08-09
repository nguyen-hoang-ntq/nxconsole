'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LegalModal } from '@/components/legal/legal-modal';
import { PrivacyPolicyContent, TermsOfServiceContent, PrivacyRightsContent } from '@/components/legal/legal-content';
import { 
  Search, 
  HelpCircle, 
  FileText, 
  Video, 
  MessageCircle,
  ExternalLink,
  Book,
  Download,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Send,
  Scale,
  Shield
} from 'lucide-react';

const mockArticles = [
  {
    id: '1',
    title: 'Getting Started with NxConsole',
    category: 'Getting Started',
    views: 1250,
    helpful: 45,
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    title: 'Connecting AWS Accounts',
    category: 'Cloud Integration',
    views: 890,
    helpful: 32,
    lastUpdated: '1 week ago'
  },
  {
    id: '3',
    title: 'Setting Up Cost Alerts',
    category: 'FinOps',
    views: 567,
    helpful: 28,
    lastUpdated: '3 days ago'
  },
  {
    id: '4',
    title: 'Managing M365 Licenses',
    category: 'Microsoft 365',
    views: 432,
    helpful: 19,
    lastUpdated: '5 days ago'
  }
];

const mockTickets = [
  {
    id: 'TICK-001',
    title: 'Unable to sync Azure resources',
    status: 'open',
    priority: 'high',
    created: '2 hours ago',
    category: 'Technical Issue'
  },
  {
    id: 'TICK-002',
    title: 'Question about license optimization',
    status: 'in-progress',
    priority: 'medium',
    created: '1 day ago',
    category: 'General Question'
  },
  {
    id: 'TICK-003',
    title: 'Feature request for custom dashboards',
    status: 'resolved',
    priority: 'low',
    created: '3 days ago',
    category: 'Feature Request'
  }
];

const mockVideos = [
  {
    id: '1',
    title: 'NxConsole Overview (5 min)',
    duration: '5:23',
    thumbnail: '/video-thumb-1.jpg'
  },
  {
    id: '2',
    title: 'Cloud Integration Setup (10 min)',
    duration: '10:45',
    thumbnail: '/video-thumb-2.jpg'
  },
  {
    id: '3',
    title: 'Dashboard Customization (7 min)',
    duration: '7:12',
    thumbnail: '/video-thumb-3.jpg'
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: 'technical',
    priority: 'medium',
    description: ''
  });

  const handleOpenModal = (modal: string) => {
    setOpenModal(modal);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const filteredArticles = mockArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = () => {
    // Handle ticket submission
    console.log('Submitting ticket:', newTicket);
    setNewTicket({ title: '', category: 'technical', priority: 'medium', description: '' });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <HelpCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <p className="text-muted-foreground">Find answers, tutorials, and get support</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Book className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground">Comprehensive guides and API docs</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Video Tutorials</h3>
            <p className="text-sm text-muted-foreground">Step-by-step video guides</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Contact Support</h3>
            <p className="text-sm text-muted-foreground">Get help from our team</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="knowledge-base" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
          <TabsTrigger value="legal">Legal & Policy</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        {/* Knowledge Base */}
        <TabsContent value="knowledge-base" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Knowledge Base
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{article.title}</h3>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.lastUpdated}
                        </span>
                        <span>{article.views} views</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {article.helpful} helpful
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Tutorials */}
        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockVideos.map((video) => (
                  <div key={video.id} className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                    <div className="bg-gray-200 h-32 flex items-center justify-center">
                      <Video className="h-8 w-8 text-gray-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{video.duration}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tickets */}
        <TabsContent value="support" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Existing Tickets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  My Support Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{ticket.id}</span>
                          <Badge variant={
                            ticket.status === 'open' ? 'destructive' :
                            ticket.status === 'in-progress' ? 'default' : 'secondary'
                          }>
                            {ticket.status}
                          </Badge>
                          <Badge variant="outline">{ticket.priority}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{ticket.created}</span>
                      </div>
                      <h4 className="font-medium mb-1">{ticket.title}</h4>
                      <p className="text-sm text-muted-foreground">{ticket.category}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create New Ticket */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create Support Ticket
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket(prev => ({...prev, title: e.target.value}))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md"
                      value={newTicket.category}
                      onChange={(e) => setNewTicket(prev => ({...prev, category: e.target.value}))}
                    >
                      <option value="technical">Technical Issue</option>
                      <option value="question">General Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="billing">Billing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md"
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket(prev => ({...prev, priority: e.target.value}))}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Please provide detailed information about your issue..."
                    rows={4}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket(prev => ({...prev, description: e.target.value}))}
                  />
                </div>
                
                <Button onClick={handleSubmitTicket} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Legal & Policy */}
        <TabsContent value="legal" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Privacy Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <h4 className="font-medium">Information Collection</h4>
                  <p className="text-muted-foreground">
                    We collect information you provide directly to us, such as when you create an account, 
                    configure cloud services, or contact us for support.
                  </p>
                  
                  <h4 className="font-medium">Data Usage</h4>
                  <p className="text-muted-foreground">
                    Your data is used to provide NxConsole services, including cloud resource management, 
                    cost analytics, and security monitoring across your connected platforms.
                  </p>
                  
                  <h4 className="font-medium">Data Protection</h4>
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your data, including 
                    encryption at rest and in transit, and regular security audits.
                  </p>
                  
                  <h4 className="font-medium">Contact Information</h4>
                  <p className="text-muted-foreground">
                    For privacy-related questions, contact our Data Protection Officer at 
                    privacy@ntq-solution.com.vn
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleOpenModal('privacy-policy')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Privacy Policy
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Terms of Service */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-green-600" />
                  Terms of Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <h4 className="font-medium">Service Agreement</h4>
                  <p className="text-muted-foreground">
                    By using NxConsole, you agree to these terms. NxConsole is a cloud management platform 
                    provided by NTQ Solution for enterprise customers.
                  </p>
                  
                  <h4 className="font-medium">Acceptable Use</h4>
                  <p className="text-muted-foreground">
                    You may use NxConsole only for lawful purposes and in accordance with your organization&apos;s 
                    policies. Prohibited activities include unauthorized access and service disruption.
                  </p>
                  
                  <h4 className="font-medium">Service Availability</h4>
                  <p className="text-muted-foreground">
                    We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. 
                    Planned maintenance will be communicated in advance.
                  </p>
                  
                  <h4 className="font-medium">Limitation of Liability</h4>
                  <p className="text-muted-foreground">
                    NTQ Solution&apos;s liability is limited to the amount paid for services in the preceding 
                    12 months, except where prohibited by law.
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleOpenModal('terms-of-service')}
                  >
                    <Scale className="h-4 w-4 mr-2" />
                    View Full Terms of Service
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Privacy Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <h4 className="font-medium">Your Rights</h4>
                  <p className="text-muted-foreground">
                    You have the right to access, update, or delete your personal information. 
                    You may also request data portability or restrict processing.
                  </p>
                  
                  <h4 className="font-medium">Data Retention</h4>
                  <p className="text-muted-foreground">
                    We retain your data for as long as necessary to provide services or as required 
                    by law. Inactive accounts may be deleted after 2 years of inactivity.
                  </p>
                  
                  <h4 className="font-medium">Third-Party Integrations</h4>
                  <p className="text-muted-foreground">
                    NxConsole integrates with AWS, Azure, and M365. Data shared with these platforms 
                    is governed by their respective privacy policies.
                  </p>
                  
                  <h4 className="font-medium">Data Requests</h4>
                  <p className="text-muted-foreground">
                    To exercise your privacy rights or request data deletion, 
                    contact support@ntq-solution.com.vn with your request details.
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleOpenModal('privacy-rights')}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    View Full Privacy Rights
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">NTQ Solution JSC</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Headquarters: 10F, Tower B, Song Da Building (HH4), Pham Hung Street, My Dinh 1 Ward, Nam Tu Liem District, Hanoi</p>
                    <p>Global Offices: 8+ locations worldwide</p>
                    <p>Legal Department: legal@ntq-solution.com.vn</p>
                    <p>Data Protection Officer: privacy@ntq-solution.com.vn</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Compliance & Certifications</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• ISO 27001:2013 Information Security</p>
                    <p>• SOC 2 Type II Compliance</p>
                    <p>• GDPR Compliance (EU)</p>
                    <p>• Last Updated: January 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community */}
        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Community Forum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Join Our Community</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with other users, share tips, and get help from the community
                </p>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Community Forum
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Legal Modals */}
      <LegalModal
        isOpen={openModal === 'privacy-policy'}
        onClose={handleCloseModal}
        title="Privacy Policy"
        lastUpdated="January 9, 2025"
      >
        <PrivacyPolicyContent />
      </LegalModal>

      <LegalModal
        isOpen={openModal === 'terms-of-service'}
        onClose={handleCloseModal}
        title="Terms of Service"
        lastUpdated="January 9, 2025"
      >
        <TermsOfServiceContent />
      </LegalModal>

      <LegalModal
        isOpen={openModal === 'privacy-rights'}
        onClose={handleCloseModal}
        title="Privacy Rights"
        lastUpdated="January 9, 2025"
      >
        <PrivacyRightsContent />
      </LegalModal>
    </div>
  );
}
