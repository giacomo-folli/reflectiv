// @ts-nocheck
import { redirect, fail } from "@sveltejs/kit";
import { linkDb } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";

export const load = ({ locals }: Parameters<PageServerLoad>[0]) => {
  if (!locals.user) throw redirect(302, "/login");

  const links = linkDb.findByUserId(locals.user.id);

  return { user: locals.user, session: locals.sessionId, links };
};

export const actions = {
  addLink: async ({ locals, request }: import('./$types').RequestEvent) => {
    if (!locals.user) {
      return fail(401, { message: "You must be logged in to add links" });
    }

    const data = await request.formData();
    const title = data.get("title")?.toString() || "";
    const url = data.get("url")?.toString();

    if (!url) {
      return fail(400, { message: "URL is required" });
    }
    if (!url.startsWith("https://chatgpt.com/share")) {
      return fail(400, { message: "URL must be a valid ChatGPT shared link" });
    }

    try {
      linkDb.createLink({ userId: locals.user.id, title: title, url: url });
      return { success: true };
    } catch (error) {
      console.error("Error creating link:", error);
      return fail(500, { message: "Failed to add link. Please try again." });
    }
  },

  deleteLink: async ({ locals, request }: import('./$types').RequestEvent) => {
    if (!locals.user) {
      return fail(401, { message: "You must be logged in to delete links" });
    }

    const data = await request.formData();
    const id = data.get("id")?.toString();

    if (!id) {
      return fail(400, { message: "Link ID is required" });
    }

    try {
      const link = linkDb.findById(id);
      if (!link || link.userId !== locals.user.id) {
        return fail(404, { message: "Link not found" });
      }

      const success = linkDb.deleteLink(id);

      if (!success) {
        return fail(500, {
          message: "Failed to delete link. Please try again.",
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting link:", error);
      return fail(500, { message: "Failed to delete link. Please try again." });
    }
  },
};
;null as any as Actions;