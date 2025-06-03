import type { User } from "$lib/types/user.types";
import { userDb, sessionDb } from "./db";
import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function validatePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<Omit<User, "passwordHash"> | undefined> {
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
  const passwordHash = await hashPassword(password);
  const newUser = userDb.createUser({
    email,
    passwordHash,
    name,
  });
  if (!newUser) return;
  const { passwordHash: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ sessionId: string; user: Omit<User, "passwordHash"> }> {
  const user = userDb.findByEmail(email) as User;
  if (!user) {
    throw new Error("This user doesn't exists");
  }
  const isValid = await validatePassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid password or email");
  }
  const session = sessionDb.createSession(user.id);
  if (!session) {
    throw new Error("Failed to create session");
  }

  const { passwordHash: _, ...userWithoutPassword } = user;
  return {
    sessionId: session.id,
    user: userWithoutPassword,
  };
}

export function validateSession(sessionId: string) {
  if (!sessionId) return null;

  const session = sessionDb.findById(sessionId) as any;
  if (!session) return null;

  if (new Date(session.expiresAt) < new Date()) {
    sessionDb.deleteSession(session.id);
    return null;
  }

  const user = userDb.findById(session.userId);
  if (!user) {
    sessionDb.deleteSession(session.id);
    return null;
  }

  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function logoutUser(sessionId: string) {
  if (!sessionId) return false;
  return sessionDb.deleteSession(sessionId);
}

export function logoutAllSessions(userId: string) {
  if (!userId) return false;
  return sessionDb.deleteAllUserSessions(userId);
}

export async function updateUserName(
  userId: string,
  name: string
): Promise<User | null> {
  if (!userId) {
    console.error("updateUserName: userId is required.");
    return null;
  }
  if (!name || name.trim() === "") {
    console.error("updateUserName: Name cannot be empty.");
    return null;
  }

  try {
    const user = userDb.findById(userId) as User | undefined;
    if (!user) {
      console.error(`updateUserName: User with ID "${userId}" not found.`);
      return null;
    }

    const updatedUser = userDb.updateUser(userId, { name: name.trim() });
    return updatedUser;
  } catch (error) {
    console.error("updateUserName: Error updating name.", error);
    return null;
  }
}

export async function updateUserEmail(
  userId: string,
  email: string
): Promise<User | null> {
  if (!userId) {
    console.error("updateUserEmail: userId is required.");
    return null;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("updateUserEmail: Invalid email format.");
    return null;
  }

  try {
    const user = userDb.findById(userId) as User | undefined;
    if (!user) {
      console.error(`updateUserEmail: User with ID "${userId}" not found.`);
      return null;
    }

    const existingUserWithNewEmail = userDb.findByEmail(email) as
      | User
      | undefined;
    if (existingUserWithNewEmail && existingUserWithNewEmail.id !== userId) {
      console.error(
        `updateUserEmail: Email "${email}" is already in use by another account.`
      );
      return null;
    }

    const updatedUser = userDb.updateUser(userId, { email });
    return updatedUser;
  } catch (error) {
    console.error("updateUserEmail: Error updating email.", error);
    return null;
  }
}

export async function updateUserPassword(
  userId: string,
  password: string
): Promise<User | null> {
  if (!userId) {
    console.error(" userId is required.");
    return null;
  }
  // Example: Minimum 8 characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    console.error(
      "Password does not meet security requirements (minimum 8 characters, including one letter and one number)."
    );
    return null;
  }

  try {
    const user = userDb.findById(userId) as User | undefined;
    if (!user) {
      console.error(`User not found.`);
      return null;
    }

    const passwordHash = await hashPassword(password);
    const updatedUser = userDb.updateUser(userId, { passwordHash });
    return updatedUser;
  } catch (error) {
    console.error("Error updating password.", error);
    return null;
  }
}
