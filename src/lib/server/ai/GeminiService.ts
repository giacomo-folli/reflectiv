import { AiService } from './AiService';

export class GeminiService extends AiService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  async sendPrompt(prompt: string): Promise<string> {
    // TODO: Implement actual Gemini API call
    return `Gemini response to: ${prompt}`;
  }
}
