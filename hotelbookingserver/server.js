import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import clerkWebhooks from './controllers/clerkWebhooks.js';

const app = express();

// Enhanced configuration
const clerkOptions = {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
  debug: true
};

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB with enhanced logging
connectDB();

// Routes
app.post(
  "/api/clerk",
  express.raw({ type: 'application/json' }),
  clerkWebhooks
);

// Protected routes
app.use(ClerkExpressRequireAuth(clerkOptions));

app.get('/', (req, res) => res.send("API is working"));

// Enhanced error handling
app.use((err, req, res, next) => {
  console.error('\x1b[31m', '⚠️ Error:', err.stack, '\x1b[0m');
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\x1b[32mServer running on port ${PORT}\x1b[0m`);
  console.log(`\x1b[34mClerk Debug Mode: ${clerkOptions.debug}\x1b[0m`);
});