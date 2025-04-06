import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);

});
