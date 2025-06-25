import type { HttpContext } from '@adonisjs/core/http'
import { Extractor } from '../managers/gptChat/Extractor.js'
import { AiServiceFactory } from '../managers/ai/AiServiceFactory.js'
import Link from '#models/link';

export default class ApiController {
    async diaryContent({ request, response }: HttpContext) {
        try {
            const { links } = request.body()

            const extractedChats: {
                [key: string]: any;
            } = {};

            const extractor = new Extractor();
            for (let i = 0; i < links.length; i++) {
                const extractedChat = await extractor.importChat(links[i]);
                extractedChats[i] = extractedChat;
            }

            // GENERATE PROMPT
            const prompt = `
    You are a professional psychotherapist. You are tasked to create 30 short questions, 
    1 short mantra and 4 short week themes based on the context provided (chats between 
    your client and chatgpt). Use the context to understand the client biases and patterns
    and then create the questions to help him reflect on his limitations. Return them in a json 
    format with the following structure:
    {
      questions: [
        "Question 1",
        "Question 2",
        ...
      ],
      mantra: "montly mantra",
        themes: [
          "Week 1: ...",
          ...
        ],
    }
    ---
    <context>
    ${Object.keys(extractedChats).map((key) => extractedChats[key])}
    </context>
    ---
    NO OTHER TEXT IS REQUIRED, JUST ANSWER WITH THE PLAIN RAW JSON DATA AND NOTHING ELSE 
          `;

            const aiService = AiServiceFactory.getInstance();
            const aiResponse = await aiService.sendPrompt(prompt);

            // PARSE THE STRUCTURED RESPONSE
            const parsed = JSON.parse(aiResponse);

            return response.ok(parsed);
        } catch (error: any) {
            console.error('Error generating diary content:', error);
            return response.internalServerError({ message: 'Failed to generate content' });
        }
    }

    async generatePdf({ request, response }: HttpContext) {
        try {
            const { mantra, theme, free, prompt, num } = request.only(['mantra', 'theme', 'free', 'prompt', 'num']);

            // TODO: Implement PDF generation using the Generator service
            // For now, return a placeholder response
            return response.ok({
                message: 'PDF generation endpoint - implementation pending',
                data: { mantra, theme, free, prompt, num }
            });
        } catch (error: any) {
            console.error('Error generating PDF:', error);
            return response.internalServerError({ message: 'Failed to generate PDF' });
        }
    }
}