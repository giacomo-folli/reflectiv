// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = ({ locals }: Parameters<LayoutServerLoad>[0]) => {
  if (!locals.user) {
    throw redirect(302, "/login");
  }

  return {
    user: locals.user,
  };
};
