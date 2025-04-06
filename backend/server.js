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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log("🔐 GROQ_API_KEY:", process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌");
});
