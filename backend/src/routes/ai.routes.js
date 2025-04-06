import express from "express";
import getResponse from "../controllers/ai.controllers.js"; // ✅ import the function directly

const router = express.Router();

router.post("/get-review", getResponse); // ✅ use the correct handler

export default router;
