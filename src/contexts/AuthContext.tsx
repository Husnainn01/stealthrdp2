import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi, { AuthResponse } from '@/lib/api/authApi';

// Define the Auth Context interface
interface AuthContextType {
  user: AuthResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUserState: () => Promise<void>;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Function to refresh user state from the token
  const refreshUserState = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    // Try to get cached user data
    let userData: any = null;
    const cachedUserData = localStorage.getItem('user_data');
    if (cachedUserData) {
      try {
        userData = JSON.parse(cachedUserData);
      } catch {}
    }

    // Always try to fetch the latest profile
    try {
      const profileResponse = await fetch('http://localhost:5001/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (profileResponse.ok) {
        userData = await profileResponse.json();
        localStorage.setItem('user_data', JSON.stringify(userData));
      }
    } catch (e) {
      // If fetch fails, fallback to cached userData
    }

    if (userData) {
      setUser({ ...userData, token });
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  // Only call refreshUserState on mount and on storage event
  useEffect(() => {
    refreshUserState();

    // Listen for storage events (token changes in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token') {
        refreshUserState();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshUserState]);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if we already have a token and userData from the direct login
      const existingToken = localStorage.getItem('auth_token');
      const existingUserData = localStorage.getItem('user_data');
      
      if (existingToken && existingUserData) {
        try {
          // Use the existing user data
          const userData = JSON.parse(existingUserData);
          setUser({ ...userData, token: existingToken });
          return;
        } catch (parseErr) {
          console.error('Error parsing existing user data:', parseErr);
          // Continue with regular login if parsing fails
        }
      }
      
      // Make login request if we don't have existing data
      const data = await authApi.login({ username, password });
      
      // Save token to localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data));
      
      // Set user state
      setUser(data);
      
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      setUser(null);
      throw err; // Re-throw to handle in the component
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('auth_token');
    
    // Clear user state
    setUser(null);
    
    // Redirect to login page
    navigate('/login');
  };

  // Auth context value
  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    login,
    logout,
    refreshUserState
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext; 