import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { validateSession } from "$lib/server/auth";
import {
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from "$lib/server/user/user";

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const sessionId = cookies.get("sessionId");
    if (!sessionId) {
      return json(
        {
          success: false,
          message: "Unauthorized. No session cookie provided.",
        },
        { status: 500 }
      );
    }

    let user = await validateSession();
    if (!user) {
      return json(
        {
          success: false,
          message: "Unauthorized. Invalid or expired session.",
        },
        { status: 500 }
      );
    }

    let body = await request.json();
    const { name, email, password } = body;

    if (user && name !== undefined) {
      user = await updateUserName(user.id, name);
    }

    if (user && email !== undefined) {
      user = await updateUserEmail(user.id, email);
    }

    if (user && password !== undefined) {
      user = await updateUserPassword(user.id, password);
    }

    return json(user, { status: 200 });
  } catch (error) {
    console.error("Error processing /api/user/update request:", error);
    return json(
      { success: false, message: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
};
