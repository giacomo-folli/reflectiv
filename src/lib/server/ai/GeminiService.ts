import { AiService } from './AiService';

export class GeminiService extends AiService {
  private readonly apiKey: string;
  private static readonly DEFAULT_BASE_URI = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(apiKey: string, baseUri: string = GeminiService.DEFAULT_BASE_URI) {
    super(baseUri);
    this.apiKey = apiKey;
  }

  async sendPrompt(prompt: string): Promise<string> {
    // TODO: Implement actual Gemini API call
    return `Gemini response from ${this.baseUri} to: ${prompt}`;
  }
}
