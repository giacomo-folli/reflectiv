import { fail, redirect } from '@sveltejs/kit';

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
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');
    
    // In a real app, you'd validate the inputs
    if (!name || !email || !password || !confirmPassword) {
      return fail(400, { 
        message: 'All fields are required' 
      });
    }
    
    if (password !== confirmPassword) {
      return fail(400, { 
        message: 'Passwords do not match' 
      });
    }
    
    // For demo purposes, let's accept any valid registration
    // In a real app, you'd check if the email is already registered
    // and store the user in your database
    
    // Set a cookie to represent the user session
    cookies.set('userId', '1', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });
    
    // Redirect to the dashboard
    throw redirect(302, '/dashboard');
  }
};