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

// ✅ Clerk webhook route FIRST with raw parser
app.post("/api/clerk", bodyParser.raw({ type: "application/json" }), clerkWebhooks);

// ✅ Use JSON parser for all other routes
app.use(express.json());

// ✅ Clerk auth middleware AFTER webhook
app.use(clerkMiddleware());

// ✅ Test route
app.get("/", (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));