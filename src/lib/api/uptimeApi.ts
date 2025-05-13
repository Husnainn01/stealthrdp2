import axios from 'axios';

// Get API base URL based on environment
const getApiBaseUrl = () => {
  // Check if we're on production domain
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'www.stealthrdp.com' || window.location.hostname === 'stealthrdp.com')) {
    return 'https://stealthrdp-production.up.railway.app/api/uptime';
  }
  
  // Fall back to environment variable or default
  return process.env.VITE_API_URL 
    ? `${process.env.VITE_API_URL}/uptime` 
    : 'http://localhost:5001/api/uptime';
};

// API endpoints - Using our simplified proxy server endpoint
const BASE_URL = getApiBaseUrl();

// Interface for monitor data
export interface Monitor {
  id: number;
  friendly_name: string;
  url: string;
  type: number;
  status: number;
  all_time_uptime_ratio: string;
  custom_uptime_ratio: string;
  average_response: number;
  create_datetime: number;
  logs?: {
    type: number;
    datetime: number;
    duration: number;
    reason: {
      code: number;
      detail: string;
    };
  }[];
}

// Status mapping for readability
export const statusMap = {
  0: 'Paused',
  1: 'Not checked yet',
  2: 'Up',
  8: 'Seems down',
  9: 'Down',
};

// Type mapping
export const typeMap = {
  1: 'HTTP(s)',
  2: 'Keyword',
  3: 'Ping',
  4: 'Port',
  5: 'Heartbeat',
};

// For backward compatibility - these functions don't do anything anymore
// as we're using our own server to handle proxying now
export const toggleCorsProxy = () => {
  console.log('CORS proxy not needed - using server API');
  return { usingProxy: false, currentProxy: 'Server API' };
};

export const disableCorsProxy = () => {
  console.log('CORS proxy not needed - using server API');
};

// Fetch all monitors
export const getMonitors = async (): Promise<Monitor[]> => {
  try {
    console.log('Fetching monitors via server API...');
    
    // Make the request to our server-side API
    const response = await axios.post(BASE_URL, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });

    // Log response status
    console.log('Server API response status:', response.status);
    
    // Check for API-specific error
    if (response.data?.stat === 'fail') {
      console.error('UptimeRobot API returned error via server:', response.data);
      throw new Error(`API Error: ${JSON.stringify(response.data?.error || 'Unknown API error')}`);
    }
    
    // Successful response
    if (response.status === 200 && response.data?.stat === 'ok') {
      const monitors = response.data.monitors || [];
      console.log(`Successfully retrieved ${monitors.length} monitors`);
      return monitors;
    }
    
    console.error('Unexpected API response format:', response.data);
    return [];
  } catch (error: any) {
    // Detailed error logging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server API error response:', {
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response from server API:', error.request);
      console.log('Server may not be running - make sure to start the Express server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Server API request error:', error.message);
    }
    
    throw error;
  }
};

// Get overall uptime stats
export const getUptimeStats = async () => {
  try {
    console.log('Fetching uptime statistics...');
    const monitors = await getMonitors();
    
    if (!monitors.length) {
      console.warn('No monitors found, cannot calculate statistics');
      return null;
    }
    
    // Calculate overall uptime stats
    const uptimeStats = {
      total: monitors.length,
      up: monitors.filter(m => m.status === 2).length,
      down: monitors.filter(m => m.status === 9).length,
      paused: monitors.filter(m => m.status === 0).length,
      overall: {
        day1: 0,
        day7: 0,
        day30: 0,
        day90: 0,
      }
    };
    
    console.log('Monitor status counts:', {
      total: uptimeStats.total,
      up: uptimeStats.up,
      down: uptimeStats.down,
      paused: uptimeStats.paused
    });
    
    // Calculate average uptime percentages across all monitors
    monitors.forEach(monitor => {
      if (monitor.custom_uptime_ratio) {
        const ratios = monitor.custom_uptime_ratio.split('-').map(Number);
        console.log(`Monitor ${monitor.id} uptime ratios:`, ratios);
        
        if (ratios.length >= 4) {
          const [day1, day7, day30, day90] = ratios;
          uptimeStats.overall.day1 += day1;
          uptimeStats.overall.day7 += day7;
          uptimeStats.overall.day30 += day30;
          uptimeStats.overall.day90 += day90;
        } else {
          console.warn(`Monitor ${monitor.id} has incomplete uptime ratios:`, ratios);
        }
      } else {
        console.warn(`Monitor ${monitor.id} has no custom_uptime_ratio`);
      }
    });
    
    // Get average percentages
    uptimeStats.overall.day1 = +(uptimeStats.overall.day1 / monitors.length).toFixed(2);
    uptimeStats.overall.day7 = +(uptimeStats.overall.day7 / monitors.length).toFixed(2);
    uptimeStats.overall.day30 = +(uptimeStats.overall.day30 / monitors.length).toFixed(2);
    uptimeStats.overall.day90 = +(uptimeStats.overall.day90 / monitors.length).toFixed(2);
    
    console.log('Calculated uptime statistics:', uptimeStats);
    return uptimeStats;
  } catch (error) {
    console.error('Error calculating uptime statistics:', error);
    throw error;
  }
}; 