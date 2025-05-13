import { validateSession } from '$lib/server/auth';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Get the session cookie
  const sessionId = event.cookies.get('sessionId');
  
  if (sessionId) {
    // Validate the session and get the user
    const user = validateSession(sessionId);
    
    if (user) {
      // Set the user in locals for access in load functions
      event.locals.user = user;
      event.locals.sessionId = sessionId;
    } else {
      // Invalid or expired session, clear the cookie
      event.cookies.delete('sessionId', { path: '/' });
    }
  }
  
  // Resolve the request
  return resolve(event);
}