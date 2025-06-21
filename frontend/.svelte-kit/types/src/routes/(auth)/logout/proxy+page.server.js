// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { logoutUser } from '$lib/server/auth';

/** */
export const actions = {
  default:/** @param {import('./$types').RequestEvent} event */  async ({ locals, cookies }) => {
    // Log out user if session exists
    if (locals.sessionId) {
      logoutUser(locals.sessionId);
    }
    
    // Remove the session cookie
    cookies.delete('sessionId', { path: '/' });
    
    // Redirect to the home page
    throw redirect(302, '/');
  }
};