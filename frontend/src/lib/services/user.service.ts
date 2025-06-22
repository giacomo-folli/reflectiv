import { browser } from "$app/environment";
import { error } from "@sveltejs/kit";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export class UserService {
  protected fetch: any;

  constructor(params: { fetch: any }) {
    if (browser) this.fetch = params.fetch.bind(window);
    else this.fetch = params.fetch;
  }

  async thisFetch(params: { method: string; url: string; options: RequestInit }) {
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...params.options.headers,
      },
      credentials: 'include', // Include cookies for session management
      ...params.options,
    }

    return await this.fetch(`/api/${params.url}`, defaultOptions);
  }

  async updateUser(params: {
    name?: string;
    email?: string;
    newPassword?: string;
  }): Promise<User> {
    const response = await this.thisFetch({
      method: "POST",
      url: "user/update",
      options: {
        body: JSON.stringify({
          name: params.name,
          email: params.email,
          password: params.newPassword,
        }),
      }
    }).catch((err: unknown) =>
      console.error(err instanceof Error ? err.message : err)
    );

    if (!response) throw error(404, "Something went wrong");
    const data = await response.json();
    return data;
  }
}
