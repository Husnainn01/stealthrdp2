// This is a simple fallback server in case server.js has path-to-regexp issues
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// Apply basic middleware
app.use(express.json());

// Basic CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Debug endpoint
app.get('/api/debug', (req, res) => {
  res.json({
    message: 'Debug endpoint is working',
    environment: process.env.NODE_ENV,
    port: PORT
  });
});

// Simple root endpoint
app.get('/', (req, res) => {
  res.send('StealthRDP API is running (simplified version)');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Simple server running on port ${PORT}`);
}); 