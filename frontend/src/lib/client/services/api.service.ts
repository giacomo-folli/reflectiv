const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3333'

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
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

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(email: string, password: string, name: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    })
  }

  async getCurrentUser() {
    return this.request('/auth/me')
  }

  // API endpoints
  async generateDiaryContent(links: string[]) {
    return this.request('/api/diary-content', {
      method: 'POST',
      body: JSON.stringify({ links }),
    })
  }

  async getLinks() {
    return this.request('/api/links')
  }

  async createLink(url: string, title?: string) {
    return this.request('/api/links', {
      method: 'POST',
      body: JSON.stringify({ url, title }),
    })
  }

  async generatePdf(data: { mantra: string; theme: string; free: string; prompt: string; num: string }) {
    return this.request('/api/generate-pdf', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }
}

export const apiService = new ApiService() 