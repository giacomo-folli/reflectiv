import { loginUser } from '$lib/server/auth.js';
import { validateLoginForm } from '$lib/utils/validationUtils.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
  // If user is already logged in, redirect to dashboard
  if (locals.user) {
    throw redirect(303, '/dashboard');
  }
  
  return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, request }) => {
    // Get form data
    const formData = await request.formData();
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    
    // Validate form data
    const validation = validateLoginForm({ email, password });
    
    if (!validation.isValid) {
      return {
        errors: validation.errors,
        success: false
      };
    }
    
    try {
      // Attempt to log in
      const { sessionId, user } = await loginUser(email, password);
      
      // Set session cookie
      cookies.set('sessionId', sessionId, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      
      // Redirect to dashboard
      throw redirect(303, '/dashboard');
    } catch (error) {
      return {
        error: error.message || 'Invalid email or password',
        success: false
      };
    }
  }
};