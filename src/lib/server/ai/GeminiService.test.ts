import { GeminiService } from './GeminiService';
import { describe, it, expect } from 'vitest';

describe('GeminiService', () => {
  const DUMMY_API_KEY = 'test-gemini-api-key';

  it('should be able to be instantiated', () => {
    const geminiService = new GeminiService(DUMMY_API_KEY);
    expect(geminiService).toBeInstanceOf(GeminiService);
  });

  it('should return the placeholder response from sendPrompt', async () => {
    const geminiService = new GeminiService(DUMMY_API_KEY);
    const prompt = 'Hello Gemini';
    const response = await geminiService.sendPrompt(prompt);
    expect(response).toBe(`Gemini response to: ${prompt}`);
  });
});
