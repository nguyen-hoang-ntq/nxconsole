import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: 'Privacy Rights | NxConsole',
  description: 'Privacy Rights and data protection information for NxConsole by NTQ Solution.',
};

export default function PrivacyRightsPage() {
  return (
    <LegalPageLayout 
      title="Privacy Rights" 
      lastUpdated="January 9, 2025"
    >
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

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2 text-purple-700 dark:text-purple-300">Right to Restriction</h3>
                <p className="text-sm">
                  You can request that we limit how we process your personal information 
                  in specific situations.
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

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2 text-pink-700 dark:text-pink-300">Right to Complain</h3>
                <p className="text-sm">
                  You have the right to lodge a complaint with a supervisory authority 
                  if you believe your privacy rights have been violated.
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

          <h3 className="text-lg font-medium mb-4">Required Information for Requests</h3>
          <p>To process your request efficiently, please provide:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Your full name and contact information</li>
            <li>Account details or email address associated with our services</li>
            <li>Specific right you wish to exercise</li>
            <li>Clear description of your request</li>
            <li>Proof of identity (for security purposes)</li>
            <li>Preferred method of response</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Request Processing Timeline</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mt-1">
                <span className="text-blue-700 dark:text-blue-300 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium">Request Received</h3>
                <p className="text-sm text-muted-foreground">We acknowledge receipt within 2 business days</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mt-1">
                <span className="text-green-700 dark:text-green-300 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium">Identity Verification</h3>
                <p className="text-sm text-muted-foreground">We verify your identity to protect your privacy (1-3 business days)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-2 mt-1">
                <span className="text-yellow-700 dark:text-yellow-300 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium">Request Processing</h3>
                <p className="text-sm text-muted-foreground">We process your request and gather relevant information (up to 25 business days)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2 mt-1">
                <span className="text-purple-700 dark:text-purple-300 font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="font-medium">Response Delivery</h3>
                <p className="text-sm text-muted-foreground">We provide a complete response within 30 calendar days</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Categories We Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Identity Data</h3>
              <ul className="text-sm space-y-1">
                <li>• Name and contact details</li>
                <li>• Professional information</li>
                <li>• Account credentials</li>
                <li>• Authentication data</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 text-green-700 dark:text-green-300">Technical Data</h3>
              <ul className="text-sm space-y-1">
                <li>• IP addresses and device info</li>
                <li>• Browser and system data</li>
                <li>• Usage analytics</li>
                <li>• Performance metrics</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">Cloud Data</h3>
              <ul className="text-sm space-y-1">
                <li>• Infrastructure metadata</li>
                <li>• Configuration settings</li>
                <li>• Cost and usage data</li>
                <li>• Security logs</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Regional Privacy Laws</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">European Union (GDPR)</h3>
              <p className="text-sm">
                EU residents have comprehensive rights under the General Data Protection Regulation, 
                including the right to data portability, erasure, and automated decision-making protection.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">California (CCPA/CPRA)</h3>
              <p className="text-sm">
                California residents have rights to know what personal information is collected, 
                delete personal information, opt-out of sale, and non-discrimination.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Other Jurisdictions</h3>
              <p className="text-sm">
                We comply with applicable privacy laws in all jurisdictions where we operate, 
                including Vietnam, Japan, Korea, and other countries where we have established presence.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Security and Data Protection</h2>
          <p>
            With our commitment to delivering world-class services to 350+ global clients, 
            NTQ Solution implements comprehensive security measures:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-medium mb-2">Technical Safeguards</h3>
              <ul className="text-sm space-y-1">
                <li>• End-to-end encryption</li>
                <li>• Multi-factor authentication</li>
                <li>• Regular security audits</li>
                <li>• Penetration testing</li>
                <li>• Incident response procedures</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Organizational Measures</h3>
              <ul className="text-sm space-y-1">
                <li>• Staff privacy training</li>
                <li>• Access controls and monitoring</li>
                <li>• Data minimization practices</li>
                <li>• Vendor due diligence</li>
                <li>• Compliance auditing</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Supervisory Authorities</h2>
          <p>
            If you believe your privacy rights have been violated, you may file a complaint with relevant authorities:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">European Union</h3>
              <p className="text-sm">Contact your national data protection authority or the lead supervisory authority.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">United States</h3>
              <p className="text-sm">Contact state attorneys general or relevant federal agencies (FTC, etc.).</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Vietnam</h3>
              <p className="text-sm">Contact the Ministry of Information and Communications or relevant authorities.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Other Countries</h3>
              <p className="text-sm">Contact your local data protection or privacy authority.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Updates to Privacy Rights</h2>
          <p>
            We regularly review and update our privacy practices to ensure compliance with evolving laws and regulations. 
            Changes to this Privacy Rights page will be communicated through our normal notification channels.
          </p>
        </section>

        <section className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
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
    </LegalPageLayout>
  );
}
