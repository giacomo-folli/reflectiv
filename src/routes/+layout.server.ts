import { sessionDb, userDb } from "$lib/server/db";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
  const sessionId = cookies.get("sessionId");

  if (!sessionId) {
    return { user: null, session: null };
  }

  const dbSession = sessionDb.findById(sessionId);
  if (!dbSession?.id) {
    cookies.delete("sessionId", { path: "/" });
    return { user: null, session: null };
  }

  if (new Date(dbSession.expiresAt) < new Date()) {
    sessionDb.deleteSession(sessionId);
    cookies.delete("sessionId", { path: "/" });
    return { user: null, session: null };
  }

  const user = userDb.findById(dbSession.userId);
  if (!user?.id) {
    sessionDb.deleteSession(sessionId);
    cookies.delete("sessionId", { path: "/" });
    return { user: null, session: null };
  }

  return {
    user: user,
    session: {
      id: dbSession.id,
      expiresAt: dbSession.expiresAt,
    },
  };
};
