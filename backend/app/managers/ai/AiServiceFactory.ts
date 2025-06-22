import { AiService } from "./AiService.js";
import { OpenAiService } from "./OpenAiService.js";
import { GeminiService } from "./GeminiService.js";
import { ClaudeService } from "./ClaudeService.js";
import { LocalLlmService } from "./LocalLlmService.js";
import env from "#start/env";


export class AiServiceFactory {
  public static getInstance(): AiService {
    const provider = env.get("AI_SERVICE_PROVIDER");
    const openAiApiKey = env.get("OPENAI_API_KEY");
    const geminiApiKey = env.get("GEMINI_API_KEY");
    const claudeApiKey = env.get("CLAUDE_API_KEY");

    const openAiBaseUri = env.get("OPENAI_BASE_URI");
    const geminiBaseUri = env.get("GEMINI_BASE_URI");
    const claudeBaseUri = env.get("CLAUDE_BASE_URI");

    // No API key needed for local LLM, but it needs a base URI
    const localLlmBaseUri = env.get("LOCAL_LLM_BASE_URI");
    const localLlmModel = env.get("LOCAL_LLM_MODEL");

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