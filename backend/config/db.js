// backend/config/db.js
import mongoose from 'mongoose';

let isConnected = false;

/**
 * Connects to MongoDB with reconnection logic and graceful fallback
 */
export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('⚠️ [MongoDB] No MONGODB_URI found in environment variables. Database persistence is in standby mode.');
    return false;
  }

  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: process.env.NODE_ENV !== 'production'
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`🍃 [MongoDB] Successfully connected to database: ${conn.connection.name} @ ${conn.connection.host}`);
    
    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('⚠️ [MongoDB] Lost database connection.');
    });

    mongoose.connection.on('reconnected', () => {
      isConnected = true;
      console.log('🍃 [MongoDB] Database reconnected.');
    });

    return true;
  } catch (error) {
    console.error('❌ [MongoDB Connection Error]:', error.message || error);
    isConnected = false;
    return false;
  }
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}
