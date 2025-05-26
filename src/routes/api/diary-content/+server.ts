import { AiServiceFactory } from "$lib/server/ai/AiServiceFactory.js";
import { error, json } from "@sveltejs/kit";

export async function POST({ locals, request }) {
  if (!locals.user) {
    throw error(401, "You must be logged in to generate content");
  }

  const { links } = await request.json();
  const aiService = AiServiceFactory.getInstance();

  // GENERATE PROMPT

  // PARSE LINKS

  const response = await aiService.sendPrompt("Respond only with OK HELLO!");
  console.log("Gemini response is", response);

  // PARSE THE STRUCTURED RESPONSE

  // mock data
  const content = {
    questions: [
      `What are you most grateful for today?`,
      `What is one small win you can celebrate from today?`,
      `What challenge did you face today, and how did you respond?`,
      `What did you learn about yourself today?`,
      `What act of kindness did you perform or witness today?`,
      `How did you take care of your physical well-being today?`,
      `What made you smile or laugh today?`,
      `How did you nurture your creative side today?`,
      `What is something that surprised you today?`,
      `What are you looking forward to tomorrow?`,
      `What boundary did you set or respect today?`,
      `How did you connect with someone else today?`,
      `What made you feel proud today?`,
      `What decision did you make today that aligns with your values?`,
      `How did you respond to a difficult emotion today?`,
      `What was the most peaceful moment of your day?`,
      `What did you do today that was just for you?`,
      `How did you grow today, even in a small way?`,
      `What's one thing you'd like to do differently tomorrow?`,
      `What is a simple pleasure you enjoyed today?`,
      `How did you use your strengths today?`,
      `What did you read, watch, or listen to that inspired you today?`,
      `What distracted you today, and how might you address this tomorrow?`,
      `What is one habit you're proud of maintaining today?`,
      `How did you show up for someone else today?`,
      `What did you observe in nature today?`,
      `What made you feel challenged in a good way today?`,
      `How did you practice patience today?`,
      `What is something you accomplished today?`,
      `What are you letting go of as this day ends?`,
    ],
    mantra: `In this MONTHNAME of YEAR, I embrace growth and change with an open heart.`,
    themes: [
      `Week 1: Mindfulness - Being present in each moment`,
      `Week 2: Connection - Strengthening relationships with others`,
      `Week 3: Growth - Learning something new each day`,
      `Week 4: Gratitude - Appreciating the small joys`,
    ],
  };

  return json(content);
}
