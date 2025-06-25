import { BaseService } from "./base.service";

export class AuthService extends BaseService {
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
                method: 'GET',
            }
        })
    }

    async deleteTokenCookie(): Promise<void> {
        this.cookies?.delete(this.cookieName, { path: '/' })
    }
}