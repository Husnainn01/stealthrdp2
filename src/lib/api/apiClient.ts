// Base API URL - can be changed via environment variable
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  const config = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);
    
    // Handle unauthorized responses
    if (response.status === 401) {
      // You can handle auth errors here (e.g., redirect to login)
      throw new Error('Unauthorized');
    }
    
    // Check if the request was successful
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }
    
    // Parse the JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`API Error: ${error.message}`);
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