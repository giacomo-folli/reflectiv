import { redirect } from '@sveltejs/kit';
import { logoutUser } from '$lib/server/auth';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ locals, cookies }) => {
    // Log out user if session exists
    if (locals.sessionId) {
      await logoutUser(locals.sessionId);
    }
    
    // Remove the session cookie
    cookies.delete('sessionId', { 
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
    
    // Redirect to the home page
    throw redirect(302, '/');
  }
};