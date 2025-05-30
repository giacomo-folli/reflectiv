import { AiService } from './AiService';

export class LocalLlmService extends AiService {
  constructor(baseUri: string) {
    super(baseUri);
  }

  async sendPrompt(prompt: string): Promise<any> {
    try {
      const response = await fetch(this.baseUri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          stream: false, // Assuming non-streaming for simplicity first
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Local LLM API request failed with status ${response.status}: ${errorBody}`);
        throw new Error(`Local LLM API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Assuming the local LLM API returns a JSON object 
      // with the generated text in a 'response' field.
      // This might need adjustment based on the specific LLM being used (e.g. Ollama, LocalAI)
      if (data && data.response) {
        return data.response;
      } else if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        // Fallback for OpenAI compatible local LLMs (like LocalAI or some Ollama configurations)
        return data.choices[0].message.content;
      } else {
        console.error('Local LLM response did not contain expected data structure:', data);
        throw new Error('Invalid response structure from local LLM.');
      }

    } catch (error) {
      console.error('Error sending prompt to Local LLM:', error);
      throw error;
    }
  }
}
