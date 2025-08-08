import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal | NxConsole',
  description: 'Legal information and policies for NxConsole by NTQ Solution.',
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
