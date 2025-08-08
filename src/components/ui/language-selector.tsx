'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import 'flag-icons/css/flag-icons.min.css';

interface Language {
  code: string;
  name: string;
  flagCode: string; // ISO 3166-1 alpha-2 country code for flag-icons
}

const languages: Language[] = [
  { code: 'en', name: 'English', flagCode: 'us' },
  { code: 'ja', name: '日本語', flagCode: 'jp' },
  { code: 'ko', name: '한국어', flagCode: 'kr' }
];

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    // Store preference in localStorage
    localStorage.setItem('preferred-language', language.code);
    
    // In a real application, this would trigger i18n language change
    console.log(`Language changed to: ${language.name} (${language.code})`);
  };

  // Initialize from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('preferred-language');
    if (stored) {
      const language = languages.find(lang => lang.code === stored);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0"
          title={`Current language: ${currentLanguage.name}`}
        >
          <span 
            className={`fi fi-${currentLanguage.flagCode} w-5 h-5 rounded-sm overflow-hidden shadow-sm`}
            role="img" 
            aria-label={currentLanguage.name}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`flex items-center gap-3 ${
              currentLanguage.code === language.code ? 'bg-accent' : ''
            }`}
          >
            <span 
              className={`fi fi-${language.flagCode} w-5 h-5 rounded-sm overflow-hidden shadow-sm flex-shrink-0`}
              role="img" 
              aria-label={language.name}
            />
            <span className="flex-1">{language.name}</span>
            {currentLanguage.code === language.code && (
              <span className="text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
