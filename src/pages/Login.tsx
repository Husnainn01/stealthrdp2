import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon, ChevronRightIcon, LockClosedIcon, CheckIcon } from '@radix-ui/react-icons';
import { Checkbox } from '@/components/ui/checkbox';

// Add custom styles for animations
const loginAnimationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes pulse {
    0% { opacity: 0.4; }
    50% { opacity: 0.7; }
    100% { opacity: 0.4; }
  }
  
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .login-animate-in {
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  .login-input-focused {
    border-color: #00F0FF !important;
    box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.2);
  }
  
  .bg-gradient-animate {
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
  }
  
  .floating-icon {
    animation: float 6s ease-in-out infinite;
  }
  
  .bg-grid {
    background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 24px 24px;
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loginAttempted, setLoginAttempted] = useState(false);
  
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  // Animate elements as they appear
  useEffect(() => {
    // Load saved username if it exists
    const savedUsername = localStorage.getItem('saved_username');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginAttempted(true);
    
    // Basic form validation
    if (!username.trim() || !password.trim()) {
      setFormError('Please enter both username and password');
      return;
    }
    
    // Save username if remember me is checked
    if (rememberMe) {
      localStorage.setItem('saved_username', username);
    } else {
      localStorage.removeItem('saved_username');
    }
    
    setFormError('');
    setDebugInfo('Starting login process...');
    
    try {
      // Try direct API call for debugging
      const directUrl = 'http://localhost:5001/api/auth/login';
      setDebugInfo(prev => prev + `\nTrying direct fetch to: ${directUrl}`);
      
      const response = await fetch(directUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        mode: 'cors'
      });
      
      setDebugInfo(prev => prev + `\nResponse status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        setDebugInfo(prev => prev + `\nLogin successful. Token: ${data.token.substring(0, 10)}...`);
        
        // Store token and user data in localStorage - this helps auth context
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data));
        
        // Navigate to admin dashboard
        setDebugInfo(prev => prev + `\nRedirecting to dashboard...`);
        
        // Short delay to ensure token is stored before navigation
        setTimeout(() => {
          navigate('/admin');
        }, 500);
      } else {
        setDebugInfo(prev => prev + `\nLogin failed. HTTP status: ${response.status}`);
        setFormError(`Login failed: ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setDebugInfo(prev => prev + `\nError during login: ${errorMessage}`);
      console.error('Login error:', err);
      setFormError(`Error: ${errorMessage}`);
      
      // Fall back to normal login
      setDebugInfo(prev => prev + '\nFalling back to normal login method...');
      try {
        await login(username, password);
      } catch (loginErr) {
        console.error('Fallback login also failed:', loginErr);
      }
    }
  };
  
  const handleTestServerConnection = async () => {
    try {
      setDebugInfo('Testing connection to server...');
      setShowDebugPanel(true);

      // Try different URLs and approaches
      const urls = [
        'http://localhost:5001',
        'http://127.0.0.1:5001',  // direct IP
      ];
      
      for (const baseUrl of urls) {
        setDebugInfo(prev => `${prev}\n\nTrying URL: ${baseUrl}`);
        
        try {
          // Simple GET request to root path
          const resp = await fetch(`${baseUrl}/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Accept': 'text/plain'
            }
          });
          
          setDebugInfo(prev => `${prev}\n- GET / status: ${resp.status}`);
          
          if (resp.ok) {
            const text = await resp.text();
            setDebugInfo(prev => `${prev}\n- Response: ${text}`);
            
            // If GET works, try a POST to login
            try {
              setDebugInfo(prev => `${prev}\n\n- Trying login with ${baseUrl}:`);
              const loginResp = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: 'admin',
                  password: 'admin123'
                }),
                mode: 'cors',
              });
              
              setDebugInfo(prev => `${prev}\n- Login status: ${loginResp.status}`);
              
              if (loginResp.ok) {
                const data = await loginResp.json();
                setDebugInfo(prev => `${prev}\n- Login successful! Token: ${data.token.substring(0, 10)}...`);
                
                // Store the working URL for future use
                localStorage.setItem('api_base_url', baseUrl);
                
                // Store token
                localStorage.setItem('auth_token', data.token);
                
                // Success! Offer to navigate
                setDebugInfo(prev => `${prev}\n\n✅ CONNECTION SUCCESSFUL with ${baseUrl}\nClick Login to proceed to admin dashboard.`);
                break;
              }
            } catch (loginErr) {
              const errMsg = loginErr instanceof Error ? loginErr.message : String(loginErr);
              setDebugInfo(prev => `${prev}\n- Login error: ${errMsg}`);
            }
          }
        } catch (urlErr) {
          const errMsg = urlErr instanceof Error ? urlErr.message : String(urlErr);
          setDebugInfo(prev => `${prev}\n- Error: ${errMsg}`);
        }
      }
      
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      setDebugInfo(prev => `${prev}\nTest failed: ${errorMsg}`);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-animate bg-gradient-to-br from-midnight via-[#101b36] to-charcoal p-4 overflow-hidden relative">
      {/* Inject custom styles */}
      <style>{loginAnimationStyles}</style>
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-electric/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyber/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 login-animate-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-electric to-cyber flex items-center justify-center text-midnight text-2xl font-bold shadow-lg floating-icon">
              <LockClosedIcon className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">StealthRDP</h1>
          <p className="text-electric mt-2 font-medium">Admin Dashboard</p>
        </div>
        
        <Card className="bg-midnight/80 border-white/10 backdrop-blur-sm login-animate-in shadow-xl" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">Sign In</CardTitle>
            <CardDescription className="text-white/70">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {(error || formError) && (
                <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-300 animate-pulse">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertDescription>
                    {formError || error}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-3">
                <Label htmlFor="username" className="text-white text-sm font-medium">
                  Username or Email
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    placeholder="Enter your username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`bg-charcoal/70 border-white/10 text-white h-11 pl-4 pr-4 ${focusedField === 'username' ? 'login-input-focused' : ''} ${loginAttempted && !username.trim() ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    autoComplete="username"
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                  />
                  {username.trim() && (
                    <CheckIcon className="absolute right-3 top-3.5 h-4 w-4 text-green-400" />
                  )}
                </div>
                {loginAttempted && !username.trim() && (
                  <p className="text-red-400 text-xs mt-1">Username is required</p>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-white text-sm font-medium">
                    Password
                  </Label>
                  <Link to="/forgot-password" className="text-xs text-electric hover:text-cyber transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`bg-charcoal/70 border-white/10 text-white h-11 pl-4 pr-4 ${focusedField === 'password' ? 'login-input-focused' : ''} ${loginAttempted && !password.trim() ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    autoComplete="current-password"
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                  />
                  {password.trim() && (
                    <CheckIcon className="absolute right-3 top-3.5 h-4 w-4 text-green-400" />
                  )}
                </div>
                {loginAttempted && !password.trim() && (
                  <p className="text-red-400 text-xs mt-1">Password is required</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="data-[state=checked]:bg-electric data-[state=checked]:border-electric"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white/80"
                >
                  Remember me
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-electric text-midnight hover:bg-cyber transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)] h-11 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2 h-5 w-5 border-t-2 border-b-2 border-current rounded-full"></span>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Sign In
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-midnight px-2 text-white/50">Or</span>
                </div>
              </div>
              
              <div className="text-center text-xs text-white/50">
                <button 
                  type="button" 
                  className="text-electric hover:text-cyber underline transition-colors focus:outline-none"
                  onClick={() => setShowDebugPanel(!showDebugPanel)}
                >
                  {showDebugPanel ? 'Hide' : 'Show'} advanced options
                </button>
              </div>
              
              {showDebugPanel && (
                <>
                  <Button 
                    type="button" 
                    className="w-full bg-midnight border border-electric/40 text-electric hover:bg-electric/10 transition-colors"
                    onClick={handleTestServerConnection}
                  >
                    Test Server Connection
                  </Button>
                  
                  {debugInfo && (
                    <div className="mt-4 p-2 bg-charcoal/70 rounded text-xs text-white/70 font-mono overflow-auto max-h-28 border border-white/10">
                      {debugInfo.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-white/50 text-center w-full">
                <span>Need help? </span>
                <a href="mailto:support@stealthrdp.com" className="text-electric hover:text-cyber transition-colors">
                  Contact support
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login; 