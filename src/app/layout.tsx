import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { MainLayout } from "@/components/layout/main-layout";
import { ServiceHealthProvider } from "@/contexts/service-health-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NxConsole - Unified Cloud Management Platform",
  description: "A comprehensive cloud management platform for AWS, Azure, and Microsoft 365",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/favicon-32x32.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geistSans.variable} antialiased font-mono`}
      >
        <AuthProvider>
          <ServiceHealthProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </ServiceHealthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
