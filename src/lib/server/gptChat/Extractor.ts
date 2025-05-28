import { chromium, type Browser } from "playwright";

export interface ExtractedMessage {
  role: string;
  content: string;
}

class Extractor {
  private browser: Browser | undefined;
  private executablePath: string;

  constructor(executablePath: string = "/usr/bin/chromium") {
    this.executablePath = executablePath;
  }

  private async extract(element: any, selector: string): Promise<string> {
    try {
      const contentElements = await element.locator(selector).all();
      if (contentElements.length > 0) {
        const innerText = await contentElements[0].innerText();
        return innerText.replaceAll("\n", " ");
      }
      return "";
    } catch (error: any) {
      console.error(
        `Failed to extract content using selector ${selector}:`,
        error
      );
      return "";
    }
  }

  async extractChatFromShareUrl(url: string): Promise<ExtractedMessage[]> {
    try {
      this.browser = await chromium.launch({
        executablePath: this.executablePath,
        headless: true,
      });

      const page = await this.browser.newPage();
      await page.goto(url);
      await page.waitForLoadState("networkidle");

      const chat: ExtractedMessage[] = [];
      const messageElements = await page
        .locator("div[data-message-author-role]")
        .all();

      // If no message elements are found, return an empty array
      if (!messageElements || messageElements.length === 0) {
        console.warn("No message elements found.");
        return [];
      }

      for (const element of messageElements) {
        let role = await element.getAttribute("data-message-author-role");
        let content = "";

        if (role) {
          role = role.trim();
          if (role === "assistant") {
            content = await this.extract(element, "div.markdown.prose");
          } else if (role === "user") {
            content = await this.extract(element, "div.whitespace-pre-wrap");
          }
        }

        if (role && content) {
          chat.push({ role: role, content: content.trim() });
        }
      }

      return chat;
    } catch (error: any) {
      console.error("Failed to extract chat:", error);
      return [];
    } finally {
      if (this.browser) await this.browser.close();
    }
  }

  async importChat(url: string): Promise<string> {
    const chat = await this.extractChatFromShareUrl(url);
    return JSON.stringify(chat);
  }
}

export { Extractor };
