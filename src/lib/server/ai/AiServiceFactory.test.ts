import { AiServiceFactory } from './AiServiceFactory';
import { AiService } from './AiService';
import { OpenAiService } from './OpenAiService';
import { GeminiService } from './GeminiService';
import { ClaudeService } from './ClaudeService';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the getEnvVar from the same module.
// The actual implementation of getEnvVar in AiServiceFactory.ts will be replaced by this mock.
vi.mock('./AiServiceFactory', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./AiServiceFactory')>();
  return {
    ...actual, // Import and retain all original exports
    // Mock specific named exports if necessary, but here we're focused on how AiServiceFactory itself uses getEnvVar
    // So, AiServiceFactory will internally use the mocked getEnvVar.
    // This approach requires getEnvVar to be exported from AiServiceFactory.ts if it's not already.
    // If getEnvVar is not exported, we'll need to adjust the mocking strategy or the AiServiceFactory.ts structure.
    // For now, let's assume getEnvVar is NOT exported and AiServiceFactory calls it internally.
    // We will spyOn and mock its behavior via the factory itself.
    // This is a bit tricky. A better way would be to make getEnvVar injectable or mock process.env directly.

    // Let's adjust AiServiceFactory.ts to make getEnvVar exportable for easier testing if needed,
    // or use a different mocking strategy if that's not possible.
    // Given the current structure, we'll assume direct mocking of process.env is more straightforward.
  };
});

// Store original process.env
const originalEnv = { ...process.env };

describe('AiServiceFactory', () => {
  beforeEach(() => {
    // Reset process.env to a clean state for each test
    vi.resetModules(); // Important to reset modules that might cache process.env
    process.env = { ...originalEnv }; // Restore original env
  });

  const setMockEnv = (envVars: Record<string, string | undefined>) => {
    for (const key in envVars) {
      if (envVars[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = envVars[key];
      }
    }
    // Re-import the factory after setting env vars so it picks them up
    // This is a common pattern when modules depend on process.env at import time.
    // However, our AiServiceFactory reads env vars inside getInstance, so this might not be strictly necessary
    // if getEnvVar directly reads from process.env.
    // Let's modify AiServiceFactory's getEnvVar to read process.env directly for this to work.
  };

  // --- Test Cases for OpenAI ---
  it('should return OpenAiService instance for "openai" provider with default URI', () => {
    setMockEnv({
      AI_SERVICE_PROVIDER: 'openai',
      OPENAI_API_KEY: 'test-openai-key',
    });
    const service = AiServiceFactory.getInstance();
    expect(service).toBeInstanceOf(OpenAiService);
    // @ts-expect-error testing protected property
    expect(service.apiKey).toBe('test-openai-key');
    // @ts-expect-error testing protected property
    expect(service.baseUri).toBe('https://api.openai.com/v1');
  });

  it('should return OpenAiService instance with custom URI', () => {
    setMockEnv({
      AI_SERVICE_PROVIDER: 'openai',
      OPENAI_API_KEY: 'test-openai-key-custom',
      OPENAI_BASE_URI: 'https://custom.openai.com',
    });
    const service = AiServiceFactory.getInstance();
    expect(service).toBeInstanceOf(OpenAiService);
    // @ts-expect-error testing protected property
    expect(service.apiKey).toBe('test-openai-key-custom');
    // @ts-expect-error testing protected property
    expect(service.baseUri).toBe('https://custom.openai.com');
  });

  it('should throw error if OPENAI_API_KEY is missing for openai provider', () => {
    setMockEnv({ AI_SERVICE_PROVIDER: 'openai' });
    expect(() => AiServiceFactory.getInstance()).toThrow(
      'Missing OPENAI_API_KEY for openai provider.'
    );
  });

  // --- Test Cases for Gemini ---
  it('should return GeminiService instance for "gemini" provider with default URI', () => {
    setMockEnv({
      AI_SERVICE_PROVIDER: 'gemini',
      GEMINI_API_KEY: 'test-gemini-key',
    });
    const service = AiServiceFactory.getInstance();
    expect(service).toBeInstanceOf(GeminiService);
    // @ts-expect-error testing protected property
    expect(service.apiKey).toBe('test-gemini-key');
    // @ts-expect-error testing protected property
    expect(service.baseUri).toBe('https://generativelanguage.googleapis.com/v1beta');
  });

  it('should return GeminiService instance with custom URI', () => {
    setMockEnv({
      AI_SERVICE_PROVIDER: 'gemini',
      GEMINI_API_KEY: 'test-gemini-key-custom',
      GEMINI_BASE_URI: 'https://custom.gemini.com',
    });
    const service = AiServiceFactory.getInstance();
    expect(service).toBeInstanceOf(GeminiService);
    // @ts-expect-error testing protected property
    expect(service.apiKey).toBe('test-gemini-key-custom');
    // @ts-expect-error testing protected property
    expect(service.baseUri).toBe('https://custom.gemini.com');
  });

  it('should throw error if GEMINI_API_KEY is missing for gemini provider', () => {
    setMockEnv({ AI_SERVICE_PROVIDER: 'gemini' });
    expect(() => AiServiceFactory.getInstance()).toThrow(
      'Missing GEMINI_API_KEY for gemini provider.'
    );
  });

  // --- Test Cases for Claude ---
  it('should return ClaudeService instance for "claude" provider with default URI', () => {
    setMockEnv({
      AI_SERVICE_PROVIDER: 'claude',
      CLAUDE_API_KEY: 'test-claude-key',
    });
    const service = AiServiceFactory.getInstance();
    expect(service).toBeInstanceOf(ClaudeService);
    // @ts-expect-error testing protected property
    expect(service.apiKey).toBe('test-claude-key');
    // @ts-expect-error testing protected property
    expect(service.baseUri).toBe('https://api.anthropic.com/v1');
  });

  it('should return ClaudeService instance with custom URI', () => {
    setMockEnv({
      AI_SERVICE_PROVIDER: 'claude',
      CLAUDE_API_KEY: 'test-claude-key-custom',
      CLAUDE_BASE_URI: 'https://custom.claude.com',
    });
    const service = AiServiceFactory.getInstance();
    expect(service).toBeInstanceOf(ClaudeService);
    // @ts-expect-error testing protected property
    expect(service.apiKey).toBe('test-claude-key-custom');
    // @ts-expect-error testing protected property
    expect(service.baseUri).toBe('https://custom.claude.com');
  });

  it('should throw error if CLAUDE_API_KEY is missing for claude provider', () => {
    setMockEnv({ AI_SERVICE_PROVIDER: 'claude' });
    expect(() => AiServiceFactory.getInstance()).toThrow(
      'Missing CLAUDE_API_KEY for claude provider.'
    );
  });

  // --- Test Cases for Invalid/Missing Provider ---
  it('should throw error if AI_SERVICE_PROVIDER is missing', () => {
    setMockEnv({}); // AI_SERVICE_PROVIDER is undefined
    expect(() => AiServiceFactory.getInstance()).toThrow(
      'Invalid or missing AI_SERVICE_PROVIDER environment variable. Supported values: openai, gemini, claude.'
    );
  });

  it('should throw error if AI_SERVICE_PROVIDER is invalid', () => {
    setMockEnv({ AI_SERVICE_PROVIDER: 'invalid-provider' });
    expect(() => AiServiceFactory.getInstance()).toThrow(
      'Invalid or missing AI_SERVICE_PROVIDER environment variable. Supported values: openai, gemini, claude.'
    );
  });

  // Test to ensure AiService is the superclass
  it('should return an instance of AiService for a valid provider', () => {
    setMockEnv({
        AI_SERVICE_PROVIDER: 'openai',
        OPENAI_API_KEY: 'test-key',
    });
    const service = AiServiceFactory.getInstance();
    expect(service).toBeInstanceOf(AiService);
  });
});
