import React from 'react';

export function PrivacyPolicyContent() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          NTQ Solution JSC (&quot;NTQ Solution,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy and personal information. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use NxConsole, 
          our cloud management platform and related services (&quot;Services&quot;).
        </p>
        <p className="mt-4">
          NTQ Solution is a leading global IT service provider with over 14 years of experience in developing ICT solutions 
          and providing customer support across 5 global branches, serving 350+ global clients across 30 industries.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">About NTQ Solution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Company Information</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Legal Name:</strong> NTQ Solution Joint Stock Company (JSC)</li>
              <li><strong>Headquarters:</strong> Vietnam</li>
              <li><strong>Global Presence:</strong> 5 international branches</li>
              <li><strong>Experience:</strong> 14+ years in ICT solutions</li>
              <li><strong>Workforce:</strong> 1,500+ global employees</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Service Portfolio</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Custom Software Development</strong></li>
              <li><strong>Integration & Solutions</strong></li>
              <li><strong>Research & Development</strong></li>
              <li><strong>Business Process Outsourcing</strong></li>
              <li><strong>AI and Blockchain Solutions</strong></li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <h3 className="text-lg font-medium mb-2">Personal Information</h3>
        <p>We may collect the following types of personal information:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Contact information (name, email address, phone number)</li>
          <li>Professional information (job title, company, department)</li>
          <li>Account credentials and authentication data</li>
          <li>Cloud infrastructure configuration and metadata</li>
          <li>Usage data and analytics</li>
          <li>Communication records and support interactions</li>
        </ul>

        <h3 className="text-lg font-medium mb-2 mt-6">Technical Information</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>IP addresses and device identifiers</li>
          <li>Browser type and version</li>
          <li>Operating system information</li>
          <li>Cloud service provider API credentials (encrypted)</li>
          <li>Performance metrics and system logs</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p>We use your information for the following purposes:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Provide and maintain our cloud management services</li>
          <li>Authenticate users and secure platform access</li>
          <li>Monitor and analyze cloud infrastructure performance</li>
          <li>Generate insights and recommendations</li>
          <li>Provide customer support and technical assistance</li>
          <li>Improve our services and develop new features</li>
          <li>Comply with legal obligations and security requirements</li>
          <li>Send service-related communications and updates</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Data Security and Protection</h2>
        <p>
          As a trusted technology partner serving 350+ global clients, NTQ Solution implements industry-standard 
          security measures to protect your data:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>End-to-end encryption for data transmission and storage</li>
          <li>Multi-factor authentication and access controls</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>SOC 2 Type II compliance and industry certifications</li>
          <li>Data segregation and tenant isolation</li>
          <li>Incident response and breach notification procedures</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices, please contact us:
        </p>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p><strong>NTQ Solution JSC</strong></p>
          <p>Email: privacy@ntq-solution.com</p>
          <p>Website: <a href="https://ntq.com.vn" className="text-primary hover:underline">https://ntq.com.vn</a></p>
          <p>Data Protection Officer: dpo@ntq-solution.com</p>
        </div>
      </section>
    </div>
  );
}

export function TermsOfServiceContent() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
        <p>
          These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Customer,&quot; &quot;you,&quot; or &quot;your&quot;) 
          and NTQ Solution JSC (&quot;NTQ Solution,&quot; &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) regarding your use of NxConsole, 
          our cloud management platform and related services (&quot;Services&quot;).
        </p>
        <p className="mt-4">
          By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, 
          you may not access or use our Services.
        </p>
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
    </div>
  );
}

export function PrivacyRightsContent() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
        <p>
          NTQ Solution JSC is committed to protecting your privacy and ensuring you have control over your personal information. 
          This page outlines your rights regarding the collection, use, and processing of your data when using NxConsole 
          and our related services.
        </p>
        <p className="mt-4">
          As a global technology leader serving 350+ clients across 30 industries, we maintain the highest standards 
          of data protection and privacy compliance.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Data Subject Rights</h2>
        <p>
          Depending on your location and applicable privacy laws (including GDPR, CCPA, and other regulations), 
          you may have the following rights:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 text-blue-700 dark:text-blue-300">Right to Access</h3>
              <p className="text-sm">
                You have the right to request information about what personal data we collect, 
                how we use it, and obtain a copy of your data.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 text-green-700 dark:text-green-300">Right to Rectification</h3>
              <p className="text-sm">
                You can request correction of inaccurate or incomplete personal information 
                we maintain about you.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 text-red-700 dark:text-red-300">Right to Erasure</h3>
              <p className="text-sm">
                Also known as the &quot;right to be forgotten,&quot; you may request deletion 
                of your personal data under certain circumstances.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 text-orange-700 dark:text-orange-300">Right to Portability</h3>
              <p className="text-sm">
                You have the right to receive your personal data in a structured, 
                machine-readable format and transfer it to another service provider.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-300">Right to Object</h3>
              <p className="text-sm">
                You may object to certain types of processing, including direct marketing 
                and processing based on legitimate interests.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 text-cyan-700 dark:text-cyan-300">Right to Withdraw Consent</h3>
              <p className="text-sm">
                Where processing is based on consent, you have the right to withdraw 
                your consent at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How to Exercise Your Rights</h2>
        
        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4 text-blue-900 dark:text-blue-100">Contact Our Data Protection Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Primary Contact</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Email:</strong> privacy@ntq-solution.com</li>
                <li><strong>Subject Line:</strong> &quot;Privacy Rights Request&quot;</li>
                <li><strong>Response Time:</strong> Within 30 days</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Data Protection Officer</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Email:</strong> dpo@ntq-solution.com</li>
                <li><strong>Role:</strong> Privacy compliance oversight</li>
                <li><strong>Availability:</strong> Business hours (GMT+7)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-sm mb-4">
          For questions about your privacy rights or to submit a request, please contact our privacy team:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Privacy Team</h3>
            <ul className="text-sm space-y-1">
              <li><strong>Email:</strong> privacy@ntq-solution.com</li>
              <li><strong>Subject:</strong> Privacy Rights Inquiry</li>
              <li><strong>Website:</strong> <a href="https://ntq.com.vn" className="text-primary hover:underline">https://ntq.com.vn</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Data Protection Officer</h3>
            <ul className="text-sm space-y-1">
              <li><strong>Email:</strong> dpo@ntq-solution.com</li>
              <li><strong>Response Time:</strong> Within 30 days</li>
              <li><strong>Languages:</strong> English, Vietnamese</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
