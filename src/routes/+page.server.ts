import type { PageServerLoad } from "./$types";

export const load = (({ locals }) => {
  return { user: locals?.user, session: locals.sessionId };
}) as PageServerLoad;
