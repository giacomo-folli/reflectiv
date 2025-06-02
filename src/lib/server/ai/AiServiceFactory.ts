import { AiService } from "./AiService";
import { OpenAiService } from "./OpenAiService";
import { GeminiService } from "./GeminiService";
import { ClaudeService } from "./ClaudeService";
import { LocalLlmService } from "./LocalLlmService";

// Helper to read process.env
const getEnvVar = (
  key: string,
  defaultValue?: string
): string | number | boolean | undefined => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    else if (value.toLowerCase() === "false") return false;

    if (!isNaN(Number(value))) return Number(value);
  }

  return value;
};

export class AiServiceFactory {
  public static getInstance(): AiService {
    const provider = getEnvVar("AI_SERVICE_PROVIDER");
    const openAiApiKey = getEnvVar("OPENAI_API_KEY");
    const geminiApiKey = getEnvVar("GEMINI_API_KEY");
    const claudeApiKey = getEnvVar("CLAUDE_API_KEY");

    const openAiBaseUri = getEnvVar("OPENAI_BASE_URI");
    const geminiBaseUri = getEnvVar("GEMINI_BASE_URI");
    const claudeBaseUri = getEnvVar("CLAUDE_BASE_URI");

    // No API key needed for local LLM, but it needs a base URI
    const localLlmBaseUri = getEnvVar("LOCAL_LLM_BASE_URI");
    const localLlmModel = getEnvVar("LOCAL_LLM_MODEL");

    if (typeof provider === "string") {
      switch (provider.toLowerCase()) {
        case "openai":
          if (typeof openAiApiKey !== "string") {
            throw new Error("Missing OPENAI_API_KEY for openai provider.");
          }
          return new OpenAiService(
            openAiApiKey,
            openAiBaseUri as string | undefined
          ); // baseUri is optional
        case "gemini":
          if (typeof geminiApiKey !== "string") {
            throw new Error("Missing GEMINI_API_KEY for gemini provider.");
          }
          return new GeminiService(
            geminiApiKey,
            geminiBaseUri as string | undefined
          ); // baseUri is optional
        case "claude":
          if (typeof claudeApiKey !== "string") {
            throw new Error("Missing CLAUDE_API_KEY for claude provider.");
          }
          return new ClaudeService(
            claudeApiKey,
            claudeBaseUri as string | undefined
          ); // baseUri is optional
        case "local":
        case "localllm":
          if (typeof localLlmBaseUri !== "string") {
            throw new Error("Missing LOCAL_LLM_BASE_URI for local provider.");
          }
          if (typeof localLlmModel !== "string") {
            throw new Error("Missing LOCAL_LLM_MODEL for local model.");
          }
          return new LocalLlmService(localLlmBaseUri, localLlmModel);
        default:
          throw new Error(
            "Invalid or missing AI_SERVICE_PROVIDER environment variable. Supported values: openai, gemini, claude, local."
          );
      }
    } else {
      throw new Error(
        "Invalid or missing AI_SERVICE_PROVIDER environment variable. Supported values: openai, gemini, claude, local."
      );
    }
  }
}
