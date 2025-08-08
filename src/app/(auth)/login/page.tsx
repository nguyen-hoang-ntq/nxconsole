'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/auth/auth-provider';
import { Loader2, Mail, Lock, Cloud, Server, Database, Shield, Zap, Globe } from 'lucide-react';
import { 
  SiAmazon, SiAmazonec2, SiAmazons3, SiAwslambda, SiAmazoneks, SiAmazondynamodb,
  SiGoogle, SiGooglecloud, SiGooglebigquery, SiGoogleanalytics,
  SiDocker, SiKubernetes, SiTerraform, SiAnsible, SiJenkins, SiGitlab
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { FaMicrosoft, FaCloud, FaServer, FaDatabase } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState<'form' | 'sso'>('form');
  const { login, ssoLogin, state } = useAuth();
  const router = useRouter();
  
  const handleFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (success) {
      router.push('/');
    }
  };
  
  const handleSSOLogin = async (provider: 'microsoft' | 'google') => {
    const success = await ssoLogin(provider);
    if (success) {
      router.push('/');
    }
  };
  
  const demoCredentials = [
    { email: 'admin@nxconsole.com', role: 'Administrator' },
    { email: 'finops@nxconsole.com', role: 'FinOps Manager' }
  ];
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Cloud-themed Background */}
      <div className="absolute inset-0">
        {/* Static Cloud Service Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Traditional Lucide Icons */}
          <Cloud className="absolute top-20 left-20 h-16 w-16 text-blue-200 dark:text-blue-700 opacity-20" />
          <Server className="absolute top-40 right-32 h-12 w-12 text-indigo-200 dark:text-indigo-700 opacity-15" />
          <Database className="absolute top-60 left-40 h-14 w-14 text-purple-200 dark:text-purple-700 opacity-20" />
          <Shield className="absolute bottom-40 right-20 h-18 w-18 text-green-200 dark:text-green-700 opacity-25" />
          <Zap className="absolute bottom-20 left-60 h-10 w-10 text-yellow-200 dark:text-yellow-700 opacity-15" />
          <Globe className="absolute top-32 right-60 h-12 w-12 text-cyan-200 dark:text-cyan-700 opacity-20" />
          
          {/* AWS Service Icons */}
          <SiAmazon className="absolute top-16 right-16 h-12 w-12 text-orange-200 dark:text-orange-700 opacity-15" />
          <SiAmazonec2 className="absolute top-80 left-16 h-10 w-10 text-orange-300 dark:text-orange-600 opacity-20" />
          <SiAmazons3 className="absolute bottom-60 right-40 h-14 w-14 text-orange-200 dark:text-orange-700 opacity-25" />
          <SiAwslambda className="absolute top-1/3 left-8 h-8 w-8 text-orange-300 dark:text-orange-600 opacity-15" />
          <SiAmazoneks className="absolute bottom-32 left-32 h-10 w-10 text-orange-200 dark:text-orange-700 opacity-20" />
          
          {/* Microsoft & Azure Icons */}
          <FaMicrosoft className="absolute top-24 left-1/3 h-14 w-14 text-blue-300 dark:text-blue-600 opacity-15" />
          <VscAzure className="absolute bottom-24 right-8 h-16 w-16 text-blue-200 dark:text-blue-700 opacity-25" />
          <FaCloud className="absolute top-72 right-24 h-12 w-12 text-blue-300 dark:text-blue-600 opacity-20" />
          
          {/* Google Cloud Icons */}
          <SiGoogle className="absolute top-96 left-1/2 h-12 w-12 text-red-200 dark:text-red-700 opacity-15" />
          <SiGooglecloud className="absolute bottom-96 right-1/3 h-14 w-14 text-blue-200 dark:text-blue-700 opacity-25" />
          <SiGooglebigquery className="absolute top-48 right-8 h-10 w-10 text-blue-300 dark:text-blue-600 opacity-20" />
          
          {/* DevOps Tools */}
          <SiDocker className="absolute bottom-48 left-8 h-12 w-12 text-blue-200 dark:text-blue-700 opacity-15" />
          <SiKubernetes className="absolute top-64 right-48 h-10 w-10 text-blue-300 dark:text-blue-600 opacity-20" />
          <SiTerraform className="absolute bottom-16 right-1/2 h-8 w-8 text-purple-200 dark:text-purple-700 opacity-15" />
          <SiJenkins className="absolute top-36 left-8 h-10 w-10 text-red-200 dark:text-red-700 opacity-20" />
          
          {/* Background Service Text */}
          <div className="absolute top-16 left-1/4 text-6xl font-bold text-blue-100 dark:text-blue-900 opacity-8 rotate-12 select-none">
            COMPUTE
          </div>
          <div className="absolute top-1/3 right-1/4 text-4xl font-bold text-indigo-100 dark:text-indigo-900 opacity-8 -rotate-12 select-none">
            STORAGE
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-5xl font-bold text-purple-100 dark:text-purple-900 opacity-8 rotate-6 select-none">
            SECURITY
          </div>
          <div className="absolute bottom-16 right-1/3 text-3xl font-bold text-green-100 dark:text-green-900 opacity-8 -rotate-6 select-none">
            ANALYTICS
          </div>
          <div className="absolute top-1/2 left-16 text-4xl font-bold text-cyan-100 dark:text-cyan-900 opacity-8 rotate-45 select-none">
            NETWORK
          </div>
          <div className="absolute top-2/3 right-16 text-5xl font-bold text-yellow-100 dark:text-yellow-900 opacity-8 -rotate-12 select-none">
            AI/ML
          </div>
        </div>
        
        {/* Provider Logos in Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-1/3 text-2xl opacity-10 font-semibold text-orange-300 dark:text-orange-700">
            AWS
          </div>
          <div className="absolute top-1/2 right-1/4 text-2xl opacity-10 font-semibold text-blue-400 dark:text-blue-700">
            Azure
          </div>
          <div className="absolute bottom-1/4 left-1/4 text-2xl opacity-10 font-semibold text-blue-500 dark:text-blue-800">
            GCP
          </div>
          <div className="absolute top-3/4 right-1/3 text-xl opacity-10 font-semibold text-red-400 dark:text-red-700">
            Microsoft 365
          </div>
          <div className="absolute bottom-1/3 right-1/2 text-xl opacity-10 font-semibold text-green-500 dark:text-green-700">
            Google Workspace
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Title */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="NTQ Logo"
                  width={64}
                  height={64}
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">NxConsole</h1>
            <p className="text-muted-foreground">
              Unified Cloud Management Platform
            </p>
          </div>
        
        {/* Login Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to access your cloud management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* SSO Login Options */}
            <div className="space-y-3">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => handleSSOLogin('microsoft')}
                disabled={state.loading}
              >
                {state.loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                )}
                Continue with Microsoft SSO
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => handleSSOLogin('google')}
                disabled={state.loading}
              >
                {state.loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continue with Google SSO
              </Button>
            </div>
            
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>
            
            {/* Form Login */}
            <form onSubmit={handleFormLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              {state.error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {state.error}
                </div>
              )}
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={state.loading}
              >
                {state.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Demo Credentials */}
        <Card className="border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Demo Credentials</CardTitle>
            <CardDescription className="text-xs">
              Use these credentials to explore the prototype
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoCredentials.map((cred, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-md text-xs cursor-pointer hover:bg-muted transition-colors"
                onClick={() => {
                  setEmail(cred.email);
                  setPassword('demo123');
                }}
              >
                <div>
                  <div className="font-medium">{cred.email}</div>
                  <div className="text-muted-foreground">{cred.role}</div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  Use
                </Button>
              </div>
            ))}
            <p className="text-xs text-muted-foreground mt-2">
              Any password will work for demo accounts, or use SSO buttons above.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  );
}
