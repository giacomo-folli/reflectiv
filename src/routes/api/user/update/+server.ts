import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import {
  validateSession,
  updateUserName,
  updateUserEmail,
  updateUserPassword
} from '$lib/server/auth'; // Adjusted path assuming $lib alias

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const sessionId = cookies.get('sessionId');
    if (!sessionId) {
      return json({ success: false, message: 'Unauthorized. No session cookie provided.' }, { status: 401 });
    }

    const user = validateSession(sessionId);
    if (!user) {
      return json({ success: false, message: 'Unauthorized. Invalid or expired session.' }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      if (e instanceof SyntaxError) {
        return json({ success: false, message: 'Invalid JSON in request body.' }, { status: 400 });
      }
      throw e; // Re-throw other errors
    }

    const { name, email, password } = body;

    if (!name && !email && !password) {
      return json(
        { success: false, message: 'No data provided for update. Please provide name, email, or password.' },
        { status: 400 }
      );
    }

    const results: { field?: string, success: boolean, message: string }[] = [];
    let overallSuccess = true;

    if (name !== undefined) {
      if (typeof name !== 'string') {
        results.push({ field: 'name', success: false, message: 'Name must be a string.' });
        overallSuccess = false;
      } else {
        const nameUpdateSuccess = await updateUserName(user.id, name);
        results.push({
          field: 'name',
          success: nameUpdateSuccess,
          message: nameUpdateSuccess ? 'Name updated successfully.' : 'Failed to update name.'
        });
        if (!nameUpdateSuccess) overallSuccess = false;
      }
    }

    if (email !== undefined) {
      if (typeof email !== 'string') {
        results.push({ field: 'email', success: false, message: 'Email must be a string.' });
        overallSuccess = false;
      } else {
        const emailUpdateSuccess = await updateUserEmail(user.id, email);
        results.push({
          field: 'email',
          success: emailUpdateSuccess,
          message: emailUpdateSuccess ? 'Email updated successfully.' : 'Failed to update email (e.g., invalid format or already in use).'
        });
        if (!emailUpdateSuccess) overallSuccess = false;
      }
    }

    if (password !== undefined) {
      if (typeof password !== 'string') {
        results.push({ field: 'password', success: false, message: 'Password must be a string.' });
        overallSuccess = false;
      } else {
        const passwordUpdateSuccess = await updateUserPassword(user.id, password);
        results.push({
          field: 'password',
          success: passwordUpdateSuccess,
          message: passwordUpdateSuccess ? 'Password updated successfully.' : 'Failed to update password (e.g., does not meet security requirements).'
        });
        if (!passwordUpdateSuccess) overallSuccess = false;
      }
    }

    if (results.length === 0) { // Should not happen if initial check for no data is correct
        return json(
            { success: false, message: 'No updatable fields provided.' },
            { status: 400 }
        );
    }

    if (overallSuccess) {
      return json(
        { success: true, message: 'User data updated successfully.', details: results },
        { status: 200 }
      );
    } else {
      return json(
        { success: false, message: 'One or more updates failed.', details: results },
        { status: 400 } // Or 207 Multi-Status if some succeeded and some failed
      );
    }

  } catch (error) {
    console.error('Error processing /api/user/update request:', error);
    // Catching SyntaxError for request.json() is now handled above
    return json(
      { success: false, message: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
};
