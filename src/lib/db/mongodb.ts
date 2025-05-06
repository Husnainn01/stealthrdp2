import mongoose from 'mongoose';

// Get connection string from environment variables or use fallback for local development
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://stlrdp:rg7CVEVCA6VVNck0@cluster0.oydwmof.mongodb.net/';

// Database Name from environment or fallback
const DB_NAME = process.env.DB_NAME || 'stealthrdp';

// Track connection status
let isConnected = false;

/**
 * Connect to MongoDB
 */
export const connectToDatabase = async () => {
  // If already connected, return the existing connection
  if (isConnected) {
    console.log('=> Using existing database connection');
    return;
  }

  try {
    console.log('=> Connecting to MongoDB...');
    // Connect to MongoDB Atlas with the full connection string including database name
    const db = await mongoose.connect(`${MONGODB_URI}${DB_NAME}`);
    
    isConnected = !!db.connections[0].readyState;
    
    console.log('=> Connected to MongoDB:', DB_NAME);
    
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't throw error in development to prevent app crashing
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectFromDatabase = async () => {
  if (!isConnected) {
    return;
  }
  
  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('=> Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
};

// Export mongoose for model creation elsewhere
export { mongoose }; 