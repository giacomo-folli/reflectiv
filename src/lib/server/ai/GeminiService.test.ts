import { GeminiService } from './GeminiService';
import { describe, it, expect } from 'vitest';

describe('GeminiService', () => {
  const DUMMY_API_KEY = 'test-gemini-api-key';
  const DEFAULT_BASE_URI = 'https://generativelanguage.googleapis.com/v1beta';
  const CUSTOM_BASE_URI = 'https://custom-gemini-uri.com';

  it('should be able to be instantiated with only API key (default baseUri)', () => {
    const service = new GeminiService(DUMMY_API_KEY);
    expect(service).toBeInstanceOf(GeminiService);
    // @ts-expect-error testing protected property
    expect(service.baseUri).toBe(DEFAULT_BASE_URI);
  });

  it('should be able to be instantiated with API key and custom baseUri', () => {
    const service = new GeminiService(DUMMY_API_KEY, CUSTOM_BASE_URI);
    expect(service).toBeInstanceOf(GeminiService);
    // @ts-expect-error testing protected property
    expect(service.baseUri).toBe(CUSTOM_BASE_URI);
  });

  it('should return the placeholder response from sendPrompt with default baseUri', async () => {
    const service = new GeminiService(DUMMY_API_KEY);
    const prompt = 'Hello Gemini Default';
    const response = await service.sendPrompt(prompt);
    expect(response).toBe(`Gemini response from ${DEFAULT_BASE_URI} to: ${prompt}`);
  });

  it('should return the placeholder response from sendPrompt with custom baseUri', async () => {
    const service = new GeminiService(DUMMY_API_KEY, CUSTOM_BASE_URI);
    const prompt = 'Hello Gemini Custom';
    const response = await service.sendPrompt(prompt);
    expect(response).toBe(`Gemini response from ${CUSTOM_BASE_URI} to: ${prompt}`);
  });
});
