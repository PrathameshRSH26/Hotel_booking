import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log('\x1b[32m', '✔️ Database connected', '\x1b[0m');
    });

    mongoose.connection.on("error", (err) => {
      console.error('\x1b[31m', '⚠️ MongoDB connection error:', err, '\x1b[0m');
    });

    mongoose.connection.on("disconnected", () => {
      console.log('\x1b[33m', '⚠️ MongoDB disconnected', '\x1b[0m');
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });

  } catch (error) {
    console.error('\x1b[31m', '⚠️ Database connection failed:', error.message, '\x1b[0m');
    process.exit(1);
  }
};

export default connectDB;