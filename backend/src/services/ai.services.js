import Groq from "groq-sdk";

async function getResponse(code) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const chatCompletion = await groq.chat.completions.create({
        model: "deepseek-r1-distill-qwen-32b",
        messages: [
            {
                role: "user",
                content: code
            },
            {
                role: "system",
                content: `
                Act as an expert in programming languages who has read through many programming advice online for Python, Java, C, and C ++.
        Can you please help suggest improvements for the given Python code, mentioning the existing code line by line with proper indentation?  
        Can you also convert the improved code version to Java, C, and C++? 
        Can you also give time and space complexities for the improved code version? 
        While responding, can you use this format? 
        Suggestions
        Improved code in Python
        Improved code in Java, c, and C++. 
        Time and space complexities 
        Personalized learning links
                `,
            }
        ]
    });

    return chatCompletion.choices[0].message.content;
}

export default getResponse;
