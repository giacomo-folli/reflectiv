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
    const email = data.get('email');
    const password = data.get('password');
    
    // In a real app, you'd validate the email and password against your database
    // For the MVP, we'll just check if email and password are provided
    if (!email || !password) {
      return fail(400, { 
        message: 'Email and password are required' 
      });
    }
    
    // For demo purposes, let's accept any credentials
    // In a real app, you'd verify against your database
    
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