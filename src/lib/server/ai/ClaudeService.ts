import { AiService } from './AiService';

export class ClaudeService extends AiService {
  private readonly apiKey: string;
  private static readonly DEFAULT_BASE_URI = 'https://api.anthropic.com/v1';

  constructor(apiKey: string, baseUri: string = ClaudeService.DEFAULT_BASE_URI) {
    super(baseUri);
    this.apiKey = apiKey;
  }

  async sendPrompt(prompt: string): Promise<string> {
    // TODO: Implement actual Claude API call
    return `Claude response from ${this.baseUri} to: ${prompt}`;
  }
}
