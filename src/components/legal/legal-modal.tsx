'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalModal({ isOpen, onClose, title, lastUpdated, children }: LegalModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
