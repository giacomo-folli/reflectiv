import { AiServiceFactory } from './AiServiceFactory';
import { LocalLlmService } from './LocalLlmService';
import { OpenAiService } from './OpenAiService';
import { GeminiService } from './GeminiService';
import { ClaudeService } from './ClaudeService';

describe('AiServiceFactory', () => {
  const originalEnv = { ...process.env }; // Store original environment variables

  beforeEach(() => {
    // Reset environment variables before each test
    process.env = { ...originalEnv };
    // Clear any cached instance or state if the factory implemented caching (not shown in provided factory code)
    // For example, if AiServiceFactory had a static instance variable, reset it here.
    // AiServiceFactory.resetInstance(); // Assuming such a method if caching was involved
  });

  afterAll(() => {
    // Restore original environment variables after all tests
    process.env = { ...originalEnv };
  });

  describe('LocalLlmService Instantiation', () => {
    test('Test Case 1a: Factory creates LocalLlmService with AI_SERVICE_PROVIDER="local"', () => {
      process.env.AI_SERVICE_PROVIDER = "local";
      process.env.LOCAL_LLM_BASE_URI = "http://localhost:11434/api/generate";
      
      const instance = AiServiceFactory.getInstance();
      expect(instance).toBeInstanceOf(LocalLlmService);
      // Check if the baseUri is correctly passed (optional, requires exposing it or specific behavior)
      // For LocalLlmService, the constructor takes baseUri. If AiService has a getBaseUri method:
      // expect((instance as LocalLlmService).getBaseUri()).toBe("http://localhost:11434/api/generate");
    });

    test('Test Case 1b: Factory creates LocalLlmService with AI_SERVICE_PROVIDER="localllm"', () => {
      process.env.AI_SERVICE_PROVIDER = "localllm";
      process.env.LOCAL_LLM_BASE_URI = "http://localhost:11435/v1"; // Different URI for testing alias
      
      const instance = AiServiceFactory.getInstance();
      expect(instance).toBeInstanceOf(LocalLlmService);
    });

    test('Test Case 2: Factory throws error if LOCAL_LLM_BASE_URI is missing for "local" provider', () => {
      process.env.AI_SERVICE_PROVIDER = "local";
      delete process.env.LOCAL_LLM_BASE_URI; // Ensure it's undefined
      
      expect(() => AiServiceFactory.getInstance())
        .toThrow("Missing LOCAL_LLM_BASE_URI for local provider.");
    });

    test('Factory throws error if LOCAL_LLM_BASE_URI is missing for "localllm" provider', () => {
      process.env.AI_SERVICE_PROVIDER = "localllm";
      delete process.env.LOCAL_LLM_BASE_URI;
      
      expect(() => AiServiceFactory.getInstance())
        .toThrow("Missing LOCAL_LLM_BASE_URI for local provider.");
    });
  });

  describe('Other AI Service Instantiation (example)', () => {
    test('Factory creates OpenAiService when AI_SERVICE_PROVIDER="openai"', () => {
      process.env.AI_SERVICE_PROVIDER = "openai";
      process.env.OPENAI_API_KEY = "test_openai_key";
      
      const instance = AiServiceFactory.getInstance();
      expect(instance).toBeInstanceOf(OpenAiService);
    });

    test('Factory throws error if OPENAI_API_KEY is missing for "openai" provider', () => {
      process.env.AI_SERVICE_PROVIDER = "openai";
      delete process.env.OPENAI_API_KEY;
      
      expect(() => AiServiceFactory.getInstance())
        .toThrow("Missing OPENAI_API_KEY for openai provider.");
    });
  });

  describe('Provider Not Set or Invalid', () => {
    test('Factory throws error if AI_SERVICE_PROVIDER is not set', () => {
      delete process.env.AI_SERVICE_PROVIDER;
      // Assuming the factory defaults to 'openai' if OPENAI_API_KEY is present, 
      // or throws specific error if provider is truly missing.
      // Based on current AiServiceFactory, it expects AI_SERVICE_PROVIDER.
      expect(() => AiServiceFactory.getInstance())
        .toThrow("Invalid or missing AI_SERVICE_PROVIDER environment variable. Supported values: openai, gemini, claude, local.");
    });

    test('Factory throws error for an unsupported AI_SERVICE_PROVIDER', () => {
      process.env.AI_SERVICE_PROVIDER = "unsupported_provider";
      
      expect(() => AiServiceFactory.getInstance())
        .toThrow("Invalid or missing AI_SERVICE_PROVIDER environment variable. Supported values: openai, gemini, claude, local.");
    });
  });
});

// Minimal vi mock if not provided by a test runner (especially for process.env manipulation)
// Jest and Vitest typically handle process.env mocking and restoration well.
// This is more of a conceptual note for environments without such features.
if (typeof global.vi === 'undefined') {
  global.vi = {
    // Mocking for 'vi' is not strictly needed for AiServiceFactory tests as it doesn't use vi.fn() directly
    // However, if LocalLlmService.test.ts is run in the same context without a test runner, its vi might conflict.
  } as any; 
}
declare global {
  var vi: any; // Declare vi globally
}
