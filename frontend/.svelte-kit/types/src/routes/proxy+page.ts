// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = async ({ parent }: Parameters<PageLoad>[0]) => {
  const { user } = await parent();

  if (user) throw redirect(302, "/dashboard");
  return { user };
};
