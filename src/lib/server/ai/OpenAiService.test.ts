import { OpenAiService } from './OpenAiService';
import { describe, it, expect } from 'vitest';

describe('OpenAiService', () => {
  const DUMMY_API_KEY = 'test-openai-api-key';

  it('should be able to be instantiated', () => {
    const openAiService = new OpenAiService(DUMMY_API_KEY);
    expect(openAiService).toBeInstanceOf(OpenAiService);
  });

  it('should return the placeholder response from sendPrompt', async () => {
    const openAiService = new OpenAiService(DUMMY_API_KEY);
    const prompt = 'Hello OpenAI';
    const response = await openAiService.sendPrompt(prompt);
    expect(response).toBe(`OpenAI response to: ${prompt}`);
  });
});
