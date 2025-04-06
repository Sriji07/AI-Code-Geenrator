import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from 'cors';

const app = express();

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/ai", aiRoutes); // Routes now available at /ai/get-review (for example)

export default app;
