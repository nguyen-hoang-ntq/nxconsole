import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: 'Terms of Service | NxConsole',
  description: 'Terms of Service for NxConsole cloud management platform by NTQ Solution.',
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout 
      title="Terms of Service" 
      lastUpdated="January 9, 2025"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p>
            These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer," "you," or "your") 
            and NTQ Solution JSC ("NTQ Solution," "Company," "we," "us," or "our") regarding your use of NxConsole, 
            our cloud management platform and related services ("Services").
          </p>
          <p className="mt-4">
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, 
            you may not access or use our Services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">About NTQ Solution</h2>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Company Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Company Facts</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Legal Entity:</strong> NTQ Solution Joint Stock Company</li>
                  <li>• <strong>Experience:</strong> 14+ years in ICT solutions</li>
                  <li>• <strong>Global Workforce:</strong> 1,500+ employees</li>
                  <li>• <strong>Project Portfolio:</strong> 760+ successful projects</li>
                  <li>• <strong>Client Base:</strong> 350+ global clients</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Service Excellence</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Global Operations:</strong> 5 international branches</li>
                  <li>• <strong>Industry Coverage:</strong> 30 industries served</li>
                  <li>• <strong>Innovation:</strong> 20+ solutions & products launched</li>
                  <li>• <strong>Quality Focus:</strong> World-class service delivery</li>
                  <li>• <strong>Technology Expertise:</strong> AI, Blockchain, Cloud</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
          <p>
            NxConsole is a comprehensive cloud management platform that provides unified visibility and control 
            across multiple cloud providers including Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), 
            Microsoft 365, and Google Workspace.
          </p>
          
          <h3 className="text-lg font-medium mb-2 mt-4">Core Services Include:</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Cloud resource inventory and management</li>
            <li>Financial operations (FinOps) and cost optimization</li>
            <li>Security monitoring and compliance management</li>
            <li>AI-powered insights and analytics</li>
            <li>Microsoft 365 and Google Workspace administration</li>
            <li>Automated reporting and alert systems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Accounts and Registration</h2>
          <h3 className="text-lg font-medium mb-2">Account Creation</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>You must provide accurate, complete, and current information</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You must promptly notify us of any unauthorized use of your account</li>
            <li>You may not share your account credentials with third parties</li>
          </ul>

          <h3 className="text-lg font-medium mb-2 mt-4">Account Responsibilities</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>You are responsible for all activities that occur under your account</li>
            <li>You must comply with your organization's internal policies</li>
            <li>You must ensure authorized use by team members and colleagues</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Acceptable Use Policy</h2>
          <h3 className="text-lg font-medium mb-2">Permitted Uses</h3>
          <p>You may use our Services for legitimate business purposes including:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Managing and monitoring your cloud infrastructure</li>
            <li>Analyzing costs and optimizing cloud spending</li>
            <li>Ensuring security and compliance across your environment</li>
            <li>Generating reports and insights for business decisions</li>
          </ul>

          <h3 className="text-lg font-medium mb-2 mt-4">Prohibited Uses</h3>
          <p>You may not use our Services to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit malicious code or conduct security attacks</li>
            <li>Interfere with or disrupt our Services</li>
            <li>Access data or systems without authorization</li>
            <li>Use the Services for competitive intelligence</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data and Privacy</h2>
          <h3 className="text-lg font-medium mb-2">Customer Data</h3>
          <p>
            You retain ownership of your data. We act as a data processor and will handle your data in accordance with 
            our Privacy Policy and applicable data protection laws.
          </p>

          <h3 className="text-lg font-medium mb-2 mt-4">Cloud Provider Integration</h3>
          <p>
            Our Services integrate with your existing cloud providers. You are responsible for:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Maintaining appropriate permissions and access controls</li>
            <li>Ensuring compliance with your cloud providers' terms</li>
            <li>Managing data retention and deletion policies</li>
            <li>Monitoring for unauthorized access or changes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Service Availability and Support</h2>
          <h3 className="text-lg font-medium mb-2">Service Level Commitment</h3>
          <p>
            Building on our track record of 760+ successful projects, NTQ Solution strives to provide reliable, 
            high-quality service with:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>99.9% uptime service level objective</li>
            <li>24/7 monitoring and incident response</li>
            <li>Regular maintenance windows with advance notice</li>
            <li>Comprehensive backup and disaster recovery procedures</li>
          </ul>

          <h3 className="text-lg font-medium mb-2 mt-4">Customer Support</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Technical support during business hours</li>
            <li>Online documentation and knowledge base</li>
            <li>Email support with response time commitments</li>
            <li>Escalation procedures for critical issues</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <h3 className="text-lg font-medium mb-2">NTQ Solution Intellectual Property</h3>
          <p>
            The Services, including all software, technology, and content, are owned by NTQ Solution and protected by 
            intellectual property laws. You are granted a limited, non-exclusive license to use the Services.
          </p>

          <h3 className="text-lg font-medium mb-2 mt-4">Customer Intellectual Property</h3>
          <p>
            You retain all rights to your data and content. You grant us a limited license to process your data 
            solely for the purpose of providing the Services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
          <h3 className="text-lg font-medium mb-2">Subscription Fees</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Fees are based on your selected service plan and usage</li>
            <li>Payments are due in advance on a monthly or annual basis</li>
            <li>All fees are non-refundable except as required by law</li>
            <li>We may change fees with 30 days advance notice</li>
          </ul>

          <h3 className="text-lg font-medium mb-2 mt-4">Late Payments</h3>
          <p>
            Late payments may result in service suspension. We reserve the right to charge interest on overdue amounts 
            at the maximum rate permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, NTQ Solution's total liability for any claims related to the Services 
            shall not exceed the amounts paid by you in the twelve months preceding the claim.
          </p>
          <p className="mt-4">
            We shall not be liable for indirect, incidental, special, consequential, or punitive damages, including 
            lost profits, data, or business opportunities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <h3 className="text-lg font-medium mb-2">Termination by Customer</h3>
          <p>You may terminate your account at any time with 30 days written notice.</p>

          <h3 className="text-lg font-medium mb-2 mt-4">Termination by NTQ Solution</h3>
          <p>
            We may terminate your account for material breach of these Terms, non-payment, or if required by law. 
            We will provide reasonable notice except in cases of immediate security concerns.
          </p>

          <h3 className="text-lg font-medium mb-2 mt-4">Effect of Termination</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Your access to the Services will be terminated</li>
            <li>We will provide data export capabilities for 30 days</li>
            <li>Outstanding fees remain due and payable</li>
            <li>Survival clauses will remain in effect</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Governing Law and Disputes</h2>
          <p>
            These Terms are governed by the laws of Vietnam. Any disputes will be resolved through binding arbitration 
            or in the courts of Vietnam, as applicable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p>
            Questions about these Terms should be directed to:
          </p>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p><strong>NTQ Solution JSC</strong></p>
            <p>Email: legal@ntq-solution.com</p>
            <p>Website: <a href="https://ntq.com.vn" className="text-primary hover:underline">https://ntq.com.vn</a></p>
            <p>Business Hours: Monday - Friday, 9:00 AM - 6:00 PM (Vietnam Time)</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We may modify these Terms from time to time. Material changes will be communicated with at least 30 days 
            advance notice. Your continued use of the Services after changes take effect constitutes acceptance of the 
            modified Terms.
          </p>
        </section>

        <section className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">NTQ Solution's Commitment</h2>
          <p className="text-sm">
            "Our goal is to deliver world-class products and services that exceed our clients' expectations in every way possible. 
            We take pride in providing innovative solutions that help our clients achieve their goals." 
            - Pham Thai Son, CEO, NTQ Solution
          </p>
          <p className="text-sm mt-2">
            With our proven track record across 30 industries and commitment to quality excellence, we're dedicated to 
            providing you with reliable, secure, and innovative cloud management solutions.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
