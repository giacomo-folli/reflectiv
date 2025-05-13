import { fail, redirect } from '@sveltejs/kit';
import { loginUser } from '$lib/server/auth';

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
  // If user is already logged in, redirect to dashboard
  if (locals.user) {
    throw redirect(302, '/dashboard');
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, request }) => {
    try {
      const data = await request.formData();
      const email = data.get('email')?.toString();
      const password = data.get('password')?.toString();
      
      // Validate form inputs
      if (!email || !password) {
        return fail(400, { 
          message: 'Email and password are required',
          email
        });
      }
      
      // Attempt to log in user
      const { sessionId, user } = await loginUser(email, password);
      
      // Set session cookie
      cookies.set('sessionId', sessionId, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      
      // Redirect to the dashboard
      throw redirect(302, '/dashboard');
    } catch (error) {
      return fail(401, { 
        message: error.message || 'Invalid email or password',
        email: email
      });
    }
  }
};