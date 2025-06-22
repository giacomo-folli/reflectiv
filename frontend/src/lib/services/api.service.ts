import { BaseService } from "./base.service"

export class ApiService extends BaseService {
  // API endpoints
  async generateDiaryContent(links: string[]) {
    return this.thisFetch({
      url: '/api/diary-content', options: {
        method: 'POST',
        body: JSON.stringify({ links }),
      }
    })
  }

  async getLinks() {
    return this.thisFetch({ url: '/api/links' })
  }

  async createLink(url: string, title?: string) {
    return this.thisFetch({
      url: '/api/links', options: {
        method: 'POST',
        body: JSON.stringify({ url, title }),
      }
    })
  }

  async generatePdf(data: { mantra: string; theme: string; free: string; prompt: string; num: string }) {
    return this.thisFetch({
      url: '/api/generate-pdf', options: {
        method: 'POST',
        body: JSON.stringify(data),
      }
    })
  }

  // Health check
  async healthCheck() {
    return this.thisFetch({ url: '/health' })
  }
}