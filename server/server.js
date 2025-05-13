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

// CORS Configuration - Define proper CORS options
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://www.stealthrdp.com', 
      'https://stealthrdp.com', 
      'http://localhost:8080'
    ];
    
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // origin is allowed
    } else {
      callback(null, true); // temporarily allow all origins for troubleshooting
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
  ],
  maxAge: 86400 // 24 hours
};

// Apply CORS middleware (before other middleware and routes)
app.use(cors(corsOptions));

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
  console.log(`CORS configured to allow specific origins: ${corsOptions.origin.toString()}`);
}); 