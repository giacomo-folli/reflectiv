/** @type {import('./$types').LayoutServerLoad} */
export function load({ cookies }) {
  // In a real app, you would validate the session from cookies
  // and fetch the user data from your database
  
  // For the MVP, we'll simply check if a user cookie exists
  const userId = cookies.get('userId');
  
  if (userId) {
    // Mock user data for demonstration
    return {
      user: {
        id: userId,
        name: 'Demo User',
        email: 'user@example.com'
      }
    };
  }
  
  return {
    user: null
  };
}