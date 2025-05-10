const http = require('http');
const express = require('express');
const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Privacy policy test route
app.get('/api/privacy-policy/all', (req, res) => {
  console.log('GET /api/privacy-policy/all route hit');
  res.json([{
    _id: '1234567890',
    content: 'Test privacy policy content',
    publishedVersion: '1.0',
    effectiveDate: new Date(),
    isPublished: true,
    lastUpdated: new Date()
  }]);
});

// Default route
app.get('*', (req, res) => {
  console.log('Test server received request:', req.path);
  res.send('Test server running');
});

// Start server on port 5002
const server = http.createServer(app);
server.listen(5002, () => {
  console.log('Test server running on port 5002');
  console.log('Use this to test if your frontend can connect to a different port');
  console.log('You can try making a request to http://localhost:5002/api/privacy-policy/all');
}); 