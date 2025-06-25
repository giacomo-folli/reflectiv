import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent }) => {
  const { user, token } = await parent()
  if (!user) {
    throw redirect(302, "/login");
  }

  return { user, token };
};
