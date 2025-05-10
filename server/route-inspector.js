/**
 * This script loads the Express app and logs all registered routes.
 * Run this to troubleshoot missing routes.
 */
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes');

// Create Express app (similar to server.js but simplified)
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// Mount routes the same way as in server.js
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Add a dummy route to ensure the router is initialized
app.get('/', (req, res) => res.send('Test'));

// Helper function to output route information
function getRoutes(stack, basePath = '') {
  return stack.reduce((routes, layer) => {
    if (layer.route) {
      // This is a route layer
      const path = basePath + layer.route.path;
      const methods = Object.keys(layer.route.methods)
        .filter(method => layer.route.methods[method])
        .map(method => method.toUpperCase());
      
      routes.push({ path, methods });
    } else if (layer.name === 'router' && layer.handle.stack) {
      // This is a middleware with a router
      const path = layer.regexp.source.replace('^\\/','').replace('\\/?(?=\\/|$)', '').replace(/\\\//g, '/');
      const nestedRoutes = getRoutes(layer.handle.stack, basePath + (path === '(?=\\/)?' ? '' : '/' + path));
      routes.push(...nestedRoutes);
    }
    return routes;
  }, []);
}

// Get all routes in the app
console.log('\n=== EXAMINING EXPRESS ROUTES ===\n');

if (!app._router) {
  console.log('Warning: Express app router not initialized yet. Adding a dummy route...');
} else {
  const routes = getRoutes(app._router.stack);

  // Print the routes
  console.log('\n=== REGISTERED ROUTES ===\n');
  routes.forEach(route => {
    console.log(`${route.methods.join(', ')} ${route.path}`);
  });

  // Specifically check for the privacy policy routes
  console.log('\n=== PRIVACY POLICY ROUTES ===\n');
  const privacyPolicyRoutes = routes.filter(route => route.path.includes('privacy-policy'));
  if (privacyPolicyRoutes.length === 0) {
    console.log('No privacy policy routes found!');
  } else {
    privacyPolicyRoutes.forEach(route => {
      console.log(`${route.methods.join(', ')} ${route.path}`);
    });
  }
}

// Let's examine the structure of the API router directly
console.log('\n=== API ROUTER STRUCTURE ===\n');
console.log('API Router Stack Length:', apiRoutes.stack ? apiRoutes.stack.length : 'No stack property');

// Try to print routes by examining the stack directly
if (apiRoutes.stack) {
  apiRoutes.stack.forEach((layer, index) => {
    if (layer.route) {
      const path = layer.route.path;
      const methods = Object.keys(layer.route.methods)
        .filter(method => layer.route.methods[method])
        .map(method => method.toUpperCase());
      
      console.log(`Route ${index}: ${methods.join(', ')} ${path}`);
    } else {
      console.log(`Layer ${index}: ${layer.name} (not a route)`);
    }
  });
}

// Print the routes defined in apiRoutes that include privacy-policy
if (apiRoutes.stack) {
  console.log('\n=== PRIVACY POLICY ROUTES IN API ROUTER ===\n');
  const privacyPolicyLayers = apiRoutes.stack.filter(layer => 
    layer.route && layer.route.path && layer.route.path.includes('privacy-policy')
  );
  
  if (privacyPolicyLayers.length === 0) {
    console.log('No privacy policy routes found in API router!');
  } else {
    privacyPolicyLayers.forEach((layer, index) => {
      const path = layer.route.path;
      const methods = Object.keys(layer.route.methods)
        .filter(method => layer.route.methods[method])
        .map(method => method.toUpperCase());
      
      console.log(`Route ${index}: ${methods.join(', ')} ${path}`);
    });
  }
}

console.log('\n=== END ===\n'); 