
import { GoogleGenAI, Type } from "@google/genai";

// We check if process exists so the app doesn't crash on a white screen
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const generateWeddingQuote = async (names: string, daysLeft: number) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "Once in a while, right in the middle of an ordinary life, love gives us a fairy tale.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, extremely romantic one-sentence wedding countdown quote for a couple named ${names}. They have ${daysLeft} days until their wedding. Make it poetic and sweet.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });

    return response.text || "Love is the greatest adventure.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Once in a while, right in the middle of an ordinary life, love gives us a fairy tale.";
  }
};