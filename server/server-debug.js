/**
 * Debug version of server.js with enhanced logging
 * 
 * Run this to get detailed logs of API route handling
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../public/uploads/blog');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory: ${uploadsDir}`);
}

// Enhanced Debug logging middleware
app.use((req, res, next) => {
  console.log(`\n=== NEW REQUEST [${new Date().toISOString()}] ===`);
  console.log(`${req.method} ${req.originalUrl}`);
  console.log('Request headers:', JSON.stringify(req.headers, null, 2));
  
  // Add more detailed debugging for file uploads
  if (req.method === 'POST' && req.originalUrl.includes('/upload')) {
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Has files?', req.files ? 'Yes' : 'No');
    if (req.files) {
      console.log('Files:', Object.keys(req.files));
    }
  }
  
  // Log request body for non-file uploads
  if (req.method !== 'GET' && !req.originalUrl.includes('/upload')) {
    const originalJson = res.json;
    res.json = function (body) {
      console.log('Response body:', JSON.stringify(body, null, 2));
      return originalJson.call(this, body);
    };
  }
  
  // Capture response status
  const originalEnd = res.end;
  res.end = function (chunk, encoding) {
    console.log(`Response status: ${res.statusCode}`);
    console.log(`=== END REQUEST [${new Date().toISOString()}] ===\n`);
    return originalEnd.call(this, chunk, encoding);
  };
  
  next();
});

// CORS Configuration
app.use((req, res, next) => {
  // Allow all origins
  res.header('Access-Control-Allow-Origin', '*');
  
  // Allow all methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  
  // Allow all headers by reflecting the requested headers back
  const requestedHeaders = req.headers['access-control-request-headers'];
  if (requestedHeaders) {
    res.header('Access-Control-Allow-Headers', requestedHeaders);
  } else {
    // Fallback to a comprehensive list of common headers
    res.header('Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, content-type, Accept, accept, Authorization, authorization, ' +
      'Cache-Control, cache-control, X-Access-Token, x-access-token, X-Refresh-Token, x-refresh-token');
  }
  
  // Allow credentials
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Set max age for preflight requests
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Apply regular body parsers for JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure file upload middleware for specific upload routes
app.use('/api/blogs/upload-image', fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  useTempFiles: true,
  tempFileDir: '/tmp/',
  debug: true,
  abortOnLimit: true,
  safeFileNames: true,
  preserveExtension: true
}));

// Test all privacy policy routes directly for debugging
app.get('/api/privacy-policy/all', (req, res) => {
  console.log('*** DIRECT PRIVACY POLICY ALL ROUTE HIT ***');
  res.json([{
    _id: 'test-id',
    content: 'Test privacy policy content - DIRECT ROUTE',
    publishedVersion: '1.0',
    effectiveDate: new Date(),
    isPublished: true,
    lastUpdated: new Date()
  }]);
});

// Serve static files from public directory
app.use(express.static('public'));

// Routes
console.log('*** MOUNTING API ROUTES ***');
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('StealthRDP API Debug Server is running');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

// Start server
const PORT = 5005;
const HOST = '0.0.0.0'; // Listen on all interfaces

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Debug server running on ${HOST}:${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log(`CORS configured to allow all origins for troubleshooting`);
  
  // Display all routes for debugging
  console.log('\n=== REGISTERED ROUTES ===\n');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) { // routes registered directly on the app
      console.log(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') { // router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const path = handler.route.path;
          const methods = Object.keys(handler.route.methods)
            .filter(method => handler.route.methods[method])
            .map(method => method.toUpperCase());
          console.log(`${methods.join(', ')} /api${path}`);
        }
      });
    }
  });
}); 