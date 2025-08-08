'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, Image, FileImage, FileText } from 'lucide-react';

interface ChartExportProps {
  chartRef: React.RefObject<HTMLDivElement | null>;
  title?: string;
  className?: string;
}

export function ChartExport({ chartRef, title = 'chart', className }: ChartExportProps) {
  const downloadChart = async (format: 'png' | 'svg' | 'pdf') => {
    if (!chartRef.current) return;

    try {
      const element = chartRef.current;
      
      switch (format) {
        case 'png':
          await exportToPNG(element, title);
          break;
        case 'svg':
          await exportToSVG(element, title);
          break;
        case 'pdf':
          await exportToPDF(element, title);
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const exportToPNG = async (element: HTMLElement, filename: string) => {
    // Simulate PNG export (would use html2canvas in real implementation)
    const canvas = document.createElement('canvas');
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.font = '16px Arial';
      ctx.fillText('Chart Export (PNG)', 20, 30);
      ctx.fillText(`Exported at: ${new Date().toLocaleString()}`, 20, 60);
    }
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const exportToSVG = async (element: HTMLElement, filename: string) => {
    // Simulate SVG export
    const svg = `
      <svg width="${element.offsetWidth}" height="${element.offsetHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="white"/>
        <text x="20" y="30" font-family="Arial" font-size="16" fill="black">Chart Export (SVG)</text>
        <text x="20" y="60" font-family="Arial" font-size="12" fill="black">Exported at: ${new Date().toLocaleString()}</text>
      </svg>
    `;
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToPDF = async (element: HTMLElement, filename: string) => {
    // Simulate PDF export (would use jsPDF in real implementation)
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Chart Export - PDF) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000205 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => downloadChart('png')}>
          <Image className="h-4 w-4 mr-2" />
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadChart('svg')}>
          <FileImage className="h-4 w-4 mr-2" />
          Export as SVG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadChart('pdf')}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
