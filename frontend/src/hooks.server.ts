import { dev } from "$app/environment";
import { init, register } from "svelte-i18n";
import dotenv from "dotenv";

dotenv.config();

register("en", () => import("./lib/i18n/locales/en.json"));
register("it", () => import("./lib/i18n/locales/it.json"));
init({ fallbackLocale: "en", initialLocale: "en" });

export const handle = async ({ event, resolve }: any) => {
  return await resolve(event);
};

export function handleError({ error }: any) {
  console.error("Server error:", error);

  return {
    message:
      dev && error instanceof Error
        ? error.message
        : "An unexpected error occurred",
  };
}
