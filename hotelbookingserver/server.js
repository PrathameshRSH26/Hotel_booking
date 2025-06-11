import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import { createClerkClient, ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import clerkWebhooks from './controllers/clerkWebhooks.js';

// Initialize Express
const app = express();

// Initialize Clerk
const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

// Enhanced CORS Configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Webhook Route (needs raw body)
app.post('/api/clerk', 
  express.raw({ type: 'application/json' }),
  clerkWebhooks
);

// Protected Routes
app.use('/api/protected', 
  ClerkExpressRequireAuth({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
  })
);

// Test Routes
app.get('/', (req, res) => {
  res.json({ 
    status: 'running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    clerk: clerk ? 'authenticated' : 'not configured'
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err);
  res.status(err.status || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && {
      stack: err.stack,
      details: err
    })
  });
});

// Export for Vercel
export default app;

// Local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`➜ Local:   http://localhost:${PORT}`);
  });
}