import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
  // If user is not logged in, redirect to login page
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  
  return {
    user: locals.user
  };
}
