import { sequence } from '@sveltejs/kit/hooks';
import { dev } from '$app/environment';

/**
 * Handle user authentication
 * @type {import('@sveltejs/kit').Handle}
 */
const handleAuth = async ({ event, resolve }) => {
  // Get the user ID from the cookie
  const userId = event.cookies.get('userId');
  
  if (userId) {
    // For MVP, we'll use a simple mock user
    // In a real app, you would fetch the user data from your database
    event.locals.user = {
      id: userId,
      name: 'Demo User',
      email: 'user@example.com'
    };
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