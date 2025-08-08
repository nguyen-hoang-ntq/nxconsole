'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User } from '@/types';
import { AuthService, authReducer, initialAuthState, AuthAction } from '@/lib/auth';

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  ssoLogin: (provider: 'microsoft' | 'google') => Promise<boolean>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      dispatch({ type: 'AUTH_LOADING' });
      
      try {
        const session = AuthService.getCurrentSession();
        
        if (session) {
          dispatch({ 
            type: 'AUTH_SUCCESS', 
            payload: { user: session.user } 
          });
        } else {
          // Simply reset to initial state without error for unauthenticated users
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      } catch (error) {
        dispatch({ 
          type: 'AUTH_ERROR', 
          payload: { error: 'Failed to check authentication status' } 
        });
      }
    };
    
    checkAuthStatus();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'AUTH_LOADING' });
    
    try {
      const result = await AuthService.login(email, password);
      
      if (result.success && result.session) {
        dispatch({ 
          type: 'AUTH_SUCCESS', 
          payload: { user: result.session.user } 
        });
        return true;
      } else {
        dispatch({ 
          type: 'AUTH_ERROR', 
          payload: { error: result.error || 'Login failed' } 
        });
        return false;
      }
    } catch (error) {
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: { error: 'Login failed due to network error' } 
      });
      return false;
    }
  };
  
  const ssoLogin = async (provider: 'microsoft' | 'google'): Promise<boolean> => {
    dispatch({ type: 'AUTH_LOADING' });
    
    try {
      const result = await AuthService.ssoLogin(provider);
      
      if (result.success && result.session) {
        dispatch({ 
          type: 'AUTH_SUCCESS', 
          payload: { user: result.session.user } 
        });
        return true;
      } else {
        dispatch({ 
          type: 'AUTH_ERROR', 
          payload: { error: result.error || 'SSO login failed' } 
        });
        return false;
      }
    } catch (error) {
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: { error: 'SSO login failed due to network error' } 
      });
      return false;
    }
  };
  
  const logout = () => {
    AuthService.logout();
    dispatch({ type: 'AUTH_LOGOUT' });
  };
  
  const refreshAuth = async () => {
    try {
      const result = await AuthService.refreshToken();
      
      if (result.success && result.session) {
        dispatch({ 
          type: 'AUTH_SUCCESS', 
          payload: { user: result.session.user } 
        });
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  };
  
  const value: AuthContextType = {
    state,
    login,
    ssoLogin,
    logout,
    refreshAuth
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
