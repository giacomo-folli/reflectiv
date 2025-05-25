import { fail, redirect } from "@sveltejs/kit";
import { registerUser, loginUser } from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";

export const load = (({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/dashboard");
  }
}) as PageServerLoad;

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    try {
      const data = await request.formData();
      const name = data.get("name")?.toString();
      const email = data.get("email")?.toString();
      const password = data.get("password")?.toString();
      const confirmPassword = data.get("confirmPassword")?.toString();

      const formValues = { name, email };

      if (!name || !email || !password || !confirmPassword) {
        return fail(400, { message: "All fields are required", ...formValues });
      }
      if (password !== confirmPassword) {
        return fail(400, { message: "Passwords do not match", ...formValues });
      }

      await registerUser(email, password, name);

      const { sessionId } = await loginUser(email, password);
      cookies.set("sessionId", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return { success: true };
    } catch (error: unknown) {
      const err =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";

      return fail(400, { message: err });
    }
  },
};
