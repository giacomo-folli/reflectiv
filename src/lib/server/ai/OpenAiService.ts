import { AiService } from './AiService';

export class OpenAiService extends AiService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  async sendPrompt(prompt: string): Promise<string> {
    // TODO: Implement actual OpenAI API call
    return `OpenAI response to: ${prompt}`;
  }
}
