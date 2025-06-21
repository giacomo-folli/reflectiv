import { AiServiceFactory } from '../Services/ai/AiServiceFactory'
import { Extractor } from '../Services/gptChat/Extractor'
import { linkDb } from '../Services/DatabaseService'
import { validateSession } from '../Services/AuthService'

export default class ApiController {
  async diaryContent({ request, response }: any) {
    try {
      const sessionId = request.cookie('sessionId')
      if (!sessionId) {
        return response.unauthorized({ message: 'You must be logged in to generate content' })
      }

      const user = validateSession(sessionId)
      if (!user) {
        return response.unauthorized({ message: 'Invalid session' })
      }

      const { links }: { links: string[] } = request.body()

      // PARSE LINKS
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

  async links({ request, response }: any) {
    try {
      const sessionId = request.cookie('sessionId')
      if (!sessionId) {
        return response.unauthorized({ message: 'You must be logged in' })
      }

      const user = validateSession(sessionId)
      if (!user) {
        return response.unauthorized({ message: 'Invalid session' })
      }

      if (request.method() === 'GET') {
        const links = linkDb.findByUserId(user.id);
        return response.ok(links);
      }

      if (request.method() === 'POST') {
        const { url, title } = request.only(['url', 'title']);
        
        if (!url) {
          return response.badRequest({ message: 'URL is required' });
        }

        const link = linkDb.createLink({
          userId: user.id,
          url,
          title: title || '',
        });

        if (!link) {
          return response.internalServerError({ message: 'Failed to create link' });
        }

        return response.created(link);
      }

      return response.methodNotAllowed();
    } catch (error: any) {
      console.error('Error handling links:', error);
      return response.internalServerError({ message: 'Failed to process request' });
    }
  }

  async generatePdf({ request, response }: any) {
    try {
      const sessionId = request.cookie('sessionId')
      if (!sessionId) {
        return response.unauthorized({ message: 'You must be logged in to generate PDF' })
      }

      const user = validateSession(sessionId)
      if (!user) {
        return response.unauthorized({ message: 'Invalid session' })
      }

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