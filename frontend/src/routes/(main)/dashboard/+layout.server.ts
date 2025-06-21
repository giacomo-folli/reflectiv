import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, "/login");
  }

  return {
    user: locals.user,
  };
};
