export abstract class AiService {
  protected readonly baseUri: string;

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  abstract sendPrompt(prompt: string): Promise<any>;
} 