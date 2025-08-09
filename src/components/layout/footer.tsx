'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LegalModal } from '@/components/legal/legal-modal';
import { PrivacyPolicyContent, TermsOfServiceContent, PrivacyRightsContent } from '@/components/legal/legal-content';

export function Footer() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpenModal = (modal: string) => {
    setOpenModal(modal);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <>
      <footer className="border-t bg-background">
        <div className="w-full px-4 py-2">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2 max-w-full">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-2 lg:justify-start">
              <Image
                src="/ntq-logo.png"
                alt="NTQ Logo"
                width={24}
                height={24}
                className="h-5 w-5 dark:hidden"
                style={{ objectFit: 'contain' }}
              />
              <Image
                src="/ntq-logow.png"
                alt="NTQ Logo"
                width={24}
                height={24}
                className="h-5 w-5 hidden dark:block"
                style={{ objectFit: 'contain' }}
              />
              <div className="text-xs text-muted-foreground">
                © 2025 NTQ Solution. All rights reserved.
              </div>
            </div>

            {/* Product Information */}
            <div className="text-xs text-muted-foreground text-center lg:text-right lg:justify-end">
              <p>
                A product of{' '}
                <Link
                  href="https://www.nxuniverse.cloud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  NxUniverse
                </Link>
                {' '}ecosystem by{' '}
                <span className="font-medium">NTQ Solution</span>
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-2 pt-2 border-t flex flex-col sm:flex-row items-center justify-between gap-2 max-w-full">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
                onClick={() => handleOpenModal('privacy-policy')}
              >
                Privacy Policy
              </Button>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
                onClick={() => handleOpenModal('terms-of-service')}
              >
                Terms of Service
              </Button>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
                onClick={() => handleOpenModal('privacy-rights')}
              >
                Privacy Rights
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              Need help? Contact{' '}
              <a
                href="mailto:support@ntq-solution.com.vn"
                className="text-primary hover:underline"
              >
                support@ntq-solution.com.vn
              </a>
            </div>
          </div>
        </div>
      </footer>

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
    </>
  );
}
