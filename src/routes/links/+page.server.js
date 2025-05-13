import { linkDb } from '$lib/server/db.js';
import { validateLinkSubmission } from '$lib/utils/validationUtils.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
  // Check if user is logged in
  if (!locals.user) {
    throw redirect(303, '/login');
  }
  
  // Get user data
  const user = locals.user;
  
  // Get user's links
  const links = linkDb.findByUserId(user.id);
  
  return {
    user,
    links
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  addLink: async ({ locals, request }) => {
    // Check if user is logged in
    if (!locals.user) {
      throw redirect(303, '/login');
    }
    
    // Get form data
    const formData = await request.formData();
    const title = formData.get('title')?.toString() || '';
    const url = formData.get('url')?.toString() || '';
    
    // Validate form data
    const validation = validateLinkSubmission({ title, url });
    
    if (!validation.isValid) {
      return {
        errors: validation.errors,
        success: false
      };
    }
    
    // Create link
    linkDb.createLink({
      userId: locals.user.id,
      title,
      url
    });
    
    return {
      success: true
    };
  },
  
  deleteLink: async ({ locals, request }) => {
    // Check if user is logged in
    if (!locals.user) {
      throw redirect(303, '/login');
    }
    
    // Get form data
    const formData = await request.formData();
    const linkId = formData.get('linkId')?.toString();
    
    if (!linkId) {
      return {
        error: 'Link ID is required',
        success: false
      };
    }
    
    // Get link
    const link = linkDb.findById(linkId);
    
    // Check if link exists and belongs to user
    if (!link || link.userId !== locals.user.id) {
      return {
        error: 'Link not found',
        success: false
      };
    }
    
    // Delete link
    linkDb.deleteLink(linkId);
    
    return {
      success: true
    };
  }
};