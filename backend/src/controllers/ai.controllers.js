// src/controllers/ai.controllers.js
import aiService from "../services/ai.services.js";

const getResponse = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).json({ error: "Prompt is required." });
    }

    try {
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        console.error("Error in controller:", error.message);
        res.status(500).json({ error: "Something went wrong." });
    }
};

export default getResponse;
