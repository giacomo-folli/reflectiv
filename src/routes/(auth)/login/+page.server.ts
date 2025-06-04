import { fail, json, redirect } from "@sveltejs/kit";
import { loginUser } from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";

export const load = (({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/dashboard");
  }
  return {};
}) as PageServerLoad;

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    try {
      const data = await request.formData();
      const email = data.get("email")?.toString();
      const password = data.get("password")?.toString();

      if (!email || !password) {
        return fail(400, { message: "Email and password are required" });
      }

      const { sessionId } = await loginUser(email, password);

      cookies.set("sessionId", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false, // For now, but should fix
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return { success: true };
    } catch (error: unknown) {
      console.error(error);
      const err =
        error instanceof Error ? error.message : "Invalid email or password";

      return fail(401, { message: err });
    }
  },
};
