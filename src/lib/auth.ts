import { AuthSession, AuthState, User } from '@/types';
import { mockUsers } from './mock-data';

// Mock authentication utilities
const AUTH_STORAGE_KEY = 'nxconsole_auth_session';

export class AuthService {
  // Simulate login with SSO
  static async login(email: string, password: string): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (mock authentication)
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }
    
    // In a real app, you would verify the password here
    // For demo purposes, we'll accept any password for existing users
    
    const session: AuthSession = {
      user: {
        ...user,
        lastLogin: new Date()
      },
      token: this.generateMockToken(),
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours from now
    };
    
    // Store session in localStorage (in real app, use secure storage)
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    }
    
    return {
      success: true,
      session
    };
  }
  
  // Simulate SSO login
  static async ssoLogin(provider: 'microsoft' | 'google'): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
    // Simulate SSO flow delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, automatically login as admin user
    const user = mockUsers[0]; // Admin user
    
    const session: AuthSession = {
      user: {
        ...user,
        lastLogin: new Date()
      },
      token: this.generateMockToken(),
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000)
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    }
    
    return {
      success: true,
      session
    };
  }
  
  // Get current session
  static getCurrentSession(): AuthSession | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return null;
      
      const session: AuthSession = JSON.parse(stored);
      
      // Check if session is expired
      if (new Date() > new Date(session.expiresAt)) {
        this.logout();
        return null;
      }
      
      return session;
    } catch (error) {
      console.error('Error parsing stored session:', error);
      this.logout();
      return null;
    }
  }
  
  // Logout
  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }
  
  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return this.getCurrentSession() !== null;
  }
  
  // Refresh token (mock)
  static async refreshToken(): Promise<{ success: boolean; session?: AuthSession }> {
    const currentSession = this.getCurrentSession();
    
    if (!currentSession) {
      return { success: false };
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newSession: AuthSession = {
      ...currentSession,
      token: this.generateMockToken(),
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000)
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newSession));
    }
    
    return {
      success: true,
      session: newSession
    };
  }
  
  // Generate mock JWT token
  private static generateMockToken(): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      sub: 'user_id', 
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60 
    }));
    const signature = btoa('mock_signature');
    
    return `${header}.${payload}.${signature}`;
  }
}

// Initial auth state
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

// Auth action types
export type AuthAction = 
  | { type: 'AUTH_LOADING' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User } }
  | { type: 'AUTH_ERROR'; payload: { error: string } }
  | { type: 'AUTH_LOGOUT' };

// Auth reducer
export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case 'AUTH_SUCCESS':
      return {
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
        error: null
      };
      
    case 'AUTH_ERROR':
      return {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload.error
      };
      
    case 'AUTH_LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      };
      
    default:
      return state;
  }
}

// Protected route helper
export function requireAuth(): User | null {
  const session = AuthService.getCurrentSession();
  return session?.user || null;
}
