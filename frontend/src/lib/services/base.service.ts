import { browser } from "$app/environment";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333'

export class BaseService {
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

}