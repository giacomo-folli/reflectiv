import { linkDb } from "$lib/server/sqlite-db";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ locals }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Get user's links
  const links = linkDb.findByUserId(locals.user.id);

  // Return links as JSON
  return new Response(JSON.stringify({ links }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const data = await request.json();
    if (!data.title || !data.url) {
      return new Response(
        JSON.stringify({ error: "Title and URL are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const link = linkDb.createLink({
      userId: locals.user.id,
      title: data.title,
      url: data.url,
    });

    return new Response(JSON.stringify({ link }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating link:", error);
    return new Response(JSON.stringify({ error: "Error creating link" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: RequestHandler = async ({ locals, url }) => {
  if (!locals.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const linkId = url.searchParams.get("id");

  if (!linkId) {
    return new Response(JSON.stringify({ error: "Link ID is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const link = linkDb.findById(linkId);

  if (!link || link.userId !== locals.user.id) {
    return new Response(JSON.stringify({ error: "Link not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  linkDb.deleteLink(linkId);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
