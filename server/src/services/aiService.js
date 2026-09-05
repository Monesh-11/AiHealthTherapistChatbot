import Groq from "groq-sdk";
//hi
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a supportive AI health therapist. You should only give answer to health related questions.
Rules:
- Do not diagnose or prescribe medication.
- Provide emotional support and coping strategies.
- Encourage professional help when needed.
- If user mentions self-harm or suicide, respond with empathy and suggest contacting emergency services.
- Keep responses concise and supportive.`;

export async function getAIReply(userMessage) {
  try {
    console.log("Getting AI reply for:", userMessage);
    console.log("Groq API Key exists:", !!process.env.GROQ_API_KEY);

    const message = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "openai/gpt-oss-120b",
      max_tokens: 1024,
    });

    const text = message.choices[0]?.message?.content || "";
    console.log("Groq response:", text);

    if (!text) {
      throw new Error("No response text from Groq API");
    }

    return text;
  } catch (error) {
    console.error("Groq Error:", error.message);
    console.error("Full error:", error);

    // Fallback response based on keywords
    const userMessageLower = userMessage.toLowerCase();

    if (userMessageLower.includes("sad") || userMessageLower.includes("depressed") || userMessageLower.includes("mental peace")) {
      return "I hear you're struggling. These feelings are temporary. Try deep breathing or reaching out to someone. You're not alone.";
    } else if (userMessageLower.includes("anxious") || userMessageLower.includes("anxiety") || userMessageLower.includes("stress")) {
      return "Anxiety is tough. Try progressive muscle relaxation or meditation. Focus on what you can control right now.";
    } else if (userMessageLower.includes("sleep")) {
      return "Sleep issues affect mental health. Try a bedtime routine and limit screens before bed. Consult a specialist if it persists.";
    } else {
      return "Thank you for sharing. Your feelings are valid. If in crisis, reach out to a mental health professional.";
    }
  }
}
