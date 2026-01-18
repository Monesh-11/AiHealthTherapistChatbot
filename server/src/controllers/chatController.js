import prisma from "../../prismaClient.js";
import { getAIReply } from "../services/aiService.js";

export async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const userId = req.userId;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    // Save user message
    await prisma.message.create({
      data: {
        content: message,
        role: "USER",
        userId
      }
    });

    // Get AI response
    const aiReply = await getAIReply(message);

    if (!aiReply) {
      return res.status(500).json({ error: "Failed to get AI response" });
    }

    // Save AI response
    await prisma.message.create({
      data: {
        content: aiReply,
        role: "AI",
        userId
      }
    });

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process message", details: error.message });
  }
}
