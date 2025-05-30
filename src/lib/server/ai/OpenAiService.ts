import { AiService } from "./AiService";
import OpenAI from "openai";

export class OpenAiService extends AiService {
  private readonly apiKey: string;
  private readonly ai: OpenAI;

  private static readonly DEFAULT_BASE_URI = "https://api.openai.com/v1";

  constructor(
    apiKey: string,
    baseUri: string = OpenAiService.DEFAULT_BASE_URI
  ) {
    super(baseUri);
    this.apiKey = apiKey;
    this.ai = new OpenAI({ apiKey: this.apiKey });
  }

  async sendPrompt(prompt: string): Promise<string> {
    const response = await this.ai.responses.create({
      model: "o4-mini",
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: "diary_response",
          schema: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: { type: "string" },
              },
              mantra: { type: "string" },
              themes: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: ["questions", "mantra", "themes"],
            additionalProperties: false,
          },
          strict: true,
        },
      },
    });

    return response.output_text || "";
  }
}
