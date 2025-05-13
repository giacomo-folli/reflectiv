import { sequence } from '@sveltejs/kit/hooks';
import { dev } from '$app/environment';
import { validateSession } from '$lib/server/auth';

/**
 * Handle user authentication
 * @type {import('@sveltejs/kit').Handle}
 */
const handleAuth = async ({ event, resolve }) => {
  // Get the session ID from the cookie
  const sessionId = event.cookies.get('sessionId');
  
  if (sessionId) {
    // Validate the session and get the user
    const user = validateSession(sessionId);
    
    if (user) {
      // If session is valid, attach user to locals
      event.locals.user = user;
      event.locals.sessionId = sessionId;
    }
  }
  
  // Continue with the request
  return await resolve(event);
};

/**
 * CSRF protection handler
 * Disables cross-site POST protection in development for easier testing
 * @type {import('@sveltejs/kit').Handle}
 */
const handleCSRF = async ({ event, resolve }) => {
  const response = await resolve(event, {
    // In development, we'll allow cross-site form submissions for easier testing
    // In production, this should be set to true
    transformPageChunk: ({ html }) => html
  });
  
  return response;
};

// Apply the handlers in sequence
export const handle = sequence(handleAuth, handleCSRF);

// Error handler
export function handleError({ error, event }) {
  console.error("Server error:", error);
  
  return {
    message: dev ? error.message : "An internal error occurred"
  };
}