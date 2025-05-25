import { AiService } from './AiService';
import { describe, it, expect } from 'vitest';

// Dummy implementation for testing AiService
class DummyAiService extends AiService {
  async sendPrompt(prompt: string): Promise<string> {
    return `Dummy response to: ${prompt}`;
  }
}

describe('AiService', () => {
  it('should allow a concrete implementation to be created', () => {
    const dummyService = new DummyAiService();
    expect(dummyService).toBeInstanceOf(AiService);
    expect(dummyService).toBeInstanceOf(DummyAiService);
  });

  it('should have a sendPrompt method', () => {
    const dummyService = new DummyAiService();
    expect(typeof dummyService.sendPrompt).toBe('function');
  });
});
