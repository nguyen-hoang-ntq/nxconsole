'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TwitterIcon, LinkedinIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { LegalModal } from '@/components/legal/legal-modal';
import { PrivacyPolicyContent, TermsOfServiceContent, PrivacyRightsContent } from '@/components/legal/legal-content';

export function LandingFooter() {
  const [openModal, setOpenModal] = React.useState<string | null>(null);

  const handleOpenModal = (modal: string) => {
    setOpenModal(modal);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="NxConsole Logo"
                width={32}
                height={32}
                className="h-8 w-8"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-xl font-bold text-white">NxConsole</span>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              The ultimate unified cloud cost management platform. Optimize costs across 
              AWS, Azure, Google Cloud, and Microsoft 365 with intelligent insights and automation.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  AWS Cost Management
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Azure Cost Optimization
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Google Cloud Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Microsoft 365 Optimization
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Multi-Cloud Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Best Practices
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  ROI Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Contact Info */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-semibold mb-2">Contact Us</h4>
              <div className="space-y-1">
                <a 
                  href="mailto:support@ntq-solution.com.vn"
                  className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <MailIcon className="h-4 w-4" />
                  support@ntq-solution.com.vn
                </a>
                <a 
                  href="tel:+84-24-3200-8754"
                  className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <PhoneIcon className="h-4 w-4" />
                  (+84)24 3200 8754
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button 
                onClick={() => handleOpenModal('privacy-policy')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleOpenModal('terms-of-service')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => handleOpenModal('privacy-rights')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Rights
              </button>
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-gray-500 text-sm">
                © 2025 NTQ Solution. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Trusted by 350+ organizations worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

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
    </footer>
  );
}
