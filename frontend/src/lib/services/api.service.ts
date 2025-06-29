import { BaseService } from "./base.service";

export class ApiService extends BaseService {
  // API endpoints
  async generateDiaryContent(links: string[]) {
    return await this.thisFetch({
      url: "/api/diary-content",
      options: {
        method: "POST",
        body: JSON.stringify({ links }),
      },
    });
  }

  async generatePdf(data: {
    mantra: string;
    theme: string;
    free: string;
    prompt: string;
    num: string;
  }) {
    return await this.thisFetch({
      url: "/api/generate-pdf",
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
    });
  }

  // Health check
  async healthCheck() {
    return this.thisFetch({ url: "/health" });
  }
}
