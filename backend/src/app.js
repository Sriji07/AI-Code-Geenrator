import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// For __dirname support in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/ai", aiRoutes); // e.g., /ai/get-review

// Serve static files from frontend/dist
const distPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(distPath));

// Fallback for React Router (all non-API GET requests)
app.get("/", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

export default app;
