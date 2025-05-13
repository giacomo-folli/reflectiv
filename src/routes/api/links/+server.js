import { linkDb } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
  // Check if user is logged in
  if (!locals.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  // Get user's links
  const links = linkDb.findByUserId(locals.user.id);
  
  // Return links as JSON
  return new Response(JSON.stringify({ links }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request }) {
  // Check if user is logged in
  if (!locals.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  try {
    // Parse request body
    const data = await request.json();
    
    // Validate data
    if (!data.title || !data.url) {
      return new Response(JSON.stringify({ error: 'Title and URL are required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Create link
    const link = linkDb.createLink({
      userId: locals.user.id,
      title: data.title,
      url: data.url
    });
    
    // Return created link
    return new Response(JSON.stringify({ link }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creating link:', error);
    return new Response(JSON.stringify({ error: 'Error creating link' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ locals, url }) {
  // Check if user is logged in
  if (!locals.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  // Get link ID from query parameter
  const linkId = url.searchParams.get('id');
  
  if (!linkId) {
    return new Response(JSON.stringify({ error: 'Link ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  // Get link
  const link = linkDb.findById(linkId);
  
  // Check if link exists and belongs to user
  if (!link || link.userId !== locals.user.id) {
    return new Response(JSON.stringify({ error: 'Link not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  // Delete link
  linkDb.deleteLink(linkId);
  
  // Return success
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}