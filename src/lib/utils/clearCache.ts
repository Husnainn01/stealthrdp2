/**
 * Utility to clear old cached API URLs and force refresh
 */
export const clearOldApiCache = () => {
  if (typeof window !== 'undefined') {
    const savedUrl = localStorage.getItem('api_base_url');
    
    // Clear old URLs that are no longer valid
    if (savedUrl && (savedUrl.includes('stealthrdp-production') || savedUrl.includes('stealthrdp2-production'))) {
      console.log('Clearing old cached API URL:', savedUrl);
      localStorage.removeItem('api_base_url');
      
      // Also clear any auth tokens that might be associated with old URLs
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      
      return true; // Indicates cache was cleared
    }
  }
  
  return false; // No cache to clear
};

/**
 * Force clear all API-related cache and reload page
 */
export const forceRefreshApiCache = () => {
  if (typeof window !== 'undefined') {
    // Clear all API-related localStorage items
    localStorage.removeItem('api_base_url');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    
    console.log('Cleared all API cache, reloading page...');
    
    // Reload the page to start fresh
    window.location.reload();
  }
}; 