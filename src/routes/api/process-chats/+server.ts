import type { RequestHandler } from '@sveltejs/kit';
import type { ProcessChatsRequest, ProcessChatsResponse } from '$lib/types/api';
import { mockProcessChatsResponseOk, mockProcessChatsResponseInvalid } from '$lib/mock-data';

const MAX_URLS = 10 as const;

/**
 * Validates if a string is a valid HTTP/HTTPS URL.
 * @param url - The URL string to validate
 * @returns true if valid, false otherwise
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * POST /api/process-chats
 * Receives a list of ChatGPT URLs to process and returns status.
 * Input is validated; errors are returned with appropriate status codes.
 *
 * @param request - The incoming request object
 * @returns Response with processing status
 */
export const POST: RequestHandler = async ({ request }) => {
  let body: ProcessChatsRequest;
  try {
    body = await request.json();
  } catch {
    const response: ProcessChatsResponse = {
      status: 'error',
      message: 'Invalid JSON in request body.'
    };
    return new Response(JSON.stringify(response), { status: 400 });
  }

  if (!body.urls || !Array.isArray(body.urls)) {
    const response: ProcessChatsResponse = {
      status: 'error',
      message: 'Missing or invalid "urls" array.'
    };
    return new Response(JSON.stringify(response), { status: 400 });
  }

  if (body.urls.length === 0 || body.urls.length > MAX_URLS) {
    const response: ProcessChatsResponse = {
      status: 'error',
      message: `You must provide between 1 and ${MAX_URLS} URLs.`
    };
    return new Response(JSON.stringify(response), { status: 400 });
  }

  const invalidUrls = body.urls.filter((url) => typeof url !== 'string' || !isValidUrl(url));
  if (invalidUrls.length > 0) {
    const response: ProcessChatsResponse = {
      status: 'error',
      message: 'Some URLs are invalid.',
      invalidUrls
    };
    return new Response(JSON.stringify(mockProcessChatsResponseInvalid), { status: 400 });
  }

  // TODO: Fetch chat content, call OpenAI  // Return mock success for development
  return new Response(JSON.stringify(mockProcessChatsResponseOk), { status: 200 });
};
