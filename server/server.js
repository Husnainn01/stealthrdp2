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

// CORS Configuration - Making completely permissive for troubleshooting
app.use((req, res, next) => {
  // Get origin from request
  const origin = req.headers.origin;
  
  // Allow specific origins or use * for development
  const allowedOrigins = ['https://www.stealthrdp.com', 'https://stealthrdp.com', 'http://localhost:8080'];
  
  // Set Access-Control-Allow-Origin header
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    // For local development or unknown origins
    res.header('Access-Control-Allow-Origin', '*');
  }
  
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

// Additional specific CORS handling for file uploads is no longer needed
// as our custom middleware handles all endpoints including file uploads
// app.options('/api/blogs/upload-image', cors(corsOptions));
// app.use('/api/blogs/upload-image', cors(corsOptions));

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

// Direct privacy policy routes for debugging
const privacyPolicyController = require('./controllers/privacyPolicyController');
app.get('/api/privacy-policy/all', privacyPolicyController.getAllPrivacyPolicies);
app.get('/api/privacy-policy', privacyPolicyController.getPrivacyPolicy);
app.post('/api/privacy-policy', privacyPolicyController.updatePrivacyPolicy);
app.put('/api/privacy-policy/:id', privacyPolicyController.updatePrivacyPolicy);
app.delete('/api/privacy-policy/:id', privacyPolicyController.deletePrivacyPolicy);

// Serve static files from public directory
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('StealthRDP API is running');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

// Set port - explicitly log environment variables for debugging
console.log('Environment variables:');
console.log('process.env.PORT =', process.env.PORT);

// Force port to 5001 to avoid conflicts with macOS Control Center
const PORT = 5001;
const HOST = '0.0.0.0'; // Listen on all interfaces

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log(`CORS configured to allow all origins for troubleshooting`);
}); 