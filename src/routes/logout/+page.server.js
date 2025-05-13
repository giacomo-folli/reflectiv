import { logoutUser } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, locals }) => {
    // Get the session ID
    const sessionId = locals.sessionId;
    
    if (sessionId) {
      // Log out the user
      logoutUser(sessionId);
      
      // Clear the session cookie
      cookies.delete('sessionId', { path: '/' });
    }
    
    // Redirect to home page
    throw redirect(303, '/');
  }
};