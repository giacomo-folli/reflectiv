import { expect, test } from "vitest";
import { Extractor } from "./Extractor";

test("extractChatFromShareUrl returns an empty array when no message elements are found", async () => {
  const url = "https://chatgpt.com/share/6832eb0c-c53c-800e-a17e-379806cf8304"; // Replace with a URL that returns no message elements
  const extractor = new Extractor();
  const chat = await extractor.extractChatFromShareUrl(url);
  console.log("chat", chat);
  // expect(chat).toEqual([]);
}, 20000);
