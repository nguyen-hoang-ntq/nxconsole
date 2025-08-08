'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  Menu,
  Bot
} from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { mockNotifications } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { LanguageSelector } from '@/components/ui/language-selector';

interface AppHeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export function AppHeader({ onMenuToggle, showMenuButton = false }: AppHeaderProps) {
  const { state, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemDark);
      document.documentElement.classList.toggle('dark', systemDark);
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };
  
  const handleLogout = () => {
    logout();
    // Router will automatically redirect to login due to auth state change
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Header Bar */}
      <div className="h-16 flex items-center justify-between px-4 gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search across all NxConsole services and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80 lg:w-96 xl:w-[500px]"
            />
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          
          {/* AI Assistant */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/ai-assistant">
              <Bot className="h-5 w-5" />
              <span className="sr-only">AI Assistant</span>
            </Link>
          </Button>
          
          {/* Language Selector */}
          <LanguageSelector />
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                {unreadNotifications > 0 && (
                  <Badge variant="secondary">{unreadNotifications} new</Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockNotifications.slice(0, 3).map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                  <div className="flex items-center gap-2 w-full">
                    <Badge 
                      variant={notification.severity === 'error' ? 'destructive' : 
                               notification.severity === 'warning' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {notification.type}
                    </Badge>
                    {!notification.read && (
                      <div className="h-2 w-2 bg-primary rounded-full ml-auto" />
                    )}
                  </div>
                  <h4 className="font-medium text-sm mt-1">{notification.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={state.user?.avatar} alt={state.user?.name} />
                  <AvatarFallback>
                    {state.user ? getInitials(state.user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {state.user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {state.user?.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {state.user?.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Breadcrumb Bar */}
      <div className="border-t border-border bg-muted/30 px-4 py-2">
        <Breadcrumb />
      </div>
    </header>
  );
}
