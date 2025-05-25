export abstract class AiService {
  abstract sendPrompt(prompt: string): Promise<string>;
}
