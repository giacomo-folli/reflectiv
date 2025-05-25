import { ClaudeService } from './ClaudeService';
import { describe, it, expect } from 'vitest';

describe('ClaudeService', () => {
  const DUMMY_API_KEY = 'test-claude-api-key';

  it('should be able to be instantiated', () => {
    const claudeService = new ClaudeService(DUMMY_API_KEY);
    expect(claudeService).toBeInstanceOf(ClaudeService);
  });

  it('should return the placeholder response from sendPrompt', async () => {
    const claudeService = new ClaudeService(DUMMY_API_KEY);
    const prompt = 'Hello Claude';
    const response = await claudeService.sendPrompt(prompt);
    expect(response).toBe(`Claude response to: ${prompt}`);
  });
});
