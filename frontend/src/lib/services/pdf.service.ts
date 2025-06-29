import { error } from "@sveltejs/kit";
import { BaseService } from "./base.service";

export class PdfService extends BaseService {
  async getDiariyContent(params: { links?: string[] }): Promise<{
    questions: string[];
    themes: string[];
    mantra: string;
  }> {
    const response = await this.thisFetch({
      url: "diary-content",
      options: {
        method: "POST",
        body: JSON.stringify({ links: params.links }),
      }
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
    const response = await this.thisFetch({
      url: "generate-pdf",
      options: {
        method: "POST",
        body: JSON.stringify({
          questions: params.questions,
          themes: params.themes,
          mantra: params.mantra,
        })
      },
    }).catch((err: unknown) =>
      console.error(err instanceof Error ? err.message : err)
    );

    const blob = await response.blob();

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `reflectiv-diary.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return true;
  }

  async getUserLinks(): Promise<any[]> {
    try {
      const response = await this.thisFetch({
        url: "links",
        options: {
          method: "GET",
        }
      }).catch((err: unknown) =>
        console.error(err instanceof Error ? err.message : err)
      );

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
