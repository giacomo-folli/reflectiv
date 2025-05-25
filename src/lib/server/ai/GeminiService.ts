import { AiService } from "./AiService";

export class GeminiService extends AiService {
  private readonly apiKey: string;
  private static readonly DEFAULT_BASE_URI =
    "https://generativelanguage.googleapis.com/v1beta/models";
  private static readonly MODEL = "/gemini-2.0-flash";

  constructor(
    apiKey: string,
    baseUri: string = GeminiService.DEFAULT_BASE_URI
  ) {
    super(baseUri);
    this.apiKey = apiKey;
  }

  async sendPrompt(prompt: string): Promise<string> {
    // TODO: Implement actual Gemini API call
    const response = await this.ask(prompt).catch((err) =>
      console.error(err instanceof Error ? err.message : err)
    );
    return `Gemini response is ${response}`;
  }

  private async ask(prompt: string): Promise<any> {
    const uri =
      GeminiService.DEFAULT_BASE_URI +
      GeminiService.MODEL +
      ":generateContent?key=" +
      this.apiKey;

    const response = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    return await response.json();
  }
}
