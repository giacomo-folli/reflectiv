const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333'

export class ApiService {
  static async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for session management
      ...options,
    }

    const response = await fetch(url, defaultOptions)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // API endpoints
  async generateDiaryContent(links: string[]) {
    return ApiService.request('/api/diary-content', {
      method: 'POST',
      body: JSON.stringify({ links }),
    })
  }

  async getLinks() {
    return ApiService.request('/api/links')
  }

  async createLink(url: string, title?: string) {
    return ApiService.request('/api/links', {
      method: 'POST',
      body: JSON.stringify({ url, title }),
    })
  }

  async generatePdf(data: { mantra: string; theme: string; free: string; prompt: string; num: string }) {
    return ApiService.request('/api/generate-pdf', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Health check
  async healthCheck() {
    return ApiService.request('/health')
  }
}