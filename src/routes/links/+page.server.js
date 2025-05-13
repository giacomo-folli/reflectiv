import { redirect, fail } from '@sveltejs/kit';
import { DateTime } from 'luxon';

// In-memory storage for links
// For a complete app, this would be stored in a database
const linksStorage = new Map();

// Sample link for demo purposes
linksStorage.set('1', {
  id: '1',
  userId: '1',
  title: 'Career Advice',
  url: 'https://chat.openai.com/share/example-id-123',
  createdAt: '2025-05-12'
});

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
  // If user is not logged in, redirect to login page
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  
  // Get links for the current user
  const links = Array.from(linksStorage.values())
    .filter(link => link.userId === locals.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  return {
    user: locals.user,
    links
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  addLink: async ({ locals, request }) => {
    // If user is not logged in, return error
    if (!locals.user) {
      return fail(401, { message: 'You must be logged in to add links' });
    }
    
    const data = await request.formData();
    const title = data.get('title') || '';
    const url = data.get('url');
    
    // Validate URL
    if (!url) {
      return fail(400, { message: 'URL is required' });
    }
    
    // Validate URL format (basic check)
    if (!url.toString().startsWith('https://chat.openai.com/share/')) {
      return fail(400, { message: 'URL must be a valid ChatGPT shared link' });
    }
    
    // Generate a unique ID
    const id = crypto.randomUUID();
    
    // Save the link
    linksStorage.set(id, {
      id,
      userId: locals.user.id,
      title: title.toString(),
      url: url.toString(),
      createdAt: DateTime.now().toISODate()
    });
    
    return {
      success: true
    };
  },
  
  deleteLink: async ({ locals, request }) => {
    // If user is not logged in, return error
    if (!locals.user) {
      return fail(401, { message: 'You must be logged in to delete links' });
    }
    
    const data = await request.formData();
    const id = data.get('id');
    
    if (!id) {
      return fail(400, { message: 'Link ID is required' });
    }
    
    // Check if the link exists and belongs to the user
    const link = linksStorage.get(id.toString());
    if (!link || link.userId !== locals.user.id) {
      return fail(404, { message: 'Link not found' });
    }
    
    // Delete the link
    linksStorage.delete(id.toString());
    
    return {
      success: true
    };
  }
};