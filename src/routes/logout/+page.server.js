import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies }) => {
    // Remove the user cookie
    cookies.delete('userId', { path: '/' });
    
    // Redirect to the home page
    throw redirect(302, '/');
  }
};