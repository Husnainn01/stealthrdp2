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

// Safety middleware to intercept potential path-to-regexp errors
app.use((req, res, next) => {
  // Check if URL contains a colon without being properly escaped
  try {
    // This will catch badly formatted URLs before they crash the app
    if (req.url && req.url.includes('http')) {
      console.warn('WARNING: URL contains http - this might cause path-to-regexp errors:', req.url);
      // Sanitize the URL by removing any potentially problematic patterns
      req.url = req.url.replace(/https?:\/\/[^\/]+/g, '');
    }
    next();
  } catch (err) {
    console.error('URL parsing error:', err);
    res.status(400).json({ error: 'Invalid URL format' });
  }
});

// Apply CORS middleware with proper configuration for credentials
app.use(cors({
  origin: function(origin, callback) {
    console.log('Incoming request from origin:', origin || 'no origin');
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:8080',
      'http://localhost:3000',
      'https://stealthrdp.com',
      'https://www.stealthrdp.com',
      'https://stealthrdp-production.up.railway.app',
      'https://stealthrdp2-production.up.railway.app'
    ];
    
    // For local development or non-browser requests that don't send origin
    if (!origin) {
      callback(null, '*'); // Allow requests with no origin (like mobile apps or curl requests)
    } else if (allowedOrigins.includes(origin)) {
      callback(null, origin); // Allow the specific origin
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(null, allowedOrigins[0]); // Default to first allowed origin if not matching
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Origin', 
    'X-Requested-With', 
    'Content-Type', 
    'Accept', 
    'Authorization', 
    'Cache-Control',
    'X-Access-Token',
    'X-Refresh-Token'
  ]
}));

// Also set the Access-Control-Allow-Origin header explicitly for all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === 'https://www.stealthrdp.com' || origin === 'https://stealthrdp.com') {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

// Connect to MongoDB
connectDB();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../public/uploads/blog');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory: ${uploadsDir}`);
}

// Debug logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  console.log('Request headers:', req.headers);
  
  // Add more detailed debugging for file uploads
  if (req.method === 'POST' && req.originalUrl.includes('/upload')) {
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Has files?', req.files ? 'Yes' : 'No');
    if (req.files) {
      console.log('Files:', Object.keys(req.files));
    }
  }
  
  next();
});

// Apply regular body parsers for JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Explicit handler for OPTIONS requests (CORS preflight)
app.options('*', (req, res) => {
  console.log('Handling OPTIONS preflight request');
  
  // Set CORS headers for OPTIONS requests
  const origin = req.headers.origin;
  if (origin === 'https://www.stealthrdp.com' || origin === 'https://stealthrdp.com') {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, X-Access-Token, X-Refresh-Token');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  
  res.status(200).end();
});

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

// Direct privacy policy routes for debugging
const privacyPolicyController = require('./controllers/privacyPolicyController');
app.get('/api/privacy-policy/all', privacyPolicyController.getAllPrivacyPolicies);
app.get('/api/privacy-policy', privacyPolicyController.getPrivacyPolicy);
app.post('/api/privacy-policy', privacyPolicyController.updatePrivacyPolicy);
app.put('/api/privacy-policy/:id', privacyPolicyController.updatePrivacyPolicy);
app.delete('/api/privacy-policy/:id', privacyPolicyController.deletePrivacyPolicy);

// Serve static files from the React app's build directory
const buildPath = path.join(__dirname, '../dist');
if (fs.existsSync(buildPath)) {
  console.log(`Serving static files from: ${buildPath}`);
  app.use(express.static(buildPath));
} else {
  console.log(`Build directory not found at: ${buildPath}, falling back to public`);
}

// Serve static files from public directory
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  // Only respond with API message if requesting the root path from the API domain
  const host = req.get('host');
  if (host && host.includes('railway.app')) {
    res.send('StealthRDP API is running');
  } else {
    // Otherwise try to serve the frontend index.html
    const indexPath = path.join(__dirname, '../dist/index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.send('StealthRDP API is running');
    }
  }
});

// Add a debug route to check CORS
app.get('/api/debug', (req, res) => {
  res.json({
    message: 'Debug endpoint is working',
    cors: 'If you see this, CORS is working',
    headers: req.headers,
    environment: process.env.NODE_ENV,
    port: process.env.PORT
  });
});

// Catch-all route for client-side routing - serve index.html for any non-API routes
app.get('*', (req, res, next) => {
  // Skip for API routes
  if (req.path.startsWith('/api')) {
    return next();
  }
  
  console.log(`Handling client-side route: ${req.path}`);
  
  // Try to serve the index.html file
  const indexPath = path.join(__dirname, '../dist/index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  } else {
    console.error(`Index.html not found at: ${indexPath}`);
    next(); // Let the 404 handler take care of it
  }
});

// Add a catchall route for unmatched API routes
app.use('*', (req, res) => {
  // Only handle API routes in this catchall
  if (req.originalUrl.startsWith('/api')) {
    res.status(404).json({
      message: 'API route not found',
      path: req.originalUrl,
      method: req.method
    });
  } else {
    // Non-API routes should have been handled by the previous catch-all
    res.status(404).send('Not found');
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

// Set port - explicitly log environment variables for debugging
console.log('Environment variables:');
console.log('process.env.PORT =', process.env.PORT);

// Use environment PORT or default to 5001
// Railway seems to be using port 5001 for this service
const PORT = 5001;
const HOST = '0.0.0.0'; // Listen on all interfaces

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
  
  // Generate proper server URL based on environment
  const serverUrl = process.env.NODE_ENV === 'production' 
    ? 'https://stealthrdp2-production.up.railway.app' 
    : `http://localhost:${PORT}`;
    
  console.log(`Server URL: ${serverUrl}`);
  console.log(`CORS configured for specific origins with credentials support`);
});