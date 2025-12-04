import { GoogleGenAI } from "@google/genai";

export const generateSiteContent = async (topic: string): Promise<{ title: string; description: string }> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `你是一種類似 Palantir、Augury 或 C3.ai 的企業級 AI 公司的技術文案撰寫人。
      你的語氣必須嚴謹、具權威性、數據導向且精練。避免行銷廢話。請使用「遙測 (Telemetry)」、「本體論 (Ontology)」、「物理導向 (Physics-based)」、「部署」、「規模化」等專業術語。
      
      請針對網站的「${topic}」部分，生成一個章節標題 (Title) 和一段描述 (Description，最多 2-3 句)。
      **請務必使用繁體中文 (Traditional Chinese) 回答。**
      
      請以 JSON 格式回傳，包含鍵值 "title" 和 "description"。不要使用 markdown code blocks。`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

export const generateCaseStudy = async (industry: string): Promise<{ title: string; metrics: string; description: string }> => {
  if (!process.env.API_KEY) throw new Error("API Key not found");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `請針對「${industry}」產業，生成一個簡短有力、關於工業預知保養的客戶案例 (Case Study)。
      內容包含：
      1. 技術性的標題 (Title)
      2. 關鍵指標 (Metrics，例如節省金額或稼動率百分比)
      3. 一句話描述 (Description，描述避免了何種故障模式)
      
      **請務必使用繁體中文 (Traditional Chinese) 回答。**
      回傳 JSON 格式：{ "title": "...", "metrics": "...", "description": "..." }`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) { throw error; }
}