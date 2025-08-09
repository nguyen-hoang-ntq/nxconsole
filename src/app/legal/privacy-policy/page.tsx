import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: 'Privacy Policy | NxConsole',
  description: 'Privacy Policy for NxConsole cloud management platform by NTQ Solution.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout 
      title="Privacy Policy" 
      lastUpdated="January 9, 2025"
    >
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
          <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
          <p>We do not sell, trade, or rent your personal information. We may share information in the following circumstances:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>With your explicit consent</li>
            <li>To comply with legal obligations or court orders</li>
            <li>To protect our rights, property, or safety</li>
            <li>With trusted service providers under strict confidentiality agreements</li>
            <li>In connection with business transfers or mergers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
          <p>
            As a global organization with operations across multiple countries, NTQ Solution may transfer your data 
            internationally. We ensure adequate protection through:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Standard contractual clauses</li>
            <li>Adequacy decisions from relevant authorities</li>
            <li>Binding corporate rules</li>
            <li>Explicit consent where required</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
          <p>Depending on your jurisdiction, you may have the following rights:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
            <li>Withdrawal of consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p>
            We retain your information for as long as necessary to provide our services and comply with legal obligations. 
            Retention periods vary based on the type of information and applicable legal requirements.
          </p>
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

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
            the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. Your continued use of our services 
            after such changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">About NTQ Solution&apos;s Quality Commitment</h2>
          <p className="text-sm">
            With 760+ successful projects and a commitment to delivering world-class products and services, 
            NTQ Solution maintains the highest standards of data protection and privacy. Our goal is to exceed 
            client expectations while ensuring the security and confidentiality of your information.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
