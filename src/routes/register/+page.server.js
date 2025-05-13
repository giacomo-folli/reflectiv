import { registerUser } from '$lib/server/auth.js';
import { validateRegistrationForm } from '$lib/utils/validationUtils.js';
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
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    const confirmPassword = formData.get('confirmPassword')?.toString() || '';
    
    // Validate form data
    const validation = validateRegistrationForm({
      name,
      email,
      password,
      confirmPassword
    });
    
    if (!validation.isValid) {
      return {
        errors: validation.errors,
        success: false
      };
    }
    
    try {
      // Register user
      const user = await registerUser(email, password, name);
      
      // Redirect to login page
      return {
        success: true,
        redirect: '/login'
      };
    } catch (error) {
      return {
        error: error.message || 'Error creating account',
        success: false
      };
    }
  }
};