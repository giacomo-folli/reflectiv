import { fail, redirect } from '@sveltejs/kit';
import { registerUser, loginUser } from '$lib/server/auth';

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
      const name = data.get('name')?.toString();
      const email = data.get('email')?.toString();
      const password = data.get('password')?.toString();
      const confirmPassword = data.get('confirmPassword')?.toString();
      
      // Store form values for re-populating the form on error
      const formValues = { name, email };
      
      // Validate required fields
      if (!name || !email || !password || !confirmPassword) {
        return fail(400, { 
          message: 'All fields are required',
          ...formValues
        });
      }
      
      // Validate password match
      if (password !== confirmPassword) {
        return fail(400, { 
          message: 'Passwords do not match',
          ...formValues
        });
      }
      
      // Register the new user
      const user = await registerUser(email, password, name);
      
      // Log in the newly registered user
      const { sessionId } = await loginUser(email, password);
      
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
      // Handle registration errors
      return fail(400, { 
        message: error.message || 'Registration failed. Please try again.',
        name,
        email
      });
    }
  }
};