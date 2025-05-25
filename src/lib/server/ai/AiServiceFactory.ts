import { AiService } from './AiService';
import { OpenAiService } from './OpenAiService';
import { GeminiService } from './GeminiService';
import { ClaudeService } from './ClaudeService';

// Helper to read process.env
const getEnvVar = (key: string, defaultValue?: string): string | undefined => {
  return process.env[key] || defaultValue;
};

export class AiServiceFactory {
  public static getInstance(): AiService {
    const provider = getEnvVar('AI_SERVICE_PROVIDER');
    const openAiApiKey = getEnvVar('OPENAI_API_KEY');
    const geminiApiKey = getEnvVar('GEMINI_API_KEY');
    const claudeApiKey = getEnvVar('CLAUDE_API_KEY');

    const openAiBaseUri = getEnvVar('OPENAI_BASE_URI');
    const geminiBaseUri = getEnvVar('GEMINI_BASE_URI');
    const claudeBaseUri = getEnvVar('CLAUDE_BASE_URI');

    switch (provider?.toLowerCase()) {
      case 'openai':
        if (!openAiApiKey) {
          throw new Error('Missing OPENAI_API_KEY for openai provider.');
        }
        return new OpenAiService(openAiApiKey, openAiBaseUri); // baseUri is optional
      case 'gemini':
        if (!geminiApiKey) {
          throw new Error('Missing GEMINI_API_KEY for gemini provider.');
        }
        return new GeminiService(geminiApiKey, geminiBaseUri); // baseUri is optional
      case 'claude':
        if (!claudeApiKey) {
          throw new Error('Missing CLAUDE_API_KEY for claude provider.');
        }
        return new ClaudeService(claudeApiKey, claudeBaseUri); // baseUri is optional
      default:
        throw new Error(
          'Invalid or missing AI_SERVICE_PROVIDER environment variable. Supported values: openai, gemini, claude.'
        );
    }
  }
}
