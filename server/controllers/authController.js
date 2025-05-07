const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret_dev_only', {
    expiresIn: '1d' // Token expires in 1 day
  });
};

// @desc    Register admin user
// @route   POST /api/auth/register
// @access  Private (superadmin only - to be implemented with middleware)
exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if admin already exists
    const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });
    if (adminExists) {
      return res.status(400).json({ 
        message: 'User already exists with this email or username' 
      });
    }

    // Create new admin
    const admin = await Admin.create({
      username,
      email,
      password,
      role: role || 'admin' // Default to admin if not specified
    });

    // If created successfully, return admin data with token
    if (admin) {
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id)
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    // Find admin by username or email and explicitly select password
    const admin = await Admin.findOne({ 
      $or: [{ username }, { email: username }] 
    }).select('+password');

    // Check if admin exists and password matches
    if (admin && (await admin.matchPassword(password))) {
      // Update last login
      await Admin.findByIdAndUpdate(admin._id, { lastLogin: Date.now() });

      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get admin profile
// @route   GET /api/auth/profile
// @access  Private
exports.getAdminProfile = async (req, res) => {
  try {
    // Find admin by id - req.admin is set in the auth middleware
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}; 