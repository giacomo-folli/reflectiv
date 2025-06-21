import { apiService } from '$lib/client/services/api.service';

/**
 * Validates a session by making a request to the backend
 * @param sessionId - The session ID to validate
 * @returns The user object if session is valid, null otherwise
 */
export async function validateSession() {
  try {
    // Make a request to the backend to validate the session
    const response = await apiService.getCurrentUser();
    return response.user || null;
  } catch (error) {
    console.error('Session validation error:', error);
    return null;
  }
}

/**
 * Logs out a user by invalidating their session
 * @param sessionId - The session ID to invalidate
 * @returns Promise that resolves when logout is complete
 */
export async function logoutUser(sessionId: string) {
  if (!sessionId) return;

  try {
    await apiService.logout();
  } catch (error) {
    console.error('Logout error:', error);
  }
}

/**
 * Registers a new user
 * @param email - User's email
 * @param password - User's password
 * @param name - User's name
 * @returns Promise that resolves when registration is complete
 */
export async function registerUser(email: string, password: string, name: string) {
  return apiService.register(email, password, name);
}

/**
 * Logs in a user
 * @param email - User's email
 * @param password - User's password
 * @returns Promise with sessionId and user data
 */
export async function loginUser(email: string, password: string) {
  return apiService.login(email, password);
}
