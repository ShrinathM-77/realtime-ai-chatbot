import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // 🔥 LOAD ENV FIRST

import Groq from "groq-sdk";

console.log("🔑 GROQ_API_KEY =", process.env.GROQ_API_KEY); // debug (remove later)

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function streamAIResponse(prompt, ws) {
  try {
    const stream = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    ws.send(JSON.stringify({ type: "start" }));

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content;
      if (token) {
        ws.send(JSON.stringify({ type: "chunk", content: token }));
      }
    }

    ws.send(JSON.stringify({ type: "end" }));
  } catch (err) {
    console.error("Groq error:", err.message);
    ws.send(
      JSON.stringify({
        type: "error",
        message: "AI response failed",
      })
    );
  }
}
