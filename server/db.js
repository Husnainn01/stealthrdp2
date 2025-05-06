const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Connection string from environment variables or fallback for local development
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://stlrdp:rg7CVEVCA6VVNck0@cluster0.oydwmof.mongodb.net/';

// Database Name from environment or fallback
const DB_NAME = process.env.DB_NAME || 'stealthrdp';

// Full connection URL
const connectionURL = `${MONGODB_URI}${DB_NAME}`;

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 