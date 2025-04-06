// backend/server.js

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./src/app.js";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

// Optional logging for debug
console.log("🔐 GROQ_API_KEY:", process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌");

// 🚫 Do NOT listen here (Vercel handles it)
// Just export the app
export default app;
