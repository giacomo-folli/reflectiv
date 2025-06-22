import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { AuthService } from "$lib/services/auth.service";

export const load: LayoutServerLoad = async ({ fetch }) => {
  const service = new AuthService({ fetch })
  const res = await service.getCurrentUser()
  const data = await res.json()

  if (!data.user) {
    throw redirect(302, "/login");
  }

  return { user: data.user };
};
