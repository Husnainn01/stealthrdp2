const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables for the API key
dotenv.config();

// Import controllers
const testimonialController = require('../controllers/testimonialController');
const featureController = require('../controllers/featureController');
const planController = require('../controllers/planController');
const faqController = require('../controllers/faqController');
const blogController = require('../controllers/blogController');
const mediaController = require('../controllers/mediaController');
const privacyPolicyController = require('../controllers/privacyPolicyController');

// Testimonial routes
router.route('/testimonials')
  .get(testimonialController.getTestimonials)
  .post(testimonialController.createTestimonial);

router.route('/testimonials/:id')
  .get(testimonialController.getTestimonialById)
  .put(testimonialController.updateTestimonial)
  .delete(testimonialController.deleteTestimonial);

// Feature routes
router.route('/features')
  .get(featureController.getFeatures)
  .post(featureController.createFeature);

router.route('/features/:id')
  .get(featureController.getFeatureById)
  .put(featureController.updateFeature)
  .delete(featureController.deleteFeature);

// Plan routes
router.route('/plans')
  .get(planController.getPlans)
  .post(planController.createPlan);

router.route('/plans/:id')
  .get(planController.getPlanById)
  .put(planController.updatePlan)
  .delete(planController.deletePlan);

// FAQ routes - REORDERED for proper routing
// Place specific routes first, generic ID route last
router.route('/faqs/published')
  .get(faqController.getPublishedFaqs);

router.route('/faqs/category/:category')
  .get(faqController.getFaqsByCategory);

router.route('/faqs')
  .get(faqController.getAllFaqs)
  .post(faqController.createFaq);

router.route('/faqs/:id')
  .get(faqController.getFaqById)
  .put(faqController.updateFaq)
  .delete(faqController.deleteFaq);

// Blog routes
router.route('/blogs/published')
  .get(blogController.getPublishedBlogs);

router.route('/blogs/slug/:slug')
  .get(blogController.getBlogBySlug);

router.route('/blogs/upload-image')
  .post(blogController.uploadImage);

router.route('/blogs')
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router.route('/blogs/:id')
  .get(blogController.getBlogById)
  .put(blogController.updateBlog)
  .delete(blogController.deleteBlog);

// Media routes
router.route('/media/counts')
  .get(mediaController.getMediaCounts);

router.route('/media/batch-delete')
  .post(mediaController.batchDeleteMedia);

router.route('/media')
  .get(mediaController.getAllMedia);

router.route('/media/:id')
  .delete(mediaController.deleteMedia);

// Privacy Policy routes
router.route('/privacy-policy')
  .get(privacyPolicyController.getPrivacyPolicy)
  .post(privacyPolicyController.updatePrivacyPolicy);

router.route('/privacy-policy/all')
  .get(privacyPolicyController.getAllPrivacyPolicies);

router.route('/privacy-policy/:id')
  .put(privacyPolicyController.updatePrivacyPolicy)
  .delete(privacyPolicyController.deletePrivacyPolicy);

// UptimeRobot API proxy endpoint
router.post('/uptime', async (req, res) => {
  try {
    console.log('Received uptime request');
    console.log('Request headers:', req.headers);
    
    // Explicitly set CORS headers for this endpoint
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control');
    
    // If it's a preflight request, respond immediately
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // Get the API key from environment variables
    const apiKey = process.env.UPTIMEROBOT_API_KEY;
    
    if (!apiKey) {
      console.error('Missing UPTIMEROBOT_API_KEY in environment variables');
      return res.status(500).json({ 
        error: 'API key not configured on server',
        message: 'Please add UPTIMEROBOT_API_KEY to your server environment variables'
      });
    }
    
    console.log('Making UptimeRobot API request with provided key');
    
    // Make request to UptimeRobot API - using string concatenation instead of template literals
    // to avoid any potential issues with path-to-regexp parsing
    const uptimeRobotUrl = 'https://api.uptimerobot.com/v2/getMonitors';
    const response = await axios.post(uptimeRobotUrl, {
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
    
    // Return the API response directly
    res.json(response.data);
  } catch (error) {
    console.error('Error in UptimeRobot API proxy:', error.message);
    
    // Provide detailed error information
    let errorDetail = 'Unknown error';
    if (error.response) {
      // The request was made and the server responded with a non-2xx status
      console.error('API Error response:', {
        status: error.response.status,
        data: error.response.data
      });
      errorDetail = `API responded with status ${error.response.status}`;
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from API');
      errorDetail = 'No response received from UptimeRobot API';
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
      errorDetail = error.message;
    }
    
    res.status(500).json({
      error: 'Failed to fetch UptimeRobot data',
      detail: errorDetail
    });
  }
});

// Enhanced test endpoint to test CORS and API functionality
router.get('/cors-test', (req, res) => {
  res.json({ 
    message: 'CORS test successful!',
    headers: req.headers,
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  });
});

// Test endpoint that accepts POST requests (like our uptime endpoint)
router.post('/post-test', (req, res) => {
  res.json({
    message: 'POST request successful!',
    body: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 