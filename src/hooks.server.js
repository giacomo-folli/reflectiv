/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Get the user ID from the cookie
  const userId = event.cookies.get('userId');
  
  if (userId) {
    // For MVP, we'll use a simple mock user
    // In a real app, you would fetch the user data from your database
    event.locals.user = {
      id: userId,
      name: 'Demo User',
      email: 'user@example.com'
    };
  }
  
  // Continue with the request
  const response = await resolve(event);
  return response;
}