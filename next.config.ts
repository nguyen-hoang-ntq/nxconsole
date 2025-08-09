import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove deprecated experimental.turbo as it's now stable
  // turbopack: true, // Enable when needed
  eslint: {
    // Don't fail build on ESLint warnings in production
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Don't fail build on TypeScript errors in production  
    ignoreBuildErrors: false,
  },
  // Remove output: 'standalone' for Vercel deployment
  // output: 'standalone',
};

export default nextConfig;
