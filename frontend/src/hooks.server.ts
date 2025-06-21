import { sequence } from "@sveltejs/kit/hooks";
import { dev } from "$app/environment";
import { validateSession } from "$lib/server/auth";
import { init, register } from "svelte-i18n";
import dotenv from "dotenv";

dotenv.config();

register("en", () => import("./lib/i18n/locales/en.json"));
register("it", () => import("./lib/i18n/locales/it.json"));
init({ fallbackLocale: "en", initialLocale: "en" });

/**
 * Handle user authentication
 * @type {import('@sveltejs/kit').Handle}
 */
const handleAuth = async ({ event, resolve }: any) => {
  const sessionId = event.cookies.get("sessionId");

  if (sessionId) {
    const user = await validateSession();

    if (user) {
      event.locals.user = user;
      event.locals.sessionId = sessionId;
    }
  }

  return await resolve(event);
};

export const handle = sequence(handleAuth);

export function handleError({ error }: any) {
  console.error("Server error:", error);

  return {
    message:
      dev && error instanceof Error
        ? error.message
        : "An unexpected error occurred",
  };
}
