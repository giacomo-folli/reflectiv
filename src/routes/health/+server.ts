import type { RequestHandler } from "./$types";
import { Generator } from "$lib/server/pdf/Generator";

export const GET: RequestHandler = async () => {
  const isPdfServiceOperational = Generator.isBrowserHealthy();

  return new Response(
    JSON.stringify({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      dependencies: {
        pdf_browser: {
          healthy: isPdfServiceOperational,
        },
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
