import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import bodyParser from 'body-parser'; // ✅ Add this

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());

// ✅ Important: Raw body parser must come before express.json for Clerk webhooks
app.use("/api/clerk", bodyParser.raw({ type: "application/json" }));

// ✅ Other middlewares
app.use(express.json());
app.use(clerkMiddleware());

// ✅ Clerk Webhook Route
app.use("/api/clerk", clerkWebhooks);

// Test Route
app.get('/', (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
