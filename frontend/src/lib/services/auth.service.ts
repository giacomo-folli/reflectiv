import { browser } from "$app/environment";
import { BaseService } from "./base.service";
import JsCookies from "js-cookie";

export class AuthService extends BaseService {
  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.thisFetch({
      url: "/auth/login",
      options: {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
    });

    if (browser && response.token) {
      document.cookie = `${this.cookieName}=${response.token}; path=/; max-age=604800; SameSite=Lax`;
    }

    return response;
  }

  async register(email: string, password: string, name: string) {
    return this.thisFetch({
      url: "/auth/register",
      options: {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      },
    });
  }

  async logout() {
    await this.thisFetch({
      url: "/auth/logout",
      options: {
        method: "POST",
      },
    });

    if (browser) {
      JsCookies.remove(this.cookieName);
    }
  }

  async me() {
    return this.thisFetch({
      url: "/auth/me",
      options: {
        method: "GET",
      },
    });
  }

  async deleteTokenCookie(): Promise<void> {
    this.cookies?.delete(this.cookieName, { path: "/" });
  }
}
