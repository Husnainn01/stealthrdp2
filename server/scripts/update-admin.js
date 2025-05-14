const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const connectDB = require('../db');

// Load environment variables
dotenv.config();

async function updateAdmin() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Find the first admin or create one if it doesn't exist
    let admin = await Admin.findOne();
    
    if (!admin) {
      console.log('No admin found, creating new admin...');
      admin = new Admin({
        username: 'ch#Q@nFC7azRC',
        email: 'admin@stealthrdp.com',
        password: '4b&$YNc5#FjAJ5Ths#GB3P7S3J$E',
        role: 'superadmin'
      });
    } else {
      console.log('Updating existing admin...');
      admin.username = 'ch#Q@nFC7azRC';
      admin.password = '4b&$YNc5#FjAJ5Ths#GB3P7S3J$E';
    }
    
    await admin.save();
    console.log('Admin credentials updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating admin:', error);
    process.exit(1);
  }
}

updateAdmin(); 