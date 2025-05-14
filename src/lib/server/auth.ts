import { userDb, sessionDb } from "./sqlite-db";
import { createHash } from "crypto";
import { dev } from "$app/environment";

export function hashPassword(password: string) {
  // In a real app, you'd use bcrypt or argon2, but for simplicity we'll use
  // a basic SHA-256 hash (not recommended for production)
  return createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hashedPassword: string) {
  const inputHash = hashPassword(password);
  return inputHash === hashedPassword;
}

export async function registerUser(
  email: string,
  password: string,
  name: string
) {
  if (!email || !password || !name) {
    throw new Error("Email, password, and name are required");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const existingUser = userDb.findByEmail(email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const passwordHash = hashPassword(password);
  const newUser = userDb.createUser({
    email,
    passwordHash,
    name,
  });

  if (!newUser) return;

  const { passwordHash: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function loginUser(email: string, password: string) {
  const user = userDb.findByEmail(email) as any;
  if (!user) {
    throw new Error("Invalid email");
  }

  if (!verifyPassword(password, user.passwordHash as string)) {
    throw new Error("Invalid password");
  }

  const session = sessionDb.createSession(user.id) as any;

  // Return session with user data (excluding password)
  const { passwordHash: _, ...userWithoutPassword } = user;
  return {
    sessionId: session.id,
    user: userWithoutPassword,
  };
}

/**
 * Validate a session
 * @param {string} sessionId - Session ID to validate
 * @returns {Object|null} - User object if session is valid, null otherwise
 */
export function validateSession(sessionId: string) {
  if (!sessionId) return null;

  // Find session
  const session = sessionDb.findById(sessionId) as any;
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
export function logoutUser(sessionId: string) {
  if (!sessionId) return false;
  return sessionDb.deleteSession(sessionId);
}

/**
 * End all sessions for a user
 * @param {string} userId - User ID to end all sessions for
 * @returns {boolean} - Whether the operation was successful
 */
export function logoutAllSessions(userId: string) {
  if (!userId) return false;
  return sessionDb.deleteAllUserSessions(userId);
}
