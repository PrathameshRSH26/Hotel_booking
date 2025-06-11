import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import bodyParser from 'body-parser';

const app = express();
connectDB();

app.use(cors());

// Important: raw body parser for Clerk webhook
app.use("/api/clerk", bodyParser.raw({ type: "application/json" }));

// Other middleware
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

