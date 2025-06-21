// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = ({ locals }: Parameters<PageServerLoad>[0]) => {
  if (!locals.user) {
    throw redirect(302, "/login");
  }

  return {
    user: locals.user,
    session: locals.sessionId,
  };
};
