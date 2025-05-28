import { AiServiceFactory } from "$lib/server/ai/AiServiceFactory.js";
import { Extractor } from "$lib/server/gptChat/Extractor.js";
import { error, json } from "@sveltejs/kit";

export async function POST({ locals, request }) {
  if (!locals.user) {
    throw error(401, "You must be logged in to generate content");
  }

  const { links }: { links: string[] } = await request.json();

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
  const response = await aiService.sendPrompt(prompt);

  // PARSE THE STRUCTURED RESPONSE
  const parsed = JSON.parse(response);

  return json(parsed);
}
