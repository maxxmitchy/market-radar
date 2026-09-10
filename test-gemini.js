import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: "Find a used iphone in lagos",
      config: {
        tools: [{ googleSearch: {} }, { urlContext: {} }]
      }
    });
    console.log("Success");
  } catch (e) {
    console.error("ERROR", e.message);
  }
}
run();
