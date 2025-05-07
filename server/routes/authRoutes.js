const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, isSuperAdmin } = require('../middleware/authMiddleware');

// Debug middleware
const logRequest = (req, res, next) => {
  console.log(`Auth Route: ${req.method} ${req.originalUrl}`);
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  next();
};

// Apply debug middleware to all auth routes
router.use(logRequest);

// Login route - public
router.post('/login', authController.loginAdmin);

// Register route - protected & superadmin only
router.post('/register', protect, isSuperAdmin, authController.registerAdmin);

// Get admin profile - protected
router.get('/profile', protect, authController.getAdminProfile);

module.exports = router; 