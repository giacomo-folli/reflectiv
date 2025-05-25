import { browser } from "$app/environment";
import { error } from "@sveltejs/kit";

export class PdfService {
  protected fetch: any;

  constructor(params: { fetch: any }) {
    if (browser) this.fetch = params.fetch.bind(window);
    else this.fetch = params.fetch;
  }

  async getDiariyContent(params: { links?: string[] }): Promise<{
    questions: string[];
    themes: string[];
    mantra: string;
  }> {
    const response = await this.fetch(`/api/diary-content`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ links: params.links }),
    }).catch((err: unknown) =>
      console.error(err instanceof Error ? err.message : err)
    );

    if (!response) throw error(404, "Something went wrong");
    const data = await response.json();
    return data;
  }

  async generateDiary(params: {
    questions: string[];
    themes: string[];
    mantra: string;
  }): Promise<boolean> {
    const response = await this.fetch(`/api/generate-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questions: params.questions,
        themes: params.themes,
        mantra: params.mantra,
      }),
    }).catch((err: unknown) =>
      console.error(err instanceof Error ? err.message : err)
    );

    const blob = await response.blob();

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `reflection-diary.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return true;
  }

  async getUserLinks(): Promise<any[]> {
    try {
      const response = await this.fetch(`/api/links/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} - Failed to fetch links`);
      }

      const links = await response.json();
      return links;
    } catch (error) {
      console.error("Error fetching user links:", error);
      return [];
    }
  }
}
