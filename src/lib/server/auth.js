import { userDb, sessionDb } from './db.js';
import { createHash } from 'crypto';

/**
 * Hash a password for secure storage
 * @param {string} password - Plain text password
 * @returns {string} - Hashed password
 */
export function hashPassword(password) {
  // In a real app, you'd use bcrypt or argon2, but for simplicity we'll use
  // a basic SHA-256 hash (not recommended for production)
  return createHash('sha256').update(password).digest('hex');
}

/**
 * Verify a password against a stored hash
 * @param {string} password - Plain text password to verify
 * @param {string} hashedPassword - Stored password hash
 * @returns {boolean} - Whether the password matches
 */
export function verifyPassword(password, hashedPassword) {
  const inputHash = hashPassword(password);
  return inputHash === hashedPassword;
}

/**
 * Register a new user
 * @param {string} email - User's email address
 * @param {string} password - Plain text password
 * @param {string} name - User's display name
 * @returns {Object} - Newly created user object (without password)
 */
export async function registerUser(email, password, name) {
  // Check if user already exists
  const existingUser = userDb.findByEmail(email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const passwordHash = hashPassword(password);
  const newUser = userDb.createUser({
    email,
    passwordHash,
    name
  });
  
  // Return user without sensitive data
  const { passwordHash: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

/**
 * Authenticate a user and create a session
 * @param {string} email - User's email address
 * @param {string} password - Plain text password
 * @returns {Object} - Session object with user information
 */
export async function loginUser(email, password) {
  // Find user by email
  const user = userDb.findByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Verify password
  if (!verifyPassword(password, user.passwordHash)) {
    throw new Error('Invalid email or password');
  }
  
  // Create a new session
  const session = sessionDb.createSession(user.id);
  
  // Return session with user data (excluding password)
  const { passwordHash: _, ...userWithoutPassword } = user;
  return {
    sessionId: session.id,
    user: userWithoutPassword
  };
}

/**
 * Validate a session
 * @param {string} sessionId - Session ID to validate
 * @returns {Object|null} - User object if session is valid, null otherwise
 */
export function validateSession(sessionId) {
  if (!sessionId) return null;
  
  // Find session
  const session = sessionDb.findById(sessionId);
  if (!session) return null;
  
  // Check if session is expired
  if (new Date(session.expiresAt) < new Date()) {
    sessionDb.deleteSession(session.id);
    return null;
  }
  
  // Get user from session
  const user = userDb.findById(session.userId);
  if (!user) {
    sessionDb.deleteSession(session.id);
    return null;
  }
  
  // Return user without sensitive data
  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * End a user session (logout)
 * @param {string} sessionId - Session ID to end
 * @returns {boolean} - Whether the session was successfully ended
 */
export function logoutUser(sessionId) {
  return sessionDb.deleteSession(sessionId);
}