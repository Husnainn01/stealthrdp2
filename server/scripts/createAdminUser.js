/**
 * Script to create an initial admin user
 * 
 * Run with: node scripts/createAdminUser.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../db');

// Connection string from environment variables or fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://stlrdp:rg7CVEVCA6VVNck0@cluster0.oydwmof.mongodb.net/';
const DB_NAME = process.env.DB_NAME || 'stealthrdp';

// Admin user details
const adminUser = {
  username: 'admin',
  email: 'admin@stealthrdp.com',
  password: 'admin123',  // This should be changed immediately after first login
  role: 'superadmin'
};

// Function to create admin
const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ email: adminUser.email }, { username: adminUser.username }] 
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }
    
    // Create new admin user
    const admin = await Admin.create(adminUser);
    
    console.log(`Admin user created successfully with username: ${admin.username}`);
    console.log('Please change the password immediately after first login.');
    
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    process.exit(0);
  }
};

// Run the function
createAdmin(); 