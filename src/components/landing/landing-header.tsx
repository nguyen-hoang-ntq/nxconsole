'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { LegalModal } from '@/components/legal/legal-modal';
import { PrivacyPolicyContent, TermsOfServiceContent, PrivacyRightsContent } from '@/components/legal/legal-content';

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState<string | null>(null);

  const handleOpenModal = (modal: string) => {
    setOpenModal(modal);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="NxConsole Logo"
              width={32}
              height={32}
              className="h-8 w-8"
              style={{ objectFit: 'contain' }}
            />
            <span className="font-bold text-xl">NxConsole</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <div className="relative group">
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Security
              </a>
              <div className="absolute left-0 mt-2 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button 
                  onClick={() => handleOpenModal('privacy-policy')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => handleOpenModal('privacy-rights')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                >
                  Privacy Rights
                </button>
              </div>
            </div>
            <div className="relative group">
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Compliance
              </a>
              <div className="absolute left-0 mt-2 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button 
                  onClick={() => handleOpenModal('terms-of-service')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                >
                  Terms of Service
                </button>
                <button 
                  onClick={() => handleOpenModal('privacy-policy')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                >
                  Data Protection
                </button>
              </div>
            </div>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Benefits
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Security</div>
                <div className="ml-4 space-y-2">
                  <button 
                    onClick={() => handleOpenModal('privacy-policy')}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </button>
                  <button 
                    onClick={() => handleOpenModal('privacy-rights')}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Rights
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Compliance</div>
                <div className="ml-4 space-y-2">
                  <button 
                    onClick={() => handleOpenModal('terms-of-service')}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </button>
                  <button 
                    onClick={() => handleOpenModal('privacy-policy')}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    Data Protection
                  </button>
                </div>
              </div>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">Start Free Trial</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
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
    </header>
  );
}
