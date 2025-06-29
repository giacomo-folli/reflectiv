import { browser } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';

export enum COOKIES {
	AUTH = 'adonis-session'
}

export class BaseService {
	protected fetch: any;
	protected cookies: Cookies | undefined;
	protected cookieName: string = COOKIES.AUTH;
	protected token: string | undefined = undefined;

	constructor(params: { fetch: any; cookies?: Cookies; token?: string }) {
		if (!params.fetch) throw new Error('service must have a definition of fetch');

		if (browser) this.fetch = params.fetch.bind(window);
		else this.fetch = params.fetch;

		this.cookies = params.cookies;
		this.token = params.token;
	}

	async thisFetch(params: {
		url: string;
		options?: RequestInit;
		responseType?: 'json' | 'blob' | 'text';
	}) {
		let token: string | undefined = this.token;
		if (!token) token = this.cookies?.get(this.cookieName);

		const defaultOptions: RequestInit = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: !!token ? 'Bearer ' + token : '',
				...params.options?.headers
			},
			credentials: 'include', // Include cookies for session management
			...params.options
		};

		try {
			const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
			// || 'http://localhost:3333';
			const response = await this.fetch(`${API_BASE_URL}${params.url}`, defaultOptions);

			if (!response.ok) {
				// Try to parse error message from response
				let errorMessage = `HTTP ${response.status} - ${response.statusText}`;
				try {
					const errorData = await response.json();
					errorMessage += errorData?.message ? `: ${errorData.message}` : '';
				} catch (_) {
					// Ignore JSON parse errors
				}
				throw new Error(errorMessage);
			}

			// Handle response type
			const type = params.responseType || 'json';
			if (type === 'blob') return await response.blob();
			if (type === 'text') return await response.text();
			return await response.json();
		} catch (err: any) {
			// Network or fetch error
			throw new Error(`Network error: ${err?.message || err}`);
		}
	}
}
