import { redirect, fail } from '@sveltejs/kit';
import { linkDb } from '$lib/server/sqlite-db.js';
import { DateTime } from 'luxon';

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
  // If user is not logged in, redirect to login page
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  
  // Get links for the current user using the SQLite database
  const links = linkDb.findByUserId(locals.user.id);
  
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
    const title = data.get('title')?.toString() || '';
    const url = data.get('url')?.toString();
    
    // Validate URL
    if (!url) {
      return fail(400, { message: 'URL is required' });
    }
    
    // Validate URL format (basic check)
    if (!url.startsWith('https://chat.openai.com/share/')) {
      return fail(400, { message: 'URL must be a valid ChatGPT shared link' });
    }
    
    try {
      // Save the link to the SQLite database
      linkDb.createLink({
        userId: locals.user.id,
        title: title,
        url: url
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Error creating link:', error);
      return fail(500, { message: 'Failed to add link. Please try again.' });
    }
  },
  
  deleteLink: async ({ locals, request }) => {
    // If user is not logged in, return error
    if (!locals.user) {
      return fail(401, { message: 'You must be logged in to delete links' });
    }
    
    const data = await request.formData();
    const id = data.get('id')?.toString();
    
    if (!id) {
      return fail(400, { message: 'Link ID is required' });
    }
    
    try {
      // Check if the link exists and belongs to the user
      const link = linkDb.findById(id);
      if (!link || link.userId !== locals.user.id) {
        return fail(404, { message: 'Link not found' });
      }
      
      // Delete the link from the SQLite database
      const success = linkDb.deleteLink(id);
      
      if (!success) {
        return fail(500, { message: 'Failed to delete link. Please try again.' });
      }
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Error deleting link:', error);
      return fail(500, { message: 'Failed to delete link. Please try again.' });
    }
  }
};