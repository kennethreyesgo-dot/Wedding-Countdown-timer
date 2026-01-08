
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    if (typeof window !== 'undefined' && (window as any).process?.env?.API_KEY) {
      return (window as any).process.env.API_KEY;
    }
  } catch (e) {}
  return '';
};

export const generateWeddingQuote = async (names: string, daysLeft: number) => {
  const apiKey = getApiKey();
  if (!apiKey) return "Once in a while, right in the middle of an ordinary life, love gives us a fairy tale.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, romantic one-sentence wedding countdown quote for ${names}. They have ${daysLeft} days until their wedding.`,
    });
    return response.text || "Love is the greatest adventure.";
  } catch (error) {
    return "Once in a while, right in the middle of an ordinary life, love gives us a fairy tale.";
  }
};
