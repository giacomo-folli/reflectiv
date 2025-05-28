import { GoogleGenAI, Type } from "@google/genai";
import { AiService } from "./AiService";

export class GeminiService extends AiService {
  private readonly apiKey: string;
  private readonly ai: GoogleGenAI;

  private static readonly DEFAULT_BASE_URI =
    "https://generativelanguage.googleapis.com/v1beta/";

  constructor(
    apiKey: string,
    baseUri: string = GeminiService.DEFAULT_BASE_URI
  ) {
    super(baseUri);
    this.apiKey = apiKey;
    this.ai = new GoogleGenAI({ apiKey: this.apiKey });
  }

  async sendPrompt(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            mantra: {
              type: Type.STRING,
            },
            themes: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["questions", "mantra", "themes"],
        },
      },
    });

    return response.text || "";
  }
}
