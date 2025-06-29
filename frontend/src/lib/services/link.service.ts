import { BaseService } from "./base.service";

export class LinkService extends BaseService {
  async list() {
    return await this.thisFetch({ url: "/links" });
  }

  async create(url: string, title?: string) {
    return await this.thisFetch({
      url: "/links",
      options: {
        method: "POST",
        body: JSON.stringify({ url, title }),
      },
    });
  }

  async delete(id: number) {
    return await this.thisFetch({
      url: `/links/${id}`,
      options: { method: "DELETE" },
    });
  }
}
