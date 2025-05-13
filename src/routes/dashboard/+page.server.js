import { linkDb } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
  // Check if user is logged in
  if (!locals.user) {
    throw redirect(303, '/login');
  }
  
  // Get user data
  const user = locals.user;
  
  // Get link count
  const userLinks = linkDb.findByUserId(user.id);
  const linkCount = userLinks.length;
  
  // For PDF count, in a real app we'd track this,
  // but for now we'll just return 0
  const pdfCount = 0;
  
  return {
    user,
    linkCount,
    pdfCount
  };
}