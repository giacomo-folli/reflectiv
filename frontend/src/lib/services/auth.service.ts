import { browser } from "$app/environment";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333'


export class AuthService {
    protected fetch: any;

    constructor(params: { fetch: any }) {
        if (browser) this.fetch = params.fetch.bind(window);
        else this.fetch = params.fetch;
    }

    async thisFetch(params: { url: string; options?: RequestInit }) {
        const defaultOptions: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...params.options?.headers,
            },
            credentials: 'include', // Include cookies for session management
            ...params.options,
        }

        return await this.fetch(`${API_BASE_URL}${params.url}`, defaultOptions);
    }


    // Auth endpoints
    async login(email: string, password: string) {
        return this.thisFetch({
            url: '/auth/login',
            options: {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            }
        })
    }

    async register(email: string, password: string, name: string) {
        return this.thisFetch({
            url: '/auth/register',
            options: {
                method: 'POST',
                body: JSON.stringify({ email, password, name }),
            }
        })
    }

    async logout() {
        return this.thisFetch({
            url: '/auth/logout',
            options: {
                method: 'POST',
            }
        })
    }

    async getCurrentUser() {
        return this.thisFetch({
            url: '/auth/me',
            options: {
                method: 'POST',
            }
        })
    }
}