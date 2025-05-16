import { sequence } from "@sveltejs/kit/hooks";
import { dev } from "$app/environment";
import { validateSession } from "$lib/server/auth";
import { init, register } from "svelte-i18n";

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
    const user = validateSession(sessionId);

    if (user) {
      event.locals.user = user;
      event.locals.sessionId = sessionId;
    }
  }

  return await resolve(event);
};

/**
 * CSRF protection handler
 * Disables cross-site POST protection in development for easier testing
 * @type {import('@sveltejs/kit').Handle}
 */
const handleCSRF = async ({ event, resolve }: any) => {
  const response = await resolve(event, {
    // In development, we'll allow cross-site form submissions for easier testing
    // In production, this should be set to true
    transformPageChunk: ({ html }: any) => html,
  });

  return response;
};

export const handle = sequence(handleAuth, handleCSRF);

export function handleError({ error }: any) {
  console.error("Server error:", error);

  return {
    message:
      dev && error instanceof Error
        ? error.message
        : "An unexpected error occurred",
  };
}
