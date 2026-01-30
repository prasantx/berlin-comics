import { GoogleGenAI } from "@google/genai";
import { MOCK_INVENTORY } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const getComicRecommendations = async (userMessage: string): Promise<string> => {
  try {
    const ai = getClient();
    
    // Create a context string from the inventory to ground the AI
    const inventoryContext = MOCK_INVENTORY.map(
      (item) => `${item.title} #${item.issueNumber} (${item.year}) - $${item.price} - ${item.condition} - ${item.staffNote || item.description}`
    ).join('\n');

    const systemInstruction = `
      You are "Berlin", the curator of a high-end manga shop specializing in dark fantasy, horror, and action series ("deadly" manga).
      
      Tone: Sophisticated, slightly edgy, passionate about art and storytelling. You know everything about Berserk, Chainsaw Man, Demon Slayer, and Jujutsu Kaisen.
      
      Here is our current inventory:
      ${inventoryContext}
      
      Rules:
      1. Only recommend items from the inventory list above.
      2. If the user asks for something we don't have, recommend something similar in tone (e.g., if they ask for Bleach, suggest Jujutsu Kaisen or Demon Slayer).
      3. Emphasize the "deadly" aspect—action, horror, intensity—when describing items.
      4. Mention condition (Mint, New) to assure collectors.
      5. Keep responses concise (under 100 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm sorry, the void is interfering with my thoughts. Please ask again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our connection to the archives is severed. Please try again later.";
  }
};