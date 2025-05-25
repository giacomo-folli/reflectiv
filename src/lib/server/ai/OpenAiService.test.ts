import { OpenAiService } from './OpenAiService';
import { describe, it, expect } from 'vitest';

describe('OpenAiService', () => {
  const DUMMY_API_KEY = 'test-openai-api-key';
  const DEFAULT_BASE_URI = 'https://api.openai.com/v1';
  const CUSTOM_BASE_URI = 'https://custom-openai-uri.com';

  it('should be able to be instantiated with only API key (default baseUri)', () => {
    const service = new OpenAiService(DUMMY_API_KEY);
    expect(service).toBeInstanceOf(OpenAiService);
    // @ts-expect-error testing protected property
    expect(service.baseUri).toBe(DEFAULT_BASE_URI);
  });

  it('should be able to be instantiated with API key and custom baseUri', () => {
    const service = new OpenAiService(DUMMY_API_KEY, CUSTOM_BASE_URI);
    expect(service).toBeInstanceOf(OpenAiService);
    // @ts-expect-error testing protected property
    expect(service.baseUri).toBe(CUSTOM_BASE_URI);
  });

  it('should return the placeholder response from sendPrompt with default baseUri', async () => {
    const service = new OpenAiService(DUMMY_API_KEY);
    const prompt = 'Hello OpenAI Default';
    const response = await service.sendPrompt(prompt);
    expect(response).toBe(`OpenAI response from ${DEFAULT_BASE_URI} to: ${prompt}`);
  });

  it('should return the placeholder response from sendPrompt with custom baseUri', async () => {
    const service = new OpenAiService(DUMMY_API_KEY, CUSTOM_BASE_URI);
    const prompt = 'Hello OpenAI Custom';
    const response = await service.sendPrompt(prompt);
    expect(response).toBe(`OpenAI response from ${CUSTOM_BASE_URI} to: ${prompt}`);
  });
});
