// Simple proxy server focused only on the UptimeRobot API
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Super permissive CORS handling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Parse JSON bodies
app.use(express.json());

// Single route for UptimeRobot API proxy
app.post('/api/uptime', async (req, res) => {
  try {
    console.log('Received uptime request');
    
    // Get API key from env
    const apiKey = process.env.UPTIMEROBOT_API_KEY || 'u2086732-b02119a20d7dc8f1fc75a99c';
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API key not configured' 
      });
    }
    
    console.log('Making UptimeRobot API request');
    
    // Make the actual request to UptimeRobot
    const response = await axios.post('https://api.uptimerobot.com/v2/getMonitors', {
      api_key: apiKey,
      format: 'json',
      logs: 1,
      custom_uptime_ratios: '1-7-30-90',
      response_times: 1,
      response_times_limit: 10,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });
    
    console.log('UptimeRobot API response received');
    
    // Return the response directly
    return res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'API error',
        details: error.response.data
      });
    }
    
    return res.status(500).json({
      error: 'Proxy error',
      message: error.message
    });
  }
});

// Simple test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Proxy server is working!' });
});

// Start server
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Simple proxy server running on http://localhost:${PORT}`);
  console.log('Try testing at http://localhost:5002/test');
}); 