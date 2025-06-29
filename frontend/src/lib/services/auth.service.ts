import { browser } from '$app/environment';
import { BaseService, COOKIES } from './base.service';
import JsCookies from 'js-cookie';

export class AuthService extends BaseService {
	async login(email: string, password: string) {
		return await this.thisFetch({
			url: '/login',
			options: {
				method: 'POST',
				body: JSON.stringify({ email, password })
			}
		});
	}

	async register(params: { email: string; password: string; fullName: string }) {
		return await this.thisFetch({
			url: '/register',
			options: {
				method: 'POST',
				body: JSON.stringify({
					email: params.email,
					password: params.password,
					fullName: params.fullName
				})
			}
		});
	}

	async logout() {
		await this.thisFetch({ url: '/logout' });

		JsCookies.remove(COOKIES.AUTH);
	}

	async me() {
		return await this.thisFetch({ url: '/me' });
	}

	async deleteTokenCookie(): Promise<void> {
		this.cookies?.delete(COOKIES.AUTH, { path: '/' });
	}
}
