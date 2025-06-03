import { browser } from "$app/environment";
import type { User } from "$lib/types/user.types";
import { error } from "@sveltejs/kit";

export class UserService {
  protected fetch: any;

  constructor(params: { fetch: any }) {
    if (browser) this.fetch = params.fetch.bind(window);
    else this.fetch = params.fetch;
  }

  async thisFetch(params: { method: string; url: string; body?: any }) {
    return await this.fetch(`/api/${params.url}`, {
      method: params.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params?.body),
    });
  }

  async updateUser(params: {
    name?: string;
    email?: string;
    newPassword?: string;
  }): Promise<User> {
    const response = await this.thisFetch({
      method: "POST",
      url: "user/update",
      body: {
        name: params.name,
        email: params.email,
        password: params.newPassword,
      },
    }).catch((err: unknown) =>
      console.error(err instanceof Error ? err.message : err)
    );

    if (!response) throw error(404, "Something went wrong");
    const data = await response.json();
    return data;
  }
}
