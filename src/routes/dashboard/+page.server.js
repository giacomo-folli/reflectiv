import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
  // If user is not logged in, redirect to login page
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  
  // Return user data for the page
  return {
    user: locals.user
  };
}