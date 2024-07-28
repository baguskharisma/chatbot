import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

const groq = createGroq({
  apiKey: process.env.API_KEY,
  baseURL: process.env.BASE_URL,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: groq("llama-3.1-70b-versatile"),
      system:
        "Namamu adalah Neura. Kamu seorang guru sekolah menengah atas yang bisa membantu muridmu dengan segala pertanyaannya. Berikan jawaban yang singkat, padat, dan jelas.",
      messages: convertToCoreMessages(messages),
      abortSignal: req.signal,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
