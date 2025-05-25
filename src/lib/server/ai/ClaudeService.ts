import { AiService } from './AiService';

export class ClaudeService extends AiService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  async sendPrompt(prompt: string): Promise<string> {
    // TODO: Implement actual Claude API call
    return `Claude response to: ${prompt}`;
  }
}
