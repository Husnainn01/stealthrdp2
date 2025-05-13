// Base API URL - can be changed via environment variable or use stored working URL
const getApiBaseUrl = () => {
  // First check if we have a saved API base URL from a successful connection
  if (typeof window !== 'undefined') {
    const savedUrl = localStorage.getItem('api_base_url');
    if (savedUrl) {
      console.log('Using saved API base URL:', savedUrl);
      return `${savedUrl}/api`;
    }
    
    // Check if we're on production domain
    if (window.location.hostname === 'www.stealthrdp.com' || window.location.hostname === 'stealthrdp.com') {
      console.log('Production domain detected, using Railway API URL');
      // Railway uses port 8080 for the application
      return 'https://stealthrdp2-production.up.railway.app/api';
    }
  }
  
  // Fall back to environment variable or default
  return process.env.VITE_API_URL || 'http://localhost:5001/api';
};

const API_BASE_URL = getApiBaseUrl();

console.log('API_BASE_URL:', API_BASE_URL);

/**
 * Get auth token from local storage
 */
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get auth token
  const token = getAuthToken();
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  const config: RequestInit = {
    ...options,
    headers,
    // Explicitly set mode for debugging
    mode: 'cors',
    // Never use credentials for cross-origin requests
    credentials: 'omit'
  };
  
  console.log(`API Request: ${options.method || 'GET'} ${url}`);
  console.log('Request config:', JSON.stringify(config, null, 2));
  
  // Log request body if present
  if (options.body) {
    console.log('Request body:', options.body);
    try {
      const bodyObj = JSON.parse(options.body as string);
      console.log('Parsed request body:', bodyObj);
    } catch (e) {
      console.log('Could not parse request body as JSON');
    }
  }

  try {
    console.log('About to fetch from:', url);
    const response = await fetch(url, config);
    
    console.log(`Response status: ${response.status}`);
    console.log('Response headers:', [...response.headers.entries()]);
    
    // Handle unauthorized responses
    if (response.status === 401) {
      // Clear token if it's invalid
      if (token) {
        localStorage.removeItem('auth_token');
      }
      
      throw new Error('Unauthorized');
    }
    
    // Check if the request was successful
    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}`;
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      throw new Error(errorMessage);
    }
    
    // Parse the JSON response
    const data = await response.json();
    console.log('API Response data:', data);
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`API Error: ${error.message}`);
      console.error('Error details:', error);
      
      // Check if this is a CORS error
      if (error.message === 'Failed to fetch' || error.message.includes('CORS')) {
        console.error(`
          This might be a CORS issue. Make sure:
          1. The server is running on ${API_BASE_URL}
          2. CORS is properly configured on the server
          3. No proxies or firewalls are blocking the request
          4. Try with credentials: 'same-origin' or 'omit'
        `);
      }
      
      throw error;
    }
    console.error('Unknown API error', error);
    throw new Error('An unknown error occurred');
  }
}

/**
 * API Client with CRUD methods
 */
export const apiClient = {
  // GET request
  get: <T>(endpoint: string) => fetchAPI<T>(endpoint, { method: 'GET' }),
  
  // POST request
  post: <T>(endpoint: string, data: any) => 
    fetchAPI<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // PUT request
  put: <T>(endpoint: string, data: any) =>
    fetchAPI<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  // DELETE request
  delete: <T>(endpoint: string) =>
    fetchAPI<T>(endpoint, { method: 'DELETE' }),
};

export default apiClient; 