import { AiService } from './AiService';

export class OpenAiService extends AiService {
  private readonly apiKey: string;
  private static readonly DEFAULT_BASE_URI = 'https://api.openai.com/v1';

  constructor(apiKey: string, baseUri: string = OpenAiService.DEFAULT_BASE_URI) {
    super(baseUri);
    this.apiKey = apiKey;
  }

  async sendPrompt(prompt: string): Promise<string> {
    // TODO: Implement actual OpenAI API call
    return `OpenAI response from ${this.baseUri} to: ${prompt}`;
  }
}
